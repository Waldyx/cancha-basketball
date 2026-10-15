// Render SVG (como TEXTO) de la pizarra: la misma función pinta la pista en vivo,
// las miniaturas, el PNG, la hoja de pasos, el vídeo y la impresión. Al ser una
// función pura sin DOM se puede probar en Node. Todo texto del usuario pasa por
// `esc()` antes de entrar en el SVG: nunca se inyecta como HTML.

import {
  CANCHA,
  aVista,
  cajaVista,
  direccionFinal,
  envolverTexto,
  longitud,
  polilinea,
  puntaFlecha,
  recorta,
  trazosCancha,
  zigzag,
  type Cancha,
  type Jugada,
  type Linea,
  type Orient,
  type Pieza,
  type Pt,
  type Texto,
} from "./pizarra";

export function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export interface Paleta {
  suelo: string;
  pintura: string;
  linea: string;
  aro: string;
  tinta: string;
  atq: string;
  atqTexto: string;
  def: string;
  defRelleno: string;
  balon: string;
  balonBorde: string;
  cono: string;
  sel: string;
  /** Fondo de hojas e imágenes con cabecera. */
  papel: string;
  papelTexto: string;
  papelSuave: string;
}

export type NombrePaleta = "parquet" | "neutra" | "oscura";

export const PALETAS: Record<NombrePaleta, Paleta> = {
  parquet: {
    suelo: "#e3bd7e",
    pintura: "#cf9a55",
    linea: "#fffaf0",
    aro: "#ea580c",
    tinta: "#1c1917",
    atq: "#1d4ed8",
    atqTexto: "#ffffff",
    def: "#b91c1c",
    defRelleno: "#ffffff",
    balon: "#ea580c",
    balonBorde: "#431407",
    cono: "#f59e0b",
    sel: "#facc15",
    papel: "#f5f5f4",
    papelTexto: "#0c0c0c",
    papelSuave: "#57534e",
  },
  neutra: {
    suelo: "#ffffff",
    pintura: "#eef2f6",
    linea: "#64748b",
    aro: "#ea580c",
    tinta: "#0f172a",
    atq: "#1d4ed8",
    atqTexto: "#ffffff",
    def: "#b91c1c",
    defRelleno: "#ffffff",
    balon: "#ea580c",
    balonBorde: "#431407",
    cono: "#f59e0b",
    sel: "#f59e0b",
    papel: "#ffffff",
    papelTexto: "#0c0c0c",
    papelSuave: "#475569",
  },
  oscura: {
    suelo: "#1c1c1f",
    pintura: "#2a2a2e",
    linea: "#a1a1aa",
    aro: "#fb923c",
    tinta: "#f4f4f5",
    atq: "#3b82f6",
    atqTexto: "#ffffff",
    def: "#f87171",
    defRelleno: "#1c1c1f",
    balon: "#fb923c",
    balonBorde: "#ffedd5",
    cono: "#fbbf24",
    sel: "#facc15",
    papel: "#0c0c0c",
    papelTexto: "#ffffff",
    papelSuave: "#a1a1aa",
  },
};

export const RADIO_PIEZA = 0.62;
const GROSOR = 0.14;
const FUENTE = "Barlow Condensed, 'Arial Narrow', Arial, sans-serif";

export interface SeleccionRender {
  tipo: "pieza" | "linea" | "texto";
  id: string;
}

export interface OpcionesTablero {
  cancha: Cancha;
  orient: Orient;
  piezas: Pieza[];
  lineas: Linea[];
  textos: Texto[];
  paleta: Paleta;
  seleccion?: SeleccionRender | null;
  borrador?: Linea | null;
  /** 0..1; durante la reproducción las líneas del paso se atenúan. */
  opacidadLineas?: number;
  /** Dibuja los manejadores (inicio, final y curva) de la línea seleccionada. */
  manejadores?: boolean;
}

const f = (v: number) => String(Math.round(v * 1000) / 1000);

