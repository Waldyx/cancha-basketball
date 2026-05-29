import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

/**
 * Convierte una URL de búsqueda antigua (`?q=curry+12`) al formato actual de
 * JD Sports, que lleva la consulta en la RUTA: `/search/curry+12/`.
 * El formato `?q=` quedó obsoleto en 2025 (devuelve 404).
 */
function toSearchUrl(url: string): string {
  try {
    const u = new URL(url);
    const q = u.searchParams.get("q");
    if (q) {
      const term = q.trim().replace(/\s+/g, "+");
      return `https://www.jdsports.es/search/${term}/`;
    }
  } catch {
    /* url no parseable → se usa tal cual */
  }
  return url;
}

export const jd_sports_es: StoreScraper = {
  tienda: "jd_sports_es",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "jd_sports_es",
      url,
      precio_actual: 0,
      disponible: false,
      ultima_verificacion: today(),
    };

    try {
      const searchUrl = toSearchUrl(url);

      // JD devuelve un status raro (204/error) en la página de búsqueda aunque
      // renderice contenido → usamos "commit" e ignoramos el rechazo de goto.
      await page
        .goto(searchUrl, { waitUntil: "commit", timeout: 30000 })
        .catch(() => {});

      // Aceptar cookies (OneTrust)
      const cookieBtn = page.locator(
        '#onetrust-accept-btn-handler, button:has-text("Aceptar")'
      );
      if (await cookieBtn.first().isVisible({ timeout: 4000 }).catch(() => false)) {
        await cookieBtn.first().click().catch(() => {});
        await page.waitForTimeout(800);
      }

      // Esperar a que cargue la lista de productos (render por JS)
      await page
        .waitForSelector("li.productListItem", { timeout: 15000 })
        .catch(() => {});
      await page.waitForTimeout(1500);

      const cards = await page.$$("li.productListItem");

      for (const card of cards.slice(0, 12)) {
        // El nombre y el precio vienen en el texto de la tarjeta.
        const text = (await card.innerText().catch(() => "")) ?? "";

        if (!matchesShoe(text, shoe.marca, shoe.modelo)) continue;

        // Precio: primer patrón "XX,XX €" del texto de la tarjeta.
        const priceMatch = text.match(/(\d{1,4}[.,]\d{2})\s*€/);
        const price = priceMatch ? parsePrice(priceMatch[1]) : null;
        if (!price) continue;

        // URL directa al producto
        const linkEl = await card.$('a.itemImage, a[data-e2e="plp-productList-link"], a');
        const href = await linkEl?.getAttribute("href");
        const productUrl = href?.startsWith("http")
          ? href
          : href
          ? `https://www.jdsports.es${href}`
          : searchUrl;

        return { ...base, url: productUrl, precio_actual: price, disponible: true };
      }

      return { ...base, disponible: false };
    } catch {
      return base;
    }
  },
};
