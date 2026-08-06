import { describe, it, expect } from "vitest";
import { hayTallaDisponible } from "./atmosfera_sport";

// Clases REALES capturadas de atmosferasport.es el 2026-08-06 (Harden Vol 9):
// las tallas agotadas llevan "attribute-not-in-stock out_of_stock", las que
// quedan no. Atmósfera no publica availability en el JSON-LD, así que el stock
// solo se puede leer del selector de tallas.
describe("hayTallaDisponible — stock de Atmósfera por tallas", () => {
  const harden9 = [
    { texto: "Selecciona una talla", clases: "" },
    { texto: "36", clases: "attribute-not-in-stock out_of_stock  36 " },
    { texto: "38", clases: "attribute-not-in-stock out_of_stock  38 " },
    { texto: "42", clases: "  lowstock 42 " },
    { texto: "42 2/3", clases: "attribute-not-in-stock out_of_stock  42 2/3 " },
  ];

  it("hay stock si queda al menos una talla comprable", () => {
    expect(hayTallaDisponible(harden9)).toBe(true);
  });

  it("no hay stock si TODAS las tallas están agotadas", () => {
    expect(hayTallaDisponible(harden9.filter((t) => /out_of_stock/.test(t.clases)))).toBe(false);
  });

  // El placeholder "Selecciona una talla" no lleva clase de agotado. Contarlo
  // como talla disponible daría por comprable un producto sin ni una talla.
  it("IGNORA el placeholder 'Selecciona una talla'", () => {
    expect(hayTallaDisponible([{ texto: "Selecciona una talla", clases: "" }])).toBe(false);
  });

  it("acepta tallas fraccionadas (36 2/3, 41 1/3)", () => {
    expect(hayTallaDisponible([{ texto: "41 1/3", clases: "  lowstock 41 1/3 " }])).toBe(true);
  });

  it("sin selector de tallas no afirma que haya stock", () => {
    expect(hayTallaDisponible([])).toBe(false);
  });

  it("reconoce también la clase attribute-not-in-stock por separado", () => {
    expect(hayTallaDisponible([{ texto: "44", clases: "attribute-not-in-stock 44" }])).toBe(false);
  });
});