function camino(pts: Pt[], o: Orient, cerrar = false): string {
  return (
    pts
      .map((p, i) => {
        const v = aVista(p, o);
        return `${i === 0 ? "M" : "L"}${f(v.x)},${f(v.y)}`;
      })
      .join(" ") + (cerrar ? " Z" : "")
  );
}

interface GeomLinea {
  cuerpo: Pt[];
  cabeza?: [Pt, Pt, Pt];
  barra?: [Pt, Pt];
}

export function geometriaLinea(l: Linea): GeomLinea {
  const base = polilinea(l);
  if (l.tipo === "libre" || base.length < 2) return { cuerpo: base };
  const b = recorta(base, l.ref ? RADIO_PIEZA : 0, l.fin ? RADIO_PIEZA + 0.04 : 0);
  const tip = b[b.length - 1];
  const dir = direccionFinal(b);
  if (l.tipo === "bloqueo") {
    const px = -dir.y * 0.72;
    const py = dir.x * 0.72;
    return { cuerpo: b, barra: [{ x: tip.x + px, y: tip.y + py }, { x: tip.x - px, y: tip.y - py }] };
  }
  const cuerpoBase = l.tipo === "bote" ? zigzag(b) : b;
  // la punta se encoge en líneas cortas (un desplazamiento de 1 m no puede ser todo flecha)
  const largo = Math.min(0.62, Math.max(0.34, longitud(b) * 0.3));
  const cuerpo = longitud(cuerpoBase) > 1.4 ? recorta(cuerpoBase, 0, largo * 0.8) : cuerpoBase;
  return { cuerpo, cabeza: puntaFlecha(tip, dir, largo, largo * 0.55) };
}

