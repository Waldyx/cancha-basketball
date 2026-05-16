/**
 * Scraper para Nike España (nike.com/es)
 *
 * Estrategia:
 *  1. HTTP fetch + __NEXT_DATA__ JSON embebido en la web de Nike (sin browser)
 *     Matching por URL slug del producto (roman numeral aware)
 *  2. Fallback: browser con CSS selectores del grid/PDP
 */
import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

const BASE_URL = "https://www.nike.com";

// ─── Util: normalizar modelo a slug Nike ─────────────────────────────────────

const ROMAN_TO_ARABIC: Record<string, string> = {
  xxiv: "24", xxiii: "23", xxii: "22", xxi: "21", xx: "20",
  xix: "19", xviii: "18", xvii: "17", xvi: "16", xv: "15",
  xiv: "14", xiii: "13", xii: "12", xi: "11", x: "10",
  ix: "9", viii: "8", vii: "7", vi: "6", v: "5",
  iv: "4", iii: "3", ii: "2", i: "1",
};

function modelToSlugCandidates(modelo: string): string[] {
  const base = modelo
    .toLowerCase()
    .replace(/[.·]/g, " ")
    .replace(/[-–—]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");

  const candidates = new Set<string>([base]);

  // Reemplazar números arábigos ↔ romanos (mismo modelo, distinta notación)
  // NO incluir versión sin número — causaría GT Cut 3 → GT Cut 4
  for (const [roman, arabic] of Object.entries(ROMAN_TO_ARABIC)) {
    if (base.includes(`-${roman}`)) {
      candidates.add(base.replace(`-${roman}`, `-${arabic}`));
    }
    if (base.endsWith(`-${arabic}`)) {
      // Solo si el número es el sufijo del modelo (ej: lebron-23 → lebron-xxiii)
      candidates.add(base.replace(new RegExp(`-${arabic}$`), `-${roman}`));
    }
  }

  return [...candidates];
}

/**
 * Comprueba que el slug aparece en la URL como un token completo,
 * NO como prefijo de otro token más largo.
 * Ej: "lebron-xxii" en "lebron-xxiii-..." → FALSE (xxii es prefijo de xxiii)
 * Ej: "lebron-xxii" en "lebron-xxii-zapatillas-..." → TRUE
 */
function slugMatchesUrl(urlLower: string, slug: string): boolean {
  const idx = urlLower.indexOf(slug);
  if (idx === -1) return false;
  const afterChar = urlLower[idx + slug.length];
  // El char siguiente debe ser no-alfanumérico (-, /, ?, &, fin de string)
  // Un char alfabético o dígito indica que el slug continúa (ej: xxii→xxiii)
  return afterChar === undefined || !/[a-z0-9]/.test(afterChar);
}

/**
 * Descarta URLs de productos no-calzado en Nike.es
 * (camisetas, pantalones, calcetines, páginas custom-By-You, etc.)
 */
function isShoeUrl(urlLower: string): boolean {
  const nonShoeKeywords = [
    "-camiseta-", "-pantalon-", "-pantalón-", "-calcetines-",
    "-sudadera-", "-chaqueta-", "-ropa-", "-accesorio-",
    "-mochila-", "-bolsa-", "-gorra-", "-sombrero-",
    "-nba-jersey", "-jersey-", "-shorts-",
    "/u/custom-",  // By You custom pages
  ];
  if (nonShoeKeywords.some((kw) => urlLower.includes(kw))) return false;

  // Opcional: requerir al menos uno de los indicadores de calzado
  const shoeKeywords = ["-zapatillas-", "-shoe", "-basketball", "-sneaker", "/t/", "/p/"];
  // Si no hay ningún keyword de calzado ni de no-calzado, aceptamos
  // (podría ser una URL de colección o PDP sin keywords)
  const hasShoeKw = shoeKeywords.some((kw) => urlLower.includes(kw));
  return hasShoeKw || !nonShoeKeywords.some((kw) => urlLower.includes(kw));
}

// ─── HTTP fetch: __NEXT_DATA__ ───────────────────────────────────────────────

interface NikeProduct {
  copy?: { title?: string; subTitle?: string };
  pdpUrl?: { url?: string; path?: string } | string;
  prices?: { currentPrice?: number; fullPrice?: number };
  productType?: string;
  promotions?: Array<{ promotionPrice?: number }>;
}

async function priceFromNikeWeb(
  shoe: ShoeRef
): Promise<{ price: number; url: string } | null> {
  try {
    const q = encodeURIComponent(shoe.modelo);
    const pageUrl = `${BASE_URL}/es/w?q=${q}&vst=${q}`;

    const res = await fetch(pageUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "es-ES,es;q=0.9",
        "Cache-Control": "no-cache",
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) return null;
    const html = await res.text();

    const match = html.match(
      /<script id="__NEXT_DATA__" type="application\/json">(.+?)<\/script>/s
    );
    if (!match) return null;

    const data = JSON.parse(match[1]);
    const groups: Array<{ products?: NikeProduct[] }> =
      data.props?.pageProps?.initialState?.Wall?.productGroupings ?? [];

    if (groups.length === 0) return null;

    const slugCandidates = modelToSlugCandidates(shoe.modelo);

    for (const group of groups) {
      for (const product of group.products ?? []) {
        const pdpRaw =
          typeof product.pdpUrl === "object"
            ? (product.pdpUrl as any)?.url ?? (product.pdpUrl as any)?.path
            : product.pdpUrl;
        const pdpUrl: string = pdpRaw ?? "";
        const urlLower = pdpUrl.toLowerCase();

        // Filtrar productos no-calzado (camisetas, custom pages, etc.)
        if (!isShoeUrl(urlLower)) continue;

        // Debe matchear al menos un candidato de slug (con word-boundary check)
        if (!slugCandidates.some((s) => slugMatchesUrl(urlLower, s))) continue;

        const price =
          product.promotions?.[0]?.promotionPrice ??
          product.prices?.currentPrice ??
          product.prices?.fullPrice ??
          0;

        if (price > 20) {
          const productUrl = pdpUrl.startsWith("http")
            ? pdpUrl
            : `${BASE_URL}${pdpUrl}`;
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

    // ── 1. HTTP fetch + __NEXT_DATA__ (sin browser) ─────────────────────────
    const webResult = await priceFromNikeWeb(shoe);
    if (webResult) {
      return {
        ...base,
        url: webResult.url,
        precio_actual: webResult.price,
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

        const slugCandidates = modelToSlugCandidates(shoe.modelo);

        for (const card of cards.slice(0, 12)) {
          const linkEl = await card.$("a");
          const href = (await linkEl?.getAttribute("href")) ?? "";
          const hrefLower = href.toLowerCase();

          const titleEl = await card.$(
            '[data-testid="product-subtitle"], [class*="product-card__title"], ' +
              "[class*=\"headline\"], h3, h4, [class*=\"title\"]"
          );
          const title = (await titleEl?.textContent()) ?? "";

          // Filtrar productos no-calzado (camisetas, custom pages, etc.)
          if (!isShoeUrl(hrefLower)) continue;

          // Match by URL slug (word-boundary) OR by title
          const slugOk = slugCandidates.some((s) => slugMatchesUrl(hrefLower, s));
          const titleOk = matchesShoe(title, shoe.marca, shoe.modelo);
          if (!slugOk && !titleOk) continue;

          const priceEl = await card.$(
            '[data-testid="product-price"], [class*="product-card__price"], ' +
              '[class*="headline--5"], [class*="price"]'
          );
          const priceText = (await priceEl?.textContent()) ?? "";
          const price = parsePrice(priceText);
          if (!price) continue;

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
