// Plan de partido (/plan-partido). Junta en una hoja lo que el entrenador ya tiene en el navegador:
// las claves y los jugadores del rival (informe del rival, cz.rival.v1), las jugadas elegidas de la
// pizarra (cz.pizarra.v1) y su plantilla (cz.team.v1), más sus objetivos, ataque, defensa,
// emparejamientos y situaciones especiales. Del rival se usa el DORSAL siempre que lo hay: es lo que
// se dice en pista y así el texto para el grupo no lleva nombres de niños del otro equipo.
// Todo vive en cz.planpartido.v1. Lógica pura.

import { informe, type Rival } from "./informeRival";

export interface Emparejamiento {
  rival: string;
  nuestro: string;
  nota: string;
}

export interface PlanPartido {
  id: string;
  rival: string;
  /** id del rival en el informe del rival (para refrescar sus claves), o "" si se escribió a mano */
  rivalId: string;
  fecha: string;
  hora: string;
  lugar: string;
  objetivos: string;
  claves: string;
  ataque: string;
  defensa: string;
  especiales: string;
  emparejamientos: Emparejamiento[];
  /** ids de jugadas de la pizarra */
  jugadas: string[];
}

export interface StorePlan {
  v: 1;
  activo: string;
  planes: PlanPartido[];
}

export const LIMITES_PLAN = { PLANES: 20, TEXTO: 1200, CORTO: 60, EMPAREJAMIENTOS: 12, JUGADAS: 6 } as const;

export function planVacio(id: string): PlanPartido {
  return { id, rival: "", rivalId: "", fecha: "", hora: "", lugar: "", objetivos: "", claves: "", ataque: "", defensa: "", especiales: "", emparejamientos: [], jugadas: [] };
}

/** "#7" si hay dorsal; si no, sus iniciales («P. R.»): el nombre de un niño rival nunca sale tal cual. */
export const etiquetaRival = (nombre: string, dorsal: string) =>
  dorsal
    ? `#${dorsal}`
    : nombre
        .replace(/,/g, " ")
        .split(/\s+/)
        .filter(Boolean)
        .map((p) => `${p[0].toUpperCase()}.`)
        .join(" ");

/** Jugadores del rival ordenados por puntos por partido, con la etiqueta que se usa en el plan. */
export function jugadoresRival(r: Rival): { etiqueta: string; nombre: string; pts: number }[] {
  return informe(r.actas).jugadores.map((j) => ({ etiqueta: etiquetaRival(j.nombre, j.dorsal), nombre: j.nombre, pts: j.pts }));
}

const escRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Claves del informe del rival, una por línea, con cada nombre cambiado por su dorsal
 * («Su anotador principal es #7: …»). Los nombres más largos se sustituyen antes para que
 * «Pau» no se coma un trozo de «Pau Ruiz».
 */
export function clavesDelRival(r: Rival): string {
  const inf = informe(r.actas);
  const js = [...inf.jugadores].sort((a, b) => b.nombre.length - a.nombre.length);
  return inf.claves
    .map((c) => {
      let t = c;
      for (const j of js) t = t.replace(new RegExp(`(^|[^\\p{L}'-])${escRe(j.nombre)}(?![\\p{L}'-])`, "gu"), `$1${etiquetaRival(j.nombre, j.dorsal)}`);
      return t;
    })
    .join("\n");
}

const lineas = (t: string) =>
  t
    .split("\n")
    .map((l) => l.trim().replace(/^[-•*·]\s*/, ""))
    .filter(Boolean);

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
export function fechaLarga(f: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(f);
  if (!m) return "";
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  return `${DIAS[d.getUTCDay()]} ${+m[3]} de ${MESES[+m[2] - 1]}`;
}

/** Secciones del plan con contenido, en el orden de la hoja (para imprimir y para el texto). */
export function secciones(p: PlanPartido, nombresJugadas: string[] = []): { titulo: string; items: string[] }[] {
  const out: { titulo: string; items: string[] }[] = [];
  const add = (titulo: string, items: string[]) => items.length && out.push({ titulo, items });
  add("Objetivos", lineas(p.objetivos));
  add("Claves del rival", lineas(p.claves));
  add("En ataque", lineas(p.ataque));
  add("En defensa", lineas(p.defensa));
  add(
    "Emparejamientos",
    p.emparejamientos.filter((e) => e.rival.trim() && e.nuestro.trim()).map((e) => `${e.nuestro.trim()} → ${e.rival.trim()}${e.nota.trim() ? ` (${e.nota.trim()})` : ""}`)
  );
  add("Jugadas", nombresJugadas);
  add("Situaciones especiales", lineas(p.especiales));
  return out;
}

export const cabecera = (p: PlanPartido) =>
  [p.rival.trim() ? `vs ${p.rival.trim()}` : "", fechaLarga(p.fecha), p.hora ? `a las ${p.hora}` : "", p.lugar.trim()].filter(Boolean).join(" · ");

/** Texto para el grupo del equipo (WhatsApp): negritas con *asteriscos* y viñetas. */
export function textoParaEquipo(p: PlanPartido, nombresJugadas: string[] = []): string {
  const out = ["🏀 *Plan de partido*"];
  const cab = cabecera(p);
  if (cab) out.push(cab);
  for (const s of secciones(p, nombresJugadas)) out.push("", `*${s.titulo}:*`, ...s.items.map((i) => `• ${i}`));
  return out.join("\n");
}

const esObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");

/** Valida lo leído de localStorage. Nunca lanza. */
export function normalizarStorePlan(raw: unknown): StorePlan {
  const st: StorePlan = { v: 1, activo: "", planes: [] };
  if (!esObj(raw)) return st;
  const ids = new Set<string>();
  for (const rp of (Array.isArray(raw.planes) ? raw.planes : []).slice(0, LIMITES_PLAN.PLANES)) {
    if (!esObj(rp)) continue;
    let id = str(rp.id, 40) || `p${st.planes.length}`;
    if (ids.has(id)) id = `${id}-${st.planes.length}`;
    ids.add(id);
    const C = LIMITES_PLAN.CORTO;
    const T = LIMITES_PLAN.TEXTO;
    st.planes.push({
      id,
      rival: str(rp.rival, C),
      rivalId: str(rp.rivalId, 40),
      fecha: typeof rp.fecha === "string" && /^\d{4}-\d{2}-\d{2}$/.test(rp.fecha) ? rp.fecha : "",
      hora: typeof rp.hora === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(rp.hora) ? rp.hora : "",
      lugar: str(rp.lugar, C),
      objetivos: str(rp.objetivos, T),
      claves: str(rp.claves, T),
      ataque: str(rp.ataque, T),
      defensa: str(rp.defensa, T),
      especiales: str(rp.especiales, T),
      emparejamientos: (Array.isArray(rp.emparejamientos) ? rp.emparejamientos : [])
        .filter(esObj)
        .slice(0, LIMITES_PLAN.EMPAREJAMIENTOS)
        .map((e) => ({ rival: str(e.rival, C), nuestro: str(e.nuestro, C), nota: str(e.nota, C) })),
      jugadas: (Array.isArray(rp.jugadas) ? rp.jugadas : []).filter((x): x is string => typeof x === "string").slice(0, LIMITES_PLAN.JUGADAS),
    });
  }
  st.activo = typeof raw.activo === "string" && st.planes.some((p) => p.id === raw.activo) ? raw.activo : st.planes[0]?.id ?? "";
  return st;
}
