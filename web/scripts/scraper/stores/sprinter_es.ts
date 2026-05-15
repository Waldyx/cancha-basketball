import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

export const sprinter_es: StoreScraper = {
  tienda: "sprinter_es",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "sprinter_es",
      url,
      precio_actual: 0,
      disponible: false,
      ultima_verificacion: today(),
    };

    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });

      const cookieBtn = page.locator('button:has-text("Aceptar"), #onetrust-accept-btn-handler');
      if (await cookieBtn.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await cookieBtn.first().click();
        await page.waitForTimeout(500);
      }

      const isSearch = url.includes("/search") || url.includes("?q=") || url.includes("buscar");

      if (isSearch) {
        await page.waitForSelector('.product-tile, [class*="product-card"], article', {
          timeout: 12000,
        });

        const cards = await page.$$('.product-tile, [class*="ProductCard"]');

        for (const card of cards.slice(0, 8)) {
          const titleEl = await card.$('.product-name, h3, [class*="name"]');
          const title = (await titleEl?.textContent()) ?? "";

          if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

          const priceEl = await card.$('.price, .js-price-value, [class*="price"]');
          const priceText = (await priceEl?.textContent()) ?? "";
          const price = parsePrice(priceText);
          if (!price) continue;

          const linkEl = await card.$("a");
          const href = await linkEl?.getAttribute("href");
          const productUrl = href?.startsWith("http")
            ? href
            : href
            ? `https://www.sprinter.es${href}`
            : url;

          return { ...base, url: productUrl, precio_actual: price, disponible: true };
        }
      } else {
        await page.waitForSelector('.price, .js-price-value', { timeout: 10000 });
        const priceEl = page.locator('.price, .js-price-value').first();
        const priceText = await priceEl.textContent({ timeout: 5000 });
        const price = parsePrice(priceText ?? "");
        if (price) return { ...base, precio_actual: price, disponible: true };
      }

      return { ...base, disponible: false };
    } catch {
      return base;
    }
  },
};
