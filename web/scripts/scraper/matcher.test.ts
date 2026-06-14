import { describe, it, expect } from "vitest";
import { matchesShoe } from "./matcher";

// Casos reales recogidos con cloakbrowser (títulos de Amazon ES). Blindan el matcher
// contra los falsos positivos que metían productos equivocados en precios.json.
describe("matchesShoe — debe RECHAZar productos de otra zapa", () => {
  const wrong: [string, string, string][] = [
    // [titulo real del listing, marca, modelo buscado]
    ["Nike Air MAX Alpha Trainer 6 Sneaker Hombre", "Nike", "Air Max Impact 5"], // nº 5≠6
    ["NIKE Air Jordan 1 Low Zapatillas de básquetbol Hombre", "Jordan", "Air Jordan 8"], // 1≠8
    ["NIKE Air Jordan Two Trey Hombre Basketball Trainers DO1925 UK 10 US 11", "Jordan", "Air Jordan 10"], // "10" era talla
    ["adidas Crazy Light Boost - Zapatillas de Baloncesto", "adidas", "Crazy 8"], // falta nº 8
    ["NIKE Zapatos Air Max 270 (PS) Código AO2372-122 Blanco, 34 EU", "Nike", "Air Max CB 34"], // "34" era talla
    ["Nike Air MAX 1 Essential Sneaker Hombre", "Nike", "Air Penny 1"], // comparte air+1, falta "penny"
    ["Li-Ning Way of Wade 10 & 11 Series Hombres", "Li-Ning", "Way of Wade 12"], // 12≠10/11
  ];
  for (const [titulo, marca, modelo] of wrong) {
    it(`"${titulo.slice(0, 40)}" NO es ${marca} ${modelo}`, () => {
      expect(matchesShoe(titulo, marca, modelo)).toBe(false);
    });
  }
});

describe("matchesShoe — debe ACEPTar la zapa correcta", () => {
  const right: [string, string, string][] = [
    ["Under Armour Curry 12 'Gravity' - Tenis de baloncesto unisex", "Under Armour", "Curry 12"],
    ["Jordan Luka 2 Zapatillas deportivas Hombre", "Jordan", "Luka 2"],
    ["Jordan Air 3 Retro 'Medium Olive'", "Jordan", "Air Jordan 3"],
    ["Reebok Shaq Attaq - Zapatos de baloncesto retro", "Reebok", "Shaq Attaq"],
    ["NIKE Air Penny 2 Zapatillas Unisex Adulto", "Nike", "Air Penny 2"],
    ["Nike Air Force 1 Mid '07 Sneaker Hombre", "Nike", "Air Force 1"],
    ["Nike Air More Uptempo Low Sneaker Hombre", "Nike", "Air More Uptempo"],
    ["NIKE Zm Lebron NXXT Gen Ampd, Zapatillas de básquetbol", "Nike", "LeBron NXXT Genisus"],
  ];
  for (const [titulo, marca, modelo] of right) {
    it(`"${titulo.slice(0, 40)}" SÍ es ${marca} ${modelo}`, () => {
      expect(matchesShoe(titulo, marca, modelo)).toBe(true);
    });
  }
});
