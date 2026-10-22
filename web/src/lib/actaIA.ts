/**
 * Lector de actas — la parte pura (sin DOM), compartida por estadísticas (jugador y equipo) y el
 * informe del rival. La interfaz está en `actaImportUI.ts` y la IA en `api/acta.ts`.
 *
 * Orden de preferencia, de más privado a menos:
 *   1. Texto con su cabecera (pegado, o sacado de un PDF o de una captura en el navegador) →
 *      `parsePaste`, sin IA.
 *   2. Si no se entiende: el texto va a la IA SIN NOMBRES (`anonimizar` → `restaurarNombres`).
 *   3. Solo si eso falla y el entrenador lo acepta: la foto tal cual a la IA.
 */
import { COLS, parsePaste } from "./statsEquipo";

export const STATS_ACTA = ["min", "t2c", "t2i", "t3c", "t3i", "tlc", "tli", "ro", "rd", "ast", "rob", "tap", "per", "fal"] as const;
export type StatActa = (typeof STATS_ACTA)[number];

export interface JugadorLeido extends Record<StatActa, number> {
  nombre: string;
  dorsal: string;
  pts: number | null;
}
export interface EquipoLeido {
  nombre: string;
  pts: number | null;
  jugadores: JugadorLeido[];
}
export interface ActaLeida {
  fecha: string;
  sinIntentos: boolean;
  equipos: EquipoLeido[];
}

// ─── anonimizar ────────────────────────────────────────────────────────────
const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");

/** Palabras que se dejan pasar a la IA: cabeceras de estadística y poco más. Todo lo demás que
 *  sea una palabra (nombres de jugadores, de equipos, de árbitros…) se cambia por un código.
 *  Sin apellidos frecuentes que coincidan con una palabra de aquí (fuera «mas», «pista», «hora»). */
const VOCABULARIO = new Set<string>([
  ...Object.values(COLS).flat(),
  "total", "totals", "totales", "equip", "equipo", "equipos", "local", "visitant", "visitante",
  "jugadors", "jugadores", "jugadora", "jugadoras", "dors", "dorsal", "nom", "nombre",
  "tirs", "tiros", "tir", "tiro", "lliures", "libres", "lliure", "libre", "camp", "campo",
  "rebots", "rebotes", "rebot", "rebote", "ofensius", "defensius", "ofensivos", "defensivos", "of", "def", "off",
  "assistencies", "asistencias", "recuperacions", "recuperaciones", "perdudes", "perdidas", "pilotes", "balones",
  "faltes", "faltas", "comeses", "rebudes", "recibidas", "cometidas", "personals", "personales",
  "taps", "tapons", "tapones", "valoracio", "valoracion", "val", "pir", "eff", "punts", "puntos",
  "minuts", "minutos", "inici", "titular", "quart", "cuarto", "periode", "periodo", "parcial", "parcials", "parciales",
  "partit", "partido", "resultat", "resultado", "estadistica", "estadistiques", "estadisticas",
  "jornada", "data", "fecha", "categoria", "grup", "grupo", "fase", "temporada", "lliga", "liga",
  "premini", "mini", "preinfantil", "infantil", "cadet", "cadete", "junior", "senior",
  "masculi", "femeni", "masculino", "femenino", "mixt", "mixto", "acta", "final", "de", "del", "la", "el", "els", "les",
  "i", "y", "en", "per", "por", "a", "o", "u", "si", "no", "pg", "pj",
]);

