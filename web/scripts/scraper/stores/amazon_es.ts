import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

export const amazon_es: StoreScraper = {
  tienda: "amazon_es",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "amazon_es",
      url,
      precio_actual: 0,
      disponible: false,
      ultima_verificacion: today(),
    };

    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });

      // Aceptar cookies si aparece el modal
      const cookieBtn = page.locator("#sp-cc-accept, #accept-button");
      if (await cookieBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await cookieBtn.click();
        await page.waitForTimeout(800);
      }

      // Esperar resultados de búsqueda
      await page.waitForSelector(
        '[data-component-type="s-search-result"], .s-result-item',
        { timeout: 12000 }
      );

      // Recoger todos los resultados
      const results = await page.$$('[data-component-type="s-search-result"]');

      for (const result of results.slice(0, 8)) {
        const titleEl = await result.$("h2 span, .a-size-base-plus");
        const title = (await titleEl?.textContent()) ?? "";

        if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

        // Precio: parte entera + fracción
        const whole =
          (await result
            .$eval(
              ".a-price-whole",
              (el) => el.textContent?.replace(/[^\d]/g, "") ?? ""
            )
            .catch(() => "")) ?? "";
        const frac =
          (await result
            .$eval(
              ".a-price-fraction",
              (el) => el.textContent?.replace(/[^\d]/g, "") ?? ""
            )
            .catch(() => "00")) ?? "00";

        if (!whole) continue;

        const price = parsePrice(`${whole}.${frac}`);
        if (!price) continue;

        // URL directa al producto
        const linkEl = await result.$("h2 a, a.a-link-normal");
        const href = await linkEl?.getAttribute("href");
        const productUrl = href
          ? `https://www.amazon.es${href.split("?")[0]}`
          : url;

        return {
          ...base,
          url: productUrl,
          precio_actual: price,
          disponible: true,
        };
      }

      return { ...base, disponible: false };
    } catch {
      return base;
    }
  },
};
