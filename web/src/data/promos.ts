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
    id: "forumsport-flash-night-2026-06",
    tienda: "forumsport_es",
    tiendaLabel: "Forum Sport",
    titulo: "Flash Night Verano",
    desde: "2026-06-11T18:00:00+02:00",
    hasta: "2026-06-12T10:00:00+02:00",
    codigo: "25MIN",
    descuentoTexto: "25% mínimo en calzado (compras +70€)",
    nota: "Solo socios · exclusivo online · no acumulable",
    color: "#facc15",
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
