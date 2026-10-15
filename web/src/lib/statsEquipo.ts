// Lógica PURA del modo Equipo de /estadisticas (sin DOM): métricas, agregados de temporada,
// líderes, emparejamiento de plantilla, enlaces compartibles (hash de la URL), CSV y texto.
// Nada de esto toca red ni localStorage: la UI vive en src/scripts/statsEquipoUI.ts.

// ───────────────────────── tipos ─────────────────────────

/** Línea estadística de un jugador en un partido (mismos campos que el modo Jugador). */
export interface Linea {
  min: number;
  t2c: number; t2i: number;
  t3c: number; t3i: number;
  tlc: number; tli: number;
  ro: number; rd: number;
  ast: number; rob: number; tap: number;
  per: number; fal: number;
}
export const LINEA_KEYS: (keyof Linea)[] = [
  "min", "t2c", "t2i", "t3c", "t3i", "tlc", "tli", "ro", "rd", "ast", "rob", "tap", "per", "fal",
];

/** Partido en formato del modo Jugador (cz.stats.v1). */
export interface PartidoJugador extends Linea { fecha: string; rival: string; res: string; }

export interface JugadorEq { id: string; dorsal: string; nombre: string; }
export interface LineaEq extends Linea { jid: string; }
export interface PartidoEq {
  id: string;
  fecha: string;       // YYYY-MM-DD
  rival: string;
  competicion: string;
  pf: number | null;   // puntos del equipo (null = suma de las líneas)
  pc: number | null;   // puntos del rival (null = desconocido)
  lineas: LineaEq[];
}
export interface Equipo {
  id: string;
  nombre: string;
  categoria: string;
  jugadores: JugadorEq[];
  partidos: PartidoEq[];
}
export interface EquipoStore { activo: string; equipos: Equipo[]; }

export type Payload =
  | { k: "equipo" | "partido"; equipo: Equipo }
  | { k: "jugador"; nombre: string; partidos: PartidoJugador[] };

export const LIMITE_ENLACE = 8000;
const MAX_JUGADORES = 60, MAX_PARTIDOS = 300, MAX_LINEAS = 60;

// ───────────────────────── utilidades ─────────────────────────

export const uid = (): string =>
  Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);

export const lineaVacia = (): Linea => ({
  min: 0, t2c: 0, t2i: 0, t3c: 0, t3i: 0, tlc: 0, tli: 0, ro: 0, rd: 0, ast: 0, rob: 0, tap: 0, per: 0, fal: 0,
});

/** Sin acentos, minúsculas, sin signos y con espacios colapsados. */
export const normNombre = (s: unknown): string =>
  String(s ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ").trim();

/** "07" → "7"; sin dígitos → "". */
export const normDorsal = (s: unknown): string => {
  const m = String(s ?? "").match(/\d+/);
  return m ? String(parseInt(m[0], 10)) : "";
};

export const fechaCorta = (f: string): string => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(f || "");
  return m ? `${m[3]}/${m[2]}/${m[1]}` : f || "—";
};

const entero = (v: unknown, max: number): number => {
  const x = Math.trunc(Number(v));
  return Number.isFinite(x) && x > 0 ? Math.min(x, max) : 0;
};
const texto = (v: unknown, max: number): string => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, max);

// ───────────────────────── métricas ─────────────────────────

/** TS% = pts / (2·(TCI + 0,44·TLI)). Null sin tiros. */
export const tsPct = (pts: number, fga: number, tli: number): number | null => {
  const tsa = fga + 0.44 * tli;
  return tsa > 0 ? (pts / (2 * tsa)) * 100 : null;
};

/** Las mismas fórmulas que usa el modo Jugador (calcGame delega aquí). */
export const calcLinea = (g: Linea) => {
  const pts = 2 * g.t2c + 3 * g.t3c + g.tlc;
  const fgm = g.t2c + g.t3c, fga = g.t2i + g.t3i;
  const ts = tsPct(pts, fga, g.tli);
  const efg = fga > 0 ? ((fgm + 0.5 * g.t3c) / fga) * 100 : null;
  const reb = g.ro + g.rd;
  const val = pts + reb + g.ast + g.rob + g.tap - (fga - fgm) - (g.tli - g.tlc) - g.per - g.fal;
  return { pts, reb, ts, efg, val };
};

/** ¿Jugó? (minutos o cualquier estadística). Los DNP del acta se descartan. */
export const jugo = (l: Linea): boolean =>
  LINEA_KEYS.some((k) => (l[k] || 0) > 0);

export const sumaLineas = (ls: Linea[]): Linea => {
  const t = lineaVacia();
  for (const l of ls) for (const k of LINEA_KEYS) t[k] += l[k] || 0;
  return t;
};

// ───────────────────────── partidos y balance ─────────────────────────

