import { describe, expect, it } from "vitest";
import { anteriorDe, cambios, media, normalizarStoreEvaluacion, resumirJugador, type Evaluacion } from "./evaluacion";

const ev = (id: string, fecha: string, notas: Evaluacion["notas"] = {}): Evaluacion => ({ id, nombre: id, fecha, notas, comentarios: {} });

describe("evaluación de jugadores", () => {
  it("hace la media solo de lo valorado, en total y por área", () => {
    const n = { bote: 4, pase: 2, esfuerzo: 3 } as const;
    expect(media(n)).toBe(3);
    expect(media(n, "tecnica")).toBe(3);
    expect(media(n, "juego")).toBeNull();
    expect(media(undefined)).toBeNull();
  });

  it("busca la evaluación anterior en la que el jugador fue valorado", () => {
    const a = ev("a", "2026-10-01", { Laia: { bote: 2 } });
    const b = ev("b", "2026-12-20", { Marc: { bote: 3 } });
    const c = ev("c", "2027-03-30", { Laia: { bote: 3 } });
    expect(anteriorDe([c, a, b], c, "Laia")?.id).toBe("a");
    expect(anteriorDe([a, b, c], a, "Laia")).toBeNull();
  });

  it("los puntos fuertes nunca son flojos y lo que mejorar nunca es lo que ya consigue", () => {
    const r = resumirJugador({ bote: 4, pase: 3, tiro: 1, defensa: 2, rebote: 2 }, { bote: 3, tiro: 1, pase: 3 });
    expect(r.fuertes.map((c) => c.id)).toEqual(["bote", "pase"]);
    expect(r.trabajar.map((c) => c.id)).toEqual(["tiro", "defensa"]);
    expect(r.mejoras.map((x) => x.criterio.id)).toEqual(["bote"]);
    expect(resumirJugador({ bote: 1, pase: 2 }).fuertes).toEqual([]);
    expect(resumirJugador({ bote: 4, pase: 3 }).trabajar).toEqual([]);
  });

  it("compara solo los criterios valorados las dos veces", () => {
    expect(cambios({ bote: 2, tiro: 1 }, { bote: 3, pase: 2 }).map((x) => [x.criterio.id, x.antes, x.ahora])).toEqual([["bote", 2, 3]]);
  });

  it("valida lo guardado", () => {
    const st = normalizarStoreEvaluacion({
      jugadores: "4 Laia",
      evaluaciones: [
        { id: "x", nombre: "", fecha: "2027-01-10", notas: { Laia: { bote: 3, inventado: 4, tiro: 7, pase: 2.5 } }, comentarios: { Laia: "  ", Marc: "Bien" } },
        { id: "x", nombre: "Inicio", fecha: "2026-10-01", notas: "basura" },
        { fecha: "mal" },
        "basura",
      ],
    });
    expect(st.evaluaciones.map((e) => e.nombre)).toEqual(["Inicio", "Evaluación"]);
    expect(st.evaluaciones[1].notas).toEqual({ Laia: { bote: 3 } });
    expect(st.evaluaciones[1].comentarios).toEqual({ Marc: "Bien" });
    expect(new Set(st.evaluaciones.map((e) => e.id)).size).toBe(2);
    expect(normalizarStoreEvaluacion(null).evaluaciones).toEqual([]);
  });
});
