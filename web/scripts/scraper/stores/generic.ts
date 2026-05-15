/**
 * Scraper genérico para tiendas sin scraper específico: reebok_es, kickscrew
 * Estrategia: JSON-LD → og:price meta → CSS price selectors → búsqueda fuzzy
 *
 * NOTA: puma_es tiene su propio scraper dedicado en puma_es.ts
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
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 22000 });

        // Aceptar cookies genérico — múltiples patrones
        const cookieSelectors = [
          '#onetrust-accept-btn-handler',
          'button:has-text("Aceptar todo")',
          'button:has-text("Accept all")',
          'button:has-text("Aceptar")',
          'button:has-text("Accept")',
          '#accept-cookies',
          '.cookie-accept',
          '[data-testid="cookie-accept"]',
        ];
        for (const sel of cookieSelectors) {
          const btn = page.locator(sel).first();
          if (await btn.isVisible({ timeout: 2000 }).catch(() => false)) {
            await btn.click().catch(() => {});
            await page.waitForTimeout(500);
            break;
          }
        }

        await page.waitForTimeout(1500);

        // 1. JSON-LD schema.org/Product (más fiable)
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
                  const p =
                    parseFloat(offer?.price ?? "") ||
                    parseFloat(offer?.lowPrice ?? "") ||
                    0;
                  if (p > 0 && p < 2000) return { ...base, precio_actual: p, disponible: true };
                }
              }
            }
          } catch { /* continue */ }
        }

        // 2. meta og:price / twitter:data1
        for (const prop of [
          'meta[property="product:price:amount"]',
          'meta[name="twitter:data1"]',
          'meta[property="og:price:amount"]',
        ]) {
          const content = await page
            .$eval(prop, (el) => el.getAttribute("content") ?? "")
            .catch(() => "");
          if (content) {
            const price = parsePrice(content);
            if (price) return { ...base, precio_actual: price, disponible: true };
          }
        }

        // 3. Resultados de búsqueda — primer match fuzzy
        const isSearch =
          url.includes("search") || url.includes("buscar") || url.includes("?q=") || url.includes("?s=");

        if (isSearch) {
          await page.waitForSelector(
            'article, [class*="product-card"], [class*="ProductCard"], [class*="product_card"]',
            { timeout: 8000 }
          ).catch(() => {});

          const cards = await page.$$(
            'article, [class*="product-card"], [class*="ProductCard"], [class*="product_card"], li[class*="product"]'
          );
          for (const card of cards.slice(0, 8)) {
            const titleEl = await card.$('h2, h3, h4, [class*="name"], [class*="title"], [class*="Name"]');
            const title = (await titleEl?.textContent()) ?? "";
            if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

            const priceEl = await card.$('[class*="price"]:not([class*="original"]):not([class*="old"]), .price, [data-price]');
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

        // 4. Precio en página de producto — selectores CSS amplios
        const priceCssSelectors = [
          '[data-testid="product-price"]',
          '[class*="ProductPrice"]',
          '[class*="product-price"]:not([class*="original"])',
          '[class*="sale-price"]',
          '[itemprop="price"]',
          '[class*="price"]:not([class*="original"]):not([class*="was"]):not([class*="old"]):not([class*="strike"])',
          '.price',
          '[data-price]',
        ];
        for (const sel of priceCssSelectors) {
          const el = page.locator(sel).first();
          if (await el.isVisible({ timeout: 3000 }).catch(() => false)) {
            const text = await el.textContent().catch(() => "");
            const price = parsePrice(text ?? "");
            if (price && price > 20 && price < 500) {
              return { ...base, precio_actual: price, disponible: true };
            }
          }
        }

        return { ...base, disponible: false };
      } catch {
        return base;
      }
    },
  };
}

export const reebok_es = makeGenericScraper("reebok_es", "https://www.reebok.es");
export const kickscrew = makeGenericScraper("kickscrew", "https://www.kickscrew.com");