const PALABRA = /[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ'’·.\-]*/g;

/**
 * Cambia por NOM1, NOM2… toda palabra que no sea de estadística. Las palabras seguidas (solo con
 * espacios o una coma entre ellas) forman UN nombre: «PÉREZ GIL, Marc» → NOM1. El mismo nombre
 * recibe siempre el mismo código. Los números, las fracciones (4/7) y los minutos no se tocan.
 */
export function anonimizar(texto: string): { texto: string; nombres: Map<string, string> } {
  const nombres = new Map<string, string>(); // código → original
  const codigos = new Map<string, string>(); // original normalizado → código
  const lineas = texto.replace(/\r/g, "").split("\n").map((linea) => {
    // trozos: palabras y lo que hay entre ellas
    const trozos: { t: string; nombre: boolean }[] = [];
    let ult = 0;
    for (const m of linea.matchAll(PALABRA)) {
      if (m.index! > ult) trozos.push({ t: linea.slice(ult, m.index), nombre: false });
      const w = m[0];
      const n = norm(w);
      // una inicial suelta («J.») no identifica a nadie; las de estadística pasan
      const esNombre = n.length > 1 && !VOCABULARIO.has(n) && !/\d/.test(w);
      trozos.push({ t: w, nombre: esNombre });
      ult = m.index! + w.length;
    }
    if (ult < linea.length) trozos.push({ t: linea.slice(ult), nombre: false });

    let out = "";
    for (let i = 0; i < trozos.length; i++) {
      if (!trozos[i].nombre) { out += trozos[i].t; continue; }
      // junta el nombre completo: nombre (sep corto) nombre (sep corto) …
      let j = i, original = trozos[i].t;
      while (
        j + 2 < trozos.length &&
        !trozos[j + 1].nombre && /^(?: |, ?)$/.test(trozos[j + 1].t) &&
        trozos[j + 2].nombre
      ) {
        original += trozos[j + 1].t + trozos[j + 2].t;
        j += 2;
      }
      // «PÉREZ, J.»: la inicial que va detrás se queda dentro del nombre
      if (j + 2 < trozos.length && /^(?: |, ?)$/.test(trozos[j + 1].t) && /^[A-Za-zÀ-ÿ]\.?$/.test(trozos[j + 2].t)) {
        original += trozos[j + 1].t + trozos[j + 2].t;
        j += 2;
      }
      const clave = norm(original);
      let cod = codigos.get(clave);
      if (!cod) {
        cod = `NOM${codigos.size + 1}`;
        codigos.set(clave, cod);
        nombres.set(cod, original);
      }
      out += cod;
      i = j;
    }
    return out;
  });
  return { texto: lineas.join("\n"), nombres };
}

/** Repone los nombres reales en lo que devuelve la IA (que solo ha visto los códigos). */
export function restaurarNombres(acta: ActaLeida, nombres: Map<string, string>): ActaLeida {
  const poner = (s: string) => s.replace(/NOM\d+/g, (c) => nombres.get(c) ?? c).trim();
  return {
    ...acta,
    equipos: acta.equipos.map((e) => ({
      ...e,
      nombre: poner(e.nombre),
      jugadores: e.jugadores.map((j) => ({ ...j, nombre: poner(j.nombre) })),
    })),
  };
}

// ─── texto desde un PDF o una captura ─────────────────────────────────────
export interface CajaTexto {
  texto: string;
  x: number;
  y: number;
  ancho: number;
  alto: number;
}

export interface LineaTexto {
  texto: string;
  /** borde izquierdo y derecho de la línea, y su altura (en px de la imagen) */
  x0: number;
  x1: number;
  y: number;
  alto: number;
}

/**
 * Agrupa trozos de texto con posición (los de pdf.js o las palabras de Tesseract) en líneas, de
 * arriba abajo. Un hueco grande entre dos trozos de la misma línea es un cambio de columna y se
 * escribe como tabulador, que es lo que `parsePaste` entiende mejor. `y` crece hacia abajo (en un
 * PDF hay que invertirla antes).
 */
export function lineasDeCajas(cajas: CajaTexto[]): LineaTexto[] {
  const validas = cajas.filter((c) => c.texto.trim() && c.alto > 0);
  if (!validas.length) return [];
  const altos = validas.map((c) => c.alto).sort((a, b) => a - b);
  const altoTipico = altos[Math.floor(altos.length / 2)];
  const orden = [...validas].sort((a, b) => a.y - b.y || a.x - b.x);
  const filas: CajaTexto[][] = [];
  for (const c of orden) {
    const fila = filas[filas.length - 1];
    const centro = c.y + c.alto / 2;
    if (fila && Math.abs(centro - (fila[0].y + fila[0].alto / 2)) < altoTipico * 0.5) fila.push(c);
    else filas.push([c]);
  }
  return filas.map((fila) => {
    fila.sort((a, b) => a.x - b.x);
    let s = fila[0].texto.trim();
    for (let i = 1; i < fila.length; i++) {
      const hueco = fila[i].x - (fila[i - 1].x + fila[i - 1].ancho);
      s += (hueco > altoTipico * 0.9 ? "\t" : hueco > altoTipico * 0.12 ? " " : "") + fila[i].texto.trim();
    }
    const ult = fila[fila.length - 1];
    return { texto: s, x0: fila[0].x, x1: ult.x + ult.ancho, y: fila[0].y, alto: Math.max(...fila.map((c) => c.alto)) };
  });
}

/** Las filas de una tabla como texto, con tabuladores entre columnas (ver `lineasDeCajas`). */
export function filasDeCajas(cajas: CajaTexto[]): string {
  return lineasDeCajas(cajas).map((l) => l.texto).join("\n");
}

// ─── sin IA ────────────────────────────────────────────────────────────────
/** El acta pegada con su cabecera, leída sin IA (o el error de `parsePaste`). */
export function actaDeTexto(texto: string): ActaLeida {
  const js = parsePaste(texto) as unknown as JugadorLeido[];
  return {
    fecha: "",
    sinIntentos: false,
    equipos: [{ nombre: "", pts: null, jugadores: js }],
  };
}

/** «59» → «5/9», «417» → «4/7», «410» → «4/10». `null` si no se puede leer como anotados/intentados. */
export function fraccionPerdida(celda: string): string | null {
  const t = celda.replace(/[lI|]/g, "1");
  if (!/^\d{2,3}$/.test(t)) return null;
  if (t.length === 2) return +t[0] <= +t[1] ? `${t[0]}/${t[1]}` : null;
  // tres cifras: primero la barra leída como 1 en medio; si no vale, anotados de 1 cifra e intentos de 2
  if (t[1] === "1" && +t[0] <= +t[2]) return `${t[0]}/${t[2]}`;
  if (+t[0] <= +t.slice(1) && +t.slice(1) <= 30) return `${t[0]}/${t.slice(1)}`;
  return null;
}

/**
 * Errores típicos de leer una tabla con OCR: la barra de «4/7» desaparece o sale como un 1, una l
 * o una I. Con la cabecera delante se sabe qué columnas son de tiros (T2, T3, TL) y ahí cualquier
 * número de 2-3 cifras es una fracción perdida. Sin cabecera, solo se arregla «417» en filas que
 * ya traen otra fracción bien leída. Lo que no se pueda arreglar lo cazan luego los avisos.
 */
export function arreglarOcr(texto: string): string {
  const lineas = texto.split("\n");
  const celdas = (l: string) => l.split("\t").map((c) => c.trim());
  const deTiro = new Set([...COLS.t2, ...COLS.t3, ...COLS.tl]);
  let cabecera = -1;
  let tiros: number[] = [];
  for (let i = 0; i < Math.min(5, lineas.length) && cabecera < 0; i++) {
    const cs = celdas(lineas[i]).map(norm);
    const reconocidas = cs.filter((c) => Object.values(COLS).some((v) => v.includes(c))).length;
    if (reconocidas >= 3) {
      cabecera = i;
      tiros = cs.flatMap((c, k) => (deTiro.has(c) ? [k] : []));
    }
  }
  const ancho = cabecera >= 0 ? celdas(lineas[cabecera]).length : 0;
  return lineas
    .map((linea, i) => {
      const cs = celdas(linea);
      if (i > cabecera && cabecera >= 0 && cs.length === ancho && tiros.length) {
        for (const k of tiros) cs[k] = fraccionPerdida(cs[k]) ?? cs[k];
        return cs.join("\t");
      }
      if (!/\b\d{1,2}\/\d{1,2}\b/.test(linea)) return linea;
      return linea.replace(/(^|\s)(\d)[1lI|](\d)(?=$|\s)/g, (m, pre, a, b) => (+a <= +b ? `${pre}${a}/${b}` : m));
    })
    .join("\n");
}

// ─── lo que no cuadra ──────────────────────────────────────────────────────
export const puntosDeTiros = (j: Pick<JugadorLeido, "t2c" | "t3c" | "tlc">) => 2 * j.t2c + 3 * j.t3c + j.tlc;

/** Avisos para que el entrenador sepa qué revisar antes de guardar. */
export function avisosActa(acta: ActaLeida): string[] {
  const out: string[] = [];
  for (const e of acta.equipos) {
    const quien = e.nombre ? `${e.nombre}: ` : "";
    const malos = e.jugadores.filter((j) => j.pts !== null && j.pts !== puntosDeTiros(j));
    if (malos.length) {
      out.push(
        `${quien}${malos.length === 1 ? "en 1 jugador" : `en ${malos.length} jugadores`} los puntos del acta no cuadran con sus tiros (` +
          malos.slice(0, 4).map((j) => `${j.dorsal ? "#" + j.dorsal : j.nombre} ${j.pts} y los tiros dan ${puntosDeTiros(j)}`).join("; ") +
          (malos.length > 4 ? "…" : "") + ")."
      );
    }
    const suma = e.jugadores.reduce((a, j) => a + puntosDeTiros(j), 0);
    if (e.pts !== null && suma !== e.pts && !malos.length) {
      out.push(`${quien}los tiros de los jugadores suman ${suma} puntos y el marcador dice ${e.pts}.`);
    }
    const sinTiros = e.jugadores.filter((j) => j.pts && puntosDeTiros(j) === 0).length;
    if (sinTiros) out.push(`${quien}${sinTiros} jugador(es) con puntos pero sin desglose de tiros: aquí los puntos salen de los tiros.`);
  }
  if (acta.sinIntentos) out.push("El acta solo da los tiros anotados: los porcentajes saldrán al 100 %.");
  return out;
}
