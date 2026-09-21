import { describe, it, expect } from "vitest";
import { veredictoFicha } from "./amazon_es";

// Candado del 21-sep-2026. La regla anterior era "sin #add-to-cart-button ⇒ agotado",
// o sea AUSENCIA DE EVIDENCIA. Esa noche marcó 61 agotados de Amazon y dejó 25 fichas
// diciendo "no la vende ninguna de nuestras tiendas" mientras Amazon sí las vendía
// (comprobado a mano: adidas-dame-8 y nike-ja-1 tenían carrito Y compra-ya ese día).
describe("veredictoFicha (Amazon)", () => {
  it("con botón de compra y precio, está disponible", () => {
    expect(veredictoFicha(true, false, 68.25)).toEqual({ disponible: true, precio_actual: 68.25 });
  });

  it("con botón pero sin precio legible, NO inventa un precio ni marca agotado", () => {
    expect(veredictoFicha(true, false, null)).toEqual({ disponible: false });
  });

  it("agotado SOLO con señal positiva de que no se vende", () => {
    expect(veredictoFicha(false, true, null)).toEqual({ disponible: false, agotado: true });
  });

  it("🔑 sin botón y SIN señal de agotado, el scrape es inconcluyente: nunca `agotado`", () => {
    // Éste es el caso que rompió producción: el buybox no estaba en el DOM todavía, o
    // la IP de CI recibió una página recortada. Marcarlo agotado apaga el enlace
    // editorial; dejarlo inconcluyente lo conserva.
    const v = veredictoFicha(false, false, null);
    expect(v).toEqual({ disponible: false });
    expect(v.agotado).toBeUndefined();
  });

  it("un precio suelto en la página no basta para dar por buena una zapa sin carrito", () => {
    // La Ja 1 devolvía 29,99 € de un vendedor que ni siquiera tiene carrito.
    expect(veredictoFicha(false, false, 29.99)).toEqual({ disponible: false });
  });
});
