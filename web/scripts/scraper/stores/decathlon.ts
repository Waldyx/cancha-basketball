import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

export const decathlon: StoreScraper = {
  tienda: "decathlon",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "decathlon",
      url,
      precio_actual: 0,
      disponible: false,
      ultima_verificacion: today(),
    };

    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });

      // Rechazar cookies
      const cookieBtn = page.locator(
        'button[id*="decline"], button[id*="reject"], button:has-text("Rechazar")'
      );
      if (await cookieBtn.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await cookieBtn.first().click();
        await page.waitForTimeout(500);
      }

      // Página de búsqueda
      const isSearch =
        url.includes("/search") || url.includes("Ntt=") || url.includes("q=");

      if (isSearch) {
        await page.waitForSelector(
          '[data-testid="product-card"], .product-card, article',
          { timeout: 12000 }
        );

        const cards = await page.$$('[data-testid="product-card"], .product-card, article');

        for (const card of cards.slice(0, 6)) {
          const titleEl = await card.$('[data-testid="product-name"], h3, .product-name');
          const title = (await titleEl?.textContent()) ?? "";

          if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

          const priceEl = await card.$('[data-testid="price"], .price, [class*="price"]');
          const priceText = (await priceEl?.textContent()) ?? "";
          const price = parsePrice(priceText);
          if (!price) continue;

          const linkEl = await card.$("a");
          const href = await linkEl?.getAttribute("href");
          const productUrl = href?.startsWith("http")
            ? href
            : href
            ? `https://www.decathlon.es${href}`
            : url;

          return { ...base, url: productUrl, precio_actual: price, disponible: true };
        }
      } else {
        // Página de producto directa
        await page.waitForSelector('[data-testid="price"], .price, [class*="price"]', {
          timeout: 10000,
        });

        const priceEl = page.locator('[data-testid="price"], .price').first();
        const priceText = await priceEl.textContent({ timeout: 5000 });
        const price = parsePrice(priceText ?? "");

        if (price) {
          return { ...base, precio_actual: price, disponible: true };
        }
      }

      return { ...base, disponible: false };
    } catch {
      return base;
    }
  },
};
