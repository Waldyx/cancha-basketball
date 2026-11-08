import { describe, it, expect } from "vitest";
import { tallaEU, tallasEU, valorTalla } from "./tallas";

describe("tallaEU", () => {
  it("lee los formatos de las tiendas", () => {
    expect(tallaEU("44´5")).toBe("44,5");
    expect(tallaEU("10´5 US - 44´5 EUR")).toBe("44,5");
    expect(tallaEU("8´5 US - 41 EUR")).toBe("41");
    expect(tallaEU("40.5")).toBe("40,5");
    expect(tallaEU("40,5")).toBe("40,5");
    expect(tallaEU("42 2/3")).toBe("42 2/3");
    expect(tallaEU(" 47 ")).toBe("47");
  });

  it("descarta lo que no es una talla europea", () => {
    expect(tallaEU("Selecciona una talla")).toBeNull();
    expect(tallaEU("9.5")).toBeNull(); // US
    expect(tallaEU("27.1")).toBeNull(); // centímetros
    expect(tallaEU("120")).toBeNull();
    expect(tallaEU("")).toBeNull();
  });
});

describe("tallasEU", () => {
  it("quita repetidas y ordena de menor a mayor", () => {
    expect(tallasEU(["44", "42 2/3", "Selecciona una talla", "44", "40,5"])).toEqual(["40,5", "42 2/3", "44"]);
  });
});

describe("valorTalla", () => {
  it("ordena tercios y medias", () => {
    expect(valorTalla("42 1/3")).toBeCloseTo(42.333, 2);
    expect(valorTalla("42,5")).toBe(42.5);
    expect(valorTalla("42 2/3")).toBeCloseTo(42.667, 2);
  });
});
