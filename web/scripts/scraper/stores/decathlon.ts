/**
 * Scraper para Decathlon España (decathlon.es)
 *
 * Estrategia (reescrita 2026-07-28, antes 0/32 aciertos):
 *  - NADA de fetch HTTP: Decathlon está tras Cloudflare y responde 403
 *    "Just a moment..." a cualquier petición sin navegador. El paso previo de
 *    fetch fallaba siempre y solo gastaba 15s de timeout por enlace.
 *  - El precio se lee del JSON-LD del producto ("price"), que es el canónico.
 *    Los selectores CSS son el plan B: las clases cambiaron a `vp-price-amount`
 *    (antes `price__amount`) y en la página conviven precios de productos
 *    recomendados, por lo que el JSON-LD es más fiable.
 */
import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

const BASE = "https://www.decathlon.es";

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

    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });

      // El precio (JSON-LD incluido) se inyecta al hidratar: leer el DOM justo
      // tras domcontentloaded devolvía la página aún vacía y fallaba casi siempre.
      await page
        .waitForSelector('script[type="application/ld+json"], .vp-price-amount, [class*="product-card"]', {
          timeout: 10000,
        })
        .catch(() => {});

      // Muchas fichas antiguas ya no existen y Decathlon REDIRIGE a una búsqueda,
      // así que el tipo de página se decide por la URL final, no por la de origen.
      const finalUrl = page.url();
      const isSearch =
        /\/search|Ntt=|[?&]q=/.test(finalUrl) || /\/search|Ntt=|[?&]q=/.test(url);

      // ── Ficha de producto (/es/p/…): 30 de los 31 enlaces del catálogo ──────
      if (!isSearch) {
        const ld = await page
          .$$eval('script[type="application/ld+json"]', (nodes) =>
            nodes.map((n) => n.textContent || "").filter((t) => t.includes('"price"'))
          )
          .catch(() => [] as string[]);
        const ldTexto = ld[0] ?? "";

        // Identidad: el h1 de Decathlon MUCHAS veces omite la marca ("Zapatillas
        // de baloncesto Adulto - D.O.N ISSUE 7", sin "adidas"), así que validamos
        // contra h1 + nombre y marca del JSON-LD + <title>. Si ninguno casa, la
        // ficha es de otro producto (URL obsoleta) y no la damos por buena.
        const h1 = await page.$eval("h1", (el) => el.textContent?.trim() ?? "").catch(() => "");
        const docTitle = await page.title().catch(() => "");
        const ldNombre = (ldTexto.match(/"name"\s*:\s*"([^"]+)"/) || [])[1] ?? "";
        const ldMarca = (ldTexto.match(/"brand"\s*:\s*(?:\{[^}]*?"name"\s*:\s*)?"([^"]+)"/) || [])[1] ?? "";

        const candidatos = [
          [ldMarca, ldNombre].filter(Boolean).join(" "),
          docTitle,
          h1,
        ].filter((t) => t.trim().length > 0);

        if (candidatos.length > 0 && !candidatos.some((t) => matchesShoe(t, shoe.marca, shoe.modelo))) {
          return { ...base, disponible: false };
        }

        // 1) JSON-LD: el precio canónico del producto de esta página.
        const ldPrecio = (() => {
          for (const t of ld) {
            const m = t.match(/"price"\s*:\s*"?([\d.]+)/);
            if (m) return parseFloat(m[1]);
          }
          return null;
        })();
        if (ldPrecio && ldPrecio > 0) {
          return { ...base, precio_actual: ldPrecio, disponible: true };
        }

        // 2) Plan B por CSS: precio rebajado si lo hay, si no el normal.
        //    Se excluye `--small` (bloques de productos recomendados) y el
        //    tachado `vp-price-barred-amount` (precio antiguo).
        const cssPrecio = await page
          .$$eval(
            ".vp-price-amount--sale, .vp-price-amount:not(.vp-price-barred-amount):not(.vp-price-amount--small)",
            (els) => els.map((el) => el.textContent?.trim() ?? "")
          )
          .catch(() => [] as string[]);
        const precio = cssPrecio.map((t) => parsePrice(t)).find((p): p is number => p !== null);
        if (precio) return { ...base, precio_actual: precio, disponible: true };

        return { ...base, disponible: false };
      }

      // ── Listado / búsqueda ──────────────────────────────────────────────────
      await page
        .waitForSelector('[class*="product-card"], .vp-price-amount', { timeout: 12000 })
        .catch(() => {});

      const cards = await page.$$('[class*="product-card"]');
      for (const card of cards.slice(0, 8)) {
        const linkEl = await card.$("a");
        const title =
          (await linkEl?.getAttribute("aria-label")) ??
          (await linkEl?.textContent()) ??
          "";
        if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

        const href = await linkEl?.getAttribute("href");
        const productUrl = href?.startsWith("http")
          ? href
          : href
          ? `${BASE}${href}`
          : url;

        const priceEl = await card.$(
          ".vp-price-amount--sale, .vp-price-amount:not(.vp-price-barred-amount)"
        );
        const price = parsePrice((await priceEl?.textContent()) ?? "");
        if (price) {
          return { ...base, url: productUrl, precio_actual: price, disponible: true };
        }
      }

      return { ...base, disponible: false };
    } catch {
      return base;
    }
  },
};
