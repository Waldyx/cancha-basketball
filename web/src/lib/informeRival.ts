// Informe del rival (/rival): se juntan las actas de varios partidos de un equipo rival
// (importadas de la FEB o pegadas, p. ej. de la FCBQ) y salen sus medias por jugador y unas
// pistas automáticas para preparar el partido. Lógica pura; las fórmulas son las del modo
// Equipo de /estadisticas (calcLinea), así que los números cuadran entre las dos páginas.

import { LINEA_KEYS, calcLinea, jugo, lineaVacia, mismoNombre, normDorsal, normNombre, sumaLineas, uid, type Linea } from "./statsEquipo";

export interface JugadorActa extends Linea {
  nombre: string;
  dorsal: string;
}

export interface ActaRival {
  id: string;
  fecha: string;
  /** Contra quién jugó el rival en ese partido. */
  contra: string;
  ptsRival: number | null;
  ptsContra: number | null;
  origen: "feb" | "pegado";
  jugadores: JugadorActa[];
}

export interface Rival {
  id: string;
  nombre: string;
  actas: ActaRival[];
}

export interface StoreRival {
  v: 1;
  activo: string;
  rivales: Rival[];
}

export const LIMITES_RIVAL = { RIVALES: 30, ACTAS: 30, JUGADORES: 20, TEXTO: 60 } as const;

/** Respuesta de /api/feb (lo que nos importa). */
export interface ActaFeb {
  partido?: string;
  fecha?: string;
  /** false mientras el partido se está jugando: su acta todavía cambia. */
  finalizado?: boolean;
  equipos: { nombre: string; pts: number; jugadores: JugadorActa[] }[];
}

/** Índice del equipo rival dentro de un acta de la FEB, o -1 si ninguno encaja con el nombre. */
export function equipoDelRival(acta: ActaFeb, nombre: string): number {
  const n = normNombre(nombre);
  if (!n) return -1;
  const encaja = acta.equipos.map((e) => {
    const en = normNombre(e.nombre);
    return en === n || en.includes(n) || n.includes(en) || mismoNombre(e.nombre, nombre);
  });
  // solo si es inequívoco
  return encaja.filter(Boolean).length === 1 ? encaja.indexOf(true) : -1;
}

export function actaDeFeb(acta: ActaFeb, indice: number): ActaRival {
  const e = acta.equipos[indice];
  const otro = acta.equipos[1 - indice];
  return {
    id: acta.partido ? `feb-${acta.partido}` : uid(),
    fecha: acta.fecha ?? "",
    contra: otro?.nombre ?? "",
    ptsRival: e.pts || null,
    ptsContra: otro?.pts || null,
    origen: "feb",
    jugadores: e.jugadores.filter(jugo),
  };
}

export function actaPegada(jugadores: JugadorActa[], datos: { fecha: string; contra: string; ptsRival: number | null; ptsContra: number | null }): ActaRival {
  return { id: uid(), ...datos, origen: "pegado", jugadores: jugadores.filter(jugo) };
}

export interface FilaRival {
  nombre: string;
  dorsal: string;
  pj: number;
  total: Linea;
  /** Medias por partido jugado. */
  pts: number;
  min: number;
  reb: number;
  ast: number;
  fal: number;
  t3i: number;
  tli: number;
  pct2: number | null;
  pct3: number | null;
  pctTl: number | null;
}

export interface Informe {
  partidos: number;
  victorias: number;
  derrotas: number;
  ptsFavor: number | null;
  ptsContra: number | null;
  equipo: { pct2: number | null; pct3: number | null; pctTl: number | null; t3i: number; per: number; fal: number; ro: number; shareTriple: number | null };
  jugadores: FilaRival[];
  claves: string[];
}

const pct = (c: number, i: number) => (i > 0 ? Math.round((100 * c) / i) : null);
const r1 = (v: number) => Math.round(v * 10) / 10;

