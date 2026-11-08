import { describe, it, expect } from "vitest";
import { mergePricesIntoShoes, unwrapWrapperUrl, elegirScrape, identidadProducto } from "./mergePrices";
import type { Zapatilla, LinkCompra } from "./types";

const awin = (dest: string) =>
  `https://www.awin1.com/cread.php?awinmid=11640&awinaffid=2908587&ued=${encodeURIComponent(dest)}`;

const FICHA_A = "https://es.aliexpress.com/item/1005011111111111.html";
const FICHA_B = "https://es.aliexpress.com/item/1005022222222222.html";
// Una URL de AliExpress que NO es una ficha reconocible (no /item/<id>): sirve
// para probar el mecanismo de "candidato único" / anti-anidado de wrapper sin
// chocar con el guardarraíl de la TAREA 7 (una ficha reconocible sin match
// exacto ya no adivina con el único candidato disponible).
const EDITORIAL_OPACA = "https://es.aliexpress.com/store/900112233";

function link(over: Partial<LinkCompra> = {}): LinkCompra {
  return {
    tienda: "aliexpress",
    url: awin(FICHA_A),
    precio_actual: 100,
    disponible: true,
    tiene_afiliado: true,
    ultima_verificacion: "2026-01-01",
    ...over,
  } as LinkCompra;
}

function zapa(links: LinkCompra[]): Zapatilla {
  return {
    id: "z1",
    slug: "z1",
    marca: "Anta",
    modelo: "KAI 1 Speed",
    links_compra: links,
  } as unknown as Zapatilla;
}

describe("unwrapWrapperUrl", () => {
  it("saca la ficha de un wrapper de Awin", () => {
    expect(unwrapWrapperUrl(awin(FICHA_A))).toBe(FICHA_A);
  });

  it("resuelve wrappers ANIDADOS", () => {
    expect(unwrapWrapperUrl(awin(awin(FICHA_A)))).toBe(FICHA_A);
  });

  it("una URL de tienda normal se queda igual", () => {
    expect(unwrapWrapperUrl(FICHA_A)).toBe(FICHA_A);
  });
});

describe("identidadProducto — Amazon por ASIN (TAREA 7, punto 1)", () => {
  it("dos URLs del MISMO ASIN con distinto slug y distinto ref son el mismo producto", () => {
    const a =
      "https://www.amazon.es/PUMA-All-pro-hombre-Alerta-amarilla/dp/B0DLTF4CZ1/ref=sr_1_2?tag=canchazapa-21";
    const b = "https://www.amazon.es/Otro-Slug-Totalmente-Distinto/dp/B0DLTF4CZ1/ref=sr_1_6";
    expect(identidadProducto(a)).toBe(identidadProducto(b));
  });

  it("dos ASIN distintos NO son el mismo producto aunque el slug se parezca", () => {
    const a = "https://www.amazon.es/PUMA-All-pro/dp/B0DLTF4CZ1/ref=sr_1_1";
    const b = "https://www.amazon.es/PUMA-All-pro/dp/B0AAAAAAAA/ref=sr_1_1";
    expect(identidadProducto(a)).not.toBe(identidadProducto(b));
  });
});

