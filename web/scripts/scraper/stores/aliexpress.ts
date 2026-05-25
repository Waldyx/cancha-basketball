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
      // AliExpress: los links de afiliado (s.click.aliexpress.com) redirigen a búsqueda
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForTimeout(3000); // esperar JS + redirect

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

      // Segundo fallback: buscar en resultados de búsqueda (formato 2024/2025)
      const cards = await page.$$(
        '[class*="SearchCard"], [class*="list--gallery"], [class*="product-card"], ' +
        '[class*="ProductCard"], [class*="card--"]'
      );
      for (const card of cards.slice(0, 10)) {
        const titleEl = await card.$('[class*="title"], [class*="Title"], h3, h4');
        const title = (await titleEl?.textContent()) ?? "";
        if (title.length < 3) continue;

        // Para AliExpress de marcas chinas, ser menos estricto con el match
        // (los títulos suelen estar en inglés con nombres de modelo distintos)
        const priceEl = await card.$('[class*="price"], [class*="Price"]');
        const priceText = (await priceEl?.textContent()) ?? "";
        const price = parsePrice(priceText);
        if (!price || price < 20) continue;

        // Si hay título razonable y precio válido, aceptar (son productos de la búsqueda correcta)
        return { ...base, precio_actual: price, disponible: true };
      }

      // Tercer fallback: extraer cualquier precio visible en rango razonable
      const allPriceEls = await page.$$('[class*="price"], [class*="Price"]');
      const prices: number[] = [];
      for (const el of allPriceEls.slice(0, 20)) {
        const text = (await el.textContent()) ?? "";
        const p = parsePrice(text);
        if (p && p > 30 && p < 400) prices.push(p);
      }
      if (prices.length >= 2) {
        return { ...base, precio_actual: Math.min(...prices), disponible: true };
      }

      return { ...base, disponible: false };
    } catch {
      return base;
    }
  },
};
