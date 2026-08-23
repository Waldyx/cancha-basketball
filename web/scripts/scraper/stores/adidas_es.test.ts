import { describe, it, expect } from "vitest";
import {
  ES_JUNIOR,
  esModeloGS,
  consultaAdidas,
  normalizeAdidasTitle,
  esCalzadoAdidas,
  precioDeFichaHtml,
} from "./adidas_es";
import { matchesShoe } from "../matcher";

// Listado REAL de adidas.es para "adidas superstar", capturado el 2026-08-09:
// 15 tarjetas, de las que solo 4 son calzado. Todas emparejan marca y modelo,
// y la ropa es MÁS BARATA que las zapatillas — que es exactamente lo que
// rompía el "coge la más barata que empareja".
const LISTADO_SUPERSTAR: { title: string; href: string; calzado: boolean }[] = [
  { title: "Mallas deportivas 7/8 adidas Originals Superstar", href: "https://www.adidas.es/mallas-deportivas-7-8-adidas-originals-superstar/KT6960.html", calzado: false },
  { title: "Zapatilla Superstar II", href: "https://www.adidas.es/zapatilla-superstar-ii/JI0079.html", calzado: true },
  { title: "Mallas cortas deportiva adidas Originals Superstar", href: "https://www.adidas.es/mallas-cortas-deportiva-adidas-originals-superstar/KT6964.html", calzado: false },
  { title: "Camiseta fina adidas Originals Sport Superstar", href: "https://www.adidas.es/camiseta-fina-adidas-originals-sport-superstar/KU3687.html", calzado: false },
  { title: "Camiseta con sujetador deportivo adidas Originals Superstar", href: "https://www.adidas.es/camiseta-con-sujetador-deportivo-adidas-originals-superstar/KT6949.html", calzado: false },
  { title: "Malla larga adidas Originals Sport Superstar", href: "https://www.adidas.es/malla-larga-adidas-originals-sport-superstar/KT7087.html", calzado: false },
  { title: "Zapatillas CLOT Superstar By Edison Chen", href: "https://www.adidas.es/zapatillas-clot-superstar-by-edison-chen/KK1388.html", calzado: true },
  { title: "Zapatilla infantil Superstar II", href: "https://www.adidas.es/zapatilla-infantil-superstar-ii/JH9977.html", calzado: true },
];

describe("adidas.es — ropa vs calzado", () => {
  // El bug del 9-ago: la ficha de la Superstar mostraba 50 € de unas MALLAS y
  // mandaba el click a su página. El scraper nunca visita la URL guardada
  // (reconstruye la búsqueda), así que el fallo se repetía cada noche.
  for (const { title, href, calzado } of LISTADO_SUPERSTAR) {
    it(`${calzado ? "SÍ" : "NO"} es calzado: "${title.slice(0, 44)}"`, () => {
      expect(esCalzadoAdidas(title, href)).toBe(calzado);
    });
  }

  it("de las 15 tarjetas reales, la más barata que vale NO son las mallas", () => {
    const precios = [
      { t: "Mallas cortas deportiva adidas Originals Superstar", h: "https://www.adidas.es/mallas-cortas-deportiva-adidas-originals-superstar/KT6964.html", p: 50 },
      { t: "Malla larga adidas Originals Sport Superstar", h: "https://www.adidas.es/malla-larga-adidas-originals-sport-superstar/KT7087.html", p: 80 },
      { t: "Zapatilla Superstar II", h: "https://www.adidas.es/zapatilla-superstar-ii/JI0079.html", p: 120 },
    ];
    const validas = precios
      .filter((c) => esCalzadoAdidas(c.t, c.h))
      .filter((c) => matchesShoe(`Adidas ${c.t}`, "Adidas", "Superstar"));
    expect(validas.map((c) => c.p)).toEqual([120]);
  });

  // La ruta NO vale como lista blanca: de los 20 enlaces de adidas que tenemos
  // en precios.json, 19 cuelgan de /zapatilla-… y el que falta es una zapatilla
  // de verdad. Exigir el prefijo dejaba la DON Issue 7 sin precio.
  it("acepta la zapatilla cuya ruta NO empieza por /zapatilla (DON Issue 7)", () => {
    expect(
      esCalzadoAdidas("D.O.N. Issue 7", "https://www.adidas.es/d.o.n.-issue-7/JS1301.html")
    ).toBe(true);
  });

  // Sin href (adidas a veces no renderiza el enlace) el título es el respaldo.
  it("sin href, decide el título", () => {
    expect(esCalzadoAdidas("Zapatilla Superstar II", "")).toBe(true);
    expect(esCalzadoAdidas("Mallas cortas deportiva adidas Originals Superstar", "")).toBe(false);
  });
});