describe("elegirScrape", () => {
  it("con una sola entrada, esa (editorial NO es una ficha reconocible)", () => {
    const c = [{ url: FICHA_B, precio_actual: 50 }];
    expect(elegirScrape(link({ url: awin(EDITORIAL_OPACA) }), c)).toBe(c[0]);
  });

  it("con varias, empareja por PRODUCTO, no por posición", () => {
    const candidatos = [
      { url: awin(FICHA_B), precio_actual: 151.4 },
      { url: awin(FICHA_A), precio_actual: 57.05 },
    ];
    // El enlace editorial apunta a FICHA_A → debe cogerse su precio, no el otro.
    expect(elegirScrape(link({ url: awin(FICHA_A) }), candidatos)?.precio_actual).toBe(57.05);
    expect(elegirScrape(link({ url: awin(FICHA_B) }), candidatos)?.precio_actual).toBe(151.4);
  });

  it("si no se puede identificar el producto, coge el MÁS BARATO (nunca el último)", () => {
    const candidatos = [
      { url: "https://es.aliexpress.com/wholesale?SearchText=x", precio_actual: 90 },
      { url: "https://es.aliexpress.com/wholesale?SearchText=y", precio_actual: 60 },
    ];
    expect(
      elegirScrape(link({ url: "https://es.aliexpress.com/otra-cosa" }), candidatos)?.precio_actual
    ).toBe(60);
  });

  it("TAREA 7 punto 2 — si el editorial YA es una ficha de Amazon reconocible y ningún candidato es SU ASIN, no adivina con el más barato", () => {
    const editorial = link({
      tienda: "amazon_es",
      url: "https://www.amazon.es/PUMA-All-Pro-Nitro/dp/B0EDITORIAL1/ref=sr_1_1?tag=canchazapa-21",
    });
    const candidatos = [
      // Ninguno es B0EDITORIAL1: son resultados de OTRO producto (p.ej. un
      // ASIN de otra generación que coló en la misma búsqueda).
      { url: "https://www.amazon.es/PUMA-x-Pokemon/dp/B0OTROASIN1/ref=sr_1_2", precio_actual: 20 },
      { url: "https://www.amazon.es/PUMA-Otra-Cosa/dp/B0OTROASIN2/ref=sr_1_3", precio_actual: 500 },
    ];
    expect(elegirScrape(editorial, candidatos)).toBeUndefined();
  });

  it("con VARIOS candidatos del MISMO ASIN (duplicados de noches distintas), gana el más RECIENTE", () => {
    const editorial = link({
      tienda: "amazon_es",
      url: "https://www.amazon.es/PUMA-All-Pro-Nitro/dp/B0DLTF4CZ1/ref=sr_1_1?tag=canchazapa-21",
    });
    const candidatos = [
      { url: "https://www.amazon.es/PUMA-All-pro-hombre-Alerta-amarilla/dp/B0DLTF4CZ1/ref=sr_1_2", precio_actual: 106.99, ultima_verificacion: "2026-08-29" },
      { url: "https://www.amazon.es/dp/B0DLTF4CZ1?tag=canchazapa-21", precio_actual: 64.46, ultima_verificacion: "2026-09-10" },
    ];
    // El más barato es el más VIEJO (29-ago); debe ganar el más reciente (10-sep), no el primero del array.
    expect(elegirScrape(editorial, candidatos)?.precio_actual).toBe(64.46);
  });

  it("TAREA 7 punto 2 — pero SÍ resuelve cuando un candidato es el MISMO ASIN con otro slug/ref", () => {
    const editorial = link({
      tienda: "amazon_es",
      url: "https://www.amazon.es/PUMA-All-Pro-Nitro/dp/B0EDITORIAL1/ref=sr_1_1?tag=canchazapa-21",
    });
    const candidatos = [
      { url: "https://www.amazon.es/PUMA-All-Pro-Nitro-Alerta-Amarilla/dp/B0EDITORIAL1/ref=sr_1_4", precio_actual: 76.99 },
      { url: "https://www.amazon.es/PUMA-Otra-Cosa/dp/B0OTROASIN2/ref=sr_1_3", precio_actual: 20 },
    ];
    expect(elegirScrape(editorial, candidatos)?.precio_actual).toBe(76.99);
  });

  it("el guardarraíl de ficha reconocible NO afecta a AliExpress cuando el editorial es una búsqueda/URL opaca", () => {
    // Regresión expresa: este es el caso del test de arriba ("si no se puede
    // identificar el producto..."), repetido para dejar constancia de que el
    // punto 2 de la TAREA 7 es SOLO para fichas reconocibles, no para
    // cualquier URL que no sea de búsqueda.
    const candidatos = [
      { url: "https://es.aliexpress.com/wholesale?SearchText=x", precio_actual: 90 },
      { url: "https://es.aliexpress.com/wholesale?SearchText=y", precio_actual: 60 },
    ];
    expect(
      elegirScrape(link({ url: "https://es.aliexpress.com/otra-cosa-sin-item" }), candidatos)
        ?.precio_actual
    ).toBe(60);
  });

  it("TAREA 7 punto 3 — descarta candidatos con más de 7 días de antigüedad frente al más reciente antes de coger el más barato", () => {
    const candidatos = [
      // Más barato, pero rancio: 20 días más viejo que el otro candidato.
      {
        url: "https://es.aliexpress.com/wholesale?SearchText=x",
        precio_actual: 10,
        ultima_verificacion: "2026-08-21",
      },
      {
        url: "https://es.aliexpress.com/wholesale?SearchText=y",
        precio_actual: 60,
        ultima_verificacion: "2026-09-10",
      },
    ];
    expect(
      elegirScrape(link({ url: "https://es.aliexpress.com/otra-cosa" }), candidatos)?.precio_actual
    ).toBe(60);
  });

  it("TAREA 7 punto 3 — si TODOS son igual de recientes (<=7 días), sigue ganando el más barato", () => {
    const candidatos = [
      {
        url: "https://es.aliexpress.com/wholesale?SearchText=x",
        precio_actual: 10,
        ultima_verificacion: "2026-09-05",
      },
      {
        url: "https://es.aliexpress.com/wholesale?SearchText=y",
        precio_actual: 60,
        ultima_verificacion: "2026-09-10",
      },
    ];
    expect(
      elegirScrape(link({ url: "https://es.aliexpress.com/otra-cosa" }), candidatos)?.precio_actual
    ).toBe(10);
  });
});