export const partidosOrdenados = (eq: Equipo): PartidoEq[] =>
  eq.partidos.map((p, i) => ({ p, i }))
    .sort((a, b) => (a.p.fecha < b.p.fecha ? -1 : a.p.fecha > b.p.fecha ? 1 : a.i - b.i))
    .map((x) => x.p);

export const puntosPropios = (p: PartidoEq): number =>
  p.pf ?? p.lineas.reduce((a, l) => a + calcLinea(l).pts, 0);

export const resultado = (p: PartidoEq): "V" | "D" | "E" | "" => {
  if (p.pc == null) return "";
  const pf = puntosPropios(p);
  return pf > p.pc ? "V" : pf < p.pc ? "D" : "E";
};

export function balance(eq: Equipo) {
  const ps = eq.partidos.filter((p) => p.pc != null);
  let v = 0, d = 0, e = 0, pf = 0, pc = 0;
  for (const p of ps) {
    const r = resultado(p);
    if (r === "V") v++; else if (r === "D") d++; else e++;
    pf += puntosPropios(p); pc += p.pc as number;
  }
  const n = ps.length;
  return {
    pj: eq.partidos.length, conMarcador: n, v, d, e, pf, pc,
    pfpg: n ? pf / n : null, pcpg: n ? pc / n : null, dif: n ? (pf - pc) / n : null,
  };
}

export function serieMarcadores(eq: Equipo) {
  return partidosOrdenados(eq).map((p) => ({
    id: p.id, fecha: p.fecha, rival: p.rival, pf: puntosPropios(p), pc: p.pc,
  }));
}

// ───────────────────────── temporada por jugador ─────────────────────────

export interface FilaTemporada {
  jid: string; dorsal: string; nombre: string; pj: number;
  min: number; pts: number; reb: number; ast: number; rob: number; tap: number; per: number; fal: number; val: number;
  tsa: number; ts: number | null; efg: number | null;
}
export type Col = "dorsal" | "nombre" | "pj" | "min" | "pts" | "reb" | "ast" | "rob" | "tap" | "per" | "val" | "ts" | "efg";
export const COLUMNAS: { col: Col; label: string }[] = [
  { col: "dorsal", label: "#" }, { col: "nombre", label: "Jugador" }, { col: "pj", label: "PJ" },
  { col: "min", label: "MIN" }, { col: "pts", label: "PTS" }, { col: "reb", label: "REB" },
  { col: "ast", label: "AST" }, { col: "rob", label: "ROB" }, { col: "tap", label: "TAP" },
  { col: "per", label: "PER" }, { col: "val", label: "VAL" }, { col: "ts", label: "TS%" }, { col: "efg", label: "eFG%" },
];

export function tablaTemporada(eq: Equipo): FilaTemporada[] {
  return eq.jugadores.map((j) => {
    const ls = eq.partidos.flatMap((p) => p.lineas.filter((l) => l.jid === j.id && jugo(l)));
    const t = sumaLineas(ls);
    const pts = 2 * t.t2c + 3 * t.t3c + t.tlc;
    const fga = t.t2i + t.t3i, fgm = t.t2c + t.t3c;
    return {
      jid: j.id, dorsal: j.dorsal, nombre: j.nombre, pj: ls.length,
      min: t.min, pts, reb: t.ro + t.rd, ast: t.ast, rob: t.rob, tap: t.tap, per: t.per, fal: t.fal,
      val: ls.reduce((a, l) => a + calcLinea(l).val, 0),
      tsa: fga + 0.44 * t.tli,
      ts: tsPct(pts, fga, t.tli),
      efg: fga > 0 ? ((fgm + 0.5 * t.t3c) / fga) * 100 : null,
    };
  });
}

export type Modo = "medias" | "totales";
const PROMEDIABLES: Col[] = ["min", "pts", "reb", "ast", "rob", "tap", "per", "val"];

export function valorColumna(f: FilaTemporada, col: Col, modo: Modo): number | string | null {
  if (col === "nombre") return f.nombre;
  if (col === "dorsal") return f.dorsal === "" ? null : (normDorsal(f.dorsal) === "" ? f.dorsal : Number(normDorsal(f.dorsal)));
  const v = f[col] as number | null;
  if (v == null) return null;
  if (modo === "medias" && PROMEDIABLES.includes(col)) return f.pj > 0 ? v / f.pj : null;
  return v;
}

/** Ordena por columna; los nulos van siempre al final. Estable. */
export function ordenarTabla(filas: FilaTemporada[], col: Col, modo: Modo, desc: boolean): FilaTemporada[] {
  return filas.map((f, i) => ({ f, i, v: valorColumna(f, col, modo) })).sort((a, b) => {
    if (a.v == null && b.v == null) return a.i - b.i;
    if (a.v == null) return 1;
    if (b.v == null) return -1;
    const c = typeof a.v === "string" || typeof b.v === "string"
      ? String(a.v).localeCompare(String(b.v), "es")
      : (a.v as number) - (b.v as number);
    return c === 0 ? a.i - b.i : desc ? -c : c;
  }).map((x) => x.f);
}

