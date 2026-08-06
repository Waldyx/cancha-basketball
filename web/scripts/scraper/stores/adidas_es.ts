/**
 * Scraper para Adidas España (adidas.es)
 *
 * Estrategia:
 *  - adidas.es está protegido por Akamai WAF → fetch HTTP plano devuelve 403.
 *    Solo CloakBrowser (Chromium stealth) consigue HTML hidratado.
 *  - La URL del catálogo suele ser un wrapper Awin
 *    (https://www.awin1.com/cread.php?awinmid=77008&...&ued=ENCODED_URL).
 *    Reconstruimos siempre una URL de búsqueda canónica desde marca+modelo
 *    para evitar URLs históricas obsoletas y eludir el redirect Awin.
 *  - Selectores actuales (2026) — el frontend "Glass" usa data-testid:
 *      article[data-testid="plp-product-card"]
 *        a[data-testid="product-card-image-link"] → href
 *        [data-testid="main-price"]              → precio
 *        [data-testid="product-card-title"]      → título
 */
import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, parsePrice, today } from "../matcher.js";

const BASE = "https://www.adidas.es";

/**
 * Cómo rotula adidas el segmento junior: con palabra ("Niños", "para niño") o
 * con la J final de su propia nomenclatura ("ANTHONY EDWARDS 2 J").
 */
export const ES_JUNIOR = /(Niñ[oa]s?|Bebé|Junior|Infantil|Adolescentes|\sJ\s*$)/i;

/** ¿La ficha del catálogo es del segmento junior? ("AE 2 GS", "AE 1 Low GS") */
export function esModeloGS(modelo: string): boolean {
  return /\bgs\b/i.test(modelo);
}

/**
 * Consulta de búsqueda para adidas.es.
 *
 * Su buscador entiende el nombre COMERCIAL, no el del catálogo:
 *  - "gs" no lo entiende: "adidas ae 1 low gs" devuelve CERO resultados aunque
 *    la zapatilla esté a la venta. Se traduce a "niños".
 *  - "ae 1" tampoco: devuelve zapatillas de correr sueltas. Con "anthony
 *    edwards 1" salen las 6 colorways, junior incluida.
 */
export function consultaAdidas(marca: string, modelo: string): string {
  return `${marca} ${modelo}`
    .toLowerCase()
    .replace(/\bae\s+(\d+)/g, "anthony edwards $1")
    .replace(/\bgs\b/g, "niños");
}

/**
 * Adidas usa nombres extendidos diferentes a los del catálogo. Normaliza el
 * título del producto a la nomenclatura corta del catálogo antes de matchear.
 */
export function normalizeAdidasTitle(title: string): string {
  return title
    // Harden Volume/Volumen N → Harden Vol N
    .replace(/Harden\s+Volum(?:e|en)\s+(\d+)/i, "Harden Vol $1")
    // Anthony Edwards N → AE N
    .replace(/Anthony\s+Edwards\s+(\d+)/i, "AE $1")
    // D.O.N. Issue / Donovan Mitchell → DON Issue
    .replace(/Donovan\s+Mitchell\s+(\d+)/i, "DON Issue $1")
    .replace(/D\.O\.N\.\s+Issue\s+(\d+)/i, "DON Issue $1")
    // "… 2 J" → "… 2 GS": la J final es como adidas marca el junior, y el
    // catálogo lo llama GS. Sin esto la ficha junior no se puede identificar.
    .replace(/\s+J\s*$/, " GS");
}

interface TarjetaAdidas {
  title: string;
  priceText: string;
  href: string;
}

/** Lee de una sola pasada las 15 primeras tarjetas del listado. */
async function leerTarjetas(page: Page): Promise<TarjetaAdidas[]> {
  return page
    .$$eval('article[data-testid="plp-product-card"]', (els) =>
      els.slice(0, 15).map((c) => ({
        title: c.querySelector('[data-testid="product-card-title"]')?.textContent?.trim() ?? "",
        priceText: c.querySelector('[data-testid="main-price"]')?.textContent?.trim() ?? "",
        href:
          (c.querySelector('a[data-testid="product-card-image-link"]') as HTMLAnchorElement)
            ?.href ?? "",
      }))
    )
    .catch(() => [] as TarjetaAdidas[]);
}

