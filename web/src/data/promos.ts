// ─────────────────────────────────────────────────────────────────────
// Promos de tiendas afiliadas — CANCHA.ZAPA
//
// Fuente única de promociones. La activación por fecha se hace EN CLIENTE
// (la web es estática: un check en build no se "encendería" solo el día de
// inicio sin re-desplegar). Los componentes serializan PROMOS a JSON y un
// script decide qué mostrar según la fecha del navegador.
//
// Para añadir una promo nueva (llega por email de Awin/AliExpress):
//   1. Copia un objeto de abajo y rellena tienda, fechas, código(s) y nota.
//   2. Nada más: aparece sola al llegar `desde` y desaparece tras `hasta`.
// ─────────────────────────────────────────────────────────────────────

export interface PromoCodigo {
  code: string;
  descuento: number; // € de descuento
  minCompra: number; // compra mínima en €
}

export interface Promo {
  id: string;
  tienda: string; // debe coincidir con LinkCompra.tienda (p.ej. "aliexpress")
  tiendaLabel: string;
  titulo: string;
  desde: string; // ISO con zona, p.ej. "2026-06-15T00:00:00+02:00"
  hasta: string; // ISO con zona (fin inclusive)
  url?: string; // enlace de afiliado a la tienda (home/campaña)
  /** Códigos escalonados por importe (estilo AliExpress). */
  codigos?: PromoCodigo[];
  /** Código único simple (estilo Forum Sport "25MIN"). */
  codigo?: string;
  /** Texto corto del descuento, p.ej. "25% en ropa y calzado". */
  descuentoTexto?: string;
  /** Restricciones / letra pequeña, mostrada honestamente. */
  nota?: string;
  color?: string; // color de acento del banner
}

