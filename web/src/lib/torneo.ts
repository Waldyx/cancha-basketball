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

export const LIMITES_TORNEO = { EQUIPOS: 32, PISTAS: 8, NOMBRE: 40 } as const;

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
  // una final entre los dos únicos equipos repetiría el partido de liga
  const minimo = f === "liga-final" ? 3 : pasan;
  if (grupos === 1 && n < minimo) return `Para ese formato hacen falta al menos ${minimo} equipos.`;
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

/**
 * Monta grupos, jornadas, cruces y el horario (cada partido en un hueco y una pista).
 * El ORDEN del array (y los ids) es el de creación: jornada a jornada y luego el cuadro. Los enlaces
 * guardan los resultados por posición, así que ese orden no puede cambiar (hay test).
 */
export function generar(t: Omit<Torneo, "partidos">): Partido[] {
  const { grupos, pasan } = FORMATOS[t.formato];
  const gs = repartirGrupos(t.equipos.length, grupos);
  const porGrupo = gs.map(jornadas);
  const pistas = Math.max(1, Math.min(LIMITES_TORNEO.PISTAS, Math.round(t.pistas) || 1));
  const partidos: Partido[] = [];
  const jornadaDe = new Map<Partido, number>();
  let n = 0;
  // jornada a jornada, intercalando los grupos
  const maxJ = Math.max(...porGrupo.map((j) => j.length));
  for (let j = 0; j < maxJ; j++)
    for (let g = 0; g < grupos; g++)
      for (const [a, b] of porGrupo[g][j] ?? []) {
        const p: Partido = { id: `p${n++}`, g, a: { e: a }, b: { e: b }, pa: null, pb: null, slot: 0, pista: 0 };
        partidos.push(p);
        jornadaDe.set(p, j);
      }
  // horario de grupos, hueco a hueco: se llenan TODAS las pistas que se pueda (un equipo nunca juega
  // dos a la vez) y, entre los partidos de las dos primeras jornadas pendientes, primero los de
  // equipos que no jugaron en el hueco anterior. Así no se queda una pista vacía para dar descanso.
  const eq = (p: Partido) => [(p.a as { e: number }).e, (p.b as { e: number }).e];
  const pendientes = [...partidos];
  let slot = 0;
  let antes = new Set<number>();
  while (pendientes.length) {
    const ahora = new Set<number>();
    const tope = jornadaDe.get(pendientes[0])! + 1;
    let pista = 0;
    for (const descansados of [true, false])
      for (let i = 0; i < pendientes.length && pista < pistas; ) {
        const p = pendientes[i];
        const [a, b] = eq(p);
        const libre = !ahora.has(a) && !ahora.has(b);
        const ok = libre && (!descansados || (jornadaDe.get(p)! <= tope && !antes.has(a) && !antes.has(b)));
        if (!ok) {
          i++;
          continue;
        }
        p.slot = slot;
        p.pista = pista++;
        ahora.add(a);
        ahora.add(b);
        pendientes.splice(i, 1);
      }
    antes = ahora;
    slot++;
  }
  if (pasan) {
    let ronda: Ref[][] = primeraRonda(grupos, pasan);
    let r = 0;
    let desde = slot;
    for (;;) {
      const ids: string[] = [];
      ronda.forEach(([a, b], i) => {
        const id = `c${r}-${i}`;
        ids.push(id);
        partidos.push({ id, r, a, b, pa: null, pb: null, slot: desde + Math.floor(i / pistas), pista: i % pistas });
      });
      desde += Math.ceil(ronda.length / pistas);
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
  const dia = Math.floor(min / 1440);
  return `${String(Math.floor(min / 60) % 24).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}${dia ? ` (+${dia} d)` : ""}`;
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
 * Clasificación de un grupo. Desempate como el de FIBA: victorias; si empatan, victorias y después
 * diferencia en los partidos ENTRE los empatados, y si eso separa a unos pero deja a otros aún
 * empatados, se vuelve a empezar SOLO con ellos (así un empate a dos acaba en su cara a cara);
 * si ya no separa a nadie, diferencia y puntos a favor de todo el grupo.
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
  const ordenar = (emp: Fila[]): Fila[] => {
    if (emp.length < 2) return emp;
    const set = new Set(emp.map((f) => f.e));
    const mini = new Map(emp.map((f) => [f.e, filaVacia(f.e)]));
    sumar(mini, ps.filter((p) => "e" in p.a && "e" in p.b && set.has(p.a.e) && set.has(p.b.e)));
    for (const clave of [(m: Fila) => m.g, dif]) {
      const trozos = new Map<number, Fila[]>();
      for (const f of emp) {
        const k = clave(mini.get(f.e)!);
        trozos.set(k, [...(trozos.get(k) ?? []), f]);
      }
      if (trozos.size > 1) return [...trozos.keys()].sort((a, b) => b - a).flatMap((k) => ordenar(trozos.get(k)!));
    }
    return [...emp].sort((x, y) => dif(y) - dif(x) || y.pf - x.pf || x.e - y.e);
  };
  return [...porVictorias.keys()].sort((a, b) => b - a).flatMap((v) => ordenar(porVictorias.get(v)!));
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
export const equiposDeTexto = (texto: string): string[] => leerEquipos(texto).equipos;

/** Igual, y además qué líneas se han quedado fuera o recortadas, para avisar (nada desaparece en silencio). */
export function leerEquipos(texto: string): { equipos: string[]; avisos: string[] } {
  const vistos = new Set<string>();
  const out: string[] = [];
  const avisos: string[] = [];
  for (const l of texto.split("\n")) {
    const bruto = l.trim();
    if (!bruto) continue;
    if (out.length >= LIMITES_TORNEO.EQUIPOS) {
      avisos.push(`Como mucho ${LIMITES_TORNEO.EQUIPOS} equipos: desde «${bruto}» se quedan fuera.`);
      break;
    }
    const n = bruto.slice(0, LIMITES_TORNEO.NOMBRE);
    if (n !== bruto) avisos.push(`«${bruto}» es muy largo: queda como «${n}».`);
    const k = n.toLowerCase();
    if (vistos.has(k)) {
      avisos.push(`«${n}» está repetido: cuenta una sola vez.`);
      continue;
    }
    vistos.add(k);
    out.push(n);
  }
  return { equipos: out, avisos };
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
    inicio: typeof raw.inicio === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(raw.inicio) ? raw.inicio : "10:00",
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
