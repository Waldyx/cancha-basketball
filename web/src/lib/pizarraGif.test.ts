import { describe, expect, it } from "vitest";
import { duracionTotal, nuevaJugada, type Jugada, type Paso } from "./pizarra";
import { MAX_FOTOGRAMAS, calendarioFotogramas, crearGif, parametrosGif, retrasoFotograma } from "./pizarraGif";
import { PLANTILLAS, PLANTILLAS_EJERCICIOS } from "./pizarraPlantillas";

/** Lee la estructura de un GIF: tamaño, fotogramas, retrasos y si tiene bucle infinito. */
function leerGif(b: Uint8Array) {
  const cab = String.fromCharCode(...b.slice(0, 6));
  const ancho = b[6] | (b[7] << 8);
  const alto = b[8] | (b[9] << 8);
  let i = 10;
  const packed = b[i++];
  i += 2; // fondo y relación de aspecto
  if (packed & 0x80) i += 3 * 2 ** ((packed & 7) + 1);
  const retrasos: number[] = [];
  let imagenes = 0;
  let bucle: number | null = null;
  let fin = false;
  const saltaSub = () => {
    while (b[i] !== 0) i += b[i] + 1;
    i++;
  };
  while (i < b.length && !fin) {
    const t = b[i++];
    if (t === 0x3b) fin = true;
    else if (t === 0x21) {
      const label = b[i++];
      if (label === 0xf9) retrasos.push((b[i + 2] | (b[i + 3] << 8)) * 10);
      if (label === 0xff && String.fromCharCode(...b.slice(i + 1, i + 12)) === "NETSCAPE2.0") bucle = b[i + 14] | (b[i + 15] << 8);
      saltaSub();
    } else if (t === 0x2c) {
      imagenes++;
      const f = b[i + 8];
      i += 9;
      if (f & 0x80) i += 3 * 2 ** ((f & 7) + 1);
      i++; // tamaño mínimo del código LZW
      saltaSub();
    } else throw new Error("GIF corrupto en el byte " + i);
  }
  return { cab, ancho, alto, imagenes, retrasos, bucle, fin };
}

const pasoVacio = (): Paso => ({ piezas: [], lineas: [], textos: [], nota: "" });
const jugadaDe = (pasos: number): Jugada => nuevaJugada({ pasos: Array.from({ length: pasos }, pasoVacio) });

function franjas(ancho: number, alto: number, k: number): Uint8ClampedArray {
  const d = new Uint8ClampedArray(ancho * alto * 4);
  for (let y = 0; y < alto; y++) {
    for (let x = 0; x < ancho; x++) {
      const o = (y * ancho + x) * 4;
      const rojo = (x + k * 3) % ancho < ancho / 2;
      d[o] = rojo ? 220 : 20;
      d[o + 1] = rojo ? 40 : 60;
      d[o + 2] = rojo ? 20 : 200;
      d[o + 3] = 255;
    }
  }
  return d;
}

describe("calendario de fotogramas", () => {
  it("empieza en 0, avanza a intervalos regulares y acaba exactamente en el final", () => {
    const j = jugadaDe(3);
    const c = calendarioFotogramas(j, 12);
    expect(c[0]).toBe(0);
    expect(c[c.length - 1]).toBe(duracionTotal(j));
    expect(c[1] - c[0]).toBeCloseTo(1000 / 12, 0);
    for (let i = 1; i < c.length; i++) expect(c[i]).toBeGreaterThan(c[i - 1]);
  });

  it("una jugada de un solo paso da un único fotograma útil", () => {
    expect(calendarioFotogramas(jugadaDe(1), 12).length).toBeLessThanOrEqual(8);
  });
});

describe("parámetros del GIF según la duración", () => {
  it("una jugada corta sale a 12 fps y 640 px", () => {
    const p = parametrosGif(jugadaDe(3));
    expect(p).toMatchObject({ fps: 12, ancho: 640 });
    expect(p.fotogramas).toBeGreaterThan(30);
  });

  it("las largas bajan fps y tamaño y nunca pasan del tope de fotogramas", () => {
    const larga = parametrosGif(jugadaDe(15)); // ~30 s
    const enorme = parametrosGif(jugadaDe(40)); // ~85 s
    expect(larga.fps).toBeLessThan(12);
    expect(enorme.fps).toBeLessThanOrEqual(larga.fps);
    expect(enorme.ancho).toBeLessThan(640);
    for (const p of [larga, enorme, parametrosGif(jugadaDe(2))]) expect(p.fotogramas).toBeLessThanOrEqual(MAX_FOTOGRAMAS + 2);
  });

  it("todas las plantillas y ejercicios caben en un GIF razonable", () => {
    for (const p of [...PLANTILLAS, ...PLANTILLAS_EJERCICIOS]) {
      const r = parametrosGif(p.crear());
      expect(r.fotogramas, p.id).toBeLessThanOrEqual(MAX_FOTOGRAMAS + 2);
      expect(r.ancho, p.id).toBeGreaterThanOrEqual(480);
    }
  });
});

describe("codificación del GIF", () => {
  it("genera un GIF89a válido con el tamaño, los fotogramas, los retrasos y el bucle infinito", () => {
    const g = crearGif();
    const retraso = retrasoFotograma(12);
    for (let k = 0; k < 6; k++) g.anadir(franjas(64, 40, k), 64, 40, retraso);
    const bytes = g.terminar();
    const info = leerGif(bytes);
    expect(info.cab).toBe("GIF89a");
    expect(info).toMatchObject({ ancho: 64, alto: 40, imagenes: 6, fin: true, bucle: 0 });
    expect(info.retrasos).toHaveLength(6);
    expect(info.retrasos.every((r) => r === 80 || r === 90)).toBe(true); // 83 ms redondeado a centésimas
    expect(g.fotogramas()).toBe(6);
    expect(bytes[bytes.length - 1]).toBe(0x3b);
  });

  it("un fotograma que se queda quieto (pausa) admite un retraso largo", () => {
    const g = crearGif();
    g.anadir(franjas(32, 32, 0), 32, 32, 83);
    g.anadir(franjas(32, 32, 1), 32, 32, 1200);
    const info = leerGif(g.terminar());
    expect(info.retrasos).toEqual([80, 1200]);
  });

  it("no guarda los RGBA: el tamaño del GIF crece con los fotogramas, no con su resolución bruta", () => {
    const g = crearGif();
    for (let k = 0; k < 30; k++) g.anadir(franjas(160, 100, k), 160, 100, 83);
    const bytes = g.terminar();
    expect(bytes.length).toBeLessThan(30 * 160 * 100); // mucho menos que 1 byte por píxel
    expect(leerGif(bytes).imagenes).toBe(30);
  });

  it("el retraso mínimo es de 20 ms (los navegadores lo suben si es menor)", () => {
    const g = crearGif();
    g.anadir(franjas(8, 8, 0), 8, 8, 1);
    expect(leerGif(g.terminar()).retrasos[0]).toBe(20);
  });
});