function lineaSvg(l: Linea, p: Paleta, o: Orient, sel: boolean, opacidad: number): string {
  const g = geometriaLinea(l);
  const color = p.tinta;
  let dash = "";
  let grosor = GROSOR;
  let cap = "round";
  if (l.tipo === "pase") dash = ' stroke-dasharray="0.6 0.4"';
  if (l.tipo === "tiro") {
    dash = ' stroke-dasharray="0.02 0.34"';
    grosor = 0.2;
  }
  if (l.tipo === "bloqueo") grosor = 0.17;
  if (l.tipo === "tiro") cap = "round";
  const op = opacidad < 1 ? ` opacity="${f(opacidad)}"` : "";
  let s = `<g${op}>`;
  const d = camino(g.cuerpo, o);
  if (sel) {
    s += `<path d="${d}" fill="none" stroke="${p.sel}" stroke-width="0.6" stroke-opacity="0.55" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  s += `<path d="${d}" fill="none" stroke="${color}" stroke-width="${grosor}" stroke-linecap="${cap}" stroke-linejoin="round"${dash}/>`;
  if (g.cabeza) s += `<path d="${camino(g.cabeza, o, true)}" fill="${color}" stroke="${color}" stroke-width="0.04" stroke-linejoin="round"/>`;
  if (g.barra) s += `<path d="${camino(g.barra, o)}" fill="none" stroke="${color}" stroke-width="0.2" stroke-linecap="round"/>`;
  return s + "</g>";
}

function manejadoresSvg(l: Linea, p: Paleta, o: Orient): string {
  if (l.tipo === "libre" || l.pts.length < 2) return "";
  const a = l.pts[0];
  const b = l.pts[l.pts.length - 1];
  const medio = l.mid ?? { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  const pt = (q: Pt, r: number, rellena: boolean) => {
    const v = aVista(q, o);
    return `<circle cx="${f(v.x)}" cy="${f(v.y)}" r="${r}" fill="${rellena ? p.sel : p.suelo}" stroke="${p.tinta}" stroke-width="0.07"/>`;
  };
  return pt(a, 0.3, true) + pt(b, 0.3, true) + pt(medio, 0.34, false);
}

function piezaSvg(pz: Pieza, p: Paleta, o: Orient, sel: boolean): string {
  const v = aVista(pz, o);
  const x = f(v.x);
  const y = f(v.y);
  let s = "";
  if (sel) s += `<circle cx="${x}" cy="${y}" r="${f(RADIO_PIEZA + 0.38)}" fill="none" stroke="${p.sel}" stroke-width="0.14" stroke-opacity="0.95"/>`;
  if (pz.tipo === "atq" || pz.tipo === "def") {
    const atq = pz.tipo === "atq";
    s += `<circle cx="${x}" cy="${y}" r="${RADIO_PIEZA}" fill="${atq ? p.atq : p.defRelleno}" stroke="${atq ? p.defRelleno : p.def}" stroke-width="${atq ? 0.08 : 0.15}"/>`;
    const t = pz.etiqueta;
    if (t) {
      const tam = t.length <= 1 ? 0.95 : t.length === 2 ? 0.78 : 0.6;
      s += `<text x="${x}" y="${f(v.y + tam * 0.34)}" font-size="${tam}" font-weight="900" text-anchor="middle" fill="${atq ? p.atqTexto : p.def}" font-family="${FUENTE}">${esc(t)}</text>`;
    }
  } else if (pz.tipo === "balon") {
    s += `<circle cx="${x}" cy="${y}" r="0.36" fill="${p.balon}" stroke="${p.balonBorde}" stroke-width="0.07"/>`;
    s += `<path d="M${f(v.x - 0.36)},${y} H${f(v.x + 0.36)} M${x},${f(v.y - 0.36)} V${f(v.y + 0.36)}" stroke="${p.balonBorde}" stroke-width="0.05" fill="none"/>`;
  } else {
    s += `<path d="M${x},${f(v.y - 0.5)} L${f(v.x + 0.46)},${f(v.y + 0.4)} L${f(v.x - 0.46)},${f(v.y + 0.4)} Z" fill="${p.cono}" stroke="${p.balonBorde}" stroke-width="0.07" stroke-linejoin="round"/>`;
  }
  return s;
}

function textoSvg(t: Texto, p: Paleta, o: Orient, sel: boolean): string {
  const v = aVista(t, o);
  const tam = [0, 0.62, 0.86, 1.2][Math.round(t.tam)] ?? 0.86;
  const halo = `<text x="${f(v.x)}" y="${f(v.y + tam * 0.32)}" font-size="${tam}" font-weight="700" text-anchor="middle" font-family="${FUENTE}" fill="${p.suelo}" stroke="${p.suelo}" stroke-width="0.22" stroke-linejoin="round">${esc(t.texto)}</text>`;
  const txt = `<text x="${f(v.x)}" y="${f(v.y + tam * 0.32)}" font-size="${tam}" font-weight="700" text-anchor="middle" font-family="${FUENTE}" fill="${p.tinta}">${esc(t.texto)}</text>`;
  let s = halo + txt;
  if (sel) {
    const w = Math.max(1.2, t.texto.length * tam * 0.5);
    s = `<rect x="${f(v.x - w / 2 - 0.2)}" y="${f(v.y - tam * 0.75)}" width="${f(w + 0.4)}" height="${f(tam * 1.3)}" fill="none" stroke="${p.sel}" stroke-width="0.12" stroke-dasharray="0.3 0.2"/>` + s;
  }
  return s;
}

/** Contenido SVG del tablero (suelo + pista + líneas + piezas + textos). */
export function renderTablero(o: OpcionesTablero): string {
  const p = o.paleta;
  const vb = cajaVista(o.cancha, o.orient);
  let s = `<rect x="${vb.x}" y="${vb.y}" width="${vb.w}" height="${vb.h}" fill="${p.suelo}"/>`;
  const rot = o.orient === "v" ? ` transform="translate(${CANCHA.ANCHO} 0) rotate(90)"` : "";
  s += `<g${rot} fill="none" stroke="${p.linea}" stroke-width="0.09" stroke-linejoin="round">`;
  for (const t of trazosCancha(o.cancha)) {
    if (t.rol === "pintura") s += `<path d="${t.d}" fill="${p.pintura}" stroke="none"/>`;
    else if (t.rol === "discontinua") s += `<path d="${t.d}" stroke-dasharray="0.3 0.3"/>`;
    else if (t.rol === "aro") s += `<path d="${t.d}" stroke="${p.aro}" stroke-width="0.12"/>`;
    else if (t.rol === "tablero") s += `<path d="${t.d}" stroke="${p.linea}" stroke-width="0.14"/>`;
    else s += `<path d="${t.d}"/>`;
  }
  s += "</g>";
  const op = o.opacidadLineas ?? 1;
  for (const l of o.lineas) s += lineaSvg(l, p, o.orient, o.seleccion?.tipo === "linea" && o.seleccion.id === l.id, op);
  if (o.borrador) s += lineaSvg(o.borrador, p, o.orient, false, 0.75);
  if (o.manejadores && o.seleccion?.tipo === "linea") {
    const l = o.lineas.find((x) => x.id === o.seleccion?.id);
    if (l) s += manejadoresSvg(l, p, o.orient);
  }
  // conos al fondo, balón arriba del todo
  const orden = { cono: 0, def: 1, atq: 2, balon: 3 } as const;
  const piezas = o.piezas.slice().sort((a, b) => orden[a.tipo] - orden[b.tipo]);
  for (const pz of piezas) s += piezaSvg(pz, p, o.orient, o.seleccion?.tipo === "pieza" && o.seleccion.id === pz.id);
  for (const t of o.textos) s += textoSvg(t, p, o.orient, o.seleccion?.tipo === "texto" && o.seleccion.id === t.id);
  return s;
}

/** SVG autónomo (con xmlns) listo para <img>, canvas o incrustar en HTML. */
export function renderSvgCompleto(o: OpcionesTablero, tam: { ancho?: number; alto?: number } = {}): string {
  const vb = cajaVista(o.cancha, o.orient);
  const dims = tam.ancho ? ` width="${tam.ancho}" height="${tam.alto ?? Math.round((tam.ancho * vb.h) / vb.w)}"` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.x} ${vb.y} ${vb.w} ${vb.h}"${dims} font-family="${FUENTE}">${renderTablero(o)}</svg>`;
}

function tablero(j: Jugada, k: number, paleta: Paleta, extra: Partial<OpcionesTablero> = {}): OpcionesTablero {
  const s = j.pasos[k];
  return { cancha: j.cancha, orient: j.orient, piezas: s.piezas, lineas: s.lineas, textos: s.textos, paleta, ...extra };
}

export interface Lienzo {
  svg: string;
  w: number;
  h: number;
}

const txt = (x: number, y: number, size: number, color: string, s: string, extra = "") =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-family="${FUENTE}"${extra}>${esc(s)}</text>`;

/** Un paso (o un fotograma de la animación) con cabecera de nombre y notas. */
export function renderCuadro(
  j: Jugada,
  k: number,
  o: { paleta: Paleta; ancho: number; piezas?: Pieza[]; opacidadLineas?: number; titulo?: boolean; notas?: boolean }
): Lienzo {
  const p = o.paleta;
  const vb = cajaVista(j.cancha, j.orient);
  const W = o.ancho;
  const cab = o.titulo === false ? 0 : Math.round(W * 0.075);
  const alto = Math.round((W * vb.h) / vb.w);
  const nota = o.notas === false ? "" : j.pasos[k].nota;
  const lineasNota = nota ? envolverTexto(nota, Math.floor(W / (W * 0.0155)), 4) : [];
  const pie = lineasNota.length ? Math.round(W * 0.03) * lineasNota.length + Math.round(W * 0.03) : 0;
  const H = cab + alto + pie;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="${FUENTE}">`;
  s += `<rect width="${W}" height="${H}" fill="${p.papel}"/>`;
  if (cab) {
    s += txt(Math.round(W * 0.025), Math.round(cab * 0.68), Math.round(cab * 0.52), p.papelTexto, j.nombre.slice(0, 60), ' font-weight="900"');
    s += txt(W - Math.round(W * 0.025), Math.round(cab * 0.66), Math.round(cab * 0.38), p.papelSuave, `Paso ${k + 1}/${j.pasos.length}`, ' text-anchor="end" font-weight="700"');
  }
  const t = tablero(j, k, p, { piezas: o.piezas ?? j.pasos[k].piezas, opacidadLineas: o.opacidadLineas });
  s += `<svg x="0" y="${cab}" width="${W}" height="${alto}" viewBox="${vb.x} ${vb.y} ${vb.w} ${vb.h}">${renderTablero(t)}</svg>`;
  const fs = Math.round(W * 0.024);
  lineasNota.forEach((ln, i) => {
    s += txt(Math.round(W * 0.025), cab + alto + Math.round(W * 0.036) + i * Math.round(W * 0.03), fs, p.papelTexto, ln);
  });
  s += txt(W - Math.round(W * 0.02), H - Math.round(W * 0.008), Math.round(W * 0.016), p.papelSuave, "canchazapa.com/pizarra", ' text-anchor="end"');
  return { svg: s + "</svg>", w: W, h: H };
}