export function informe(actas: ActaRival[]): Informe {
  // jugadores: se juntan por nombre (mismo nombre aunque cambien tildes o el orden) y, si no, por dorsal + apellido
  const filas: { nombre: string; dorsal: string; lineas: Linea[] }[] = [];
  for (const a of actas) {
    for (const j of a.jugadores) {
      let f = filas.find((x) => mismoNombre(x.nombre, j.nombre) || normNombre(x.nombre) === normNombre(j.nombre));
      if (!f) {
        f = { nombre: j.nombre, dorsal: normDorsal(j.dorsal), lineas: [] };
        filas.push(f);
      }
      const l = lineaVacia();
      for (const k of LINEA_KEYS) l[k] = j[k] || 0;
      f.lineas.push(l);
      if (!f.dorsal) f.dorsal = normDorsal(j.dorsal);
    }
  }
  const jugadores: FilaRival[] = filas.map((f) => {
    const t = sumaLineas(f.lineas);
    const pj = f.lineas.length;
    const c = calcLinea(t);
    return {
      nombre: f.nombre,
      dorsal: f.dorsal,
      pj,
      total: t,
      pts: r1(c.pts / pj),
      min: r1(t.min / pj),
      reb: r1(c.reb / pj),
      ast: r1(t.ast / pj),
      fal: r1(t.fal / pj),
      t3i: r1(t.t3i / pj),
      tli: r1(t.tli / pj),
      pct2: pct(t.t2c, t.t2i),
      pct3: pct(t.t3c, t.t3i),
      pctTl: pct(t.tlc, t.tli),
    };
  });
  jugadores.sort((a, b) => b.pts - a.pts || b.pj - a.pj);

  const n = actas.length;
  const total = sumaLineas(actas.flatMap((a) => a.jugadores));
  const conMarcador = actas.filter((a) => a.ptsRival !== null && a.ptsContra !== null);
  const victorias = conMarcador.filter((a) => a.ptsRival! > a.ptsContra!).length;
  const derrotas = conMarcador.filter((a) => a.ptsRival! < a.ptsContra!).length;
  const ptsTot = calcLinea(total).pts;
  const equipo = {
    pct2: pct(total.t2c, total.t2i),
    pct3: pct(total.t3c, total.t3i),
    pctTl: pct(total.tlc, total.tli),
    t3i: n ? r1(total.t3i / n) : 0,
    per: n ? r1(total.per / n) : 0,
    fal: n ? r1(total.fal / n) : 0,
    ro: n ? r1(total.ro / n) : 0,
    shareTriple: ptsTot > 0 ? Math.round((100 * 3 * total.t3c) / ptsTot) : null,
  };

  return {
    partidos: n,
    victorias,
    derrotas,
    ptsFavor: conMarcador.length ? r1(conMarcador.reduce((s, a) => s + a.ptsRival!, 0) / conMarcador.length) : null,
    ptsContra: conMarcador.length ? r1(conMarcador.reduce((s, a) => s + a.ptsContra!, 0) / conMarcador.length) : null,
    equipo,
    jugadores,
    claves: claves(jugadores, equipo, ptsTot, n),
  };
}

/**
 * Pistas automáticas, por reglas sencillas y con umbrales conservadores. Son una ayuda para
 * mirar el informe, no un análisis: la página lo dice.
 */
