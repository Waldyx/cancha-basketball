// Sesiones de entrenamiento de la pizarra: un plan con título, fecha, equipo, objetivo y
// una lista ordenada de bloques (un ejercicio o jugada de la biblioteca, o un bloque de
// texto libre como "Calentamiento"). Lógica pura, sin DOM: se prueba en Node.
// Todo lo que venga de un enlace, un archivo o localStorage pasa por `normalizarSesion`.

import {
  LIMITES,
  clamp,
  clonar,
  compactar,
  descompactar,
  desempaquetarEnlace,
  empaquetarEnlace,
  limpiaTexto,
  uid,
  type Jugada,
} from "./pizarra";

export const LIMITES_SESION = {
  BLOQUES: 40,
  SESIONES: 100,
  TITULO: 80,
  EQUIPO: 40,
  OBJETIVO: 400,
  NOTAS: 600,
  MATERIAL: 200,
  MIN_BLOQUE: 1,
  MAX_BLOQUE: 240,
  MINUTOS_DEFECTO: 10,
} as const;

export interface Bloque {
  id: string;
  /** "jugada": un ejercicio o jugada de la biblioteca · "texto": bloque libre. */
  tipo: "jugada" | "texto";
  /** Solo "jugada": id de la jugada en la biblioteca. Si se borra, el bloque conserva su título. */
  jugadaId?: string;
  titulo: string;
  minutos: number;
  notas: string;
  material: string;
}

export interface Sesion {
  v: 1;
  id: string;
  titulo: string;
  /** AAAA-MM-DD o vacío. */
  fecha: string;
  /** HH:MM de inicio de la sesión o vacío; sirve para dar la hora de cada bloque. */
  hora: string;
  equipo: string;
  objetivo: string;
  bloques: Bloque[];
  actualizada: number;
}

/** Bloques de texto habituales para añadir con un toque. */
export const BLOQUES_TEXTO_TIPO: { titulo: string; minutos: number }[] = [
  { titulo: "Calentamiento", minutos: 10 },
  { titulo: "Ejercicio de tiro", minutos: 15 },
  { titulo: "Charla técnica", minutos: 5 },
  { titulo: "Partidillo", minutos: 20 },
  { titulo: "Vuelta a la calma y estiramientos", minutos: 5 },
];

export function nuevaSesion(partes: Partial<Sesion> = {}): Sesion {
  return {
    v: 1,
    id: uid(),
    titulo: "Entrenamiento sin título",
    fecha: "",
    hora: "",
    equipo: "",
    objetivo: "",
    bloques: [],
    actualizada: Date.now(),
    ...partes,
  };
}

// ─── bloques ─────────────────────────────────────────────────────────────

const minutosValidos = (m: unknown, defecto: number): number =>
  typeof m === "number" && Number.isFinite(m) ? clamp(Math.round(m), LIMITES_SESION.MIN_BLOQUE, LIMITES_SESION.MAX_BLOQUE) : defecto;

export function anadirBloqueJugada(s: Sesion, j: Pick<Jugada, "id" | "nombre">, minutos: number = LIMITES_SESION.MINUTOS_DEFECTO): Sesion {
  const out = clonar(s);
  if (out.bloques.length >= LIMITES_SESION.BLOQUES) return out;
  out.bloques.push({
    id: uid(),
    tipo: "jugada",
    jugadaId: j.id,
    titulo: limpiaTexto(j.nombre, LIMITES.NOMBRE),
    minutos: minutosValidos(minutos, LIMITES_SESION.MINUTOS_DEFECTO),
    notas: "",
    material: "",
  });
  return out;
}

export function anadirBloqueTexto(s: Sesion, titulo: string, minutos: number = LIMITES_SESION.MINUTOS_DEFECTO): Sesion {
  const out = clonar(s);
  if (out.bloques.length >= LIMITES_SESION.BLOQUES) return out;
  out.bloques.push({
    id: uid(),
    tipo: "texto",
    titulo: limpiaTexto(titulo, LIMITES.NOMBRE).trim() || "Bloque",
    minutos: minutosValidos(minutos, LIMITES_SESION.MINUTOS_DEFECTO),
    notas: "",
    material: "",
  });
  return out;
}

