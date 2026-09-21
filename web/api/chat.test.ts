import { describe, it, expect } from "vitest";
import { pareceRazonamiento } from "./chat.ts";

// Candado del 21-sep-2026. El chat servía en producción la CADENA DE PENSAMIENTO del
// modelo en vez de la respuesta, en inglés y sin llegar a responder. Los dos positivos
// de abajo son capturas LITERALES de producción, no ejemplos inventados.
describe("pareceRazonamiento", () => {
  it("caza el razonamiento real capturado en producción", () => {
    expect(
      pareceRazonamiento(
        "We need to recommend a cheap outdoor shoe under 90 euros. Must respect budget. " +
          "Provide brief answer 2-4 sentences + markers. Use only catalog data."
      )
    ).toBe(true);
    expect(
      pareceRazonamiento(
        "Okay, the user is asking for something with good traction for indoor court. " +
          "Let me check the catalog for shoes with high traction scores."
      )
    ).toBe(true);
  });

  it("deja pasar una respuesta real en español", () => {
    expect(
      pareceRazonamiento(
        "Para base rápido necesitas algo **ligero, con buena tracción y respuesta** para " +
          "cambios de dirección y velocidad. Sin BS, estas son tus mejores opciones:\n\n" +
          "**Under Armour Curry 12** — Es prácticamente perfecta para tu perfil: tracción 10, " +
          "respuesta 10, estabilidad 10 y ligereza 10. [[shoe:ua-curry-12]]"
      )
    ).toBe(false);
  });

  it("no se dispara por texto en inglés que no sea planificación", () => {
    // Nombres y tecnologías en inglés aparecen constantemente en las fichas.
    expect(
      pareceRazonamiento(
        "La Nike Air Zoom G.T. Cut 4 monta ZoomX y Air Zoom, y su upper Flyknit es de los " +
          "mejores del mercado. Pesa 431 g. [[shoe:nike-gt-cut-4]]"
      )
    ).toBe(false);
  });

  it("solo mira el arranque: no censura una respuesta ya en marcha", () => {
    // 400+ caracteres de respuesta buena y luego una frase que casaría el patrón.
    const respuesta = "Te recomiendo la Curry 12 por su tracción. ".repeat(12) + "Let me know.";
    expect(respuesta.length).toBeGreaterThan(400);
    expect(pareceRazonamiento(respuesta)).toBe(false);
  });
});
