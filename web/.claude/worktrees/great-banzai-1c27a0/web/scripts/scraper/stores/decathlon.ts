/**
 * Scraper para Decathlon España (decathlon.es)
 *
 * Estrategia:
 *  1. HTTP fetch — la página es SSR, todo el HTML con precios está disponible sin JS.
 *     Extraemos mediante regex:
 *     a. aria-label + href de los product cards
 *     b. "valueWithTaxes":XX.XX del JSON embebido en el HTML (mismo orden que los cards)
 *  2. Fallback: browser con selectores de Decathlon
 */
import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

const BASE = "https://www.decathlon.es";

async function priceFromDecathlonWeb(
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
     * Decathlon SSR: los product cards tienen la estructura:
     *   aria-label="TARMAK ... FAST 900 LOW-1 Rojo" href="/es/p/..."
     *   ... (a continuación, dentro del mismo card) ...
     *   class="price-amount ...">49,99 €</span>
     *
     * Estrategia: partir el HTML en bloques de card (por aria-label),
     * luego buscar el precio dentro de cada bloque.
     */

    // Separar el HTML en segmentos por producto
    const cardSplitter =
      /aria-label="([^"]+)"\s+href="(\/es\/p\/[^"]+)"/gi;

    // Precio: primera ocurrencia de price-amount en el bloque del card
    // data-part="amount">49,99 €< ← current sale price
    // Usamos la clase que NO tiene "barred" para obtener el precio actual
    const priceInBlock = (block: string): number | null => {
      // Buscar primero un precio de oferta (price-amount--sale)
      let m = block.match(/price-amount[^>]*>[^<]*?(\d+(?:[.,]\d{1,2})?)\s*€/i);
      if (m) {
        const p = parsePrice(m[1]);
        if (p && p > 10 && p < 500) return p;
      }
      // Fallback: cualquier número con formato precio
      m = block.match(/>\s*(\d+[.,]\d{2})\s*€/i);
      if (m) {
        const p = parsePrice(m[1]);
        if (p && p > 10 && p < 500) return p;
      }
      return null;
    };

    // Encontrar todos los matches con su posición
    const cardMatches: Array<{ title: string; path: string; pos: number }> = [];
    let cardMatch: RegExpExecArray | null;
    while ((cardMatch = cardSplitter.exec(html)) !== null) {
      cardMatches.push({
        title: cardMatch[1],
        path: cardMatch[2],
        pos: cardMatch.index,
      });
    }

    if (cardMatches.length === 0) return null;

    for (let i = 0; i < cardMatches.length; i++) {
      const { title, path, pos } = cardMatches[i];
      if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

      // El bloque de este card va desde su posición hasta el comienzo del siguiente
      const nextPos = cardMatches[i + 1]?.pos ?? pos + 3000;
      const block = html.slice(pos, nextPos);

      const price = priceInBlock(block);
      if (!price) continue;

      const productUrl = path.startsWith("http") ? path : `${BASE}${path}`;
      return { price, url: productUrl };
    }

    return null;
  } catch {
    return null;
  }
}

export const decathlon: StoreScraper = {
  tienda: "decathlon",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "decathlon",
      url,
      precio_actual: 0,
      disponible: false,
      ultima_verificacion: today(),
    };

    // ── 1. HTTP fetch (sin browser) ──────────────────────────────────────────
    const webResult = await priceFromDecathlonWeb(shoe, url);
    if (webResult) {
      return {
        ...base,
        url: webResult.url,
        precio_actual: webResult.price,
        disponible: true,
      };
    }

    // ── 2. Fallback: browser ─────────────────────────────────────────────────
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });

      const isSearch =
        url.includes("/search") || url.includes("Ntt=") || url.includes("q=");

      if (isSearch) {
        // Selectores reales de Decathlon (clase del título del card)
        await page
          .waitForSelector('.product-card-details__item__title, .product-card', {
            timeout: 12000,
          })
          .catch(() => {});

        const cards = await page.$$(
          '.product-card-details__item__title, .product-card'
        );

        for (const card of cards.slice(0, 8)) {
          const linkEl = await card.$("a");
          const title = (await linkEl?.getAttribute("aria-label")) ?? (await linkEl?.textContent()) ?? "";
          if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

          const href = await linkEl?.getAttribute("href");
          const productUrl = href?.startsWith("http")
            ? href
            : href
            ? `${BASE}${href}`
            : url;

          // Buscar precio en el ancestro del card
          const parentHandle = await card.evaluateHandle((el) => el.closest('[class*="product-card"]') ?? el.parentElement);
          const priceEl = await (parentHandle as any)?.$('[class*="price__amount"], [class*="value"]');
          const priceText = (await priceEl?.textContent()) ?? "";
          const price = parsePrice(priceText);
          if (price) return { ...base, url: productUrl, precio_actual: price, disponible: true };
        }
      } else {
        // Producto directo
        await page
          .waitForSelector('[class*="product-price"], [class*="price__amount"]', { timeout: 10000 })
          .catch(() => {});

        const priceEl = page.locator('[class*="price__amount"], [class*="product-price"]').first();
        const priceText = await priceEl.textContent({ timeout: 5000 }).catch(() => "");
        const price = parsePrice(priceText ?? "");
        if (price) return { ...base, precio_actual: price, disponible: true };
      }

      return { ...base, disponible: false };
    } catch {
      return base;
    }
  },
};
