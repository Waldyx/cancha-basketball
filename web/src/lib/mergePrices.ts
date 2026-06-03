import type { Zapatilla, LinkCompra } from "./types";

export interface PreciosJson {
  generated_at: string;
  shoes: Record<string, { links_compra: Partial<LinkCompra>[] }>;
}

/**
 * Guardarraíl de cordura (segunda red, defensiva). Aunque el scraper ya filtra
 * precios implausibles, este merge vuelve a comprobarlo en build: si un precio
 * scrapeado se desvía demasiado del editorial (ej. revendedor Marketplace que
 * infla 95€ → 356€), se ignora el override y se conserva el precio editorial.
 * Así NUNCA llega un precio basura a producción, venga de donde venga precios.json.
 */
const MAX_PRICE_RATIO = 1.5;
const MIN_PRICE_RATIO = 0.35;

function precioPlausible(scraped: number, ref: number): boolean {
  if (ref <= 0) return true;
  return scraped <= ref * MAX_PRICE_RATIO && scraped >= ref * MIN_PRICE_RATIO;
}

function isAmazonUrl(url: string): boolean {
  return /(^|\/\/)(www\.)?amazon\./i.test(url);
}

function getAmazonTag(url: string): string | null {
  try {
    const parsed = new URL(url);
    return parsed.searchParams.get("tag");
  } catch {
    return null;
  }
}

function setWrapperDestination(originalUrl: string, destinationUrl: string): string {
  try {
    const parsed = new URL(originalUrl);

    // Awin uses `ued`, Tradetracker often uses `u`; keep the wrapper and swap
    // only the merchant destination.
    const keyCandidates = ["ued", "u", "url", "dest", "destination"];
    for (const key of keyCandidates) {
      if (parsed.searchParams.has(key)) {
        parsed.searchParams.set(key, destinationUrl);
        return parsed.toString();
      }
    }
  } catch {
    // Fall through to returning the destination.
  }
  return destinationUrl;
}

function isSearchLikeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const haystack = `${parsed.hostname}${parsed.pathname}`.toLowerCase();
    const searchParams = [...parsed.searchParams.keys()].map((k) => k.toLowerCase());

    if (/(^|\/)(search|results|finder|browse)(\/|$)/.test(haystack)) return true;
    if (/(^|\/)(collection|category|categories)(\/|$)/.test(haystack)) return true;
    if (searchParams.some((key) => ["q", "query", "keyword", "keywords", "s"].includes(key))) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

function resolveUrl(orig: LinkCompra, freshUrl?: string): string {
  if (!freshUrl || freshUrl === orig.url) return orig.url;

  const freshLooksLikeSearch = isSearchLikeUrl(freshUrl);
  const origLooksLikeSearch = isSearchLikeUrl(orig.url);

  // Si el scraper trae una URL de búsqueda/categoría y ya teníamos una ficha
  // de producto, nos quedamos con la ficha. No queremos degradar una URL buena.
  if (freshLooksLikeSearch && !origLooksLikeSearch) {
    return orig.url;
  }

  // If the scraper found a clean product URL, prefer it. When the original
  // link is an affiliate wrapper, try to preserve the wrapper and swap only
  // the destination to the fresh product URL.
  if (orig.tiene_afiliado) {
    if (isAmazonUrl(orig.url)) {
      const tag = getAmazonTag(orig.url) ?? "canchazapa-21";
      try {
        const parsed = new URL(freshUrl);
        if (parsed.hostname.includes("amazon.")) {
          parsed.searchParams.set("tag", tag);
          return parsed.toString();
        }
      } catch {
        // If freshUrl is not a valid absolute URL, fall through.
      }
    }

    const wrapped = setWrapperDestination(orig.url, freshUrl);
    if (wrapped !== freshUrl) return wrapped;
  }

  return freshUrl;
}

/**
 * Mezcla precios scrapeados (precios.json) sobre los datos editoriales (zapatillas.ts).
 *
 * Reglas:
 * - Solo se aplica un override si el scraper encontró el producto (disponible: true,
 *   precio_actual > 0). Un fallo de scraping (bot-detection, timeout, etc.) NO debe
 *   anular un precio editorial válido.
 * - Las entradas editoriales que no existen en precios.json se conservan tal cual.
 * - El scraper puede "upgrade" la URL al directlink del producto cuando lo encuentra.
 * - Las tiendas encontradas por el scraper que no están en el catálogo editorial
 *   (ej. idealo_es como fallback) se añaden al final de links_compra.
 */
export function mergePricesIntoShoes(
  shoes: Zapatilla[],
  overrides: PreciosJson
): Zapatilla[] {
  if (!overrides?.shoes || Object.keys(overrides.shoes).length === 0) {
    return shoes;
  }

  return shoes.map((shoe) => {
    const cached = overrides.shoes[shoe.id];
    if (!cached?.links_compra?.length) return shoe;

    // Solo usar overrides con precio real (disponible: true AND precio > 0)
    const validScraped = cached.links_compra.filter(
      (l) => l.disponible === true && (l.precio_actual ?? 0) > 0
    );
    if (validScraped.length === 0) return shoe;

    const scrapedMap = new Map(validScraped.map((l) => [l.tienda, l]));

    // Tiendas editables que también existen en el scrape
    const mergedLinks: LinkCompra[] = shoe.links_compra.map((orig) => {
      const fresh = scrapedMap.get(orig.tienda);
      if (!fresh) return orig;
      // Guardarraíl: si el precio scrapeado es implausible vs el editorial,
      // ignorar el override por completo y conservar la entrada editorial.
      if (!precioPlausible(fresh.precio_actual ?? 0, orig.precio_actual)) {
        return orig;
      }
      // NUNCA sobreescribir la URL de un link de afiliado: el scraper devuelve
      // la URL directa del producto (p.ej. amazon.es/dp/...) SIN el tag de
      // afiliado (?tag=, redirect AWIN cread.php, short link aliexpress), lo que
      // rompería la monetización. Para afiliados, intentamos mantener el wrapper
      // y solo sustituir el destino por la URL de producto directa. Para
      // no-afiliados, hacemos el "upgrade" completo a la página de producto.
      const upgradeUrl = resolveUrl(orig, fresh.url);
      return {
        ...orig,
        precio_actual: fresh.precio_actual ?? orig.precio_actual,
        disponible: true, // ya comprobamos arriba que fresh.disponible === true
        url: upgradeUrl,
        ultima_verificacion:
          fresh.ultima_verificacion ?? orig.ultima_verificacion,
      };
    });

    // Añadir tiendas extra del scraper que no estaban en el catálogo editorial
    // (e.g. idealo_es como fallback automático)
    const editorialTiendas = new Set(shoe.links_compra.map((l) => l.tienda));
    for (const fresh of validScraped) {
      if (!editorialTiendas.has(fresh.tienda as any)) {
        mergedLinks.push({
          tienda: fresh.tienda as any,
          url: fresh.url ?? "",
          precio_actual: fresh.precio_actual ?? 0,
          disponible: true,
          tiene_afiliado: false,
          ultima_verificacion:
            fresh.ultima_verificacion ?? new Date().toISOString().slice(0, 10),
        });
      }
    }

    return { ...shoe, links_compra: mergedLinks };
  });
}