export interface Lider { jid: string; nombre: string; dorsal: string; valor: number; }
export function lideres(filas: FilaTemporada[], opts: { minTsa?: number; top?: number } = {}) {
  const minTsa = opts.minTsa ?? 20, top = opts.top ?? 3;
  const jugadores = filas.filter((f) => f.pj > 0);
  const por = (get: (f: FilaTemporada) => number | null, elegible: (f: FilaTemporada) => boolean = () => true): Lider[] =>
    jugadores.filter(elegible)
      .map((f) => ({ jid: f.jid, nombre: f.nombre, dorsal: f.dorsal, valor: get(f) as number }))
      .filter((l) => l.valor != null && Number.isFinite(l.valor))
      .sort((a, b) => b.valor - a.valor).slice(0, top);
  return {
    pts: por((f) => f.pts / f.pj),
    reb: por((f) => f.reb / f.pj),
    ast: por((f) => f.ast / f.pj),
    val: por((f) => f.val / f.pj),
    ts: por((f) => f.ts, (f) => f.tsa >= minTsa),
    minTsa,
  };
}

// ───────────────────────── emparejar plantilla ─────────────────────────

const tokens = (s: string) => normNombre(s).split(" ").filter(Boolean);
const tokIgual = (a: string, b: string) =>
  a === b || (a.length === 1 && b.startsWith(a)) || (b.length === 1 && a.startsWith(b));

/** ¿Mismo nombre aunque cambie el orden ("GARCÍA, Juan" / "Juan García") o venga con inicial? */
export function mismoNombre(a: string, b: string): boolean {
  const ta = tokens(a), tb = tokens(b);
  if (!ta.length || !tb.length) return false;
  if (ta.length === 1 || tb.length === 1) return ta.length === tb.length && ta[0] === tb[0];
  const [corto, largo] = ta.length <= tb.length ? [ta, tb] : [tb, ta];
  return corto.every((t) => largo.some((u) => tokIgual(t, u)));
}

/** Para cada importado devuelve el id de plantilla que le corresponde (dorsal primero, luego nombre) o null. */
export function emparejar(
  plantilla: JugadorEq[],
  importados: { dorsal: string; nombre: string }[],
): (string | null)[] {
  const res: (string | null)[] = importados.map(() => null);
  const usados = new Set<string>();
  // 1) dorsal único en la plantilla
  importados.forEach((imp, i) => {
    const d = normDorsal(imp.dorsal);
    if (!d) return;
    const c = plantilla.filter((p) => normDorsal(p.dorsal) === d && !usados.has(p.id));
    if (c.length === 1) { res[i] = c[0].id; usados.add(c[0].id); }
  });
  // 2) nombre normalizado, solo si es inequívoco
  importados.forEach((imp, i) => {
    if (res[i]) return;
    const c = plantilla.filter((p) => !usados.has(p.id) && mismoNombre(p.nombre, imp.nombre));
    if (c.length === 1) { res[i] = c[0].id; usados.add(c[0].id); }
  });
  return res;
}

/** "7 García\n10. López Ruiz\nMarc" → jugadores. */
export function parsePlantilla(txt: string): { dorsal: string; nombre: string }[] {
  const out: { dorsal: string; nombre: string }[] = [];
  for (const raw of String(txt).replace(/\r/g, "").split("\n")) {
    const l = raw.trim();
    if (!l) continue;
    const m = /^#?\s*(\d{1,3})\s*[\s.\-:)\t,;]+\s*(.+)$/.exec(l) || /^(.+?)\s*[\s\t,;]+(\d{1,3})$/.exec(l);
    if (m && /^\d/.test(m[1])) out.push({ dorsal: m[1], nombre: texto(m[2], 40) });
    else if (m) out.push({ dorsal: m[2], nombre: texto(m[1], 40) });
    else out.push({ dorsal: "", nombre: texto(l, 40) });
  }
  return out.filter((j) => j.nombre);
}

// ───────────────────────── fusionar ─────────────────────────

export const claveDedupe = (p: { fecha: string; rival: string }) => `${p.fecha}|${normNombre(p.rival)}`;

