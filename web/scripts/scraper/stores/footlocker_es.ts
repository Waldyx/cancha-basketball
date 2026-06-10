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
  // Case-insensitive: FL devuelve "Xxiii" (Title Case) en algunos productos.
  const romans = Object.keys(ROMAN_MAP).sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`\\b(${romans.join("|")})\\b`, "gi");
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
  // Reconstruimos siempre una URL search canónica a partir del catálogo:
  //  - Si la URL del catálogo es de producto (puede ser obsoleta tras bugs de
  //    matching anteriores), evitamos quedarnos atrapados ahí.
  //  - Si es search pero con parámetro obsoleto (?q= en vez de ?query=), FL
  //    devuelve resultados genéricos no relacionados → buscar de cero.
  const searchUrl = `${BASE}/es/search?query=${encodeURIComponent(`${shoe.marca} ${shoe.modelo}`.toLowerCase())}`;

  try {
    const res = await fetch(searchUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "es-ES,es;q=0.9",
      },
      signal: AbortSignal.timeout(15000),
    });

    // Foot Locker devuelve 400 como técnica anti-bot aunque el HTML sea válido.
    // Aceptamos cualquier respuesta y comprobamos por contenido más abajo.
    const html = await res.text();
    if (!html || html.length < 5000) return null;

    /**
     * Strategy: parse the embedded React data JSON. Each product entry has:
     *   "name":"...","originalPrice":{"value":PVP},"price":{"value":CURRENT},...,"sku":"SKU"
     * "sku" and "imageSku" come AFTER "name" and "price" in the JSON, so we
     * extract whole product blocks by capturing from "name" through "sku" in
     * one regex.
     */
    const productRe = /"name":"([^"]+)"[\s\S]{0,80}?"originalPrice":\{"value":([0-9.]+)[\s\S]{0,80}?"price":\{"value":([0-9.]+)[\s\S]{0,300}?"sku":"(\d+)"/g;

    const seenSkus = new Set<string>();
    const candidates: Array<{ name: string; price: number; sku: string }> = [];

    let pm: RegExpExecArray | null;
    while ((pm = productRe.exec(html)) !== null) {
      const [, rawName, , currentPriceStr, sku] = pm;
      if (seenSkus.has(sku)) continue;
      seenSkus.add(sku);
      const price = parseFloat(currentPriceStr);
      if (!price || price < 20 || price > 500) continue;
      // Filtra modelos infantiles/junior antes del strip — un AJ11 "Primaria y
      // colegio" a 145€ matchearía con el AJ11 adulto del catálogo si solo
      // miramos al nombre stripped.
      if (/-\s*(Primaria|Bebés?|Bebe|Niñ[oa]s?|Infantil|Junior|Kids?|Preescolar)/i.test(rawName)) continue;
      const name = convertRomanNumerals(
        rawName.replace(/\s*-\s*(Hombre|Mujer|Niñ[oa]s?|Unisex)[^,]*/i, "").trim()
      );
      candidates.push({ name, price, sku });
    }

    if (candidates.length === 0) return null;

    // Confirm SKU also appears as a product card link (avoids matching
    // recommended/related products that aren't in the search results)
    const linkRe = /href="(\/es\/product\/[^/]+\/(\d+)\.html)"/g;
    const cardSkus = new Map<string, string>(); // sku -> path
    let lm: RegExpExecArray | null;
    while ((lm = linkRe.exec(html)) !== null) {
      const [, path, sku] = lm;
      if (!cardSkus.has(sku)) cardSkus.set(sku, path);
    }

    // Si el modelo del catálogo contiene un número (ej. "Tatum 3", "GT Cut 4"),
    // EXIGIMOS que ese número aparezca como token en el título de FL.
    // Sin esto, "Jordan Tatum" (sin número, modelo viejo) matchearía con "Tatum 3".
    const modelNumberMatch = shoe.modelo.match(/\b(\d+)\b/);
    const requiredNumber = modelNumberMatch ? modelNumberMatch[1] : null;

    for (const c of candidates) {
      const path = cardSkus.get(c.sku);
      if (!path) continue;

      if (requiredNumber) {
        const titleTokens = c.name.toLowerCase().split(/[\s\-.]+/);
        if (!titleTokens.includes(requiredNumber)) continue;
      }

      // Match name against shoe catalog entry. minScore 0.5 (no 0.6) porque
      // FL recorta prefijos de tecnología: catálogo "Air Zoom G.T. Cut 4" vs
      // FL "Nike G.T. Cut 4". El filtro de marca + filtro junior previo + el
      // SKU presente en cards + el filtro de número anterior bloquean falsos
      // positivos amplios.
      // FootLocker may use "Jordan" brand for Nike/Jordan shoes
      const minScore = 0.5;
      if (!matchesShoe(c.name, shoe.marca, shoe.modelo, minScore) &&
          !matchesShoe(c.name.replace(/^Jordan /i, "Nike "), shoe.marca, shoe.modelo, minScore) &&
          !matchesShoe(c.name.replace(/^Nike /i, "Jordan "), shoe.marca, shoe.modelo, minScore)) continue;

      const productUrl = `${BASE}${path}`;
      return { price: c.price, url: productUrl };
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
