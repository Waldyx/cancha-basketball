import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import TallasCompra from "../components/TallasCompra.astro";

const render = async (tallas?: string[], disponible = true) => {
  const container = await AstroContainer.create();
  return container.renderToString(TallasCompra, { props: { link: { tallas, disponible, ultima_verificacion: "2026-11-08" } } });
};

describe("tallas de la fila de compra", () => {
  it("muestra las tallas, la fecha y el aviso si quedan menos de cuatro", async () => {
    const html = await render(["42", "43", "44,5"]);
    expect(html).toContain("Tallas: 42 · 43 · 44,5");
    expect(html).toContain('datetime="2026-11-08"');
    expect(html).toContain("Verificadas:");
    expect(html).toContain("Quedan pocas tallas");
  });

  it("con cuatro tallas ya no avisa", async () => {
    const html = await render(["40", "41", "42 2/3", "44,5"]);
    expect(html).toContain("Tallas: 40 · 41 · 42 2/3 · 44,5");
    expect(html).not.toContain("Quedan pocas tallas");
  });

  it.each([undefined, []])("sin tallas medidas no inventa stock (%s)", async (tallas) => {
    const html = await render(tallas);
    expect(html).not.toContain("Tallas:");
    expect(html).not.toContain("Verificadas:");
    expect(html).not.toContain("Quedan pocas tallas");
  });

  it("un enlace agotado no anuncia tallas antiguas", async () => {
    expect(await render(["42"], false)).not.toContain("Tallas:");
  });

  it("escapa el texto de precios.json como texto, nunca HTML", async () => {
    const html = await render(['<img src=x onerror="alert(1)">']);
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;img");
  });
});
