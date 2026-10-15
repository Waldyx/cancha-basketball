// Código QR del enlace "modo jugador" (para proyectarlo o ponerlo en la tableta y que lo
// escaneen). Usa `uqr` (MIT, ~3 KB, empaquetada con la web: no hay CDN). Lógica pura y sin
// DOM, así que se prueba en Node; el SVG que devuelve es nuestro y no lleva texto del usuario.

import { encode } from "uqr";

/**
 * Qué tal se leerá el QR:
 *  - "claro": hasta la versión 15 (77×77 módulos); se lee bien incluso en un móvil pequeño.
 *  - "denso": versiones 16-25; se lee, pero conviene mostrarlo grande (tableta, proyector).
 *  - "largo": versiones 26-40 (hasta 177×177 módulos): solo se lee si ocupa media pantalla o más.
 *  - "imposible": no cabe en un QR (versión 40 admite 2.953 bytes con corrección baja).
 */
export type LecturaQR = "claro" | "denso" | "largo" | "imposible";

export interface EvaluacionQR {
  lectura: LecturaQR;
  /** ¿Se puede dibujar? (false solo si es imposible) */
  cabe: boolean;
  version: number;
  modulos: number;
  bytes: number;
}

export const VERSION_CLARA = 15;
export const VERSION_DENSA = 25;

const bytesUtf8 = (t: string): number => new TextEncoder().encode(t).length;

/** Corrección de errores: media si el texto es corto (aguanta suciedad y reflejos), baja si no. */
const eccPara = (t: string): "M" | "L" => (t.length <= 500 ? "M" : "L");

/**
 * Codifica el texto. Salvedad medida en las pruebas: los códigos de versión 23 con corrección
 * baja NO los lee jsQR (un decodificador independiente) aunque las versiones 22 y 24 sí, así que
 * ese caso se salta subiendo a la versión 24, que cabe de sobra y sí se lee.
 */
function codificar(texto: string) {
  const ecc = eccPara(texto);
  const r = encode(texto, { ecc, border: 0 });
  if (ecc === "L" && r.version === 23) return encode(texto, { ecc, border: 0, minVersion: 24 });
  return r;
}

export function evaluarQR(texto: string): EvaluacionQR {
  const bytes = bytesUtf8(texto);
  try {
    const r = codificar(texto);
    const lectura: LecturaQR = r.version <= VERSION_CLARA ? "claro" : r.version <= VERSION_DENSA ? "denso" : "largo";
    return { lectura, cabe: true, version: r.version, modulos: r.size, bytes };
  } catch {
    return { lectura: "imposible", cabe: false, version: 0, modulos: 0, bytes };
  }
}

/** Matriz de módulos (true = oscuro) sin borde, o null si no cabe. */
export function matrizQR(texto: string): boolean[][] | null {
  try {
    return codificar(texto).data;
  } catch {
    return null;
  }
}

/** Mensaje para el usuario según la lectura esperada. */
export function avisoQR(e: EvaluacionQR): string {
  switch (e.lectura) {
    case "claro":
      return "";
    case "denso":
      return "Este QR es denso: enséñalo grande (a pantalla completa o proyectado) y a poca distancia.";
    case "largo":
      return "El enlace es largo y el QR queda muy denso: solo se lee si lo pones a pantalla completa y bien iluminado. Para el móvil de los jugadores es más fiable mandar el enlace por WhatsApp.";
    default:
      return "El enlace es demasiado largo para un código QR. Compártelo como enlace, imagen o archivo.";
  }
}

/** SVG del QR con 4 módulos de margen blanco (la "zona de silencio" que exige el estándar). */
export function svgQR(texto: string, opciones: { margen?: number } = {}): string | null {
  const m = matrizQR(texto);
  if (!m) return null;
  const margen = opciones.margen ?? 4;
  const n = m.length;
  const total = n + 2 * margen;
  let d = "";
  for (let y = 0; y < n; y++) {
    // una pasada por fila agrupando módulos contiguos: el path queda pequeño
    let x = 0;
    while (x < n) {
      if (!m[y][x]) {
        x++;
        continue;
      }
      let fin = x;
      while (fin < n && m[y][fin]) fin++;
      d += `M${x + margen},${y + margen}h${fin - x}v1h${x - fin}z`;
      x = fin;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" shape-rendering="crispEdges" role="img" aria-label="Código QR del enlace"><rect width="${total}" height="${total}" fill="#fff"/><path d="${d}" fill="#000"/></svg>`;
}

/** Imagen RGBA (blanco y negro) del QR para pruebas y para decodificarlo. */
export function rgbaQR(texto: string, pixelPorModulo = 4, margen = 4): { data: Uint8ClampedArray; ancho: number } | null {
  const m = matrizQR(texto);
  if (!m) return null;
  const ancho = (m.length + 2 * margen) * pixelPorModulo;
  const data = new Uint8ClampedArray(ancho * ancho * 4).fill(255);
  for (let y = 0; y < m.length; y++) {
    for (let x = 0; x < m.length; x++) {
      if (!m[y][x]) continue;
      for (let py = 0; py < pixelPorModulo; py++) {
        for (let px = 0; px < pixelPorModulo; px++) {
          const i = (((y + margen) * pixelPorModulo + py) * ancho + (x + margen) * pixelPorModulo + px) * 4;
          data[i] = data[i + 1] = data[i + 2] = 0;
        }
      }
    }
  }
  return { data, ancho };
}
