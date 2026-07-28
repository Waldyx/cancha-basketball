import { describe, it, expect } from "vitest";
import { matchesShoe, unwrapAffiliateUrl } from "./matcher";

describe("unwrapAffiliateUrl — scrapear la tienda, no el redirect de afiliado", () => {
  it("Awin (Decathlon): extrae el destino de ?ued=", () => {
    const dest = "https://www.decathlon.es/es/p/zapatilla-x/372870/m8967856";
    const wrap = `https://www.awin1.com/cread.php?awinmid=105405&awinaffid=2908587&ued=${encodeURIComponent(dest)}`;
    expect(unwrapAffiliateUrl(wrap)).toBe(dest);
  });

  it("TradeTracker/FuikaOmar: extrae el destino de ?u=", () => {
    const dest = "https://www.fuikaomar.es/zapatillas-nike-kd-18.html";
    const wrap = `https://deals.fuikaomar.es/c?c=37834&m=12&a=511170&r=&u=${encodeURIComponent(dest)}`;
    expect(unwrapAffiliateUrl(wrap)).toBe(dest);
  });

  it("deja intactas las URLs que no son wrapper", () => {
    const u = "https://www.amazon.es/s?k=nike+lebron+22&tag=canchazapa-21";
    expect(unwrapAffiliateUrl(u)).toBe(u);
  });

  it("no rompe con una URL inválida", () => {
    expect(unwrapAffiliateUrl("no-es-una-url")).toBe("no-es-una-url");
  });
});

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

// Amazon escribe la generación en ROMANOS ("Lebron Xxii") y "Volume" en vez de
// "Vol". Nuestro catálogo usa arábigos ("LeBron 22") y "Vol", así que el matcher
// rechazaba el producto correcto: era la causa de ~90% de fallos en amazon_es.
describe("matchesShoe — romanos y sinónimos (títulos reales de Amazon)", () => {
  const right: [string, string, string][] = [
    ["NIKE Lebron Xxii SneakerHombre", "Nike", "LeBron 22"],
    ["adidas Performance Harden Volume 9 Cyber Metallic Hombre", "Adidas", "Harden Vol 9"],
    ["adidas Harden Volume 9 Basketball Shoes ZapatillasUnisex Adulto", "Adidas", "Harden Vol 9"],
    ["NIKE Air Jordan XXXVIII Low Zapatillas", "Jordan", "Air Jordan 38"],
    ["Nike Kobe IX Elite Low Protro", "Nike", "Kobe 9 Elite Low Protro"],
  ];
  for (const [titulo, marca, modelo] of right) {
    it(`"${titulo.slice(0, 42)}" SÍ es ${marca} ${modelo}`, () => {
      expect(matchesShoe(titulo, marca, modelo)).toBe(true);
    });
  }

  // El romano NO puede volverse comodín: otra generación sigue siendo otra zapa,
  // y las tallas tipo "XL" no deben interpretarse como el número 40.
  const wrong: [string, string, string][] = [
    ["NIKE Lebron Xxi Zapatillas Hombre", "Nike", "LeBron 22"],
    ["NIKE Lebron Xxii SneakerHombre", "Nike", "LeBron 21"],
    ["adidas Harden Volume 8 Basketball Shoes", "Adidas", "Harden Vol 9"],
    ["Nike Camiseta de baloncesto talla XL", "Nike", "Air Max CB 40"],
  ];
  for (const [titulo, marca, modelo] of wrong) {
    it(`"${titulo.slice(0, 42)}" NO es ${marca} ${modelo}`, () => {
      expect(matchesShoe(titulo, marca, modelo)).toBe(false);
    });
  }
});
