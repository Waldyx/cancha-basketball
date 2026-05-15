/**
 * Comisiones estimadas por tienda en España (%).
 * Fuente: Awin, CJ Affiliate, Impact, Amazon Associates ES.
 * Se usan para desempatar cuando dos tiendas tienen precio idéntico (±0,50 €).
 */
export const COMISIONES: Record<string, number> = {
  aliexpress: 8,
  kickscrew: 7,
  basket_world: 7,
  puma_es: 6,
  reebok_es: 6,
  ua_es: 5,
  nb_es: 5,
  nike_es: 5,
  adidas_es: 5,
  jd_sports_es: 5,
  zalando_es: 5,
  sprinter_es: 5,
  footlocker_es: 4,
  amazon_es: 4,
  decathlon: 3,
  // Idealo es un agregador: la comisión real depende de la tienda subyacente.
  // Usamos 4 como estimación conservadora (similar a Amazon/Footlocker).
  idealo_es: 4,
};

export function getComision(tienda: string): number {
  return COMISIONES[tienda] ?? 0;
}
