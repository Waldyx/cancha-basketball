import { describe, expect, it } from "vitest";
import { SESIONES_POR_EDAD, crearSesionPorEdad, minutosSesionPorEdad } from "./pizarraSesionesEdad";
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
