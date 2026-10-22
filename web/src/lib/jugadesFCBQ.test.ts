import { describe, it, expect } from "vitest";
import { actaDeJugadas, cabeceraDeLineas, clasificar, jugadasDeLineas, unirJugadas } from "./jugadesFCBQ";
import { avisosActa, type LineaTexto } from "./actaIA";

// Posiciones medidas en una captura real de la app (1084 px de ancho, 17-oct-2026). Los nombres,
// inventados.
const W = 1084;
const L = (texto: string, x0: number, y: number, x1 = x0 + texto.length * 18): LineaTexto => ({ texto, x0, x1, y, alto: 40 });

const CABECERA = [
  L("Federació Catalana de Basquetbol", 400, 210),
  L("Resum\tJugades", 225, 355, 870),
  { texto: "60\t55", x0: 415, x1: 680, y: 540, alto: 90 }, // cifras grandes
  // como en la app: la fecha y la hora en la misma línea que los nombres
  L("A.E SANT ANDREU\t17/10/2026\tAB PREMIÀ BLAU", 64, 675, 1010),
  L("NATZARET\t10:30h", 118, 712, 600),
  L("P1\tP2\tP3\tP4\tP1\tP2\tP3\tP4", 115, 835, 970),
  L("11\t4\t2\t12\t14\t4\t10\t8", 115, 885, 970),
];
// visitante: texto pegado al margen izquierdo; local: a la derecha
const TARJETAS = [
  L("P1\t06:00", 60, 1140, 430), L("0\t-\t0\tA", 60, 1215, 790), L("Salt guanyat", 60, 1330), L("#5 A.H.M.R.", 60, 1385),
  L("P1\t06:00", 655, 1555, 1025), L("0 - 0", 655, 1630, 1010), L("Salt perdut", 820, 1745), L("#19 POL CASAS ROCA", 590, 1800),
  L("P1\t05:28", 655, 1965, 1025), L("3 - 0", 655, 2040, 1010), L("Cistella de 3", 790, 2155), L("#8 ARNAU GARCIA", 650, 2210),
];

describe("jugadasDeLineas", () => {
  it("lee las tarjetas completas con su lado (local a la derecha, visitante a la izquierda)", () => {
    const js = jugadasDeLineas([...CABECERA, ...TARJETAS], W);
    expect(js.map((j) => [j.periodo, j.reloj, `${j.local}-${j.visitante}`, j.tipo, j.valor, j.dorsal, j.lado])).toEqual([
      [1, "06:00", "0-0", "otra", 0, "5", "visitante"],
      [1, "06:00", "0-0", "otra", 0, "19", "local"],
      [1, "05:28", "3-0", "canasta", 3, "8", "local"],
    ]);
    expect(js[2].nombre).toBe("ARNAU GARCIA");
  });
  it("una tarjeta cortada (sin su línea de jugador) no se inventa", () => {
    expect(jugadasDeLineas(TARJETAS.slice(0, 7), W)).toHaveLength(1);
  });
  it("tolera el OCR: «Pl» por P1, «05.28» y el marcador sin guion", () => {
    const js = jugadasDeLineas([L("Pl\t05.28", 655, 10), L("3\t0", 655, 80), L("Cistella de 3", 790, 190), L("#8 ARNAU", 650, 240)], W);
    expect(js[0]).toMatchObject({ periodo: 1, reloj: "05:28", local: 3, visitante: 0, valor: 3 });
  });
});

describe("clasificar", () => {
  it("canastas, tiros libres, fallos y faltas", () => {
    expect(clasificar("Cistella de 2")).toEqual({ tipo: "canasta", valor: 2 });
    expect(clasificar("Tir lliure anotat")).toEqual({ tipo: "canasta", valor: 1 });
    expect(clasificar("Tir lliure fallat")).toEqual({ tipo: "fallo", valor: 1 });
    expect(clasificar("Falta personal")).toEqual({ tipo: "falta", valor: 0 });
    expect(clasificar("Salt perdut")).toEqual({ tipo: "otra", valor: 0 });
  });
});

describe("cabeceraDeLineas", () => {
  it("una línea de dos números de letra normal no es el marcador final", () => {
    expect(cabeceraDeLineas([L("1\t5", 400, 500), L("Cistella de 3", 60, 600), L("Salt guanyat", 60, 700)], W).final).toBeNull();
  });
  it("nombres de los dos equipos y marcador final", () => {
    expect(cabeceraDeLineas(CABECERA, W)).toEqual({ local: "A.E SANT ANDREU NATZARET", visitante: "AB PREMIÀ BLAU", final: [60, 55] });
  });
});

describe("unirJugadas + actaDeJugadas", () => {
  const canasta = (reloj: string, local: number, visitante: number, valor: number, dorsal: string, lado: "local" | "visitante", texto = `Cistella de ${valor}`) =>
    ({ periodo: 1, reloj, segundos: +reloj.slice(0, 2) * 60 + +reloj.slice(3), local, visitante, texto, tipo: "canasta" as const, valor, dorsal, nombre: `J${dorsal}`, lado });

  it("la misma jugada vista en dos fotogramas cuenta una vez y se ordena por reloj", () => {
    const a = canasta("05:28", 3, 0, 3, "8", "local");
    const b = canasta("04:10", 3, 2, 2, "12", "visitante");
    const u = unirJugadas([[a], [a, b], [b]]);
    expect(u.map((j) => j.reloj)).toEqual(["05:28", "04:10"]);
  });

  it("monta la tabla por jugador y avisa del hueco en el marcador", () => {
    const js = unirJugadas([[
      canasta("05:28", 3, 0, 3, "8", "local"),
      canasta("04:10", 3, 2, 2, "12", "visitante"),
      // aquí falta una canasta de 2 del local (5-2) que no se leyó
      canasta("02:00", 7, 2, 2, "8", "local"),
      { ...canasta("01:30", 7, 2, 0, "12", "visitante"), texto: "Falta personal", tipo: "falta" as const },
    ]]);
    const { acta, avisos } = actaDeJugadas(js, { local: "A", visitante: "B", final: [7, 2] });
    const ocho = acta.equipos[0].jugadores.find((j) => j.dorsal === "8")!;
    const doce = acta.equipos[1].jugadores.find((j) => j.dorsal === "12")!;
    expect([ocho.pts, ocho.t3c, ocho.t2c, ocho.fal]).toEqual([5, 1, 1, 0]);
    expect([doce.pts, doce.t2c, doce.fal]).toEqual([2, 1, 1]);
    expect(avisos.join(" ")).toContain("Entre 3-2 y 7-2");
    // y el aviso general ve que el local suma 5 con un marcador de 7
    expect(avisosActa(acta).join(" ")).toContain("suman 5 puntos y el marcador dice 7");
    expect(acta.sinIntentos).toBe(true);
  });
});

describe("unirJugadas con fotogramas movidos", () => {
  it("un dorsal mal leído en un fotograma no duplica la canasta: gana el más votado", () => {
    const base = { periodo: 2, reloj: "03:10", segundos: 190, local: 12, visitante: 9, texto: "Cistella de 2", tipo: "canasta" as const, valor: 2, lado: "visitante" as const };
    const u = unirJugadas([[{ ...base, dorsal: "12", nombre: "PAU" }], [{ ...base, dorsal: "17", nombre: "PAU" }], [{ ...base, dorsal: "12", nombre: "PAU" }]]);
    expect(u).toHaveLength(1);
    expect(u[0].dorsal).toBe("12");
  });
});
