import { describe, it, expect } from "vitest";
import { zapatillas } from "../data/zapatillas";
import { recomendar } from "./scoring";
import { catalogoQuiz } from "./quizCatalogo";
import type { RespuestasQuiz } from "./types";

// Candado del recorte: con cualquier respuesta, /resultados debe recomendar EXACTAMENTE lo mismo
// con el catálogo recortado que con el entero (mismas zapas, orden, % y razones).
describe("catalogoQuiz", () => {
  const lite = catalogoQuiz(zapatillas);
  const posiciones = ["base", "escolta", "alero", "ala-pivot", "pivot"] as const;
  const pesos = ["menos-70", "70-85", "85-100", "mas-100"] as const;
  const estilos = ["explosivo", "equilibrado", "potente", "tirador"] as const;
  const canchas = ["interior", "exterior", "mixto"] as const;
  const lesiones = [[], ["rodillas"], ["tobillos"], ["fascia", "rodillas"]] as const;
  const prioridades = ["proteccion", "reactividad", "precio"] as const;
  const perfiles = ["hombre", "mujer", "junior", undefined] as const;
  const presupuestos = [null, 60, 100, 150] as const;

  it("recomienda lo mismo que con el catálogo entero", () => {
    let casos = 0;
    let i = 0;
    for (const posicion of posiciones)
      for (const peso of pesos)
        for (const cancha of canchas) {
          i++;
          const r = {
            posicion,
            peso,
            cancha,
            estilo: estilos[i % estilos.length],
            lesiones: [...lesiones[i % lesiones.length]],
            prioridad: prioridades[i % prioridades.length],
            perfil: perfiles[i % perfiles.length],
            presupuesto_max_eur: presupuestos[i % presupuestos.length],
          } as unknown as RespuestasQuiz;
          const a = recomendar(r, zapatillas, 5).map((x) => [x.zapatilla.slug, x.match_pct, x.razones.join("|")]);
          const b = recomendar(r, lite, 5).map((x) => [x.zapatilla.slug, x.match_pct, x.razones.join("|")]);
          expect(b, JSON.stringify(r)).toEqual(a);
          casos++;
        }
    expect(casos).toBe(60);
  });

  it("quita los textos largos", () => {
    const z = lite[0] as unknown as Record<string, unknown>;
    expect(z.resumen).toBeUndefined();
    expect(z.pros).toBeUndefined();
    expect(z.puntuaciones).toBeDefined();
    expect(z.links_compra).toBeDefined();
  });
});
