// Asistencia a los entrenamientos y convocatorias (/asistencia). El entrenador pasa lista en cada
// sesión y prepara el mensaje de la convocatoria para el grupo de WhatsApp. Todo vive en su
// navegador (cz.asistencia.v1); el mensaje solo sale si él lo copia o lo comparte. Lógica pura.

import { lineasPlantilla } from "./plantillaTexto";

export type EstadoAsistencia = "" | "si" | "no" | "just";

export interface Sesion {
  id: string;
  fecha: string;
  /** jugador (texto de su línea en la plantilla) → estado */
  lista: Record<string, EstadoAsistencia>;
}

export interface StoreAsistencia {
  v: 1;
  jugadores: string;
  sesiones: Sesion[];
}

export const LIMITES_ASISTENCIA = { SESIONES: 200, JUGADORES: 30 } as const;
export const SIGUIENTE: Record<EstadoAsistencia, EstadoAsistencia> = { "": "si", si: "no", no: "just", just: "" };

export interface FilaAsistencia {
  jugador: string;
  si: number;
  no: number;
  just: number;
  /** % de asistencia: vino ÷ (vino + faltó). Las faltas justificadas no cuentan en contra (null si no hay datos). */
  pct: number | null;
}

/** Lista de jugadores de la plantilla escrita (una línea por jugador, sin repetir). */
export function plantilla(texto: string): string[] {
  return lineasPlantilla(texto, LIMITES_ASISTENCIA.JUGADORES, 40);
}

export function resumen(jugadores: string[], sesiones: Sesion[]): FilaAsistencia[] {
  return jugadores.map((j) => {
    let si = 0;
    let no = 0;
    let just = 0;
    for (const s of sesiones) {
      const e = s.lista[j];
      if (e === "si") si++;
      else if (e === "no") no++;
      else if (e === "just") just++;
    }
    const cuentan = si + no;
    return { jugador: j, si, no, just, pct: cuentan ? Math.round((100 * si) / cuentan) : null };
  });
}

export interface Convocatoria {
  equipo: string;
  rival: string;
  fecha: string;
  hora: string;
  quedada: string;
  lugar: string;
  equipacion: string;
  notas: string;
  convocados: string[];
}

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

/** "2026-10-18" → "sábado 18 de octubre" (sin depender de la zona horaria). */
export function fechaHumana(f: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(f);
  if (!m) return "";
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  return `${DIAS[d.getUTCDay()]} ${+m[3]} de ${MESES[+m[2] - 1]}`;
}

/** Mensaje listo para pegar en el grupo de WhatsApp de las familias. */
export function textoConvocatoria(c: Convocatoria): string {
  const lineas: string[] = [];
  lineas.push(`🏀 *Convocatoria${c.equipo ? ` ${c.equipo}` : ""}*`);
  const partido = [c.rival ? `vs ${c.rival}` : "", fechaHumana(c.fecha), c.hora ? `a las ${c.hora}` : ""].filter(Boolean).join(" · ");
  if (partido) lineas.push(partido);
  if (c.lugar) lineas.push(`📍 ${c.lugar}`);
  if (c.quedada) lineas.push(`⏰ Quedamos a las ${c.quedada}`);
  if (c.equipacion) lineas.push(`👕 ${c.equipacion}`);
  if (c.convocados.length) {
    lineas.push("", `*Convocados (${c.convocados.length}):*`);
    for (const j of c.convocados) lineas.push(`• ${j}`);
  }
  if (c.notas.trim()) lineas.push("", c.notas.trim());
  return lineas.join("\n");
}

const esObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const ESTADOS = new Set(["si", "no", "just"]);

/** Valida lo leído de localStorage. Nunca lanza. */
export function normalizarStoreAsistencia(raw: unknown): StoreAsistencia {
  const st: StoreAsistencia = { v: 1, jugadores: "", sesiones: [] };
  if (!esObj(raw)) return st;
  st.jugadores = typeof raw.jugadores === "string" ? raw.jugadores.slice(0, 2000) : "";
  for (const rs of (Array.isArray(raw.sesiones) ? raw.sesiones : []).slice(0, LIMITES_ASISTENCIA.SESIONES)) {
    if (!esObj(rs) || typeof rs.fecha !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(rs.fecha)) continue;
    const lista: Record<string, EstadoAsistencia> = {};
    if (esObj(rs.lista)) for (const [k, v] of Object.entries(rs.lista)) if (typeof v === "string" && ESTADOS.has(v)) lista[k.slice(0, 48)] = v as EstadoAsistencia;
    st.sesiones.push({ id: typeof rs.id === "string" && rs.id ? rs.id.slice(0, 40) : `s${st.sesiones.length}`, fecha: rs.fecha, lista });
  }
  st.sesiones.sort((a, b) => b.fecha.localeCompare(a.fecha));
  return st;
}
