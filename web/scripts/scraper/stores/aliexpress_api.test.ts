import { describe, it, expect } from "vitest";
import {
  getAeCredentials,
  signParams,
  buildSignedParams,
  extractProductId,
  parseProducts,
  productDetail,
  AE_GATEWAY,
  type AeError,
} from "./aliexpress_api.js";
import { precioViaApi } from "./aliexpress.js";

const CREDS = { appKey: "12345", appSecret: "secreto", trackingId: "default" };

describe("credenciales", () => {
  it("sin key o sin secret NO hay credenciales (se cae al navegador)", () => {
    expect(getAeCredentials({})).toBeNull();
    expect(getAeCredentials({ ALIEXPRESS_APP_KEY: "x" })).toBeNull();
    expect(getAeCredentials({ ALIEXPRESS_APP_SECRET: "y" })).toBeNull();
    // Un secret vacío en GitHub llega como "" — no debe pasar por bueno.
    expect(
      getAeCredentials({ ALIEXPRESS_APP_KEY: "x", ALIEXPRESS_APP_SECRET: "  " })
    ).toBeNull();
  });

  it("el tracking_id por defecto es el del alta de Portals", () => {
    const c = getAeCredentials({
      ALIEXPRESS_APP_KEY: "x",
      ALIEXPRESS_APP_SECRET: "y",
    });
    expect(c?.trackingId).toBe("default");
  });
});

describe("firma", () => {
  it("es estable y en hex mayúsculas", () => {
    const s = signParams({ b: "2", a: "1" }, "secreto");
    expect(s).toMatch(/^[0-9A-F]{64}$/);
    expect(s).toBe(signParams({ a: "1", b: "2" }, "secreto"));
  });

  it("el ORDEN de las claves no cambia la firma, el VALOR sí", () => {
    expect(signParams({ a: "1", b: "2" }, "s")).not.toBe(
      signParams({ a: "2", b: "1" }, "s")
    );
  });

  it("otro secret, otra firma", () => {
    expect(signParams({ a: "1" }, "uno")).not.toBe(signParams({ a: "1" }, "dos"));
  });

  it("los parámetros de sistema van incluidos y firmados", () => {
    const p = buildSignedParams("aliexpress.affiliate.productdetail.get", { product_ids: "7" }, CREDS, 1000);
    expect(p.app_key).toBe("12345");
    expect(p.sign_method).toBe("sha256");
    expect(p.timestamp).toBe("1000");
    expect(p.method).toBe("aliexpress.affiliate.productdetail.get");
    const { sign, ...sinFirma } = p;
    expect(sign).toBe(signParams(sinFirma, CREDS.appSecret));
  });
});

describe("extractProductId", () => {
  it("saca el id de una ficha normal", () => {
    expect(
      extractProductId("https://es.aliexpress.com/item/1005006543210987.html")
    ).toBe("1005006543210987");
  });

  it("atraviesa el wrapper de Awin", () => {
    const dest = encodeURIComponent(
      "https://es.aliexpress.com/item/1005006543210987.html"
    );
    expect(
      extractProductId(
        `https://www.awin1.com/cread.php?awinmid=11640&awinaffid=2908587&ued=${dest}`
      )
    ).toBe("1005006543210987");
  });

  it("atraviesa el wrapper ANIDADO (el caso de anta-kai-1-speed)", () => {
    const ficha = "https://es.aliexpress.com/item/1005006543210987.html";
    const interno = `https://www.awin1.com/cread.php?awinmid=11640&awinaffid=2908587&ued=${encodeURIComponent(ficha)}`;
    const externo = `https://www.awin1.com/cread.php?awinmid=11640&awinaffid=2908587&ued=${encodeURIComponent(interno)}`;
    expect(extractProductId(externo)).toBe("1005006543210987");
  });

  it("NO resuelve los cortos s.click: seguirlos falsearía un click de afiliado", () => {
    expect(extractProductId("https://s.click.aliexpress.com/e/_c32FKd4H")).toBeNull();
  });

  it("una URL de búsqueda no tiene id", () => {
    expect(
      extractProductId("https://es.aliexpress.com/wholesale?SearchText=rigorer+ar1")
    ).toBeNull();
  });
});

describe("parseProducts", () => {
  const ok = {
    aliexpress_affiliate_productdetail_get_response: {
      resp_result: {
        result: {
          products: {
            product: [
              {
                product_id: "1005006543210987",
                product_title: "Anta KT 10 Basketball Shoes",
                target_sale_price: "89.99",
                product_detail_url: "https://es.aliexpress.com/item/1005006543210987.html",
                promotion_link: "https://s.click.aliexpress.com/e/_abc",
              },
            ],
          },
        },
      },
    },
  };

  it("lee precio, id y enlace", () => {
    const [p] = parseProducts(ok);
    expect(p.price).toBe(89.99);
    expect(p.productId).toBe("1005006543210987");
    expect(p.title).toContain("KT 10");
  });

  it("prefiere el promotion_link, que ya lleva el tracking", () => {
    expect(parseProducts(ok)[0].url).toContain("s.click");
  });

  it("un error_response no es un producto", () => {
    expect(
      parseProducts({ error_response: { code: "15", msg: "sign error" } })
    ).toEqual([]);
  });

  it("respuesta vacía o basura no revienta", () => {
    expect(parseProducts(null)).toEqual([]);
    expect(parseProducts({})).toEqual([]);
    expect(parseProducts("nope")).toEqual([]);
  });

  it("descarta productos sin precio utilizable", () => {
    expect(
      parseProducts({
        x_response: {
          resp_result: { result: { products: { product: [{ product_id: "1", target_sale_price: "0" }] } } },
        },
      })
    ).toEqual([]);
  });
});

