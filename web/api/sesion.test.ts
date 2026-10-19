import { describe, it, expect } from "vitest";
import { EJERCICIOS_IA, extraerJson, normalizarPlan, repartir } from "./sesion.ts";
import { PLANTILLAS_EJERCICIOS } from "../src/lib/pizarraPlantillas";

const suma = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

describe("EJERCICIOS_IA", () => {
  it("solo ofrece al modelo ejercicios que existen en la biblioteca de la pizarra", () => {
    const reales = new Set(PLANTILLAS_EJERCICIOS.map((p) => p.id));
    for (const e of EJERCICIOS_IA) expect(reales.has(e.id), e.id).toBe(true);
  });
});

describe("extraerJson", () => {
  it("lee el JSON aunque venga entre vallas de código o con una frase delante", () => {
    expect(extraerJson('```json\n{"a":1}\n```')).toEqual({ a: 1 });
    expect(extraerJson('Aquí tienes la sesión: {"a":2} ¡Suerte!')).toEqual({ a: 2 });
  });
  it("devuelve null si no hay JSON o está cortado", () => {
    expect(extraerJson("No puedo ayudarte con eso.")).toBeNull();
    expect(extraerJson('{"titulo":"x","bloques":[{"titulo":"a"')).toBeNull();
  });
});

describe("repartir", () => {
  it("suma exactamente el total y respeta el mínimo", () => {
    for (const total of [30, 45, 60, 75, 90, 120, 150]) {
      const r = repartir([10, 15, 20, 5, 30, 2], total);
      expect(suma(r)).toBe(total);
      expect(Math.min(...r)).toBeGreaterThanOrEqual(3);
    }
  });
});

describe("normalizarPlan", () => {
  const bueno = {
    titulo: "Infantil · bloqueo directo",
    objetivo: "Leer la defensa del bloqueo directo.",
    bloques: [
      { titulo: "Activación con balón", minutos: 10, ejercicio: null, notas: "Parejas con un balón.", material: "Balones" },
      { titulo: "Rueda de bandejas", minutos: 12, ejercicio: "ejercicio-rueda-bandejas", notas: "Dos filas.", material: "" },
      { titulo: "2c2 bloqueo directo", minutos: 25, ejercicio: "ejercicio-que-no-existe", notas: "Base y pívot contra dos.", material: "Petos" },
      { titulo: "5c5 condicionado", minutos: 20, ejercicio: null, notas: "Canasta vale doble tras bloqueo.", material: "" },
      { titulo: "Vuelta a la calma", minutos: 5, ejercicio: null, notas: "", material: "" },
    ],
  };

  it("ajusta los minutos a la duración pedida aunque el modelo sume otra cosa", () => {
    const p = normalizarPlan(bueno, 90)!;
    expect(suma(p.bloques.map((b) => b.minutos))).toBe(90);
    // el bloque más largo sigue siendo el más largo
    expect(p.bloques[2].minutos).toBe(Math.max(...p.bloques.map((b) => b.minutos)));
  });

  it("un ejercicio que no existe pasa a bloque de texto; uno que existe se conserva", () => {
    const p = normalizarPlan(bueno, 72)!;
    expect(p.bloques[1].ejercicio).toBe("ejercicio-rueda-bandejas");
    expect(p.bloques[2].ejercicio).toBeNull();
    expect(p.bloques[2].titulo).toBe("2c2 bloqueo directo");
  });

  it("recorta textos largos y quita caracteres de control", () => {
    const largo = { ...bueno, titulo: "T\u0007".repeat(80), bloques: bueno.bloques.map((b) => ({ ...b, notas: "Frase de prueba. ".repeat(60) })) };
    const p = normalizarPlan(largo, 60)!;
    expect(p.titulo.length).toBeLessThanOrEqual(71);
    expect(p.titulo).not.toMatch(/\u0007/);
    for (const b of p.bloques) expect(b.notas.length).toBeLessThanOrEqual(421);
  });

  it("usa el nombre del ejercicio si el bloque no trae título", () => {
    const p = normalizarPlan({ bloques: [{ ejercicio: "ejercicio-mikan", minutos: 8 }, { titulo: "b", minutos: 8 }, { titulo: "c", minutos: 8 }] }, 30)!;
    expect(p.bloques[0].titulo).toBe("Mikan");
    expect(p.titulo).toBe("Sesión generada");
  });

  it("minutos basura no rompen el reparto", () => {
    const p = normalizarPlan({ bloques: [{ titulo: "a", minutos: "diez" }, { titulo: "b", minutos: -4 }, { titulo: "c", minutos: 9999 }] }, 45)!;
    expect(suma(p.bloques.map((b) => b.minutos))).toBe(45);
  });

  it("rechaza respuestas sin al menos tres bloques utilizables", () => {
    expect(normalizarPlan(null, 60)).toBeNull();
    expect(normalizarPlan({ titulo: "x" }, 60)).toBeNull();
    expect(normalizarPlan({ bloques: [{ titulo: "a" }, { notas: "sin título" }, 3] }, 60)).toBeNull();
  });

  it("como mucho diez bloques", () => {
    const muchos = { bloques: Array.from({ length: 25 }, (_, i) => ({ titulo: `b${i}`, minutos: 5 })) };
    expect(normalizarPlan(muchos, 120)!.bloques).toHaveLength(10);
  });
});
