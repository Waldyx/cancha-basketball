import { describe, it, expect } from "vitest";
import { fichaDeJsonLd } from "./puma_es";

// JSON-LD REAL de eu.puma.com (Hali 1, 22-oct-2026), recortado a los campos que se leen.
const HALI_1 = {
  "@context": "http://schema.org",
  "@type": "Product",
  name: "Zapatillas de baloncesto HALI 1 unisex",
  sku: "198556099521",
  offers: {
    "@type": "Offer",
    price: 78,
    priceCurrency: "EUR",
    availability: "http://schema.org/OutOfStock",
    priceSpecification: { "@type": "UnitPriceSpecification", priceType: "https://schema.org/StrikethroughPrice", price: 130, priceCurrency: "EUR" },
  },
};
const html = (...objs: unknown[]) =>
  `<html><head>${objs.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join("")}</head></html>`;

describe("fichaDeJsonLd (puma_es)", () => {
  it("una ficha agotada se lee como agotada, con su precio", () => {
    expect(fichaDeJsonLd(html({ "@type": "BreadcrumbList" }, HALI_1))).toEqual({ precio: 78, agotado: true });
  });
  it("con stock, disponible", () => {
    const enStock = { ...HALI_1, offers: { ...HALI_1.offers, availability: "https://schema.org/InStock" } };
    expect(fichaDeJsonLd(html(enStock))).toEqual({ precio: 78, agotado: false });
  });
  it("sin availability o sin JSON-LD no concluye nada", () => {
    const sinStock = { ...HALI_1, offers: { "@type": "Offer", price: 78 } };
    expect(fichaDeJsonLd(html(sinStock))).toBeNull();
    expect(fichaDeJsonLd("<html></html>")).toBeNull();
  });
});
