import { describe, expect, it } from "vitest";
import {
  DURACIONES_SESION,
  SESIONES_POR_EDAD,
  crearSesionPorEdad,
  minutosSesionPorEdad,
  objetivosDisponibles,
  organizacion,
  repartirMinutos,
} from "./pizarraSesionesEdad";
import { totalMinutos } from "./pizarraSesion";

describe("sesiones listas por edad", () => {
  it("crea una sesión editable para cada etapa con una duración coherente", () => {
    expect(SESIONES_POR_EDAD.map((x) => x.id)).toEqual(["premini", "mini", "infantil", "cadete", "junior-senior"]);
    const duraciones = { premini: 60, mini: 75, infantil: 90, cadete: 95, "junior-senior": 105 };
    for (const plantilla of SESIONES_POR_EDAD) {
      const creada = crearSesionPorEdad(plantilla.id);
      expect(creada).not.toBeNull();
      expect(creada!.sesion.bloques.length).toBeGreaterThan(4);
      expect(totalMinutos(creada!.sesion)).toBe(duraciones[plantilla.id as keyof typeof duraciones]);
      expect(minutosSesionPorEdad(plantilla.id)).toBe(duraciones[plantilla.id as keyof typeof duraciones]);
      expect(creada!.jugadas.length).toBeGreaterThan(1);
      expect(new Set(creada!.jugadas.map((j) => j.id)).size).toBe(creada!.jugadas.length);
    }
  });

  it("usa pista minibasket solo para las etapas de iniciación", () => {
    expect(crearSesionPorEdad("premini")!.jugadas.every((j) => j.pista === "mini")).toBe(true);
    expect(crearSesionPorEdad("mini")!.jugadas.every((j) => j.pista === "mini")).toBe(true);
    expect(crearSesionPorEdad("infantil")!.jugadas.every((j) => j.pista !== "mini")).toBe(true);
  });

  it("no inventa sesiones para un identificador desconocido", () => {
    expect(crearSesionPorEdad("alevin-99")).toBeNull();
    expect(minutosSesionPorEdad("alevin-99")).toBe(0);
  });
});

describe("objetivo, duración y jugadores", () => {
  it("reparte cualquier duración con suma exacta y un mínimo por bloque", () => {
    expect(repartirMinutos([10, 12, 12, 10, 12, 4], 45)).toHaveLength(6);
    for (const total of [30, 45, 61, 120]) {
      const r = repartirMinutos([10, 12, 12, 10, 12, 4], total);
      expect(r.reduce((a, b) => a + b, 0)).toBe(total);
      expect(Math.min(...r)).toBeGreaterThanOrEqual(3);
    }
  });

  it("ajusta la sesión de cada etapa a todas las duraciones ofrecidas", () => {
    for (const p of SESIONES_POR_EDAD)
      for (const d of DURACIONES_SESION) expect(minutosSesionPorEdad(p.id, { duracion: d })).toBe(d);
  });

  it("el objetivo da más minutos a sus bloques sin cambiar el total", () => {
    const general = crearSesionPorEdad("cadete")!.sesion;
    const defensa = crearSesionPorEdad("cadete", { objetivo: "defensa" })!;
    const min = (s: typeof general, t: string) => s.bloques.find((b) => b.titulo.startsWith(t))!.minutos;
    expect(defensa.objetivoAplicado).toBe(true);
    expect(min(defensa.sesion, "1 contra 1")).toBeGreaterThan(min(general, "1 contra 1"));
    expect(totalMinutos(defensa.sesion)).toBe(totalMinutos(general));
    expect(defensa.sesion.objetivo).toContain("Énfasis: defensa");
  });

  it("un objetivo sin bloques en la etapa no cambia nada y se avisa", () => {
    expect(objetivosDisponibles("premini")).toEqual(["general", "tiro"]);
    const r = crearSesionPorEdad("premini", { objetivo: "defensa" })!;
    expect(r.objetivoAplicado).toBe(false);
    expect(r.sesion.objetivo).not.toContain("Énfasis");
    expect(r.sesion.bloques.map((b) => b.minutos)).toEqual(crearSesionPorEdad("premini")!.sesion.bloques.map((b) => b.minutos));
  });

  it("organiza a los jugadores en cada bloque", () => {
    expect(organizacion({ t: "grupos", tam: 3, uno: "trío", varios: "tríos" }, 10)).toBe("10 jugadores: 3 tríos y 1 jugador entra rotando.");
    expect(organizacion({ t: "grupos", tam: 2, uno: "pareja", varios: "parejas" }, 8)).toBe("8 jugadores: 4 parejas.");
    expect(organizacion({ t: "grupos", tam: 5, uno: "grupo de 5", varios: "grupos de 5" }, 9)).toBe("9 jugadores: 2 grupos de 5, uno de ellos con 4.");
    expect(organizacion({ t: "grupos", tam: 5, uno: "grupo de 5", varios: "grupos de 5" }, 6)).toBe("6 jugadores: 1 grupo de 5 y 1 jugador entra rotando.");
    expect(organizacion({ t: "grupos", tam: 2, uno: "pareja", varios: "parejas" }, 9)).toBe("9 jugadores: 4 parejas y 1 jugador entra rotando.");
    expect(organizacion({ t: "partido", formato: 5 }, 12)).toBe("12 jugadores: 1 partido 5c5; 2 esperan y entran cada 3 min.");
    expect(organizacion({ t: "partido", formato: 5 }, 7)).toBe("Con 7 jugadores no llega para 5c5: jugad 3c3 y uno rota en cada canasta.");
    expect(organizacion({ t: "canasta", max: 10, que: "dos filas" }, 16)).toBe("16 jugadores: 2 canastas con dos filas, unos 8 por canasta.");
    const s = crearSesionPorEdad("mini", { jugadores: 9 })!.sesion;
    expect(s.bloques.find((b) => b.titulo.startsWith("Partidillos"))!.notas).toMatch(/^Organización: 9 jugadores: 1 partido 3c3; 3 esperan/);
    expect(s.objetivo).toContain("Planificada para 9 jugadores");
    expect(crearSesionPorEdad("mini")!.sesion.bloques.every((b) => !b.notas.startsWith("Organización"))).toBe(true);
  });
});
