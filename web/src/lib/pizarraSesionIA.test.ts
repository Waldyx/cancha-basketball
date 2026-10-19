import { describe, it, expect } from "vitest";
import { crearSesionDesdePlan, leerPlanIA, objetivoDeTexto, type PlanIA } from "./pizarraSesionIA";
import { totalMinutos } from "./pizarraSesion";

const plan: PlanIA = {
  titulo: "Mini · pase y carriles",
  objetivo: "Ocupar carriles y pasar antes de botar.",
  bloques: [
    { titulo: "Activación por parejas", minutos: 10, ejercicio: null, notas: "Un balón por pareja.", material: "Balones" },
    { titulo: "Trenza a pista completa", minutos: 15, ejercicio: "ejercicio-tres-hombres", notas: "Tríos.", material: "" },
    { titulo: "3c3 con regla de pase", minutos: 20, ejercicio: null, notas: "Todos tocan antes de tirar.", material: "Petos" },
    { titulo: "Vuelta a la calma", minutos: 5, ejercicio: null, notas: "", material: "" },
  ],
};

describe("leerPlanIA", () => {
  it("acepta la respuesta de la API", () => {
    expect(leerPlanIA({ plan })?.bloques).toHaveLength(4);
  });
  it("rechaza respuestas rotas sin lanzar", () => {
    expect(leerPlanIA(null)).toBeNull();
    expect(leerPlanIA({ plan: { bloques: "x" } })).toBeNull();
    expect(leerPlanIA({ plan: { bloques: [{ titulo: "a", minutos: 5 }, { titulo: "b", minutos: 0 }, { titulo: "", minutos: 5 }] } })).toBeNull();
  });
});

describe("crearSesionDesdePlan", () => {
  it("respeta minutos, títulos, notas y material del plan", () => {
    const { sesion } = crearSesionDesdePlan(plan);
    expect(totalMinutos(sesion)).toBe(50);
    expect(sesion.bloques.map((b) => b.titulo)).toEqual(plan.bloques.map((b) => b.titulo));
    expect(sesion.bloques[2].material).toBe("Petos");
    expect(sesion.titulo).toBe(plan.titulo);
  });

  it("los ejercicios dibujados pasan a la biblioteca y el bloque los referencia", () => {
    const { sesion, jugadas } = crearSesionDesdePlan(plan, { pistaMini: true });
    expect(jugadas).toHaveLength(1);
    expect(jugadas[0].pista).toBe("mini");
    expect(sesion.bloques[1].tipo).toBe("jugada");
    expect(sesion.bloques[1].jugadaId).toBe(jugadas[0].id);
    expect(sesion.bloques[0].tipo).toBe("texto");
  });

  it("un id de ejercicio desconocido se queda como texto", () => {
    const raro = { ...plan, bloques: plan.bloques.map((b, i) => (i === 1 ? { ...b, ejercicio: "ejercicio-inventado" } : b)) };
    const { sesion, jugadas } = crearSesionDesdePlan(raro);
    expect(jugadas).toHaveLength(0);
    expect(sesion.bloques[1].tipo).toBe("texto");
  });

  it("añade la nota al objetivo", () => {
    expect(crearSesionDesdePlan(plan, { nota: "Generada con IA." }).sesion.objetivo).toMatch(/Generada con IA\.$/);
  });
});

describe("objetivoDeTexto", () => {
  it("deduce el foco cuando está claro", () => {
    expect(objetivoDeTexto("Mejorar el tiro tras bote y los triples")).toBe("tiro");
    expect(objetivoDeTexto("defensa de ayudas y rotación")).toBe("defensa");
    expect(objetivoDeTexto("Contraataque y transición rápida")).toBe("transicion");
  });
  it("si no está claro, general", () => {
    expect(objetivoDeTexto("bloqueo directo")).toBe("general");
    expect(objetivoDeTexto("tiro y defensa")).toBe("general");
  });
});
