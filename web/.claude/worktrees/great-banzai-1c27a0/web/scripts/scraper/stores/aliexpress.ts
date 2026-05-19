import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

export const aliexpress: StoreScraper = {
  tienda: "aliexpress",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "aliexpress",
      url,
      precio_actual: 0,
      disponible: false,
      ultima_verificacion: today(),
    };

    try {
      // AliExpress: incrusta datos en window.__INIT_DATA__ o en JSON embebido
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });
      await page.waitForTimeout(2000); // esperar JS

      // Intentar extraer datos de la respuesta JSON embebida en el source
      const content = await page.content();

      // AliExpress embebe precios en JSON dentro del HTML
      const priceMatch = content.match(/"originalPrice":\s*\{[^}]*"value":\s*([\d.]+)/);
      if (priceMatch) {
        const price = parseFloat(priceMatch[1]);
        if (price > 0) return { ...base, precio_actual: price, disponible: true };
      }

      // Fallback: selector visual
      const priceEl = page.locator(
        '[class*="product-price-value"], [class*="price--currentPriceText"], .product-price-value'
      ).first();

      if (await priceEl.isVisible({ timeout: 5000 }).catch(() => false)) {
        const priceText = await priceEl.textContent();
        const price = parsePrice(priceText ?? "");
        if (price) return { ...base, precio_actual: price, disponible: true };
      }

      // Segundo fallback: buscar en resultados de búsqueda
      const cards = await page.$$('[class*="SearchCard"], [class*="list--gallery"]');
      for (const card of cards.slice(0, 6)) {
        const titleEl = await card.$('[class*="title"], h3');
        const title = (await titleEl?.textContent()) ?? "";
        if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

        const priceEl = await card.$('[class*="price"]');
        const priceText = (await priceEl?.textContent()) ?? "";
        const price = parsePrice(priceText);
        if (!price) continue;

        return { ...base, precio_actual: price, disponible: true };
      }

      return { ...base, disponible: false };
    } catch {
      return base;
    }
  },
};
