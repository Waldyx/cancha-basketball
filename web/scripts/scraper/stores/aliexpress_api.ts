import { createHmac } from "node:crypto";
import { unwrapAffiliateUrl } from "../matcher.js";

/**
 * Cliente de la API de afiliados de AliExpress.
 *
 * Existe porque la ficha NO se puede scrapear: es CSR y la XHR del precio
 * responde con reto anti-bot (ver cabecera de `aliexpress.ts`). La vía legítima
 * es esta API, que devuelve precio y enlace sin navegador y sin reto.
 *
 * Gateway NUEVO (`api-sg.aliexpress.com/sync`, firma sha256), no el viejo de
 * Taobao (`gw.api.taobao.com/router/rest`, firma md5): AliExpress migró a su
 * Open Platform y la consola de desarrollador es la que sirve este host.
 */
export const AE_GATEWAY = "https://api-sg.aliexpress.com/sync";

export interface AeCredentials {
  appKey: string;
  appSecret: string;
  /** El de Portals. El alta de mayo dejó `default`. */
  trackingId: string;
}

/**
 * Las credenciales viven SOLO en secrets (`ALIEXPRESS_APP_KEY` /
 * `ALIEXPRESS_APP_SECRET`), nunca en el repo. Sin ellas devuelve null y el
 * scraper cae al camino de navegador de siempre, en vez de romper la pasada.
 */
export function getAeCredentials(
  env: Record<string, string | undefined> = process.env
): AeCredentials | null {
  const appKey = env.ALIEXPRESS_APP_KEY?.trim();
  const appSecret = env.ALIEXPRESS_APP_SECRET?.trim();
  if (!appKey || !appSecret) return null;
  return {
    appKey,
    appSecret,
    trackingId: env.ALIEXPRESS_TRACKING_ID?.trim() || "default",
  };
}

/**
 * Firma de la Open Platform: se ordenan los parámetros por clave, se concatena
 * `clave+valor` sin separadores y se aplica HMAC-SHA256 con el app_secret,
 * en hex MAYÚSCULAS.
 */
export function signParams(
  params: Record<string, string>,
  appSecret: string
): string {
  const base = Object.keys(params)
    .sort()
    .map((k) => k + params[k])
    .join("");
  return createHmac("sha256", appSecret)
    .update(base, "utf8")
    .digest("hex")
    .toUpperCase();
}

/** Parámetros completos (sistema + negocio) ya firmados, listos para el POST. */
export function buildSignedParams(
  method: string,
  business: Record<string, string>,
  creds: AeCredentials,
  now: number = Date.now()
): Record<string, string> {
  const params: Record<string, string> = {
    ...business,
    method,
    app_key: creds.appKey,
    timestamp: String(now),
    sign_method: "sha256",
  };
  params.sign = signParams(params, creds.appSecret);
  return params;
}

/**
 * El `product_id` numérico, que es lo que pide la API. Nuestros enlaces vienen
 * envueltos en Awin (a veces anidado), de ahí el unwrap previo.
 *
 * Devuelve null para los cortos `s.click.aliexpress.com/e/_xxx`: resolverlos
 * siguiendo el redirect generaría un CLICK DE AFILIADO FALSO por cada pasada
 * nocturna y hundiría el EPC (mismo error que scrapear el wrapper, s31). Esos
 * se resuelven una sola vez a mano y se guarda el id.
 */
export function extractProductId(url: string): string | null {
  const u = unwrapAffiliateUrl(url ?? "");
  const m =
    u.match(/\/item\/(?:[\w-]+\/)?(\d{6,})\.html/) ||
    u.match(/[?&]productId=(\d{6,})/) ||
    u.match(/\/i\/(\d{6,})\.html/);
  return m ? m[1] : null;
}

export interface AeProduct {
  productId: string;
  title: string;
  price: number;
  url: string;
}

/** Precio en euros de un producto de la respuesta, o null si no viene. */
function precioDe(raw: Record<string, unknown>): number | null {
  for (const campo of ["target_sale_price", "sale_price", "target_app_sale_price"]) {
    const v = raw[campo];
    if (v == null) continue;
    const n = parseFloat(String(v).replace(",", "."));
    if (Number.isFinite(n) && n > 0) return n;
  }
  return null;
}

/**
 * Normaliza la respuesta. La Open Platform envuelve el resultado en
 * `<method_con_guiones_bajos>_response.resp_result.result.products.product[]`,
 * y en caso de fallo devuelve `error_response`.
 */
export function parseProducts(body: unknown): AeProduct[] {
  if (!body || typeof body !== "object") return [];
  const obj = body as Record<string, any>;
  if (obj.error_response) return [];

  const envelope = Object.keys(obj).find((k) => k.endsWith("_response"));
  const result = envelope
    ? obj[envelope]?.resp_result?.result ?? obj[envelope]?.result
    : undefined;

  const lista = result?.products?.product ?? result?.products ?? [];
  const arr = Array.isArray(lista) ? lista : [lista];

  const out: AeProduct[] = [];
  for (const raw of arr) {
    if (!raw || typeof raw !== "object") continue;
    const price = precioDe(raw);
    const productId = String(raw.product_id ?? raw.productId ?? "").trim();
    if (!price || !productId) continue;
    out.push({
      productId,
      title: String(raw.product_title ?? raw.product_name ?? "").trim(),
      // `promotion_link` ya lleva el tracking; si no viene, la ficha limpia.
      url: String(raw.promotion_link || raw.product_detail_url || "").trim(),
      price,
    });
  }
  return out;
}

