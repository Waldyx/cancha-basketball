import { describe, expect, it } from "vitest";
import { lineaVacia, type Equipo, type LineaEq } from "./statsEquipo";
import { informeJugador, puntosSerie } from "./informeFamilias";

const l = (jid: string, x: Partial<LineaEq>): LineaEq => ({ ...lineaVacia(), jid, min: 10, ...x });

function equipo(): Equipo {
  const partidos = [1, 2, 3, 4].map((n) => ({
    id: `p${n}`,
    fecha: `2026-10-0${n}`,
    rival: `Rival ${n}`,
    competicion: "",
    pf: null,
    pc: null,
    lineas: [
      // Laia: anota mucho y tira bien los libres, todos los partidos
      l("laia", { t2c: 5, t2i: 9, tlc: 3, tli: 4 }),
      // Marc: va a más (0, 1, 4, 6 canastas)
      l("marc", { t2c: [0, 1, 4, 6][n - 1], t2i: 7, rd: 1 }),
      // Nora: solo juega dos partidos, poco
      ...(n <= 2 ? [l("nora", { min: 4 })] : []),
    ],
  }));
  return {
    id: "e1",
    nombre: "Infantil A",
    categoria: "Infantil",
    jugadores: [
      { id: "laia", dorsal: "4", nombre: "Laia" },
      { id: "marc", dorsal: "7", nombre: "Marc" },
      { id: "nora", dorsal: "9", nombre: "Nora" },
    ],
    partidos,
  };
}

describe("informe para las familias", () => {
  it("resume la temporada del jugador y su mejor partido", () => {
    const inf = informeJugador(equipo(), "laia")!;
    expect(inf).toMatchObject({ nombre: "Laia", pj: 4, partidosEquipo: 4 });
    expect(inf.medias.pts).toBe(13);
    expect(inf.tiro.tl).toEqual([12, 16]);
    expect(inf.serie).toEqual([13, 13, 13, 13]);
    expect(inf.mejor?.rival).toBe("Rival 1");
  });

  it("solo dice cosas buenas: puntos fuertes y constancia", () => {
    const t = informeJugador(equipo(), "laia")!.puntosFuertes.join(" ");
    expect(t).toMatch(/de los que más anotan/);
    expect(t).toMatch(/tiros libres: 75 %/);
    expect(t).toMatch(/No se ha perdido ni un partido/);
  });

  it("dice que ha ido a más solo si es verdad", () => {
    expect(informeJugador(equipo(), "marc")!.mejora).toBe(true);
    expect(informeJugador(equipo(), "marc")!.puntosFuertes.join(" ")).toMatch(/ha ido a más/i);
    expect(informeJugador(equipo(), "laia")!.mejora).toBe(false);
  });

  it("quien apenas juega también recibe una frase, sin comparaciones", () => {
    const inf = informeJugador(equipo(), "nora")!;
    expect(inf.puntosFuertes).toEqual(["Ha jugado 2 partidos esta temporada, 4 minutos de media."]);
    for (const f of [...inf.puntosFuertes, ...informeJugador(equipo(), "marc")!.puntosFuertes]) {
      expect(f).not.toMatch(/Laia|Marc|Nora|peor|menos que/);
    }
  });

  it("dibuja la serie de puntos dentro del recuadro", () => {
    expect(puntosSerie([0, 5, 10], 100, 20)).toBe("0,20 50,10 100,0");
    expect(puntosSerie([], 100, 20)).toBe("");
    expect(informeJugador(equipo(), "nadie")).toBeNull();
  });
});
