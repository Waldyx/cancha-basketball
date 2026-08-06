/**
 * Scraper para Snipes (snipes.com/es-es)
 *
 * 14 enlaces en el catálogo (Awin 122628, 5%) y CERO verificados, mediana 57
 * días. Sin protección anti-bot: la ficha responde 200 al primer intento
 * (~4 s medidos).
 *
 * Dos cosas que hay que tener MUY presentes:
 *  1. El precio y el stock salen del JSON-LD (`Product` → `offers`). El DOM NO
 *     sirve: los `.product-price` que se ven en la ficha son los del carrusel
 *     de recomendados (en la Air Jordan 4 de 170 € el primero marca 119,99 €).
 *  2. De los 14 enlaces, 5 son URLs de BÚSQUEDA `/c/zapatillas?q=…` y ese
 *     formato ya no existe: Snipes sirve una página 404 con status 200 y un
 *     carrusel de productos aleatorios. Por eso exigimos que la página traiga
 *     un `Product` en el JSON-LD (la 404 no lo tiene) en vez de conformarnos
 *     con el primer producto que aparezca: si no, cada búsqueda muerta
 *     devolvería unas Air Force 1 cualesquiera.
 */
import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, today } from "../matcher.js";

export interface OfertaSnipes {
  nombre: string;
  marca: string;
  precio: number | null;
  /** null = la ficha no lo dice; no inventamos ni un sí ni un no. */
  disponible: boolean | null;
}

function disponibilidad(valor: unknown): boolean | null {
  if (typeof valor !== "string") return null;
  if (/OutOfStock|SoldOut|Discontinued/i.test(valor)) return false;
  if (/InStock|LimitedAvailability|PreOrder|BackOrder/i.test(valor)) return true;
  return null;
}

/**
 * Saca la oferta del bloque `Product` del JSON-LD.
 *
 * Solo mira objetos de PRIMER nivel: el producto real anida en `isSimilarTo`
 * otros productos (los "también te puede interesar") y quedarnos con uno de
 * esos daría el precio de otra zapatilla.
 */
export function ofertaDeJsonLd(textos: string[]): OfertaSnipes | null {
  for (const texto of textos) {
    let dato: any;
    try {
      dato = JSON.parse(texto);
    } catch {
      continue; // Snipes emite algún <script> ld+json vacío
    }
    for (const nodo of Array.isArray(dato) ? dato : [dato]) {
      if (!nodo || typeof nodo !== "object") continue;
      const tipos = Array.isArray(nodo["@type"]) ? nodo["@type"] : [nodo["@type"]];
      if (!tipos.includes("Product")) continue;

      const oferta = Array.isArray(nodo.offers) ? nodo.offers[0] : nodo.offers;
      if (!oferta) continue;

      const precio = Number(oferta.price);
      return {
        nombre: typeof nodo.name === "string" ? nodo.name : "",
        marca: typeof nodo.brand?.name === "string" ? nodo.brand.name : "",
        precio: Number.isFinite(precio) && precio > 0 ? precio : null,
        disponible: disponibilidad(oferta.availability),
      };
    }
  }
  return null;
}

export const snipes_eu: StoreScraper = {
  tienda: "snipes_eu",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "snipes_eu",
      url,
      precio_actual: 0,
      disponible: false,
      ultima_verificacion: today(),
    };

    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });

      const datos = (await page.evaluate(
        `(() => {
          const lds = Array.prototype.slice
            .call(document.querySelectorAll('script[type="application/ld+json"]'))
            .map(function (s) { return s.textContent || ""; });
          return {
            lds: lds,
            h1: document.querySelector("h1") ? (document.querySelector("h1").textContent || "").trim() : "",
            titulo: document.title || "",
          };
        })()`
      )) as { lds: string[]; h1: string; titulo: string };

      const oferta = ofertaDeJsonLd(datos.lds);
      // Sin Product en el JSON-LD no hay ficha: es la 404 de una búsqueda muerta.
      if (!oferta) return { ...base, disponible: false };

      // Identidad. El nombre del LD viene sin marca ("Air Jordan 4 Retro
      // \"Toro Bravo\""), así que la anteponemos; el <title> ya la lleva.
      const candidatos = [
        `${oferta.marca} ${oferta.nombre}`.trim(),
        datos.h1,
        datos.titulo,
      ].filter((t) => t.trim().length > 0);
      if (!candidatos.some((t) => matchesShoe(t, shoe.marca, shoe.modelo))) {
        return { ...base, disponible: false };
      }

      if (oferta.disponible === false) return { ...base, disponible: false };
      if (oferta.precio === null) return { ...base, disponible: false };

      return { ...base, precio_actual: oferta.precio, disponible: true };
    } catch {
      return base;
    }
  },
};
