// Torneos de un día (/torneo): 3x3, campus o un triangular de club. Liga o grupos, calendario por
// pistas y horas, clasificación y cruces que se rellenan solos al meter los resultados. Todo vive
// en el navegador (cz.torneo.v1) y se comparte por enlace (en el #, nunca llega a ningún servidor).
// Lógica pura.

export type Ref = { e: number } | { g: number; p: number } | { w: string };

export interface Partido {
  id: string;
  /** fase de grupos (g = índice de grupo) o cruce (r = ronda del cuadro, 0 = primera) */
  g?: number;
  r?: number;
  a: Ref;
  b: Ref;
  pa: number | null;
  pb: number | null;
  slot: number;
  pista: number;
}

export type Formato = "liga" | "liga-final" | "liga-semis" | "g2-final" | "g2-semis" | "g4-semis" | "g4-cuartos";

export const FORMATOS: Record<Formato, { nombre: string; grupos: number; pasan: number }> = {
  liga: { nombre: "Liga (todos contra todos)", grupos: 1, pasan: 0 },
  "liga-final": { nombre: "Liga + final (1.º contra 2.º)", grupos: 1, pasan: 2 },
  "liga-semis": { nombre: "Liga + semifinales y final", grupos: 1, pasan: 4 },
  "g2-final": { nombre: "2 grupos + final de primeros", grupos: 2, pasan: 1 },
  "g2-semis": { nombre: "2 grupos + semifinales y final", grupos: 2, pasan: 2 },
  "g4-semis": { nombre: "4 grupos + semifinales de primeros", grupos: 4, pasan: 1 },
  "g4-cuartos": { nombre: "4 grupos + cuartos, semis y final", grupos: 4, pasan: 2 },
};

export interface Torneo {
  v: 1;
  nombre: string;
  equipos: string[];
  formato: Formato;
  pistas: number;
  inicio: string; // HH:MM
  duracion: number; // minutos por partido
  descanso: number; // minutos entre partidos
  partidos: Partido[];
}

export const LIMITES_TORNEO = { EQUIPOS: 32, PISTAS: 8, NOMBRE: 30 } as const;

export const LETRAS = "ABCDEFGH";

/** Reparto en serpiente: con los equipos ordenados por nivel, cada grupo recibe uno fuerte y uno flojo. */
export function repartirGrupos(n: number, grupos: number): number[][] {
  const gs: number[][] = Array.from({ length: grupos }, () => []);
  for (let i = 0; i < n; i++) {
    const ronda = Math.floor(i / grupos);
    const k = i % grupos;
    gs[ronda % 2 === 0 ? k : grupos - 1 - k].push(i);
  }
  return gs;
}

/** Todos contra todos por el método del círculo: lista de jornadas con sus parejas. */
export function jornadas(ids: number[]): [number, number][][] {
  const xs: (number | null)[] = [...ids];
  if (xs.length % 2) xs.push(null);
  const n = xs.length;
  const out: [number, number][][] = [];
  for (let r = 0; r < n - 1; r++) {
    const j: [number, number][] = [];
    for (let i = 0; i < n / 2; i++) {
      const a = xs[i];
      const b = xs[n - 1 - i];
      if (a !== null && b !== null) j.push(r % 2 ? [b, a] : [a, b]);
    }
    out.push(j);
    xs.splice(1, 0, xs.pop()!); // rota todos menos el primero
  }
  return out;
}

/** ¿Se puede jugar este formato con n equipos? Devuelve el motivo si no. */
export function problemaFormato(n: number, f: Formato): string | null {
  const { grupos, pasan } = FORMATOS[f];
  if (n < 2) return "Hacen falta al menos 2 equipos.";
  if (n > LIMITES_TORNEO.EQUIPOS) return `Como mucho ${LIMITES_TORNEO.EQUIPOS} equipos.`;
  const minGrupo = Math.floor(n / grupos);
  if (minGrupo < 2) return `Con ${grupos} grupos hacen falta al menos ${grupos * 2} equipos.`;
  if (pasan && minGrupo <= pasan && grupos > 1) return `Para que pasen ${pasan} por grupo, cada grupo necesita al menos ${pasan + 1} equipos.`;
  if (pasan > n) return `Para ese formato hacen falta al menos ${pasan + 1} equipos.`;
  return null;
}

