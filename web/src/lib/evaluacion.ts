// Evaluación de jugadores (/evaluacion). El entrenador valora a cada jugador en unos criterios
// sencillos, por niveles y no con notas (en base, un «4 sobre 10» a un niño de 9 años no ayuda a
// nadie), dos o tres veces por temporada, y ve cómo evoluciona. Todo vive en su navegador
// (cz.evaluacion.v1): son datos de menores y no salen de su dispositivo. Lógica pura.

import { lineasPlantilla } from "./plantillaTexto";

export type Nivel = 0 | 1 | 2 | 3 | 4; // 0 = sin valorar

export const NIVELES: Record<Exclude<Nivel, 0>, string> = {
  1: "Empezando",
  2: "En progreso",
  3: "Lo consigue",
  4: "Destaca",
};

export interface Criterio {
  id: string;
  area: "tecnica" | "juego" | "actitud";
  nombre: string;
  /** Qué mirar, para que dos entrenadores del mismo club valoren lo mismo. */
  pista: string;
}

export const AREAS: Record<Criterio["area"], string> = { tecnica: "Técnica", juego: "Juego", actitud: "Actitud" };

export const CRITERIOS: readonly Criterio[] = [
  { id: "bote", area: "tecnica", nombre: "Bote", pista: "Con las dos manos, sin mirar el balón y protegiéndolo." },
  { id: "pase", area: "tecnica", nombre: "Pase", pista: "Pasa a tiempo y al sitio: de pecho, picado y por encima." },
  { id: "tiro", area: "tecnica", nombre: "Tiro", pista: "Postura y mecánica estables; acierto cerca del aro." },
  { id: "entrada", area: "tecnica", nombre: "Entrada a canasta", pista: "Los dos pasos y por los dos lados." },
  { id: "pies", area: "tecnica", nombre: "Juego de pies", pista: "Paradas, pivote y cambios de ritmo sin pasos." },
  { id: "lectura", area: "juego", nombre: "Lectura del juego", pista: "Ve al compañero libre y elige bien qué hacer." },
  { id: "sinbalon", area: "juego", nombre: "Juego sin balón", pista: "Corta, ocupa espacios y se ofrece." },
  { id: "defensa", area: "juego", nombre: "Defensa", pista: "Posición entre su par y el aro; ayuda a tiempo." },
  { id: "rebote", area: "juego", nombre: "Rebote", pista: "Bloquea el rechace y va a por el balón." },
  { id: "esfuerzo", area: "actitud", nombre: "Esfuerzo", pista: "Intensidad en cada ejercicio, también en los que no le gustan." },
  { id: "companerismo", area: "actitud", nombre: "Compañerismo", pista: "Anima, comparte el balón y respeta a todos." },
  { id: "escucha", area: "actitud", nombre: "Escucha y aprendizaje", pista: "Atiende las correcciones y las aplica." },
];

const IDS = new Set(CRITERIOS.map((c) => c.id));

export interface Evaluacion {
  id: string;
  nombre: string; // «1.ª evaluación», «Navidad»…
  fecha: string; // AAAA-MM-DD
  /** jugador → criterio → nivel */
  notas: Record<string, Record<string, Nivel>>;
  /** jugador → comentario del entrenador */
  comentarios: Record<string, string>;
}

export interface StoreEvaluacion {
  v: 1;
  jugadores: string;
  evaluaciones: Evaluacion[];
}

export const LIMITES_EVALUACION = { EVALUACIONES: 12, JUGADORES: 30, COMENTARIO: 600 } as const;

export function plantilla(texto: string): string[] {
  return lineasPlantilla(texto, LIMITES_EVALUACION.JUGADORES, 40);
}

/** Orden cronológico (la más antigua primero). */
export const cronologico = (evs: Evaluacion[]) => [...evs].sort((a, b) => a.fecha.localeCompare(b.fecha) || a.id.localeCompare(b.id));

/** Media de los criterios valorados (null si ninguno). Con un decimal. */
export function media(notas: Record<string, Nivel> | undefined, area?: Criterio["area"]): number | null {
  if (!notas) return null;
  const vs = CRITERIOS.filter((c) => !area || c.area === area)
    .map((c) => notas[c.id] ?? 0)
    .filter((n) => n > 0);
  return vs.length ? Math.round((10 * vs.reduce((a: number, b) => a + b, 0)) / vs.length) / 10 : null;
}