/**
 * Un fallo de la API, ya legible. Existe porque sin esto TODOS los fallos se
 * ven igual: `callAe` devolvía `[]` con un 500 igual que con una respuesta
 * correcta y vacía, así que en el log de la pasada del 17-ago los 30 fallos
 * salían como "❌ no encontrado" sin forma de saber cuáles eran culpa nuestra.
 *
 * Distinguir importa porque la acción es OPUESTA: si el producto ya no está en
 * el catálogo de afiliados, lo correcto es quitar el enlace; si es un error de
 * parámetros o de permisos, hay que arreglar el código o el scope.
 */
export interface AeError {
  code: string;
  msg: string;
  requestId?: string;
}

/**
 * La Open Platform pone el motivo REAL en `sub_msg` y deja en `msg` un genérico
 * ("Invalid Arguments"), así que se prefiere el sub_ cuando viene.
 */
export function parseAeError(body: unknown): AeError | null {
  if (!body || typeof body !== "object") return null;
  const err = (body as Record<string, any>).error_response;
  if (!err) return null;
  return {
    code: String(err.sub_code ?? err.code ?? "?"),
    msg: String(err.sub_msg ?? err.msg ?? "").trim(),
    requestId: err.request_id ? String(err.request_id) : undefined,
  };
}

export interface AeResponse {
  products: AeProduct[];
  error: AeError | null;
}

/**
 * ¿El fallo es "vas demasiado rápido"? La Open Platform lo devuelve como
 * `ApiCallLimit` y dice en el mensaje cuánto dura el veto ("this ban will last
 * 1 seconds"). Es un fallo TEMPORAL: no significa que el producto no exista.
 */
export function esLimiteDeFrecuencia(e: AeError | null): boolean {
  if (!e) return false;
  return /apicalllimit/i.test(e.code) || /frequency exceeds/i.test(e.msg);
}

/** Esperas entre reintentos. El veto que anuncia el gateway es de ~1 s. */
const ESPERAS_MS = [1500, 4000];

/**
 * POST firmado al gateway. Siempre POST, aunque el método se llame `...get`.
 *
 * Reintenta SOLO el límite de frecuencia. En la pasada 32180930332, 3 de los 47
 * enlaces fallaron por eso y se contaron como "no está en el catálogo", que es
 * la conclusión opuesta a la verdadera: el producto está, solo íbamos rápido.
 * Cualquier otro error se devuelve tal cual — reintentar una firma mala o un
 * permiso que falta solo gasta llamadas.
 */
export async function callAe(
  method: string,
  business: Record<string, string>,
  creds: AeCredentials,
  fetchImpl: typeof fetch = fetch,
  dormir: (ms: number) => Promise<void> = (ms) =>
    new Promise((r) => setTimeout(r, ms))
): Promise<AeResponse> {
  let ultima: AeResponse = { products: [], error: null };

  for (let intento = 0; intento <= ESPERAS_MS.length; intento++) {
    // La firma incluye el timestamp, así que se re-firma en cada intento.
    const params = buildSignedParams(method, business, creds);
    const res = await fetchImpl(AE_GATEWAY, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: new URLSearchParams(params).toString(),
    });
    if (!res.ok) {
      return { products: [], error: { code: `http_${res.status}`, msg: res.statusText } };
    }
    const body = await res.json();
    ultima = { products: parseProducts(body), error: parseAeError(body) };

    if (!esLimiteDeFrecuencia(ultima.error)) return ultima;
    if (intento < ESPERAS_MS.length) await dormir(ESPERAS_MS[intento]);
  }

  return ultima;
}

const COMUNES = {
  target_currency: "EUR",
  target_language: "ES",
  country: "ES",
  ship_to_country: "ES",
};

/**
 * Precio de una ficha concreta por su product_id.
 *
 * `onError` es opcional a propósito: quien llama decide si le interesa el
 * motivo. Sin él, el comportamiento es el de siempre (null y a otra cosa).
 */
export async function productDetail(
  productId: string,
  creds: AeCredentials,
  fetchImpl: typeof fetch = fetch,
  onError?: (e: AeError) => void
): Promise<AeProduct | null> {
  const { products, error } = await callAe(
    "aliexpress.affiliate.productdetail.get",
    { ...COMUNES, product_ids: productId, tracking_id: creds.trackingId },
    creds,
    fetchImpl
  );
  if (error && onError) onError(error);
  return products[0] ?? null;
}

/**
 * Búsqueda por texto. Es lo que resuelve los 7 enlaces que hoy son una URL
 * `wholesale?SearchText=` sin ficha (Asics, Rigorer, 361°): en vez de abrir un
 * navegador contra el listado, se pregunta a la API y quien decide es el
 * matcher, igual que hicimos con las tarjetas de Amazon en la s34.
 */
export async function productQuery(
  keywords: string,
  creds: AeCredentials,
  fetchImpl: typeof fetch = fetch,
  onError?: (e: AeError) => void
): Promise<AeProduct[]> {
  const { products, error } = await callAe(
    "aliexpress.affiliate.product.query",
    {
      ...COMUNES,
      keywords,
      tracking_id: creds.trackingId,
      page_no: "1",
      page_size: "20",
      sort: "SALE_PRICE_ASC",
    },
    creds,
    fetchImpl
  );
  if (error && onError) onError(error);
  return products;
}