// Títulos REALES de adidas.es capturados el 2026-08-06.
describe("adidas.es — segmento junior", () => {
  // El buscador de adidas entiende el nombre COMERCIAL, no el del catálogo:
  // "adidas ae 1 low gs" da 0 resultados; "adidas anthony edwards 1 low niños"
  // devuelve la junior a 58,50 €.
  it("traduce 'gs' a niños y la sigla AE al nombre completo", () => {
    expect(consultaAdidas("Adidas", "AE 1 Low GS")).toBe(
      "adidas anthony edwards 1 low niños"
    );
    expect(consultaAdidas("Adidas", "AE 2 GS")).toBe("adidas anthony edwards 2 niños");
    expect(consultaAdidas("Adidas", "AE 1")).toBe("adidas anthony edwards 1");
  });

  it("no toca la consulta de un modelo de adulto", () => {
    expect(consultaAdidas("Adidas", "Harden Vol 9")).toBe("adidas harden vol 9");
  });

  it("reconoce el junior por palabra y por la J final de adidas", () => {
    expect(ES_JUNIOR.test("Zapatilla Niños Anthony Edwards 2")).toBe(true);
    expect(ES_JUNIOR.test("Zapatilla Anthony Edwards 1 Low Basketball para niño")).toBe(true);
    expect(ES_JUNIOR.test("Zapatilla ANTHONY EDWARDS 2 J")).toBe(true);
    expect(ES_JUNIOR.test("Zapatilla Anthony Edwards 1 Low (Adolescentes)")).toBe(true);
    expect(ES_JUNIOR.test("Zapatilla ANTHONY EDWARDS 2")).toBe(false);
    // "J" solo cuenta al final: no puede confundirse con una palabra cualquiera
    expect(ES_JUNIOR.test("Zapatilla J Wall 2")).toBe(false);
  });

  it("distingue las fichas GS del catálogo", () => {
    expect(esModeloGS("AE 2 GS")).toBe(true);
    expect(esModeloGS("AE 1 Low GS")).toBe(true);
    expect(esModeloGS("Harden Vol 9")).toBe(false);
  });

  // La J final es la marca de junior de adidas y el catálogo lo llama GS.
  it("traduce la J final a GS para poder identificar la ficha junior", () => {
    expect(normalizeAdidasTitle("Zapatilla ANTHONY EDWARDS 2 J")).toBe("Zapatilla AE 2 GS");
  });

  it("sigue normalizando los nombres largos de adidas", () => {
    expect(normalizeAdidasTitle("Zapatilla Harden Volume 9")).toBe("Zapatilla Harden Vol 9");
    expect(normalizeAdidasTitle("Zapatilla Anthony Edwards 2")).toBe("Zapatilla AE 2");
  });

  // El emparejamiento de punta a punta con los títulos reales.
  it("empareja la junior con la ficha GS del catálogo", () => {
    const t = `Adidas ${normalizeAdidasTitle("Zapatilla Niños Anthony Edwards 2")}`;
    expect(matchesShoe(t, "Adidas", "AE 2 GS")).toBe(true);
  });

  it("y la de adulto NO se cuela como GS ni al revés", () => {
    const adulto = `Adidas ${normalizeAdidasTitle("Zapatilla ANTHONY EDWARDS 2")}`;
    expect(matchesShoe(adulto, "Adidas", "AE 2 GS")).toBe(false);
    expect(matchesShoe(adulto, "Adidas", "AE 2")).toBe(true);
  });
});

// La búsqueda con UN solo resultado redirige DIRECTO a la ficha (Forum 84,
// Pro Model, AE 1 GS) y ahí no hay listado. El precio del buy box vive en el
// estado embebido `pricing_information`; los [data-testid="main-price"] de la
// ficha son TODOS del carrusel de recomendados (53 en la página de Forum 84).
// Fragmentos capturados de la ficha real FY7998 el 2026-08-23.
describe("adidas.es — precio de ficha (redirect de búsqueda)", () => {
  const HTML_FICHA =
    '...,"datePublished":"2026-05-31T08:40:19.000+00:00"}],"offers":{"@type":"Offer","priceCurrency":"EUR","price":84,"availability":"InStock","priceSpecification":{"@type":"UnitPriceSpecification"}},...' +
    '...]},"pricing_information":{"currentPrice":84,"standard_price":120,"standard_price_no_vat":99.17,"sale_price":84,"sale_price_no_vat":69.42,"ecom_prior_price":78},...';

  it("saca el precio rebajado del buy box (84, no el PVP 120)", () => {
    expect(precioDeFichaHtml(HTML_FICHA)).toEqual({ price: 84, disponible: true });
  });

  it("respeta el OutOfStock del Offer", () => {
    const html = HTML_FICHA.replace('"availability":"InStock"', '"availability":"OutOfStock"');
    expect(precioDeFichaHtml(html)).toEqual({ price: 84, disponible: false });
  });

  it("sin pricing_information cae al precio del Offer", () => {
    const html = HTML_FICHA.replace('"pricing_information"', '"otra_cosa"');
    expect(precioDeFichaHtml(html)).toEqual({ price: 84, disponible: true });
  });

  it("una página sin precio no inventa nada", () => {
    expect(precioDeFichaHtml("<html><body>hola</body></html>").price).toBe(null);
  });
});
