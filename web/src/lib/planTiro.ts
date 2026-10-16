// Plan individual de tiro (/plan-tiro): el jugador elige una rutina, apunta anotados e intentos en
// cada puesto y ve cómo mejora sesión a sesión. Coordenadas CANÓNICAS de la pizarra (metros, canasta
// en x = 1,575, y = 7,5). Todo en su navegador (cz.plantiro.v1). Lógica pura.

import type { Pt } from "./pizarra";

export interface Puesto extends Pt {
  id: string;
  nombre: string;
}

const ARO = { x: 1.575, y: 7.5 };
/** Puesto a `r` metros del aro, a `grados` desde la línea de fondo izquierda (0) hasta la derecha (180). */
const enArco = (id: string, nombre: string, r: number, grados: number): Puesto => {
  const a = (grados * Math.PI) / 180;
  return { id, nombre, x: Math.round((ARO.x + r * Math.sin(a)) * 100) / 100, y: Math.round((ARO.y - r * Math.cos(a)) * 100) / 100 };
};

export const PUESTOS: Puesto[] = [
  { id: "tl", nombre: "Tiro libre", x: 5.8, y: 7.5 },
  enArco("m1", "Media · esquina izquierda", 4.5, 8),
  enArco("m2", "Media · ala izquierda", 4.5, 45),
  enArco("m3", "Media · frontal", 4.5, 90),
  enArco("m4", "Media · ala derecha", 4.5, 135),
  enArco("m5", "Media · esquina derecha", 4.5, 172),
  // triples de esquina pegados a la banda (0,9 m) y el resto a 7,1 m, por fuera del arco de 6,75
  { id: "t1", nombre: "Triple · esquina izquierda", x: 1.4, y: 0.55 },
  enArco("t2", "Triple · ala izquierda", 7.1, 45),
  enArco("t3", "Triple · frontal", 7.1, 90),
  enArco("t4", "Triple · ala derecha", 7.1, 135),
  { id: "t5", nombre: "Triple · esquina derecha", x: 1.4, y: 14.45 },
];

export interface Rutina {
  id: string;
  nombre: string;
  puestos: string[];
  /** Tiros recomendados por puesto (orientativo: se pueden hacer más o menos). */
  porPuesto: number;
}

export const RUTINAS: Rutina[] = [
  { id: "libres", nombre: "Tiros libres (25)", puestos: ["tl"], porPuesto: 25 },
  { id: "media", nombre: "Media distancia · 5 puestos × 10", puestos: ["m1", "m2", "m3", "m4", "m5"], porPuesto: 10 },
  { id: "triples", nombre: "Triples · 5 puestos × 10", puestos: ["t1", "t2", "t3", "t4", "t5"], porPuesto: 10 },
  { id: "completa", nombre: "Completa · media, triples y libres", puestos: ["m1", "m2", "m3", "m4", "m5", "t1", "t2", "t3", "t4", "t5", "tl"], porPuesto: 5 },
];

export type Cuenta = [anotados: number, intentos: number];

export interface SesionTiro {
  id: string;
  fecha: string;
  rutina: string;
  tiros: Record<string, Cuenta>;
}

export interface StorePlanTiro {
  v: 1;
  sesiones: SesionTiro[];
}

export const LIMITE_SESIONES_TIRO = 300;

export function totalSesion(s: SesionTiro): Cuenta {
  let a = 0;
  let i = 0;
  for (const [c, n] of Object.values(s.tiros)) {
    a += c;
    i += n;
  }
  return [a, i];
}

export const pctDe = ([c, i]: Cuenta): number | null => (i > 0 ? Math.round((100 * c) / i) : null);

/** % de cada sesión en orden de fecha (solo las que tienen tiros), para la gráfica. */
export function evolucion(sesiones: SesionTiro[], puesto?: string): { fecha: string; pct: number }[] {
  return sesiones
    .slice()
    .sort((a, b) => a.fecha.localeCompare(b.fecha))
    .map((s) => ({ fecha: s.fecha, cuenta: puesto ? (s.tiros[puesto] ?? [0, 0]) : totalSesion(s) }))
    .filter((x) => x.cuenta[1] > 0)
    .map((x) => ({ fecha: x.fecha, pct: pctDe(x.cuenta)! }));
}

/** Acumulado por puesto en todas las sesiones. */
export function porPuesto(sesiones: SesionTiro[]): Record<string, Cuenta> {
  const out: Record<string, Cuenta> = {};
  for (const s of sesiones)
    for (const [p, [c, i]] of Object.entries(s.tiros)) {
      const t = (out[p] ??= [0, 0]);
      t[0] += c;
      t[1] += i;
    }
  return out;
}

/** Cambia una cuenta sin dejar que los anotados superen a los intentos ni bajen de cero. */
export function sumar(cuenta: Cuenta | undefined, dentro: boolean, delta: 1 | -1): Cuenta {
  let [c, i] = cuenta ?? [0, 0];
  if (delta === 1) {
    i++;
    if (dentro) c++;
  } else if (dentro ? c > 0 : i > c) {
    i--;
    if (dentro) c--;
  }
  return [c, i];
}

const esObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const IDS = new Set(PUESTOS.map((p) => p.id));
const RUT = new Set(RUTINAS.map((r) => r.id));
const ent = (v: unknown) => {
  const x = Math.trunc(Number(v));
  return Number.isFinite(x) && x > 0 ? Math.min(x, 999) : 0;
};

/** Valida lo leído de localStorage. Nunca lanza. */
export function normalizarStorePlan(raw: unknown): StorePlanTiro {
  const st: StorePlanTiro = { v: 1, sesiones: [] };
  if (!esObj(raw) || !Array.isArray(raw.sesiones)) return st;
  for (const rs of raw.sesiones.slice(0, LIMITE_SESIONES_TIRO)) {
    if (!esObj(rs) || typeof rs.fecha !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(rs.fecha)) continue;
    const tiros: Record<string, Cuenta> = {};
    if (esObj(rs.tiros))
      for (const [p, v] of Object.entries(rs.tiros)) {
        if (!IDS.has(p) || !Array.isArray(v)) continue;
        const i = ent(v[1]);
        tiros[p] = [Math.min(ent(v[0]), i), i];
      }
    st.sesiones.push({ id: typeof rs.id === "string" && rs.id ? rs.id.slice(0, 40) : `s${st.sesiones.length}`, fecha: rs.fecha, rutina: typeof rs.rutina === "string" && RUT.has(rs.rutina) ? rs.rutina : "completa", tiros });
  }
  return st;
}
