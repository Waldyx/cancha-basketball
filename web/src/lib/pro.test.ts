import { describe, expect, it } from "vitest";
import { CODIGO_BETA, codigoValido, crearEstadoPro, esFuncionPro, leerEstadoPro, normalizaCodigo } from "./pro";

describe("pro", () => {
  it("acepta el código de la beta escrito de varias formas", () => {
    expect(codigoValido(CODIGO_BETA)).toBe(true);
    expect(codigoValido(" cancha beta ")).toBe(true);
    expect(codigoValido("cancha–beta")).toBe(true);
    expect(normalizaCodigo("cancha_beta")).toBe("CANCHA-BETA");
  });

  it("rechaza códigos que no existen", () => {
    expect(codigoValido("")).toBe(false);
    expect(codigoValido("CANCHA-PRO")).toBe(false);
  });

  it("solo reconoce las funciones Pro declaradas", () => {
    expect(esFuncionPro("pizarra-sesiones")).toBe(true);
    expect(esFuncionPro("toString")).toBe(false);
    expect(esFuncionPro("cualquiera")).toBe(false);
  });

  it("lee el estado guardado y descarta lo corrupto o caducado", () => {
    const e = crearEstadoPro("cancha beta", new Date("2026-10-15T10:00:00Z"));
    expect(e).toEqual({ codigo: "CANCHA-BETA", desde: "2026-10-15T10:00:00.000Z" });
    expect(leerEstadoPro(JSON.stringify(e))).toEqual(e);
    expect(leerEstadoPro(null)).toBeNull();
    expect(leerEstadoPro("{no es json")).toBeNull();
    expect(leerEstadoPro(JSON.stringify({ codigo: "VIEJO", desde: "x" }))).toBeNull();
    expect(crearEstadoPro("malo", new Date())).toBeNull();
  });
});
