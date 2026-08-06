import { describe, it, expect } from "vitest";
import { matchesShoe, unwrapAffiliateUrl } from "./matcher";

// Las tiendas pegan letra+número ("MB04", "AE1") donde el catálogo lo separa
// ("MB.04", "AE 1"). Sin normalizarlo, el número obligatorio no se encontraba.
describe("matchesShoe — modelo con letra+número pegados", () => {
  const right: [string, string, string][] = [
    ["Zapatillas de baloncesto Adulto - PUMA LaMelo Ball MB04 Low azul", "Puma", "MB.04"],
    ["adidas AE1 Basketball Shoes", "Adidas", "AE 1"],
    ["ANTA KT10 Klay Thompson", "Anta", "KT 10"],
  ];
  for (const [t, marca, modelo] of right) {
    it(`"${t.slice(0, 40)}" SÍ es ${marca} ${modelo}`, () => {
      expect(matchesShoe(t, marca, modelo)).toBe(true);
    });
  }
  it("no confunde generaciones: MB03 no es MB.04", () => {
    expect(matchesShoe("PUMA LaMelo Ball MB03 Low", "Puma", "MB.04")).toBe(false);
  });
});

describe("matchesShoe — no confundir el modelo con ruido del título", () => {
  it("SE500 es el modelo, no un código de estilo", () => {
    expect(
      matchesShoe("TARMAK Zapatillas de baloncesto Adulto SE500 MID blancas", "Decathlon Tarmak", "SE500 Mid")
    ).toBe(true);
  });
  it("sigue descartando códigos de estilo reales (4+ dígitos)", () => {
    expect(
      matchesShoe("NIKE Zapatos Air Max 270 (PS) Código AO2372-122 Blanco, 34 EU", "Nike", "Air Max CB 34")
    ).toBe(false);
  });
  it("los paréntesis del modelo no rompen el match", () => {
    expect(
      matchesShoe(
        "KIPSTA Zapatillas de baloncesto de media caña edición Sarr hombre/mujer, Canaveral 900 azul",
        "Kipsta",
        "Canaveral 900 (Sarr Edition)"
      )
    ).toBe(true);
  });
});

// Algunas tiendas usan el nombre largo del jugador donde adidas usa las siglas.
describe("matchesShoe — alias de modelo (nombre largo del jugador)", () => {
  it("Decathlon vende la AE 1 como 'Anthony Edwards 1'", () => {
    expect(
      matchesShoe("ADIDAS Zapatillas de baloncesto Adulto - Anthony Edwards 1 Low blanco y negro", "Adidas", "AE 1")
    ).toBe(true);
  });
  it("y la AE 2 como 'Anthony Edwards 2'", () => {
    expect(matchesShoe("adidas Anthony Edwards 2 Basketball Shoes", "Adidas", "AE 2")).toBe(true);
  });
  it("pero la generación sigue mandando: Anthony Edwards 2 no es AE 1", () => {
    expect(matchesShoe("adidas Anthony Edwards 2 Basketball Shoes", "Adidas", "AE 1")).toBe(false);
  });
});

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

// Las tiendas escriben las siglas punteadas ("G.t. Cut 3", "D.O.N Issue 7") y,
// como el punto se convierte en espacio, el token obligatorio "gt" del catálogo
// no aparecía nunca. Nuestro propio catálogo es inconsistente ("GT Cut 3" pero
// "Air Zoom G.T. Cut 4"), así que el fix tiene que valer en los dos sentidos.
// Títulos REALES de Amazon capturados el 2026-08-06.
describe("matchesShoe — siglas punteadas (G.T., D.O.N.)", () => {
  const right: [string, string, string][] = [
    ["NIKE G.t. Cut 3, Zapatillas de básquetbol Hombre", "Nike", "GT Cut 3"],
    ["NIKE Air Zoom G.T. Cut 4 Zapatillas de baloncesto", "Nike", "Air Zoom G.T. Cut 4"],
    // Al revés: catálogo punteado, tienda sin puntos
    ["Nike Air Zoom GT Cut 4 basketball", "Nike", "Air Zoom G.T. Cut 4"],
    ["adidas D.O.N Issue 7 Zapatillas", "Adidas", "D.O.N. Issue 7"],
    ["adidas DON Issue 7", "Adidas", "D.O.N. Issue 7"],
  ];
  for (const [titulo, marca, modelo] of right) {
    it(`"${titulo.slice(0, 42)}" SÍ es ${marca} ${modelo}`, () => {
      expect(matchesShoe(titulo, marca, modelo)).toBe(true);
    });
  }

  const wrong: [string, string, string][] = [
    // La generación sigue mandando
    ["NIKE G.t. Cut 4, Zapatillas de básquetbol Hombre", "Nike", "GT Cut 3"],
    // Y la GT Cut no es la GT Jump
    ["NIKE Air Zoom G.T. Jump 2 Zapatillas", "Nike", "Air Zoom G.T. Cut 4"],
  ];
  for (const [titulo, marca, modelo] of wrong) {
    it(`"${titulo.slice(0, 42)}" NO es ${marca} ${modelo}`, () => {
      expect(matchesShoe(titulo, marca, modelo)).toBe(false);
    });
  }

  // Una letra suelta NO es una sigla: la "x" de las colaboraciones se queda
  // como está y no puede fundirse con la palabra siguiente.
  it("no une la 'x' de colaboración con lo que venga detrás", () => {
    expect(matchesShoe("adidas Dame 9 x Wale", "Adidas", "Dame 9")).toBe(true);
    expect(matchesShoe("adidas Dame 9 x Wale", "Adidas", "Dame 9 XW")).toBe(false);
  });
});

