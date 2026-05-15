import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

export const adidas_es: StoreScraper = {
  tienda: "adidas_es",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "adidas_es",
      url,
      precio_actual: 0,
      disponible: false,
      ultima_verificacion: today(),
    };

    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });

      // Aceptar cookies GDPR de Adidas
      const gdprBtn = page.locator(
        'button[data-auto-id="glass-gdpr-default-consent-accept-button"], ' +
        'button:has-text("Aceptar"), button:has-text("Accept all")'
      );
      if (await gdprBtn.first().isVisible({ timeout: 4000 }).catch(() => false)) {
        await gdprBtn.first().click();
        await page.waitForTimeout(1000);
      }

      const isSearch = url.includes("/buscar") || url.includes("/search") || url.includes("?q=");

      if (isSearch) {
        await page.waitForSelector(
          '[data-auto-id="glass-product-card"], .glass-product-card',
          { timeout: 15000 }
        );

        const cards = await page.$$('[data-auto-id="glass-product-card"]');

        for (const card of cards.slice(0, 6)) {
          const titleEl = await card.$('[data-auto-id="product-card-title"], h3');
          const title = (await titleEl?.textContent()) ?? "";

          if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

          const priceEl = await card.$('[data-auto-id="glass-hockeycard-price"]');
          const priceText = (await priceEl?.textContent()) ?? "";
          const price = parsePrice(priceText);
          if (!price) continue;

          const linkEl = await card.$("a");
          const href = await linkEl?.getAttribute("href");
          const productUrl = href?.startsWith("http")
            ? href
            : href
            ? `https://www.adidas.es${href}`
            : url;

          return { ...base, url: productUrl, precio_actual: price, disponible: true };
        }
      } else {
        // Producto directo
        await page.waitForSelector(
          '[data-auto-id="product-price"], [class*="product-price"]',
          { timeout: 15000 }
        );

        const priceEl = page.locator('[data-auto-id="product-price"]').first();
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
