import { describe, it, expect } from "vitest";
import { ofertaDeJsonLd, textoDeSlug } from "./forumsport_es";
import { matchesShoe } from "../matcher";

// JSON-LD REAL capturado de forumsport.com el 2026-08-06 (Harden Volume 9).
// Recortado: se conservan íntegros los campos que lee el scraper.
const HARDEN_9 = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ProductGroup",
  name: "adidas HARDEN VOLUME 9",
  url: "https://www.forumsport.com/es-es/adidas-zapatilla-baloncesto-harden-volume-9-jr2506-1001051705-p",
  color: "AMARILLO",
  sku: "1001051705",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: 95.99,
    availability: "https://schema.org/InStock",
  },
  // Las demás colorways, con SUS precios y SU stock. No son las del enlace.
  hasVariant: [
    {
      "@type": "Product",
      name: "HARDEN VOLUME 9 BLANCO",
      sku: "1001051361",
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: 159.99,
        availability: "https://schema.org/OutOfStock",
      },
    },
    {
      "@type": "Product",
      name: "HARDEN VOLUME 9 AMARILLO",
      sku: "1001051705",
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: 95.99,
        availability: "https://schema.org/InStock",
      },
    },
  ],
});

// La Luka 77 redirige a otra colorway y el destino está agotado.
const LUKA_77_AGOTADA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ProductGroup",
  name: "JORDAN LUKA 77 BLANCO",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: 59.99,
    availability: "https://schema.org/OutOfStock",
  },
});

const ORGANIZACION = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Forum Sport",
  url: "https://www.forumsport.com",
});

describe("ofertaDeJsonLd — Forum Sport", () => {
  it("lee el precio de venta y el stock del ProductGroup", () => {
    expect(ofertaDeJsonLd([ORGANIZACION, HARDEN_9])).toEqual({
      nombre: "adidas HARDEN VOLUME 9",
      precio: 95.99,
      disponible: true,
    });
  });

  // Si cogiéramos una variante de hasVariant daríamos 159,99 € (la blanca,
  // además agotada) por el precio de la ficha, que son 95,99 €.
  it("IGNORA las colorways anidadas en hasVariant", () => {
    expect(ofertaDeJsonLd([HARDEN_9])?.precio).toBe(95.99);
  });

  it("detecta OutOfStock tras un redirect de colorway", () => {
    expect(ofertaDeJsonLd([LUKA_77_AGOTADA])?.disponible).toBe(false);
  });

  it("devuelve null si el enlace no cae en una ficha", () => {
    expect(ofertaDeJsonLd([ORGANIZACION])).toBeNull();
  });

  it("acepta también un @type Product suelto", () => {
    const producto = JSON.stringify({
      "@type": "Product",
      name: "nike LEBRON WITNESS IX",
      offers: { price: 90.19, availability: "https://schema.org/InStock" },
    });
    expect(ofertaDeJsonLd([producto])).toEqual({
      nombre: "nike LEBRON WITNESS IX",
      precio: 90.19,
      disponible: true,
    });
  });
});

// La AE 2 se publica como "adidas ANTHONY EDWARDS" en el name, el h1 y el
// <title>: los tres se comen la generación. El slug es el único sitio donde
// dice cuál de las dos es.
describe("textoDeSlug — identidad de último recurso", () => {
  const AE2 =
    "https://www.forumsport.com/es-es/adidas-zapatilla-baloncesto-anthony-edwards-2-kj4228-1001075419-p";

  it("saca el slug legible de la URL", () => {
    expect(textoDeSlug(AE2)).toBe(
      "adidas zapatilla baloncesto anthony edwards 2 kj4228 1001075419 p"
    );
  });

  it("con el slug SÍ se identifica la AE 2 (la ficha sola no basta)", () => {
    expect(matchesShoe("adidas ANTHONY EDWARDS", "Adidas", "AE 2")).toBe(false);
    expect(matchesShoe(textoDeSlug(AE2), "Adidas", "AE 2")).toBe(true);
  });

  // Lo importante: el slug distingue generaciones, no las mezcla.
  it("el slug de la AE 2 NO vale como AE 1", () => {
    expect(matchesShoe(textoDeSlug(AE2), "Adidas", "AE 1")).toBe(false);
  });

  it("no revienta con una URL inválida", () => {
    expect(textoDeSlug("no-es-una-url")).toBe("");
  });
});

describe("ofertaDeJsonLd — casos límite", () => {
  it("no da por bueno un precio ausente o cero", () => {
    const sinPrecio = JSON.stringify({
      "@type": "ProductGroup",
      name: "adidas HARDEN VOLUME 9",
      offers: { availability: "https://schema.org/InStock", price: 0 },
    });
    expect(ofertaDeJsonLd([sinPrecio])?.precio).toBeNull();
  });

  it("deja la disponibilidad en null si la ficha no la declara", () => {
    const sinStock = JSON.stringify({
      "@type": "ProductGroup",
      name: "adidas HARDEN VOLUME 9",
      offers: { price: 95.99 },
    });
    expect(ofertaDeJsonLd([sinStock])?.disponible).toBeNull();
  });
});
