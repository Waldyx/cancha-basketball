import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

export const zalando_es: StoreScraper = {
  tienda: "zalando_es",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "zalando_es",
      url,
      precio_actual: 0,
      disponible: false,
      ultima_verificacion: today(),
    };

    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });

      // Aceptar cookies
      const cookieBtn = page.locator(
        'button[data-testid="uc-accept-all-button"], button:has-text("Aceptar todo")'
      );
      if (await cookieBtn.isVisible({ timeout: 4000 }).catch(() => false)) {
        await cookieBtn.click();
        await page.waitForTimeout(1000);
      }

      await page.waitForSelector('article, [class*="product"]', { timeout: 15000 });

      const articles = await page.$$('article[class*="card"], article');

      for (const article of articles.slice(0, 8)) {
        const titleEl = await article.$('h3, [class*="name"], [class*="title"]');
        const title = (await titleEl?.textContent()) ?? "";

        if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

        const priceEl = await article.$('[data-testid="price"], [class*="price"], span[class*="Price"]');
        const priceText = (await priceEl?.textContent()) ?? "";
        const price = parsePrice(priceText);
        if (!price) continue;

        const linkEl = await article.$("a");
        const href = await linkEl?.getAttribute("href");
        const productUrl = href?.startsWith("http")
          ? href
          : href
          ? `https://www.zalando.es${href}`
          : url;

        return { ...base, url: productUrl, precio_actual: price, disponible: true };
      }

      return { ...base, disponible: false };
    } catch {
      return base;
    }
  },
};