export const adidas_es: StoreScraper = {
  tienda: "adidas_es",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "adidas_es",
      url,
      precio_actual: 0,
      disponible: false,
      ultima_verificacion: today(),
    };

    // URL search canónica (evita URLs Awin/historiales)
    const searchUrl = `${BASE}/search?q=${encodeURIComponent(consultaAdidas(shoe.marca, shoe.modelo))}`;
    const buscamosGS = esModeloGS(shoe.modelo);

    try {
      await page.goto(searchUrl, { waitUntil: "domcontentloaded", timeout: 30000 });

      // Aceptar cookies GDPR de Adidas
      const gdprBtn = page.locator(
        'button[data-auto-id="glass-gdpr-default-consent-accept-button"], ' +
          'button:has-text("Aceptar"), button:has-text("Accept all")'
      );
      if (
        await gdprBtn.first().isVisible({ timeout: 4000 }).catch(() => false)
      ) {
        await gdprBtn.first().click();
        await page.waitForTimeout(800);
      }

      // Esperar a que carguen los product cards
      await page
        .waitForSelector('[data-testid="plp-product-card"]', { timeout: 15000 })
        .catch(() => {});

      // Las tarjetas se leen de una sola pasada. Antes se hacían 3 viajes al
      // navegador POR TARJETA (título, precio, href) y adidas re-renderiza el
      // listado mientras tanto: los handles quedaban obsoletos, el título salía
      // vacío y la zapatilla se daba por no encontrada. De ahí los fallos
      // intermitentes, que cambiaban de víctima en cada pasada.
      let cards = await leerTarjetas(page);

      // A veces el listado no llega a hidratar y devuelve CERO tarjetas para una
      // búsqueda que sí tiene resultados (medido: 1-2 víctimas distintas en cada
      // pasada de 27). Una segunda oportunidad sale mucho más barata que dejar
      // la zapatilla sin verificar 24 h.
      if (cards.length === 0) {
        await page.waitForTimeout(3000);
        await page.reload({ waitUntil: "domcontentloaded", timeout: 30000 }).catch(() => {});
        await page
          .waitForSelector('[data-testid="plp-product-card"]', { timeout: 15000 })
          .catch(() => {});
        cards = await leerTarjetas(page);
      }

      // Nos quedamos con la MÁS BARATA de las que emparejan, no con la primera.
      // adidas devuelve una tarjeta por colorway y el rango es enorme: la AE 2
      // sale en 10 tarjetas de 70 a 130 €. Coger la primera daba un precio
      // arbitrario — y si tocaba una de 130 €, el guardarraíl de precio la
      // descartaba y la zapatilla se quedaba sin verificar.
      let mejor: { precio: number; url: string } | null = null;

      for (const { title, priceText, href } of cards) {
        if (!title) continue;
        // El segmento tiene que coincidir, y en los DOS sentidos:
        //  - buscando la de adulto, una junior colaría igual y MÁS BARATA;
        //  - buscando la GS, el filtro de junior la hacía imposible de
        //    encontrar (las 2 zapas GS de adidas fallaban siempre por esto,
        //    aunque adidas.es las vende: "Niños Anthony Edwards 2", 70 €).
        if (ES_JUNIOR.test(title) !== buscamosGS) continue;
        // Adidas usa nombres extendidos ("Harden Volume 9", "Anthony Edwards 2")
        // que normalizamos a la nomenclatura corta del catálogo ("Vol 9", "AE 2").
        const normalized = normalizeAdidasTitle(title);
        // En adidas.es, la marca "Adidas" no aparece en el título.
        // Inyectamos para que el filtro de marca del matcher pase.
        const titleForMatch = /^adidas/i.test(normalized) ? normalized : `Adidas ${normalized}`;
        if (!matchesShoe(titleForMatch, shoe.marca, shoe.modelo)) continue;

        const price = parsePrice(priceText);
        if (!price || price < 20 || price > 500) continue;

        const productUrl = href || searchUrl;

        if (!mejor || price < mejor.precio) mejor = { precio: price, url: productUrl };
      }

      if (mejor) {
        return { ...base, url: mejor.url, precio_actual: mejor.precio, disponible: true };
      }

      return { ...base, disponible: false };
    } catch {
      return base;
    }
  },
};
