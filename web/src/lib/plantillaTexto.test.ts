import { describe, expect, it } from "vitest";
import { borrarDatos, fechaValida, hayRepetidos, lineasConNombre, huerfanos, lineasPlantilla, pasarDatos, sinDatos } from "./plantillaTexto";

describe("plantilla escrita", () => {
  it("no pierde a quien repite nombre: el segundo pasa a «(2)»", () => {
    expect(lineasPlantilla("Pau\nMarc\n\nPau\n Pau ")).toEqual(["Pau", "Marc", "Pau (2)", "Pau (3)"]);
    expect(hayRepetidos("Pau\nMarc\nPau")).toBe(true);
    expect(hayRepetidos("Pau\nMarc")).toBe(false);
    // quien desambigua a mano con «(2)» no choca con el sufijo automático
    expect(lineasPlantilla("Pau\nPau (2)\nPau")).toEqual(["Pau", "Pau (2)", "Pau (3)"]);
  });

  it("valida fechas y cuenta líneas", () => {
    expect(fechaValida("2026-10-19")).toBe(true);
    expect(fechaValida("20261-10-19")).toBe(false);
    expect(fechaValida("2026-02-30")).toBe(false);
    expect(fechaValida("1999-01-01")).toBe(false);
    expect(lineasConNombre("a\n\n b \n")).toBe(2);
  });

  it("respeta el máximo de jugadores y el largo del nombre", () => {
    expect(lineasPlantilla("a\nb\nc", 2)).toEqual(["a", "b"]);
    expect(lineasPlantilla("Nombre muy largo de verdad", 5, 6)).toEqual(["Nombre"]);
  });

  it("encuentra los datos huérfanos al renombrar y los pasa sin pisar nada", () => {
    const regs: Record<string, unknown>[] = [{ "4 Laia": 1, Marc: 2 }, { "4 Laia": 3 }, { Nora: 4 }];
    const jugadores = ["4 Laia Pons", "Marc", "Nora", "Pau"];
    expect(huerfanos(regs, jugadores)).toEqual(["4 Laia"]);
    expect(sinDatos(regs, jugadores)).toEqual(["4 Laia Pons", "Pau"]);
    pasarDatos(regs, "4 Laia", "4 Laia Pons");
    expect(regs).toEqual([{ "4 Laia Pons": 1, Marc: 2 }, { "4 Laia Pons": 3 }, { Nora: 4 }]);
    pasarDatos(regs, "Marc", "Nora"); // Nora ya tiene datos en el registro 3, pero no en el 1: solo se pasa ese
    expect(regs[0]).toEqual({ "4 Laia Pons": 1, Nora: 2 });
    borrarDatos(regs, "Nora");
    expect(huerfanos(regs, ["4 Laia Pons"])).toEqual([]);
  });
});
