// Lógica PURA de la pizarra táctica (/pizarra): modelo de datos, geometría de la
// pista FIBA, operaciones sobre jugadas, historial (deshacer/rehacer), interpolación
// de la animación, validación de entrada no confiable y codificación del enlace.
// Nada de DOM aquí: todo se puede probar con vitest en Node.
//
// Sistema de coordenadas ("canónico"): metros sobre la pista completa, x a lo largo
// (0..28) e y a lo ancho (0..15). Las canastas están en x = 1,575 y x = 26,425.
// La media pista es x ∈ [0, 14] (canasta en x = 1,575). La orientación vertical es
// solo una ROTACIÓN de la vista (aVista/deVista); los datos no cambian.

export const CANCHA = {
  LARGO: 28,
  ANCHO: 15,
  MEDIA: 14,
  ARO_X: 1.575,
  /** Margen visible alrededor de la pista (fuera de banda: saques, entrenador). */
  MARGEN: 2,
} as const;

export interface Pt {
  x: number;
  y: number;
}

export type Cancha = "media" | "completa";
/** FIBA (28×15, aro a 3,05 m) o minibasket (aro a 2,60 m, sin línea de 3, tiro libre a 4 m). */
export type Pista = "fiba" | "mini";
export type Orient = "h" | "v";
/**
 * atq/def: jugadores numerados · balon · cono · neu: jugador neutro de ejercicio (verde, sin
 * número o con letra) · ent: entrenador · fila: cola de jugadores esperando turno.
 * El ORDEN de este array es parte del formato del enlace: solo se añade al final.
 */
export type TipoPieza = "atq" | "def" | "balon" | "cono" | "neu" | "ent" | "fila";
/** "rotacion" = adónde va el jugador DESPUÉS (no mueve a la pieza en la animación). */
export type TipoLinea = "pase" | "bote" | "corte" | "bloqueo" | "tiro" | "libre" | "rotacion";
export type Bando = "atq" | "def" | "neu";
export type FormaZona = "rect" | "elipse";
export type Categoria =
  | "ataque"
  | "defensa"
  | "saque-banda"
  | "saque-fondo"
  | "contraataque"
  | "presion"
  | "ejercicio";

export const CATEGORIAS: { id: Categoria; label: string }[] = [
  { id: "ataque", label: "Ataque" },
  { id: "defensa", label: "Defensa" },
  { id: "saque-banda", label: "Saque de banda" },
  { id: "saque-fondo", label: "Saque de fondo" },
  { id: "contraataque", label: "Contraataque" },
  { id: "presion", label: "Presión" },
  { id: "ejercicio", label: "Ejercicio" },
];

export const TIPOS_PIEZA: TipoPieza[] = ["atq", "def", "balon", "cono", "neu", "ent", "fila"];
export const TIPOS_LINEA: TipoLinea[] = ["pase", "bote", "corte", "bloqueo", "tiro", "libre", "rotacion"];
export const BANDOS: Bando[] = ["atq", "def", "neu"];
export const FORMAS_ZONA: FormaZona[] = ["rect", "elipse"];
export const PISTAS: Pista[] = ["fiba", "mini"];

export interface Pieza {
  id: string;
  tipo: TipoPieza;
  etiqueta: string;
  x: number;
  y: number;
  /** Nombre corto del jugador (opcional). */
  nombre?: string;
  /** Solo "fila": cuántos jugadores hay en la cola (se dibujan hasta 4). */
  cant?: number;
  /** Solo "fila": hacia dónde mira la cabeza de la cola, en grados (0 = +x canónico). */
  ang?: number;
  /** Solo "fila": color de los jugadores de la cola. */
  bando?: Bando;
}

