/**
 * Scraper para Idealo España (idealo.es)
 *
 * Idealo es un agregador de precios que indexa Amazon, Footlocker, JD Sports,
 * Zalando, Sprinter, El Corte Inglés y más de 20 tiendas. Orientado al SEO,
 * sirve resultados en el HTML inicial, lo que permite extraer precios sin
 * ejecutar JavaScript pesado.
 *
 * Se usa como fallback automático cuando todos los scrapers directos fallan
 * para una zapatilla concreta.
 *
 * URL de búsqueda: https://www.idealo.es/precios/{query}.html
 * (el formato de búsqueda fue actualizado por idealo en 2025)
 */

import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

const BASE = "https://www.idealo.es";

/**
 * Construye URLs de búsqueda de idealo en varios formatos posibles.
 * idealo cambia sus URLs con frecuencia; probamos los formatos conocidos.
 */
export function idealoSearchUrls(marca: string, modelo: string): string[] {
  const q = `${marca} ${modelo}`;
  const qBasket = `${marca} ${modelo} baloncesto`;
  const slug = q.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return [
    // Formato clásico de búsqueda (puede devolver 410 si caducó)
    `${BASE}/precios/search.html?q=${encodeURIComponent(q)}`,
    // Formato slug en URL
    `${BASE}/precios/${slug}.html`,
    // Con filtro de categoría deportiva
    `${BASE}/precios/search.html?q=${encodeURIComponent(qBasket)}`,
    // Formato sin subcarpeta /precios/
    `${BASE}/search.html?q=${encodeURIComponent(q)}`,
  ];
}

/** Devuelve la primera URL que no devuelva 404/410 */
export function idealoSearchUrl(marca: string, modelo: string): string {
  return idealoSearchUrls(marca, modelo)[0];
}

async function acceptCookies(page: Page): Promise<void> {
  const selectors = [
    'button[data-testid="uc-accept-all-button"]',
    'button:has-text("Aceptar todo")',
    'button:has-text("Accept all")',
    'button:has-text("Aceptar")',
    "#uc-btn-accept-banner",
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

/** Intenta navegar a una URL de idealo, probando variantes si la principal falla */
async function navigateIdealo(
  page: Page,
  marca: string,
  modelo: string,
  primaryUrl: string
): Promise<string | null> {
  const urls = [primaryUrl, ...idealoSearchUrls(marca, modelo)].filter(
    (u, i, a) => a.indexOf(u) === i // dedup
  );

  for (const url of urls) {
    const resp = await page
      .goto(url, { waitUntil: "domcontentloaded", timeout: 22000 })
      .catch(() => null);

    const status = resp?.status() ?? 0;

    // 410 = Gone (URL caducada), 404 = Not Found → probar siguiente
    if (status === 410 || status === 404) continue;

    // 200 o redirección exitosa
    if (status >= 200 && status < 400) return url;
  }
  return null;
}

export const idealo_es: StoreScraper = {
  tienda: "idealo_es",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "idealo_es",
      url,
      precio_actual: 0,
      disponible: false,
      ultima_verificacion: today(),
    };

    try {
      // Navegar con fallback a múltiples URLs
      const successUrl = await navigateIdealo(page, shoe.marca, shoe.modelo, url);
      if (!successUrl) return { ...base, disponible: false };

      await acceptCookies(page);

      // ── 1. Intentar extraer datos desde el JSON de Next.js/React embebido ──
      const jsonPrice = await page
        .evaluate(
          ({ marca, modelo }) => {
            const scripts = Array.from(
              document.querySelectorAll(
                'script[type="application/json"], script[id="__NEXT_DATA__"], script[id="__REDUX__"]'
              )
            );
            for (const s of scripts) {
              try {
                const data = JSON.parse(s.textContent ?? "");
                const text = JSON.stringify(data);
                const brandLow = marca.toLowerCase();
                const modeloWords = modelo.toLowerCase().split(" ");
                const firstWord = modeloWords[0];
                if (
                  !text.toLowerCase().includes(brandLow) &&
                  !text.toLowerCase().includes(firstWord)
                )
                  continue;

                // Extraer precios numéricos que parezcan razonables
                const priceMatches = text.matchAll(
                  /"(?:price|cheapestPrice|minPrice|bestPrice|lowestPrice)":\s*"?([\d.]+)"?/gi
                );
                const prices: number[] = [];
                for (const m of priceMatches) {
                  const p = parseFloat(m[1]);
                  if (p > 20 && p < 800) prices.push(p);
                }
                if (prices.length > 0) return Math.min(...prices);
              } catch {
                /* skip */
              }
            }
            return null;
          },
          { marca: shoe.marca, modelo: shoe.modelo }
        )
        .catch(() => null);

      if (jsonPrice && jsonPrice > 20) {
        return {
          ...base,
          url: successUrl,
          precio_actual: jsonPrice,
          disponible: true,
        };
      }

      // ── 2. Esperar resultados y raspar tarjetas ───────────────────────────
      await page
        .waitForSelector(
          [
            ".sr-resultList__item",
            "[class*=ResultItem]",
            "[class*=result-item]",
            "[class*=ProductCard]",
            "[data-testid*=result]",
            // idealo 2025 structure
            "[class*=productCard]",
            "article[class*=product]",
          ].join(", "),
          { timeout: 10000 }
        )
        .catch(() => {});

      const cardSelectors = [
        ".sr-resultList__item",
        "[class*=ResultItem]",
        "[class*=result-item]",
        "[class*=ProductCard]",
        "[class*=productCard]",
        "article",
      ].join(", ");

      const cards = await page.$$(cardSelectors);

      let bestPrice = Infinity;
      let bestUrl = successUrl;

      for (const card of cards.slice(0, 10)) {
        // Título
        const titleEl = await card.$(
          "[class*=title], [class*=Title], [class*=name], [class*=Name], h2, h3, [data-testid*=name]"
        );
        const title = (await titleEl?.textContent()) ?? "";
        if (title.length < 3) continue;
        if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

        // Precio mínimo mostrado
        const priceEl = await card.$(
          "[class*=price], [class*=Price], .price-placeholder, [data-testid*=price]"
        );
        const priceText = (await priceEl?.textContent()) ?? "";
        const price = parsePrice(priceText);
        if (!price || price < 20) continue;

        if (price < bestPrice) {
          bestPrice = price;
          const linkEl = await card.$("a[href]");
          const href = await linkEl?.getAttribute("href");
          if (href) {
            bestUrl = href.startsWith("http") ? href : `${BASE}${href}`;
          }
        }
      }

      if (bestPrice < Infinity) {
        return {
          ...base,
          url: bestUrl,
          precio_actual: bestPrice,
          disponible: true,
        };
      }

      // ── 3. Último recurso: precio más bajo en cualquier elemento price ─────
      const allPriceEls = await page.$$("[class*=price], [class*=Price]");
      const pagePrices: number[] = [];
      for (const el of allPriceEls.slice(0, 30)) {
        const text = (await el.textContent()) ?? "";
        const p = parsePrice(text);
        if (p && p > 25 && p < 800) pagePrices.push(p);
      }
      if (pagePrices.length >= 3) {
        // Si hay varios precios razonables, el mínimo es probablemente el mejor precio
        const minPagePrice = Math.min(...pagePrices);
        return {
          ...base,
          url: successUrl,
          precio_actual: minPagePrice,
          disponible: true,
        };
      }

      return { ...base, disponible: false };
    } catch {
      return base;
    }
  },
};
