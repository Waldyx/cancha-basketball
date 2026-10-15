import jsQR from "jsqr";
import { describe, expect, it } from "vitest";
import { codificarEnlace, esModoJugador, hashModoJugador, payloadDeHash } from "./pizarra";
import { PLANTILLAS, PLANTILLAS_EJERCICIOS } from "./pizarraPlantillas";
import { avisoQR, evaluarQR, matrizQR, rgbaQR, svgQR } from "./pizarraQR";

const BASE = "https://canchazapa.com/pizarra";

async function urlDe(j: ReturnType<(typeof PLANTILLAS)[number]["crear"]>): Promise<string> {
  return BASE + hashModoJugador(await codificarEnlace([j]));
}

/** Lee el QR como lo haría un móvil: sobre una imagen. */
function leer(texto: string, px = 4): string | null {
  const img = rgbaQR(texto, px)!;
  const r = jsQR(img.data, img.ancho, img.ancho);
  return r ? r.data : null;
}

describe("modo jugador en el enlace", () => {
  it("se pide con &m=jugador detrás del payload y no estorba a la lectura del payload", () => {
    const h = hashModoJugador("zjAbC-_9");
    expect(h).toBe("#j=zjAbC-_9&m=jugador");
    expect(esModoJugador(h)).toBe(true);
    expect(payloadDeHash(h)).toBe("zjAbC-_9");
  });

  it("un enlace normal o con otro parámetro no lo activa", () => {
    expect(esModoJugador("#j=zjAbC")).toBe(false);
    expect(esModoJugador("")).toBe(false);
    expect(esModoJugador("#j=zjAbC&m=editor")).toBe(false);
    expect(esModoJugador("#j=zjm=jugador")).toBe(false);
    expect(esModoJugador("#m=jugador&j=zjAbC")).toBe(true);
  });
});

describe("evaluación del QR", () => {
  it("un enlace corto se lee con claridad", () => {
    const e = evaluarQR("https://canchazapa.com/pizarra#j=abc");
    expect(e.lectura).toBe("claro");
    expect(e.cabe).toBe(true);
    expect(e.version).toBeLessThanOrEqual(15);
    expect(avisoQR(e)).toBe("");
  });

  it("uno de unos 700 caracteres es denso y uno de ~2000 es largo, con aviso", () => {
    const denso = evaluarQR("x".repeat(700));
    expect(denso.lectura).toBe("denso");
    expect(avisoQR(denso)).toMatch(/denso/);
    const largo = evaluarQR("x".repeat(2000));
    expect(largo.lectura).toBe("largo");
    expect(largo.cabe).toBe(true);
    expect(avisoQR(largo)).toMatch(/largo/);
  });

  it("más de lo que admite un QR (versión 40) se declara imposible y no se dibuja", () => {
    const e = evaluarQR("x".repeat(4000));
    expect(e.lectura).toBe("imposible");
    expect(e.cabe).toBe(false);
    expect(avisoQR(e)).toMatch(/demasiado largo/);
    expect(matrizQR("x".repeat(4000))).toBeNull();
    expect(svgQR("x".repeat(4000))).toBeNull();
  });

  it("la versión crece con el texto", () => {
    expect(evaluarQR("x".repeat(300)).version).toBeLessThan(evaluarQR("x".repeat(1200)).version);
  });
});

describe("SVG del QR", () => {
  it("es un SVG propio, cuadrado, con margen blanco y sin nada del usuario dentro", () => {
    const s = svgQR("https://canchazapa.com/pizarra#j=<script>alert(1)</script>")!;
    expect(s.startsWith("<svg")).toBe(true);
    expect(s).toContain('viewBox="0 0 ');
    expect(s).toContain('fill="#fff"');
    expect(s).not.toContain("script");
    const n = matrizQR("https://canchazapa.com/pizarra#j=<script>alert(1)</script>")!.length;
    expect(s).toContain(`viewBox="0 0 ${n + 8} ${n + 8}"`);
  });
});

describe("el QR se puede leer de verdad (decodificado con jsQR)", () => {
  it("un enlace corto", () => {
    const t = "https://canchazapa.com/pizarra#j=zjabc&m=jugador";
    expect(leer(t)).toBe(t);
  });

  it("los enlaces de las plantillas y de los ejercicios en modo jugador", async () => {
    for (const p of [...PLANTILLAS, ...PLANTILLAS_EJERCICIOS]) {
      const url = await urlDe(p.crear());
      const e = evaluarQR(url);
      if (!e.cabe) continue; // los demasiado largos se avisan, no se dibujan
      expect(leer(url), `${p.id} (${url.length} caracteres, versión ${e.version})`).toBe(url);
    }
  });

  it("al menos la mayoría de las plantillas caben en un QR", async () => {
    let caben = 0;
    const todas = [...PLANTILLAS, ...PLANTILLAS_EJERCICIOS];
    for (const p of todas) if (evaluarQR(await urlDe(p.crear())).cabe) caben++;
    expect(caben).toBeGreaterThanOrEqual(Math.ceil(todas.length * 0.75));
  });

  it("cada tamaño de enlace, de 30 a 2.800 caracteres, se lee (incluidas las versiones que fallan con otros generadores)", () => {
    const alfabeto = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
    const fallos: number[] = [];
    for (let largo = 30; largo <= 2800; largo += 37) {
      let t = "";
      for (let i = 0; i < largo; i++) t += alfabeto[(i * 7 + (i >> 3) * 13) % alfabeto.length];
      if (!evaluarQR(t).cabe) continue;
      if (leer(t) !== t) fallos.push(largo);
    }
    expect(fallos).toEqual([]);
  });

  it("texto con acentos y símbolos", () => {
    const t = "https://canchazapa.com/pizarra#j=ñandú-€&m=jugador";
    expect(leer(t)).toBe(t);
  });
});
