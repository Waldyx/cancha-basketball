import { describe, it, expect } from "vitest";
import { actaDeTexto, anonimizar, arreglarOcr, avisosActa, fraccionPerdida, filasDeCajas, restaurarNombres, type ActaLeida, type JugadorLeido } from "./actaIA";
import { normalizarActa } from "../../api/acta.ts";

const ACTA = `AB PREMIÀ BLAU 55 - 60 A.E. SANT ANDREU NATZARET
Dorsal Jugador Min Punts T2 T3 TL Reb As Faltes
7 PÉREZ GIL, Marc 24 15 4/7 1/3 4/4 6 3 2
12 Joan Vilà 18 8 4/9 0/1 0/2 3 1 3
4 FONT, J. 10 2 1/2 0/0 0/0 1 0 1`;

describe("anonimizar", () => {
  it("no deja salir ni un nombre de jugador ni de equipo", () => {
    const { texto } = anonimizar(ACTA);
    for (const n of ["PÉREZ", "GIL", "Marc", "Joan", "Vilà", "FONT", "PREMIÀ", "BLAU", "ANDREU", "NATZARET"]) {
      expect(texto, n).not.toContain(n);
    }
  });
  it("conserva la cabecera, los números y las fracciones", () => {
    const { texto } = anonimizar(ACTA);
    expect(texto).toContain("Dorsal Jugador Min Punts T2 T3 TL Reb As Faltes");
    expect(texto).toContain("24 15 4/7 1/3 4/4 6 3 2");
    expect(texto).toContain("55 - 60");
  });
  it("un nombre completo es un solo código, y el mismo nombre recibe el mismo código", () => {
    const { texto, nombres } = anonimizar("7 PÉREZ GIL, Marc 24\n9 PÉREZ GIL, Marc 3\n8 FONT, J. 2");
    const lineas = texto.split("\n");
    expect(lineas[0]).toBe("7 NOM1 24");
    expect(lineas[1]).toBe("9 NOM1 3");
    expect(lineas[2]).toBe("8 NOM2 2");
    expect(nombres.get("NOM1")).toBe("PÉREZ GIL, Marc");
    expect(nombres.get("NOM2")).toBe("FONT, J.");
  });
});

describe("restaurarNombres", () => {
  it("repone los nombres reales en lo que devuelve la IA", () => {
    const { nombres } = anonimizar("7 PÉREZ GIL, Marc 24\nCB Mataró 40");
    const j = { nombre: "NOM1", dorsal: "7", pts: 15 } as JugadorLeido;
    const acta: ActaLeida = { fecha: "", sinIntentos: false, equipos: [{ nombre: "NOM2", pts: 40, jugadores: [j] }] };
    const r = restaurarNombres(acta, nombres);
    expect(r.equipos[0].jugadores[0].nombre).toBe("PÉREZ GIL, Marc");
    expect(r.equipos[0].nombre).toBe("CB Mataró");
  });
});

describe("filasDeCajas", () => {
  it("reconstruye la tabla con tabuladores entre columnas y la lee parsePaste", () => {
    const fila = (y: number, celdas: [string, number][]) => celdas.map(([t, x]) => ({ texto: t, x, y, ancho: t.length * 8, alto: 14 }));
    const cajas = [
      ...fila(10, [["Dorsal", 0], ["Jugador", 80], ["Min", 300], ["T2", 360], ["T3", 420], ["TL", 480]]),
      // «Marc» y «Pérez» van separados por un espacio normal: es la misma celda
      ...fila(40, [["7", 0], ["Marc", 80], ["Pérez", 118], ["24", 300], ["4/7", 360], ["1/3", 420], ["4/4", 480]]),
      ...fila(71, [["12", 0], ["Joan", 80], ["18", 300], ["4/9", 360], ["0/1", 420], ["0/2", 480]]),
    ];
    const texto = filasDeCajas(cajas);
    expect(texto.split("\n")[1]).toBe("7\tMarc Pérez\t24\t4/7\t1/3\t4/4");
    const acta = actaDeTexto(texto);
    expect(acta.equipos[0].jugadores.map((j) => [j.nombre, j.t2c, j.t2i, j.t3c, j.tli])).toEqual([
      ["Marc Pérez", 4, 7, 1, 4],
      ["Joan", 4, 9, 0, 2],
    ]);
  });
});

