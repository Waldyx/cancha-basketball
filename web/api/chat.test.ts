import { describe, it, expect } from "vitest";
import { formatoVisible, pareceRazonamiento, sistemaPara } from "./chat.ts";

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

// Candado del 19-oct-2026: nemotron copiaba el formato del catálogo (slug suelto + fila
// cruda) y la respuesta llegaba sin tarjetas. Captura LITERAL de producción.
describe("formatoVisible", () => {
  const capturada =
    "Para un alero de 80 kg en pista interior con presupuesto <120€, priorizo tracción, soporte lateral y amortiguación equilibrada. Aquí van tres opciones sólidas dentro del rango:\n\n" +
    "ua-curry-12  \n" +
    "Under Armour Curry 12 | responsive | 98€ | tracc 10 cushion 10 resp 10 soporte 10 estab 10 ligereza 10 outdoor 6 vent 10 | low | horma normal  \n" +
    "→ Máxima tracción y respuesta para cortes explosivos, ideal para cambios de dirección rápidos. Horma normal, buen ajuste para 80 kg.\n\n" +
    "anta-kai-2  \n" +
    "Anta KAI 2 | balanced | 62€ | tracc 10 cushion 10 resp 9 soporte 9 estab 9 ligereza 8 outdoor 8 vent 9 | low | horma normal  \n" +
    "→ Relación calidad-precio imbatible.";

  it("convierte el slug suelto en marcador y quita la fila cruda del catálogo", () => {
    const f = formatoVisible(capturada, true);
    expect(f).toContain("[[shoe:ua-curry-12]]");
    expect(f).toContain("[[shoe:anta-kai-2]]");
    expect(f).not.toMatch(/tracc \d+/);
    expect(f).toContain("Máxima tracción y respuesta");
  });

  it("lo emitido a trozos es siempre prefijo de lo final (emitir es irreversible)", () => {
    const final = formatoVisible(capturada, true);
    let anterior = "";
    for (let i = 1; i <= capturada.length; i++) {
      const parcial = formatoVisible(capturada.slice(0, i));
      expect(final.startsWith(parcial)).toBe(true);
      expect(parcial.startsWith(anterior)).toBe(true);
      anterior = parcial;
    }
  });

  // Capturada en producción el 21-oct (nemotron-3.5-super-vl): `[[slug]]` sin prefijo y luego
  // los mismos con prefijo. Salían como texto literal y seis tarjetas.
  const doble =
    "Para exterior y base prioriza tracción y durabilidad. La Anta KAI 2 es la mejor opción.\n\n" +
    "[[anta-kai-2]]\n[[adidas-dame-certified]]\n\n" +
    "Haz el quiz (/quiz) para afinar más.\n\n" +
    "[[shoe:anta-kai-2]]\n[[shoe:adidas-dame-certified]]";

  it("[[slug]] sin prefijo es tarjeta, y una tarjeta no se repite", () => {
    const f = formatoVisible(doble, true);
    expect(f).not.toMatch(/\[\[(?!shoe:)/);
    expect(f.match(/\[\[shoe:anta-kai-2\]\]/g)).toHaveLength(1);
    expect(f.match(/\[\[shoe:adidas-dame-certified\]\]/g)).toHaveLength(1);
    expect(f).toContain("Haz el quiz");
  });

  it("deduplicar no rompe el streaming: lo parcial sigue siendo prefijo", () => {
    const final = formatoVisible(doble, true);
    for (let i = 1; i <= doble.length; i++) expect(final.startsWith(formatoVisible(doble.slice(0, i)))).toBe(true);
  });

  it("no toca una respuesta normal con marcadores", () => {
    const normal = "La **Curry 12** es tu zapa: tracción y respuesta de sobra.\n[[shoe:ua-curry-12]]\nSi quieres más opciones, haz el quiz (/quiz).";
    expect(formatoVisible(normal, true)).toBe(normal);
  });

  it("una línea de prosa larga sale sin esperar al salto de línea", () => {
    const prosa = "Para jugar por fuera necesitas una suela gruesa y un caucho duro que aguante el asfalto";
    expect(formatoVisible(prosa)).toBe(prosa);
  });
});

// Candado del 19-oct-2026: nemotron ofrecía GS a adultos y zapas por encima del tope.
describe("sistemaPara", () => {
  it("sin petición júnior, las GS no están en el catálogo que ve el modelo", () => {
    const lineaGS = "ua-curry-12-gs |";
    expect(sistemaPara("busco zapas para alero de 80 kg")).not.toContain(lineaGS);
    expect(sistemaPara("busco zapas para alero de 80 kg")).toContain("ua-curry-12 |");
    expect(sistemaPara("algo para mi hijo de 12 años")).toContain(lineaGS);
    expect(sistemaPara("¿la Curry 12 GS merece la pena?")).toContain(lineaGS);
  });
  it("si piden júnior, solo ve GS", () => {
    const s = sistemaPara("que zapatillas para mi hijo de 12 años que juega de pivot");
    expect(s).toContain("ua-curry-12-gs |");
    expect(s).not.toContain("nike-lebron-witness-8 |");
  });
  it("con tobillos débiles, fuera las low (y solo si queda algo)", () => {
    const s = sistemaPara("alero de 85 kg con tobillos debiles");
    expect(s).not.toContain("anta-kt-10 |");
    expect(s).not.toMatch(/\| low \|/);
    expect(s).toMatch(/\| (mid|high) \|/);
  });
  it("recuerda el presupuesto al final si lo hay", () => {
    expect(sistemaPara("menos de 120 euros").trimEnd()).toMatch(/120 €\.$/);
    expect(sistemaPara("para pista interior")).not.toContain("PRESUPUESTO DEL USUARIO");
  });
  it("gana el presupuesto del mensaje más reciente (que llega primero)", () => {
    expect(sistemaPara("mejor hasta 90 €\nmenos de 150 euros")).toContain("PRESUPUESTO DEL USUARIO: 90 €");
  });
});
