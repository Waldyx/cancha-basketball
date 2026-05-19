/**
 * Scraper para Adidas España (adidas.es)
 *
 * Estrategia en orden de preferencia:
 *  1. Adidas Search API pública (sin browser, sin bot-detection)
 *  2. Browser: grid de búsqueda con CSS selectores de Adidas Glass Design
 *  3. Browser: página de producto directa
 */
import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

const BASE = "https://www.adidas.es";

// ─── Adidas Search API ───────────────────────────────────────────────────────

interface AdidasApiResponse {
  raw?: {
    results?: Array<{
      raw?: {
        title?: string;
        saleprice?: number | string;
        listprice?: number | string;
      };
    }>;
  };
  // Formato alternativo (Glass Content API)
  viewList?: Array<{
    attribute?: string; // "title"
    view?: Array<{
      type?: string;
      text?: string;
    }>;
    price?: { value?: number; formatted?: string };
  }>;
}

async function priceFromAdidasApi(
  shoe: ShoeRef
): Promise<{ price: number; url: string } | null> {
  try {
    // Endpoint 1: Coveo search (motor interno de búsqueda de Adidas)
    const query = `${shoe.marca} ${shoe.modelo}`;
    const apiUrl =
      `${BASE}/api/2.0/page/content/category/BASKETBALL` +
      `?start=0&sz=6&prefn1=sport&prefv1=Basketball` +
      `&q=${encodeURIComponent(query)}`;

    const res = await fetch(apiUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "application/json",
        Referer: `${BASE}/`,
        "x-requested-with": "XMLHttpRequest",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (res.ok) {
      const data = await res.json();
      // Intentar distintos formatos de respuesta de la API de Adidas
      const products: any[] = [];

      if (Array.isArray(data?.hits)) products.push(...data.hits);
      if (Array.isArray(data?.results)) products.push(...data.results);
      if (Array.isArray(data?.items)) products.push(...data.items);

      for (const p of products.slice(0, 8)) {
        const title =
          p?.displayName?.value ??
          p?.name ??
          p?.title ??
          p?.raw?.title ??
          "";
        if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

        const rawPrice =
          p?.price?.sales?.value ??
          p?.price?.value ??
          p?.raw?.saleprice ??
          p?.raw?.listprice ??
          0;
        const price =
          typeof rawPrice === "number"
            ? rawPrice
            : parsePrice(String(rawPrice)) ?? 0;

        if (price > 20) {
          const slug = p?.url ?? p?.id ?? "";
          const productUrl = slug.startsWith("http")
            ? slug
            : slug
            ? `${BASE}${slug}`
            : `${BASE}/buscar?q=${encodeURIComponent(shoe.modelo)}`;
          return { price, url: productUrl };
        }
      }
    }
  } catch {
    /* intentar endpoint alternativo */
  }

  // Endpoint 2: Adidas Glass Content Engine (más fiable para precios)
  try {
    const searchTerm = encodeURIComponent(`${shoe.marca} ${shoe.modelo}`);
    const glassUrl =
      `${BASE}/api/products/en_ES/search?q=${searchTerm}` +
      `&start=0&count=5&prefn1=sport&prefv1=Basketball`;

    const res2 = await fetch(glassUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "application/json",
        Referer: `${BASE}/`,
      },
      signal: AbortSignal.timeout(8000),
    });

    if (res2.ok) {
      const data2 = await res2.json();
      const products2: any[] = [];
      if (Array.isArray(data2?.products)) products2.push(...data2.products);
      if (Array.isArray(data2?.hits)) products2.push(...data2.hits);

      for (const p of products2.slice(0, 5)) {
        const title = p?.displayName ?? p?.name ?? p?.title ?? "";
        if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;
        const price =
          p?.pricing?.standardPrice ??
          p?.price?.sales?.value ??
          p?.salePrice ??
          0;
        if (price > 20) {
          const url2 = p?.url
            ? `${BASE}${p.url}`
            : `${BASE}/buscar?q=${encodeURIComponent(shoe.modelo)}`;
          return { price, url: url2 };
        }
      }
    }
  } catch {
    /* pass */
  }

  return null;
}

// ─── Scraper ─────────────────────────────────────────────────────────────────

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

    // ── 1. Intentar Adidas API (sin browser) ────────────────────────────────
    const apiResult = await priceFromAdidasApi(shoe);
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

      // Aceptar cookies GDPR de Adidas
      const gdprBtn = page.locator(
        'button[data-auto-id="glass-gdpr-default-consent-accept-button"], ' +
          'button:has-text("Aceptar"), button:has-text("Accept all")'
      );
      if (
        await gdprBtn.first().isVisible({ timeout: 4000 }).catch(() => false)
      ) {
        await gdprBtn.first().click();
        await page.waitForTimeout(1000);
      }

      const isSearch =
        url.includes("/buscar") ||
        url.includes("/search") ||
        url.includes("?q=");

      if (isSearch) {
        await page
          .waitForSelector(
            '[data-auto-id="glass-product-card"], .glass-product-card',
            { timeout: 15000 }
          )
          .catch(() => {});

        const cards = await page.$$(
          '[data-auto-id="glass-product-card"]'
        );

        for (const card of cards.slice(0, 6)) {
          const titleEl = await card.$(
            '[data-auto-id="product-card-title"], h3'
          );
          const title = (await titleEl?.textContent()) ?? "";
          if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

          const priceEl = await card.$(
            '[data-auto-id="glass-hockeycard-price"]'
          );
          const priceText = (await priceEl?.textContent()) ?? "";
          const price = parsePrice(priceText);
          if (!price) continue;

          const linkEl = await card.$("a");
          const href = await linkEl?.getAttribute("href");
          const productUrl = href?.startsWith("http")
            ? href
            : href
            ? `${BASE}${href}`
            : url;

          return {
            ...base,
            url: productUrl,
            precio_actual: price,
            disponible: true,
          };
        }
      } else {
        // Producto directo
        await page
          .waitForSelector(
            '[data-auto-id="product-price"], [class*="product-price"]',
            { timeout: 15000 }
          )
          .catch(() => {});

        const priceEl = page.locator('[data-auto-id="product-price"]').first();
        const priceText = await priceEl
          .textContent({ timeout: 5000 })
          .catch(() => "");
        const price = parsePrice(priceText ?? "");
        if (price) return { ...base, precio_actual: price, disponible: true };
      }

      return { ...base, disponible: false };
    } catch {
      return base;
    }
  },
};
