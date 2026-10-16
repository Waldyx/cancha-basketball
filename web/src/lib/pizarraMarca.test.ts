import { describe, expect, it } from "vitest";
import { COLOR_POR_DEFECTO, MAX_ESCUDO, escudoValido, leerMarca, medidasReducidas, normalizarMarca } from "./pizarraMarca";

const PNG = "data:image/png;base64,iVBORw0KGgo=";

describe("marca del club", () => {
  it("acepta nombre, color y escudo válidos", () => {
    expect(normalizarMarca({ nombre: "  AB  Premià ", color: "#1D4ED8", escudo: PNG })).toEqual({ nombre: "AB Premià", color: "#1d4ed8", escudo: PNG });
  });

  it("corrige o descarta lo que no vale", () => {
    expect(normalizarMarca({ nombre: "Club", color: "rojo", escudo: "javascript:alert(1)" })).toEqual({ nombre: "Club", color: COLOR_POR_DEFECTO, escudo: "" });
    expect(escudoValido("data:image/svg+xml;base64,PHN2Zz4=")).toBe(""); // SVG fuera: puede llevar scripts
    expect(escudoValido("data:image/png;base64," + "A".repeat(MAX_ESCUDO))).toBe("");
    expect(normalizarMarca({ nombre: "", escudo: "" })).toBeNull();
    expect(leerMarca("{roto")).toBeNull();
    expect(leerMarca(null)).toBeNull();
  });

  it("reduce el escudo sin deformarlo y sin agrandarlo", () => {
    expect(medidasReducidas(800, 400)).toEqual({ w: 200, h: 100 });
    expect(medidasReducidas(300, 600)).toEqual({ w: 100, h: 200 });
    expect(medidasReducidas(120, 80)).toEqual({ w: 120, h: 80 });
    expect(medidasReducidas(0, 10)).toEqual({ w: 0, h: 0 });
  });
});
