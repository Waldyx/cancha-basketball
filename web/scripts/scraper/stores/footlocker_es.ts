import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

export const footlocker_es: StoreScraper = {
  tienda: "footlocker_es",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "footlocker_es",
      url,
      precio_actual: 0,
      disponible: false,
      ultima_verificacion: today(),
    };

    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });

      // Cookies
      const cookieBtn = page.locator('button:has-text("Aceptar"), #onetrust-accept-btn-handler');
      if (await cookieBtn.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await cookieBtn.first().click();
        await page.waitForTimeout(600);
      }

      await page.waitForSelector('.ProductCard, [class*="ProductCard"], article', {
        timeout: 15000,
      });

      const cards = await page.$$('.ProductCard, [class*="ProductCard"]');

      for (const card of cards.slice(0, 8)) {
        const titleEl = await card.$('[class*="name"], [class*="title"], h3, h4');
        const title = (await titleEl?.textContent()) ?? "";

        if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

        const priceEl = await card.$('[class*="price"], [data-qa="price"]');
        const priceText = (await priceEl?.textContent()) ?? "";
        const price = parsePrice(priceText);
        if (!price) continue;

        const linkEl = await card.$("a");
        const href = await linkEl?.getAttribute("href");
        const productUrl = href?.startsWith("http")
          ? href
          : href
          ? `https://www.footlocker.es${href}`
          : url;

        return { ...base, url: productUrl, precio_actual: price, disponible: true };
      }

      return { ...base, disponible: false };
    } catch {
      return base;
    }
  },
};
