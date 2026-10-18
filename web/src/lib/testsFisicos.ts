// Tests físicos (/tests-fisicos). El entrenador pasa una batería sencilla dos o tres veces por
// temporada (estación por estación) y ve cómo evoluciona cada jugador. Sin rankings entre niños:
// cada uno se compara consigo mismo y, como mucho, con la media del grupo. Todo vive en su
// navegador (cz.tests.v1). Lógica pura.

import { lineasPlantilla } from "./plantillaTexto";

export interface Prueba {
  id: string;
  nombre: string;
  unidad: string;
  /** "menos" = un número más bajo es mejor (tiempos) */
  mejor: "mas" | "menos";
  min: number;
  max: number;
  decimales: number;
  como: string;
}

export const PRUEBAS: readonly Prueba[] = [
  { id: "v20", nombre: "Velocidad 20 m", unidad: "s", mejor: "menos", min: 2, max: 8, decimales: 2, como: "Salida parada a 0,5 m de la línea. El mejor de dos intentos." },
  { id: "ag5105", nombre: "Agilidad 5-10-5", unidad: "s", mejor: "menos", min: 3.5, max: 10, decimales: 2, como: "Desde el centro: 5 m a un lado, 10 m al otro y 5 m de vuelta, tocando cada línea. El mejor de dos." },
  { id: "salto", nombre: "Salto vertical", unidad: "cm", mejor: "mas", min: 5, max: 120, decimales: 0, como: "Marca de pie con el brazo estirado y marca en el salto (contra la pared). La diferencia. El mejor de tres." },
  { id: "horizontal", nombre: "Salto horizontal", unidad: "cm", mejor: "mas", min: 30, max: 350, decimales: 0, como: "Pies juntos, sin carrerilla, hasta el talón más atrasado. El mejor de dos." },
  { id: "navette", nombre: "Course Navette", unidad: "palier", mejor: "mas", min: 0.5, max: 21, decimales: 1, como: "20 m ida y vuelta al ritmo de la grabación (empieza a 8,5 km/h y sube 0,5 cada minuto). Se anota el último palier completado; medio palier = ,5." },
  { id: "medicinal", nombre: "Lanzamiento de balón medicinal", unidad: "m", mejor: "mas", min: 0.5, max: 25, decimales: 1, como: "Sentado o de pie, a dos manos desde el pecho. Mismo peso de balón siempre (anótalo en la sesión). El mejor de dos." },
];

const POR_ID = new Map(PRUEBAS.map((p) => [p.id, p]));
export const prueba = (id: string) => POR_ID.get(id);

export interface SesionTests {
  id: string;
  nombre: string;
  fecha: string; // AAAA-MM-DD
  /** edad media del grupo, para estimar el VO2máx de la Course Navette */
  edad: number | null;
  nota: string;
  /** jugador → prueba → marca */
  marcas: Record<string, Record<string, number>>;
}

export interface StoreTests {
  v: 1;
  jugadores: string;
  sesiones: SesionTests[];
}

export const LIMITES_TESTS = { SESIONES: 20, JUGADORES: 30 } as const;

export const plantilla = (texto: string) => lineasPlantilla(texto, LIMITES_TESTS.JUGADORES, 40);

/** "7,35" o "7.35" → 7.35 redondeado a los decimales de la prueba; null si no es un número del rango. */
export function leerMarca(p: Prueba, texto: string): number | null {
  const t = texto.trim().replace(",", ".");
  if (!/^\d+(\.\d+)?$/.test(t)) return null;
  const v = Math.round(+t * 10 ** p.decimales) / 10 ** p.decimales;
  return v >= p.min && v <= p.max ? v : null;
}

export const formatoMarca = (p: Prueba, v: number) => v.toLocaleString("es-ES", { minimumFractionDigits: p.decimales, maximumFractionDigits: p.decimales });

/** Velocidad del palier n de la Course Navette (Léger, 1988): 8,5 km/h el primero y +0,5 cada minuto. */
export const velocidadNavette = (palier: number) => 8 + 0.5 * palier;

/**
 * VO2máx estimado (ml/kg/min) con las ecuaciones de Léger et al. (1988): de 6 a 18 años la que usa
 * la edad; a partir de 18, la de adultos. Es una ESTIMACIÓN de campo, no una medida.
 */
export function vo2Navette(palier: number, edad: number | null): number | null {
  if (!edad || edad < 6 || palier <= 0) return null;
  const s = velocidadNavette(palier);
  const v = edad >= 18 ? -24.4 + 6 * s : 31.025 + 3.238 * s - 3.248 * edad + 0.1536 * s * edad;
  return Math.round(v * 10) / 10;
}

