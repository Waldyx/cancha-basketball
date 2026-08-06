import { describe, it, expect } from "vitest";
import { ofertaDeJsonLd } from "./snipes_eu";

// JSON-LD REAL capturado de snipes.com el 2026-08-06.
// Recortado: se conservan íntegros los campos que lee el scraper.
const AJ4_TORO = JSON.stringify({
  "@type": "Product",
  "@context": "https://schema.org/",
  name: 'Air Jordan 4 Retro "Toro Bravo"',
  productId: 98232,
  url: "https://www.snipes.com/es-es/p/jordan-air-jordan-4-retro-toro-bravo-rojo-98232",
  offers: {
    "@type": "Offer",
    itemCondition: "https://schema.org/NewCondition",
    availability: "https://schema.org/InStock",
    price: 170,
    priceCurrency: "EUR",
  },
  color: "rojo",
  // El producto real ANIDA otros productos aquí. Sus precios NO son el nuestro.
  isSimilarTo: [
    {
      "@type": "Product",
      "@context": "https://schema.org/",
      productId: 94678,
      url: "https://www.snipes.com/es-es/p/undefined-undefined-azul-94678",
      offers: { "@type": "Offer", availability: "https://schema.org/InStock", price: 99.99 },
    },
  ],
  brand: { "@type": "Brand", name: "Jordan" },
});

const AF1_AGOTADA = JSON.stringify({
  "@type": "Product",
  "@context": "https://schema.org/",
  name: "Air Force 1 '07 LV8",
  productId: 92119,
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/OutOfStock",
    price: 70,
    priceCurrency: "EUR",
  },
  brand: { "@type": "Brand", name: "Nike" },
});

const WEBSITE = JSON.stringify({
  "@context": "https://schema.org/",
  "@type": "WebSite",
  name: "SNIPES",
  url: "https://www.snipes.com/es-es/",
});

describe("ofertaDeJsonLd — Snipes", () => {
  it("lee precio, stock y marca de la ficha", () => {
    expect(ofertaDeJsonLd([WEBSITE, AJ4_TORO])).toEqual({
      nombre: 'Air Jordan 4 Retro "Toro Bravo"',
      marca: "Jordan",
      precio: 170,
      disponible: true,
    });
  });

  it("detecta OutOfStock", () => {
    expect(ofertaDeJsonLd([AF1_AGOTADA])?.disponible).toBe(false);
  });

  // El precio del carrusel de recomendados (99,99 €) NO puede ganar al del
  // producto (170 €): los `isSimilarTo` van anidados y no son de primer nivel.
  it("IGNORA los productos anidados en isSimilarTo", () => {
    expect(ofertaDeJsonLd([AJ4_TORO])?.precio).toBe(170);
  });

  // Las 5 URLs `/c/zapatillas?q=…` del catálogo sirven una 404 (con status 200)
  // que solo lleva WebSite/Organization. Sin Product no hay ficha: devolver
  // null es lo que impide que el scraper se traiga un producto aleatorio.
  it("devuelve null en la página 404 de una búsqueda muerta", () => {
    expect(ofertaDeJsonLd([WEBSITE])).toBeNull();
  });

  it("tolera los <script> ld+json vacíos que emite Snipes", () => {
    expect(ofertaDeJsonLd(["", "   ", AJ4_TORO])?.precio).toBe(170);
  });

  it("no da por bueno un precio ausente o cero", () => {
    const sinPrecio = JSON.stringify({
      "@type": "Product",
      name: "X",
      offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
    });
    expect(ofertaDeJsonLd([sinPrecio])?.precio).toBeNull();
  });
});
