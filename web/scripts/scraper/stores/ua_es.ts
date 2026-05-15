/**
 * Scraper para Under Armour España (underarmour.com/es-es)
 * Estrategia: JSON-LD → CSS selectores UA → búsqueda con match
 */
import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

const BASE_URL = "https://www.underarmour.com";

async function acceptCookies(page: Page): Promise<void> {
  const btns = [
    '#onetrust-accept-btn-handler',
    'button:has-text("Aceptar todo")',
    'button:has-text("Accept All")',
    'button:has-text("Aceptar")',
    '[data-testid="cookie-accept"]',
  ];
  for (const sel of btns) {
    const btn = page.locator(sel).first();
    if (await btn.isVisible({ timeout: 2500 }).catch(() => false)) {
      await btn.click().catch(() => {});
      await page.waitForTimeout(700);
      return;
    }
  }
}

export const ua_es: StoreScraper = {
  tienda: "ua_es",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "ua_es",
      url,
      precio_actual: 0,
      disponible: false,
      ultima_verificacion: today(),
    };

    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });
      await acceptCookies(page);
      await page.waitForTimeout(1500);

      const isSearch =
        url.includes("/search") || url.includes("?q=") || url.includes("&q=");

      if (isSearch) {
        // Esperar tarjetas
        await page.waitForSelector(
          '[data-testid="product-card"], [class*="ProductCard"], [class*="product-card"]',
          { timeout: 10000 }
        ).catch(() => {});

        const cards = await page.$$(
          '[data-testid="product-card"], [class*="ProductCard"], li[class*="product"]'
        );

        for (const card of cards.slice(0, 8)) {
          const titleEl = await card.$(
            '[data-testid="product-name"], [class*="ProductName"], h3, h4, [class*="name"]'
          );
          const title = (await titleEl?.textContent()) ?? "";
          if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

          const priceEl = await card.$(
            '[data-testid="product-price"], [class*="Price"]:not([class*="original"]), [class*="price"]:not([class*="original"])'
          );
          const priceText = (await priceEl?.textContent()) ?? "";
          const price = parsePrice(priceText);
          if (!price) continue;

          const linkEl = await card.$("a");
          const href = await linkEl?.getAttribute("href");
          const productUrl = href
            ? href.startsWith("http") ? href : `${BASE_URL}${href}`
            : url;

          return { ...base, url: productUrl, precio_actual: price, disponible: true };
        }

        return { ...base, disponible: false };
      }

      // Producto directo
      // 1. JSON-LD
      const scripts = await page.$$eval(
        'script[type="application/ld+json"]',
        (els) => els.map((el) => el.textContent ?? "")
      );
      for (const raw of scripts) {
        try {
          const obj = JSON.parse(raw);
          const items: any[] = Array.isArray(obj) ? obj : [obj];
          for (const item of items) {
            if (item["@type"] !== "Product") continue;
            const offers = Array.isArray(item.offers) ? item.offers : [item.offers];
            for (const offer of offers) {
              const p = parseFloat(offer?.price ?? "") || 0;
              if (p > 0) return { ...base, precio_actual: p, disponible: true };
            }
          }
        } catch { /* noop */ }
      }

      // 2. CSS selectores UA específicos
      const priceSelectors = [
        '[data-testid="product-price"]',
        '[class*="ProductPrice"]',
        '[class*="product-price"]:not([class*="original"])',
        '[class*="finalPrice"]',
        '[class*="sale-price"]',
        '[itemprop="price"]',
        '[class*="Price"]:not([class*="original"]):not([class*="was"])',
      ];
      for (const sel of priceSelectors) {
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
