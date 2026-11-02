import { describe, expect, it } from "vitest";
import { zapatillasTodas } from "../data/zapatillas";
import type { Zapatilla } from "./types";

type Generacion = Pick<Zapatilla, "id" | "sucesor_id" | "predecesor_id">;
const referencias = ["sucesor_id", "predecesor_id"] as const;

function ciclosDeGeneraciones(fichas: Generacion[]): string[][] {
  const siguientes = new Map(fichas.map((z) => [z.id, new Set<string>()]));
  // Ambos campos describen la misma direccion temporal: anterior -> siguiente.
  for (const z of fichas) {
    if (z.sucesor_id != null && siguientes.has(z.sucesor_id)) {
      siguientes.get(z.id)!.add(z.sucesor_id);
    }
    if (z.predecesor_id != null && siguientes.has(z.predecesor_id)) {
      siguientes.get(z.predecesor_id)!.add(z.id);
    }
  }
  const terminadas = new Set<string>();
  const activas = new Set<string>();
  const camino: string[] = [];
  const ciclos: string[][] = [];
  function visitar(id: string) {
    if (activas.has(id)) {
      ciclos.push([...camino.slice(camino.indexOf(id)), id]);
      return;
    }
    if (terminadas.has(id)) return;
    activas.add(id);
    camino.push(id);
    for (const siguiente of siguientes.get(id)!) visitar(siguiente);
    camino.pop();
    activas.delete(id);
    terminadas.add(id);
  }
  for (const id of siguientes.keys()) visitar(id);
  return ciclos;
}

describe("invariantes del catalogo completo, incluidas fichas ocultas", () => {
  const ids = new Set(zapatillasTodas.map((z) => z.id));

  it("los identificadores son unicos", () => {
    expect(ids.size).toBe(zapatillasTodas.length);
  });

  for (const campo of referencias) {
    it(`${campo} apunta a una ficha existente`, () => {
      const rotas = zapatillasTodas
        .filter((z) => z[campo] != null && !ids.has(z[campo]!))
        .map((z) => `${z.id}: ${campo} -> ${z[campo]}`);
      expect(rotas, rotas.join("\n")).toEqual([]);
    });

    it(`${campo} no apunta a la propia ficha`, () => {
      const propias = zapatillasTodas.filter((z) => z[campo] === z.id).map((z) => z.id);
      expect(propias, propias.join("\n")).toEqual([]);
    });
  }

  it("las relaciones de generaciones no forman ciclos", () => {
    const ciclos = ciclosDeGeneraciones(zapatillasTodas).map((c) => c.join(" -> "));
    expect(ciclos, ciclos.join("\n")).toEqual([]);
  });

  it("cada ficha visible y no proximamente tiene una compra disponible", () => {
    const sinCompra = zapatillasTodas
      .filter((z) => !z.oculto && !z.proximamente && !z.links_compra.some((l) => l.disponible))
      .map((z) => z.id);
    expect(sinCompra, sinCompra.join("\n")).toEqual([]);
  });
});

describe("deteccion de ciclos de generaciones", () => {
  it("acepta una cadena con referencias reciprocas y una rama", () => {
    expect(ciclosDeGeneraciones([
      { id: "a", sucesor_id: "b" },
      { id: "b", predecesor_id: "a", sucesor_id: "c" },
      { id: "c", predecesor_id: "b" },
      { id: "d", predecesor_id: "a" },
    ])).toEqual([]);
  });

  it.each([
    { nombre: "autorreferencia", fichas: [{ id: "a", sucesor_id: "a" }] },
    { nombre: "dos sucesores", fichas: [{ id: "a", sucesor_id: "b" }, { id: "b", sucesor_id: "a" }] },
    { nombre: "dos predecesores", fichas: [{ id: "a", predecesor_id: "b" }, { id: "b", predecesor_id: "a" }] },
    { nombre: "cadena mixta de tres", fichas: [{ id: "a", sucesor_id: "b", predecesor_id: "c" }, { id: "b", sucesor_id: "c" }, { id: "c" }] },
    { nombre: "componente desconectado", fichas: [{ id: "libre" }, { id: "a", sucesor_id: "b" }, { id: "b", sucesor_id: "a" }] },
  ])("detecta $nombre", ({ fichas }) => {
    expect(ciclosDeGeneraciones(fichas).length).toBeGreaterThan(0);
  });
});
