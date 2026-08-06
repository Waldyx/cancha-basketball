/**
 * Scraper para Atmósfera Sport (atmosferasport.es)
 *
 * 27 enlaces en el catálogo (Awin 26255, 6%) y CERO verificados, mediana 55
 * días. Sin protección anti-bot: la ficha responde 200 al primer intento.
 *
 * Particularidad frente a las demás tiendas: su JSON-LD es un `ProductGroup`
 * que NO expone la disponibilidad real por talla. El único sitio donde está el
 * stock es el selector de tallas del DOM, que marca las agotadas con las clases
 * `attribute-not-in-stock out_of_stock`. Mismo criterio que en ECI: el producto
 * es comprable mientras quede AL MENOS una talla.
 */
import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

export interface TallaAtmosfera {
  texto: string;
  clases: string;
}

/**
 * ¿Queda alguna talla comprable?
 *
 * Ignora el placeholder "Selecciona una talla": no lleva clase de agotado, así
 * que contarlo daría por disponible un producto sin ni una talla en stock. Por
 * eso solo miramos entradas cuyo texto parezca una talla (lleva dígitos).
 */
export function hayTallaDisponible(tallas: TallaAtmosfera[]): boolean {
  return tallas.some(
    (t) =>
      /\d/.test(t.texto) && !/attribute-not-in-stock|out_of_stock/i.test(t.clases)
  );
}

export const atmosfera_sport: StoreScraper = {
  tienda: "atmosfera_sport",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "atmosfera_sport",
      url,
      precio_actual: 0,
      disponible: false,
      ultima_verificacion: today(),
    };

    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });

      const datos = await page.evaluate(
        `(() => {
          const meta = (p) => document.querySelector('meta[property="' + p + '"]');
          const tallas = Array.prototype.slice
            .call(document.querySelectorAll('[class*="size" i] li, [class*="size" i] option, [class*="talla" i] li'))
            .map(function (e) { return { texto: (e.textContent || "").trim(), clases: e.className || "" }; });
          return {
            precio: meta("product:price:amount") ? meta("product:price:amount").getAttribute("content") : null,
            h1: document.querySelector("h1") ? (document.querySelector("h1").textContent || "").trim() : "",
            titulo: document.title || "",
            tallas: tallas,
          };
        })()`
      ) as { precio: string | null; h1: string; titulo: string; tallas: TallaAtmosfera[] };

      // Identidad. El <title> lleva " | Atmósfera Sport" pegado, pero matchesShoe
      // ya limpia ruido y le basta con encontrar marca + modelo.
      const candidatos = [datos.h1, datos.titulo].filter((t) => t.trim().length > 0);
      if (candidatos.length === 0) return { ...base, disponible: false };
      if (!candidatos.some((t) => matchesShoe(t, shoe.marca, shoe.modelo))) {
        return { ...base, disponible: false };
      }

      // Si hay selector de tallas y ninguna es comprable → agotada.
      // Si no hay selector, no afirmamos nada por esta vía y seguimos al precio.
      const conTallas = datos.tallas.filter((t) => /\d/.test(t.texto));
      if (conTallas.length > 0 && !hayTallaDisponible(datos.tallas)) {
        return { ...base, disponible: false };
      }

      const precio = datos.precio ? parseFloat(datos.precio) : null;
      if (precio && Number.isFinite(precio) && precio > 0) {
        return { ...base, precio_actual: precio, disponible: true };
      }

      // Plan B: precio visible. OJO, el bloque de precio de Atmósfera lista
      // PVP, ahorro y precio final juntos ("160,00 € 72,00 € 45% 88,00 €"),
      // así que nos quedamos con el MENOR, que es el que se paga.
      const textos = await page
        .$$eval('[class*="price" i]', (els) => els.map((el) => el.textContent?.trim() || ""))
        .catch(() => [] as string[]);
      const precios = textos
        .map((t) => parsePrice(t))
        .filter((p): p is number => p !== null && p > 0);
      if (precios.length > 0) {
        return { ...base, precio_actual: Math.min(...precios), disponible: true };
      }

      return { ...base, disponible: false };
    } catch {
      return base;
    }
  },
};