/** Espacio sombreado (rectángulo o elipse) para marcar una zona de trabajo. x,y = centro. */
export interface Zona {
  id: string;
  forma: FormaZona;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Linea {
  id: string;
  tipo: TipoLinea;
  /** Rectas: [inicio, fin]. Trazo libre: todos los puntos. */
  pts: Pt[];
  /** Punto POR EL QUE pasa la curva en su mitad (si no hay, la línea es recta). */
  mid?: Pt;
  /** Pieza de la que sale (el movimiento/bote es de esa pieza). */
  ref?: string;
  /** Pieza a la que llega (pases). */
  fin?: string;
}

export interface Texto {
  id: string;
  x: number;
  y: number;
  texto: string;
  /** 1 pequeño · 2 normal · 3 grande */
  tam: number;
}

export interface Paso {
  piezas: Pieza[];
  lineas: Linea[];
  textos: Texto[];
  nota: string;
  zonas?: Zona[];
}

export interface Jugada {
  v: 1;
  id: string;
  nombre: string;
  categoria: Categoria;
  notas: string;
  cancha: Cancha;
  /** Ausente = FIBA. */
  pista?: Pista;
  orient: Orient;
  pasos: Paso[];
  actualizada: number;
}

export const LIMITES = {
  PASOS: 40,
  PIEZAS: 40,
  LINEAS: 100,
  PUNTOS: 400,
  TEXTOS: 40,
  NOMBRE: 80,
  NOTAS: 2000,
  NOTA_PASO: 400,
  ETIQUETA: 4,
  ZONAS: 20,
  NOMBRE_JUGADOR: 12,
  FILA_MAX: 15,
  TEXTO: 120,
  BIBLIOTECA: 300,
} as const;

// ─── utilidades ─────────────────────────────────────────────────────────

export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
export const redondea = (v: number, d = 2) => {
  const f = 10 ** d;
  return Math.round(v * f) / f;
};

let contador = 0;
export function uid(): string {
  contador = (contador + 1) % 1679616;
  return (
    Math.floor(Math.random() * 46656).toString(36).padStart(3, "0") + contador.toString(36).padStart(2, "0")
  );
}

export function clonar<T>(o: T): T {
  return JSON.parse(JSON.stringify(o)) as T;
}

// ─── geometría de vista ─────────────────────────────────────────────────

export const largoCancha = (c: Cancha) => (c === "media" ? CANCHA.MEDIA : CANCHA.LARGO);

export interface Caja {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** viewBox del SVG (en coordenadas de vista, ya rotadas si es vertical). */
export function cajaVista(c: Cancha, o: Orient): Caja {
  const m = CANCHA.MARGEN;
  const L = largoCancha(c);
  return o === "h"
    ? { x: -m, y: -m, w: L + 2 * m, h: CANCHA.ANCHO + 2 * m }
    : { x: -m, y: -m, w: CANCHA.ANCHO + 2 * m, h: L + 2 * m };
}

/** canónico -> vista. Vertical = giro de 90° (conserva la lateralidad). */
export function aVista(p: Pt, o: Orient): Pt {
  return o === "h" ? { x: p.x, y: p.y } : { x: CANCHA.ANCHO - p.y, y: p.x };
}

/** vista -> canónico (inversa exacta de aVista). */
export function deVista(p: Pt, o: Orient): Pt {
  return o === "h" ? { x: p.x, y: p.y } : { x: p.y, y: CANCHA.ANCHO - p.x };
}

export function limitaPunto(p: Pt, c: Cancha): Pt {
  const m = CANCHA.MARGEN - 0.4;
  return {
    x: clamp(p.x, -m, largoCancha(c) + m),
    y: clamp(p.y, -m, CANCHA.ANCHO + m),
  };
}

// ─── trazos de la pista FIBA ────────────────────────────────────────────

export type RolTrazo = "linea" | "discontinua" | "pintura" | "aro" | "tablero";

export interface TrazoCancha {
  d: string;
  rol: RolTrazo;
}

const n = (v: number) => String(redondea(v, 3));

/**
 * Medidas del MINIBASKET (U12) que dibuja la pista "mini". Decisiones y por qué:
 *  - La pista sigue siendo de 28 × 15 m (la reglamentaria; hay pabellones de 24 × 13 a
 *    28 × 15). No se reduce el tamaño porque todo el sistema de coordenadas (jugadas
 *    guardadas, enlaces y plantillas) está en metros sobre 28 × 15; así una jugada se
 *    puede pasar de FIBA a minibasket sin recolocar nada.
 *  - Sin línea de 3 puntos: en minibasket no existe (los tiros valen 1 y 2).
 *  - Línea de tiros libres a 4,00 m de la línea de fondo (medida desde el borde interior,
 *    igual que los 5,80 m de FIBA) y zona de 4,90 m de ancho, el semicírculo de 1,80 m y la
 *    zona de no carga de 1,25 m. Si tu federación mide los 4 m desde el aro, la línea
 *    queda 1,6 m más lejos: ajusta ZONA_LARGO.
 *  - El aro está a 2,60 m en lugar de 3,05 m: no se dibuja (es una altura), pero va en
 *    la etiqueta del selector de pista.
 */
export const MINIBASKET = { ZONA_LARGO: 4.0, ALTURA_ARO: 2.6 } as const;

/**
 * Trazos de la pista en coordenadas canónicas (path SVG). Medidas FIBA:
 * 28×15 m, línea de 3 a 6,75 m (esquinas a 0,90 m de la banda), zona rectangular
 * de 4,90 m × 5,80 m, semicírculo de tiro libre de 1,80 m y semicírculo de no
 * carga de 1,25 m. `completa` dibuja las dos mitades. Con `pista = "mini"` la zona
 * llega a 4,00 m y NO hay línea de 3 (ver MINIBASKET).
 */
export function trazosCancha(c: Cancha, pista: Pista = "fiba"): TrazoCancha[] {
  const L = largoCancha(c);
  const t: TrazoCancha[] = [];
  const W = CANCHA.ANCHO;
  const cy = W / 2;
  const mini = pista === "mini";
  const zl = mini ? MINIBASKET.ZONA_LARGO : 5.8;
  t.push({ d: `M0,0 H${L} V${W} H0 Z`, rol: "linea" });

  if (c === "completa") {
    t.push({ d: `M14,0 V${W}`, rol: "linea" });
    t.push({ d: `M14,${n(cy - 1.8)} A1.8,1.8 0 1 1 14,${n(cy + 1.8)} A1.8,1.8 0 1 1 14,${n(cy - 1.8)} Z`, rol: "linea" });
  } else {
    t.push({ d: `M14,${n(cy - 1.8)} A1.8,1.8 0 0 0 14,${n(cy + 1.8)}`, rol: "linea" });
  }

  const lados = c === "completa" ? [false, true] : [false];
  for (const esp of lados) {
    const f = (x: number) => n(esp ? CANCHA.LARGO - x : x);
    const barrido = (s: 0 | 1) => (esp ? (s === 1 ? 0 : 1) : s);
    const ax = CANCHA.ARO_X;
    // zona (relleno) y sus líneas
    t.push({ d: `M${f(0)},5.05 H${f(zl)} V9.95 H${f(0)} Z`, rol: "pintura" });
    t.push({ d: `M${f(0)},5.05 H${f(zl)} V9.95 H${f(0)}`, rol: "linea" });
    // semicírculo de tiros libres: mitad exterior continua, interior discontinua
    t.push({ d: `M${f(zl)},${n(cy - 1.8)} A1.8,1.8 0 0 ${barrido(1)} ${f(zl)},${n(cy + 1.8)}`, rol: "linea" });
    t.push({ d: `M${f(zl)},${n(cy - 1.8)} A1.8,1.8 0 0 ${barrido(0)} ${f(zl)},${n(cy + 1.8)}`, rol: "discontinua" });
    // línea de 3: rectas a 0,90 m de banda + arco de 6,75 m (no existe en minibasket)
    if (!mini) {
      const dy = cy - 0.9;
      const dx = Math.sqrt(6.75 * 6.75 - dy * dy);
      const xe = ax + dx;
      t.push({
        d: `M${f(0)},0.9 H${f(xe)} A6.75,6.75 0 0 ${barrido(1)} ${f(xe)},${n(W - 0.9)} H${f(0)}`,
        rol: "linea",
      });
    }
    // semicírculo de no carga, unido al tablero por rectas de 0,375 m
    t.push({
      d: `M${f(1.2)},${n(cy - 1.25)} H${f(ax)} A1.25,1.25 0 0 ${barrido(1)} ${f(ax)},${n(cy + 1.25)} H${f(1.2)}`,
      rol: "linea",
    });
    // tablero, soporte y aro
    t.push({ d: `M${f(1.2)},${n(cy - 0.9)} V${n(cy + 0.9)}`, rol: "tablero" });
    t.push({ d: `M${f(1.2)},${n(cy)} H${f(ax - 0.225)}`, rol: "tablero" });
    const r = 0.225;
    t.push({
      d: `M${f(ax - r)},${n(cy)} A${r},${r} 0 1 1 ${f(ax + r)},${n(cy)} A${r},${r} 0 1 1 ${f(ax - r)},${n(cy)} Z`,
      rol: "aro",
    });
  }
  return t;
}

// ─── geometría de líneas ────────────────────────────────────────────────

export const dist = (a: Pt, b: Pt) => Math.hypot(a.x - b.x, a.y - b.y);

/** Punto de control de la cuadrática que pasa por `mid` en t = 0,5. */
export function controlDeMid(a: Pt, b: Pt, mid: Pt): Pt {
  return { x: 2 * mid.x - (a.x + b.x) / 2, y: 2 * mid.y - (a.y + b.y) / 2 };
}

/** Polilínea (canónica) que dibuja la línea: recta, curva muestreada o trazo libre. */
export function polilinea(l: Linea, muestras = 24): Pt[] {
  if (l.pts.length < 2) return l.pts.slice();
  if (l.tipo === "libre" || !l.mid || l.pts.length !== 2) return l.pts.slice();
  const a = l.pts[0];
  const b = l.pts[1];
  const c = controlDeMid(a, b, l.mid);
  const out: Pt[] = [];
  for (let i = 0; i <= muestras; i++) {
    const t = i / muestras;
    const u = 1 - t;
    out.push({
      x: u * u * a.x + 2 * u * t * c.x + t * t * b.x,
      y: u * u * a.y + 2 * u * t * c.y + t * t * b.y,
    });
  }
  return out;
}

export function longitud(pts: Pt[]): number {
  let s = 0;
  for (let i = 1; i < pts.length; i++) s += dist(pts[i - 1], pts[i]);
  return s;
}

export function puntoEnLong(pts: Pt[], d: number): Pt {
  if (pts.length === 0) return { x: 0, y: 0 };
  if (d <= 0 || pts.length === 1) return { ...pts[0] };
  let resto = d;
  for (let i = 1; i < pts.length; i++) {
    const seg = dist(pts[i - 1], pts[i]);
    if (resto <= seg && seg > 0) {
      const t = resto / seg;
      return {
        x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * t,
        y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * t,
      };
    }
    resto -= seg;
  }
  return { ...pts[pts.length - 1] };
}

/** Dirección unitaria al final de la polilínea (para la punta de flecha). */
export function direccionFinal(pts: Pt[]): Pt {
  for (let i = pts.length - 1; i > 0; i--) {
    const d = dist(pts[i - 1], pts[i]);
    if (d > 1e-6) return { x: (pts[i].x - pts[i - 1].x) / d, y: (pts[i].y - pts[i - 1].y) / d };
  }
  return { x: 1, y: 0 };
}

/** Recorta `ini` metros del principio y `fin` del final (sin invertir la línea). */
export function recorta(pts: Pt[], ini: number, fin: number): Pt[] {
  const L = longitud(pts);
  if (pts.length < 2 || L <= ini + fin + 0.05) return pts.slice();
  const out: Pt[] = [puntoEnLong(pts, ini)];
  let acum = 0;
  for (let i = 1; i < pts.length; i++) {
    acum += dist(pts[i - 1], pts[i]);
    if (acum > ini && acum < L - fin) out.push({ ...pts[i] });
  }
  out.push(puntoEnLong(pts, L - fin));
  return out;
}

/** Zigzag perpendicular a la línea (símbolo del bote). Acaba en recto 0,9 m. */
export function zigzag(pts: Pt[], amp = 0.32, paso = 0.62): Pt[] {
  const L = longitud(pts);
  if (pts.length < 2 || L < 1.6) return pts.slice();
  const cola = 0.9;
  const out: Pt[] = [{ ...pts[0] }];
  let signo = 1;
  for (let s = paso; s < L - cola; s += paso) {
    const p = puntoEnLong(pts, s);
    const q = puntoEnLong(pts, Math.min(L, s + 0.05));
    const dx = q.x - p.x;
    const dy = q.y - p.y;
    const dd = Math.hypot(dx, dy) || 1;
    out.push({ x: p.x - (dy / dd) * amp * signo, y: p.y + (dx / dd) * amp * signo });
    signo = -signo;
  }
  out.push(puntoEnLong(pts, L - cola));
  out.push({ ...pts[pts.length - 1] });
  return out;
}

/** Triángulo de la punta de flecha con la punta en `tip` y mirando hacia `dir`. */
export function puntaFlecha(tip: Pt, dir: Pt, largo = 0.62, ancho = 0.34): [Pt, Pt, Pt] {
  const bx = tip.x - dir.x * largo;
  const by = tip.y - dir.y * largo;
  return [
    { x: tip.x, y: tip.y },
    { x: bx - dir.y * ancho, y: by + dir.x * ancho },
    { x: bx + dir.y * ancho, y: by - dir.x * ancho },
  ];
}

export function distASegmento(p: Pt, a: Pt, b: Pt): number {
  const vx = b.x - a.x;
  const vy = b.y - a.y;
  const l2 = vx * vx + vy * vy;
  if (l2 === 0) return dist(p, a);
  const t = clamp(((p.x - a.x) * vx + (p.y - a.y) * vy) / l2, 0, 1);
  return dist(p, { x: a.x + vx * t, y: a.y + vy * t });
}

export function distAPolilinea(p: Pt, pts: Pt[]): number {
  let m = Infinity;
  for (let i = 1; i < pts.length; i++) m = Math.min(m, distASegmento(p, pts[i - 1], pts[i]));
  return pts.length === 1 ? dist(p, pts[0]) : m;
}

/** Douglas-Peucker: simplifica el trazo libre antes de guardarlo. */
export function simplifica(pts: Pt[], eps = 0.12): Pt[] {
  if (pts.length < 3) return pts.slice();
  let maxD = 0;
  let idx = 0;
  const a = pts[0];
  const b = pts[pts.length - 1];
  for (let i = 1; i < pts.length - 1; i++) {
    const d = distASegmento(pts[i], a, b);
    if (d > maxD) {
      maxD = d;
      idx = i;
    }
  }
  if (maxD <= eps) return [a, b];
  const izq = simplifica(pts.slice(0, idx + 1), eps);
  const der = simplifica(pts.slice(idx), eps);
  return izq.slice(0, -1).concat(der);
}

// ─── construcción de jugadas ────────────────────────────────────────────

export function pasoVacio(): Paso {
  return { piezas: [], lineas: [], textos: [], nota: "", zonas: [] };
}

export function nuevaJugada(partes: Partial<Jugada> = {}): Jugada {
  return {
    v: 1,
    id: uid(),
    nombre: "Jugada sin título",
    categoria: "ataque",
    notas: "",
    cancha: "media",
    orient: "v",
    pasos: [pasoVacio()],
    actualizada: Date.now(),
    ...partes,
  };
}

/** Siguiente etiqueta libre: atacantes 1..N, defensores X1..XN (hasta 15 por color). */
export function siguienteEtiqueta(paso: Paso, tipo: TipoPieza): string {
  if (tipo === "ent") return "E";
  if (tipo !== "atq" && tipo !== "def") return "";
  const usadas = new Set(paso.piezas.filter((p) => p.tipo === tipo).map((p) => p.etiqueta));
  for (let i = 1; i <= 15; i++) {
    const e = tipo === "atq" ? String(i) : `X${i}`;
    if (!usadas.has(e)) return e;
  }
  return "";
}

/** Todos los pasos son piezas del MISMO id: la identidad se conserva entre pasos. */
export function anadirPieza(
  j: Jugada,
  k: number,
  tipo: TipoPieza,
  pos: Pt,
  etiqueta?: string,
  extra: Partial<Pick<Pieza, "cant" | "ang" | "bando" | "nombre">> = {}
): { jugada: Jugada; id: string } {
  const out = clonar(j);
  const id = uid();
  const p = limitaPunto(pos, out.cancha);
  const et = etiqueta ?? siguienteEtiqueta(out.pasos[k], tipo);
  for (let i = k; i < out.pasos.length; i++) {
    if (out.pasos[i].piezas.length >= LIMITES.PIEZAS) continue;
    const pz: Pieza = { id, tipo, etiqueta: et.slice(0, LIMITES.ETIQUETA), x: redondea(p.x), y: redondea(p.y) };
    if (tipo === "fila") {
      pz.cant = clamp(Math.round(extra.cant ?? 4), 1, LIMITES.FILA_MAX);
      pz.ang = normalizaAngulo(extra.ang ?? 0);
      pz.bando = extra.bando ?? "neu";
    }
    if (extra.nombre) pz.nombre = limpiaTexto(extra.nombre, LIMITES.NOMBRE_JUGADOR);
    out.pasos[i].piezas.push(pz);
  }
  return { jugada: out, id };
}

export const normalizaAngulo = (a: number): number => ((Math.round(a) % 360) + 360) % 360;

/** Separación (m) entre los jugadores de una fila y radio con que se dibujan. */
export const FILA = { SEPARACION: 1.0, RADIO: 0.45, DIBUJADOS: 4 } as const;

/** Centros de los jugadores dibujados de una fila: la cabeza en la pieza y el resto detrás. */
export function puestosFila(pz: Pieza): Pt[] {
  const n = clamp(Math.round(pz.cant ?? 4), 1, FILA.DIBUJADOS);
  const a = ((pz.ang ?? 0) * Math.PI) / 180;
  const out: Pt[] = [];
  for (let i = 0; i < n; i++) {
    out.push({ x: pz.x - Math.cos(a) * i * FILA.SEPARACION, y: pz.y - Math.sin(a) * i * FILA.SEPARACION });
  }
  return out;
}

/** Cambia cualquier dato de la pieza en TODOS los pasos (identidad compartida). */
export function ajustarPieza(j: Jugada, id: string, cambios: Partial<Pick<Pieza, "etiqueta" | "nombre" | "cant" | "ang" | "bando">>): Jugada {
  const out = clonar(j);
  for (const s of out.pasos) {
    for (const p of s.piezas) {
      if (p.id !== id) continue;
      if (cambios.etiqueta !== undefined) p.etiqueta = limpiaTexto(cambios.etiqueta, LIMITES.ETIQUETA);
      if (cambios.nombre !== undefined) {
        const nm = limpiaTexto(cambios.nombre, LIMITES.NOMBRE_JUGADOR).trim();
        if (nm) p.nombre = nm;
        else delete p.nombre;
      }
      if (p.tipo === "fila") {
        if (cambios.cant !== undefined) p.cant = clamp(Math.round(cambios.cant), 1, LIMITES.FILA_MAX);
        if (cambios.ang !== undefined) p.ang = normalizaAngulo(cambios.ang);
        if (cambios.bando !== undefined && BANDOS.includes(cambios.bando)) p.bando = cambios.bando;
      }
    }
  }
  return out;
}

// ─── zonas sombreadas ───────────────────────────────────────────────────

export const ZONA_MIN = 0.8;
export const ZONA_MAX = 30;

export function anadirZona(j: Jugada, k: number, z: Omit<Zona, "id">): { jugada: Jugada; id: string } {
  const out = clonar(j);
  const id = uid();
  const s = out.pasos[k];
  s.zonas = s.zonas ?? [];
  if (s.zonas.length < LIMITES.ZONAS) {
    const c = limitaPunto(z, out.cancha);
    s.zonas.push({
      id,
      forma: z.forma,
      x: redondea(c.x),
      y: redondea(c.y),
      w: redondea(clamp(z.w, ZONA_MIN, ZONA_MAX)),
      h: redondea(clamp(z.h, ZONA_MIN, ZONA_MAX)),
    });
  }
  return { jugada: out, id };
}

export function quitarZona(j: Jugada, k: number, id: string): Jugada {
  const out = clonar(j);
  out.pasos[k].zonas = (out.pasos[k].zonas ?? []).filter((z) => z.id !== id);
  return out;
}

/** Rectángulo (en canónico) que cubre la zona: para dibujarla y para el asa de tamaño. */
export function cajaZona(z: Zona): { x0: number; y0: number; x1: number; y1: number } {
  return { x0: z.x - z.w / 2, y0: z.y - z.h / 2, x1: z.x + z.w / 2, y1: z.y + z.h / 2 };
}

export function puntoEnZona(p: Pt, z: Zona): boolean {
  const dx = Math.abs(p.x - z.x);
  const dy = Math.abs(p.y - z.y);
  if (z.forma === "rect") return dx <= z.w / 2 && dy <= z.h / 2;
  return (dx / (z.w / 2)) ** 2 + (dy / (z.h / 2)) ** 2 <= 1;
}

/** Zona definida arrastrando de una esquina a la opuesta. */
export function zonaDesdeEsquinas(forma: FormaZona, a: Pt, b: Pt): Omit<Zona, "id"> {
  return {
    forma,
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
    w: clamp(Math.abs(b.x - a.x), ZONA_MIN, ZONA_MAX),
    h: clamp(Math.abs(b.y - a.y), ZONA_MIN, ZONA_MAX),
  };
}

/** Con un clic sin arrastre: tamaño por defecto centrado en el punto. */
export const ZONA_POR_DEFECTO = { w: 4, h: 3 } as const;

/** Mueve una pieza SOLO en el paso dado (muta el paso: se usa sobre un clon). */
export function moverPiezaEn(paso: Paso, id: string, pos: Pt): void {
  const pz = paso.piezas.find((p) => p.id === id);
  if (!pz) return;
  const dx = pos.x - pz.x;
  const dy = pos.y - pz.y;
  pz.x = pos.x;
  pz.y = pos.y;
  // las líneas pegadas a la pieza la siguen: el inicio (ref) o el final (fin)
  for (const l of paso.lineas) {
    if (l.tipo === "libre") continue;
    const ini = l.pts[0];
    const fin = l.pts[l.pts.length - 1];
    if (l.ref === id) {
      ini.x += dx;
      ini.y += dy;
      if (l.mid) {
        l.mid = { x: l.mid.x + dx / 2, y: l.mid.y + dy / 2 };
      }
    }
    if (l.fin === id) {
      fin.x += dx;
      fin.y += dy;
      if (l.mid) {
        l.mid = { x: l.mid.x + dx / 2, y: l.mid.y + dy / 2 };
      }
    }
  }
}

/** Quita la pieza de este paso y de los siguientes (en los anteriores sigue existiendo). */
export function quitarPieza(j: Jugada, k: number, id: string): Jugada {
  const out = clonar(j);
  for (let i = k; i < out.pasos.length; i++) {
    const s = out.pasos[i];
    s.piezas = s.piezas.filter((p) => p.id !== id);
    for (const l of s.lineas) {
      if (l.ref === id) delete l.ref;
      if (l.fin === id) delete l.fin;
    }
  }
  return out;
}

/** La etiqueta es identidad de la pieza: se cambia en todos los pasos. */
export function renombrarPieza(j: Jugada, id: string, etiqueta: string): Jugada {
  const out = clonar(j);
  const et = limpiaTexto(etiqueta, LIMITES.ETIQUETA);
  for (const s of out.pasos) for (const p of s.piezas) if (p.id === id) p.etiqueta = et;
  return out;
}

export function anadirLinea(j: Jugada, k: number, l: Omit<Linea, "id">): { jugada: Jugada; id: string } {
  const out = clonar(j);
  const id = uid();
  if (out.pasos[k].lineas.length < LIMITES.LINEAS) {
    out.pasos[k].lineas.push({ ...clonar(l), id });
  }
  return { jugada: out, id };
}

export function quitarLinea(j: Jugada, k: number, id: string): Jugada {
  const out = clonar(j);
  out.pasos[k].lineas = out.pasos[k].lineas.filter((l) => l.id !== id);
  return out;
}

export function anadirTexto(j: Jugada, k: number, pos: Pt, texto = "Texto"): { jugada: Jugada; id: string } {
  const out = clonar(j);
  const id = uid();
  const p = limitaPunto(pos, out.cancha);
  if (out.pasos[k].textos.length < LIMITES.TEXTOS) {
    out.pasos[k].textos.push({ id, x: redondea(p.x), y: redondea(p.y), texto: texto.slice(0, LIMITES.TEXTO), tam: 2 });
  }
  return { jugada: out, id };
}

export function quitarTexto(j: Jugada, k: number, id: string): Jugada {
  const out = clonar(j);
  out.pasos[k].textos = out.pasos[k].textos.filter((t) => t.id !== id);
  return out;
}

/** Líneas que MUEVEN a la pieza que las tiene como `ref` (el que bloquea camina hasta el bloqueo). */
const TIPOS_MOV: TipoLinea[] = ["corte", "bote", "bloqueo"];
/** Radio (m) en el que un balón se considera "en manos" de una pieza o línea. */
const RADIO_BALON = 1.3;
/** Dónde queda el balón respecto al jugador que lo tiene (para que no tape su número). */
const BALON_JUNTO: Pt = { x: 0.5, y: 0.4 };

/** Jugador (atacante o defensor) que lleva el balón: el más cercano a menos de RADIO_BALON. */
export function portadorDe(paso: Paso, balon: Pieza): Pieza | undefined {
  let mejor: Pieza | undefined;
  let md = RADIO_BALON;
  for (const p of paso.piezas) {
    if (p.tipo !== "atq" && p.tipo !== "def") continue;
    const d = dist(p, balon);
    if (d <= md) {
      md = d;
      mejor = p;
    }
  }
  return mejor;
}

/** ¿Tiene este jugador el balón en las manos? (un balón suyo, y no de otro más cercano) */
export function tieneBalon(paso: Paso, pz: Pieza): boolean {
  if (pz.tipo !== "atq" && pz.tipo !== "def") return false;
  return paso.piezas.some((b) => b.tipo === "balon" && portadorDe(paso, b)?.id === pz.id);
}

/**
 * Línea que se dibuja por defecto al arrastrar DESDE una pieza (modo tiempo muerto):
 * jugador con balón -> bote (o pase si suelta sobre un compañero); jugador sin balón ->
 * desplazamiento; el propio balón -> pase, que sale de quien lo lleva.
 */
export function flechaPorDefecto(
  paso: Paso,
  pz: Pieza,
  destino?: Pt
): { tipo: "pase" | "bote" | "corte"; origen: Pieza } {
  const sobreJugador = (): boolean =>
    !!destino && paso.piezas.some((p) => p.tipo === pz.tipo && p.id !== pz.id && dist(p, destino) <= 0.95);
  if (pz.tipo === "balon") {
    return { tipo: "pase", origen: portadorDe(paso, pz) ?? pz };
  }
  if (tieneBalon(paso, pz)) return { tipo: sobreJugador() ? "pase" : "bote", origen: pz };
  return { tipo: "corte", origen: pz };
}

function lineaDeMovimiento(paso: Paso, pz: Pieza): Linea | undefined {
  return paso.lineas.find((l) => l.ref === pz.id && TIPOS_MOV.includes(l.tipo) && l.pts.length >= 2);
}

/**
 * Trayectoria (polilínea canónica) que sigue una pieza de este paso al siguiente,
 * o null si debe interpolar en recta:
 *  1. una línea de corte/bote asignada a la pieza;
 *  2. el balón sigue al pase que sale de donde está, o al bote del jugador que lo lleva.
 */
export function trayectoria(paso: Paso, pz: Pieza): Pt[] | null {
  const mov = lineaDeMovimiento(paso, pz);
  if (mov) return conInicio(polilinea(mov), pz);
  if (pz.tipo === "balon") {
    const cerca = (l: Linea) => dist(l.pts[0], pz) <= RADIO_BALON;
    const pase = paso.lineas.find((l) => l.tipo === "pase" && l.pts.length >= 2 && cerca(l));
    if (pase) {
      const pts = polilinea(pase);
      // el balón llega a la mano del receptor, no encima de su número
      if (pase.fin) {
        const u = pts[pts.length - 1];
        pts[pts.length - 1] = { x: u.x + BALON_JUNTO.x, y: u.y + BALON_JUNTO.y };
      }
      return conInicio(pts, pz);
    }
    const bote = paso.lineas.find((l) => l.tipo === "bote" && l.pts.length >= 2 && cerca(l));
    if (bote) {
      const pts = polilinea(bote);
      const dx = pz.x - pts[0].x;
      const dy = pz.y - pts[0].y;
      return pts.map((p) => ({ x: p.x + dx, y: p.y + dy }));
    }
  }
  return null;
}

function conInicio(pts: Pt[], pz: Pieza): Pt[] {
  if (dist(pts[0], pz) < 0.01) return pts;
  return [{ x: pz.x, y: pz.y }, ...pts];
}

/** Dónde acaba cada pieza si se siguen las líneas del paso. */
export function avanzarPiezas(paso: Paso): Pieza[] {
  return paso.piezas.map((pz) => {
    const tr = trayectoria(paso, pz);
    if (!tr) return { ...pz };
    const fin = tr[tr.length - 1];
    return { ...pz, x: redondea(fin.x), y: redondea(fin.y) };
  });
}

/** Paso nuevo tras el `k`: las piezas parten de donde acabaron en el anterior. */
export function insertarPaso(j: Jugada, k: number): Jugada {
  const out = clonar(j);
  if (out.pasos.length >= LIMITES.PASOS) return out;
  const nuevo: Paso = { piezas: avanzarPiezas(out.pasos[k]), lineas: [], textos: [], nota: "", zonas: [] };
  out.pasos.splice(k + 1, 0, nuevo);
  return out;
}

export function duplicarPaso(j: Jugada, k: number): Jugada {
  const out = clonar(j);
  if (out.pasos.length >= LIMITES.PASOS) return out;
  out.pasos.splice(k + 1, 0, clonar(out.pasos[k]));
  return out;
}

/** Con un solo paso no se borra: se vacía. */
export function quitarPaso(j: Jugada, k: number): Jugada {
  const out = clonar(j);
  if (out.pasos.length <= 1) {
    out.pasos[0] = { ...out.pasos[0], lineas: [], textos: [], nota: "", zonas: [] };
    return out;
  }
  out.pasos.splice(k, 1);
  return out;
}

export function limpiarPaso(j: Jugada, k: number, todo: boolean): Jugada {
  const out = clonar(j);
  const s = out.pasos[k];
  s.lineas = [];
  s.textos = [];
  s.zonas = [];
  if (todo) s.piezas = [];
  return out;
}

/** Cambia de media a completa pista (o al revés) recolocando lo que quede fuera. */
export function cambiarCancha(j: Jugada, cancha: Cancha): Jugada {
  const out = clonar(j);
  out.cancha = cancha;
  for (const s of out.pasos) {
    for (const p of s.piezas) Object.assign(p, limitaPunto(p, cancha));
    for (const t of s.textos) Object.assign(t, limitaPunto(t, cancha));
    for (const z of s.zonas ?? []) Object.assign(z, limitaPunto(z, cancha));
    for (const l of s.lineas) {
      l.pts = l.pts.map((p) => limitaPunto(p, cancha));
      if (l.mid) l.mid = limitaPunto(l.mid, cancha);
    }
  }
  return out;
}

export function cambiarPista(j: Jugada, pista: Pista): Jugada {
  const out = clonar(j);
  if (pista === "mini") out.pista = "mini";
  else delete out.pista;
  return out;
}

// ─── historial (deshacer / rehacer) ─────────────────────────────────────

export interface Historial<T> {
  pasado: T[];
  presente: T;
  futuro: T[];
}

const MAX_HISTORIAL = 100;

export function nuevoHistorial<T>(inicial: T): Historial<T> {
  return { pasado: [], presente: inicial, futuro: [] };
}

export function confirmar<T>(h: Historial<T>, nuevo: T): Historial<T> {
  const pasado = [...h.pasado, h.presente];
  if (pasado.length > MAX_HISTORIAL) pasado.shift();
  return { pasado, presente: nuevo, futuro: [] };
}

export function deshacer<T>(h: Historial<T>): Historial<T> {
  if (h.pasado.length === 0) return h;
  const pasado = h.pasado.slice(0, -1);
  return { pasado, presente: h.pasado[h.pasado.length - 1], futuro: [h.presente, ...h.futuro] };
}

export function rehacer<T>(h: Historial<T>): Historial<T> {
  if (h.futuro.length === 0) return h;
  const [presente, ...futuro] = h.futuro;
  return { pasado: [...h.pasado, h.presente], presente, futuro };
}

// ─── animación ──────────────────────────────────────────────────────────

export const easeInOut = (t: number) => {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
};

/**
 * Posiciones de las piezas a mitad de la transición del paso `k` al `k+1`
 * (t ∈ [0,1]). Siguen su línea de movimiento/bote si la tienen; si no, recta.
 * Si la línea acaba lejos de la posición del paso siguiente, el desvío se
 * reparte durante el recorrido, así siempre se llega a donde dice el paso.
 */
export function posicionesEnTransicion(j: Jugada, k: number, t: number): Pieza[] {
  const a = j.pasos[k];
  const b = j.pasos[k + 1];
  if (!a) return [];
  if (!b) return a.piezas.map((p) => ({ ...p }));
  const e = easeInOut(t);
  const out: Pieza[] = [];
  for (const pa of a.piezas) {
    const pb = b.piezas.find((p) => p.id === pa.id);
    if (!pb) {
      if (t < 1) out.push({ ...pa });
      continue;
    }
    const tr = trayectoria(a, pa);
    if (!tr) {
      out.push({ ...pa, x: pa.x + (pb.x - pa.x) * e, y: pa.y + (pb.y - pa.y) * e });
      continue;
    }
    const L = longitud(tr);
    const p = puntoEnLong(tr, L * e);
    const fin = tr[tr.length - 1];
    out.push({ ...pa, x: p.x + (pb.x - fin.x) * e, y: p.y + (pb.y - fin.y) * e });
  }
  if (t >= 0.5) {
    for (const pb of b.piezas) if (!a.piezas.some((p) => p.id === pb.id)) out.push({ ...pb });
  }
  return out;
}

/** Duración (ms) de una transición a velocidad 1×. */
export const DURACION_TRANSICION = 1700;
/** Pausa (ms) al llegar a cada paso. */
export const PAUSA_PASO = 450;

/** Línea de tiempo total de la jugada (ms) a velocidad 1×. */
export function duracionTotal(j: Jugada): number {
  const trans = Math.max(0, j.pasos.length - 1);
  return trans * DURACION_TRANSICION + j.pasos.length * PAUSA_PASO;
}

/** Estado de la animación en el instante `ms` desde el inicio. */
export function estadoEnTiempo(j: Jugada, ms: number): { k: number; t: number; fin: boolean } {
  let resto = Math.max(0, ms);
  const ultimo = j.pasos.length - 1;
  for (let k = 0; k <= ultimo; k++) {
    if (resto < PAUSA_PASO) return { k, t: 0, fin: false };
    resto -= PAUSA_PASO;
    if (k === ultimo) break;
    if (resto < DURACION_TRANSICION) return { k, t: resto / DURACION_TRANSICION, fin: false };
    resto -= DURACION_TRANSICION;
  }
  return { k: ultimo, t: 0, fin: true };
}

// ─── validación de entrada NO confiable ────────────────────────────────

/** Quita caracteres de control y recorta. No escapa nada: el render escapa SIEMPRE. */
// Caracteres de control y separadores de línea Unicode (se escriben escapados a propósito).
const CONTROL = new RegExp("[\\u0000-\\u0008\\u000b\\u000c\\u000e-\\u001f\\u007f\\u2028\\u2029]", "g");
export function limpiaTexto(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
    return v.replace(CONTROL, "").slice(0, max);
}

const esObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);

const numero = (v: unknown, min: number, max: number): number | null =>
  typeof v === "number" && Number.isFinite(v) ? clamp(v, min, max) : null;

function punto(v: unknown, c: Cancha): Pt | null {
  if (!esObj(v)) return null;
  const x = numero(v.x, -50, 80);
  const y = numero(v.y, -50, 80);
  if (x === null || y === null) return null;
  return limitaPunto({ x: redondea(x), y: redondea(y) }, c);
}

const ID_VALIDO = /^[A-Za-z0-9_-]{1,12}$/;

function normalizaPaso(raw: unknown, c: Cancha, mapaIds: Map<string, string>): Paso {
  const paso = pasoVacio();
  if (!esObj(raw)) return paso;
  paso.nota = limpiaTexto(raw.nota, LIMITES.NOTA_PASO);
  const idsPaso = new Set<string>();
  const idDe = (v: unknown): string => {
    const s = typeof v === "string" ? v : "";
    const prev = mapaIds.get(s);
    if (prev) return prev;
    const nuevo = ID_VALIDO.test(s) ? s : uid();
    mapaIds.set(s, nuevo);
    return nuevo;
  };
  if (Array.isArray(raw.piezas)) {
    for (const rp of raw.piezas.slice(0, LIMITES.PIEZAS)) {
      if (!esObj(rp)) continue;
      const tipo = TIPOS_PIEZA.find((t) => t === rp.tipo);
      const pos = punto(rp, c);
      if (!tipo || !pos) continue;
      const id = idDe(rp.id);
      if (idsPaso.has(id)) continue;
      idsPaso.add(id);
      const pieza: Pieza = { id, tipo, etiqueta: limpiaTexto(rp.etiqueta, LIMITES.ETIQUETA), x: pos.x, y: pos.y };
      const nombre = limpiaTexto(rp.nombre, LIMITES.NOMBRE_JUGADOR).trim();
      if (nombre) pieza.nombre = nombre;
      if (tipo === "fila") {
        const cant = numero(rp.cant, 1, LIMITES.FILA_MAX);
        const ang = numero(rp.ang, -3600, 3600);
        pieza.cant = cant === null ? 4 : Math.round(cant);
        pieza.ang = ang === null ? 0 : normalizaAngulo(ang);
        pieza.bando = BANDOS.find((b) => b === rp.bando) ?? "neu";
      }
      paso.piezas.push(pieza);
    }
  }
  if (Array.isArray(raw.lineas)) {
    for (const rl of raw.lineas.slice(0, LIMITES.LINEAS)) {
      if (!esObj(rl)) continue;
      const tipo = TIPOS_LINEA.find((t) => t === rl.tipo);
      if (!tipo || !Array.isArray(rl.pts)) continue;
      const pts: Pt[] = [];
      for (const rp of rl.pts.slice(0, LIMITES.PUNTOS)) {
        const p = punto(rp, c);
        if (p) pts.push(p);
      }
      if (pts.length < 2) continue;
      const l: Linea = {
        id: typeof rl.id === "string" && ID_VALIDO.test(rl.id) ? rl.id : uid(),
        tipo,
        pts: tipo === "libre" ? pts : [pts[0], pts[pts.length - 1]],
      };
      const mid = tipo === "libre" ? null : punto(rl.mid, c);
      if (mid) l.mid = mid;
      if (typeof rl.ref === "string" && idsPaso.has(idDe(rl.ref))) l.ref = idDe(rl.ref);
      if (typeof rl.fin === "string" && idsPaso.has(idDe(rl.fin))) l.fin = idDe(rl.fin);
      paso.lineas.push(l);
    }
  }
  if (Array.isArray(raw.textos)) {
    for (const rt of raw.textos.slice(0, LIMITES.TEXTOS)) {
      if (!esObj(rt)) continue;
      const pos = punto(rt, c);
      const texto = limpiaTexto(rt.texto, LIMITES.TEXTO);
      if (!pos || !texto) continue;
      const tam = numero(rt.tam, 1, 3);
      paso.textos.push({
        id: typeof rt.id === "string" && ID_VALIDO.test(rt.id) ? rt.id : uid(),
        x: pos.x,
        y: pos.y,
        texto,
        tam: tam === null ? 2 : Math.round(tam),
      });
    }
  }
  if (Array.isArray(raw.zonas)) {
    for (const rz of raw.zonas.slice(0, LIMITES.ZONAS)) {
      if (!esObj(rz)) continue;
      const forma = FORMAS_ZONA.find((f) => f === rz.forma);
      const pos = punto(rz, c);
      const w = numero(rz.w, ZONA_MIN, ZONA_MAX);
      const h = numero(rz.h, ZONA_MIN, ZONA_MAX);
      if (!forma || !pos || w === null || h === null) continue;
      paso.zonas!.push({
        id: typeof rz.id === "string" && ID_VALIDO.test(rz.id) ? rz.id : uid(),
        forma,
        x: pos.x,
        y: pos.y,
        w: redondea(w),
        h: redondea(h),
      });
    }
  }
  return paso;
}

/** Valida y NORMALIZA una jugada venida de un enlace, un archivo o localStorage. */
export function normalizarJugada(raw: unknown): Jugada | null {
  if (!esObj(raw)) return null;
  if (!Array.isArray(raw.pasos) || raw.pasos.length === 0) return null;
  const cancha: Cancha = raw.cancha === "completa" ? "completa" : "media";
  const orient: Orient = raw.orient === "h" ? "h" : "v";
  const pista: Pista = raw.pista === "mini" ? "mini" : "fiba";
  const categoria = CATEGORIAS.find((c) => c.id === raw.categoria)?.id ?? "ataque";
  const mapaIds = new Map<string, string>();
  const pasos = raw.pasos.slice(0, LIMITES.PASOS).map((p) => normalizaPaso(p, cancha, mapaIds));
  const act = numero(raw.actualizada, 0, 9e15);
  const j: Jugada = {
    v: 1,
    id: typeof raw.id === "string" && ID_VALIDO.test(raw.id) ? raw.id : uid(),
    nombre: limpiaTexto(raw.nombre, LIMITES.NOMBRE).trim() || "Jugada sin título",
    categoria,
    notas: limpiaTexto(raw.notas, LIMITES.NOTAS),
    cancha,
    orient,
    pasos,
    actualizada: act === null ? Date.now() : act,
  };
  if (pista === "mini") j.pista = "mini";
  return j;
}

export const ID_APP = "cancha.zapa/pizarra";

export interface LibroNormalizado {
  jugadas: Jugada[];
  descartadas: number;
}

/** Acepta un libro `{app, jugadas:[…]}`, un array de jugadas o una jugada suelta. */
export function normalizarLibro(raw: unknown): LibroNormalizado {
  let lista: unknown[] = [];
  if (Array.isArray(raw)) lista = raw;
  else if (esObj(raw) && Array.isArray(raw.jugadas)) lista = raw.jugadas;
  else if (esObj(raw) && Array.isArray(raw.pasos)) lista = [raw];
  const jugadas: Jugada[] = [];
  let descartadas = 0;
  for (const r of lista.slice(0, LIMITES.BIBLIOTECA)) {
    const j = normalizarJugada(r);
    if (j) jugadas.push(j);
    else descartadas++;
  }
  if (lista.length > LIMITES.BIBLIOTECA) descartadas += lista.length - LIMITES.BIBLIOTECA;
  return { jugadas, descartadas };
}

export function libroAJson(jugadas: Jugada[]): string {
  return JSON.stringify({ app: ID_APP, v: 1, jugadas }, null, 1);
}

/** Lee un JSON de texto (archivo o localStorage) sin lanzar nunca. */
export function leerLibroDeTexto(texto: string): LibroNormalizado | null {
  try {
    return normalizarLibro(JSON.parse(texto));
  } catch {
    return null;
  }
}

// ─── enlace compartible (hash, sin servidor) ────────────────────────────

const CATS = CATEGORIAS.map((c) => c.id);

/**
 * Formato compacto de enlace. Jugada = [nombre, catIdx, notas, cancha(0/1),
 * orient(0/1), pasos]; paso = [nota, piezas, lineas, textos];
 * pieza = [tipoIdx, etiqueta, x, y, id, extra?] con extra = [nombre, cant, ang, bandoIdx]
 * (solo si hace falta); linea = [tipoIdx, [x,y,x,y…], mid|0, ref|0, fin|0];
 * texto = [x, y, texto, tam]; zona = [formaIdx, x, y, w, h] (5º elemento del paso).
 * Los datos de la jugada que no son pasos van en un 7º elemento: [pistaIdx]. Todo lo que se
 * añade va al FINAL de cada array, así que un enlace antiguo sigue abriéndose.
 * El id y la fecha NO viajan: se generan al abrir.
 */
export function compactar(j: Jugada): unknown[] {
  const f = (v: number) => redondea(v, 2);
  return [
    j.nombre,
    CATS.indexOf(j.categoria),
    j.notas,
    j.cancha === "completa" ? 1 : 0,
    j.orient === "h" ? 1 : 0,
    j.pasos.map((s) => [
      s.nota,
      s.piezas.map((p) => {
        const base: unknown[] = [TIPOS_PIEZA.indexOf(p.tipo), p.etiqueta, f(p.x), f(p.y), p.id];
        if (p.nombre || p.cant !== undefined || p.ang || (p.bando && p.bando !== "neu")) {
          base.push([p.nombre ?? "", p.cant ?? 0, p.ang ?? 0, BANDOS.indexOf(p.bando ?? "neu")]);
        }
        return base;
      }),
      s.lineas.map((l) => [
        TIPOS_LINEA.indexOf(l.tipo),
        l.pts.flatMap((p) => [f(p.x), f(p.y)]),
        l.mid ? [f(l.mid.x), f(l.mid.y)] : 0,
        l.ref ?? 0,
        l.fin ?? 0,
      ]),
      s.textos.map((t) => [f(t.x), f(t.y), t.texto, t.tam]),
      (s.zonas ?? []).map((z) => [FORMAS_ZONA.indexOf(z.forma), f(z.x), f(z.y), f(z.w), f(z.h)]),
    ]),
    [j.pista === "mini" ? 1 : 0],
  ];
}

const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);

