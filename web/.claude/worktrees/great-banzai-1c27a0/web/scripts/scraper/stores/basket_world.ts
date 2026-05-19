import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

export const basket_world: StoreScraper = {
  tienda: "basket_world",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "basket_world",
      url,
      precio_actual: 0,
      disponible: false,
      ultima_verificacion: today(),
    };

    try {
      // Basket World / BasketWorld.es — WooCommerce, muy accesible
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });

      const cookieBtn = page.locator('button:has-text("Aceptar"), .cookie-accept');
      if (await cookieBtn.first().isVisible({ timeout: 2000 }).catch(() => false)) {
        await cookieBtn.first().click();
      }

      // Página de búsqueda
      const isSearch = url.includes("buscar") || url.includes("search") || url.includes("?q=");

      if (isSearch) {
        await page.waitForSelector('.product, .woocommerce-product-gallery, article', {
          timeout: 10000,
        });

        const cards = await page.$$('.product, article.product');

        for (const card of cards.slice(0, 6)) {
          const titleEl = await card.$('h2, h3, .woocommerce-loop-product__title');
          const title = (await titleEl?.textContent()) ?? "";

          if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

          const priceEl = await card.$('.price, .woocommerce-Price-amount');
          const priceText = (await priceEl?.textContent()) ?? "";
          const price = parsePrice(priceText);
          if (!price) continue;

          const linkEl = await card.$("a");
          const href = await linkEl?.getAttribute("href");
          return {
            ...base,
            url: href ?? url,
            precio_actual: price,
            disponible: true,
          };
        }
      } else {
        // Página de producto directa
        await page.waitForSelector('.price, .woocommerce-Price-amount', { timeout: 10000 });
        const priceEl = page.locator('.price .woocommerce-Price-amount, .price').first();
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