const FICHAS_TIENDA = [
  { tienda: "fuikaomar_es", a: "https://fuikaomar.es/zapatillas-air-jordan-luka-5-lifestyle.html", b: "https://fuikaomar.es/zapatillas-air-jordan-luka-5-viper-edge.html", listado: "https://fuikaomar.es/baloncesto" },
  { tienda: "atmosfera_sport", a: "https://www.atmosferasport.es/adidas/zapatillas-adidas-harden-negro-152421.html", b: "https://www.atmosferasport.es/adidas/zapatillas-adidas-harden-blanco-152422.html", listado: "https://www.atmosferasport.es/adidas/baloncesto" },
  { tienda: "elcorteingles_es", a: "https://www.elcorteingles.es/deportes/A56001758/", b: "https://www.elcorteingles.es/deportes/A56001759-negro/", listado: "https://www.elcorteingles.es/deportes/zapatillas/" },
  { tienda: "forumsport_es", a: "https://www.forumsport.com/es-es/adidas-zapatilla-baloncesto-harden-1001051705-p", b: "https://www.forumsport.com/es-es/adidas-zapatilla-baloncesto-harden-1001051706-p", listado: "https://www.forumsport.com/es-es/baloncesto/" },
  // Formas reales del catálogo que la primera versión no reconocía (8-nov).
  { tienda: "fuikaomar_es", a: "https://www.fuikaomar.es/nike-air-jordan-1-retro-high-og-reverse-panda.html", b: "https://www.fuikaomar.es/nike-air-jordan-1-retro-high-og-chicago.html", listado: "https://www.fuikaomar.es/zapatillas-baloncesto/" },
  { tienda: "atmosfera_sport", a: "https://www.atmosferasport.es/zapatillas-de-baloncesto-under-armour-gs-jet-25-infantil-gris-171643.html", b: "https://www.atmosferasport.es/zapatillas-de-baloncesto-under-armour-gs-jet-25-infantil-negro-171644.html", listado: "https://www.atmosferasport.es/baloncesto-zapatillas-hombre-242" },
  { tienda: "elcorteingles_es", a: "https://www.elcorteingles.es/deportes/MP_0071639_SHAIPABOX-zapatillas-shai-001-converse/", b: "https://www.elcorteingles.es/deportes/MP_0071639_SHAIBLACK-zapatillas-shai-001-converse/", listado: "https://www.elcorteingles.es/deportes/baloncesto/zapatillas/" },
  { tienda: "adidas_es", a: "https://www.adidas.es/zapatilla-harden-volume-9/JS1304.html", b: "https://www.adidas.es/zapatilla-harden-volume-9/JS1305.html", listado: "https://www.adidas.es/search?q=harden" },
] as const;