describe("productDetail", () => {
  it("hace POST firmado al gateway nuevo", async () => {
    let visto: { url: string; body: string; ct: string } | null = null;
    const fakeFetch = (async (url: any, init: any) => {
      visto = {
        url: String(url),
        body: String(init.body),
        ct: init.headers["Content-Type"],
      };
      return { ok: true, json: async () => ({}) };
    }) as unknown as typeof fetch;

    await productDetail("1005006543210987", CREDS, fakeFetch);

    expect(visto!.url).toBe(AE_GATEWAY);
    expect(visto!.ct).toContain("x-www-form-urlencoded");
    expect(visto!.body).toContain("product_ids=1005006543210987");
    expect(visto!.body).toContain("tracking_id=default");
    expect(visto!.body).toContain("sign=");
  });

  it("un HTTP no-OK no inventa precio", async () => {
    const fakeFetch = (async () => ({ ok: false, json: async () => ({}) })) as unknown as typeof fetch;
    expect(await productDetail("1", CREDS, fakeFetch)).toBeNull();
  });

  // La pasada del 17-ago dio 30 fallos indistinguibles: sin esto no se sabe
  // cuáles son productos fuera del catálogo de afiliados (quitar el enlace) y
  // cuáles un fallo nuestro (arreglar el código o pedir el scope).
  it("avisa del motivo cuando la API responde error_response", async () => {
    const fakeFetch = (async () => ({
      ok: true,
      json: async () => ({
        error_response: {
          code: "15",
          msg: "Remote service error",
          sub_code: "isv.permission-deny",
          sub_msg: "no permission",
          request_id: "abc123",
        },
      }),
    })) as unknown as typeof fetch;

    const errores: AeError[] = [];
    expect(await productDetail("1", CREDS, fakeFetch, (e) => errores.push(e))).toBeNull();
    // Gana el sub_: el `msg` de primer nivel es un genérico inútil.
    expect(errores).toEqual([
      { code: "isv.permission-deny", msg: "no permission", requestId: "abc123" },
    ]);
  });

  it("un HTTP no-OK también se reporta, no se traga", async () => {
    const fakeFetch = (async () => ({
      ok: false,
      status: 503,
      statusText: "Service Unavailable",
      json: async () => ({}),
    })) as unknown as typeof fetch;

    const errores: AeError[] = [];
    await productDetail("1", CREDS, fakeFetch, (e) => errores.push(e));
    expect(errores[0].code).toBe("http_503");
  });

  // Un catálogo vacío NO es un error: es la API diciendo "no lo tengo".
  it("una respuesta correcta y vacía no reporta error", async () => {
    const fakeFetch = (async () => ({ ok: true, json: async () => ({}) })) as unknown as typeof fetch;
    const errores: AeError[] = [];
    await productDetail("1", CREDS, fakeFetch, (e) => errores.push(e));
    expect(errores).toEqual([]);
  });
});