function claves(js: FilaRival[], eq: Informe["equipo"], ptsTot: number, n: number): string[] {
  const out: string[] = [];
  if (!n || !js.length) return out;
  const fmt = (v: number) => String(v).replace(".", ",");
  const top = js[0];
  if (top.pts > 0 && ptsTot > 0) {
    const cuota = Math.round((100 * top.pts * top.pj) / ptsTot);
    out.push(`Su anotador principal es ${top.nombre}: ${fmt(top.pts)} puntos por partido, el ${cuota} % de los puntos del equipo.`);
  }
  // como mucho dos jugadores por tipo de pista: más que eso deja de ser una pista y pasa a ser ruido
  const top2 = (lista: FilaRival[], clave: (j: FilaRival) => number) => lista.sort((a, b) => clave(b) - clave(a)).slice(0, 2);
  for (const j of top2(js.filter((j) => j.total.t3i >= 4 && j.t3i >= 1.5 && (j.pct3 ?? 0) >= 33), (j) => j.total.t3c))
    out.push(`${j.nombre} tira de tres con acierto (${j.total.t3c}/${j.total.t3i}, ${j.pct3} %): que no reciba solo.`);
  for (const j of top2(js.filter((j) => j.fal >= 3.5), (j) => j.fal))
    out.push(`${j.nombre} se carga de faltas (${fmt(j.fal)} por partido): atacarle puede sacarle del partido.`);
  for (const j of top2(js.filter((j) => j.tli >= 3 && j.pctTl !== null && j.pctTl < 60), (j) => j.tli))
    out.push(`${j.nombre} va mucho a la línea pero falla libres (${j.pctTl} %).`);
  for (const j of top2(js.filter((j) => j.total.ro / j.pj >= 3), (j) => j.total.ro / j.pj))
    out.push(`${j.nombre} coge muchos rebotes ofensivos (${fmt(Math.round((10 * j.total.ro) / j.pj) / 10)} por partido): hay que cerrarle.`);
  if (eq.shareTriple !== null && eq.shareTriple >= 35) out.push(`El ${eq.shareTriple} % de sus puntos llega de tres: defender lejos del aro y salir a los tiradores.`);
  if (eq.pctTl !== null && eq.pctTl < 60) out.push(`Como equipo tiran mal los libres (${eq.pctTl} %).`);
  if (eq.per >= 15) out.push(`Pierden muchos balones (${fmt(eq.per)} por partido): la presión puede rentar.`);
  return out;
}

const esObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const txt = (v: unknown) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, LIMITES_RIVAL.TEXTO);
const ent = (v: unknown) => {
  const x = Math.trunc(Number(v));
  return Number.isFinite(x) && x > 0 ? Math.min(x, 999) : 0;
};
const entONulo = (v: unknown) => (v === null || v === undefined || v === "" ? null : ent(v));

function normalizarJugador(raw: unknown): JugadorActa | null {
  if (!esObj(raw)) return null;
  const nombre = txt(raw.nombre);
  if (!nombre) return null;
  const j = { nombre, dorsal: normDorsal(raw.dorsal), ...lineaVacia() } as JugadorActa;
  for (const k of LINEA_KEYS) j[k] = ent(raw[k]);
  return j;
}

/** Valida lo leído de localStorage. Nunca lanza. */
export function normalizarStoreRival(raw: unknown): StoreRival {
  const st: StoreRival = { v: 1, activo: "", rivales: [] };
  if (!esObj(raw) || !Array.isArray(raw.rivales)) return st;
  for (const rr of raw.rivales.slice(0, LIMITES_RIVAL.RIVALES)) {
    if (!esObj(rr) || typeof rr.id !== "string" || !rr.id) continue;
    const r: Rival = { id: rr.id.slice(0, 40), nombre: txt(rr.nombre) || "Rival", actas: [] };
    for (const ra of (Array.isArray(rr.actas) ? rr.actas : []).slice(0, LIMITES_RIVAL.ACTAS)) {
      if (!esObj(ra)) continue;
      const jugadores = (Array.isArray(ra.jugadores) ? ra.jugadores : []).slice(0, LIMITES_RIVAL.JUGADORES).map(normalizarJugador).filter((j): j is JugadorActa => !!j);
      if (!jugadores.length) continue;
      r.actas.push({
        id: typeof ra.id === "string" && ra.id ? ra.id.slice(0, 40) : uid(),
        fecha: typeof ra.fecha === "string" && /^\d{4}-\d{2}-\d{2}$/.test(ra.fecha) ? ra.fecha : "",
        contra: txt(ra.contra),
        ptsRival: entONulo(ra.ptsRival),
        ptsContra: entONulo(ra.ptsContra),
        origen: ra.origen === "feb" ? "feb" : "pegado",
        jugadores,
      });
    }
    st.rivales.push(r);
  }
  st.activo = typeof raw.activo === "string" && st.rivales.some((r) => r.id === raw.activo) ? raw.activo : (st.rivales[0]?.id ?? "");
  return st;
}