describe.each(FICHAS_TIENDA)("ficha concreta de $tienda", ({ tienda, a, b, listado }) => {
  it.each([false, true])("no pisa el color editorial con otro producto (wrapper=%s)", (wrapper) => {
    const orig = link({ tienda, url: wrapper ? awin(a) : a });
    const candidatos = [{ url: b, precio_actual: 60 }];
    expect(elegirScrape(orig, candidatos)).toBeUndefined();
    expect(elegirScrape(orig, [...candidatos, { url: b + "?ref=x", precio_actual: 50 }])).toBeUndefined();
    const [out] = mergePricesIntoShoes([zapa([orig])], { generated_at: "", shoes: { z1: { links_compra: [{ ...candidatos[0], tienda, disponible: true }] } } });
    expect(out.links_compra[0]).toEqual(orig);
  });

  it("el match exacto sigue ganando, incluso con varios editoriales y wrappers", () => {
    const viejo = { url: a, precio_actual: 85, ultima_verificacion: "2026-11-01" };
    const reciente = { url: awin(a + "?ref=nuevo"), precio_actual: 90, ultima_verificacion: "2026-11-08" };
    expect(elegirScrape(link({ tienda, url: a }), [{ url: b, precio_actual: 40 }, viejo, reciente], true)).toBe(reciente);
  });

  it("una categoria o busqueda conserva el fallback anterior", () => {
    const candidato = { url: a, precio_actual: 80 };
    expect(elegirScrape(link({ tienda, url: listado }), [candidato])).toBe(candidato);
    expect(elegirScrape(link({ tienda, url: listado }), [candidato], true)).toBeUndefined();
  });
});

describe("mergePricesIntoShoes — tallas solo del candidato aceptado", () => {
  const orig = (over: Partial<LinkCompra> = {}) => link({ tienda: "fuikaomar_es", url: FICHAS_TIENDA[0].a, ...over });
  const fresh = (over: Partial<LinkCompra> & { agotado?: boolean } = {}) => ({ ...orig(), ultima_verificacion: "2026-11-08", precio_actual: 90, tallas: ["42", "43", "44,5"], ...over });
  const merge = (editoriales: LinkCompra[], candidatos: (Partial<LinkCompra> & { agotado?: boolean })[]) =>
    mergePricesIntoShoes([zapa(editoriales)], { generated_at: "2026-11-08", shoes: { z1: { links_compra: candidatos } } })[0].links_compra;

  it("copia tallas y fecha del match elegido, no del mas barato ni del editorial", () => {
    const elegido = fresh();
    const [out] = merge([orig({ tallas: ["50"] })], [fresh({ url: FICHAS_TIENDA[0].b, precio_actual: 60, tallas: ["40"] }), elegido]);
    expect(out.tallas).toEqual(["42", "43", "44,5"]);
    expect(out.tallas).not.toBe(elegido.tallas);
    expect(out.precio_actual).toBe(90);
    expect(out.ultima_verificacion).toBe("2026-11-08");
    expect(identidadProducto(out.url)).toBe(identidadProducto(elegido.url));
  });

  it("un scrape posterior sin tallas no hereda las del candidato antiguo", () => {
    const [out] = merge([orig({ tallas: ["50"] })], [fresh(), fresh({ ultima_verificacion: "2026-11-09", tallas: undefined })]);
    expect(out.tallas).toBeUndefined();
    expect(out.ultima_verificacion).toBe("2026-11-09");
  });

  it.each([
    { nombre: "otro producto", candidato: fresh({ url: FICHAS_TIENDA[0].b }) },
    { nombre: "verificacion editorial mas reciente", candidato: fresh({ ultima_verificacion: "2025-12-31" }) },
    { nombre: "precio implausible", candidato: fresh({ precio_actual: 900 }) },
    { nombre: "fallo de scraping", candidato: fresh({ disponible: false }) },
    { nombre: "agotado confirmado", candidato: fresh({ disponible: false, agotado: true }) },
  ])("no copia tallas si rechaza $nombre", ({ candidato }) => {
    expect(merge([orig({ tallas: ["50"] })], [candidato])[0].tallas).toBeUndefined();
  });

  it("ni un editorial desactivado ni uno sin scrape anuncia tallas", () => {
    expect(merge([orig({ disponible: false, tallas: ["50"] })], [fresh()])[0].tallas).toBeUndefined();
    expect(merge([orig({ tallas: ["50"] })], [])[0].tallas).toBeUndefined();
    const [out] = mergePricesIntoShoes([zapa([orig({ tallas: ["50"] })])], { generated_at: "", shoes: {} });
    expect(out.links_compra[0].tallas).toBeUndefined();
  });

  it("cada enlace de la misma tienda conserva sus propias tallas", () => {
    const out = merge([orig(), orig({ url: FICHAS_TIENDA[0].b })], [fresh(), fresh({ url: FICHAS_TIENDA[0].b, tallas: ["45"] })]);
    expect(out.map((l) => l.tallas)).toEqual([["42", "43", "44,5"], ["45"]]);
  });

  it("una tienda nueva copia solo sus tallas y no cambia el enlace existente", () => {
    const out = merge([link()], [fresh()]);
    expect(out[0]).toEqual(link());
    expect(out[1].tallas).toEqual(["42", "43", "44,5"]);
    expect(out[1].precio_actual).toBe(90);
  });
});

