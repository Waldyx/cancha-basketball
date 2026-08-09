import { describe, it, expect } from "vitest";
import { fusionarPrecios } from "./output.js";
import type { ScrapeResult } from "./types.js";

const HOY = Date.parse("2026-08-09");
const CON_SCRAPER = new Set(["amazon_es", "aliexpress", "elcorteingles_es", "decathlon"]);

function link(p: Partial<ScrapeResult> & { tienda: string; url: string }): ScrapeResult {
  return {
    precio_actual: 100,
    disponible: true,
    ultima_verificacion: "2026-08-09",
    ...p,
  };
}

const diasAtras = (n: number) =>
  new Date(HOY - n * 86_400_000).toISOString().slice(0, 10);

describe("fusionarPrecios — fusión por ENLACE", () => {
  it("conserva el precio de un enlace que esta noche ha fallado (el bug del 9-ago)", () => {
    // La zapa tiene 2 enlaces; esta noche solo se resuelve decathlon.
    // Antes ({...existing, ...newShoes}) la entrada de Amazon se BORRABA.
    const existing = {
      "puma-mb-04": {
        links_compra: [
          link({ tienda: "amazon_es", url: "https://amazon.es/dp/B01", precio_actual: 85, ultima_verificacion: diasAtras(1) }),
          link({ tienda: "decathlon", url: "https://decathlon.es/p/mb04/1", precio_actual: 63, ultima_verificacion: diasAtras(1) }),
        ],
      },
    };
    const nuevo = {
      "puma-mb-04": {
        links_compra: [link({ tienda: "decathlon", url: "https://decathlon.es/p/mb04/1", precio_actual: 62.99 })],
      },
    };

    const { shoes, conservadas } = fusionarPrecios(existing, nuevo, CON_SCRAPER, HOY);
    const tiendas = shoes["puma-mb-04"].links_compra.map((l) => l.tienda).sort();

    expect(tiendas).toEqual(["amazon_es", "decathlon"]);
    expect(conservadas).toBe(1);
    // Amazon mantiene su último precio bueno; decathlon se actualiza.
    const amazon = shoes["puma-mb-04"].links_compra.find((l) => l.tienda === "amazon_es")!;
    expect(amazon.precio_actual).toBe(85);
    const dk = shoes["puma-mb-04"].links_compra.find((l) => l.tienda === "decathlon")!;
    expect(dk.precio_actual).toBe(62.99);
  });

  it("lo de esta noche PISA a lo viejo del mismo producto (no duplica)", () => {
    const existing = {
      x: { links_compra: [link({ tienda: "decathlon", url: "https://decathlon.es/p/a/1", precio_actual: 90, ultima_verificacion: diasAtras(2) })] },
    };
    const nuevo = {
      x: { links_compra: [link({ tienda: "decathlon", url: "https://decathlon.es/p/a/1", precio_actual: 80 })] },
    };
    const { shoes } = fusionarPrecios(existing, nuevo, CON_SCRAPER, HOY);
    expect(shoes.x.links_compra).toHaveLength(1);
    expect(shoes.x.links_compra[0].precio_actual).toBe(80);
  });

  it("la query y el wrapper de afiliado no cambian la identidad del producto", () => {
    // Mismo producto: uno pelado, otro envuelto en Awin. Debe quedar UNO.
    const directo = "https://es.aliexpress.com/item/12345.html";
    const envuelto =
      "https://www.awin1.com/cread.php?awinmid=11640&awinaffid=2908587&ued=" +
      encodeURIComponent(directo + "?spm=abc");
    const existing = { x: { links_compra: [link({ tienda: "aliexpress", url: envuelto, precio_actual: 57, ultima_verificacion: diasAtras(1) })] } };
    const nuevo = { x: { links_compra: [link({ tienda: "aliexpress", url: directo, precio_actual: 55 })] } };

    const { shoes } = fusionarPrecios(existing, nuevo, CON_SCRAPER, HOY);
    expect(shoes.x.links_compra).toHaveLength(1);
    expect(shoes.x.links_compra[0].precio_actual).toBe(55);
  });

  it("una tienda con VARIOS productos conserva ambos (regresión de la s35)", () => {
    // AliExpress/Amazon tienen varios listados de la misma zapa: NO son el mismo
    // enlace y no deben colapsarse en uno.
    const existing = {
      x: {
        links_compra: [
          link({ tienda: "aliexpress", url: "https://es.aliexpress.com/item/111.html", precio_actual: 57, ultima_verificacion: diasAtras(1) }),
          link({ tienda: "aliexpress", url: "https://es.aliexpress.com/item/222.html", precio_actual: 151, ultima_verificacion: diasAtras(1) }),
        ],
      },
    };
    const { shoes } = fusionarPrecios(existing, {}, CON_SCRAPER, HOY);
    expect(shoes.x.links_compra).toHaveLength(2);
  });

  it("no toca las zapas que esta noche no se han scrapeado", () => {
    const existing = { otra: { links_compra: [link({ tienda: "decathlon", url: "https://decathlon.es/p/z/9", ultima_verificacion: diasAtras(3) })] } };
    const { shoes, conservadas } = fusionarPrecios(existing, {}, CON_SCRAPER, HOY);
    expect(shoes.otra.links_compra).toHaveLength(1);
    // No hubo intento esta noche → no cuenta como "conservada"
    expect(conservadas).toBe(0);
  });
});

describe("fusionarPrecios — caducidad de 30 días", () => {
  it("caduca una entrada rancia de tienda CON scraper (los 4 Snipes muertos)", () => {
    const existing = {
      x: { links_compra: [link({ tienda: "amazon_es", url: "https://amazon.es/dp/B01", ultima_verificacion: diasAtras(45) })] },
    };
    const { shoes, caducadas } = fusionarPrecios(existing, {}, CON_SCRAPER, HOY);
    expect(caducadas).toBe(1);
    expect(shoes.x).toBeUndefined();
  });

  it("NO caduca una tienda SIN scraper aunque sea antiquísima", () => {
    // Basketball Emotion / basket4ballers / manelsanchez viven SOLO aquí:
    // caducarlas quitaría la opción de compra de la ficha (aviso de la s35).
    const existing = {
      x: {
        links_compra: [
          link({ tienda: "basketballemotion_es", url: "https://basketballemotion.com/p/abc", ultima_verificacion: diasAtras(400) }),
        ],
      },
    };
    const { shoes, caducadas } = fusionarPrecios(existing, {}, CON_SCRAPER, HOY);
    expect(caducadas).toBe(0);
    expect(shoes.x.links_compra).toHaveLength(1);
  });

  it("una entrada sin fecha legible de tienda con scraper caduca", () => {
    const existing = {
      x: { links_compra: [link({ tienda: "amazon_es", url: "https://amazon.es/dp/B01", ultima_verificacion: "" })] },
    };
    const { shoes } = fusionarPrecios(existing, {}, CON_SCRAPER, HOY);
    expect(shoes.x).toBeUndefined();
  });

  it("justo en el límite (30d) se conserva", () => {
    const existing = {
      x: { links_compra: [link({ tienda: "amazon_es", url: "https://amazon.es/dp/B01", ultima_verificacion: diasAtras(30) })] },
    };
    const { shoes } = fusionarPrecios(existing, {}, CON_SCRAPER, HOY);
    expect(shoes.x.links_compra).toHaveLength(1);
  });
});