describe("precioViaApi", () => {
  const shoe = { id: "anta-kt-10", marca: "Anta", modelo: "KT 10" };

  const respuestaCon = (productos: any[]) => ({
    ok: true,
    json: async () => ({
      x_response: { resp_result: { result: { products: { product: productos } } } },
    }),
  });

  it("una ficha con id devuelve precio disponible", async () => {
    const fakeFetch = (async () =>
      respuestaCon([
        { product_id: "1005006543210987", product_title: "Anta KT 10", target_sale_price: "89.99" },
      ])) as unknown as typeof fetch;

    const r = await precioViaApi(
      "https://es.aliexpress.com/item/1005006543210987.html",
      shoe,
      CREDS,
      fakeFetch
    );
    expect(r?.precio_actual).toBe(89.99);
    expect(r?.disponible).toBe(true);
  });

  it("si la API no devuelve el producto, es que NO está a la venta", async () => {
    const fakeFetch = (async () => respuestaCon([])) as unknown as typeof fetch;
    const r = await precioViaApi(
      "https://es.aliexpress.com/item/1005006543210987.html",
      shoe,
      CREDS,
      fakeFetch
    );
    expect(r?.disponible).toBe(false);
    expect(r?.precio_actual).toBe(0);
  });

  it("un enlace de BÚSQUEDA se resuelve por keywords y coge el MÁS BARATO que empareja", async () => {
    const fakeFetch = (async () =>
      respuestaCon([
        { product_id: "1", product_title: "Anta KT 10 Low", target_sale_price: "120.00", product_detail_url: "https://es.aliexpress.com/item/1.html" },
        { product_id: "2", product_title: "Anta KT 10", target_sale_price: "95.00", product_detail_url: "https://es.aliexpress.com/item/2.html" },
      ])) as unknown as typeof fetch;

    const r = await precioViaApi(
      "https://es.aliexpress.com/wholesale?SearchText=anta+kt+10",
      shoe,
      CREDS,
      fakeFetch
    );
    expect(r?.precio_actual).toBe(95);
    // El enlace de búsqueda se auto-repara a la ficha encontrada.
    expect(r?.url).toContain("/item/2.html");
  });

  it("una búsqueda que solo trae OTRO modelo no da precio", async () => {
    const fakeFetch = (async () =>
      respuestaCon([
        { product_id: "9", product_title: "Anta KT 9 Basketball", target_sale_price: "70.00" },
      ])) as unknown as typeof fetch;

    const r = await precioViaApi(
      "https://es.aliexpress.com/wholesale?SearchText=anta+kt+10",
      shoe,
      CREDS,
      fakeFetch
    );
    expect(r?.disponible).toBe(false);
  });

  // Devuelve null porque por API no se puede decidir. Antes eso significaba
  // “cae al navegador”, y el navegador PEDÍA el s.click: un click de afiliado
  // falso por pasada. Hoy `esRedirectOpaco` lo salta antes de navegar nada.
  // Las 4 búsquedas `wholesale` daban CERO y SIN error, lo que tiene dos causas
  // opuestas y arreglos opuestos. El diagnóstico las separa: dice cuántas trajo
  // la API antes de que el matcher opine.
  it("informa de cuántos candidatos trajo la API ANTES del matcher", async () => {
    const fakeFetch = (async () =>
      respuestaCon([
        { product_id: "9", product_title: "Anta KT 9 Basketball", target_sale_price: "70.00" },
        { product_id: "8", product_title: "Calcetines baloncesto Anta", target_sale_price: "25.00" },
      ])) as unknown as typeof fetch;

    const diag: string[] = [];
    await precioViaApi(
      "https://es.aliexpress.com/wholesale?SearchText=anta+kt+10",
      shoe,
      CREDS,
      fakeFetch,
      () => {},
      (m) => diag.push(m)
    );

    expect(diag).toHaveLength(1);
    // Lo que hay que poder leer en el log: vinieron 2, emparejó 0 → es el
    // matcher quien descarta, no la API quien no indexa.
    expect(diag[0]).toContain("2 de la API, 0 emparejan");
    expect(diag[0]).toContain("Anta KT 9");
  });

  it("si la API no devuelve NADA, el diagnóstico lo dice sin listar descartes", async () => {
    const fakeFetch = (async () => respuestaCon([])) as unknown as typeof fetch;
    const diag: string[] = [];
    await precioViaApi(
      "https://es.aliexpress.com/wholesale?SearchText=rigorer+warship",
      shoe,
      CREDS,
      fakeFetch,
      () => {},
      (m) => diag.push(m)
    );
    expect(diag[0]).toContain("0 de la API, 0 emparejan");
    expect(diag[0]).not.toContain("descartados");
  });

  // La primera pasada con el fix del ° auto-reparo 361-big3-6-pro a la
  // `promotion_link` que devuelve la API... que es otro `s.click`. Resultado:
  // awin1 -> s.click, o sea un enlace que `esRedirectOpaco` salta y que ya
  // nadie puede volver a verificar. El enlace se auto-reparaba a algo MUERTO.
  it("auto-repara a la ficha LIMPIA, nunca a un s.click imposible de re-verificar", async () => {
    const fakeFetch = (async () =>
      respuestaCon([
        {
          product_id: "1005006543210987",
          product_title: "Anta KT 10",
          target_sale_price: "95.00",
          promotion_link: "https://s.click.aliexpress.com/e/_cABC123",
          product_detail_url: "https://es.aliexpress.com/item/1005006543210987.html",
        },
      ])) as unknown as typeof fetch;

    const r = await precioViaApi(
      "https://es.aliexpress.com/wholesale?SearchText=anta+kt+10",
      shoe,
      CREDS,
      fakeFetch
    );
    expect(r?.url).toBe("https://es.aliexpress.com/item/1005006543210987.html");
    expect(r?.url).not.toContain("s.click");
    // Y lo que se guarda tiene que seguir siendo resoluble la proxima noche.
    expect(extractProductId(r!.url)).toBe("1005006543210987");
  });
  it("un s.click sin id devuelve null: por API no se puede decidir", async () => {
    const fakeFetch = (async () => respuestaCon([])) as unknown as typeof fetch;
    const r = await precioViaApi(
      "https://s.click.aliexpress.com/e/_c32FKd4H",
      shoe,
      CREDS,
      fakeFetch
    );
    expect(r).toBeNull();
  });
});
