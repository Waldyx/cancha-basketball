import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { parsePrice, today } from "../matcher.js";

export const nike_es: StoreScraper = {
  tienda: "nike_es",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "nike_es",
      url,
      precio_actual: 0,
      disponible: false,
      ultima_verificacion: today(),
    };

    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });

      // Aceptar cookies
      const cookieBtn = page.locator('button[id*="accept"], button:has-text("Aceptar todo")');
      if (await cookieBtn.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await cookieBtn.first().click();
        await page.waitForTimeout(800);
      }

      // Nike ES usa URLs directas de producto (/t/modelo-...)
      // Esperar precio en página de producto
      await page.waitForSelector(
        '[data-testid="product-price"], .product-price, [class*="Price"]',
        { timeout: 15000 }
      );

      // Intentar JSON-LD primero (más fiable)
      const jsonLdText = await page
        .$eval('script[type="application/ld+json"]', (el) => el.textContent ?? "")
        .catch(() => "");

      if (jsonLdText) {
        try {
          const data = JSON.parse(jsonLdText);
          const price =
            data?.offers?.price ??
            data?.offers?.[0]?.price ??
            null;
          if (price) {
            const numPrice = parseFloat(String(price));
            if (numPrice > 0) {
              return { ...base, precio_actual: numPrice, disponible: true };
            }
          }
        } catch { /* fallback */ }
      }

      // CSS selector fallback
      const priceEl = page
        .locator(
          '[data-testid="product-price"], .product-price, [class*="ProductPrice"]'
        )
        .first();
      const priceText = await priceEl.textContent({ timeout: 5000 });
      const price = parsePrice(priceText ?? "");

      if (price) return { ...base, precio_actual: price, disponible: true };

      return { ...base, disponible: false };
    } catch {
      return base;
    }
  },
};