export function quitarBloque(s: Sesion, id: string): Sesion {
  const out = clonar(s);
  out.bloques = out.bloques.filter((b) => b.id !== id);
  return out;
}

export function ajustarBloque(s: Sesion, id: string, cambios: Partial<Pick<Bloque, "titulo" | "minutos" | "notas" | "material">>): Sesion {
  const out = clonar(s);
  const b = out.bloques.find((x) => x.id === id);
  if (!b) return out;
  if (cambios.titulo !== undefined) b.titulo = limpiaTexto(cambios.titulo, LIMITES.NOMBRE).trim() || b.titulo;
  if (cambios.minutos !== undefined) b.minutos = minutosValidos(cambios.minutos, b.minutos);
  if (cambios.notas !== undefined) b.notas = limpiaTexto(cambios.notas, LIMITES_SESION.NOTAS);
  if (cambios.material !== undefined) b.material = limpiaTexto(cambios.material, LIMITES_SESION.MATERIAL);
  return out;
}

/** Mueve el bloque de la posición `desde` a la posición `hasta` (0-based). */
export function moverBloque(s: Sesion, desde: number, hasta: number): Sesion {
  const out = clonar(s);
  const n = out.bloques.length;
  if (desde < 0 || desde >= n) return out;
  const destino = clamp(Math.round(hasta), 0, n - 1);
  const [b] = out.bloques.splice(desde, 1);
  out.bloques.splice(destino, 0, b);
  return out;
}

export const subirBloque = (s: Sesion, i: number): Sesion => moverBloque(s, i, i - 1);
export const bajarBloque = (s: Sesion, i: number): Sesion => moverBloque(s, i, i + 1);

/** Duplica el bloque justo debajo del original. */
export function duplicarBloque(s: Sesion, id: string): Sesion {
  const out = clonar(s);
  const i = out.bloques.findIndex((b) => b.id === id);
  if (i < 0 || out.bloques.length >= LIMITES_SESION.BLOQUES) return out;
  out.bloques.splice(i + 1, 0, { ...clonar(out.bloques[i]), id: uid() });
  return out;
}

// ─── tiempos ─────────────────────────────────────────────────────────────

export const totalMinutos = (s: Sesion): number => s.bloques.reduce((t, b) => t + b.minutos, 0);

/** Minuto (desde el inicio de la sesión) en que empieza cada bloque. */
export function iniciosMinutos(s: Sesion): number[] {
  const out: number[] = [];
  let t = 0;
  for (const b of s.bloques) {
    out.push(t);
    t += b.minutos;
  }
  return out;
}

const HORA = /^([01]\d|2[0-3]):([0-5]\d)$/;

/** Suma `minutos` a una hora "HH:MM" (vuelve a las 00:00 pasada la medianoche). Null si la hora no vale. */
export function sumarMinutos(hora: string, minutos: number): string | null {
  const m = HORA.exec(hora);
  if (!m) return null;
  const total = (Number(m[1]) * 60 + Number(m[2]) + Math.round(minutos)) % 1440;
  const t = (total + 1440) % 1440;
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
}

/** "45 min" · "1 h" · "1 h 30 min". */
export function textoDuracion(min: number): string {
  const m = Math.max(0, Math.round(min));
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r ? `${h} h ${r} min` : `${h} h`;
}

/** Cuándo empieza el bloque `i`: la hora si la sesión tiene, y si no el minuto ("min 25"). */
export function textoInicio(s: Sesion, i: number): string {
  const ini = iniciosMinutos(s)[i] ?? 0;
  return sumarMinutos(s.hora, ini) ?? `min ${ini}`;
}

export function textoFin(s: Sesion): string | null {
  return sumarMinutos(s.hora, totalMinutos(s));
}

/** "2026-10-15" -> "jueves 15 de octubre de 2026" (null si no es una fecha). */
export function fechaLarga(fecha: string): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(fecha);
  if (!m) return null;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  if (Number.isNaN(d.getTime()) || d.getUTCMonth() !== Number(m[2]) - 1) return null;
  return d.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

