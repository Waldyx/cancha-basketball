import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";
import {
  getAeCredentials,
  extractProductId,
  productDetail,
  productQuery,
  type AeCredentials,
} from "./aliexpress_api.js";

/**
 * AliExpress no sirve el precio en el HTML: la ficha es CSR (`isCSR = true`,
 * `runParams` vacío) y lo pide por XHR a `mtop.aliexpress.pdp.pc.query`. Desde
 * un navegador automatizado esa XHR se responde con un reto anti-bot
 * (`_____tmd_____/punish` → reCAPTCHA Enterprise), así que el precio NO llega.
 *
 * Medido el 2026-07-30 sobre 3 fichas: ~9 llamadas de precio y ~20 respuestas
 * de reto por página, 0 precios. Alguna petición se cuela (3 de 47 enlaces la
 * noche del 30-jul), por eso NO desactivamos la tienda — pero esperar en una
 * página ya retada es tiempo tirado.
 *
 * Detecta la URL del reto. Deliberadamente NO mira los scripts de `baxia`/AWSC:
 * esos cargan también en páginas sanas y darían falso positivo, haciéndonos
 * perder los precios que sí se obtienen.
 */
export function isBotChallengeUrl(url: string): boolean {
  return /\/_____tmd_____\//i.test(url) || /\/punish[/?]/i.test(url);
}

/** Presupuesto de espera del precio. Antes eran 3s ciegos + 5s de isVisible. */
const PRICE_WAIT_MS = 6000;
const POLL_MS = 500;

/**
 * Decide si el precio de una tarjeta de resultados es válido PARA ESTA zapa.
 *
 * Antes esta comprobación no existía: bastaba con que hubiera un título de 3+
 * caracteres y un precio ≥20€ para aceptarlo, con el comentario "son productos
 * de la búsqueda correcta". No lo son: la búsqueda de AliExpress devuelve otras
 * generaciones, otras marcas y accesorios. Es la misma clase de fallo que puso
 * unas Adidas Cross 'Em Up en la ficha de la Sabrina 2.
 */
export function precioDeCandidato(
  title: string,
  priceText: string,
  shoe: ShoeRef
): number | null {
  if (title.trim().length < 3) return null;
  const price = parsePrice(priceText);
  if (!price || price < 20) return null;
  if (!matchesShoe(title, shoe.marca, shoe.modelo)) return null;
  return price;
}

/** Extracción barata: lo que antes eran los dos primeros intentos. */
async function precioRapido(page: Page): Promise<number | null> {
  const content = await page.content();

  // AliExpress embebe precios en JSON dentro del HTML
  const priceMatch = content.match(/"originalPrice":\s*\{[^}]*"value":\s*([\d.]+)/);
  if (priceMatch) {
    const price = parseFloat(priceMatch[1]);
    if (price > 0) return price;
  }

  // Fallback: selector visual
  const priceEl = page
    .locator('[class*="product-price-value"], [class*="price--currentPriceText"], .product-price-value')
    .first();
  if (await priceEl.isVisible({ timeout: 500 }).catch(() => false)) {
    const priceText = await priceEl.textContent();
    const price = parsePrice(priceText ?? "");
    if (price) return price;
  }

  return null;
}

/**
 * Camino por API (el bueno). Devuelve null solo si NO se puede decidir por API
 * — enlace corto `s.click` sin id resoluble —, en cuyo caso se cae al navegador.
 * Si la API responde y no hay producto, eso ES una respuesta: no está a la venta.
 */
