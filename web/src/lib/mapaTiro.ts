// Mapa de tiro (/tiro): el entrenador marca en la media pista dónde se tira y si entra.
// Lógica pura: geometría FIBA (triple a 6,75 m y esquinas a 0,90 m de la banda; en
// minibasket no hay triple), zonas de tiro, resúmenes y validación de lo guardado.
// Coordenadas CANÓNICAS de la pizarra: metros, canasta en x = 1,575, y = 7,5.

import { CANCHA, MINIBASKET, limpiaTexto, uid, type Pista, type Pt } from "./pizarra";

export type ZonaTiro = "pintura" | "media" | "esquina" | "triple";

export const ZONAS_TIRO: { id: ZonaTiro; nombre: string }[] = [
  { id: "pintura", nombre: "Zona" },
  { id: "media", nombre: "Media distancia" },
  { id: "esquina", nombre: "Triple de esquina" },
  { id: "triple", nombre: "Triple frontal" },
];

const ARO: Pt = { x: CANCHA.ARO_X, y: CANCHA.ANCHO / 2 };
const RADIO_TRIPLE = 6.75;
const BANDA_TRIPLE = 0.9;
/** Donde la recta de la esquina se une al arco (≈ 2,99 m de la línea de fondo). */
const FIN_ESQUINA = CANCHA.ARO_X + Math.sqrt(RADIO_TRIPLE ** 2 - (CANCHA.ANCHO / 2 - BANDA_TRIPLE) ** 2);

export const LIMITES_TIRO = { PARTIDOS: 60, TIROS: 400, RIVAL: 40, JUGADORES_TEXTO: 1200 } as const;

export function esTriple(p: Pt, pista: Pista): boolean {
  if (pista === "mini") return false;
  if (p.y < BANDA_TRIPLE || p.y > CANCHA.ANCHO - BANDA_TRIPLE) return true;
  return Math.hypot(p.x - ARO.x, p.y - ARO.y) > RADIO_TRIPLE;
}

export function zonaDe(p: Pt, pista: Pista): ZonaTiro {
  const largoZona = pista === "mini" ? MINIBASKET.ZONA_LARGO : 5.8;
  if (p.x <= largoZona && p.y >= 5.05 && p.y <= 9.95) return "pintura";
  if (!esTriple(p, pista)) return "media";
  return p.x <= FIN_ESQUINA ? "esquina" : "triple";
}

export interface Tiro {
  id: string;
  /** Jugador (texto de su línea en la plantilla); "" = sin asignar. */
  j: string;
  x: number;
  y: number;
  ok: boolean;
}

export interface PartidoTiro {
  id: string;
  fecha: string;
  rival: string;
  pista: Pista;
  tiros: Tiro[];
}

export interface StoreTiro {
  v: 1;
  jugadores: string;
  activo: string;
  partidos: PartidoTiro[];
}

export interface Contador {
  intentos: number;
  anotados: number;
}

export interface Resumen {
  t2: Contador;
  t3: Contador;
  puntos: number;
  porZona: Record<ZonaTiro, Contador>;
}

const vacio = (): Contador => ({ intentos: 0, anotados: 0 });

export function resumir(tiros: { tiro: Tiro; pista: Pista }[]): Resumen {
  const r: Resumen = { t2: vacio(), t3: vacio(), puntos: 0, porZona: { pintura: vacio(), media: vacio(), esquina: vacio(), triple: vacio() } };
  for (const { tiro, pista } of tiros) {
    const triple = esTriple(tiro, pista);
    const c = triple ? r.t3 : r.t2;
    const z = r.porZona[zonaDe(tiro, pista)];
    c.intentos++;
    z.intentos++;
    if (tiro.ok) {
      c.anotados++;
      z.anotados++;
      r.puntos += triple ? 3 : 2;
    }
  }
  return r;
}

/** Porcentaje entero o null si no hay intentos. */
export const pct = (c: Contador): number | null => (c.intentos ? Math.round((100 * c.anotados) / c.intentos) : null);

/** Tiros de campo totales y eFG% (los triples valen 1,5). */
export function campo(r: Resumen): { tc: Contador; efg: number | null } {
  const tc = { intentos: r.t2.intentos + r.t3.intentos, anotados: r.t2.anotados + r.t3.anotados };
  return { tc, efg: tc.intentos ? Math.round((100 * (tc.anotados + 0.5 * r.t3.anotados)) / tc.intentos) : null };
}

/** Media pista con un margen para tiros desde detrás de la línea de fondo o de banda. */
export function limitarPunto(p: Pt): Pt {
  const c = (v: number, a: number, b: number) => Math.min(b, Math.max(a, Math.round(v * 100) / 100));
  return { x: c(p.x, 0, CANCHA.MEDIA), y: c(p.y, 0, CANCHA.ANCHO) };
}

export function nuevoPartido(rival: string, fecha: string, pista: Pista): PartidoTiro {
  return { id: uid(), fecha, rival: limpiaTexto(rival, LIMITES_TIRO.RIVAL).trim(), pista, tiros: [] };
}

const esObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const num = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) ? v : null);

/** Valida lo leído de localStorage. Nunca lanza; lo que no es válido se descarta. */
export function normalizarStore(raw: unknown): StoreTiro {
  const st: StoreTiro = { v: 1, jugadores: "", activo: "", partidos: [] };
  if (!esObj(raw)) return st;
  st.jugadores = limpiaTexto(raw.jugadores, LIMITES_TIRO.JUGADORES_TEXTO);
  const partidos = Array.isArray(raw.partidos) ? raw.partidos : [];
  for (const rp of partidos.slice(0, LIMITES_TIRO.PARTIDOS)) {
    if (!esObj(rp) || typeof rp.id !== "string" || !rp.id) continue;
    const p: PartidoTiro = {
      id: rp.id.slice(0, 40),
      fecha: typeof rp.fecha === "string" && /^\d{4}-\d{2}-\d{2}$/.test(rp.fecha) ? rp.fecha : "",
      rival: limpiaTexto(rp.rival, LIMITES_TIRO.RIVAL),
      pista: rp.pista === "mini" ? "mini" : "fiba",
      tiros: [],
    };
    for (const rt of (Array.isArray(rp.tiros) ? rp.tiros : []).slice(0, LIMITES_TIRO.TIROS)) {
      if (!esObj(rt)) continue;
      const x = num(rt.x);
      const y = num(rt.y);
      if (x === null || y === null) continue;
      p.tiros.push({ id: typeof rt.id === "string" && rt.id ? rt.id.slice(0, 40) : uid(), j: limpiaTexto(rt.j, 40), ...limitarPunto({ x, y }), ok: rt.ok === true });
    }
    st.partidos.push(p);
  }
  st.activo = typeof raw.activo === "string" && st.partidos.some((p) => p.id === raw.activo) ? raw.activo : (st.partidos[0]?.id ?? "");
  return st;
}
