import type { Zapatilla, LinkCompra } from "./types";

export interface PreciosJson {
  generated_at: string;
  shoes: Record<string, { links_compra: Partial<LinkCompra>[] }>;
}

/**
 * Mezcla precios scrapeados (precios.json) sobre los datos editoriales (zapatillas.ts).
 * - Si precios.json tiene datos para una tienda concreta, sobreescribe precio_actual,
 *   disponible y ultima_verificacion.
 * - Las entradas editoriales que no existen en precios.json se conservan tal cual.
 * - No altera ningún otro campo (urls, afiliado, etc.).
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

    const scrapedMap = new Map(cached.links_compra.map((l) => [l.tienda, l]));

    const mergedLinks: LinkCompra[] = shoe.links_compra.map((orig) => {
      const fresh = scrapedMap.get(orig.tienda);
      if (!fresh) return orig;
      return {
        ...orig,
        precio_actual: fresh.precio_actual ?? orig.precio_actual,
        disponible: fresh.disponible ?? orig.disponible,
        // Upgrade URL if scraper found a direct product page
        url: fresh.url ?? orig.url,
        ultima_verificacion:
          fresh.ultima_verificacion ?? orig.ultima_verificacion,
      };
    });

    return { ...shoe, links_compra: mergedLinks };
  });
}
