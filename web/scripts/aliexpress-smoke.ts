/**
 * Sonda de las credenciales de la Open Platform de AliExpress.
 *
 *   ALIEXPRESS_APP_KEY=xxx ALIEXPRESS_APP_SECRET=yyy npx tsx scripts/aliexpress-smoke.ts
 *   …y opcionalmente un product_id concreto:  … scripts/aliexpress-smoke.ts 1005012089978306
 *
 * Hace UNA sola llamada real y dice en cristiano qué pasa. Existe porque
 * `callAe()` se traga los errores a propósito (devuelve [] tanto si la API
 * falla como si no hay resultados): eso está bien para la pasada nocturna, que
 * no debe reventar por una tienda, pero es inservible para saber si unas claves
 * recién creadas funcionan.
 *
 * Lo que de verdad importa es NO confundir dos fallos que se parecen:
 *  - `sign error` → la firma la generamos nosotros → mirar `signParams`.
 *  - permisos     → la key existe pero le falta el scope Affiliate → es un
 *                   trámite en la consola de AliExpress, NO un bug del código.
 * Confundirlos cuesta una sesión entera de depurar el sitio equivocado.
 */
import {
  getAeCredentials,
  buildSignedParams,
} from "./scraper/stores/aliexpress_api.js";

const AE_GATEWAY = "https://api-sg.aliexpress.com/sync";

/** Una ficha real del catálogo, para no depender de un id inventado. */
const PRODUCT_ID_POR_DEFECTO = "1005012089978306"; // anta-kai-1-speed

export type Veredicto = "ok" | "firma" | "permisos" | "credencial" | "red" | "desconocido";

export interface Diagnostico {
  veredicto: Veredicto;
  detalle: string;
}

/**
 * Traduce la respuesta de la API a un veredicto accionable.
 * La Open Platform contesta 200 con un `error_response` dentro, así que el
 * status HTTP por sí solo no decide nada… salvo cuando ni siquiera hay JSON:
 * eso es que la petición no llegó a AliExpress (proxy, firewall, DNS).
 */
export function diagnosticar(body: unknown, status?: number): Diagnostico {
  if ((!body || typeof body !== "object") && status != null && status !== 200) {
    return {
      veredicto: "red",
      detalle: `HTTP ${status} sin JSON — la petición no llegó a la API`,
    };
  }
  if (!body || typeof body !== "object") {
    return { veredicto: "desconocido", detalle: "respuesta vacía o no-JSON" };
  }
  const obj = body as Record<string, any>;
  const err = obj.error_response;

  if (err) {
    const code = String(err.code ?? "");
    const sub = String(err.sub_code ?? "");
    const msg = String(err.msg ?? err.sub_msg ?? "");
    const todo = `${code} ${sub} ${msg}`;
    const detalle = `code=${code}${sub ? ` sub_code=${sub}` : ""} · ${msg}`;

    // El orden importa: un "invalid signature" también menciona la app_key.
    if (/sign|signature/i.test(todo)) return { veredicto: "firma", detalle };
    if (/permission|not\s*authoriz|unauthoriz|subscri|scope|forbidden/i.test(todo))
      return { veredicto: "permisos", detalle };
    if (/app.?key|invalid.?app|secret/i.test(todo)) return { veredicto: "credencial", detalle };
    return { veredicto: "desconocido", detalle };
  }

  const envelope = Object.keys(obj).find((k) => k.endsWith("_response"));
  if (!envelope) return { veredicto: "desconocido", detalle: "sin envoltorio *_response" };

  const result = obj[envelope]?.resp_result ?? obj[envelope];
  // resp_code 200 es el OK de la Open Platform, distinto del status HTTP.
  const respCode = result?.resp_code ?? result?.code;
  if (respCode != null && String(respCode) !== "200") {
    return {
      veredicto: "desconocido",
      detalle: `resp_code=${respCode} · ${result?.resp_msg ?? ""}`,
    };
  }
  return { veredicto: "ok", detalle: "la API contesta y devuelve producto" };
}

const EXPLICACION: Record<Veredicto, string> = {
  ok: "Las credenciales funcionan y el scope Affiliate está concedido.\n   → Mete los secrets en GitHub y lanza el workflow con tienda: aliexpress.",
  firma: "La FIRMA está mal, y eso es NUESTRO código.\n   → Mira signParams/buildSignedParams en stores/aliexpress_api.ts (sha256, hex\n     en mayúsculas, parámetros ordenados y concatenados clave+valor sin separador).",
  permisos:
    "La key es válida pero le FALTA el permiso del grupo Affiliate.\n   → Es un trámite en la consola de AliExpress, NO un bug del código. Solicita\n     el scope `aliexpress.affiliate.*` y vuelve a probar cuando lo concedan.",
  credencial:
    "La app_key o el secret no son válidos.\n   → Revisa que estén copiados enteros y sin espacios, y que sean de la app\n     creada en openservice.aliexpress.com (no los de Portals).",
  red: "La petición NO llegó a AliExpress, así que esto no dice nada de tus claves.\n   → El entorno tiene la salida capada (en Claude Code web, api-sg.aliexpress.com\n     está fuera de la allowlist). Prueba en tu máquina o en GitHub Actions.",
  desconocido:
    "No sé clasificarlo. Pega la respuesta cruda de arriba y lo miramos.",
};

async function main() {
  const creds = getAeCredentials();
  if (!creds) {
    console.error(
      "❌ Faltan credenciales.\n" +
        "   ALIEXPRESS_APP_KEY=xxx ALIEXPRESS_APP_SECRET=yyy npx tsx scripts/aliexpress-smoke.ts\n" +
        "   (ALIEXPRESS_TRACKING_ID es opcional; por defecto usa \"default\")"
    );
    process.exit(2);
  }

  const productId = process.argv[2] ?? PRODUCT_ID_POR_DEFECTO;
  const params = buildSignedParams(
    "aliexpress.affiliate.productdetail.get",
    {
      target_currency: "EUR",
      target_language: "ES",
      country: "ES",
      ship_to_country: "ES",
      product_ids: productId,
      tracking_id: creds.trackingId,
    },
    creds
  );

  console.log(`→ POST ${AE_GATEWAY}`);
  console.log(`   método: aliexpress.affiliate.productdetail.get · product_id: ${productId}`);
  console.log(`   app_key: ${creds.appKey.slice(0, 4)}…${creds.appKey.slice(-2)} · tracking_id: ${creds.trackingId}\n`);

  let body: unknown;
  let status: number | undefined;
  try {
    const res = await fetch(AE_GATEWAY, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
      body: new URLSearchParams(params).toString(),
      signal: AbortSignal.timeout(20000),
    });
    status = res.status;
    const texto = await res.text();
    console.log(`HTTP ${res.status}\n${texto.slice(0, 1200)}\n`);
    try {
      body = JSON.parse(texto);
    } catch {
      body = null;
    }
  } catch (e) {
    console.error(
      `❌ No se pudo ni llamar a la API: ${(e as Error).message}\n` +
        "   Si esto sale desde un entorno con la red capada, prueba en local o en GitHub Actions."
    );
    process.exit(3);
  }

  const { veredicto, detalle } = diagnosticar(body, status);
  const icono = veredicto === "ok" ? "✅" : "❌";
  console.log(`${icono} ${veredicto.toUpperCase()} — ${detalle}`);
  console.log(`   ${EXPLICACION[veredicto]}`);
  process.exit(veredicto === "ok" ? 0 : 1);
}

// Solo corre si se invoca directamente (los tests importan `diagnosticar`).
if (process.argv[1]?.endsWith("aliexpress-smoke.ts")) {
  main();
}
