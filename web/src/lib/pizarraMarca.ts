// Marca del club en lo que se imprime desde la pizarra (playbook, hoja de banquillo y sesiones):
// nombre, color y escudo. El escudo se guarda en el navegador como imagen ya reducida (data URL).
// Lógica pura: validación de lo que se guarda y se lee.

export const CLAVE_MARCA = "cz.pizarra.marca.v1";
/** Tope del data URL del escudo: una imagen de 200 px en PNG o JPEG cabe de sobra. */
export const MAX_ESCUDO = 120_000;
export const COLOR_POR_DEFECTO = "#f97316";

export interface MarcaClub {
  nombre: string;
  color: string;
  /** data:image/png|jpeg|webp;base64,… o "" sin escudo. */
  escudo: string;
}

const COLOR = /^#[0-9a-f]{6}$/i;
const ESCUDO = /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/;

export const colorValido = (c: unknown): string => (typeof c === "string" && COLOR.test(c) ? c.toLowerCase() : COLOR_POR_DEFECTO);

export function escudoValido(e: unknown): string {
  return typeof e === "string" && e.length <= MAX_ESCUDO && ESCUDO.test(e) ? e : "";
}

/** Marca utilizable, o null si no hay nada que poner (ni nombre ni escudo). Nunca lanza. */
export function normalizarMarca(raw: unknown): MarcaClub | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;
  const nombre = String(r.nombre ?? "").replace(/\s+/g, " ").trim().slice(0, 60);
  const escudo = escudoValido(r.escudo);
  if (!nombre && !escudo) return null;
  return { nombre, color: colorValido(r.color), escudo };
}

export function leerMarca(texto: string | null): MarcaClub | null {
  if (!texto) return null;
  try {
    return normalizarMarca(JSON.parse(texto));
  } catch {
    return null;
  }
}

/** Medidas para reducir una imagen a `max` px por el lado largo sin deformarla (nunca la agranda). */
export function medidasReducidas(ancho: number, alto: number, max = 200): { w: number; h: number } {
  if (!(ancho > 0 && alto > 0)) return { w: 0, h: 0 };
  const k = Math.min(1, max / Math.max(ancho, alto));
  return { w: Math.max(1, Math.round(ancho * k)), h: Math.max(1, Math.round(alto * k)) };
}
