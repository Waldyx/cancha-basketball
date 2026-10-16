import { describe, expect, it } from "vitest";
import { esTriple, zonaDe } from "./mapaTiro";
import { PUESTOS, RUTINAS, evolucion, normalizarStorePlan, pctDe, porPuesto, sumar, totalSesion, type SesionTiro } from "./planTiro";

describe("plan de tiro", () => {
  it("los puestos de triple están fuera de la línea de 3 y los de media dentro", () => {
    const triples = PUESTOS.filter((p) => /^t\d$/.test(p.id));
    const medias = PUESTOS.filter((p) => /^m\d$/.test(p.id));
    expect([triples.length, medias.length]).toEqual([5, 5]); // que el filtro no se quede vacío
    for (const p of triples) expect(esTriple(p, "fiba"), p.id).toBe(true);
    for (const p of medias) {
      expect(esTriple(p, "fiba"), p.id).toBe(false);
      expect(zonaDe(p, "fiba"), p.id).toBe("media");
    }
    expect(zonaDe(PUESTOS.find((p) => p.id === "tl")!, "fiba")).toBe("pintura");
  });

  it("cada rutina usa puestos que existen", () => {
    const ids = new Set(PUESTOS.map((p) => p.id));
    for (const r of RUTINAS) for (const p of r.puestos) expect(ids.has(p)).toBe(true);
  });

  it("suma y resta sin que los anotados superen a los intentos", () => {
    let c = sumar(undefined, true, 1); // [1,1]
    c = sumar(c, false, 1); // [1,2]
    expect(c).toEqual([1, 2]);
    expect(sumar(c, true, -1)).toEqual([0, 1]);
    expect(sumar(c, false, -1)).toEqual([1, 1]);
    expect(sumar([1, 1], false, -1)).toEqual([1, 1]); // no hay fallos que quitar
    expect(sumar([0, 0], true, -1)).toEqual([0, 0]);
  });

  it("resume las sesiones, su evolución y el acumulado por puesto", () => {
    const ses: SesionTiro[] = [
      { id: "b", fecha: "2026-10-10", rutina: "libres", tiros: { tl: [18, 25] } },
      { id: "a", fecha: "2026-10-03", rutina: "libres", tiros: { tl: [12, 25] } },
      { id: "c", fecha: "2026-10-12", rutina: "media", tiros: { m1: [5, 10], m3: [7, 10] } },
    ];
    expect(totalSesion(ses[2])).toEqual([12, 20]);
    expect(evolucion(ses)).toEqual([{ fecha: "2026-10-03", pct: 48 }, { fecha: "2026-10-10", pct: 72 }, { fecha: "2026-10-12", pct: 60 }]);
    expect(evolucion(ses, "tl")).toEqual([{ fecha: "2026-10-03", pct: 48 }, { fecha: "2026-10-10", pct: 72 }]);
    expect(porPuesto(ses)).toEqual({ tl: [30, 50], m1: [5, 10], m3: [7, 10] });
    expect(pctDe([0, 0])).toBeNull();
  });

  it("valida lo guardado", () => {
    const st = normalizarStorePlan({ sesiones: [{ id: "x", fecha: "2026-10-01", rutina: "rara", tiros: { tl: [30, 20], zz: [1, 1], m2: "mal" } }, { fecha: "no" }] });
    expect(st.sesiones).toEqual([{ id: "x", fecha: "2026-10-01", rutina: "completa", tiros: { tl: [20, 20] } }]);
    expect(normalizarStorePlan(undefined).sesiones).toEqual([]);
  });
});
