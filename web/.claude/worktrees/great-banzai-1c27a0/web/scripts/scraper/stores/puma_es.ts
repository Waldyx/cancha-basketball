/**
 * Scraper dedicado para eu.puma.com (tienda oficial Puma España)
 *
 * Estrategia:
 *  1. Página de producto directa → JSON-LD schema.org/Product
 *  2. Página de producto directa → window.__STORE__ / próxima data
 *  3. Selector CSS de precio específico de Puma
 *  4. Página de búsqueda → matchear tarjeta + extraer precio
 */
import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

const BASE_URL = "https://eu.puma.com";

// ─── HTTP fetch approach (sin browser) ───────────────────────────────────────

/**
 * Puma incrusta datos de producto en el HTML como:
 * aria-label="Zapatillas X, Precio, €125"
 * href="/es/es/pd/zapatillas-x/312797"
 */
async function priceFromPumaWeb(
  shoe: ShoeRef
): Promise<{ price: number; url: string } | null> {
  try {
    const q = encodeURIComponent(`${shoe.modelo} basketball`);
    const searchUrl = `${BASE_URL}/es/es/search?q=${q}`;

    const res = await fetch(searchUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "es-ES,es;q=0.9",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) return null;
    const html = await res.text();

    // Formato: aria-label="Nombre del producto, Precio, €125" href="/es/es/pd/..."
    const linkRegex =
      /aria-label="([^"]+?),\s*Precio,\s*€(\d+(?:[.,]\d{1,2})?)"\s+href="(\/es\/es\/pd\/[^"]+)"/gi;

    let match: RegExpExecArray | null;
    while ((match = linkRegex.exec(html)) !== null) {
      const [, name, priceStr, path] = match;
      if (!matchesShoe(name, shoe.marca, shoe.modelo)) continue;
      const priceRaw = priceStr.replace(",", ".");
      const price = parseFloat(priceRaw);
      if (price > 20) {
        return { price, url: `${BASE_URL}${path}` };
      }
    }

    return null;
  } catch {
    return null;
  }
}

async function acceptCookies(page: Page): Promise<void> {
  const selectors = [
    'button[data-testid="cookie-accept"]',
    'button[id*="accept"]',
    'button:has-text("Aceptar todo")',
    'button:has-text("Accept all")',
    'button:has-text("Aceptar")',
    '#onetrust-accept-btn-handler',
    '.evidon-accept-button',
  ];
  for (const sel of selectors) {
    const btn = page.locator(sel).first();
    if (await btn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await btn.click().catch(() => {});
      await page.waitForTimeout(600);
      return;
    }
  }
}

/** Extrae precio de JSON-LD Product (Puma los inyecta en <head>) */
async function priceFromJsonLd(page: Page): Promise<number | null> {
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
          if (p > 0) return p;
        }
      }
    } catch { /* noop */ }
  }
  return null;
}

/** Extrae precio de los metadatos OG */
async function priceFromMeta(page: Page): Promise<number | null> {
  const content = await page
    .$eval(
      'meta[property="product:price:amount"], meta[name="twitter:data1"]',
      (el) => el.getAttribute("content") ?? ""
    )
    .catch(() => "");
  return content ? parsePrice(content) : null;
}

/** Extrae precio de los selectores CSS conocidos de Puma */
async function priceFromCss(page: Page): Promise<number | null> {
  const selectors = [
    // PDP precios
    '[data-testid="product-price"] span',
    '[class*="ProductPrice"] span',
    '[class*="product-price"]',
    '[class*="Price__"] span',
    // Genérico como fallback
    '[class*="price"]:not([class*="original"]):not([class*="old"]):not([class*="strike"])',
  ];
  for (const sel of selectors) {
    const el = page.locator(sel).first();
    if (await el.isVisible({ timeout: 2500 }).catch(() => false)) {
      const text = await el.textContent().catch(() => "");
      const price = parsePrice(text ?? "");
      if (price && price > 20 && price < 500) return price;
    }
  }
  return null;
}

