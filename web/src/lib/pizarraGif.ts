// Exportar la animación como GIF (funciona en WhatsApp de iPhone, a diferencia del WebM).
// Usa `gifenc` (MIT, muy pequeña, empaquetada con la web). Aquí vive lo que NO necesita DOM:
// el calendario de fotogramas y la codificación; el dibujo de cada fotograma (SVG -> canvas) lo
// hace la interfaz.

import { GIFEncoder, applyPalette, quantize } from "gifenc";
import { duracionTotal, type Jugada } from "./pizarra";

export interface ParametrosGif {
  fps: number;
  /** Ancho en píxeles del GIF. */
  ancho: number;
  /** Pausa (ms) que se deja al final antes de repetir. */
  pausaFinal: number;
  /** Número de fotogramas que saldrán. */
  fotogramas: number;
}

/** Tope de fotogramas: un GIF de más de ~15 MB no se puede mandar por WhatsApp. */
export const MAX_FOTOGRAMAS = 220;
const PAUSA_FINAL_MS = 1200;

/**
 * Calidad según lo larga que sea la jugada: una de 3 pasos va a 12 fps y 640 px; una de 30 pasos
 * baja los fps y el tamaño para no pasar de unos pocos MB.
 */
export function parametrosGif(j: Jugada): ParametrosGif {
  const ms = duracionTotal(j) + PAUSA_FINAL_MS;
  let fps = 12;
  let ancho = 640;
  if (ms > 20_000) {
    fps = 8;
    ancho = 560;
  }
  if (ms > 45_000) {
    fps = 5;
    ancho = 480;
  }
  while ((ms / 1000) * fps > MAX_FOTOGRAMAS && fps > 2) fps--;
  return { fps, ancho, pausaFinal: PAUSA_FINAL_MS, fotogramas: Math.max(1, Math.ceil((ms / 1000) * fps)) };
}

/**
 * Instante (ms de la jugada) de cada fotograma. El último cae en el final y se repite (la
 * pausa final) para que el GIF se quede un momento en la posición de llegada antes de repetir.
 */
export function calendarioFotogramas(j: Jugada, fps: number): number[] {
  const total = duracionTotal(j);
  const paso = 1000 / fps;
  const out: number[] = [];
  for (let t = 0; t < total; t += paso) out.push(Math.round(t));
  out.push(total);
  return out;
}

export interface ConstructorGif {
  /** Añade un fotograma (RGBA de ancho × alto). `retraso` en ms. */
  anadir(rgba: Uint8ClampedArray | Uint8Array, ancho: number, alto: number, retraso: number): void;
  terminar(): Uint8Array;
  fotogramas(): number;
}

/** Codifica los fotogramas según llegan (sin guardar los RGBA): la memoria no crece con la duración. */
export function crearGif(): ConstructorGif {
  const gif = GIFEncoder();
  let n = 0;
  return {
    anadir(rgba, ancho, alto, retraso) {
      const paleta = quantize(rgba, 256);
      const indices = applyPalette(rgba, paleta);
      // el primer fotograma lleva el bucle infinito (repeat 0)
      gif.writeFrame(indices, ancho, alto, { palette: paleta, delay: Math.max(20, Math.round(retraso)), repeat: 0 });
      n++;
    },
    terminar() {
      gif.finish();
      return gif.bytes();
    },
    fotogramas: () => n,
  };
}

/** Retraso (ms) entre dos fotogramas a esos fps. */
export const retrasoFotograma = (fps: number): number => Math.round(1000 / fps);