describe("mergePricesIntoShoes — varios productos de la MISMA tienda", () => {
  it("cada enlace se queda con el precio de SU producto", () => {
    const shoes = [zapa([link({ url: awin(FICHA_A) }), link({ url: awin(FICHA_B) })])];
    const merged = mergePricesIntoShoes(shoes, {
      generated_at: "2026-08-07",
      shoes: {
        z1: {
          links_compra: [
            { tienda: "aliexpress", url: awin(FICHA_B), precio_actual: 120, disponible: true },
            { tienda: "aliexpress", url: awin(FICHA_A), precio_actual: 80, disponible: true },
          ],
        },
      },
    });
    expect(merged[0].links_compra.map((l) => l.precio_actual)).toEqual([80, 120]);
  });

  it("NO colapsa los dos enlaces al precio del último (el bug de 361-joker-1)", () => {
    const shoes = [zapa([link({ url: awin(FICHA_A) }), link({ url: awin(FICHA_B) })])];
    const merged = mergePricesIntoShoes(shoes, {
      generated_at: "2026-08-07",
      shoes: {
        z1: {
          links_compra: [
            { tienda: "aliexpress", url: awin(FICHA_A), precio_actual: 80, disponible: true },
            { tienda: "aliexpress", url: awin(FICHA_B), precio_actual: 120, disponible: true },
          ],
        },
      },
    });
    const precios = merged[0].links_compra.map((l) => l.precio_actual);
    expect(new Set(precios).size).toBe(2);
  });
});

describe("mergePricesIntoShoes — varios enlaces editoriales, UN solo scrape", () => {
  const FICHA_C = "https://es.aliexpress.com/item/1005033333333333.html";

  it("no aplica el scrape a TODOS: crearía filas duplicadas", () => {
    const shoes = [
      zapa([
        link({ url: awin(FICHA_A), precio_actual: 96.39 }),
        link({ url: awin(FICHA_B), precio_actual: 120.69 }),
        link({ url: awin(FICHA_C), precio_actual: 84.87 }),
      ]),
    ];
    const merged = mergePricesIntoShoes(shoes, {
      generated_at: "2026-08-07",
      shoes: {
        z1: {
          links_compra: [
            // Un único resultado, de un producto que NO es ninguno de los tres.
            {
              tienda: "aliexpress",
              url: "https://es.aliexpress.com/item/1005099999999999.html",
              precio_actual: 70,
              disponible: true,
            },
          ],
        },
      },
    });
    const urls = merged[0].links_compra.map((l) => l.url);
    expect(new Set(urls).size).toBe(3);
    expect(merged[0].links_compra.map((l) => l.precio_actual)).toEqual([96.39, 120.69, 84.87]);
  });

  it("pero SÍ lo aplica al enlace que identifica", () => {
    const shoes = [zapa([link({ url: awin(FICHA_A), precio_actual: 96.39 }), link({ url: awin(FICHA_B), precio_actual: 120.69 })])];
    const merged = mergePricesIntoShoes(shoes, {
      generated_at: "2026-08-07",
      shoes: {
        z1: {
          links_compra: [
            { tienda: "aliexpress", url: awin(FICHA_B), precio_actual: 99, disponible: true },
          ],
        },
      },
    });
    expect(merged[0].links_compra.map((l) => l.precio_actual)).toEqual([96.39, 99]);
  });

  it("con UN solo enlace editorial (NO reconocible) sí se permite el upgrade de URL", () => {
    const shoes = [zapa([link({ url: awin(EDITORIAL_OPACA), precio_actual: 100 })])];
    const merged = mergePricesIntoShoes(shoes, {
      generated_at: "2026-08-07",
      shoes: {
        z1: {
          links_compra: [{ tienda: "aliexpress", url: FICHA_B, precio_actual: 90, disponible: true }],
        },
      },
    });
    expect(merged[0].links_compra[0].precio_actual).toBe(90);
    expect(unwrapWrapperUrl(merged[0].links_compra[0].url)).toBe(FICHA_B);
  });

  it("con UN solo enlace editorial que YA es una ficha reconocible, NO se adivina un upgrade a OTRO producto", () => {
    const shoes = [zapa([link({ url: awin(FICHA_A), precio_actual: 100 })])];
    const merged = mergePricesIntoShoes(shoes, {
      generated_at: "2026-08-07",
      shoes: {
        z1: {
          links_compra: [{ tienda: "aliexpress", url: FICHA_B, precio_actual: 90, disponible: true }],
        },
      },
    });
    // FICHA_B es un item DISTINTO de FICHA_A: se conserva el dato editorial.
    expect(merged[0].links_compra[0].precio_actual).toBe(100);
    expect(unwrapWrapperUrl(merged[0].links_compra[0].url)).toBe(FICHA_A);
  });
});