// ─── validación de entrada NO confiable ──────────────────────────────────

const esObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const ID_VALIDO = /^[A-Za-z0-9_-]{1,12}$/;
const FECHA = /^\d{4}-\d{2}-\d{2}$/;

function normalizaBloque(raw: unknown): Bloque | null {
  if (!esObj(raw)) return null;
  const tipo = raw.tipo === "jugada" ? "jugada" : "texto";
  const titulo = limpiaTexto(raw.titulo, LIMITES.NOMBRE).trim();
  const jugadaId = typeof raw.jugadaId === "string" && ID_VALIDO.test(raw.jugadaId) ? raw.jugadaId : undefined;
  if (tipo === "jugada" && !jugadaId) return null;
  const b: Bloque = {
    id: typeof raw.id === "string" && ID_VALIDO.test(raw.id) ? raw.id : uid(),
    tipo,
    titulo: titulo || (tipo === "jugada" ? "Jugada" : "Bloque"),
    minutos: minutosValidos(raw.minutos, LIMITES_SESION.MINUTOS_DEFECTO),
    notas: limpiaTexto(raw.notas, LIMITES_SESION.NOTAS),
    material: limpiaTexto(raw.material, LIMITES_SESION.MATERIAL),
  };
  if (tipo === "jugada" && jugadaId) b.jugadaId = jugadaId;
  return b;
}

/** Valida y NORMALIZA una sesión venida de un enlace, un archivo o localStorage. */
export function normalizarSesion(raw: unknown): Sesion | null {
  if (!esObj(raw) || !Array.isArray(raw.bloques)) return null;
  const ids = new Set<string>();
  const bloques: Bloque[] = [];
  for (const rb of raw.bloques.slice(0, LIMITES_SESION.BLOQUES)) {
    const b = normalizaBloque(rb);
    if (!b) continue;
    if (ids.has(b.id)) b.id = uid();
    ids.add(b.id);
    bloques.push(b);
  }
  const fecha = typeof raw.fecha === "string" && FECHA.test(raw.fecha) && fechaLarga(raw.fecha) ? raw.fecha : "";
  const hora = typeof raw.hora === "string" && HORA.test(raw.hora) ? raw.hora : "";
  const act = typeof raw.actualizada === "number" && Number.isFinite(raw.actualizada) ? clamp(raw.actualizada, 0, 9e15) : Date.now();
  return {
    v: 1,
    id: typeof raw.id === "string" && ID_VALIDO.test(raw.id) ? raw.id : uid(),
    titulo: limpiaTexto(raw.titulo, LIMITES_SESION.TITULO).trim() || "Entrenamiento sin título",
    fecha,
    hora,
    equipo: limpiaTexto(raw.equipo, LIMITES_SESION.EQUIPO),
    objetivo: limpiaTexto(raw.objetivo, LIMITES_SESION.OBJETIVO),
    bloques,
    actualizada: act,
  };
}

export function normalizarSesiones(raw: unknown): { sesiones: Sesion[]; descartadas: number } {
  const lista = Array.isArray(raw) ? raw : [];
  const sesiones: Sesion[] = [];
  let descartadas = 0;
  const ids = new Set<string>();
  for (const r of lista.slice(0, LIMITES_SESION.SESIONES)) {
    const s = normalizarSesion(r);
    if (!s) {
      descartadas++;
      continue;
    }
    if (ids.has(s.id)) s.id = uid();
    ids.add(s.id);
    sesiones.push(s);
  }
  if (lista.length > LIMITES_SESION.SESIONES) descartadas += lista.length - LIMITES_SESION.SESIONES;
  return { sesiones, descartadas };
}

/** Las sesiones de un archivo de copia (`{ app, jugadas, sesiones }`); vacío si es un libro antiguo. */
export function sesionesDeLibro(raw: unknown): { sesiones: Sesion[]; descartadas: number } {
  return esObj(raw) ? normalizarSesiones(raw.sesiones) : { sesiones: [], descartadas: 0 };
}

