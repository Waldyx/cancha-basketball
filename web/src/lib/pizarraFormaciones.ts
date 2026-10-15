// Formaciones rápidas de la pizarra (ataque y defensa): lógica pura, sin DOM.
// Todas las coordenadas están en el sistema canónico (metros, canasta en x = 1,575,
// y = 7,5 en el centro) para media pista con la canasta a la izquierda. Con "espejo"
// se giran a la otra canasta de la pista completa.
//
// Criterio de colocación (medidas FIBA): el arco de 3 está a 6,75 m del aro (su punto
// más alto, x = 8,33), así que los tiradores exteriores van a 7-7,5 m del aro y las
// esquinas detrás de la línea (y < 0,90 m de la banda). La zona mide 4,90 × 5,80 m:
// "codos" = esquinas de la línea de tiros libres (x = 5,8; y = 5,05 / 9,95) y "bloques"
// = junto a la línea de la zona, a 2,6 m de la línea de fondo.

import {
  CANCHA,
  anadirPieza,
  cambiarCancha,
  clonar,
  dist,
  largoCancha,
  limitaPunto,
  moverPiezaEn,
  redondea,
  type Cancha,
  type Jugada,
  type Pieza,
  type Pt,
} from "./pizarra";

export interface Slot {
  tipo: "atq" | "def" | "balon";
  etiqueta: string;
  x: number;
  y: number;
  /** Fuera de la pista a propósito (el que saca). */
  fuera?: boolean;
}

export interface Formacion {
  id: string;
  nombre: string;
  lado: "ataque" | "defensa";
  /** Pista mínima necesaria: la presión pide pista completa. */
  cancha: Cancha;
  descripcion: string;
  /** Puestos de la formación. La defensa individual los calcula a partir de los atacantes. */
  slots: (atacantes: Pieza[]) => Slot[];
}

const CY = CANCHA.ANCHO / 2;

const atq = (n: number, x: number, y: number, fuera = false): Slot => ({ tipo: "atq", etiqueta: String(n), x, y, ...(fuera ? { fuera } : {}) });
const def = (n: number, x: number, y: number): Slot => ({ tipo: "def", etiqueta: `X${n}`, x, y });
/** El balón queda junto a su portador (mismo desfase que usa la animación). */
const balonCon = (s: Slot): Slot => ({ tipo: "balon", etiqueta: "", x: redondea(s.x + 0.5), y: redondea(s.y + 0.4) });

// Puestos reutilizados (media pista, canasta a la izquierda)
const CIMA = { x: 9.2, y: CY }; // sobre el arco, eje de la pista
const ALA_I = { x: 6.6, y: 2.2 }; // a ~7,3 m del aro, en diagonal
const ALA_D = { x: 6.6, y: CANCHA.ANCHO - 2.2 };
const ESQ_I = { x: 1.9, y: 0.6 }; // esquina: detrás de la línea de 3 (a 0,90 m de banda)
const ESQ_D = { x: 1.9, y: CANCHA.ANCHO - 0.6 };
const CODO_I = { x: 5.8, y: 5.05 };
const CODO_D = { x: 5.8, y: 9.95 };

/** Defensa individual: cada X entre su par y el aro, a 1,35 m del atacante. */
export function aroDe(atacantes: Pt[], cancha: Cancha): Pt {
  if (cancha === "media" || atacantes.length === 0) return { x: CANCHA.ARO_X, y: CY };
  const media = atacantes.reduce((s, p) => s + p.x, 0) / atacantes.length;
  return { x: media < CANCHA.LARGO / 2 ? CANCHA.ARO_X : CANCHA.LARGO - CANCHA.ARO_X, y: CY };
}

export function defensaIndividual(atacantes: Pieza[], cancha: Cancha): Slot[] {
  const aro = aroDe(atacantes, cancha);
  const orden = atacantes
    .filter((p) => p.tipo === "atq")
    .slice()
    .sort((a, b) => (parseInt(a.etiqueta, 10) || 99) - (parseInt(b.etiqueta, 10) || 99));
  return orden.slice(0, 15).map((a, i) => {
    const d = dist(a, aro);
    const paso = Math.min(1.35, Math.max(1.0, d * 0.55));
    const ux = d > 0 ? (aro.x - a.x) / d : 1;
    const uy = d > 0 ? (aro.y - a.y) / d : 0;
    const n = parseInt(a.etiqueta, 10);
    return def(Number.isFinite(n) && n > 0 && n <= 15 ? n : i + 1, redondea(a.x + ux * paso), redondea(a.y + uy * paso));
  });
}