describe("mergePricesIntoShoes — wrapper de afiliado", () => {
  it("no anida el wrapper cuando precios.json ya trae la URL envuelta", () => {
    const shoes = [zapa([link({ url: awin(EDITORIAL_OPACA) })])];
    const merged = mergePricesIntoShoes(shoes, {
      generated_at: "2026-08-07",
      shoes: {
        z1: {
          links_compra: [
            { tienda: "aliexpress", url: awin(FICHA_B), precio_actual: 90, disponible: true },
          ],
        },
      },
    });
    const url = merged[0].links_compra[0].url;
    expect(decodeURIComponent(url)).not.toMatch(/ued=.*awin1\.com/i);
    expect(unwrapWrapperUrl(url)).toBe(FICHA_B);
    // El wrapper (y por tanto la comisión) se conserva.
    expect(url).toContain("awin1.com");
    expect(url).toContain("awinaffid=2908587");
  });
});

describe("mergePricesIntoShoes — tiendas EXTRA que no estaban en el catálogo", () => {
  const amazonFicha = "https://www.amazon.es/Anta-KAI-1-Speed/dp/B0TEST1234/ref=sr_1_1";

  it("un enlace de Amazon nuevo sale CON tag de afiliado (si no, el clic no monetiza)", () => {
    const shoes = [zapa([link({ tienda: "decathlon", url: "https://www.decathlon.es/p/x", tiene_afiliado: true })])];
    const merged = mergePricesIntoShoes(shoes, {
      generated_at: "2026-09-01",
      shoes: {
        z1: {
          links_compra: [
            { tienda: "amazon_es", url: amazonFicha, precio_actual: 90, disponible: true },
          ],
        },
      },
    });
    const nuevo = merged[0].links_compra.find((l) => l.tienda === "amazon_es")!;
    expect(nuevo.url).toContain("tag=canchazapa-21");
    expect(nuevo.tiene_afiliado).toBe(true);
  });

  it("NO resucita un enlace de Amazon de OTRO producto que el catálogo quitó a propósito", () => {
    // El caso real: air-jordan-10 se quedó sin su enlace editorial de Amazon (era
    // de la versión GS), y precios.json lo volvía a meter en cada build porque el
    // camino de "tiendas extra" no pasaba por el guardarraíl de identidad.
    const shoes = [zapa([link({ tienda: "decathlon", url: "https://www.decathlon.es/p/x", tiene_afiliado: true })])];
    const merged = mergePricesIntoShoes(shoes, {
      generated_at: "2026-09-01",
      shoes: {
        z1: {
          links_compra: [
            {
              tienda: "amazon_es",
              url: "https://www.amazon.es/Jordan-Retro-Gran-Estilo/dp/B00OTRO123/ref=sr_1_3",
              precio_actual: 90,
              disponible: true,
            },
          ],
        },
      },
    });
    expect(merged[0].links_compra.some((l) => l.tienda === "amazon_es")).toBe(false);
  });

  it("las tiendas extra que no son Amazon entran tal cual, sin afiliado", () => {
    const shoes = [zapa([link({ tienda: "decathlon", url: "https://www.decathlon.es/p/x", tiene_afiliado: true })])];
    const merged = mergePricesIntoShoes(shoes, {
      generated_at: "2026-09-01",
      shoes: {
        z1: {
          links_compra: [
            { tienda: "idealo_es", url: "https://www.idealo.es/precios/1234.html", precio_actual: 80, disponible: true },
          ],
        },
      },
    });
    const nuevo = merged[0].links_compra.find((l) => l.tienda === "idealo_es")!;
    expect(nuevo.url).toBe("https://www.idealo.es/precios/1234.html");
    expect(nuevo.tiene_afiliado).toBe(false);
  });
});

