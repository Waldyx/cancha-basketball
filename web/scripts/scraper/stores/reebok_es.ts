/**
 * Scraper dedicado para Reebok España (reebok.es / reebok.com/es-es)
 * Estrategia: JSON-LD → CSS selectores Reebok → búsqueda con match
 */
import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

const BASE_URL = "https://www.reebok.es";

async function acceptCookies(page: Page): Promise<void> {
  const btns = [
    '#onetrust-accept-btn-handler',
    'button[data-auto-id="gdpr-consent-accept"]',
    'button:has-text("Aceptar todo")',
    'button:has-text("Accept")',
    'button:has-text("Aceptar")',
    '[class*="CookieBanner"] button:first-child',
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

export const reebok_es: StoreScraper = {
  tienda: "reebok_es",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "reebok_es",
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
          '[data-auto-id="glass-product-card"], [class*="product-card"], article',
          { timeout: 10000 }
        ).catch(() => {});

        // Reebok comparte diseño con Adidas (misma plataforma)
        const cards = await page.$$(
          '[data-auto-id="glass-product-card"], [class*="product-card"], article'
        );

        for (const card of cards.slice(0, 8)) {
          const titleEl = await card.$(
            '[data-auto-id="product-card-title"], [class*="product-title"], h3, h4, [class*="name"]'
          );
          const title = (await titleEl?.textContent()) ?? "";
          if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

          const priceEl = await card.$(
            '[data-auto-id="glass-hockeycard-price"], [class*="price"]:not([class*="original"]), [class*="Price"]'
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

      // 2. CSS selectores Reebok/Adidas-shared
      const priceSelectors = [
        '[data-auto-id="product-price"]',
        '[class*="product-price"]:not([class*="original"])',
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
