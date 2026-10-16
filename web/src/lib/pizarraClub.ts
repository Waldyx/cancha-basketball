// Biblioteca del club: el coordinador comparte un paquete con nombre de club (sus jugadas y
// sus sesiones) por enlace o archivo, y cada entrenador lo guarda en su pizarra. Al recibir
// una versión nueva del MISMO club se sustituye la anterior, sin tocar lo que el entrenador
// tenga suyo. No hay servidor: el paquete viaja dentro del enlace (hash) o del archivo.
// Lógica pura, sin DOM.

import { LIMITES, compactar, descompactar, desempaquetarEnlace, empaquetarEnlace, limpiaTexto, type Jugada } from "./pizarra";
import { LIMITES_SESION, compactarSesion, normalizarSesion, type Sesion } from "./pizarraSesion";

export const CLAVE_CLUB = "cz.pizarra.club.v1";
export const LIMITE_NOMBRE_CLUB = 60;

export interface PaqueteClub {
  club: string;
  /** AAAA-MM-DD de la versión. */
  fecha: string;
  jugadas: Jugada[];
  sesiones: Sesion[];
}

/** Lo que el entrenador guarda para poder sustituir la versión anterior del club. */
export interface EstadoClub {
  club: string;
  fecha: string;
  jugadaIds: string[];
  sesionIds: string[];
}

const esObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
const FECHA = /^\d{4}-\d{2}-\d{2}$/;

export const nombreClub = (v: unknown): string => limpiaTexto(v, LIMITE_NOMBRE_CLUB).trim();
/** Mismo club aunque cambien mayúsculas, tildes o espacios. */
export const mismoClub = (a: string, b: string): boolean => {
  const n = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
  return n(a) !== "" && n(a) === n(b);
};

/** Forma compacta: { c: club, f: fecha, j: jugadas compactas, s: sesiones compactas (bloques apuntan al índice en j) }. */
export function compactarPaquete(p: PaqueteClub): Record<string, unknown> {
  return { c: p.club, f: p.fecha, j: p.jugadas.map(compactar), s: p.sesiones.map((s) => compactarSesion(s, p.jugadas)) };
}

/** Inverso de `compactarPaquete`. Las jugadas reciben ids nuevos y las sesiones apuntan a ellos. */
export function descompactarPaquete(raw: unknown): PaqueteClub {
  if (!esObj(raw)) throw new Error("Contenido no válido");
  const club = nombreClub(raw.c);
  if (!club) throw new Error("Al paquete le falta el nombre del club");
  const jugadas: Jugada[] = [];
  const mapa = new Map<number, string>();
  arr(raw.j)
    .slice(0, LIMITES.BIBLIOTECA)
    .forEach((rj, i) => {
      const j = descompactar(rj);
      if (j) {
        jugadas.push(j);
        mapa.set(i, j.id);
      }
    });
  const sesiones: Sesion[] = [];
  for (const rs of arr(raw.s).slice(0, LIMITES_SESION.SESIONES)) {
    const [titulo, fecha, hora, equipo, objetivo, bloques] = arr(rs);
    const s = normalizarSesion({
      titulo,
      fecha,
      hora,
      equipo,
      objetivo,
      bloques: arr(bloques).map((b) => {
        const [t, tit, min, notas, material, i] = arr(b);
        const jugadaId = typeof i === "number" ? mapa.get(i) : undefined;
        return jugadaId && t === 0 ? { tipo: "jugada", jugadaId, titulo: tit, minutos: min, notas, material } : { tipo: "texto", titulo: tit, minutos: min, notas, material };
      }),
    });
    if (s) sesiones.push(s);
  }
  if (!jugadas.length && !sesiones.length) throw new Error("El paquete del club está vacío");
  return { club, fecha: typeof raw.f === "string" && FECHA.test(raw.f) ? raw.f : "", jugadas, sesiones };
}

export async function codificarPaqueteClub(p: PaqueteClub, opciones: { comprimir?: boolean } = {}): Promise<string> {
  return empaquetarEnlace(compactarPaquete(p), "c", opciones);
}

export async function decodificarPaqueteClub(texto: string): Promise<PaqueteClub> {
  const { tipo, raw } = await desempaquetarEnlace(texto);
  if (tipo !== "c") throw new Error("No es el enlace de una biblioteca de club");
  return descompactarPaquete(raw);
}

/** Paquete dentro de un archivo .json de la pizarra (campo `club`); null si el archivo no es de club. */
export function paqueteDeArchivo(raw: unknown): PaqueteClub | null {
  if (!esObj(raw) || !esObj(raw.club)) return null;
  try {
    return descompactarPaquete(raw.club);
  } catch {
    return null;
  }
}

export function leerEstadoClub(texto: string | null): EstadoClub | null {
  if (!texto) return null;
  try {
    const raw = JSON.parse(texto) as unknown;
    if (!esObj(raw)) return null;
    const club = nombreClub(raw.club);
    if (!club) return null;
    const ids = (v: unknown) => arr(v).filter((x): x is string => typeof x === "string" && x.length > 0 && x.length < 80);
    return { club, fecha: typeof raw.fecha === "string" && FECHA.test(raw.fecha) ? raw.fecha : "", jugadaIds: ids(raw.jugadaIds), sesionIds: ids(raw.sesionIds) };
  } catch {
    return null;
  }
}

/**
 * Qué hacer al guardar un paquete: si es del mismo club que el guardado, se quitan las jugadas y
 * sesiones de la versión anterior. Si es de otro club, no se quita nada (lo anterior se queda
 * como contenido propio del entrenador).
 */
export function planActualizacion(estado: EstadoClub | null, paquete: Pick<PaqueteClub, "club">): { sustituye: boolean; quitarJugadas: Set<string>; quitarSesiones: Set<string> } {
  const sustituye = !!estado && mismoClub(estado.club, paquete.club);
  return {
    sustituye,
    quitarJugadas: new Set(sustituye ? estado!.jugadaIds : []),
    quitarSesiones: new Set(sustituye ? estado!.sesionIds : []),
  };
}