describe("normalizarActa (api/acta)", () => {
  it("deja enteros en rango, intentos ≥ anotados y fuera las filas de totales", () => {
    const a = normalizarActa({
      fecha: "2026-10-18",
      equipos: [
        {
          nombre: "AB Premià",
          pts: "55",
          jugadores: [
            { dorsal: "#7", nombre: "Marc", min: "24:35", pts: 15, t2c: 4, t2i: 2, t3c: "1", t3i: 3, tlc: 4, tli: 4, fal: 9, ro: -3 },
            { dorsal: "", nombre: "Totals", t2c: 30 },
          ],
        },
        { nombre: "Rival", pts: null, jugadores: [] },
      ],
    })!;
    expect(a.fecha).toBe("2026-10-18");
    expect(a.equipos).toHaveLength(1);
    const j = a.equipos[0].jugadores;
    expect(j).toHaveLength(1);
    expect(j[0]).toMatchObject({ dorsal: "7", min: 25, t2c: 4, t2i: 4, t3c: 1, fal: 6, ro: 0, pts: 15 });
    expect(a.equipos[0].pts).toBe(55);
  });
  it("null si no hay ni un jugador", () => {
    expect(normalizarActa({ equipos: [{ nombre: "x", jugadores: [] }] })).toBeNull();
    expect(normalizarActa("hola")).toBeNull();
  });
});

describe("avisosActa", () => {
  const j = (p: Partial<JugadorLeido>): JugadorLeido =>
    ({ nombre: "x", dorsal: "1", pts: null, min: 0, t2c: 0, t2i: 0, t3c: 0, t3i: 0, tlc: 0, tli: 0, ro: 0, rd: 0, ast: 0, rob: 0, tap: 0, per: 0, fal: 0, ...p });
  it("avisa de los puntos que no cuadran con los tiros", () => {
    const av = avisosActa({ fecha: "", sinIntentos: false, equipos: [{ nombre: "A", pts: null, jugadores: [j({ dorsal: "7", pts: 12, t2c: 5 })] }] });
    expect(av.join(" ")).toContain("#7 12 y los tiros dan 10");
  });
  it("avisa si el marcador no coincide con la suma", () => {
    const av = avisosActa({ fecha: "", sinIntentos: true, equipos: [{ nombre: "A", pts: 51, jugadores: [j({ t2c: 10 })] }] });
    expect(av[0]).toContain("suman 20 puntos y el marcador dice 51");
    expect(av.at(-1)).toContain("100 %");
  });
  it("sin avisos si todo cuadra", () => {
    expect(avisosActa({ fecha: "", sinIntentos: false, equipos: [{ nombre: "A", pts: 13, jugadores: [j({ pts: 13, t2c: 2, t3c: 2, tlc: 3 })] }] })).toEqual([]);
  });
});

describe("arreglarOcr", () => {
  it("devuelve la barra que el OCR leyó como 1, l o I", () => {
    expect(arreglarOcr("7\tMarc\t24\t417\t1/3\t4l4")).toBe("7\tMarc\t24\t4/7\t1/3\t4/4");
  });
  it("no toca filas sin fracciones ni números que no pueden ser anotados/intentados", () => {
    expect(arreglarOcr("7 Marc 24 417")).toBe("7 Marc 24 417");
    expect(arreglarOcr("7 Marc 1/3 712")).toBe("7 Marc 1/3 712");
  });
});

describe("actaDeTexto", () => {
  it("conserva los puntos del acta para poder avisar si no cuadran con los tiros", () => {
    const a = actaDeTexto("Dorsal\tJugador\tPunts\tT2\tT3\tTL\n7\tMarc\t15\t4/7\t1/3\t4/4\n9\tPau\t9\t1/7\t1/3\t0/0");
    expect(a.equipos[0].jugadores.map((j) => j.pts)).toEqual([15, 9]);
    expect(avisosActa(a).join(" ")).toContain("#9 9 y los tiros dan 5");
  });
});

describe("arreglarOcr con cabecera", () => {
  it("rehace las fracciones perdidas solo en las columnas de tiro", () => {
    const t = "Dorsal\tJugador\tMin\tPunts\tT2\tT3\tTL\n4\tLaia\t22\t12\t59\t02\t2/4\n7\tAina\t25\t17\t410\t25\t33";
    expect(arreglarOcr(t).split("\n").slice(1)).toEqual(["4\tLaia\t22\t12\t5/9\t0/2\t2/4", "7\tAina\t25\t17\t4/10\t2/5\t3/3"]);
  });
  it("no inventa una fracción imposible", () => {
    expect(fraccionPerdida("92")).toBeNull();
    expect(fraccionPerdida("417")).toBe("4/7");
    expect(fraccionPerdida("4l7")).toBe("4/7");
  });
});

describe("normalizarActa con trozos solapados", () => {
  it("una fila leída en dos trozos cuenta una vez", () => {
    const fila = { dorsal: "7", nombre: "Marc", t2c: 4, t2i: 7 };
    const a = normalizarActa({ equipos: [{ nombre: "A", jugadores: [fila, { ...fila, nombre: "MARC" }, { dorsal: "9", nombre: "Pau" }] }] })!;
    expect(a.equipos[0].jugadores.map((j) => j.dorsal)).toEqual(["7", "9"]);
  });
});
