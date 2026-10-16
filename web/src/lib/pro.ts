// Funciones Pro (modelo freemium). Durante la BETA el desbloqueo es gratis: el código se enseña
// en la misma pantalla y basta un clic. Todo vive en el navegador (localStorage), igual que el
// resto de datos de usuario: no hay cuentas ni servidor. Se puede saltar con la consola, y da
// igual: es una beta gratuita. Cobrar de verdad exigirá licencias validadas en servidor.
//
// Para marcar algo como Pro basta con poner data-pro="<id>" en su botón (o formulario): lo
// intercepta ProGate.astro. Las vistas que RECIBEN los jugadores (enlaces de solo ver, sesiones
// compartidas) nunca se marcan: el que paga es el entrenador, no sus jugadores.

export const FUNCIONES_PRO = {
  "pizarra-sesiones": "Sesiones de entrenamiento",
  "pizarra-jugador": "Modo jugador y código QR",
  "pizarra-animacion": "GIF y vídeo de la jugada",
  "pizarra-lecturas": "Lecturas de la jugada",
  "stats-equipo": "Estadísticas de equipo",
  "stats-agente": "Agente de estadísticas",
  "minutos-rotacion": "Propuesta de rotación",
  "pizarra-club": "Biblioteca del club",
  "tiro-temporada": "Mapa de tiro de toda la temporada",
  "rival-varios": "Informe del rival con varios partidos",
} as const;

export type FuncionPro = keyof typeof FUNCIONES_PRO;

/** Códigos aceptados. Hoy solo el de la beta, que es público. */
export const CODIGO_BETA = "CANCHA-BETA";
const CODIGOS = new Set([CODIGO_BETA]);

export const CLAVE_PRO = "cz.pro.v1";

export interface EstadoPro {
  codigo: string;
  desde: string; // ISO
}

export function esFuncionPro(id: string): id is FuncionPro {
  return Object.prototype.hasOwnProperty.call(FUNCIONES_PRO, id);
}

/** Mayúsculas, sin espacios y con guiones normales: "cancha beta" y "cancha–beta" valen. */
export function normalizaCodigo(c: string): string {
  return c
    .trim()
    .toUpperCase()
    .replace(/[\s_‐-―]+/g, "-");
}

export function codigoValido(c: string): boolean {
  return CODIGOS.has(normalizaCodigo(c));
}

/** Lee el estado guardado; cualquier cosa rara (o un código que ya no vale) = sin Pro. */
export function leerEstadoPro(raw: string | null): EstadoPro | null {
  if (!raw) return null;
  try {
    const e = JSON.parse(raw) as Partial<EstadoPro>;
    if (typeof e?.codigo !== "string" || !codigoValido(e.codigo)) return null;
    return { codigo: normalizaCodigo(e.codigo), desde: typeof e.desde === "string" ? e.desde : "" };
  } catch {
    return null;
  }
}

export function crearEstadoPro(codigo: string, ahora: Date): EstadoPro | null {
  if (!codigoValido(codigo)) return null;
  return { codigo: normalizaCodigo(codigo), desde: ahora.toISOString() };
}
