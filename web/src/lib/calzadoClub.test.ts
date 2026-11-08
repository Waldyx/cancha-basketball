import { describe, expect, it } from "vitest";
import { zapatillas } from "../data/zapatillas";
import { findMejorPrecioMostrado, recomendar } from "./scoring";
import type { Zapatilla } from "./types";
import { candidatasCalzadoClub, construirCalzadoClub, enlaceCalzadoClub, FRANJAS_CLUB, leerOpcionesCalzadoClub, perfilCalzadoClub, recomendarCalzadoClub, seleccionCalzadoClub } from "./calzadoClub";

const base = zapatillas.find((z) => z.genero === "unisex" && !z.es_retro)!;
const zapa = (id: string, precio = 50, extra: Partial<Zapatilla> = {}): Zapatilla => ({
  ...base, id, slug: id, oculto: false, proximamente: false,
  links_compra: [{ ...base.links_compra[0], tienda: "amazon_es", url: `https://www.amazon.es/dp/${id}`, precio_actual: precio, disponible: true, tiene_afiliado: true }],
  ...extra,
});

describe("opciones de calzado para clubs", () => {
  it("tiene opciones seguras por defecto y limita texto y presupuesto", () => {
    expect(leerOpcionesCalzadoClub(new URLSearchParams())).toEqual({ club: "", max: 80, mini: "gs", infantil: "adulto" });
    for (const max of ["NaN", "Infinity", "-1", "0", "1001", "", " "]) expect(leerOpcionesCalzadoClub(new URLSearchParams({ max })).max).toBe(80);
    expect(leerOpcionesCalzadoClub(new URLSearchParams({ club: "  Club\n inventado\u0000 ", max: "59.95", mini: "adulto", infantil: "gs" }))).toEqual({ club: "Club inventado", max: 59.95, mini: "adulto", infantil: "gs" });
    expect([...leerOpcionesCalzadoClub(new URLSearchParams({ club: "🏀".repeat(100) })).club]).toHaveLength(80);
  });
  it("solo comparte club y opciones, sin arrastrar otros parametros ni cambiar el dominio", () => {
    const payload = '</script><img src=x onerror="alert(1)">';
    const opciones = leerOpcionesCalzadoClub(new URLSearchParams({ club: payload, max: "70", token: "privado", nombre: "No compartir", mini: "incorrecto" }));
    const url = new URL(enlaceCalzadoClub(opciones));
    expect(url.origin + url.pathname).toBe("https://canchazapa.com/clubs/calzado/");
    expect([...url.searchParams.keys()]).toEqual(["club", "max", "mini", "infantil"]);
    expect(url.searchParams.get("club")).toBe(payload);
    expect(leerOpcionesCalzadoClub(url.searchParams)).toEqual(opciones);
  });
  it("usa perfil junior para las dos franjas menores, sin lesiones ni datos personales", () => {
    for (const id of ["mini", "infantil"] as const) expect(perfilCalzadoClub(id, 65)).toMatchObject({ perfil: "junior", presupuesto_max_eur: 65, lesiones: [] });
    expect(perfilCalzadoClub("adulto", 65).perfil).toBe("hombre");
  });
});