export function fusionar(mio: Equipo, otro: Equipo) {
  const jugadores = mio.jugadores.map((j) => ({ ...j }));
  const mapa = new Map<string, string>();
  const imp = otro.jugadores.map((j) => ({ dorsal: j.dorsal, nombre: j.nombre }));
  const emp = emparejar(jugadores, imp);
  let jugadoresNuevos = 0;
  otro.jugadores.forEach((j, i) => {
    if (emp[i]) mapa.set(j.id, emp[i] as string);
    else {
      const nj = { id: uid(), dorsal: j.dorsal, nombre: j.nombre };
      jugadores.push(nj); mapa.set(j.id, nj.id); jugadoresNuevos++;
    }
  });
  const claves = new Set(mio.partidos.map(claveDedupe));
  const partidos = mio.partidos.map((p) => ({ ...p, lineas: p.lineas.map((l) => ({ ...l })) }));
  let partidosNuevos = 0, duplicados = 0;
  for (const p of otro.partidos) {
    const k = claveDedupe(p);
    if (claves.has(k)) { duplicados++; continue; }
    claves.add(k);
    partidos.push({
      ...p, id: uid(),
      lineas: p.lineas.filter((l) => mapa.has(l.jid)).map((l) => ({ ...l, jid: mapa.get(l.jid) as string })),
    });
    partidosNuevos++;
  }
  return { equipo: { ...mio, jugadores, partidos } as Equipo, partidosNuevos, duplicados, jugadoresNuevos };
}

export function fusionarJugador(existentes: PartidoJugador[], nuevos: PartidoJugador[]) {
  const claves = new Set(existentes.map(claveDedupe));
  const out = existentes.slice();
  let añadidos = 0, duplicados = 0;
  for (const p of nuevos) {
    const k = claveDedupe(p);
    if (claves.has(k)) { duplicados++; continue; }
    claves.add(k); out.push(p); añadidos++;
  }
  out.sort((a, b) => (a.fecha < b.fecha ? -1 : a.fecha > b.fecha ? 1 : 0));
  return { partidos: out, añadidos, duplicados };
}

/** Un equipo con un único partido (y solo los jugadores que aparecen en él). */
export function equipoSoloPartido(eq: Equipo, pid: string): Equipo {
  const p = eq.partidos.find((x) => x.id === pid);
  if (!p) throw new Error("Partido inexistente");
  const lineas = p.lineas.filter(jugo);
  const ids = new Set(lineas.map((l) => l.jid));
  return { ...eq, jugadores: eq.jugadores.filter((j) => ids.has(j.id)), partidos: [{ ...p, lineas }] };
}

/** Los partidos de UN jugador del equipo, en el formato del modo Jugador. */
export function partidosDeJugador(eq: Equipo, jid: string): PartidoJugador[] {
  const out: PartidoJugador[] = [];
  for (const p of partidosOrdenados(eq)) {
    const l = p.lineas.find((x) => x.jid === jid);
    if (!l || !jugo(l)) continue;
    const r = resultado(p);
    const g: PartidoJugador = { fecha: p.fecha, rival: p.rival, res: r === "V" || r === "D" ? r : "", ...lineaVacia() };
    for (const k of LINEA_KEYS) g[k] = l[k];
    out.push(g);
  }
  return out;
}

// ───────────────────────── saneado (entrada NO fiable) ─────────────────────────

const sanLinea = (x: any): Linea => {
  const l = lineaVacia();
  for (const k of LINEA_KEYS) l[k] = entero(x?.[k], k === "min" ? 99 : 999);
  l.t2i = Math.max(l.t2i, l.t2c); l.t3i = Math.max(l.t3i, l.t3c); l.tli = Math.max(l.tli, l.tlc);
  return l;
};
const sanFecha = (f: unknown) => (/^\d{4}-\d{2}-\d{2}$/.test(String(f)) ? String(f) : "");
const sanPts = (v: unknown): number | null => {
  if (v == null || v === "" || Number(v) < 0) return null;
  const x = Math.trunc(Number(v));
  return Number.isFinite(x) ? Math.min(x, 300) : null;
};

/** Valida y limpia un Equipo venido de un archivo o de un enlace. Lanza si no es un equipo. */
export function normalizarEquipo(x: any): Equipo {
  if (!x || typeof x !== "object" || !Array.isArray(x.jugadores) || !Array.isArray(x.partidos)) {
    throw new Error("Formato de equipo no válido");
  }
  const ids = new Set<string>();
  const jugadores: JugadorEq[] = [];
  for (const j of x.jugadores.slice(0, MAX_JUGADORES)) {
    let id = texto(j?.id, 24) || uid();
    if (ids.has(id)) id = uid();
    ids.add(id);
    jugadores.push({ id, dorsal: texto(j?.dorsal, 4), nombre: texto(j?.nombre, 40) });
  }
  const partidos: PartidoEq[] = x.partidos.slice(0, MAX_PARTIDOS).map((p: any) => ({
    id: texto(p?.id, 24) || uid(),
    fecha: sanFecha(p?.fecha),
    rival: texto(p?.rival, 40),
    competicion: texto(p?.competicion, 80),
    pf: sanPts(p?.pf),
    pc: sanPts(p?.pc),
    lineas: (Array.isArray(p?.lineas) ? p.lineas : []).slice(0, MAX_LINEAS)
      .filter((l: any) => ids.has(String(l?.jid)))
      .map((l: any) => ({ jid: String(l.jid), ...sanLinea(l) })),
  }));
  return { id: texto(x.id, 24) || uid(), nombre: texto(x.nombre, 40) || "Mi equipo", categoria: texto(x.categoria, 30), jugadores, partidos };
}

