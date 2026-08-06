import { describe, it, expect } from "vitest";
import { stockDeJsonLd } from "./fuikaomar_es";

// Cadenas REALES capturadas de fuikaomar.es el 2026-08-06. Ojo: PrestaShop
// escapa las barras ("https:\/\/schema.org\/..."), así que el patrón no puede
// dar por hecho una URL limpia.
describe("stockDeJsonLd — disponibilidad de FuikaOmar", () => {
  it("detecta agotado (KD 18 Liquid Lime, que muestra AGOTADO!)", () => {
    expect(stockDeJsonLd('"availability":"https:\\/\\/schema.org\\/OutOfStock"')).toBe(false);
  });

  it("detecta disponible (Curry 12 Extraterrestial)", () => {
    expect(stockDeJsonLd('"availability":"https:\\/\\/schema.org\\/InStock"')).toBe(true);
  });

  it("tolera espacios y URL sin escapar", () => {
    expect(stockDeJsonLd('"availability" : "https://schema.org/InStock"')).toBe(true);
    expect(stockDeJsonLd('"availability" : "https://schema.org/OutOfStock"')).toBe(false);
  });

  // "OutOfStock" NO contiene "InStock" como subcadena, pero si algún día se
  // cambia el patrón conviene que este test lo pille.
  it("no confunde OutOfStock con InStock", () => {
    expect(stockDeJsonLd('"availability":"https://schema.org/OutOfStock"')).not.toBe(true);
  });

  it("devuelve null cuando la ficha no dice nada de stock", () => {
    expect(stockDeJsonLd('{"@type":"Product","name":"Zapatillas"}')).toBeNull();
  });
});