describe("mergePricesIntoShoes — TAREA 9: la ficha manda sobre disponible:false", () => {
  it("un scrape 'disponible' del MISMO producto NO resucita un enlace que el editorial marcó false", () => {
    const shoes = [
      zapa([link({ url: awin(FICHA_A), precio_actual: 100, disponible: false })]),
    ];
    const merged = mergePricesIntoShoes(shoes, {
      generated_at: "2026-09-11",
      shoes: {
        z1: {
          links_compra: [
            { tienda: "aliexpress", url: awin(FICHA_A), precio_actual: 80, disponible: true },
          ],
        },
      },
    });
    expect(merged[0].links_compra[0].disponible).toBe(false);
    expect(merged[0].links_compra[0].precio_actual).toBe(100);
    expect(unwrapWrapperUrl(merged[0].links_compra[0].url)).toBe(FICHA_A);
  });

  it("tampoco lo resucita un scrape de un producto DISTINTO (la vía por la que salían los 15)", () => {
    const shoes = [
      zapa([link({ url: awin(FICHA_A), precio_actual: 100, disponible: false })]),
    ];
    const merged = mergePricesIntoShoes(shoes, {
      generated_at: "2026-09-11",
      shoes: {
        z1: {
          links_compra: [
            { tienda: "aliexpress", url: awin(FICHA_B), precio_actual: 60, disponible: true },
          ],
        },
      },
    });
    expect(merged[0].links_compra[0].disponible).toBe(false);
  });
});

describe("mergePricesIntoShoes — una verificación editorial más reciente manda en el precio (20-oct)", () => {
  // Trae Young 3: el scrape guardaba 44,88 € del 26-sep (página con selector de talla, sin
  // precio legible después) y la ficha, re-verificada a mano el 20-oct, decía 248 €.
  const scrapeDe = (precio: number, fecha: string) => ({
    generated_at: fecha,
    shoes: { z1: { links_compra: [{ tienda: "aliexpress" as const, url: awin(FICHA_A), precio_actual: precio, disponible: true, ultima_verificacion: fecha }] } },
  });
  it("si la ficha se verificó DESPUÉS del scrape, se queda el precio de la ficha", () => {
    const shoes = [zapa([link({ precio_actual: 248, ultima_verificacion: "2026-10-20" })])];
    const merged = mergePricesIntoShoes(shoes, scrapeDe(44.88, "2026-09-26"));
    expect(merged[0].links_compra[0].precio_actual).toBe(248);
  });
  it("si el scrape es más reciente, manda el scrape (el caso normal de cada noche)", () => {
    const shoes = [zapa([link({ precio_actual: 248, ultima_verificacion: "2026-10-20" })])];
    const merged = mergePricesIntoShoes(shoes, scrapeDe(230, "2026-10-21"));
    expect(merged[0].links_compra[0].precio_actual).toBe(230);
  });
});

