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
      // Quitar tag de afiliado para el scraping (evita tratamiento diferencial de Amazon)
      const scrapeUrl = url.replace(/[?&]tag=[^&]+/, (m) =>
        m.startsWith("?") ? "?" : ""
      ).replace(/\?$/, "").replace(/&&/, "&");

      await page.goto(scrapeUrl, { waitUntil: "domcontentloaded", timeout: 25000 });

      // Aceptar cookies si aparece el modal
      const cookieBtn = page.locator("#sp-cc-accept, #accept-button");
      if (await cookieBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await cookieBtn.click();
        await page.waitForTimeout(800);
      }

      // ── Ficha de producto (/dp/ASIN) ────────────────────────────────────────
      // No tiene resultados de búsqueda: si esperásemos el selector de listado
      // daría timeout y la zapa se marcaba "no encontrada" (12 links del catálogo).
      if (/\/dp\/|\/gp\/product\//.test(scrapeUrl)) {
        const titulo = await page
          .$eval("#productTitle", (el) => el.textContent?.trim() ?? "")
          .catch(() => "");
        if (!titulo || !matchesShoe(titulo, shoe.marca, shoe.modelo)) {
          return { ...base, disponible: false };
        }
        // El precio vive en distintos contenedores según el tipo de oferta, y el
        // primer `.a-offscreen` del DOM suele venir VACÍO: recogemos todos los
        // candidatos en orden y nos quedamos con el primero que parsee.
        const candidatos = await page
          .$$eval(
            "#corePrice_feature_div .a-offscreen, #corePriceDisplay_desktop_feature_div .a-offscreen, #price_inside_buybox, .a-price .a-offscreen",
            (els) => els.map((el) => el.textContent?.trim() ?? "")
          )
          .catch(() => [] as string[]);
        const precio = candidatos.map((t) => parsePrice(t)).find((p): p is number => p !== null);
        if (!precio) return { ...base, disponible: false };
        return { ...base, precio_actual: precio, disponible: true };
      }

      // Esperar resultados de búsqueda
      await page.waitForSelector(
        '[data-component-type="s-search-result"], .s-result-item',
        { timeout: 12000 }
      );

      // Recoger todos los resultados
      const results = await page.$$('[data-component-type="s-search-result"]');

      for (const result of results.slice(0, 8)) {
        // Amazon (2025+) separa marca y modelo en elementos distintos, así que
        // usamos el texto completo del resultado para la comparación fuzzy.
        const title = (await result.innerText().catch(() => "")) ?? "";

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