// El catálogo llama "GS" al segmento junior (14 zapas, 20 enlaces), pero NINGUNA
// tienda escribe "GS": usan "Junior", "Jr" o "(GS)". Como el número/token del
// modelo es obligatorio, esas 14 zapas no podían emparejar NUNCA con nada.
// Detectado el 2026-08-06 con fichas reales de FuikaOmar.
describe("matchesShoe — segmento GS/junior", () => {
  const right: [string, string, string][] = [
    ["Zapatillas Puma MB.05 Low Fluorish Junior", "Puma", "MB.05 GS"],
    ["adidas AE 1 Junior Basketball Shoes", "Adidas", "AE 1 GS"],
    ["Nike Sabrina 3 (GS) Basketball", "Nike", "Sabrina 3 GS"],
    ["Under Armour Curry 12 Jr", "Under Armour", "Curry 12 GS"],
    // Las tiendas españolas lo rotulan "niño"/"niña". Títulos REALES de Forum
    // Sport (2026-08-06); las 3 estaban EN STOCK y se perdían por esto.
    ["adidas Dame X rojo zapatilla baloncesto niño", "Adidas", "Dame X GS"],
    ["adidas Ownthegame 3.0 azul zapatilla baloncesto niño", "Adidas", "OwnTheGame 3 GS"],
    ["adidas D.o.n Issue 7 azul zapatilla baloncesto niño", "Adidas", "D.O.N. Issue 7 GS"],
    // Variante sin tilde y en plural, tal y como viene en los slugs de URL.
    ["nike zapatilla baloncesto ninos jordan luka 77 gs", "Jordan", "Luka 77 GS"],
  ];
  for (const [titulo, marca, modelo] of right) {
    it(`"${titulo.slice(0, 42)}" SÍ es ${marca} ${modelo}`, () => {
      expect(matchesShoe(titulo, marca, modelo)).toBe(true);
    });
  }

  // Lo que NO debe pasar: que una GS se coma el precio de la de adulto. Es más
  // barata, así que colarla sería mentir en el "desde X€".
  const wrong: [string, string, string][] = [
    ["Zapatillas Under Armour Curry 12 Extraterrestial", "Under Armour", "Curry 12 GS"],
    ["Zapatillas Puma MB.05 Low Fluorish", "Puma", "MB.05 GS"],
    // Y una GS de otra generación sigue siendo otra zapa
    ["Zapatillas Puma MB.04 Low Junior", "Puma", "MB.05 GS"],
    // "niño" tampoco puede saltarse la generación
    ["adidas D.o.n Issue 6 azul zapatilla baloncesto niño", "Adidas", "D.O.N. Issue 7 GS"],
    // Ni la de adulto colar como GS por no llevar la marca del segmento
    ["adidas Ownthegame 3.0 azul zapatillas baloncesto hombre", "Adidas", "OwnTheGame 3 GS"],
  ];
  for (const [titulo, marca, modelo] of wrong) {
    it(`"${titulo.slice(0, 42)}" NO es ${marca} ${modelo}`, () => {
      expect(matchesShoe(titulo, marca, modelo)).toBe(false);
    });
  }
});
