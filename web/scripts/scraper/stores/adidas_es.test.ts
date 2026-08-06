import { describe, it, expect } from "vitest";
import { ES_JUNIOR, esModeloGS, consultaAdidas, normalizeAdidasTitle } from "./adidas_es";
import { matchesShoe } from "../matcher";

// Títulos REALES de adidas.es capturados el 2026-08-06.
describe("adidas.es — segmento junior", () => {
  // El buscador de adidas entiende el nombre COMERCIAL, no el del catálogo:
  // "adidas ae 1 low gs" da 0 resultados; "adidas anthony edwards 1 low niños"
  // devuelve la junior a 58,50 €.
  it("traduce 'gs' a niños y la sigla AE al nombre completo", () => {
    expect(consultaAdidas("Adidas", "AE 1 Low GS")).toBe(
      "adidas anthony edwards 1 low niños"
    );
    expect(consultaAdidas("Adidas", "AE 2 GS")).toBe("adidas anthony edwards 2 niños");
    expect(consultaAdidas("Adidas", "AE 1")).toBe("adidas anthony edwards 1");
  });

  it("no toca la consulta de un modelo de adulto", () => {
    expect(consultaAdidas("Adidas", "Harden Vol 9")).toBe("adidas harden vol 9");
  });

  it("reconoce el junior por palabra y por la J final de adidas", () => {
    expect(ES_JUNIOR.test("Zapatilla Niños Anthony Edwards 2")).toBe(true);
    expect(ES_JUNIOR.test("Zapatilla Anthony Edwards 1 Low Basketball para niño")).toBe(true);
    expect(ES_JUNIOR.test("Zapatilla ANTHONY EDWARDS 2 J")).toBe(true);
    expect(ES_JUNIOR.test("Zapatilla Anthony Edwards 1 Low (Adolescentes)")).toBe(true);
    expect(ES_JUNIOR.test("Zapatilla ANTHONY EDWARDS 2")).toBe(false);
    // "J" solo cuenta al final: no puede confundirse con una palabra cualquiera
    expect(ES_JUNIOR.test("Zapatilla J Wall 2")).toBe(false);
  });

  it("distingue las fichas GS del catálogo", () => {
    expect(esModeloGS("AE 2 GS")).toBe(true);
    expect(esModeloGS("AE 1 Low GS")).toBe(true);
    expect(esModeloGS("Harden Vol 9")).toBe(false);
  });

  // La J final es la marca de junior de adidas y el catálogo lo llama GS.
  it("traduce la J final a GS para poder identificar la ficha junior", () => {
    expect(normalizeAdidasTitle("Zapatilla ANTHONY EDWARDS 2 J")).toBe("Zapatilla AE 2 GS");
  });

  it("sigue normalizando los nombres largos de adidas", () => {
    expect(normalizeAdidasTitle("Zapatilla Harden Volume 9")).toBe("Zapatilla Harden Vol 9");
    expect(normalizeAdidasTitle("Zapatilla Anthony Edwards 2")).toBe("Zapatilla AE 2");
  });

  // El emparejamiento de punta a punta con los títulos reales.
  it("empareja la junior con la ficha GS del catálogo", () => {
    const t = `Adidas ${normalizeAdidasTitle("Zapatilla Niños Anthony Edwards 2")}`;
    expect(matchesShoe(t, "Adidas", "AE 2 GS")).toBe(true);
  });

  it("y la de adulto NO se cuela como GS ni al revés", () => {
    const adulto = `Adidas ${normalizeAdidasTitle("Zapatilla ANTHONY EDWARDS 2")}`;
    expect(matchesShoe(adulto, "Adidas", "AE 2 GS")).toBe(false);
    expect(matchesShoe(adulto, "Adidas", "AE 2")).toBe(true);
  });
});
