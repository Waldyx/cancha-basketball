import { describe, expect, it } from "vitest";
import { decodificarEnlace } from "./pizarra";
import { PLANTILLAS, PLANTILLAS_EJERCICIOS } from "./pizarraPlantillas";
import { crearSesionPorEdad } from "./pizarraSesionesEdad";
import {
  codificarPaqueteClub,
  compactarPaquete,
  decodificarPaqueteClub,
  descompactarPaquete,
  leerEstadoClub,
  mismoClub,
  paqueteDeArchivo,
  planActualizacion,
  type PaqueteClub,
} from "./pizarraClub";

function paquete(): PaqueteClub {
  const creada = crearSesionPorEdad("mini")!;
  return {
    club: "AB Premià",
    fecha: "2026-10-16",
    jugadas: [PLANTILLAS[0].crear(), PLANTILLAS_EJERCICIOS[0].crear(), ...creada.jugadas],
    sesiones: [creada.sesion],
  };
}

describe("biblioteca del club", () => {
  it("el paquete viaja por enlace y vuelve con jugadas, sesiones y referencias intactas", async () => {
    const p = paquete();
    const enlace = await codificarPaqueteClub(p, { comprimir: false });
    expect(enlace.slice(0, 2)).toBe("rc");
    const v = await decodificarPaqueteClub(enlace);
    expect(v.club).toBe("AB Premià");
    expect(v.fecha).toBe("2026-10-16");
    expect(v.jugadas.map((j) => j.nombre)).toEqual(p.jugadas.map((j) => j.nombre));
    expect(v.sesiones).toHaveLength(1);
    expect(v.sesiones[0].bloques.map((b) => b.minutos)).toEqual(p.sesiones[0].bloques.map((b) => b.minutos));
    // cada bloque de ejercicio apunta a una jugada que viene en el paquete, con su nombre
    const ids = new Map(v.jugadas.map((j) => [j.id, j.nombre]));
    const deJugada = v.sesiones[0].bloques.filter((b) => b.tipo === "jugada");
    expect(deJugada.length).toBeGreaterThan(0);
    for (const b of deJugada) expect(ids.get(b.jugadaId!)).toBe(b.titulo);
  });

  it("un enlace de club no se confunde con el de una jugada, y al revés", async () => {
    const enlace = await codificarPaqueteClub(paquete(), { comprimir: false });
    await expect(decodificarEnlace(enlace)).rejects.toThrow(/biblioteca de club/);
  });

  it("rechaza paquetes sin nombre de club o vacíos", () => {
    expect(() => descompactarPaquete({ c: "", j: [], s: [] })).toThrow(/nombre del club/);
    expect(() => descompactarPaquete({ c: "Club", j: [], s: [] })).toThrow(/vacío/);
    expect(() => descompactarPaquete("basura")).toThrow();
  });

  it("también se lee desde un archivo .json con campo club", () => {
    const raw = { app: "cancha-pizarra", v: 2, jugadas: [], club: compactarPaquete(paquete()) };
    expect(paqueteDeArchivo(raw)?.club).toBe("AB Premià");
    expect(paqueteDeArchivo({ app: "cancha-pizarra", jugadas: [] })).toBeNull();
  });

  it("al recibir otra versión del mismo club se sustituye la anterior, y nada si es otro club", () => {
    const estado = leerEstadoClub(JSON.stringify({ club: "AB Premià", fecha: "2026-10-01", jugadaIds: ["a", "b"], sesionIds: ["s1"] }));
    expect(estado).not.toBeNull();
    const mismo = planActualizacion(estado, { club: "ab premia " });
    expect(mismo.sustituye).toBe(true);
    expect([...mismo.quitarJugadas]).toEqual(["a", "b"]);
    expect([...mismo.quitarSesiones]).toEqual(["s1"]);
    const otro = planActualizacion(estado, { club: "CB Mataró" });
    expect(otro.sustituye).toBe(false);
    expect(otro.quitarJugadas.size).toBe(0);
    expect(planActualizacion(null, { club: "AB Premià" }).sustituye).toBe(false);
  });

  it("compara clubs sin importar mayúsculas, tildes ni espacios, y lee el estado con cuidado", () => {
    expect(mismoClub("AB Premià", "ab  premia")).toBe(true);
    expect(mismoClub("", "")).toBe(false);
    expect(leerEstadoClub("{roto")).toBeNull();
    expect(leerEstadoClub(JSON.stringify({ club: "" }))).toBeNull();
    expect(leerEstadoClub(JSON.stringify({ club: "X", jugadaIds: [1, "ok", null] }))?.jugadaIds).toEqual(["ok"]);
  });
});