export const cronologico = (ss: SesionTests[]) => [...ss].sort((a, b) => a.fecha.localeCompare(b.fecha) || a.id.localeCompare(b.id));

/** La sesión anterior a `s` en la que este jugador tiene marca en esa prueba. */
export function marcaAnterior(ss: SesionTests[], s: SesionTests, jugador: string, pruebaId: string): { sesion: SesionTests; valor: number } | null {
  const orden = cronologico(ss);
  for (let k = orden.findIndex((x) => x.id === s.id) - 1; k >= 0; k--) {
    const v = orden[k].marcas[jugador]?.[pruebaId];
    if (v !== undefined) return { sesion: orden[k], valor: v };
  }
  return null;
}

/** +1 si ha mejorado, -1 si ha empeorado, 0 si igual (según si en esa prueba es mejor más o menos). */
export function sentido(p: Prueba, antes: number, ahora: number): -1 | 0 | 1 {
  if (ahora === antes) return 0;
  return (ahora > antes) === (p.mejor === "mas") ? 1 : -1;
}

/** Media del grupo en una prueba (null sin marcas). */
export function mediaGrupo(s: SesionTests, pruebaId: string, jugadores: string[]): number | null {
  const vs = jugadores.map((j) => s.marcas[j]?.[pruebaId]).filter((v): v is number => v !== undefined);
  if (!vs.length) return null;
  const p = prueba(pruebaId)!;
  return Math.round((vs.reduce((a, b) => a + b, 0) / vs.length) * 10 ** p.decimales) / 10 ** p.decimales;
}

/** Serie de un jugador en una prueba, sesión a sesión (solo las que tienen marca). */
export function serie(ss: SesionTests[], jugador: string, pruebaId: string): { sesion: SesionTests; valor: number }[] {
  return cronologico(ss)
    .filter((s) => s.marcas[jugador]?.[pruebaId] !== undefined)
    .map((s) => ({ sesion: s, valor: s.marcas[jugador][pruebaId] }));
}

const campoCsv = (v: string) => {
  const s = /^[=+\-@]/.test(v) ? `'${v}` : v;
  return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

/** CSV de una sesión: una fila por jugador, una columna por prueba (separador ; y coma decimal, para Excel en español). */
export function aCsv(s: SesionTests, jugadores: string[]): string {
  const cab = ["Jugador", ...PRUEBAS.map((p) => `${p.nombre} (${p.unidad})`)];
  const filas = jugadores.map((j) => [j, ...PRUEBAS.map((p) => (s.marcas[j]?.[p.id] === undefined ? "" : formatoMarca(p, s.marcas[j][p.id])))]);
  return [cab, ...filas].map((f) => f.map(campoCsv).join(";")).join("\n");
}

const esObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);

/** Valida lo leído de localStorage. Nunca lanza. */
export function normalizarStoreTests(raw: unknown): StoreTests {
  const st: StoreTests = { v: 1, jugadores: "", sesiones: [] };
  if (!esObj(raw)) return st;
  st.jugadores = typeof raw.jugadores === "string" ? raw.jugadores.slice(0, 2000) : "";
  const ids = new Set<string>();
  for (const rs of (Array.isArray(raw.sesiones) ? raw.sesiones : []).slice(0, LIMITES_TESTS.SESIONES)) {
    if (!esObj(rs) || typeof rs.fecha !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(rs.fecha)) continue;
    let id = typeof rs.id === "string" && rs.id ? rs.id.slice(0, 40) : `t${st.sesiones.length}`;
    if (ids.has(id)) id = `${id}-${st.sesiones.length}`;
    ids.add(id);
    const marcas: SesionTests["marcas"] = {};
    if (esObj(rs.marcas))
      for (const [j, ms] of Object.entries(rs.marcas)) {
        if (!esObj(ms)) continue;
        const fila: Record<string, number> = {};
        for (const [pid, v] of Object.entries(ms)) {
          const p = prueba(pid);
          if (p && typeof v === "number" && Number.isFinite(v) && v >= p.min && v <= p.max) fila[pid] = v;
        }
        if (Object.keys(fila).length) marcas[j.slice(0, 40)] = fila;
      }
    const edad = typeof rs.edad === "number" && rs.edad >= 6 && rs.edad <= 60 ? Math.round(rs.edad) : null;
    st.sesiones.push({
      id,
      nombre: typeof rs.nombre === "string" && rs.nombre.trim() ? rs.nombre.trim().slice(0, 40) : "Tests",
      fecha: rs.fecha,
      edad,
      nota: typeof rs.nota === "string" ? rs.nota.slice(0, 200) : "",
      marcas,
    });
  }
  st.sesiones = cronologico(st.sesiones);
  return st;
}