export function normalizarStore(x: any): EquipoStore {
  const equipos: Equipo[] = [];
  for (const e of Array.isArray(x?.equipos) ? x.equipos.slice(0, 20) : []) {
    try { equipos.push(normalizarEquipo(e)); } catch { /* se descarta el equipo corrupto */ }
  }
  const activo = equipos.some((e) => e.id === x?.activo) ? x.activo : equipos[0]?.id ?? "";
  return { activo, equipos };
}

export const FORMATO_ARCHIVO = "cancha-zapa-equipo";
export const archivoEquipo = (eq: Equipo) => ({ formato: FORMATO_ARCHIVO, v: 1, equipo: eq });
/** Acepta el envoltorio del archivo o un Equipo a pelo. */
export const leerArchivoEquipo = (j: any): Equipo => normalizarEquipo(j?.formato === FORMATO_ARCHIVO ? j.equipo : j);

// ───────────────────────── copias de seguridad ─────────────────────────
// Los datos viven solo en localStorage: se pierden al limpiar el navegador, cambiar de
// dispositivo o en incógnito. Esta lógica decide cuándo recordar la copia y cómo restaurarla.

export const DIAS_AVISO_COPIA = 14;
export const MIN_PARTIDOS_SIN_COPIA = 3;
const DIA_MS = 86_400_000;

export const diasDesde = (ahora: number, ts: number | null | undefined): number | null =>
  ts == null || !Number.isFinite(ts) ? null : Math.max(0, Math.floor((ahora - ts) / DIA_MS));

export function textoUltimaCopia(ahora: number, ts: number | null | undefined): string {
  const d = diasDesde(ahora, ts);
  if (d == null) return "Última copia: nunca";
  return d === 0 ? "Última copia: hoy" : d === 1 ? "Última copia: ayer" : `Última copia: hace ${d} días`;
}

export type RecordatorioCopia = "ninguno" | "nunca" | "antigua";
/** ¿Toca recordar la copia? Con datos: nunca hubo copia y ya hay ≥3 partidos, o la última pasa de 14 días. */
export function recordatorioCopia(ahora: number, ultima: number | null | undefined, partidos: number): RecordatorioCopia {
  if (partidos <= 0) return "ninguno";
  const d = diasDesde(ahora, ultima);
  if (d == null) return partidos >= MIN_PARTIDOS_SIN_COPIA ? "nunca" : "ninguno";
  return d > DIAS_AVISO_COPIA ? "antigua" : "ninguno";
}

/** El aviso largo es cerrable, pero vuelve: a las 24 h si falta copia reciente, y al mes si todo está en orden. */
export function mostrarAvisoCopia(ahora: number, descartado: number | null | undefined, rec: RecordatorioCopia): boolean {
  if (descartado == null || !Number.isFinite(descartado)) return true;
  return ahora - descartado >= (rec === "ninguno" ? 30 : 1) * DIA_MS;
}

export const FORMATO_COPIA = "cancha-zapa-copia";
export const archivoCopia = (st: EquipoStore, ahora = Date.now()) =>
  ({ formato: FORMATO_COPIA, v: 1, creada: new Date(ahora).toISOString(), activo: st.activo, equipos: st.equipos });
export const esArchivoCopia = (j: any): boolean => j?.formato === FORMATO_COPIA && Array.isArray(j?.equipos);

/** Restaura una copia sobre lo que ya hay: equipos nuevos se añaden; los que ya existen (mismo id) se fusionan sin duplicar partidos. */
export function restaurarCopia(actual: EquipoStore, copia: any) {
  const c = normalizarStore(copia);
  let equipos = actual.equipos.slice();
  let nuevos = 0, fusionados = 0;
  for (const t of c.equipos) {
    const i = equipos.findIndex((e) => e.id === t.id);
    if (i >= 0) { equipos[i] = fusionar(equipos[i], t).equipo; fusionados++; }
    else { equipos = [...equipos, t]; nuevos++; }
  }
  return { store: { activo: actual.activo || c.activo, equipos } as EquipoStore, nuevos, fusionados };
}

// ───────────────────────── enlace compartible ─────────────────────────
// Formato "wire" compacto (filas como arrays) → JSON → (deflate-raw) → base64url.
// El token lleva un prefijo: "z" = comprimido, "r" = sin comprimir.

const aFila = (l: Linea) => [l.min, l.t2c, l.t2i, l.t3c, l.t3i, l.tlc, l.tli, l.ro, l.rd, l.ast, l.rob, l.tap, l.per, l.fal];
const deFila = (a: any[]): Linea => sanLinea(Object.fromEntries(LINEA_KEYS.map((k, i) => [k, a?.[i]])));