/** Parejas de la primera ronda del cuadro, en orden de cuadro (los del mismo grupo, lo más tarde posible). */
export function primeraRonda(grupos: number, pasan: number): [Ref, Ref][] {
  if (grupos === 1) {
    if (pasan === 2) return [[{ g: 0, p: 1 }, { g: 0, p: 2 }]];
    return [
      [{ g: 0, p: 1 }, { g: 0, p: 4 }],
      [{ g: 0, p: 2 }, { g: 0, p: 3 }],
    ];
  }
  const parejas: [number, number][] = [];
  for (let g = 0; g < grupos; g += 2) parejas.push([g, g + 1]);
  if (pasan === 1) return parejas.map(([x, y]) => [{ g: x, p: 1 }, { g: y, p: 1 }]);
  return [...parejas.map(([x, y]): [Ref, Ref] => [{ g: x, p: 1 }, { g: y, p: 2 }]), ...parejas.map(([x, y]): [Ref, Ref] => [{ g: y, p: 1 }, { g: x, p: 2 }])];
}

/** Monta grupos, jornadas, cruces y el horario (cada partido en un hueco y una pista). */
export function generar(t: Omit<Torneo, "partidos">): Partido[] {
  const { grupos, pasan } = FORMATOS[t.formato];
  const gs = repartirGrupos(t.equipos.length, grupos);
  const porGrupo = gs.map(jornadas);
  const pistas = Math.max(1, Math.min(LIMITES_TORNEO.PISTAS, Math.round(t.pistas) || 1));
  const partidos: Partido[] = [];
  let n = 0;
  // horario: huecos de `pistas` partidos; un equipo no juega dos veces en el mismo hueco y,
  // si se puede, tampoco en dos huecos seguidos
  const ocupados: number[][] = []; // por hueco: equipos que juegan
  const ultimo = new Map<number, number>();
  const colocar = (p: Omit<Partido, "slot" | "pista">, desde: number, equipos: number[]) => {
    // sin jugar seguido solo hasta el primer hueco libre: más allá dejaría pistas vacías
    const frontera = Math.max(desde, ...partidos.map((x) => x.slot + 1));
    for (const permitirSeguido of [false, true])
      for (let s = desde; s <= (permitirSeguido ? desde + 400 : frontera); s++) {
        const occ = (ocupados[s] ??= []);
        const pista = partidos.filter((x) => x.slot === s).length;
        if (pista >= pistas) continue;
        if (equipos.some((e) => occ.includes(e))) continue;
        if (!permitirSeguido && equipos.some((e) => ultimo.get(e) === s - 1)) continue;
        occ.push(...equipos);
        for (const e of equipos) ultimo.set(e, s);
        partidos.push({ ...p, slot: s, pista });
        return;
      }
  };
  // jornada a jornada, intercalando los grupos
  const maxJ = Math.max(...porGrupo.map((j) => j.length));
  for (let j = 0; j < maxJ; j++)
    for (let g = 0; g < grupos; g++)
      for (const [a, b] of porGrupo[g][j] ?? []) colocar({ id: `p${n++}`, g, a: { e: a }, b: { e: b }, pa: null, pb: null }, 0, [a, b]);
  if (pasan) {
    let ronda: Ref[][] = primeraRonda(grupos, pasan);
    let r = 0;
    let desde = partidos.length ? Math.max(...partidos.map((p) => p.slot)) + 1 : 0;
    for (;;) {
      const ids: string[] = [];
      for (const [a, b] of ronda) {
        const id = `c${r}-${ids.length}`;
        ids.push(id);
        colocar({ id, r, a, b, pa: null, pb: null }, desde, []);
      }
      desde = Math.max(...partidos.map((p) => p.slot)) + 1;
      if (ids.length === 1) break;
      ronda = [];
      for (let i = 0; i < ids.length; i += 2) ronda.push([{ w: ids[i] }, { w: ids[i + 1] }]);
      r++;
    }
  }
  return partidos;
}

export const NOMBRES_RONDA = ["Final", "Semifinales", "Cuartos de final", "Octavos de final"];
/** Nombre de la ronda r de un cuadro de `total` rondas. */
export const nombreRonda = (r: number, total: number) => NOMBRES_RONDA[total - 1 - r] ?? `Ronda ${r + 1}`;

