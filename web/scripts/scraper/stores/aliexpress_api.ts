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

/** POST firmado al gateway. Siempre POST, aunque el método se llame `...get`. */
export async function callAe(
  method: string,
  business: Record<string, string>,
  creds: AeCredentials,
  fetchImpl: typeof fetch = fetch
): Promise<AeProduct[]> {
  const params = buildSignedParams(method, business, creds);
  const res = await fetchImpl(AE_GATEWAY, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: new URLSearchParams(params).toString(),
  });
  if (!res.ok) return [];
  return parseProducts(await res.json());
}

const COMUNES = {
  target_currency: "EUR",
  target_language: "ES",
  country: "ES",
  ship_to_country: "ES",
};

/** Precio de una ficha concreta por su product_id. */
export async function productDetail(
  productId: string,
  creds: AeCredentials,
  fetchImpl: typeof fetch = fetch
): Promise<AeProduct | null> {
  const productos = await callAe(
    "aliexpress.affiliate.productdetail.get",
    { ...COMUNES, product_ids: productId, tracking_id: creds.trackingId },
    creds,
    fetchImpl
  );
  return productos[0] ?? null;
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
  fetchImpl: typeof fetch = fetch
): Promise<AeProduct[]> {
  return callAe(
    "aliexpress.affiliate.product.query",
    {
      ...COMUNES,
      keywords,
      tracking_id: creds.trackingId,
      page_size: "20",
      sort: "SALE_PRICE_ASC",
    },
    creds,
    fetchImpl
  );
}
