import { describe, it, expect } from "vitest";
import { mergePricesIntoShoes, unwrapWrapperUrl, elegirScrape } from "./mergePrices";
import type { Zapatilla, LinkCompra } from "./types";

const awin = (dest: string) =>
  `https://www.awin1.com/cread.php?awinmid=11640&awinaffid=2908587&ued=${encodeURIComponent(dest)}`;

const FICHA_A = "https://es.aliexpress.com/item/1005011111111111.html";
const FICHA_B = "https://es.aliexpress.com/item/1005022222222222.html";

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

describe("elegirScrape", () => {
  it("con una sola entrada, esa", () => {
    const c = [{ url: FICHA_B, precio_actual: 50 }];
    expect(elegirScrape(link(), c)).toBe(c[0]);
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

  it("con UN solo enlace editorial sí se permite el upgrade de URL", () => {
    const shoes = [zapa([link({ url: awin(FICHA_A), precio_actual: 100 })])];
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
});

describe("mergePricesIntoShoes — wrapper de afiliado", () => {
  it("no anida el wrapper cuando precios.json ya trae la URL envuelta", () => {
    const shoes = [zapa([link({ url: awin(FICHA_A) })])];
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