/** Inverso de `compactar`; el resultado SIEMPRE pasa por `normalizarJugada`. */
export function descompactar(raw: unknown): Jugada | null {
  if (!Array.isArray(raw)) return null;
  const [nombre, cat, notas, cancha, orient, pasos, extras] = raw;
  const ex = arr(extras);
  const obj = {
    nombre,
    categoria: typeof cat === "number" ? CATS[cat] : undefined,
    notas,
    cancha: cancha === 1 ? "completa" : "media",
    orient: orient === 1 ? "h" : "v",
    pista: ex[0] === 1 ? "mini" : "fiba",
    pasos: arr(pasos).map((s) => {
      const [nota, piezas, lineas, textos, zonas] = arr(s);
      return {
        nota,
        piezas: arr(piezas).map((p) => {
          const [t, et, x, y, id, ext] = arr(p);
          const [nombre, cant, ang, bando] = arr(ext);
          return {
            tipo: typeof t === "number" ? TIPOS_PIEZA[t] : undefined,
            etiqueta: et,
            x,
            y,
            id,
            nombre,
            cant: cant || undefined,
            ang,
            bando: typeof bando === "number" ? BANDOS[bando] : undefined,
          };
        }),
        lineas: arr(lineas).map((l) => {
          const [t, flat, mid, ref, fin] = arr(l);
          const pts: { x: unknown; y: unknown }[] = [];
          const fl = arr(flat);
          for (let i = 0; i + 1 < fl.length; i += 2) pts.push({ x: fl[i], y: fl[i + 1] });
          const m = arr(mid);
          return {
            tipo: typeof t === "number" ? TIPOS_LINEA[t] : undefined,
            pts,
            mid: m.length === 2 ? { x: m[0], y: m[1] } : undefined,
            ref: ref || undefined,
            fin: fin || undefined,
          };
        }),
        textos: arr(textos).map((t) => {
          const [x, y, texto, tam] = arr(t);
          return { x, y, texto, tam };
        }),
        zonas: arr(zonas).map((z) => {
          const [forma, x, y, w, h] = arr(z);
          return { forma: typeof forma === "number" ? FORMAS_ZONA[forma] : undefined, x, y, w, h };
        }),
      };
    }),
  };
  return normalizarJugada(obj);
}

