/**
 * Scraper genérico para tiendas sin scraper específico:
 * puma_es, reebok_es, kickscrew
 * Estrategia: JSON-LD → og:price meta → cualquier selector de precio
 */
import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

function makeGenericScraper(tienda: string, baseUrl: string): StoreScraper {
  return {
    tienda,
    async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
      const base: ScrapeResult = {
        tienda,
        url,
        precio_actual: 0,
        disponible: false,
        ultima_verificacion: today(),
      };

      try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });

        // Aceptar cookies genérico
        const cookieBtn = page.locator(
          'button:has-text("Aceptar"), button:has-text("Accept"), #accept-cookies, .cookie-accept'
        );
        if (await cookieBtn.first().isVisible({ timeout: 3000 }).catch(() => false)) {
          await cookieBtn.first().click();
          await page.waitForTimeout(500);
        }

        await page.waitForTimeout(1500);

        // 1. JSON-LD schema.org/Product
        const jsonLds = await page.$$eval(
          'script[type="application/ld+json"]',
          (els) => els.map((el) => el.textContent ?? "")
        );
        for (const raw of jsonLds) {
          try {
            const data = JSON.parse(raw);
            const items = Array.isArray(data) ? data : [data];
            for (const item of items) {
              if (item["@type"] === "Product") {
                const offers = Array.isArray(item.offers) ? item.offers : [item.offers];
                for (const offer of offers) {
                  const p = parseFloat(offer?.price ?? "");
                  if (p > 0) return { ...base, precio_actual: p, disponible: true };
                }
              }
            }
          } catch { /* continue */ }
        }

        // 2. meta og:price
        const ogPrice = await page
          .$eval('meta[property="product:price:amount"]', (el) =>
            el.getAttribute("content") ?? ""
          )
          .catch(() => "");
        if (ogPrice) {
          const price = parsePrice(ogPrice);
          if (price) return { ...base, precio_actual: price, disponible: true };
        }

        // 3. Resultados de búsqueda — primer match
        const isSearch =
          url.includes("search") || url.includes("buscar") || url.includes("?q=");

        if (isSearch) {
          const cards = await page.$$('article, [class*="product-card"], [class*="ProductCard"]');
          for (const card of cards.slice(0, 6)) {
            const titleEl = await card.$('h2, h3, h4, [class*="name"], [class*="title"]');
            const title = (await titleEl?.textContent()) ?? "";
            if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

            const priceEl = await card.$('[class*="price"], .price');
            const priceText = (await priceEl?.textContent()) ?? "";
            const price = parsePrice(priceText);
            if (!price) continue;

            const linkEl = await card.$("a");
            const href = await linkEl?.getAttribute("href");
            const productUrl = href?.startsWith("http")
              ? href
              : href
              ? `${baseUrl}${href}`
              : url;

            return { ...base, url: productUrl, precio_actual: price, disponible: true };
          }
        }

        // 4. Cualquier elemento con clase "price" en la página
        const priceEl = page.locator('[class*="price"], .price, [data-price]').first();
        if (await priceEl.isVisible({ timeout: 4000 }).catch(() => false)) {
          const priceText = await priceEl.textContent();
          const price = parsePrice(priceText ?? "");
          if (price) return { ...base, precio_actual: price, disponible: true };
        }

        return { ...base, disponible: false };
      } catch {
        return base;
      }
    },
  };
}

export const puma_es = makeGenericScraper("puma_es", "https://es.puma.com");
export const reebok_es = makeGenericScraper("reebok_es", "https://www.reebok.es");
export const kickscrew = makeGenericScraper("kickscrew", "https://www.kickscrew.com");