export function aWire(p: Payload): unknown {
  if (p.k === "jugador") {
    return {
      k: "jugador", n: p.nombre,
      g: p.partidos.map((g) => [g.fecha, g.rival, g.res, ...aFila(g)]),
    };
  }
  const eq = p.equipo;
  const idx = new Map(eq.jugadores.map((j, i) => [j.id, i]));
  return {
    k: p.k, n: eq.nombre, c: eq.categoria,
    j: eq.jugadores.map((j) => [j.dorsal, j.nombre]),
    p: eq.partidos.map((x) => [
      x.fecha, x.rival, x.competicion, x.pf ?? -1, x.pc ?? -1,
      x.lineas.filter((l) => idx.has(l.jid)).map((l) => [idx.get(l.jid), ...aFila(l)]),
    ]),
  };
}

export function deWire(w: any): Payload {
  if (!w || typeof w !== "object") throw new Error("Enlace no válido");
  if (w.k === "jugador") {
    if (!Array.isArray(w.g)) throw new Error("Enlace no válido");
    const partidos = w.g.slice(0, MAX_PARTIDOS).map((a: any[]) => {
      const res = a?.[2] === "V" || a?.[2] === "D" ? a[2] : "";
      return { fecha: sanFecha(a?.[0]), rival: texto(a?.[1], 40), res, ...deFila((a ?? []).slice(3)) } as PartidoJugador;
    });
    return { k: "jugador", nombre: texto(w.n, 30), partidos };
  }
  if ((w.k !== "equipo" && w.k !== "partido") || !Array.isArray(w.j) || !Array.isArray(w.p)) {
    throw new Error("Enlace no válido");
  }
  const jugadores = w.j.slice(0, MAX_JUGADORES).map((a: any[], i: number) => ({ id: `j${i}`, dorsal: a?.[0], nombre: a?.[1] }));
  const partidos = w.p.slice(0, MAX_PARTIDOS).map((a: any[], i: number) => ({
    id: `p${i}`, fecha: a?.[0], rival: a?.[1], competicion: a?.[2], pf: a?.[3], pc: a?.[4],
    lineas: (Array.isArray(a?.[5]) ? a[5] : []).map((f: any[]) => ({ jid: `j${f?.[0]}`, ...deFila(f.slice(1)) })),
  }));
  const eq = normalizarEquipo({ id: uid(), nombre: w.n, categoria: w.c, jugadores, partidos });
  // los ids "jN"/"pN" son locales del enlace: se renuevan para no chocar con los de quien lo abre
  const map = new Map(eq.jugadores.map((j) => [j.id, uid()]));
  eq.jugadores.forEach((j) => { j.id = map.get(j.id) as string; });
  eq.partidos.forEach((p) => { p.id = uid(); p.lineas.forEach((l) => { l.jid = map.get(l.jid) as string; }); });
  return { k: w.k, equipo: eq };
}

const b64u = (bytes: Uint8Array): string => {
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};
const deB64u = (t: string): Uint8Array => {
  const s = atob(t.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (t.length % 4)) % 4));
  return Uint8Array.from(s, (c) => c.charCodeAt(0));
};
const pasar = async (bytes: Uint8Array, t: CompressionStream | DecompressionStream) => {
  const stream = new Blob([bytes as BlobPart]).stream().pipeThrough(t as unknown as ReadableWritablePair<Uint8Array, Uint8Array>);
  return new Uint8Array(await new Response(stream).arrayBuffer());
};

export const hayCompresion = () => typeof CompressionStream !== "undefined" && typeof DecompressionStream !== "undefined";

export async function codificarEnlace(p: Payload, opts: { comprimir?: boolean } = {}): Promise<string> {
  const raw = new TextEncoder().encode(JSON.stringify(aWire(p)));
  const sinComprimir = "r" + b64u(raw);
  if (opts.comprimir === false || !hayCompresion()) return sinComprimir;
  try {
    const z = "z" + b64u(await pasar(raw, new CompressionStream("deflate-raw")));
    return z.length < sinComprimir.length ? z : sinComprimir;
  } catch { return sinComprimir; }
}

export async function decodificarEnlace(token: string): Promise<Payload> {
  const t = String(token || "").trim();
  if (t.length < 2 || !/^[zr][A-Za-z0-9_-]+$/.test(t)) throw new Error("Enlace no válido");
  let bytes = deB64u(t.slice(1));
  if (t[0] === "z") {
    if (!hayCompresion()) throw new Error("Tu navegador no puede abrir este enlace comprimido. Usa un navegador actualizado.");
    bytes = await pasar(bytes, new DecompressionStream("deflate-raw"));
  }
  let w: unknown;
  try { w = JSON.parse(new TextDecoder().decode(bytes)); } catch { throw new Error("Enlace no válido"); }
  return deWire(w);
}

export const urlEnlace = (base: string, token: string) => `${base}#e=${token}`;
export const tokenDeHash = (hash: string): string | null => {
  const m = /^#?(?:.*&)?e=([A-Za-z0-9_-]+)/.exec(hash || "");
  return m ? m[1] : null;
};