export interface CargaEnlace {
  tipo: "jugada" | "libro";
  jugadas: Jugada[];
}

export function aBase64Url(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function deBase64Url(s: string): Uint8Array {
  if (!/^[A-Za-z0-9_-]*$/.test(s)) throw new Error("base64url inválido");
  const b = s.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b + "=".repeat((4 - (b.length % 4)) % 4));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function aflujo(bytes: Uint8Array, transform: CompressionStream | DecompressionStream): Promise<Uint8Array> {
  const lector = new Blob([bytes as BlobPart]).stream().pipeThrough(transform).getReader();
  const trozos: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await lector.read();
    if (done) break;
    total += value.length;
    // tope anti "bomba de descompresión": 4 MB de JSON ya son cientos de jugadas
    if (total > 4_000_000) {
      await lector.cancel();
      throw new Error("Datos demasiado grandes");
    }
    trozos.push(value);
  }
  const out = new Uint8Array(total);
  let o = 0;
  for (const t of trozos) {
    out.set(t, o);
    o += t.length;
  }
  return out;
}

export const hayCompresion = () => typeof CompressionStream !== "undefined" && typeof DecompressionStream !== "undefined";

/**
 * Serializa jugada(s) a texto para el hash. Prefijo: `z` = deflate-raw, `r` = JSON
 * sin comprimir (navegadores sin CompressionStream). Segundo carácter: `j` jugada, `b` libro.
 */
