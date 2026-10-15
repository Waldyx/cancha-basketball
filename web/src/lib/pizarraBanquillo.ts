// Hoja de banquillo: varias jugadas por página, compactas, con el nombre grande, para llevarlas
// en un folio al partido. Lógica pura: reparte las jugadas en páginas y prepara el dibujo de cada
// tarjeta; la interfaz solo las pone en el DOM.

import { CATEGORIAS, type Jugada } from "./pizarra";
import { PALETAS, opcionesResumen, renderSvgCompleto, type ModoResumen, type Paleta } from "./pizarraRender";

export type PorPagina = 4 | 6;

export const OPCIONES_POR_PAGINA: PorPagina[] = [4, 6];
export const MODOS_BANQUILLO: { id: ModoResumen; label: string; ayuda: string }[] = [
  { id: "todos", label: "Todos los pasos superpuestos", ayuda: "Posición inicial y las flechas de todos los pasos" },
  { id: "ultimo", label: "Solo el último paso", ayuda: "Cómo acaba la jugada" },
];

/** Parte la lista en páginas de `porPagina` (la última puede quedar más corta). */
export function paginar<T>(items: T[], porPagina: number): T[][] {
  const n = Math.max(1, Math.floor(porPagina));
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += n) out.push(items.slice(i, i + n));
  return out;
}

export interface TarjetaBanquillo {
  nombre: string;
  /** Categoría y pasos: "Ataque · 3 pasos". */
  meta: string;
  /** Si la jugada tiene lecturas alternativas. */
  lecturas: string;
  svg: string;
}

export function tarjeta(j: Jugada, modo: ModoResumen, paleta: Paleta = PALETAS.neutra): TarjetaBanquillo {
  const cat = CATEGORIAS.find((c) => c.id === j.categoria)?.label ?? "";
  const pasos = `${j.pasos.length} ${j.pasos.length === 1 ? "paso" : "pasos"}`;
  const nr = j.ramas?.length ?? 0;
  return {
    nombre: j.nombre,
    meta: `${cat} · ${pasos}`,
    lecturas: nr ? `${nr + 1} lecturas` : "",
    // el SVG lo generamos nosotros y escapa todo el texto del usuario
    svg: renderSvgCompleto(opcionesResumen(j, modo, paleta)),
  };
}

export interface HojaBanquillo {
  paginas: TarjetaBanquillo[][];
  total: number;
}

export function prepararBanquillo(jugadas: Jugada[], porPagina: PorPagina, modo: ModoResumen): HojaBanquillo {
  return { paginas: paginar(jugadas.map((j) => tarjeta(j, modo)), porPagina), total: jugadas.length };
}
