import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import MiTalla from "../components/MiTalla.astro";
import {
  construirDatosMiTalla,
  estadoMiTalla,
  normalizarMiTalla,
  TALLAS_EU,
  type TallasTienda,
} from "./miTalla";
import type { LinkCompra, Zapatilla } from "./types";

type ZapatillaFixture = Pick<Zapatilla, "id" | "links_compra">;
type LinkFixture = Pick<LinkCompra, "tienda" | "url" | "precio_actual" | "disponible" | "tallas" | "tiene_afiliado" | "ultima_verificacion">;

const link = (overrides: Partial<LinkFixture> = {}): LinkFixture => ({
  tienda: "adidas_es",
  url: "https://tienda.example/zapatilla",
  precio_actual: 90,
  disponible: true,
  tiene_afiliado: false,
  ultima_verificacion: "2026-11-08",
  tallas: ["42"],
  ...overrides,
});

const zapato = (id: string, links_compra: LinkFixture[]): ZapatillaFixture => ({ id, links_compra });

describe("Mi talla helpers", () => {
  it("ofrece 31 tallas EU de 35 a 50 en incrementos de media", () => {
    expect(TALLAS_EU).toHaveLength(31);
    expect(TALLAS_EU[0]).toBe("35");
    expect(TALLAS_EU.at(-1)).toBe("50");
    expect(TALLAS_EU).toContain("42,5");
    expect(TALLAS_EU).not.toContain("42 2/3");
  });

  it.each([
    ["42,5", "42,5"],
    ["42.5", "42,5"],
    ["  42,5  ", "42,5"],
    ["", ""],
    [null, ""],
    ["abc", ""],
    ["34,5", ""],
    ["50,5", ""],
    ["42 2/3", ""],
  ])("normaliza %s como %s", (input, expected) => {
    expect(normalizarMiTalla(input)).toBe(expected);
  });

  it("confirma si alguna tienda medida tiene la talla y lista solo tiendas medidas si falta", () => {
    const tiendas: TallasTienda[] = [
      { tienda: "Adidas", tallas: ["41", "42,5"] },
      { tienda: "Otra", tallas: ["40"] },
      { tienda: "Sin medidas", tallas: [] },
    ];
    expect(estadoMiTalla(tiendas, "42,5")).toEqual({ confirmada: true, texto: "Tu talla en Adidas" });
    expect(estadoMiTalla(tiendas, "43")).toEqual({ confirmada: false, texto: "Sin tu talla en Adidas · Otra" });
  });

  it.each(["", "talla-invalida", "42 2/3"]) ("no afirma nada sin una talla seleccionable (%s)", (talla) => {
    expect(estadoMiTalla([{ tienda: "Adidas", tallas: ["42"] }], talla)).toEqual({ confirmada: false, texto: "" });
  });

  it.each([undefined, [], [{ tienda: "Adidas", tallas: ["invalida"] }]])(
    "no afirma nada sin tiendas con medidas válidas (%s)",
    (tiendas) => expect(estadoMiTalla(tiendas, "42")).toEqual({ confirmada: false, texto: "" }),
  );

  it.each([
    ["42 2/3", "42,5"],
    ["43 1/3", "43"],
  ])("no equipara la talla fraccionaria %s con %s", (stock, seleccionada) => {
    expect(estadoMiTalla([{ tienda: "Adidas", tallas: [stock] }], seleccionada)).toEqual({
      confirmada: false,
      texto: "Sin tu talla en Adidas",
    });
  });

  it("construye solo tallas disponibles de la fila barata visible y solo para productos con datos", () => {
    const datos = construirDatosMiTalla([
      zapato("modelo-a", [
        link({ precio_actual: 100, tallas: ["42"], url: "https://shop.example/cara" }),
        link({ precio_actual: 70, tallas: ["43"], url: "https://shop.example/barata" }),
        link({ tienda: "amazon_es", disponible: false, precio_actual: 40, tallas: ["44"] }),
        link({ tienda: "forumsport_es", tallas: [] }),
      ]),
      zapato("solo-agotado", [link({ disponible: false, tallas: ["42"] })]),
      zapato("sin-tallas", [link({ tallas: undefined })]),
    ]);
    expect(datos).toEqual({ "modelo-a": [{ tienda: "Adidas", tallas: ["43"] }] });
    const serializado = JSON.stringify(datos);
    expect(serializado).not.toContain("shop.example");
    expect(serializado).not.toContain("precio_actual");
    expect(serializado).not.toContain("catalogo-completo");
    expect(serializado).not.toContain("solo-agotado");
  });
});

describe("MiTalla.astro", () => {
  it("renderiza selector, estado inicial, cobertura y solo los datos recibidos escapando script", async () => {
    const datos = {
      "modelo-seguro": [{ tienda: "Adidas", tallas: ["42"] }],
      ataque: [{ tienda: "</script><script>alert(1)</script><img src=x onerror=alert(1)>", tallas: ["43"] }],
    };
    const container = await AstroContainer.create();
    const html = await container.renderToString(MiTalla, { props: { datos } });

    expect((html.match(/<option\b/g) ?? [])).toHaveLength(32);
    expect(html).toContain('value=""');
    expect(html).toContain("Sin elegir</option>");
    expect(html).toContain('value="42,5"');
    expect(html).toMatch(/<input type="checkbox" id="mi-talla-solo" disabled(?:\s|>)/);
    expect(html).toContain("Solo cubre las tiendas con tallas medidas");
    const json = html.match(/<script[^>]*id="mi-talla-datos"[^>]*>([\s\S]*?)<\/script>/)?.[1];
    expect(json).toBeDefined();
    expect(JSON.parse(json!)).toEqual(datos);
    expect(html.match(/<script\b/g)).toHaveLength(1);
    expect(json).not.toContain("</script>");
    expect(html).not.toContain("catalogo-completo");
  });
});