describe("mergePricesIntoShoes — guardarraíl de precio anclado también al MSRP (s48b)", () => {
  // El editorial puede ser justo el precio que estaba MAL (el scraper de Amazon leía
  // otra oferta): comparado solo con él, el precio bueno quedaba bloqueado para siempre.
  const conMsrp = (links: LinkCompra[], msrp: number) =>
    ({ ...zapa(links), precio_msrp_eur: msrp }) as unknown as Zapatilla;
  const scrape = (precio: number) => ({
    generated_at: "2026-09-13",
    shoes: { z1: { links_compra: [{ tienda: "aliexpress" as const, url: awin(FICHA_A), precio_actual: precio, disponible: true }] } },
  });

  it("acepta el precio real aunque el guardado (erróneo) quede fuera de rango, si cuadra con el MSRP", () => {
    const shoes = [conMsrp([link({ url: awin(FICHA_A), precio_actual: 31.4 })], 110)];
    const merged = mergePricesIntoShoes(shoes, scrape(75.57));
    expect(merged[0].links_compra[0].precio_actual).toBe(75.57);
  });

  it("pero sigue descartando la reventa: lejos del guardado Y por encima de 1,5× el MSRP", () => {
    const shoes = [conMsrp([link({ url: awin(FICHA_A), precio_actual: 31.4 })], 110)];
    const merged = mergePricesIntoShoes(shoes, scrape(300));
    expect(merged[0].links_compra[0].precio_actual).toBe(31.4);
  });
});

describe("mergePricesIntoShoes — AGOTADO confirmado por la tienda", () => {
  const ECI = "https://www.elcorteingles.es/deportes/A56001758/";
  const eci = (over: Partial<LinkCompra> = {}) =>
    link({ tienda: "elcorteingles_es" as LinkCompra["tienda"], url: awin(ECI), precio_actual: 90.99, ...over });
  const json = (entries: object[]) => ({ generated_at: "", shoes: { z1: { links_compra: entries } } });

  it("un agotado de SU mismo producto apaga el enlace (antes se quedaba el precio viejo como disponible)", () => {
    const [out] = mergePricesIntoShoes(
      [zapa([eci()])],
      json([{ tienda: "elcorteingles_es", url: ECI, precio_actual: 77.99, disponible: false, agotado: true, ultima_verificacion: "2026-09-16" }])
    );
    expect(out.links_compra[0].disponible).toBe(false);
    expect(out.links_compra[0].ultima_verificacion).toBe("2026-09-16");
  });

  it("un fallo de scraping (disponible:false SIN agotado) NO apaga el enlace", () => {
    const [out] = mergePricesIntoShoes(
      [zapa([eci()])],
      json([{ tienda: "elcorteingles_es", url: ECI, precio_actual: 90.99, disponible: false, ultima_verificacion: "2026-09-16" }])
    );
    expect(out.links_compra[0].disponible).toBe(true);
  });

  it("una verificacion EDITORIAL posterior al agotado gana (s52: la ficha mirada hoy manda sobre el scrape de ayer)", () => {
    const [out] = mergePricesIntoShoes(
      [zapa([eci({ ultima_verificacion: "2026-09-21" })])],
      json([{ tienda: "elcorteingles_es", url: ECI, precio_actual: 77.99, disponible: false, agotado: true, ultima_verificacion: "2026-09-20" }])
    );
    expect(out.links_compra[0].disponible).toBe(true);
  });

  it("si la ficha es MAS VIEJA que el agotado, sigue mandando el agotado", () => {
    const [out] = mergePricesIntoShoes(
      [zapa([eci({ ultima_verificacion: "2026-09-01" })])],
      json([{ tienda: "elcorteingles_es", url: ECI, precio_actual: 77.99, disponible: false, agotado: true, ultima_verificacion: "2026-09-20" }])
    );
    expect(out.links_compra[0].disponible).toBe(false);
  });

  it("un agotado de OTRO producto de la misma tienda no toca este enlace", () => {
    const [out] = mergePricesIntoShoes(
      [zapa([eci()])],
      json([{ tienda: "elcorteingles_es", url: "https://www.elcorteingles.es/deportes/A99999999/", precio_actual: 50, disponible: false, agotado: true, ultima_verificacion: "2026-09-16" }])
    );
    expect(out.links_compra[0].disponible).toBe(true);
  });

  it("si hay un scrape disponible MÁS RECIENTE del mismo producto (repuesto), gana el disponible", () => {
    const [out] = mergePricesIntoShoes(
      [zapa([eci()])],
      json([
        { tienda: "elcorteingles_es", url: ECI, precio_actual: 77.99, disponible: false, agotado: true, ultima_verificacion: "2026-09-10" },
        { tienda: "elcorteingles_es", url: ECI, precio_actual: 79.99, disponible: true, ultima_verificacion: "2026-09-16" },
      ])
    );
    expect(out.links_compra[0].disponible).toBe(true);
    expect(out.links_compra[0].precio_actual).toBe(79.99);
  });
});
