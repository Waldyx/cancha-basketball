import { describe, it, expect } from "vitest";
import { isBotChallengeUrl, precioDeCandidato } from "./aliexpress";

// AliExpress responde a la XHR de precio (mtop...pdp.pc.query) con un reto
// anti-bot en vez de con datos. Capturado en red el 2026-07-30: por cada ficha,
// ~9 llamadas de precio y ~20 respuestas de reto. Detectarlo permite abandonar
// el enlace al instante en vez de agotar esperas que no van a dar nada.
describe("isBotChallengeUrl — señal de reto anti-bot de AliExpress", () => {
  const retos = [
    "https://acs.aliexpress.com//h5/mtop.aliexpress.pdp.pc.query/1.0/_____tmd_____/punish?x5secdata=xg1ad3f13e13f79e7dkae62a5",
    "https://acs.aliexpress.com/h5/mtop.aliexpress.pdp.pc.query/1.0/_____tmd_____/punish?recaptcha=1&iframe=1&x5step=3",
    "https://acs.aliexpress.com/h5/mtop.aliexpress.pdp.pc.query/1.0/_____tmd_____/report?rand=S3WxGHAgAt756Epzn",
  ];
  for (const u of retos) {
    it(`detecta el reto: ${u.slice(40, 90)}`, () => {
      expect(isBotChallengeUrl(u)).toBe(true);
    });
  }

  // Lo importante es NO confundir la petición legítima ni los scripts que la
  // pila anti-bot carga también en páginas sanas: si diéramos por bloqueada una
  // ficha que funciona, perderíamos los pocos precios que hoy sí se cuelan.
  const sanas = [
    "https://acs.aliexpress.com/h5/mtop.aliexpress.pdp.pc.query/1.0/?jsv=2.5.1&appKey=12574478&t=1785453121741",
    "https://es.aliexpress.com/item/1005012511774286.html",
    "https://assets.alicdn.com/g/??/AWSC/AWSC/awsc.js,/sd/baxia-entry/baxiaCommon.js",
    "https://o.alicdn.com/baxia/baxia-entry-gray/index.js",
    "https://es.aliexpress.com/w/wholesale-anta-kt-10.html",
  ];
  for (const u of sanas) {
    it(`NO marca como reto: ${u.slice(8, 60)}`, () => {
      expect(isBotChallengeUrl(u)).toBe(false);
    });
  }
});

// El fallback de tarjetas aceptaba CUALQUIER precio con tal de que hubiera un
// título de 3+ caracteres, sin comprobar que el producto fuese el correcto
// (importaba matchesShoe y no lo llamaba nunca). Es la misma clase de fallo que
// puso unas Adidas Cross 'Em Up en la ficha de la Sabrina 2 (sesión 31).
describe("precioDeCandidato — no aceptar el precio de otro producto", () => {
  const kt10 = { id: "anta-kt-10", marca: "Anta", modelo: "KT 10" };

  it("acepta el modelo correcto", () => {
    expect(precioDeCandidato("ANTA KT10 Klay Thompson Basketball Shoes", "89,99 €", kt10)).toBe(89.99);
  });

  it("RECHAZA otra generación de la misma saga", () => {
    expect(precioDeCandidato("ANTA KT9 Klay Thompson Basketball Shoes", "79,99 €", kt10)).toBeNull();
  });

  it("RECHAZA un producto de otra marca aunque el precio sea válido", () => {
    expect(precioDeCandidato("Adidas Cross 'Em Up 5 Basketball Shoes", "59,99 €", kt10)).toBeNull();
  });

  it("RECHAZA accesorios que se cuelan en la búsqueda", () => {
    expect(precioDeCandidato("Basketball Socks for KT 10 Anta", "9,99 €", kt10)).toBeNull();
  });

  // Guardas que ya existían y que NO se deben perder al añadir el match
  it("RECHAZA precio por debajo de 20€ (accesorio/talla infantil)", () => {
    expect(precioDeCandidato("ANTA KT10 Klay Thompson", "12,00 €", kt10)).toBeNull();
  });

  it("RECHAZA precio no parseable", () => {
    expect(precioDeCandidato("ANTA KT10 Klay Thompson", "", kt10)).toBeNull();
  });

  it("RECHAZA título vacío o demasiado corto", () => {
    expect(precioDeCandidato("KT", "89,99 €", kt10)).toBeNull();
  });

  it("acepta un modelo occidental con SKU en el título (formato Marcas+)", () => {
    const sabrina = { id: "nike-sabrina-3", marca: "Nike", modelo: "Sabrina 3" };
    expect(precioDeCandidato("Nike Authentic Sabrina 3 EP HF2882-600", "90,99 €", sabrina)).toBe(90.99);
  });
});