export async function codificarEnlace(jugadas: Jugada[], opciones: { comprimir?: boolean } = {}): Promise<string> {
  const tipo = jugadas.length === 1 ? "j" : "b";
  const json = JSON.stringify(jugadas.map(compactar));
  const bytes = new TextEncoder().encode(json);
  if (opciones.comprimir !== false && hayCompresion()) {
    return "z" + tipo + aBase64Url(await aflujo(bytes, new CompressionStream("deflate-raw")));
  }
  return "r" + tipo + aBase64Url(bytes);
}

/** Decodifica el texto del hash. Lanza un Error de mensaje legible si es basura. */
export async function decodificarEnlace(texto: string): Promise<CargaEnlace> {
  if (texto.length < 3 || texto.length > 400_000) throw new Error("Enlace vacío o demasiado largo");
  const modo = texto[0];
  const tipo = texto[1];
  if ((modo !== "z" && modo !== "r") || (tipo !== "j" && tipo !== "b")) throw new Error("Formato de enlace desconocido");
  let bytes = deBase64Url(texto.slice(2));
  if (modo === "z") {
    if (!hayCompresion()) throw new Error("Este navegador no puede abrir enlaces comprimidos");
    bytes = await aflujo(bytes, new DecompressionStream("deflate-raw"));
  } else if (bytes.length > 4_000_000) {
    throw new Error("Datos demasiado grandes");
  }
  const raw: unknown = JSON.parse(new TextDecoder().decode(bytes));
  if (!Array.isArray(raw)) throw new Error("Contenido no válido");
  const jugadas: Jugada[] = [];
  for (const r of raw.slice(0, LIMITES.BIBLIOTECA)) {
    const j = descompactar(r);
    if (j) jugadas.push(j);
  }
  if (jugadas.length === 0) throw new Error("El enlace no contiene ninguna jugada válida");
  return { tipo: tipo === "j" ? "jugada" : "libro", jugadas };
}

