/**
 * Scraper para Foot Locker España (footlocker.es)
 *
 * Estrategia:
 *  1. HTTP fetch — la página de búsqueda es SSR (React con hidratación).
 *     El HTML contiene:
 *     a. Tarjetas con href="/es/product/{slug}/{sku}.html"
 *     b. JSON embebido: "imageSku":"SKU",...,"name":"Producto","originalPrice":{"value":PRICE}
 *     Casamos SKU del enlace con SKU del JSON para obtener nombre + precio.
 *  2. Fallback: browser con selectores de ProductCard
 */
import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

const BASE = "https://www.footlocker.es";

// ─── Roman numeral conversion ─────────────────────────────────────────────────

const ROMAN_MAP: Record<string, number> = {
  XXXIX: 39, XXXVIII: 38, XXXVII: 37, XXXVI: 36, XXXV: 35,
  XXXIV: 34, XXXIII: 33, XXXII: 32, XXXI: 31, XXX: 30,
  XXIX: 29, XXVIII: 28, XXVII: 27, XXVI: 26, XXV: 25,
  XXIV: 24, XXIII: 23, XXII: 22, XXI: 21, XX: 20,
  XIX: 19, XVIII: 18, XVII: 17, XVI: 16, XV: 15,
  XIV: 14, XIII: 13, XII: 12, XI: 11, X: 10,
  IX: 9, VIII: 8, VII: 7, VI: 6, V: 5,
  IV: 4, III: 3, II: 2,
};

/**
 * Converts Roman numerals in product title to Arabic numbers.
 * e.g. "Nike LeBron XXIII - Hombre Zapatillas" → "Nike LeBron 23 - Hombre Zapatillas"
 * Only converts standalone uppercase Roman numeral tokens (word boundary).
 * Uses explicit list to avoid false positives (e.g. "VI" in "SHAI").
 */
function convertRomanNumerals(title: string): string {
  // Sort by length descending so XXXIX is matched before XXX, etc.
  const romans = Object.keys(ROMAN_MAP).sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`\\b(${romans.join("|")})\\b`, "g");
  return title.replace(pattern, (match) => {
    const val = ROMAN_MAP[match.toUpperCase()];
    return val !== undefined ? String(val) : match;
  });
}

// ─── HTTP fetch ───────────────────────────────────────────────────────────────

async function priceFromFLWeb(
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
     * Strategy:
     * 1. Find all product card links: href="/es/product/{slug}/{sku}.html"
     *    Filter to shoe-only URLs (slug contains "zapatillas" or "shoes")
     * 2. For each shoe link, extract SKU from URL
     * 3. Find JSON entry: "imageSku":"SKU",...,"name":"...","originalPrice":{"value":PRICE}
     * 4. Match product name against shoe catalog entry
     */

    // Step 1: find all product card links
    const linkRe = /href="(\/es\/product\/([^/]+)\/(\d+)\.html)"/g;
    const seenSkus = new Set<string>();
    const cards: Array<{ path: string; slug: string; sku: string }> = [];

    let lm: RegExpExecArray | null;
    while ((lm = linkRe.exec(html)) !== null) {
      const [, path, slug, sku] = lm;
      if (seenSkus.has(sku)) continue;
      seenSkus.add(sku);
      // Filter: must be a shoe (slug ends with "zapatillas" or contains "shoe")
      if (!slug.includes("zapatilla") && !slug.includes("shoe")) continue;
      cards.push({ path, slug, sku });
    }

    if (cards.length === 0) return null;

    // Step 2+3: for each shoe card, find name + price from embedded JSON
    for (const { path, sku } of cards) {
      // Find JSON block for this SKU: "imageSku":"SKU",...,"name":"...","originalPrice":{"value":PRICE}
      const skuIdx = html.indexOf(`"imageSku":"${sku}"`);
      if (skuIdx === -1) continue;

      // Look forward for name and price in the same object (next ~600 chars)
      const block = html.slice(skuIdx, skuIdx + 600);

      const nameM = block.match(/"name":"([^"]+)"/);
      const priceM = block.match(/"originalPrice":\{"value":([0-9.]+)/);

      if (!nameM || !priceM) continue;

      const rawName = nameM[1];
      // Strip category suffix: "- Hombre Zapatillas", "- Mujer Zapatillas", etc.
      const name = convertRomanNumerals(
        rawName.replace(/\s*-\s*(Hombre|Mujer|Niño|Unisex|Primaria[^-]*)[^,]*/i, "").trim()
      );
      const price = parseFloat(priceM[1]);

      if (!price || price < 20 || price > 500) continue;

      // Match name against shoe catalog entry
      // FootLocker may use "Jordan" brand for Nike/Jordan shoes
      if (!matchesShoe(name, shoe.marca, shoe.modelo) &&
          !matchesShoe(name.replace(/^Jordan /i, "Nike "), shoe.marca, shoe.modelo) &&
          !matchesShoe(name.replace(/^Nike /i, "Jordan "), shoe.marca, shoe.modelo)) continue;

      const productUrl = `${BASE}${path}`;
      return { price, url: productUrl };
    }

    return null;
  } catch {
    return null;
  }
}

// ─── StoreScraper ─────────────────────────────────────────────────────────────

export const footlocker_es: StoreScraper = {
  tienda: "footlocker_es",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "footlocker_es",
      url,
      precio_actual: 0,
      disponible: false,
      ultima_verificacion: today(),
    };

    // ── 1. HTTP fetch (sin browser) ──────────────────────────────────────────
    const webResult = await priceFromFLWeb(shoe, url);
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

      // Cookies
      const cookieBtn = page.locator(
        'button:has-text("Aceptar"), #onetrust-accept-btn-handler'
      );
      if (await cookieBtn.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await cookieBtn.first().click();
        await page.waitForTimeout(600);
      }

      await page
        .waitForSelector(
          '.ProductCard-link, [class*="ProductCard"], article',
          { timeout: 15000 }
        )
        .catch(() => {});

      const cards = await page.$$(".ProductCard-link, [class*=\"ProductCard-content\"]");

      for (const card of cards.slice(0, 12)) {
        const href = await card.getAttribute("href");
        if (!href) continue;
        const slugPart = href.split("/").slice(-2, -1)[0] ?? "";
        if (!slugPart.includes("zapatilla") && !slugPart.includes("shoe")) continue;

        // Title from aria-label on the card or from child elements
        const ariaLabel = (await card.getAttribute("aria-label")) ?? "";
        // Product name is like "Nike LeBron 23 - Hombre Zapatillas" strip suffix
        const rawTitle = ariaLabel.replace(/\s*-\s*Hombre.*$/i, "").trim();
        const title = rawTitle || slugPart.replace(/-/g, " ");

        if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

        // Price from the card's price element or closest parent
        const priceEl = await card.$(
          '[class*="price"], [data-qa="price"], [class*="Price"]'
        );
        const priceText = (await priceEl?.textContent()) ?? "";
        const price = parsePrice(priceText);
        if (!price || price < 20) continue;

        const productUrl = href.startsWith("http") ? href : `${BASE}${href}`;
        return { ...base, url: productUrl, precio_actual: price, disponible: true };
      }

      return { ...base, disponible: false };
    } catch {
      return base;
    }
  },
};
