import { describe, it, expect } from "vitest";
import { zapatillasTodas } from "../data/zapatillas";

// 20-oct-2026: la nota de ligereza (puntuaciones.peso_score) se escribía a mano y apenas seguía
// al peso: con un 8 había fichas de 280 g y de 447 g, y la AE 2 de 428 g tenía un 10. Ahora sale
// del peso real: 10 con 300 g o menos y un punto menos cada 25 g (350 g → 8, 400 g → 6, 450 g → 4).
// Este test falla si alguien vuelve a poner la nota a ojo o cambia el peso sin rehacer la nota.
export const notaLigereza = (g: number) => Math.max(1, Math.min(10, Math.round(10 - (g - 300) / 25)));

describe("peso_score sale de peso_real_g", () => {
  it("toda ficha con peso tiene la nota de ligereza que le corresponde", () => {
    const malas = zapatillasTodas
      .filter((z) => z.peso_real_g)
      .filter((z) => z.puntuaciones.peso_score !== notaLigereza(z.peso_real_g))
      .map((z) => `${z.id}: ${z.peso_real_g} g → debería ser ${notaLigereza(z.peso_real_g)}, es ${z.puntuaciones.peso_score}`);
    expect(malas, malas.join("\n")).toEqual([]);
  });
});