/** Extrae el payload de `#j=…` (o null). */
export function payloadDeHash(hash: string): string | null {
  const m = /^#?(?:.*&)?j=([^&]*)/.exec(hash);
  return m ? m[1] : null;
}

// ─── texto de ayuda para hojas e imágenes ───────────────────────────────

/** Parte un texto en líneas de como mucho `max` caracteres (sin cortar palabras). */
export function envolverTexto(texto: string, max: number, maxLineas = 12): string[] {
  const out: string[] = [];
  for (const parrafo of texto.split(/\r?\n/)) {
    let linea = "";
    for (const palabra of parrafo.split(/\s+/).filter(Boolean)) {
      if (palabra.length > max) {
        if (linea) out.push(linea);
        for (let i = 0; i < palabra.length; i += max) out.push(palabra.slice(i, i + max));
        linea = "";
      } else if ((linea + " " + palabra).trim().length > max) {
        out.push(linea);
        linea = palabra;
      } else {
        linea = (linea + " " + palabra).trim();
      }
    }
    out.push(linea);
  }
  while (out.length && out[out.length - 1] === "") out.pop();
  if (out.length > maxLineas) {
    const cortado = out.slice(0, maxLineas);
    cortado[maxLineas - 1] = cortado[maxLineas - 1].slice(0, Math.max(0, max - 1)) + "…";
    return cortado;
  }
  return out;
}

