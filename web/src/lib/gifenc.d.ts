// gifenc (codificador de GIF, MIT) no trae tipos: solo se declara lo que usamos.
declare module "gifenc" {
  export type Paleta = number[][];
  export interface OpcionesFotograma {
    palette?: Paleta;
    delay?: number;
    repeat?: number;
    transparent?: boolean;
    transparentIndex?: number;
    first?: boolean;
  }
  export interface Codificador {
    writeFrame(indices: Uint8Array, width: number, height: number, opts?: OpcionesFotograma): void;
    finish(): void;
    bytes(): Uint8Array;
    bytesView(): Uint8Array;
  }
  export function GIFEncoder(opts?: { initialCapacity?: number; auto?: boolean }): Codificador;
  export function quantize(
    rgba: Uint8Array | Uint8ClampedArray,
    maxColors: number,
    opts?: { format?: "rgb565" | "rgb444" | "rgba4444"; oneBitAlpha?: boolean | number }
  ): Paleta;
  export function applyPalette(rgba: Uint8Array | Uint8ClampedArray, palette: Paleta, format?: "rgb565" | "rgb444" | "rgba4444"): Uint8Array;
  const def: typeof GIFEncoder;
  export default def;
}