/** Jugadas que usa la sesión y siguen existiendo, sin repetir. */
export function jugadasDeSesion(s: Sesion, buscar: (id: string) => Jugada | undefined): Jugada[] {
  const vistos = new Set<string>();
  const out: Jugada[] = [];
  for (const b of s.bloques) {
    if (b.tipo !== "jugada" || !b.jugadaId || vistos.has(b.jugadaId)) continue;
    vistos.add(b.jugadaId);
    const j = buscar(b.jugadaId);
    if (j) out.push(j);
  }
  return out;
}

/**
 * Cambia a qué jugada apunta cada bloque (al importar jugadas cuyo id cambió por chocar con
 * otro). Un bloque cuya jugada no está en el mapa queda igual.
 */
export function remapearJugadas(s: Sesion, mapa: Map<string, string>): Sesion {
  const out = clonar(s);
  for (const b of out.bloques) {
    if (b.tipo === "jugada" && b.jugadaId && mapa.has(b.jugadaId)) b.jugadaId = mapa.get(b.jugadaId);
  }
  return out;
}

/** Copia de la sesión con id nuevo (al guardar una compartida o duplicarla). */
export function copiarSesion(s: Sesion, sufijo = ""): Sesion {
  const out = clonar(s);
  out.id = uid();
  out.titulo = limpiaTexto(out.titulo + sufijo, LIMITES_SESION.TITULO);
  out.actualizada = Date.now();
  for (const b of out.bloques) b.id = uid();
  return out;
}

// ─── enlace compartible ──────────────────────────────────────────────────

/**
 * Sesión compacta: [titulo, fecha, hora, equipo, objetivo, bloques]; bloque = [tipo(0 jugada /
 * 1 texto), titulo, minutos, notas, material, indice en la lista de jugadas del enlace]. Las
 * jugadas viajan aparte con el mismo formato compacto que los enlaces de jugadas. Un bloque cuya
 * jugada ya no existe viaja como bloque de texto con su título.
 */
export function compactarSesion(s: Sesion, jugadas: Jugada[]): unknown[] {
  const idx = new Map(jugadas.map((j, i) => [j.id, i]));
  return [
    s.titulo,
    s.fecha,
    s.hora,
    s.equipo,
    s.objetivo,
    s.bloques.map((b) => {
      const i = b.tipo === "jugada" && b.jugadaId ? idx.get(b.jugadaId) : undefined;
      return [i === undefined ? 1 : 0, b.titulo, b.minutos, b.notas, b.material, i ?? -1];
    }),
  ];
}

export async function codificarEnlaceSesion(s: Sesion, jugadasDeLaBiblioteca: Jugada[], opciones: { comprimir?: boolean } = {}): Promise<string> {
  const usadas = jugadasDeSesion(s, (id) => jugadasDeLaBiblioteca.find((j) => j.id === id));
  return empaquetarEnlace({ s: compactarSesion(s, usadas), j: usadas.map(compactar) }, "s", opciones);
}

export interface CargaSesion {
  sesion: Sesion;
  jugadas: Jugada[];
}

const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);

/** Decodifica el texto del hash de una sesión. Las jugadas reciben ids nuevos y la sesión los usa. */
export async function decodificarEnlaceSesion(texto: string): Promise<CargaSesion> {
  const { tipo, raw } = await desempaquetarEnlace(texto);
  if (tipo !== "s") throw new Error("No es el enlace de una sesión de entrenamiento");
  if (!esObj(raw)) throw new Error("Contenido no válido");
  const jugadas: Jugada[] = [];
  const mapa = new Map<number, string>();
  arr(raw.j)
    .slice(0, LIMITES_SESION.BLOQUES)
    .forEach((rj, i) => {
      const j = descompactar(rj);
      if (j) {
        jugadas.push(j);
        mapa.set(i, j.id);
      }
    });
  if (!Array.isArray(raw.s)) throw new Error("El enlace no contiene una sesión válida");
  const [titulo, fecha, hora, equipo, objetivo, bloques] = arr(raw.s);
  const sesion = normalizarSesion({
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
  if (!sesion) throw new Error("El enlace no contiene una sesión válida");
  return { sesion, jugadas };
}