describe("seleccion de calzado del club", () => {
  it("excluye ocultas, proximamente, sin afiliado, agotadas y busquedas", () => {
    const buena = zapa("valida");
    const sinAfiliado = zapa("sin-afiliado", 30); sinAfiliado.links_compra[0].tiene_afiliado = false;
    const agotada = zapa("agotada"); agotada.links_compra[0].disponible = false;
    const busqueda = zapa("busqueda"); busqueda.links_compra[0].url = "https://www.amazon.es/s?k=zapatillas";
    const catalogo = [buena, zapa("oculta", 30, { oculto: true }), zapa("futura", 30, { proximamente: true }), sinAfiliado, agotada, busqueda];
    expect(candidatasCalzadoClub(catalogo, "adulto", 80).map((z) => z.id)).toEqual(["valida"]);
  });
  it("separa GS de adulto/unisex y no asigna hormas solo femeninas a un grupo general", () => {
    const catalogo = [zapa("adulto"), zapa("escolar", 40, { genero: "gs" }), zapa("femenina", 40, { genero: "women" })];
    expect(candidatasCalzadoClub(catalogo, "gs", 80).map((z) => z.id)).toEqual(["escolar"]);
    expect(candidatasCalzadoClub(catalogo, "adulto", 80).map((z) => z.id)).toEqual(["adulto"]);
  });
  it("una compra no afiliada barata no permite colar una afiliada fuera de presupuesto", () => {
    const z = zapa("cara", 100);
    z.links_compra.push({ ...z.links_compra[0], tienda: "basketballemotion_es", tiene_afiliado: false, precio_actual: 30 });
    expect(recomendarCalzadoClub([z], "infantil", "adulto", 80)).toEqual([]);
  });
  it("no pinta un precio superior al tope aunque el minimo interno sea menor", () => {
    const z = zapa("precio-mostrado", 90);
    z.links_compra.push({ ...z.links_compra[0], url: "https://www.adidas.es/producto.html", tienda: "adidas_es", precio_actual: 90.4 });
    expect(findMejorPrecioMostrado(z.links_compra, z.precio_msrp_eur)?.precio_actual).toBe(90.4);
    expect(candidatasCalzadoClub([z], "adulto", 90)).toEqual([]);
    expect(candidatasCalzadoClub([z], "adulto", 90.4)).toHaveLength(1);
  });
  it("deja vacia una franja sin inventar opciones ni relajar el presupuesto", () => {
    expect(recomendarCalzadoClub([zapa("costosa", 100)], "mini", "gs", 1)).toEqual([]);
    const datos = construirCalzadoClub([]);
    for (const f of FRANJAS_CLUB) expect(seleccionCalzadoClub(datos, f.id, leerOpcionesCalzadoClub(new URLSearchParams()))).toEqual([]);
  });
  it("conserva Ver precio cuando el helper no permite mostrar el numero", () => {
    const z = zapa("reventa", 100, { precio_msrp_eur: 40 });
    expect(findMejorPrecioMostrado(z.links_compra, z.precio_msrp_eur)).toBeUndefined();
    expect(construirCalzadoClub([z]).fichas.find((f) => f.id === z.id)?.precio).toBeNull();
  });
  it("llama al mismo motor y no cambia su orden", () => {
    const candidatas = candidatasCalzadoClub(zapatillas, "adulto", 80);
    expect(recomendarCalzadoClub(zapatillas, "infantil", "adulto", 80)).toEqual(recomendar(perfilCalzadoClub("infantil", 80), candidatas, 3));
  });
  it("respeta el limite exacto en centimos y no redondea una oferta hacia abajo", () => {
    const catalogo = [zapa("centimos", 29.99), zapa("fraccion", 30.001)];
    const datos = construirCalzadoClub(catalogo);
    for (const max of [29.98, 29.99, 30, 30.01]) {
      const opciones = { club: "", max, mini: "gs" as const, infantil: "adulto" as const };
      expect(seleccionCalzadoClub(datos, "adulto", opciones)).toEqual(recomendarCalzadoClub(catalogo, "adulto", "adulto", max).map((r) => r.zapatilla.id));
    }
  });
  it("precalculo y motor directo coinciden a ambos lados de los limites de precio", () => {
    const datos = construirCalzadoClub(zapatillas);
    for (const franja of FRANJAS_CLUB) {
      for (const tallaje of Object.keys(datos.franjas[franja.id]) as ("gs" | "adulto")[]) {
        const limites = datos.franjas[franja.id][tallaje]!.flatMap((e) => [e.desde - .01, e.desde, e.desde + .01]);
        for (const max of [...limites, 1, 40, 80, 130, 1000].filter((n) => n >= 1 && n <= 1000)) {
          const opciones = { club: "Club inventado", max, mini: tallaje, infantil: tallaje };
          expect(seleccionCalzadoClub(datos, franja.id, opciones), `${franja.id}/${tallaje}/${max}`).toEqual(recomendarCalzadoClub(zapatillas, franja.id, tallaje, max).map((r) => r.zapatilla.id));
        }
      }
    }
  });
});