export const FORMACIONES: Formacion[] = [
  {
    id: "atq-1-3-1",
    nombre: "1-3-1",
    lado: "ataque",
    cancha: "media",
    descripcion: "Base arriba, alas y pívot alto en línea, uno en la línea de fondo",
    slots: () => {
      const s = [atq(1, CIMA.x, CIMA.y), atq(2, ALA_I.x, ALA_I.y), atq(3, ALA_D.x, ALA_D.y), atq(4, 5.8, CY), atq(5, 2.6, CY)];
      return [...s, balonCon(s[0])];
    },
  },
  {
    id: "atq-1-4-alto",
    nombre: "1-4 alto",
    lado: "ataque",
    cancha: "media",
    descripcion: "Base arriba y cuatro en línea sobre la línea de tiros libres",
    slots: () => {
      const s = [atq(1, 9.4, CY), atq(2, 5.8, 1.6), atq(4, CODO_I.x, CODO_I.y), atq(5, CODO_D.x, CODO_D.y), atq(3, 5.8, CANCHA.ANCHO - 1.6)];
      return [...s, balonCon(s[0])];
    },
  },
  {
    id: "atq-2-3",
    nombre: "2-3 (5 abiertos)",
    lado: "ataque",
    cancha: "media",
    descripcion: "Dos exteriores arriba, esquinas ocupadas y uno en el poste bajo",
    slots: () => {
      const s = [atq(1, 8.6, 5.2), atq(2, 8.6, 9.8), atq(3, ESQ_I.x, ESQ_I.y), atq(4, ESQ_D.x, ESQ_D.y), atq(5, 3.0, CY)];
      return [...s, balonCon(s[0])];
    },
  },
  {
    id: "atq-1-2-2",
    nombre: "1-2-2",
    lado: "ataque",
    cancha: "media",
    descripcion: "Base arriba, dos alas y dos postes en los bloques",
    slots: () => {
      const s = [atq(1, CIMA.x, CIMA.y), atq(2, ALA_I.x, ALA_I.y), atq(3, ALA_D.x, ALA_D.y), atq(4, 2.6, CODO_I.y), atq(5, 2.6, CODO_D.y)];
      return [...s, balonCon(s[0])];
    },
  },
  {
    id: "atq-cuernos",
    nombre: "Cuernos (horns)",
    lado: "ataque",
    cancha: "media",
    descripcion: "Dos pívots en los codos, base arriba y aleros en las esquinas",
    slots: () => {
      const s = [atq(1, CIMA.x, CIMA.y), atq(2, ESQ_I.x, ESQ_I.y), atq(3, ESQ_D.x, ESQ_D.y), atq(4, CODO_I.x, CODO_I.y), atq(5, CODO_D.x, CODO_D.y)];
      return [...s, balonCon(s[0])];
    },
  },
  {
    id: "atq-saque-caja",
    nombre: "Saque de fondo: caja",
    lado: "ataque",
    cancha: "media",
    descripcion: "Cuatro en cuadrado dentro de la zona; el 1 saca por detrás de la línea de fondo",
    slots: () => {
      const s = [atq(1, -1.0, 11.2, true), atq(2, 2.6, CODO_I.y), atq(3, 2.6, CODO_D.y), atq(4, 5.8, CODO_I.y), atq(5, 5.8, CODO_D.y)];
      return [...s, { tipo: "balon", etiqueta: "", x: -0.5, y: 11.6 }];
    },
  },
  {
    id: "atq-saque-linea",
    nombre: "Saque de fondo: línea",
    lado: "ataque",
    cancha: "media",
    descripcion: "Cuatro en fila paralela a la línea de fondo, en la zona; el 1 saca",
    slots: () => {
      const s = [atq(1, -1.0, CY, true), atq(2, 3.4, 5.2), atq(3, 3.4, 6.75), atq(4, 3.4, 8.3), atq(5, 3.4, 9.85)];
      return [...s, { tipo: "balon", etiqueta: "", x: -0.5, y: CY + 0.4 }];
    },
  },
  {
    id: "def-individual",
    nombre: "Individual",
    lado: "defensa",
    cancha: "media",
    descripcion: "Cada defensor entre su par y el aro (se coloca respecto a tus atacantes)",
    slots: (atacantes) => defensaIndividual(atacantes, "media"),
  },
  {
    id: "def-zona-2-3",
    nombre: "Zona 2-3",
    lado: "defensa",
    cancha: "media",
    descripcion: "Dos arriba en la línea de tiros libres, tres abajo",
    slots: () => [def(1, 6.4, 5.3), def(2, 6.4, 9.7), def(3, 3.2, 3.4), def(4, 3.0, CY), def(5, 3.2, 11.6)],
  },
  {
    id: "def-zona-3-2",
    nombre: "Zona 3-2",
    lado: "defensa",
    cancha: "media",
    descripcion: "Tres arriba cubriendo el perímetro, dos abajo",
    slots: () => [def(1, 6.6, 3.4), def(2, 6.9, CY), def(3, 6.6, 11.6), def(4, 3.2, 5.4), def(5, 3.2, 9.6)],
  },
  {
    id: "def-zona-1-3-1",
    nombre: "Zona 1-3-1",
    lado: "defensa",
    cancha: "media",
    descripcion: "Un punta, tres en línea por el centro y uno atrás",
    slots: () => [def(1, 7.6, CY), def(2, 4.6, 3.4), def(3, 4.6, CY), def(4, 4.6, 11.6), def(5, 2.4, CY)],
  },
  {
    id: "def-presion-1-2-1-1",
    nombre: "Presión 1-2-1-1",
    lado: "defensa",
    cancha: "completa",
    descripcion: "Pista completa: uno sobre el saque, dos en las alas, uno en el centro y un último atrás",
    slots: () => [def(1, 1.2, CY), def(2, 6.5, 4.3), def(3, 6.5, 10.7), def(4, 12.5, CY), def(5, 21.5, CY)],
  },
];

