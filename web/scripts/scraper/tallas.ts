/**
 * Tallas comprables por tienda (8-nov-2026).
 *
 * Un `InStock` no dice cuántas tallas quedan (s53c): la AG 6 «disponible» tenía 2 tallas y la
 * Luka 5 de ECI tiene 3. Las tiendas que lo enseñan en la ficha dejan su lista en
 * `ScrapeResult.tallas`, siempre en talla europea y con coma decimal («44,5», «42 2/3»).
 * Ausente = no se pudo leer; nunca se deduce de que falte el selector.
 */

/** Talla europea de adulto o niño razonable para una zapatilla de baloncesto. */
const MIN_EU = 28;
const MAX_EU = 56;

/**
 * Convierte el texto de una talla a su forma europea, o null si no lo es.
 *
 *   «44´5»                 → «44,5»   (FuikaOmar usa el acento agudo como coma)
 *   «10´5 US - 44´5 EUR»   → «44,5»   (se queda con la parte EUR)
 *   «40.5» / «40,5»        → «40,5»
 *   «42 2/3»               → «42 2/3»
 *   «9.5» (sin EUR)        → null     (fuera de rango: es una talla US)
 */
export function tallaEU(texto: string): string | null {
  let t = texto.replace(/\s+/g, " ").trim();
  const eur = t.match(/([\d´'.,]+(?:\s+\d\/3)?)\s*EUR?\b/i);
  if (eur) t = eur[1];
  t = t.replace(/[´']/g, ",").replace(/\./g, ",");
  const m = t.match(/^(\d{2})(?:,(5))?(?:\s+([12])\/3)?$/);
  if (!m) return null;
  const n = Number(m[1]);
  if (n < MIN_EU || n > MAX_EU) return null;
  if (m[2] && m[3]) return null;
  return m[1] + (m[2] ? ",5" : "") + (m[3] ? ` ${m[3]}/3` : "");
}

/** Lista limpia: solo tallas europeas válidas, sin repetir y en orden. */
export function tallasEU(textos: string[]): string[] {
  const vistas = new Set<string>();
  for (const texto of textos) {
    const t = tallaEU(texto);
    if (t) vistas.add(t);
  }
  return [...vistas].sort((a, b) => valorTalla(a) - valorTalla(b));
}

/** Valor numérico de una talla ya normalizada, para ordenar y comparar. */
export function valorTalla(talla: string): number {
  const m = talla.match(/^(\d{2})(?:,(5))?(?: ([12])\/3)?$/);
  if (!m) return NaN;
  return Number(m[1]) + (m[2] ? 0.5 : 0) + (m[3] ? Number(m[3]) / 3 : 0);
}
