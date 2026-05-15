/**
 * Scraper para New Balance España (newbalance.es)
 * Estrategia: JSON-LD → meta OG → CSS selectores NB → búsqueda con match
 */
import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

const BASE_URL = "https://www.newbalance.es";

async function acceptCookies(page: Page): Promise<void> {
  const btns = [
    '#onetrust-accept-btn-handler',
    'button:has-text("Aceptar todo")',
    'button:has-text("Accept All Cookies")',
    'button:has-text("Aceptar")',
    '.optanon-allow-all',
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

export const nb_es: StoreScraper = {
  tienda: "nb_es",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "nb_es",
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
        url.includes("/search") || url.includes("?q=") || url.includes("/buscar");

      if (isSearch) {
        await page.waitForSelector(
          '[class*="product-tile"], [class*="ProductTile"], [class*="product-card"]',
          { timeout: 10000 }
        ).catch(() => {});

        const cards = await page.$$(
          '[class*="product-tile"], [class*="ProductTile"], article, li[class*="product"]'
        );

        for (const card of cards.slice(0, 8)) {
          const titleEl = await card.$(
            '[class*="product-tile__name"], [class*="product-name"], h2, h3, h4, [class*="name"]'
          );
          const title = (await titleEl?.textContent()) ?? "";
          if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

          const priceEl = await card.$(
            '[class*="product-tile__price"], [class*="sales"], [class*="price"]:not([class*="strike"])'
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
              const p =
                parseFloat(offer?.price ?? "") ||
                parseFloat(offer?.lowPrice ?? "") ||
                0;
              if (p > 0) return { ...base, precio_actual: p, disponible: true };
            }
          }
        } catch { /* noop */ }
      }

      // 2. Meta OG
      const ogPrice = await page
        .$eval('meta[property="product:price:amount"]', (el) => el.getAttribute("content") ?? "")
        .catch(() => "");
      if (ogPrice) {
        const price = parsePrice(ogPrice);
        if (price) return { ...base, precio_actual: price, disponible: true };
      }

      // 3. CSS selectores New Balance específicos
      const priceSelectors = [
        '[class*="product-price"] .sales',
        '[class*="product-price"] [class*="value"]',
        '[itemprop="price"]',
        '[class*="price-value"]',
        '.price-sales',
        '.sales .value',
        '[class*="Price"]:not([class*="strike"]):not([class*="original"])',
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