export const PROMOS: Promo[] = [
  {
    id: "aliexpress-mitad-ano-2026",
    tienda: "aliexpress",
    tiendaLabel: "AliExpress",
    titulo: "Promo Mitad de Año",
    desde: "2026-06-15T00:00:00+02:00",
    hasta: "2026-06-20T23:59:59+02:00",
    codigos: [
      { code: "ESMYS02", descuento: 2, minCompra: 15 },
      { code: "ESMYS04", descuento: 4, minCompra: 30 },
      { code: "ESMYS09", descuento: 9, minCompra: 65 },
      { code: "ESMYS15", descuento: 15, minCompra: 120 },
      { code: "ESMYS25", descuento: 25, minCompra: 209 },
      { code: "ESMYS40", descuento: 40, minCompra: 329 },
      { code: "ESMYS55", descuento: 55, minCompra: 449 },
    ],
    nota: "Solo en productos con el sello “Promo Mitad de Año” · envíos a España · no acumulable con otras promos",
    color: "#ff4747",
  },
  {
    id: "aliexpress-dia-de-marcas-2026-06",
    tienda: "aliexpress",
    tiendaLabel: "AliExpress",
    titulo: "Día de marcas",
    desde: "2026-06-22T00:00:00+02:00",
    hasta: "2026-06-26T23:59:59+02:00",
    codigos: [
      { code: "BDES04", descuento: 4, minCompra: 35 },
      { code: "BDES08", descuento: 8, minCompra: 69 },
      { code: "BDES12", descuento: 12, minCompra: 109 },
      { code: "BDES25", descuento: 25, minCompra: 209 },
      { code: "BDES40", descuento: 40, minCompra: 329 },
    ],
    nota: "Solo en productos con el sello “Día de marcas” · envíos a España · no acumulable con otras promos",
    color: "#ff4747",
  },
  {
    id: "decathlon-rebajas-verano-2026",
    tienda: "decathlon",
    tiendaLabel: "Decathlon",
    titulo: "Rebajas",
    desde: "2026-06-29T00:00:00+02:00",
    hasta: "2026-07-31T23:59:59+02:00",
    url: "https://www.awin1.com/cread.php?awinmid=105405&awinaffid=2908587&ued=https%3A%2F%2Fwww.decathlon.es%2Fes%2Flp%2Frebajas",
    descuentoTexto: "Rebajas en gran selección",
    nota: "Descuento aplicado directamente en la web · selección de productos",
    color: "#0082c3",
  },
  {
    id: "forumsport-rebajas-2026",
    tienda: "forumsport_es",
    tiendaLabel: "Forum Sport",
    titulo: "Rebajas hasta 50%",
    desde: "2026-06-25T00:00:00+02:00",
    hasta: "2026-07-15T23:59:59+02:00",
    url: "https://www.awin1.com/cread.php?awinmid=23805&awinaffid=2908587&ued=https%3A%2F%2Fwww.forumsport.com%2Fes-es%2F",
    descuentoTexto: "hasta 50% en selección",
    nota: "Descuento aplicado directamente en el precio · productos seleccionados · exclusivo online",
    color: "#facc15",
  },
  {
    id: "adidas-end-of-season-2026",
    tienda: "adidas_es",
    tiendaLabel: "adidas",
    titulo: "End of Season Sales",
    desde: "2026-06-26T00:00:00+02:00",
    hasta: "2026-07-20T23:59:59+02:00",
    url: "https://www.awin1.com/cread.php?awinmid=77008&awinaffid=2908587&ued=https%3A%2F%2Fwww.adidas.es%2Foutlet",
    descuentoTexto: "hasta 30% en selección",
    nota: "Descuentos aplicados directamente en la web · selección de artículos · no acumulable",
    color: "#9fd0ff",
  },
  {
    id: "atmosfera-rebajas-2026-07",
    tienda: "atmosfera_sport",
    tiendaLabel: "Atmósfera Sport",
    titulo: "Rebajas hasta 60%",
    desde: "2026-07-01T00:00:00+02:00",
    hasta: "2026-07-26T23:59:59+02:00",
    url: "https://www.awin1.com/cread.php?awinmid=26255&awinaffid=2908587&ued=https%3A%2F%2Fwww.atmosferasport.es%2Frebajas-material-deportivo-1349",
    descuentoTexto: "hasta 60% en calzado, ropa y equipamiento",
    nota: "Descuento aplicado directamente en la web · calzado, ropa y equipamiento deportivo · selección de productos",
    color: "#12a5e5",
  },
  {
    id: "aliexpress-ahorros-verano-2026-07",
    tienda: "aliexpress",
    tiendaLabel: "AliExpress",
    titulo: "Ahorros de verano",
    desde: "2026-07-01T00:00:00+02:00",
    hasta: "2026-07-07T23:59:59+02:00",
    codigos: [
      { code: "ESCD02", descuento: 2, minCompra: 18 },
      { code: "ESCD06", descuento: 6, minCompra: 45 },
      { code: "ESCD11", descuento: 11, minCompra: 79 },
      { code: "ESCD20", descuento: 20, minCompra: 149 },
      { code: "ESCD30", descuento: 30, minCompra: 239 },
      { code: "ESCD45", descuento: 45, minCompra: 359 },
      { code: "ESCD60", descuento: 60, minCompra: 479 },
    ],
    nota: "Códigos no válidos en productos virtuales · envíos a España · no acumulable con otras promos",
    color: "#ff4747",
  },
];

/** Promos activas a una fecha dada (por defecto, ahora). */
export function promosActivas(now: Date = new Date()): Promo[] {
  const t = now.getTime();
  return PROMOS.filter((p) => t >= new Date(p.desde).getTime() && t <= new Date(p.hasta).getTime());
}

/** Mejor código aplicable a un precio (el de mayor descuento que cumpla la compra mínima). */
export function mejorCodigo(promo: Promo, precio: number): PromoCodigo | null {
  if (!promo.codigos?.length) return null;
  const aplicables = promo.codigos
    .filter((c) => precio >= c.minCompra)
    .sort((a, b) => b.descuento - a.descuento);
  return aplicables[0] ?? null;
}
