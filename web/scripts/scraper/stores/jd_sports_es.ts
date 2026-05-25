import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

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
      // JD Sports tiene protección Cloudflare — usamos wait largo y UA realista
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });

      const cookieBtn = page.locator(
        'button:has-text("Aceptar"), button[id*="accept"], #accept-cookies'
      );
      if (await cookieBtn.first().isVisible({ timeout: 4000 }).catch(() => false)) {
        await cookieBtn.first().click();
        await page.waitForTimeout(800);
      }

      await page.waitForSelector(
        '[class*="product"], article, .c-product, [data-e2e*="product"]',
        { timeout: 15000 }
      ).catch(() => {});

      // Esperar a que cargue JS (Cloudflare suele bloquear en este punto)
      await page.waitForTimeout(2000);

      const cards = await page.$$(
        '[class*="productCard"], .c-product-card, article, [data-e2e="product-card"], li[class*="product"]'
      );

      for (const card of cards.slice(0, 10)) {
        const titleEl = await card.$(
          'h3, h4, [class*="name"], [class*="title"], [data-e2e="product-name"], p[class*="name"]'
        );
        const title = (await titleEl?.textContent()) ?? "";

        if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

        // Precio en JD: clase "pri", data-testid o span con precio
        const priceEl = await card.$(
          '.pri, [data-e2e="product-price"], [class*="price"]:not([class*="original"]):not([class*="was"]), span[class*="Price"]'
        );
        const priceText = (await priceEl?.textContent()) ?? "";
        const price = parsePrice(priceText);
        if (!price) continue;

        const linkEl = await card.$("a");
        const href = await linkEl?.getAttribute("href");
        const productUrl = href?.startsWith("http")
          ? href
          : href
          ? `https://www.jdsports.es${href}`
          : url;

        return { ...base, url: productUrl, precio_actual: price, disponible: true };
      }

      return { ...base, disponible: false };
    } catch {
      return base;
    }
  },
};
