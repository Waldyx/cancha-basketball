import { describe, it, expect } from "vitest";
import { matchesShoe } from "./matcher";
import { zapatillas } from "../../src/data/zapatillas";

/**
 * Invariante barato pero fuerte: si una zapatilla no se reconoce ni con su
 * PROPIO nombre, no podrá emparejar en ninguna tienda y su precio se queda
 * congelado para siempre. Cubre las dos formas de romperlo:
 *  - tocar el matcher (esta suite lo detecta antes de que llegue a producción);
 *  - dar de alta un modelo con un nombre que el matcher no sabe leer.
 */
describe("catálogo — toda zapa empareja con su propio nombre", () => {
  it("ninguna ficha del catálogo es inemparejable", () => {
    const fallos = zapatillas
      .filter(
        (z) =>
          !matchesShoe(`${z.marca} ${z.modelo} - Zapatillas de baloncesto`, z.marca, z.modelo)
      )
      .map((z) => `${z.id} ("${z.marca} ${z.modelo}")`);

    expect(fallos).toEqual([]);
  });
});
