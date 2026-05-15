/**
 * Scraper para Nike España (nike.com/es)
 *
 * Estrategia en orden de preferencia:
 *  1. Nike API pública (sin browser, sin bot-detection) — más rápida y fiable
 *  2. Browser: página de producto con JSON-LD
 *  3. Browser: grid de búsqueda
 */
import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

const BASE_URL = "https://www.nike.com";

// ─── Nike API ────────────────────────────────────────────────────────────────

interface NikeApiResponse {
  objects?: Array<{
    productInfo?: Array<{
      price?: {
        fullPrice?: number;
        currentPrice?: number;
      };
      product?: { title?: string };
      publishedContent?: {
        properties?: { title?: string; subtitle?: string };
      };
    }>;
    publishedContent?: {
      properties?: { title?: string; subtitle?: string };
    };
  }>;
}

async function priceFromNikeApi(
  shoe: ShoeRef
): Promise<{ price: number; url: string } | null> {
  try {
    const query = encodeURIComponent(shoe.modelo);
    const apiUrl =
      `https://api.nike.com/product_feed/threads/v2/` +
      `?filter=marketplace(ES)` +
      `&filter=language(es)` +
      `&filter=searchTerms(${query})` +
      `&count=8`;

    const res = await fetch(apiUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "application/json",
        Origin: "https://www.nike.com",
        Referer: "https://www.nike.com/es/",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) return null;
    const data: NikeApiResponse = await res.json();

    for (const obj of data.objects ?? []) {
      // Extraer título para matching
      const title =
        obj.publishedContent?.properties?.title ??
        obj.productInfo?.[0]?.publishedContent?.properties?.title ??
        obj.productInfo?.[0]?.product?.title ??
        "";

      if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

      // Extraer precio — puede estar en cualquier productInfo
      for (const pi of obj.productInfo ?? []) {
        const price = pi.price?.currentPrice ?? pi.price?.fullPrice ?? 0;
        if (price > 20) {
          // Construir URL de producto para España
          const slug = (title as string)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
          const productUrl = `${BASE_URL}/es/w?q=${encodeURIComponent(shoe.modelo)}`;
          return { price, url: productUrl };
        }
      }
    }
    return null;
  } catch {
    return null;
  }
}

// ─── Browser helpers ─────────────────────────────────────────────────────────

async function acceptCookies(page: Page): Promise<void> {
  const btns = [
    "button[id*=\"accept\"]",
    'button:has-text("Aceptar todo")',
    'button:has-text("Accept All")',
    "#onetrust-accept-btn-handler",
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

// ─── Scraper ─────────────────────────────────────────────────────────────────

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

    // ── 1. Intentar Nike API (sin browser) ──────────────────────────────────
    const apiResult = await priceFromNikeApi(shoe);
    if (apiResult) {
      return {
        ...base,
        url: apiResult.url,
        precio_actual: apiResult.price,
        disponible: true,
      };
    }

    // ── 2. Fallback: browser ────────────────────────────────────────────────
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });
      await acceptCookies(page);

      // Detectar tipo de URL
      const isSearch =
        url.includes("/w?") ||
        url.includes("/w/") ||
        url.includes("?q=") ||
        url.includes("vst=");

      if (isSearch) {
        // Nike carga los productos via JS; esperar hasta 20s y dar un extra de 1s
        await page
          .waitForSelector(
            '[data-testid="product-card"], [class*="product-card__body"], .product-card',
            { timeout: 20000 }
          )
          .catch(() => {});
        await page.waitForTimeout(1000); // pequeño extra para que carguen todos los cards

        const cards = await page.$$(
          '[data-testid="product-card"], .product-card__body, [class*="ProductCard"]'
        );

        for (const card of cards.slice(0, 8)) {
          const titleEl = await card.$(
            '[data-testid="product-subtitle"], [class*="product-card__title"], ' +
              "[class*=\"headline\"], h3, h4, [class*=\"title\"]"
          );
          const title = (await titleEl?.textContent()) ?? "";
          if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

          const priceEl = await card.$(
            '[data-testid="product-price"], [class*="product-card__price"], ' +
              '[class*="headline--5"], [class*="price"]'
          );
          const priceText = (await priceEl?.textContent()) ?? "";
          const price = parsePrice(priceText);
          if (!price) continue;

          const linkEl = await card.$("a");
          const href = await linkEl?.getAttribute("href");
          const productUrl = href
            ? href.startsWith("http")
              ? href
              : `${BASE_URL}${href}`
            : url;

          return {
            ...base,
            url: productUrl,
            precio_actual: price,
            disponible: true,
          };
        }

        return { ...base, disponible: false };
      }

      // Página de producto directa
      await page.waitForTimeout(1000);

      // JSON-LD
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
            const offers = Array.isArray(item.offers)
              ? item.offers
              : [item.offers];
            for (const offer of offers) {
              const p =
                parseFloat(offer?.price ?? "") ||
                parseFloat(offer?.lowPrice ?? "") ||
                0;
              if (p > 0)
                return { ...base, precio_actual: p, disponible: true };
            }
          }
        } catch {
          /* noop */
        }
      }

      // CSS selectores de Nike PDP
      const priceSelectors = [
        '[data-testid="product-price"]',
        "[class*=\"product-price\"]",
        "[class*=\"ProductPrice\"]",
        ".product-price",
        '[class*="headline--5"]',
        "[itemprop=\"price\"]",
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