export const formacionPorId = (id: string): Formacion | undefined => FORMACIONES.find((f) => f.id === id);

export interface ResultadoFormacion {
  jugada: Jugada;
  /** Líneas del paso que se quitaron por salir de una pieza recolocada. */
  lineasQuitadas: number;
}

/**
 * Coloca la formación en el paso `k`. Las piezas ya existentes del mismo tipo y número
 * se MUEVEN (así conservan su identidad entre pasos y la animación las sigue); las que
 * faltan se crean (también en los pasos siguientes). Las líneas que salían de una pieza
 * recolocada se quitan, porque ya no apuntan a ninguna parte.
 */
export function aplicarFormacion(j: Jugada, k: number, f: Formacion, opts: { espejo?: boolean } = {}): ResultadoFormacion {
  let out = clonar(j);
  if (f.cancha === "completa" && out.cancha !== "completa") out = cambiarCancha(out, "completa");
  const L = largoCancha(out.cancha);
  const espejo = !!opts.espejo && out.cancha === "completa";
  const atacantes = out.pasos[k].piezas.filter((p) => p.tipo === "atq");
  const slots = f.slots(atacantes);
  const movidas = new Set<string>();
  for (const s of slots) {
    const pos = limitaPunto({ x: redondea(espejo ? L - s.x : s.x), y: s.y }, out.cancha);
    const paso = out.pasos[k];
    const existente = paso.piezas.find((p) => p.tipo === s.tipo && (s.tipo === "balon" ? !movidas.has(p.id) : p.etiqueta === s.etiqueta));
    if (existente) {
      moverPiezaEn(paso, existente.id, pos);
      movidas.add(existente.id);
    } else {
      const r = anadirPieza(out, k, s.tipo, pos, s.etiqueta);
      out = r.jugada;
      movidas.add(r.id);
    }
  }
  const paso = out.pasos[k];
  const antes = paso.lineas.length;
  paso.lineas = paso.lineas.filter((l) => !(l.ref && movidas.has(l.ref)) && !(l.fin && movidas.has(l.fin)));
  return { jugada: out, lineasQuitadas: antes - paso.lineas.length };
}