export async function precioViaApi(
  url: string,
  shoe: ShoeRef,
  creds: AeCredentials,
  fetchImpl: typeof fetch = fetch
): Promise<ScrapeResult | null> {
  const base: ScrapeResult = {
    tienda: "aliexpress",
    url,
    precio_actual: 0,
    disponible: false,
    ultima_verificacion: today(),
  };

  const productId = extractProductId(url);
  if (productId) {
    const p = await productDetail(productId, creds, fetchImpl);
    if (!p) return { ...base, disponible: false };
    return { ...base, precio_actual: p.price, disponible: true };
  }

  // Sin id: si el enlace es una búsqueda, preguntamos por texto y decide el
  // matcher. Nos quedamos con el MÁS BARATO que empareje, no con el primero
  // (aprendizaje de adidas en la s34).
  if (/[?&](SearchText|keywords)=/i.test(url) || /\/wholesale/i.test(url)) {
    const q = `${shoe.marca} ${shoe.modelo}`;
    const candidatos = (await productQuery(q, creds, fetchImpl))
      .filter((p) => matchesShoe(p.title, shoe.marca, shoe.modelo))
      .sort((a, b) => a.price - b.price);
    const mejor = candidatos[0];
    if (!mejor) return { ...base, disponible: false };
    // Devolvemos la URL de la ficha encontrada: el merge la fija sola y el
    // enlace de búsqueda se auto-repara, como pasó con Amazon en la s34.
    return {
      ...base,
      url: mejor.url || url,
      precio_actual: mejor.price,
      disponible: true,
    };
  }

  return null;
}

export const aliexpress: StoreScraper = {
  tienda: "aliexpress",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "aliexpress",
      url,
      precio_actual: 0,
      disponible: false,
      ultima_verificacion: today(),
    };

    // Con credenciales, la API manda: no hay reto anti-bot que valga.
    const creds = getAeCredentials();
    if (creds) {
      const viaApi = await precioViaApi(url, shoe, creds).catch(() => null);
      if (viaApi) return viaApi;
    }

    // Si salta el reto anti-bot, abandonamos ya: el precio no va a aparecer.
    let retado = false;
    const onResponse = (r: { url(): string }) => {
      if (isBotChallengeUrl(r.url())) retado = true;
    };
    page.on("response", onResponse);

    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });

      // Espera por CONDICIÓN, no a ojo: sale en cuanto hay precio (las páginas
      // que funcionan van más rápido que antes) o en cuanto salta el reto.
      const limite = Date.now() + PRICE_WAIT_MS;
      while (Date.now() < limite) {
        if (retado) return { ...base, disponible: false };
        const price = await precioRapido(page);
        if (price) return { ...base, precio_actual: price, disponible: true };
        await page.waitForTimeout(POLL_MS);
      }
      if (retado) return { ...base, disponible: false };

      // Fallback: buscar en resultados de búsqueda (formato 2024/2025).
      // Solo se llega aquí si la página cargó SIN reto y aun así no dio precio.
      const cards = await page.$$(
        '[class*="SearchCard"], [class*="list--gallery"], [class*="product-card"], ' +
        '[class*="ProductCard"], [class*="card--"]'
      );
      for (const card of cards.slice(0, 10)) {
        const titleEl = await card.$('[class*="title"], [class*="Title"], h3, h4');
        const title = (await titleEl?.textContent()) ?? "";
        const priceEl = await card.$('[class*="price"], [class*="Price"]');
        const priceText = (await priceEl?.textContent()) ?? "";

        // Solo aceptamos la tarjeta si el título ES esta zapa (ver arriba).
        const price = precioDeCandidato(title, priceText, shoe);
        if (price) return { ...base, precio_actual: price, disponible: true };
      }

      // Último recurso: el precio mínimo visible en la página, SIN título contra
      // el que contrastar. Solo es defendible en una ficha (/item/), donde la
      // página va de un único producto. En una búsqueda cogería el mínimo de una
      // parrilla de productos distintos — justo el error que queremos evitar.
      if (/\/item\/\d+/.test(page.url())) {
        const allPriceEls = await page.$$('[class*="price"], [class*="Price"]');
        const prices: number[] = [];
        for (const el of allPriceEls.slice(0, 20)) {
          const text = (await el.textContent()) ?? "";
          const p = parsePrice(text);
          if (p && p > 30 && p < 400) prices.push(p);
        }
        if (prices.length >= 2) {
          return { ...base, precio_actual: Math.min(...prices), disponible: true };
        }
      }

      return { ...base, disponible: false };
    } catch {
      return base;
    } finally {
      page.off("response", onResponse);
    }
  },
};