export function nombreArchivo(nombre: string, ext: string): string {
  const base =
    nombre
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "jugada";
  return `${base}.${ext}`;
}

// ─── copias de seguridad (localStorage se puede perder) ────────────────

export const DIAS_AVISO_COPIA = 14;
export const JUGADAS_AVISO_SIN_COPIA = 3;
const MS_DIA = 86_400_000;

/** Días enteros desde la última copia (null si nunca hubo o la fecha no vale). */
export function diasDesdeCopia(ultima: number | null, ahora: number): number | null {
  if (typeof ultima !== "number" || !Number.isFinite(ultima) || ultima <= 0) return null;
  return Math.max(0, Math.floor((ahora - ultima) / MS_DIA));
}

/**
 * ¿Toca recordar la copia de seguridad? Sí si hay jugadas propias y la última
 * copia tiene más de 14 días, o nunca hubo copia y ya hay 3 o más jugadas.
 */
export function tocaRecordarCopia(jugadasGuardadas: number, ultima: number | null, ahora: number): boolean {
  if (jugadasGuardadas <= 0) return false;
  const dias = diasDesdeCopia(ultima, ahora);
  if (dias === null) return jugadasGuardadas >= JUGADAS_AVISO_SIN_COPIA;
  return dias > DIAS_AVISO_COPIA;
}

export function textoUltimaCopia(ultima: number | null, ahora: number): string {
  const d = diasDesdeCopia(ultima, ahora);
  if (d === null) return "Aún no has hecho ninguna copia";
  if (d === 0) return "Última copia: hoy";
  if (d === 1) return "Última copia: hace 1 día";
  return `Última copia: hace ${d} días`;
}