export function horaDe(t: Pick<Torneo, "inicio" | "duracion" | "descanso">, slot: number): string {
  const m = /^(\d{1,2}):(\d{2})$/.exec(t.inicio);
  if (!m) return "";
  const min = +m[1] * 60 + +m[2] + slot * (t.duracion + t.descanso);
  return `${String(Math.floor(min / 60) % 24).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;
}

export const jugado = (p: Partido) => p.pa !== null && p.pb !== null && p.pa !== p.pb;

export interface Fila {
  e: number;
  pj: number;
  g: number;
  p: number;
  pf: number;
  pc: number;
}

const filaVacia = (e: number): Fila => ({ e, pj: 0, g: 0, p: 0, pf: 0, pc: 0 });

function sumar(filas: Map<number, Fila>, ps: Partido[]) {
  for (const p of ps) {
    if (!jugado(p) || !("e" in p.a) || !("e" in p.b)) continue;
    const a = filas.get(p.a.e);
    const b = filas.get(p.b.e);
    if (!a || !b) continue;
    a.pj++;
    b.pj++;
    a.pf += p.pa!;
    a.pc += p.pb!;
    b.pf += p.pb!;
    b.pc += p.pa!;
    if (p.pa! > p.pb!) (a.g++, b.p++);
    else (b.g++, a.p++);
  }
}

/**
 * Clasificación de un grupo. Desempate a la FIBA: victorias; si empatan, victorias y diferencia
 * en los partidos ENTRE los empatados; después diferencia y puntos a favor de todo el grupo.
 */
export function clasificacion(t: Torneo, g: number): Fila[] {
  const { grupos } = FORMATOS[t.formato];
  const ids = repartirGrupos(t.equipos.length, grupos)[g] ?? [];
  const ps = t.partidos.filter((p) => p.g === g);
  const filas = new Map(ids.map((e) => [e, filaVacia(e)]));
  sumar(filas, ps);
  const total = [...filas.values()];
  const dif = (f: Fila) => f.pf - f.pc;
  const porVictorias = new Map<number, Fila[]>();
  for (const f of total) porVictorias.set(f.g, [...(porVictorias.get(f.g) ?? []), f]);
  const out: Fila[] = [];
  for (const v of [...porVictorias.keys()].sort((a, b) => b - a)) {
    const empatados = porVictorias.get(v)!;
    if (empatados.length === 1) {
      out.push(empatados[0]);
      continue;
    }
    const set = new Set(empatados.map((f) => f.e));
    const mini = new Map(empatados.map((f) => [f.e, filaVacia(f.e)]));
    sumar(mini, ps.filter((p) => "e" in p.a && "e" in p.b && set.has(p.a.e) && set.has(p.b.e)));
    out.push(
      ...[...empatados].sort((x, y) => {
        const mx = mini.get(x.e)!;
        const my = mini.get(y.e)!;
        return my.g - mx.g || dif(my) - dif(mx) || dif(y) - dif(x) || y.pf - x.pf || x.e - y.e;
      })
    );
  }
  return out;
}

/** ¿Ha terminado la fase de grupos de este grupo? */
export const grupoCerrado = (t: Torneo, g: number) => t.partidos.filter((p) => p.g === g).every(jugado);

/** Índice del equipo detrás de una referencia, o null si aún no se sabe. */
export function resolver(t: Torneo, ref: Ref): number | null {
  if ("e" in ref) return ref.e;
  if ("g" in ref) return grupoCerrado(t, ref.g) ? clasificacion(t, ref.g)[ref.p - 1]?.e ?? null : null;
  const p = t.partidos.find((x) => x.id === ref.w);
  if (!p || !jugado(p)) return null;
  return resolver(t, p.pa! > p.pb! ? p.a : p.b);
}

/** Texto de una referencia: el nombre si ya se sabe, si no «1.º grupo A», «Ganador SF 1»… */
export function etiqueta(t: Torneo, ref: Ref): string {
  const e = resolver(t, ref);
  if (e !== null) return t.equipos[e] ?? "?";
  if ("g" in ref) return FORMATOS[t.formato].grupos === 1 ? `${ref.p}.º` : `${ref.p}.º grupo ${LETRAS[ref.g]}`;
  if ("w" in ref) {
    const p = t.partidos.find((x) => x.id === ref.w);
    const rondas = new Set(t.partidos.filter((x) => x.r !== undefined).map((x) => x.r)).size;
    const misma = t.partidos.filter((x) => x.r === p?.r);
    const nom = p?.r !== undefined ? nombreRonda(p.r, rondas) : "";
    const corto = nom === "Semifinales" ? "semi" : nom === "Cuartos de final" ? "cuarto" : nom.toLowerCase();
    return `Ganador ${corto} ${misma.indexOf(p!) + 1}`;
  }
  return "?";
}

/** Al cambiar un resultado de grupo o de cruce, los cruces que dependían de él se vacían si cambia quién pasa. */
export function limpiarCruces(t: Torneo, antes: (number | null)[][]): void {
  const cruces = t.partidos.filter((p) => p.r !== undefined);
  cruces.forEach((p, i) => {
    const ahora = [resolver(t, p.a), resolver(t, p.b)];
    if (antes[i] && (antes[i][0] !== ahora[0] || antes[i][1] !== ahora[1]) && (p.pa !== null || p.pb !== null)) {
      p.pa = null;
      p.pb = null;
    }
  });
}

/** Foto de quién juega cada cruce, para comparar después de un cambio. */
export const fotoCruces = (t: Torneo) => t.partidos.filter((p) => p.r !== undefined).map((p) => [resolver(t, p.a), resolver(t, p.b)]);

/** Equipos de la lista escrita (una línea por equipo, sin vacíos ni repetidos). */
export function equiposDeTexto(texto: string): string[] {
  const vistos = new Set<string>();
  const out: string[] = [];
  for (const l of texto.split("\n")) {
    const n = l.trim().slice(0, LIMITES_TORNEO.NOMBRE);
    const k = n.toLowerCase();
    if (!n || vistos.has(k)) continue;
    vistos.add(k);
    out.push(n);
    if (out.length >= LIMITES_TORNEO.EQUIPOS) break;
  }
  return out;
}

// ── enlace para compartir ─────────────────────────────────────────────
const aB64 = (s: string) => {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};
const deB64 = (s: string) => {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
};

/** Forma compacta: solo lo necesario para reconstruir el torneo (el calendario se regenera igual). */
export function aEnlace(t: Torneo): string {
  const res = t.partidos.map((p) => (p.pa === null || p.pb === null ? "" : `${p.pa}-${p.pb}`)).join(",");
  return aB64(JSON.stringify([1, t.nombre, t.equipos, t.formato, t.pistas, t.inicio, t.duracion, t.descanso, res]));
}

export function deEnlace(s: string): Torneo | null {
  try {
    const a = JSON.parse(deB64(s));
    if (!Array.isArray(a) || a[0] !== 1) return null;
    const t = normalizarTorneo({ nombre: a[1], equipos: a[2], formato: a[3], pistas: a[4], inicio: a[5], duracion: a[6], descanso: a[7] });
    if (!t) return null;
    const res = typeof a[8] === "string" ? a[8].split(",") : [];
    t.partidos.forEach((p, i) => {
      const m = /^(\d{1,3})-(\d{1,3})$/.exec(res[i] ?? "");
      if (m) (p.pa = +m[1]), (p.pb = +m[2]);
    });
    return t;
  } catch {
    return null;
  }
}

const esObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const entero = (v: unknown, min: number, max: number, def: number) => (typeof v === "number" && Number.isFinite(v) ? Math.min(max, Math.max(min, Math.round(v))) : def);

/** Valida un torneo leído (localStorage o enlace) y regenera su calendario. Null si no vale. */
export function normalizarTorneo(raw: unknown): Torneo | null {
  if (!esObj(raw)) return null;
  const equipos = Array.isArray(raw.equipos) ? equiposDeTexto(raw.equipos.filter((x): x is string => typeof x === "string").join("\n")) : [];
  const formato = typeof raw.formato === "string" && raw.formato in FORMATOS ? (raw.formato as Formato) : "liga";
  if (problemaFormato(equipos.length, formato)) return null;
  const base = {
    v: 1 as const,
    nombre: typeof raw.nombre === "string" ? raw.nombre.trim().slice(0, 60) : "",
    equipos,
    formato,
    pistas: entero(raw.pistas, 1, LIMITES_TORNEO.PISTAS, 1),
    inicio: typeof raw.inicio === "string" && /^\d{2}:\d{2}$/.test(raw.inicio) ? raw.inicio : "10:00",
    duracion: entero(raw.duracion, 5, 120, 15),
    descanso: entero(raw.descanso, 0, 60, 5),
  };
  const t: Torneo = { ...base, partidos: generar(base) };
  // resultados guardados, por id de partido
  if (Array.isArray(raw.partidos))
    for (const rp of raw.partidos) {
      if (!esObj(rp) || typeof rp.id !== "string") continue;
      const p = t.partidos.find((x) => x.id === rp.id);
      const ok = (v: unknown) => typeof v === "number" && Number.isInteger(v) && v >= 0 && v < 1000;
      if (p && ok(rp.pa) && ok(rp.pb)) (p.pa = rp.pa as number), (p.pb = rp.pb as number);
    }
  return t;
}