/** Extrae precio del HTML embedded en next data o window variables */
async function priceFromPageData(page: Page): Promise<number | null> {
  // Puma usa Next.js — __NEXT_DATA__ contiene el catálogo
  try {
    const raw = await page.$eval(
      '#__NEXT_DATA__',
      (el) => el.textContent ?? ""
    );
    if (!raw) return null;

    // Buscar patrones de precio en el JSON (sin parsear todo el objeto por tamaño)
    const patterns = [
      /"currentPrice"\s*:\s*(\d+(?:[.,]\d{1,2})?)/,
      /"salePrice"\s*:\s*(\d+(?:[.,]\d{1,2})?)/,
      /"price"\s*:\s*(\d+(?:[.,]\d{1,2})?)/,
      /"finalPrice"\s*:\s*(\d+(?:[.,]\d{1,2})?)/,
    ];
    for (const re of patterns) {
      const m = raw.match(re);
      if (m) {
        const price = parsePrice(m[1]);
        if (price && price > 20 && price < 500) return price;
      }
    }
  } catch { /* noop */ }
  return null;
}

/** Scraped desde una página de búsqueda de eu.puma.com */
async function scrapeSearchPage(
  page: Page,
  url: string,
  shoe: ShoeRef,
  base: ScrapeResult
): Promise<ScrapeResult> {
  // Puma search page: esperar tarjetas de producto
  await page.waitForSelector(
    '[data-testid="product-card"], [class*="ProductCard"], [class*="product-card"]',
    { timeout: 10000 }
  ).catch(() => {});

  const cards = await page.$$(
    '[data-testid="product-card"], [class*="ProductCard"], [class*="product-card"], article'
  );

  for (const card of cards.slice(0, 8)) {
    // Título
    const titleEl = await card.$(
      '[data-testid="product-name"], [class*="ProductName"], h2, h3, h4, [class*="name"], [class*="title"]'
    );
    const title = (await titleEl?.textContent()) ?? "";
    if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

    // Precio
    const priceEl = await card.$(
      '[data-testid="product-price"], [class*="Price"], [class*="price"]:not([class*="original"])'
    );
    const priceText = (await priceEl?.textContent()) ?? "";
    const price = parsePrice(priceText);
    if (!price) continue;

    // URL directa al producto
    const linkEl = await card.$("a");
    const href = await linkEl?.getAttribute("href");
    const productUrl = href
      ? href.startsWith("http") ? href : `${BASE_URL}${href}`
      : url;

    return { ...base, url: productUrl, precio_actual: price, disponible: true };
  }

  return { ...base, disponible: false };
}

export const puma_es: StoreScraper = {
  tienda: "puma_es",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "puma_es",
      url,
      precio_actual: 0,
      disponible: false,
      ultima_verificacion: today(),
    };

    try {
      // ── 1. HTTP fetch (sin browser) ──────────────────────────────────────
      const webResult = await priceFromPumaWeb(shoe);
      if (webResult) {
        return { ...base, url: webResult.url, precio_actual: webResult.price, disponible: true };
      }

      // ── 2. Fallback: browser ─────────────────────────────────────────────
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });
      await acceptCookies(page);

      // Detectar si es búsqueda o producto directo
      const isSearch =
        url.includes("/search") ||
        url.includes("?q=") ||
        url.includes("/buscar");

      if (isSearch) {
        return scrapeSearchPage(page, url, shoe, base);
      }

      // Producto directo — esperar hidratación de la SPA
      await page.waitForTimeout(2000);

      // 1. JSON-LD (más fiable)
      const priceJsonLd = await priceFromJsonLd(page);
      if (priceJsonLd) return { ...base, precio_actual: priceJsonLd, disponible: true };

      // 2. Next.js __NEXT_DATA__
      const priceNextData = await priceFromPageData(page);
      if (priceNextData) return { ...base, precio_actual: priceNextData, disponible: true };

      // 3. Meta OG
      const priceMeta = await priceFromMeta(page);
      if (priceMeta) return { ...base, precio_actual: priceMeta, disponible: true };

      // 4. CSS selectores
      const priceCss = await priceFromCss(page);
      if (priceCss) return { ...base, precio_actual: priceCss, disponible: true };

      return { ...base, disponible: false };
    } catch {
      return base;
    }
  },
};
