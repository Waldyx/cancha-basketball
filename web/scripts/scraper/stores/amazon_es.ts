import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

/** Cuántas fichas candidatas de un listado llegamos a abrir para verificar. */
const MAX_CANDIDATOS = 3;

/**
 * Lee título y precio de una ficha /dp/ ya cargada.
 *
 * El precio vive en distintos contenedores según el tipo de oferta, y el primer
 * `.a-offscreen` del DOM suele venir VACÍO: recogemos todos los candidatos en
 * orden y nos quedamos con el primero que parsee.
 */
async function leerFicha(page: Page): Promise<{ titulo: string; precio: number | null }> {
  const titulo = await page
    .$eval("#productTitle", (el) => el.textContent?.trim() ?? "")
    .catch(() => "");
  const candidatos = await page
    .$$eval(
      "#corePrice_feature_div .a-offscreen, #corePriceDisplay_desktop_feature_div .a-offscreen, #price_inside_buybox, .a-price .a-offscreen",
      (els) => els.map((el) => el.textContent?.trim() ?? "")
    )
    .catch(() => [] as string[]);
  const precio = candidatos.map((t) => parsePrice(t)).find((p): p is number => p !== null) ?? null;
  return { titulo, precio };
}

export const amazon_es: StoreScraper = {
  tienda: "amazon_es",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "amazon_es",
      url,
      precio_actual: 0,
      disponible: false,
      ultima_verificacion: today(),
    };

    try {
      // Quitar tag de afiliado para el scraping (evita tratamiento diferencial de Amazon)
      const scrapeUrl = url.replace(/[?&]tag=[^&]+/, (m) =>
        m.startsWith("?") ? "?" : ""
      ).replace(/\?$/, "").replace(/&&/, "&");

      await page.goto(scrapeUrl, { waitUntil: "domcontentloaded", timeout: 25000 });

      // Aceptar cookies si aparece el modal
      const cookieBtn = page.locator("#sp-cc-accept, #accept-button");
      if (await cookieBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await cookieBtn.click();
        await page.waitForTimeout(800);
      }

      // ── Ficha de producto (/dp/ASIN) ────────────────────────────────────────
      // No tiene resultados de búsqueda: si esperásemos el selector de listado
      // daría timeout y la zapa se marcaba "no encontrada" (12 links del catálogo).
      if (/\/dp\/|\/gp\/product\//.test(scrapeUrl)) {
        const { titulo, precio } = await leerFicha(page);
        if (!titulo || !matchesShoe(titulo, shoe.marca, shoe.modelo)) {
          return { ...base, disponible: false };
        }
        if (!precio) return { ...base, disponible: false };
        return { ...base, precio_actual: precio, disponible: true };
      }

      // Esperar resultados de búsqueda
      await page.waitForSelector(
        '[data-component-type="s-search-result"], .s-result-item',
        { timeout: 12000 }
      );

      // Recoger todos los resultados
      const results = await page.$$('[data-component-type="s-search-result"]');

      // ── Preselección por el texto de la tarjeta ─────────────────────────────
      // Amazon (2025+) separa marca y modelo en elementos distintos, así que
      // para PRESELECCIONAR usamos el texto completo del resultado. Pero ese
      // texto incluye precio, valoración y talla, y eso basta para validar por
      // error un modelo que se llama por un número: medido el 2026-08-06, 8 de
      // 31 aciertos aparentes eran otro producto (la "Air Jordan 40" era una
      // AJ1 Mid de béisbol en talla 40 EU; la "Air Max CB 34", una Air Max 270
      // en talla 34). Por eso la tarjeta solo propone: quien decide es la ficha.
      const candidatos: string[] = [];
      for (const result of results.slice(0, 8)) {
        const title = (await result.innerText().catch(() => "")) ?? "";
        if (!matchesShoe(title, shoe.marca, shoe.modelo)) continue;

        const linkEl = await result.$("h2 a, a.a-link-normal");
        const href = await linkEl?.getAttribute("href");
        if (!href) continue;
        const productUrl = `https://www.amazon.es${href.split("?")[0]}`;
        if (!candidatos.includes(productUrl)) candidatos.push(productUrl);
        if (candidatos.length >= MAX_CANDIDATOS) break;
      }

      // ── Verificación en la ficha ────────────────────────────────────────────
      // El #productTitle es el nombre real del producto, sin precio ni talla
      // pegados, así que es el único sitio donde el emparejamiento es de fiar.
      for (const productUrl of candidatos) {
        await page.goto(productUrl, { waitUntil: "domcontentloaded", timeout: 25000 });
        const { titulo, precio } = await leerFicha(page);
        if (!titulo || !matchesShoe(titulo, shoe.marca, shoe.modelo)) continue;
        if (!precio) continue;

        return {
          ...base,
          url: productUrl,
          precio_actual: precio,
          disponible: true,
        };
      }

      return { ...base, disponible: false };
    } catch {
      return base;
    }
  },
};