// ───────────────────────── CSV y texto ─────────────────────────

const celdaCsv = (v: unknown): string => {
  let s = v == null ? "" : String(v);
  if (/^[=+\-@\t\r]/.test(s) && Number.isNaN(Number(s.replace(",", ".")))) s = "'" + s; // evita fórmulas en Excel
  return /[;"\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const num1 = (v: number | null, dec = 1) => (v == null ? "" : v.toFixed(dec).replace(".", ","));

/** CSV listo para Excel/Sheets en español: separador ";" y coma decimal. */
export function csvTemporada(filas: FilaTemporada[], modo: Modo): string {
  const cab = ["Dorsal", "Jugador", ...COLUMNAS.slice(2).map((c) => c.label)];
  const lineas = [cab.map(celdaCsv).join(";")];
  for (const f of filas) {
    const fila: string[] = [f.dorsal, f.nombre];
    for (const { col } of COLUMNAS.slice(2)) {
      const v = valorColumna(f, col, modo) as number | null;
      fila.push(col === "pj" ? String(f.pj) : col === "ts" || col === "efg" ? num1(v) : modo === "medias" ? num1(v) : v == null ? "" : String(Math.round(v)));
    }
    lineas.push(fila.map(celdaCsv).join(";"));
  }
  return lineas.join("\r\n");
}

/** Resumen de un partido para pegar en WhatsApp. */
export function textoPartido(eq: Equipo, p: PartidoEq): string {
  const pf = puntosPropios(p), r = resultado(p);
  const marcador = p.pc == null ? `${pf} pts` : `${pf}–${p.pc}${r ? ` (${r === "E" ? "empate" : r === "V" ? "victoria" : "derrota"})` : ""}`;
  const cab = `🏀 ${eq.nombre}${eq.categoria ? ` (${eq.categoria})` : ""} vs ${p.rival || "rival"}: ${marcador}`;
  const sub = [fechaCorta(p.fecha), p.competicion].filter((s) => s && s !== "—").join(" · ");
  const filas = p.lineas
    .filter(jugo)
    .map((l) => ({ l, j: eq.jugadores.find((x) => x.id === l.jid), c: calcLinea(l) }))
    .filter((x) => x.j)
    .sort((a, b) => b.c.pts - a.c.pts || b.c.val - a.c.val)
    .map(({ l, j, c }) => {
      const partes = [`${c.pts} pts`];
      if (c.reb) partes.push(`${c.reb} reb`);
      if (l.ast) partes.push(`${l.ast} ast`);
      if (l.rob) partes.push(`${l.rob} rob`);
      if (l.tap) partes.push(`${l.tap} tap`);
      return `${j!.dorsal ? j!.dorsal + " " : ""}${j!.nombre}: ${partes.join(", ")} (VAL ${c.val})`;
    });
  return [cab, sub, "", ...filas, "", "canchazapa.com/estadisticas"].filter((s, i, a) => !(s === "" && (i === 0 || a[i - 1] === ""))).join("\n");
}

/** Los 3 mejores de un partido por valoración (para la tarjeta). */
export function mejoresDelPartido(eq: Equipo, p: PartidoEq, n = 3) {
  return p.lineas.filter(jugo)
    .map((l) => ({ l, j: eq.jugadores.find((x) => x.id === l.jid), c: calcLinea(l) }))
    .filter((x) => x.j)
    .sort((a, b) => b.c.val - a.c.val || b.c.pts - a.c.pts)
    .slice(0, n)
    .map(({ l, j, c }) => ({ jid: j!.id, dorsal: j!.dorsal, nombre: j!.nombre, pts: c.pts, reb: c.reb, ast: l.ast, val: c.val }));
}

// ───────────────────────── acta pegada (parser compartido con el modo Jugador) ─────────────────────────
// Detecta las columnas por su cabecera (catalán/castellano) → no asume orden.
// Sinónimos normalizados (sin acentos ni símbolos): cabecera → campo interno.
export const COLS: Record<string, string[]> = {
  dorsal: ["dorsal", "d", "num", "numero", "no", "n"],
  nombre: ["jugador", "jugadora", "nom", "nombre", "name", "cognom", "cognoms", "jugadores"],
  min: ["min", "minuts", "minutos", "m"],
  pts: ["punts", "puntos", "pts", "pt", "p"],
  t2: ["t2", "2p", "tir2", "tirsde2", "t2ci", "2punts", "2puntos"],
  t2c: ["t2c", "2pc", "c2", "t2m", "t2a"],
  t2i: ["t2i", "2pi", "i2", "t2int"],
  t3: ["t3", "3p", "tir3", "tirsde3", "t3ci", "3punts", "3puntos"],
  t3c: ["t3c", "3pc", "c3", "t3m"],
  t3i: ["t3i", "3pi", "i3", "t3int"],
  tl: ["t1", "tl", "tll", "1p", "tir1", "tirslliures", "tiroslibres", "tlci"],
  tlc: ["t1c", "tlc", "1pc", "c1", "t1m"],
  tli: ["t1i", "tli", "1pi", "i1", "t1int"],
  ro: ["ro", "rebof", "rebotofensiu", "rof", "rebotesofensivos"],
  rd: ["rd", "rebdef", "rebotdefensiu", "rdef", "rebotesdefensivos"],
  rt: ["rt", "reb", "rebot", "rebots", "rebotes", "r", "reboundstotals"],
  ast: ["as", "assist", "assistencies", "asistencias", "ass", "assis", "a"],
  rob: ["br", "rec", "recuperacions", "robos", "robatoris", "recuperaciones", "recup", "rb"],
  tap: ["tap", "taps", "tapones", "tp", "ta"],
  per: ["pp", "perdues", "pilotesperdudes", "perdidas", "balonesperdidos", "bp", "per", "perd", "pilperdudes"],
  fal: ["fp", "faltes", "faltas", "faltespersonals", "faltescomeses", "fc", "f"],
};
const normHead = (s: unknown) => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
const pInt = (v: unknown) => { const m = String(v).match(/-?\d+/); const x = m ? parseInt(m[0], 10) : 0; return Number.isFinite(x) && x >= 0 ? x : 0; };
const splitMA = (v: unknown) => { const m = String(v).match(/(\d+)\s*[\/\-]\s*(\d+)/); return m ? [+m[1], +m[2]] : null; };

export function parsePaste(raw: string) {
  const lines = raw.replace(/\r/g, "").split("\n").map((l: string) => l.trim()).filter(Boolean);
  if (lines.length < 2) throw new Error("Pega al menos la fila de cabecera y una de jugador.");
  const tok = (l: string) => (l.includes("\t") ? l.split("\t") : l.split(/ {2,}|\t/)).map((x: string) => x.trim()).filter((x: string) => x !== "");
  // Busca la cabecera: la línea (de las primeras) con más columnas reconocidas
  let headerMap: Record<number, string> = {}, headerIdx = -1, best = 0;
  for (let i = 0; i < Math.min(lines.length, 5); i++) {
    const cells = tok(lines[i]); const map: Record<number, string> = {}; let score = 0;
    cells.forEach((c: string, idx: number) => {
      const n = normHead(c);
      for (const field in COLS) { if (COLS[field].includes(n)) { if (!(idx in map)) { map[idx] = field; score++; } break; } }
    });
    if (score > best) { best = score; headerMap = map; headerIdx = i; }
  }
  if (best < 3) throw new Error("No reconozco las columnas. Copia también la fila de cabecera (Min, Punts, T2, T3, TL, Reb…).");
  const jugadores = [];
  for (let i = headerIdx + 1; i < lines.length; i++) {
    const cells = tok(lines[i]);
    if (!cells.length) continue;
    const g: Record<string, any> = { nombre: "", dorsal: "", min: 0, t2c: 0, t2i: 0, t3c: 0, t3i: 0, tlc: 0, tli: 0, ro: 0, rd: 0, ast: 0, rob: 0, tap: 0, per: 0, fal: 0 };
    let rt: number | null = null, hasStat = false;
    cells.forEach((cell: string, idx: number) => {
      const field = headerMap[idx];
      if (!field) return;
      if (field === "nombre") { g.nombre = cell; return; }
      if (field === "dorsal") { g.dorsal = cell.replace(/[^0-9]/g, ""); return; }
      const ma = splitMA(cell);
      if (field === "t2") { if (ma) { g.t2c = ma[0]; g.t2i = ma[1]; hasStat = true; } return; }
      if (field === "t3") { if (ma) { g.t3c = ma[0]; g.t3i = ma[1]; hasStat = true; } return; }
      if (field === "tl") { if (ma) { g.tlc = ma[0]; g.tli = ma[1]; hasStat = true; } return; }
      if (field === "rt") { rt = pInt(cell); return; }
      if (field === "pts") { hasStat = true; return; } // pts se recalcula; solo marca fila válida
      g[field] = pInt(cell); if (g[field]) hasStat = true;
    });
    // Si no hay nombre marcado, coge el primer token no numérico largo
    if (!g.nombre) {
      const cand = cells.find((c: string) => /[a-zà-ú]{3,}/i.test(c) && !/^\d/.test(c));
      if (cand) g.nombre = cand;
    }
    // Rebotes: si solo hay total (rt) y no O/D, mételo como defensivos (preserva el total)
    if (rt != null && g.ro === 0 && g.rd === 0) g.rd = rt;
    if (g.nombre && hasStat) jugadores.push(g);
  }
  if (!jugadores.length) throw new Error("Reconocí la cabecera pero no encontré filas de jugador debajo.");
  return jugadores;
}