export const valorados = (notas: Record<string, Nivel> | undefined) => CRITERIOS.filter((c) => (notas?.[c.id] ?? 0) > 0).length;

/** La evaluación anterior a `ev` en la que este jugador tiene algo valorado. */
export function anteriorDe(evs: Evaluacion[], ev: Evaluacion, jugador: string): Evaluacion | null {
  const orden = cronologico(evs);
  const i = orden.findIndex((e) => e.id === ev.id);
  for (let k = i - 1; k >= 0; k--) if (valorados(orden[k].notas[jugador]) > 0) return orden[k];
  return null;
}

export interface CambioCriterio {
  criterio: Criterio;
  antes: Nivel;
  ahora: Nivel;
}

/** Criterios valorados en las dos evaluaciones, con su cambio. */
export function cambios(antes: Record<string, Nivel> | undefined, ahora: Record<string, Nivel> | undefined): CambioCriterio[] {
  return CRITERIOS.map((c) => ({ criterio: c, antes: (antes?.[c.id] ?? 0) as Nivel, ahora: (ahora?.[c.id] ?? 0) as Nivel })).filter((x) => x.antes > 0 && x.ahora > 0);
}

export interface Resumen {
  fuertes: Criterio[];
  trabajar: Criterio[];
  mejoras: CambioCriterio[];
}

/**
 * Puntos fuertes (los de nivel más alto, como mucho 3, y solo desde «Lo consigue»), lo que conviene
 * trabajar (los más bajos, como mucho 2, y solo si están por debajo de «Lo consigue») y lo que ha
 * mejorado desde la evaluación anterior. Así una hoja nunca dice que lo flojo es «lo mejor».
 */
export function resumirJugador(ahora: Record<string, Nivel> | undefined, antes?: Record<string, Nivel>): Resumen {
  const vals = CRITERIOS.map((c) => ({ c, n: ahora?.[c.id] ?? 0 })).filter((x) => x.n > 0);
  const fuertes = [...vals].filter((x) => x.n >= 3).sort((a, b) => b.n - a.n).slice(0, 3).map((x) => x.c);
  const trabajar = [...vals].filter((x) => x.n <= 2).sort((a, b) => a.n - b.n).slice(0, 2).map((x) => x.c);
  const mejoras = cambios(antes, ahora).filter((x) => x.ahora > x.antes);
  return { fuertes, trabajar, mejoras };
}

const esObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);

/** Valida lo leído de localStorage. Nunca lanza. */
export function normalizarStoreEvaluacion(raw: unknown): StoreEvaluacion {
  const st: StoreEvaluacion = { v: 1, jugadores: "", evaluaciones: [] };
  if (!esObj(raw)) return st;
  st.jugadores = typeof raw.jugadores === "string" ? raw.jugadores.slice(0, 2000) : "";
  const vistos = new Set<string>();
  for (const re of (Array.isArray(raw.evaluaciones) ? raw.evaluaciones : []).slice(0, LIMITES_EVALUACION.EVALUACIONES)) {
    if (!esObj(re) || typeof re.fecha !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(re.fecha)) continue;
    let id = typeof re.id === "string" && re.id ? re.id.slice(0, 40) : `e${st.evaluaciones.length}`;
    if (vistos.has(id)) id = `${id}-${st.evaluaciones.length}`;
    vistos.add(id);
    const notas: Evaluacion["notas"] = {};
    if (esObj(re.notas))
      for (const [j, ns] of Object.entries(re.notas)) {
        if (!esObj(ns)) continue;
        const fila: Record<string, Nivel> = {};
        for (const [c, n] of Object.entries(ns)) if (IDS.has(c) && Number.isInteger(n) && (n as number) >= 1 && (n as number) <= 4) fila[c] = n as Nivel;
        if (Object.keys(fila).length) notas[j.slice(0, 48)] = fila;
      }
    const comentarios: Record<string, string> = {};
    if (esObj(re.comentarios))
      for (const [j, t] of Object.entries(re.comentarios)) if (typeof t === "string" && t.trim()) comentarios[j.slice(0, 48)] = t.slice(0, LIMITES_EVALUACION.COMENTARIO);
    st.evaluaciones.push({
      id,
      nombre: typeof re.nombre === "string" && re.nombre.trim() ? re.nombre.trim().slice(0, 40) : "Evaluación",
      fecha: re.fecha,
      notas,
      comentarios,
    });
  }
  st.evaluaciones = cronologico(st.evaluaciones);
  return st;
}
