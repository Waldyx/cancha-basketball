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

/**
 * Veredicto de una ficha `/dp/` de Amazon, aislado del navegador para poder testearlo.
 *
 * La regla que importa: **`agotado` solo con una señal POSITIVA de que no se vende.**
 * Si no hay botón de compra PERO tampoco hay un "no disponible", el scrape es
 * INCONCLUYENTE y se devuelve `disponible: false` SIN `agotado` — así el merge no apaga
 * el enlace editorial por algo que no se ha llegado a comprobar.
 */
/**
 * La ÚNICA señal que marca agotado en Amazon. No incluye `#availability`: su texto
 * sale también en páginas que sí venden (medido el 18-sep y otra vez el 22-sep, cuando
 * infló los agotados de 18 a 64 en una noche). Medido sobre las 64 páginas de ese día:
 * `#outOfStock` y el botón de compra nunca coexisten, y ningún agotado real careció de él.
 */
export const SELECTOR_AGOTADO = "#outOfStock";

export function veredictoFicha(
  compra: boolean,
  sinStock: boolean,
  precio: number | null
): { disponible: boolean; agotado?: true; precio_actual?: number } {
  if (compra) return precio ? { disponible: true, precio_actual: precio } : { disponible: false };
  if (sinStock) return { disponible: false, agotado: true };
  return { disponible: false };
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
        //
        // 🔴 CORREGIDO EL 21-sep-2026. Lo de arriba sigue siendo cierto, pero la regla
        // "sin botón ⇒ agotado" es AUSENCIA DE EVIDENCIA, y salió cara: la pasada de esa
        // noche marcó 61 agotados de Amazon y dejó 25 fichas anunciando "no la vende
        // ninguna de nuestras tiendas" mientras Amazon las vendía. Comprobado a mano:
        // `adidas-dame-8` (B0B6GM83PV) y `nike-ja-1` (B0D1S5M6LG) tenían ese mismo día
        // `add-to-cart-button` Y `buy-now-button`. El chivato de que era un fallo nuestro
        // y no el mercado: 25 fichas perdieron la compra en una noche y NINGUNA la
        // recuperó — un mercado real no hace eso.
        // Dos causas posibles, y el arreglo cubre las dos sin tener que distinguirlas:
        // con `domcontentloaded` el buybox puede no estar todavía en el DOM, y la IP de
        // CI puede recibir una página recortada. Ahora:
        //   1) se ESPERA a que aparezca una de las tres señales, en vez de preguntar al
        //      instante por una sola;
        //   2) `agotado` exige una señal POSITIVA de que no se vende;
        //   3) si no aparece ninguna, el scrape es INCONCLUYENTE (`disponible: false` sin
        //      `agotado`), que es lo que no envenena el merge ni apaga el enlace editorial.
        await page
          .waitForSelector("#add-to-cart-button, #buy-now-button, #outOfStock", { timeout: 6000 })
          .catch(() => null);
        const compra = await page
          .$("#add-to-cart-button, #buy-now-button")
          .then((el) => !!el)
          .catch(() => false);
        if (compra) return { ...base, ...veredictoFicha(true, false, precio) };
        // ⚠ `$$eval` y no `$eval`: con selectores separados por comas se devuelven los
        // nodos en ORDEN DEL DOCUMENTO, no en el de la lista (la misma trampa que costó
        // el bug del buybox el 13-sep). Preguntando por TODOS y con un `some` da igual
        // cuál venga antes.
        // 🔴 CORREGIDO EL 22-sep-2026, segunda vez. El arreglo del 21-sep quitó bien la
        // "ausencia de evidencia", pero dejó como señal positiva el TEXTO de
        // `#availability` — que es justo lo que ya se había medido el 18-sep como no
        // fiable ("No disponible" sale también en páginas que sí venden). Resultado de
        // la primera pasada con el arreglo puesto: Amazon saltó de 18 a 64 agotados en
        // una noche, 29 fichas perdieron la compra y NINGUNA la recuperó, mientras las
        // otras 6 tiendas no movían ni uno. Comprobados a mano los 64 contra Amazon:
        // 46 vendían con carrito, 7 estaban agotados de verdad y 11 no daban ninguna
        // señal. En las 64 páginas, `#outOfStock` y el botón de compra NUNCA
        // coexistieron, y ningún agotado real careció de `#outOfStock`.
        // ⇒ La única señal negativa que se sostiene es la PRESENCIA de `#outOfStock`.
        // Sin botón y sin `#outOfStock`, el scrape es INCONCLUYENTE (esos 11), que es
        // lo que no apaga el enlace editorial.
        const sinStock = await page
          .$(SELECTOR_AGOTADO)
          .then((el) => !!el)
          .catch(() => false);
        return { ...base, ...veredictoFicha(false, sinStock, precio) };
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
