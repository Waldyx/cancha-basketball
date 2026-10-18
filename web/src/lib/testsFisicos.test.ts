import { describe, expect, it } from "vitest";
import { aCsv, leerMarca, marcaAnterior, mediaGrupo, normalizarStoreTests, prueba, sentido, serie, velocidadNavette, vo2Navette, type SesionTests } from "./testsFisicos";

const ses = (id: string, fecha: string, marcas: SesionTests["marcas"] = {}): SesionTests => ({ id, nombre: id, fecha, edad: 12, nota: "", marcas });

describe("tests físicos", () => {
  it("lee marcas con coma o punto, redondea y rechaza lo imposible", () => {
    const v20 = prueba("v20")!;
    expect(leerMarca(v20, "3,456")).toBe(3.46);
    expect(leerMarca(v20, "3.4")).toBe(3.4);
    expect(leerMarca(v20, "34")).toBeNull();
    expect(leerMarca(v20, "-3")).toBeNull();
    expect(leerMarca(v20, "abc")).toBeNull();
    expect(leerMarca(prueba("salto")!, "41,6")).toBe(42);
  });

  it("Course Navette: velocidad del palier y VO2máx estimado (Léger, 1988)", () => {
    expect(velocidadNavette(1)).toBe(8.5);
    expect(velocidadNavette(6)).toBe(11);
    // 12 años, palier 6 (11 km/h): 31,025 + 3,238·11 − 3,248·12 + 0,1536·11·12 = 47,9
    expect(vo2Navette(6, 12)).toBe(47.9);
    // adulto: la misma ecuación con la edad fija en 18 (Léger 1988). Palier 10 (13 km/h) → 50,6
    expect(vo2Navette(10, 25)).toBe(50.6);
    expect(vo2Navette(10, 18)).toBe(50.6);
    expect(vo2Navette(10, 17)).toBe(51.8); // sin salto al cumplir 18: baja de forma continua
    expect(vo2Navette(6, null)).toBeNull();
  });

  it("sabe si ha mejorado según la prueba", () => {
    expect(sentido(prueba("v20")!, 3.8, 3.6)).toBe(1);
    expect(sentido(prueba("salto")!, 40, 38)).toBe(-1);
    expect(sentido(prueba("salto")!, 40, 40)).toBe(0);
  });

  it("busca la marca anterior y la serie del jugador", () => {
    const a = ses("a", "2026-10-01", { Laia: { v20: 3.9 } });
    const b = ses("b", "2026-12-15", { Laia: { salto: 30 } });
    const c = ses("c", "2027-03-20", { Laia: { v20: 3.7 } });
    expect(marcaAnterior([c, b, a], c, "Laia", "v20")).toMatchObject({ valor: 3.9, sesion: { id: "a" } });
    expect(marcaAnterior([a, b, c], a, "Laia", "v20")).toBeNull();
    expect(serie([c, a, b], "Laia", "v20").map((x) => x.valor)).toEqual([3.9, 3.7]);
  });

  it("hace la media del grupo con los que tienen marca", () => {
    expect(mediaGrupo(ses("a", "2026-10-01", { A: { v20: 3.5 }, B: { v20: 4 }, C: {} }), "v20", ["A", "B", "C"])).toBe(3.75);
    expect(mediaGrupo(ses("a", "2026-10-01"), "v20", ["A"])).toBeNull();
  });

  it("exporta a CSV con coma decimal", () => {
    const csv = aCsv(ses("a", "2026-10-01", { "=Laia": { v20: 3.5, navette: 6.5 } }), ["=Laia", "Marc"]).split("\n");
    expect(csv[1]).toBe("'=Laia;3,50;;;;6,5;");
    expect(csv[2]).toBe("Marc;;;;;;");
  });

  it("valida lo guardado", () => {
    const st = normalizarStoreTests({
      jugadores: "Laia",
      sesiones: [
        { id: "x", fecha: "2026-10-01", edad: 12.4, marcas: { Laia: { v20: 3.5, salto: 500, inventada: 3 } } },
        { id: "x", fecha: "2026-09-01", edad: 3, marcas: "basura" },
        { fecha: "mal" },
      ],
    });
    expect(st.sesiones.map((s) => s.fecha)).toEqual(["2026-09-01", "2026-10-01"]);
    expect(st.sesiones[1]).toMatchObject({ edad: 12, marcas: { Laia: { v20: 3.5 } } });
    expect(st.sesiones[0].edad).toBeNull();
    expect(new Set(st.sesiones.map((s) => s.id)).size).toBe(2);
  });
});
