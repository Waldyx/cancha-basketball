import { describe, expect, it } from "vitest";
import { campo, esTriple, limitarPunto, normalizarStore, pct, resumir, zonaDe, type Tiro } from "./mapaTiro";

const t = (x: number, y: number, ok = true): Tiro => ({ id: `${x},${y}`, j: "4 Laia", x, y, ok });

describe("mapa de tiro: geometría", () => {
  it("clasifica el triple con la línea FIBA: arco a 6,75 m y esquinas a 0,90 m de la banda", () => {
    expect(esTriple({ x: 1.575 + 6.7, y: 7.5 }, "fiba")).toBe(false);
    expect(esTriple({ x: 1.575 + 6.8, y: 7.5 }, "fiba")).toBe(true);
    expect(esTriple({ x: 1, y: 0.5 }, "fiba")).toBe(true); // esquina, pegado a la banda
    expect(esTriple({ x: 1, y: 1.2 }, "fiba")).toBe(false); // esquina, dentro de la línea
    expect(esTriple({ x: 10, y: 7.5 }, "mini")).toBe(false); // en minibasket no hay triple
  });

  it("asigna la zona de cada tiro", () => {
    expect(zonaDe({ x: 3, y: 7.5 }, "fiba")).toBe("pintura");
    expect(zonaDe({ x: 7, y: 4 }, "fiba")).toBe("media");
    expect(zonaDe({ x: 1.5, y: 0.4 }, "fiba")).toBe("esquina");
    expect(zonaDe({ x: 9, y: 7.5 }, "fiba")).toBe("triple");
    // la zona de minibasket es más corta (4 m): a 5 m ya es media distancia
    expect(zonaDe({ x: 5, y: 7.5 }, "fiba")).toBe("pintura");
    expect(zonaDe({ x: 5, y: 7.5 }, "mini")).toBe("media");
  });

  it("mantiene los puntos dentro de la media pista", () => {
    expect(limitarPunto({ x: -3, y: 20 })).toEqual({ x: 0, y: 15 });
    expect(limitarPunto({ x: 20, y: 7.123 })).toEqual({ x: 14, y: 7.12 });
  });
});

describe("mapa de tiro: resúmenes", () => {
  it("cuenta dobles, triples, puntos, zonas y eFG", () => {
    const tiros = [t(3, 7.5, true), t(3, 7.5, false), t(9, 7.5, true), t(9, 7.5, false), t(7, 4, false)].map((tiro) => ({ tiro, pista: "fiba" as const }));
    const r = resumir(tiros);
    expect(r.t2).toEqual({ intentos: 3, anotados: 1 });
    expect(r.t3).toEqual({ intentos: 2, anotados: 1 });
    expect(r.puntos).toBe(5);
    expect(r.porZona.pintura).toEqual({ intentos: 2, anotados: 1 });
    expect(r.porZona.triple).toEqual({ intentos: 2, anotados: 1 });
    expect(r.porZona.media).toEqual({ intentos: 1, anotados: 0 });
    const c = campo(r);
    expect(c.tc).toEqual({ intentos: 5, anotados: 2 });
    expect(c.efg).toBe(50); // (2 + 0,5·1) / 5
    expect(pct(r.t2)).toBe(33);
    expect(pct({ intentos: 0, anotados: 0 })).toBeNull();
  });

  it("en minibasket todo vale 2", () => {
    const r = resumir([{ tiro: t(10, 7.5), pista: "mini" }]);
    expect(r.puntos).toBe(2);
    expect(r.t3.intentos).toBe(0);
  });
});

describe("mapa de tiro: almacenamiento", () => {
  it("valida lo guardado y descarta lo roto", () => {
    const st = normalizarStore({
      jugadores: "4 Laia\n7 Marc",
      activo: "p2",
      partidos: [
        { id: "p1", fecha: "2026-10-18", rival: "CB Mataró", pista: "mini", tiros: [{ id: "a", j: "4 Laia", x: 3, y: 7, ok: true }, { x: "mal" }, "basura"] },
        { id: "p2", fecha: "nofecha", rival: "X", pista: "otra", tiros: [{ x: 50, y: -2, ok: "si" }] },
        { sinId: true },
      ],
    });
    expect(st.partidos).toHaveLength(2);
    expect(st.partidos[0].tiros).toHaveLength(1);
    expect(st.partidos[1]).toMatchObject({ fecha: "", pista: "fiba" });
    expect(st.partidos[1].tiros[0]).toMatchObject({ x: 14, y: 0, ok: false });
    expect(st.activo).toBe("p2");
    expect(normalizarStore("basura")).toEqual({ v: 1, jugadores: "", activo: "", partidos: [] });
  });
});
