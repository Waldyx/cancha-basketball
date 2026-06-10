/**
 * Scraper para Adidas España (adidas.es)
 *
 * Estrategia:
 *  - adidas.es está protegido por Akamai WAF → fetch HTTP plano devuelve 403.
 *    Solo CloakBrowser (Chromium stealth) consigue HTML hidratado.
 *  - La URL del catálogo suele ser un wrapper Awin
 *    (https://www.awin1.com/cread.php?awinmid=77008&...&ued=ENCODED_URL).
 *    Reconstruimos siempre una URL de búsqueda canónica desde marca+modelo
 *    para evitar URLs históricas obsoletas y eludir el redirect Awin.
 *  - Selectores actuales (2026) — el frontend "Glass" usa data-testid:
 *      article[data-testid="plp-product-card"]
 *        a[data-testid="product-card-image-link"] → href
 *        [data-testid="main-price"]              → precio
 *        [data-testid="product-card-title"]      → título
 */
import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

const BASE = "https://www.adidas.es";

/**
 * Adidas usa nombres extendidos diferentes a los del catálogo. Normaliza el
 * título del producto a la nomenclatura corta del catálogo antes de matchear.
 */
function normalizeAdidasTitle(title: string): string {
  return title
    // Harden Volume/Volumen N → Harden Vol N
    .replace(/Harden\s+Volum(?:e|en)\s+(\d+)/i, "Harden Vol $1")
    // Anthony Edwards N → AE N
    .replace(/Anthony\s+Edwards\s+(\d+)/i, "AE $1")
    // D.O.N. Issue / Donovan Mitchell → DON Issue
    .replace(/Donovan\s+Mitchell\s+(\d+)/i, "DON Issue $1")
    .replace(/D\.O\.N\.\s+Issue\s+(\d+)/i, "DON Issue $1");
}

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

    // URL search canónica (evita URLs Awin/historiales)
    const searchUrl = `${BASE}/search?q=${encodeURIComponent(`${shoe.marca} ${shoe.modelo}`.toLowerCase())}`;

    try {
      await page.goto(searchUrl, { waitUntil: "domcontentloaded", timeout: 30000 });

      // Aceptar cookies GDPR de Adidas
      const gdprBtn = page.locator(
        'button[data-auto-id="glass-gdpr-default-consent-accept-button"], ' +
          'button:has-text("Aceptar"), button:has-text("Accept all")'
      );
      if (
        await gdprBtn.first().isVisible({ timeout: 4000 }).catch(() => false)
      ) {
        await gdprBtn.first().click();
        await page.waitForTimeout(800);
      }

      // Esperar a que carguen los product cards
      await page
        .waitForSelector('[data-testid="plp-product-card"]', { timeout: 15000 })
        .catch(() => {});

      const cards = await page.$$('article[data-testid="plp-product-card"]');

      for (const card of cards.slice(0, 15)) {
        const title =
          (await card
            .$eval('[data-testid="product-card-title"]', (el) => el.textContent?.trim() ?? "")
            .catch(() => "")) || "";
        if (!title) continue;
        // Filtra modelos junior (la versión adulto matchearía igual y a menor precio)
        if (/(Niñ[oa]s?|Bebé|Junior|Infantil)/i.test(title)) continue;
        // Adidas usa nombres extendidos ("Harden Volume 9", "Anthony Edwards 2")
        // que normalizamos a la nomenclatura corta del catálogo ("Vol 9", "AE 2").
        const normalized = normalizeAdidasTitle(title);
        // En adidas.es, la marca "Adidas" no aparece en el título.
        // Inyectamos para que el filtro de marca del matcher pase.
        const titleForMatch = /^adidas/i.test(normalized) ? normalized : `Adidas ${normalized}`;
        if (!matchesShoe(titleForMatch, shoe.marca, shoe.modelo)) continue;

        const priceText =
          (await card
            .$eval('[data-testid="main-price"]', (el) => el.textContent?.trim() ?? "")
            .catch(() => "")) || "";
        const price = parsePrice(priceText);
        if (!price || price < 20 || price > 500) continue;

        const href =
          (await card
            .$eval(
              'a[data-testid="product-card-image-link"]',
              (el) => (el as HTMLAnchorElement).href
            )
            .catch(() => "")) || "";
        const productUrl = href || searchUrl;

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
