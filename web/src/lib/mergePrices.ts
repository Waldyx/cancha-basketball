import type { Zapatilla, LinkCompra } from "./types";

export interface PreciosJson {
  generated_at: string;
  shoes: Record<string, { links_compra: Partial<LinkCompra>[] }>;
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
      // NUNCA sobreescribir la URL de un link de afiliado: el scraper devuelve
      // la URL directa del producto (p.ej. amazon.es/dp/...) SIN el tag de
      // afiliado (?tag=, redirect AWIN cread.php, short link aliexpress), lo que
      // rompería la monetización. Para afiliados conservamos la URL editorial y
      // solo refrescamos precio/disponibilidad. Para no-afiliados sí hacemos el
      // "upgrade" de search → página de producto directa.
      const upgradeUrl =
        !orig.tiene_afiliado && fresh.url && fresh.url !== orig.url
          ? fresh.url
          : orig.url;
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
