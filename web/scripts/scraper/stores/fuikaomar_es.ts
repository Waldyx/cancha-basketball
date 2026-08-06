/**
 * Scraper para FuikaOmar (fuikaomar.es)
 *
 * 30 enlaces en el catálogo (TradeTracker #37834, 5%) y CERO verificados: era
 * la tienda afiliada más grande sin scraper, con una mediana de 55 días.
 *
 * Es una PrestaShop normal y corriente, sin protección anti-bot: la ficha
 * responde 200 al primer intento (~3,6 s medidos). Dos detalles:
 *  1. El precio limpio está en `meta[property="product:price:amount"]`. El DOM
 *     mezcla en un mismo bloque el precio actual, el PVP tachado y el ahorro
 *     ("139,90 € IVA incluido 159,90 € 20,00 €"), así que leer el texto a pelo
 *     es pedir un fallo.
 *  2. El stock vive en el JSON-LD (`availability`), NO en un meta: PrestaShop
 *     no emite `product:availability`.
 */
import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

/**
 * Lee la disponibilidad del JSON-LD.
 * Devuelve null si la ficha no dice nada (no inventamos un "sí" ni un "no").
 * Ojo: PrestaShop escapa las barras → "https:\/\/schema.org\/InStock".
 */
export function stockDeJsonLd(ldTexto: string): boolean | null {
  if (!/"availability"/i.test(ldTexto)) return null;
  if (/"availability"\s*:\s*"[^"]*OutOfStock"/i.test(ldTexto)) return false;
  if (/"availability"\s*:\s*"[^"]*InStock"/i.test(ldTexto)) return true;
  return null;
}

export const fuikaomar_es: StoreScraper = {
  tienda: "fuikaomar_es",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "fuikaomar_es",
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
          const lds = Array.prototype.slice
            .call(document.querySelectorAll('script[type="application/ld+json"]'))
            .map(function (s) { return s.textContent || ""; });
          return {
            precio: meta("product:price:amount") ? meta("product:price:amount").getAttribute("content") : null,
            ogTitulo: meta("og:title") ? meta("og:title").getAttribute("content") : null,
            h1: document.querySelector("h1") ? (document.querySelector("h1").textContent || "").trim() : "",
            titulo: document.title || "",
            ld: lds.join(" "),
          };
        })()`
      ) as { precio: string | null; ogTitulo: string | null; h1: string; titulo: string; ld: string };

      // Identidad: la ficha pudo cambiar de producto o el enlace caducar.
      // Vale con que case cualquiera de los títulos disponibles.
      const candidatos = [datos.h1, datos.ogTitulo ?? "", datos.titulo].filter(
        (t) => t.trim().length > 0
      );
      if (candidatos.length === 0) return { ...base, disponible: false };
      if (!candidatos.some((t) => matchesShoe(t, shoe.marca, shoe.modelo))) {
        return { ...base, disponible: false };
      }

      // Agotado explícito → no lo damos por comprable. Si no dice nada (null),
      // seguimos: hay fichas sin JSON-LD de stock y el precio sigue valiendo.
      if (stockDeJsonLd(datos.ld) === false) return { ...base, disponible: false };

      const precio = datos.precio ? parseFloat(datos.precio) : null;
      if (precio && Number.isFinite(precio) && precio > 0) {
        return { ...base, precio_actual: precio, disponible: true };
      }

      // Plan B: el precio visible de la ficha (el primero es el de venta).
      const textos = await page
        .$$eval('[class*="current-price"], [itemprop="price"], .price', (els) =>
          els.map((el) => (el as HTMLElement).getAttribute("content") || el.textContent?.trim() || "")
        )
        .catch(() => [] as string[]);
      const visible = textos.map((t) => parsePrice(t)).find((p): p is number => p !== null);
      if (visible) return { ...base, precio_actual: visible, disponible: true };

      return { ...base, disponible: false };
    } catch {
      return base;
    }
  },
};
