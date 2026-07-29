/**
 * Scraper para El Corte Inglés (elcorteingles.es)
 *
 * Es la tienda con mejor comisión del programa (6%) y 34 enlaces en el catálogo,
 * pero no tenía scraper: sus precios solo se actualizaban a mano.
 *
 * Dos particularidades de ECI:
 *  1. Si entras DIRECTO a una ficha sin sesión, responde con un bucle de
 *     "Challenge Validation". Visitando primero la home se crean las cookies y
 *     ya sirve las fichas con normalidad. Se hace una sola vez por contexto.
 *  2. El JSON-LD lista DOS precios: el de venta y el PVP original
 *     (p. ej. 90,99 y 129,99). Nos quedamos con el menor, que es el que paga
 *     el usuario; coger el primero a ciegas devolvería el PVP en algunas fichas.
 */
import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

/** El "calentamiento" de cookies vale para todo el contexto del navegador. */
let warmedUp = false;

async function warmUp(page: Page): Promise<void> {
  if (warmedUp) return;
  warmedUp = true;
  await page
    .goto("https://www.elcorteingles.es/", { waitUntil: "domcontentloaded", timeout: 25000 })
    .catch(() => {});
  await page.waitForTimeout(2000);
}

export const elcorteingles_es: StoreScraper = {
  tienda: "elcorteingles_es",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "elcorteingles_es",
      url,
      precio_actual: 0,
      disponible: false,
      ultima_verificacion: today(),
    };

    try {
      await warmUp(page);

      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });
      // Hay que esperar al JSON-LD que YA trae el precio: el <h1> se pinta antes
      // que él, así que esperar por el h1 devolvía la ficha todavía sin precio.
      // (como string: esbuild inyecta helpers que no existen en el navegador)
      await page
        .waitForFunction(
          `Array.prototype.slice.call(document.querySelectorAll('script[type="application/ld+json"]')).some(function (s) { return (s.textContent || "").indexOf('"price"') !== -1; })`,
          { timeout: 12000 }
        )
        .catch(() => {});

      // Si aun así saltó el reto de bot, no inventamos nada: se conserva el precio editorial.
      const titulo = await page.title().catch(() => "");
      if (/challenge|validation/i.test(titulo)) return { ...base, disponible: false };

      const ld = await page
        .$$eval('script[type="application/ld+json"]', (nodes) =>
          nodes.map((n) => n.textContent || "").filter((t) => t.includes('"price"'))
        )
        .catch(() => [] as string[]);
      const ldTexto = ld[0] ?? "";

      // Identidad: la ficha puede haber cambiado de producto. Validamos contra
      // h1 + <title> + marca/nombre del JSON-LD (cualquiera que case vale).
      const h1 = await page.$eval("h1", (el) => el.textContent?.trim() ?? "").catch(() => "");
      const ldNombre = (ldTexto.match(/"name"\s*:\s*"([^"]+)"/) || [])[1] ?? "";
      const ldMarca = (ldTexto.match(/"brand"[^}]{0,80}?"name"\s*:\s*"([^"]+)"/) || [])[1] ?? "";

      const candidatos = [h1, titulo, [ldMarca, ldNombre].filter(Boolean).join(" ")].filter(
        (t) => t.trim().length > 0
      );
      if (candidatos.length === 0) return { ...base, disponible: false };
      if (!candidatos.some((t) => matchesShoe(t, shoe.marca, shoe.modelo))) {
        return { ...base, disponible: false };
      }

      // Disponibilidad: el JSON-LD trae UNA oferta POR TALLA, así que casi
      // siempre hay alguna agotada. El producto se puede comprar mientras quede
      // al menos una talla InStock (buscar OutOfStock daba agotado casi todo).
      const hayStock = /"availability"\s*:\s*"[^"]*InStock"/i.test(ldTexto);
      const hayDisponibilidad = /"availability"/i.test(ldTexto);
      if (hayDisponibilidad && !hayStock) return { ...base, disponible: false };

      // Precio de venta = el menor de los del JSON-LD (el otro es el PVP tachado).
      const precios = [...ldTexto.matchAll(/"price"\s*:\s*"?([\d.]+)/g)]
        .map((m) => parseFloat(m[1]))
        .filter((p) => Number.isFinite(p) && p > 0);
      if (precios.length > 0) {
        return { ...base, precio_actual: Math.min(...precios), disponible: true };
      }

      // Plan B: precio visible en el DOM.
      const textos = await page
        .$$eval('[class*="price-sale"], [class*="prices-price"], [itemprop="price"]', (els) =>
          els.map((el) => (el as HTMLElement).getAttribute("content") || el.textContent?.trim() || "")
        )
        .catch(() => [] as string[]);
      const precio = textos.map((t) => parsePrice(t)).find((p): p is number => p !== null);
      if (precio) return { ...base, precio_actual: precio, disponible: true };

      return { ...base, disponible: false };
    } catch {
      return base;
    }
  },
};
