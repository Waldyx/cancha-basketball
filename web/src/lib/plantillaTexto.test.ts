import { describe, expect, it } from "vitest";
import { hayRepetidos, lineasPlantilla } from "./plantillaTexto";

describe("plantilla escrita", () => {
  it("no pierde a quien repite nombre: el segundo pasa a «(2)»", () => {
    expect(lineasPlantilla("Pau\nMarc\n\nPau\n Pau ")).toEqual(["Pau", "Marc", "Pau (2)", "Pau (3)"]);
    expect(hayRepetidos("Pau\nMarc\nPau")).toBe(true);
    expect(hayRepetidos("Pau\nMarc")).toBe(false);
  });

  it("respeta el máximo de jugadores y el largo del nombre", () => {
    expect(lineasPlantilla("a\nb\nc", 2)).toEqual(["a", "b"]);
    expect(lineasPlantilla("Nombre muy largo de verdad", 5, 6)).toEqual(["Nombre"]);
  });
});
