import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

/** Cuántas fichas candidatas de un listado llegamos a abrir para verificar. */
const MAX_CANDIDATOS = 3;

/**
 * Contenedores de precio de una ficha, del más fiable al más genérico. Se prueban
 * de UNO EN UNO y en este orden: ver el comentario de `leerFicha`.
 * `.a-text-price` es el precio tachado ("precio recomendado"), nunca el de venta.
 */
const SELECTORES_PRECIO = [
  "#corePriceDisplay_desktop_feature_div .priceToPay .a-offscreen",
  "#corePriceDisplay_desktop_feature_div .a-price:not(.a-text-price) .a-offscreen",
  "#corePrice_feature_div .a-price:not(.a-text-price) .a-offscreen",
  "#price_inside_buybox",
  ".a-price:not(.a-text-price) .a-offscreen",
];

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
  // OJO: un `$$eval` con varios selectores separados por comas devuelve los nodos
  // en ORDEN DEL DOCUMENTO, no en el orden en que se escriben. Con la lista
  // mezclada, cualquier `.a-price` que viniera antes en el HTML (otra oferta, otra
  // talla, el carrusel) le ganaba al buybox: medido el 13-sep, fichas correctas a
  // 31-45 € cuyo precio real era 70-125 € (One Take 5, Trae Young 3, MB.03...).
  for (const selector of SELECTORES_PRECIO) {
    const textos = await page
      .$$eval(selector, (els) => els.map((el) => el.textContent?.trim() ?? ""))
      .catch(() => [] as string[]);
    const precio = textos.map((t) => parsePrice(t)).find((p): p is number => p !== null);
    if (precio) return { titulo, precio };
  }
  return { titulo, precio: null };
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
        // El título ES el de la zapa: antes de mirar el precio, comprobamos si se
        // puede comprar. La señal fiable es el BOTÓN de añadir al carrito, no el
        // texto "No disponible" (sale también en páginas que sí venden: medido el
        // 18-sep, con el texto salían 39 agotadas de 51 y con el botón, 8). Y sin
        // botón sigue habiendo precios en la página (otras ofertas, otras tallas),
        // así que preguntar solo por el precio no detecta el agotado: la Ja 1
        // devolvía 29,99 € de un vendedor que ni siquiera tiene carrito.
        const hayCarrito = await page
          .$("#add-to-cart-button")
          .then((el) => !!el)
          .catch(() => false);
        if (!hayCarrito) return { ...base, disponible: false, agotado: true };
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
