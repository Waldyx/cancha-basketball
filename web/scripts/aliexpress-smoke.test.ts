import { describe, it, expect } from "vitest";
import { diagnosticar } from "./aliexpress-smoke";

/**
 * Lo único que esta sonda tiene que acertar es NO confundir "la firma está mal"
 * (nuestro código) con "falta el scope Affiliate" (un trámite en la consola de
 * AliExpress). Confundirlos manda a depurar el sitio equivocado.
 */
describe("diagnosticar — respuestas de la Open Platform", () => {
  it("un error de firma señala a NUESTRO código", () => {
    const body = {
      error_response: {
        code: "15",
        sub_code: "isv.sign-check-failure",
        msg: "Invalid signature",
      },
    };
    expect(diagnosticar(body).veredicto).toBe("firma");
  });

  it("un error de permisos NO se confunde con la firma", () => {
    const body = {
      error_response: {
        code: "40",
        sub_code: "isv.permission-api-not-authorized",
        msg: "The app has no permission to call this api",
      },
    };
    expect(diagnosticar(body).veredicto).toBe("permisos");
  });

  it("una app_key inválida se distingue de las dos anteriores", () => {
    const body = { error_response: { code: "27", msg: "Invalid app key" } };
    expect(diagnosticar(body).veredicto).toBe("credencial");
  });

  it("una respuesta buena es 'ok'", () => {
    const body = {
      aliexpress_affiliate_productdetail_get_response: {
        resp_result: {
          resp_code: 200,
          result: { products: { product: [{ product_id: "1005012089978306" }] } },
        },
      },
    };
    expect(diagnosticar(body).veredicto).toBe("ok");
  });

  // La Open Platform contesta 200 con el error dentro, así que un resp_code
  // distinto de 200 tampoco puede darse por bueno.
  it("un resp_code que no es 200 no cuela como éxito", () => {
    const body = {
      aliexpress_affiliate_productdetail_get_response: {
        resp_result: { resp_code: 500, resp_msg: "system error" },
      },
    };
    expect(diagnosticar(body).veredicto).not.toBe("ok");
  });

  it("una respuesta vacía o no-JSON no revienta", () => {
    expect(diagnosticar(null).veredicto).toBe("desconocido");
    expect(diagnosticar("<html>").veredicto).toBe("desconocido");
  });

  // Si la petición ni sale de la red, el resultado no dice NADA de las claves.
  // Darlo por "error de firma" mandaría a tocar código que está bien.
  it("un bloqueo de red se distingue de un fallo de credenciales", () => {
    const d = diagnosticar("Host not in allowlist: api-sg.aliexpress.com", 403);
    expect(d.veredicto).toBe("red");
  });
});
