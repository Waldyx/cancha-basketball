/**
 * Scraper para Under Armour España (underarmour.es)
 *
 * Estrategia:
 *  1. HTTP fetch — la página de categoría es SSR (Next.js App Router).
 *     El payload RSC contiene el catálogo de productos como JSON escapado:
 *     \"products\":[{\"name\":\"Curry 13\",\"price\":{\"list\":{\"min\":140,...}}...]
 *     También hay spans con clase bfx-list-price con el precio visible.
 *  2. Fallback: browser con selectores UA
 */
import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

const BASE_URL = "https://www.underarmour.es";

// ─── HTTP fetch: productos embebidos en el payload RSC (Next.js) ──────────────

async function priceFromUAWeb(
  shoe: ShoeRef,
  url: string
): Promise<{ price: number; url: string } | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "es-ES,es;q=0.9",
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) return null;
    const html = await res.text();

    /**
     * UA embeds an escaped RSC payload with product data like:
     * \\"products\\":[{\\"id\\":\\"/p/calzado/curry%C2%A013/...\\",\\"name\\":\\"Curry 13\\",
     *                  \\"price\\":{\\"list\\":{\\"min\\":140,\\"max\\":140...
     *
     * Strategy: find each product block by scanning for \"name\":\"XYZ\" patterns
     * in the escaped JSON, then extract min price and URL.
     */

    // Pattern to match product entries in the escaped RSC payload
    // Each entry has: "name":"ProductName" and "price":{"list":{"min":PRICE
    const productPattern =
      /\\"id\\":\\"([^"\\]+)\\",(?:[^}]|\{[^}]*\})*?\\"name\\":\\"([^"\\]+)\\",(?:[^}]|\{[^}]*\})*?\\"price\\":\{\\"list\\":\{\\"min\\":(\d+)/g;

    let m: RegExpExecArray | null;
    while ((m = productPattern.exec(html)) !== null) {
      const [, idPath, name, priceStr] = m;
      // En la web de UA, los nombres de producto no incluyen "Under Armour"
      // (ej. "Curry 13", "UA Spawn 7"). Comprobamos solo el modelo.
      if (!matchesShoe(name, shoe.marca, shoe.modelo) &&
          !matchesShoe(`Under Armour ${name}`, shoe.marca, shoe.modelo)) continue;

      const price = parseFloat(priceStr);
      if (price <= 20 || price > 500) continue;

      // Reconstruct the product URL
      const productPath = idPath.startsWith("/") ? idPath : `/${idPath}`;
      const productUrl = `${BASE_URL}/es-es${productPath}`;

      return { price, url: productUrl };
    }

    // Fallback: price spans in SSR HTML (bfx-list-price)
    const priceSpanRegex =
      /bfx-list-price[^>]*>(\d+(?:[.,]\d{1,2})?)\s*€<\/span>/gi;
    // Also try to find product name near the price
    const nameRegex = /alt="([^"]+)"\s+title="\1"/gi;
    const names: string[] = [];
    let nm: RegExpExecArray | null;
    while ((nm = nameRegex.exec(html)) !== null) {
      names.push(nm[1]);
    }
    const prices: number[] = [];
    let pm: RegExpExecArray | null;
    while ((pm = priceSpanRegex.exec(html)) !== null) {
      const p = parsePrice(pm[1]);
      if (p && p > 20 && p < 500) prices.push(p);
    }

    for (let i = 0; i < names.length; i++) {
      if (!matchesShoe(names[i], shoe.marca, shoe.modelo)) continue;
      const price = prices[i] ?? prices[0];
      if (!price) continue;
      // Build a search URL as the product URL since we don't have the direct link
      return { price, url };
    }

    return null;
  } catch {
    return null;
  }
}

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
    // ── 0. HTTP fetch (sin browser) ──────────────────────────────────────────
    const webResult = await priceFromUAWeb(shoe, url);
    if (webResult) {
      return {
        tienda: "ua_es",
        url: webResult.url,
        precio_actual: webResult.price,
        disponible: true,
        ultima_verificacion: today(),
      };
    }
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
        // Esperar tarjetas (UA usa clases de CSS modules con hash, usamos data-testid)
        await page.waitForSelector(
          '[data-testid="product-tile-container"], [class*="product-tile-container"], h3',
          { timeout: 10000 }
        ).catch(() => {});

        const cards = await page.$$(
          '[data-testid="product-tile-container"], [class*="product-tile-container"]'
        );

        for (const card of cards.slice(0, 12)) {
          // UA product title is in h3 > a (product-item-link)
          const titleEl = await card.$(
            'h3 a, [class*="product-item-link"], [class*="quick-add-button"]'
          );
          const ariaLabel = (await titleEl?.getAttribute("aria-label")) ?? "";
          const title = ariaLabel.replace(/^Añadir rápidamente al carrito /, "") ||
                        ((await titleEl?.textContent()) ?? "");
          // UA products don't always include brand name in title
          if (!matchesShoe(title, shoe.marca, shoe.modelo) &&
              !matchesShoe(`Under Armour ${title}`, shoe.marca, shoe.modelo)) continue;

          // UA price: data-testid="price-display-list-price" or bfx-list-price
          const priceEl = await card.$(
            '[data-testid="price-display-sales-price"], [data-testid="price-display-list-price"], .bfx-list-price'
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
