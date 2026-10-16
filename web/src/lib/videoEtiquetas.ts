// Etiquetas de vídeo (/video): el entrenador abre el vídeo del partido DESDE SU DISPOSITIVO (no se
// sube a ningún sitio), marca momentos con un toque y luego salta de uno a otro o los ve seguidos.
// Las etiquetas se guardan por vídeo (nombre + tamaño + duración) en el navegador. Lógica pura.

export const CLAVE_VIDEO = "cz.video.v1";
export const LIMITES_VIDEO = { VIDEOS: 30, ETIQUETAS: 600, TEXTO: 80, TIPOS: 9 } as const;

export interface TipoEtiqueta {
  id: string;
  nombre: string;
  color: string;
}

/** Tipos de serie; el entrenador puede renombrarlos. Las teclas 1-9 van en este orden. */
export const TIPOS_POR_DEFECTO: TipoEtiqueta[] = [
  { id: "canasta", nombre: "Canasta", color: "#16a34a" },
  { id: "fallo", nombre: "Tiro fallado", color: "#64748b" },
  { id: "perdida", nombre: "Pérdida", color: "#dc2626" },
  { id: "recuperacion", nombre: "Recuperación", color: "#0ea5e9" },
  { id: "rebote", nombre: "Rebote", color: "#a855f7" },
  { id: "buena-def", nombre: "Buena defensa", color: "#22c55e" },
  { id: "mala-def", nombre: "Error defensivo", color: "#f97316" },
  { id: "jugada", nombre: "Jugada ensayada", color: "#eab308" },
  { id: "revisar", nombre: "Revisar", color: "#ec4899" },
];

export interface Etiqueta {
  id: string;
  t: number;
  tipo: string;
  jugador: string;
  nota: string;
}

export interface VideoGuardado {
  nombre: string;
  etiquetas: Etiqueta[];
  actualizado: number;
}

export interface StoreVideo {
  v: 1;
  tipos: TipoEtiqueta[];
  videos: Record<string, VideoGuardado>;
}

/** Identifica un vídeo sin leerlo: nombre de archivo + tamaño + duración redondeada. */
export const claveVideo = (nombre: string, tamano: number, duracion: number): string => `${nombre}|${tamano}|${Math.round(duracion)}`;

/** 75.4 → "1:15"; 3725 → "1:02:05". */
export function formatoTiempo(seg: number): string {
  // los vídeos grabados desde un navegador (WebM) suelen decir duración = Infinity
  if (!Number.isFinite(seg)) return "—";
  const s = Math.max(0, Math.floor(seg));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = String(s % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${r}` : `${m}:${r}`;
}

export interface Clip {
  desde: number;
  hasta: number;
  etiquetas: string[];
}

/**
 * Tramos para ver seguidos: de `antes` segundos antes de cada etiqueta a `despues` después,
 * uniendo los que se solapan (dos etiquetas juntas no repiten el mismo trozo).
 */
export function clipsDe(etiquetas: Etiqueta[], duracion: number, antes = 6, despues = 3): Clip[] {
  const orden = etiquetas.slice().sort((a, b) => a.t - b.t);
  const out: Clip[] = [];
  for (const e of orden) {
    const desde = Math.max(0, e.t - antes);
    const hasta = Math.min(duracion > 0 ? duracion : Infinity, e.t + despues);
    const ultimo = out[out.length - 1];
    if (ultimo && desde <= ultimo.hasta) {
      ultimo.hasta = Math.max(ultimo.hasta, hasta);
      ultimo.etiquetas.push(e.id);
    } else out.push({ desde, hasta, etiquetas: [e.id] });
  }
  return out;
}

const csvCampo = (v: string) => (/[;"\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);

/** CSV con punto y coma (lo que abre bien Excel en España). */
export function aCsv(etiquetas: Etiqueta[], tipos: TipoEtiqueta[]): string {
  const nombre = (id: string) => tipos.find((x) => x.id === id)?.nombre ?? id;
  const filas = etiquetas
    .slice()
    .sort((a, b) => a.t - b.t)
    .map((e) => [formatoTiempo(e.t), nombre(e.tipo), e.jugador, e.nota].map(csvCampo).join(";"));
  return ["Tiempo;Tipo;Jugador;Nota", ...filas].join("\n");
}

/** Lista legible para pegar en WhatsApp o en un correo. */
export function aTexto(etiquetas: Etiqueta[], tipos: TipoEtiqueta[]): string {
  const nombre = (id: string) => tipos.find((x) => x.id === id)?.nombre ?? id;
  return etiquetas
    .slice()
    .sort((a, b) => a.t - b.t)
    .map((e) => `${formatoTiempo(e.t)} · ${nombre(e.tipo)}${e.jugador ? ` · ${e.jugador}` : ""}${e.nota ? ` — ${e.nota}` : ""}`)
    .join("\n");
}

const esObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const txt = (v: unknown, max: number = LIMITES_VIDEO.TEXTO) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, max);

/** Valida lo leído de localStorage. Nunca lanza. */
export function normalizarStoreVideo(raw: unknown): StoreVideo {
  const st: StoreVideo = { v: 1, tipos: TIPOS_POR_DEFECTO.map((t) => ({ ...t })), videos: {} };
  if (!esObj(raw)) return st;
  // los nombres de los tipos se pueden personalizar; los ids y colores son fijos
  if (Array.isArray(raw.tipos)) {
    for (const t of st.tipos) {
      const r = raw.tipos.find((x) => esObj(x) && x.id === t.id) as Record<string, unknown> | undefined;
      const nombre = r ? txt(r.nombre, 24) : "";
      if (nombre) t.nombre = nombre;
    }
  }
  const ids = new Set(st.tipos.map((t) => t.id));
  if (esObj(raw.videos)) {
    const claves = Object.keys(raw.videos).slice(0, LIMITES_VIDEO.VIDEOS);
    for (const k of claves) {
      const rv = raw.videos[k];
      if (!esObj(rv)) continue;
      const etiquetas: Etiqueta[] = [];
      for (const re of (Array.isArray(rv.etiquetas) ? rv.etiquetas : []).slice(0, LIMITES_VIDEO.ETIQUETAS)) {
        if (!esObj(re) || typeof re.t !== "number" || !Number.isFinite(re.t) || re.t < 0) continue;
        const tipo = typeof re.tipo === "string" && ids.has(re.tipo) ? re.tipo : "revisar";
        etiquetas.push({ id: typeof re.id === "string" && re.id ? re.id.slice(0, 40) : `e${etiquetas.length}`, t: Math.round(re.t * 10) / 10, tipo, jugador: txt(re.jugador, 40), nota: txt(re.nota) });
      }
      st.videos[k.slice(0, 300)] = { nombre: txt(rv.nombre, 120), etiquetas, actualizado: typeof rv.actualizado === "number" ? rv.actualizado : 0 };
    }
  }
  return st;
}