/** Hoja con todos los pasos en cuadrícula, nombre de la jugada y notas. */
export function renderHoja(j: Jugada, o: { paleta: Paleta; ancho?: number; pasos?: number[] }): Lienzo {
  const p = o.paleta;
  const W = o.ancho ?? 1240;
  const M = 44;
  const idx = o.pasos ?? j.pasos.map((_, i) => i);
  const cols = idx.length <= 1 ? 1 : idx.length <= 4 ? 2 : 3;
  const gap = 28;
  const cw = Math.floor((W - 2 * M - (cols - 1) * gap) / cols);
  const vb = cajaVista(j.cancha, j.orient);
  const ch = Math.round((cw * vb.h) / vb.w);
  const fsNota = cols === 3 ? 17 : 20;
  const maxCh = Math.max(14, Math.floor(cw / (fsNota * 0.5)));

  // cabecera
  const cat = j.categoria.replace("-", " ");
  const notasJ = j.notas ? envolverTexto(j.notas, Math.floor((W - 2 * M) / 10.5), 8) : [];
  let y = M + 40;
  let s = "";
  s += txt(M, y, 46, p.papelTexto, j.nombre.slice(0, 60), ' font-weight="900"');
  y += 32;
  s += txt(M, y, 22, p.papelSuave, `${cat.charAt(0).toUpperCase() + cat.slice(1)} · ${j.pasos.length} ${j.pasos.length === 1 ? "paso" : "pasos"} · ${j.cancha === "media" ? "media pista" : "pista completa"}`, ' font-weight="700"');
  y += 14;
  for (const ln of notasJ) {
    y += 26;
    s += txt(M, y, 20, p.papelTexto, ln);
  }
  y += 26;

  // cuadrícula
  for (let i = 0; i < idx.length; i += cols) {
    const fila = idx.slice(i, i + cols);
    const notas = fila.map((k) => (j.pasos[k].nota ? envolverTexto(j.pasos[k].nota, maxCh, 5) : []));
    const altNotas = Math.max(0, ...notas.map((a) => a.length)) * (fsNota + 6);
    fila.forEach((k, c) => {
      const x = M + c * (cw + gap);
      s += txt(x, y + 24, 24, p.papelTexto, `Paso ${k + 1}`, ' font-weight="900"');
      const top = y + 34;
      s += `<rect x="${x - 1}" y="${top - 1}" width="${cw + 2}" height="${ch + 2}" fill="none" stroke="${p.papelSuave}" stroke-width="2"/>`;
      s += `<svg x="${x}" y="${top}" width="${cw}" height="${ch}" viewBox="${vb.x} ${vb.y} ${vb.w} ${vb.h}">${renderTablero(tablero(j, k, p))}</svg>`;
      notas[c].forEach((ln, n) => {
        s += txt(x, top + ch + 26 + n * (fsNota + 6), fsNota, p.papelTexto, ln);
      });
    });
    y += 34 + ch + (altNotas ? altNotas + 22 : 14) + 14;
  }
  const H = y + 40;
  s += txt(W - M, H - 18, 18, p.papelSuave, "canchazapa.com/pizarra", ' text-anchor="end"');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="${FUENTE}"><rect width="${W}" height="${H}" fill="${p.papel}"/>${s}</svg>`;
  return { svg, w: W, h: H };
}
