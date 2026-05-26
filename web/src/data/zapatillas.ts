import type { Zapatilla } from "../lib/types";
import { mergePricesIntoShoes } from "../lib/mergePrices";
import type { PreciosJson } from "../lib/mergePrices";
import preciosJson from "./precios.json";

/**
 * Catálogo inicial de zapatillas (MVP).
 * Las puntuaciones se derivan combinando WearTesters, TheHoopsGeek y RunRepeat
 * (ver `fuentes` en cada entrada para trazabilidad).
 */
const _rawZapatillas: Zapatilla[] = [
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 1. NIKE LEBRON 22 â€” Tope de gama, cushion king
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-lebron-22",
    slug: "nike-lebron-22",
    marca: "Nike",
    modelo: "LeBron 22",
    generacion: 22,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "LeBron James",
    tecnologia_clave: ["Air Zoom", "Cushlon 3.0"],
    predecesor_id: null,
    sucesor_id: null,

    peso_real_g: 425,
    altura: "high",
    horma: "ancha",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 9,
      respuesta: 5,
      soporte_lateral: 9,
      estabilidad: 9,
      peso_score: 5,
      durabilidad_outdoor: 7,
      ventilacion: 5,
    },
    categoria_principal: "cushion-focused",
    tags: ["signature", "tope-de-gama", "moderna"],

    ideal_para: {
      posiciones: ["pivot", "ala-pivot"],
      peso_jugador_kg: [85, 120],
      estilos: ["potente", "equilibrado"],
      lesiones_compatibles: ["rodillas"],
    },
    no_recomendada_para: {
      posiciones: ["base"],
      estilos: ["explosivo"],
    },

    resumen:
      "El tope de gama de Nike para 2024-25. Cushion masivo con Air Zoom y Cushlon 3.0 que la convierte en una de las zapatillas más protectoras del mercado. Pensada para jugadores grandes y potentes que necesitan absorción de impactos al máximo nivel.",
    pros: [
      "Amortiguación líder en su categoría",
      "Estabilidad excelente para jugadores >90kg",
      "Soporte lateral en high-top muy contenido",
      "Durabilidad sólida indoor y outdoor",
    ],
    contras: [
      "Demasiado pesada para juego explosivo",
      "Precio elevado",
      "Court feel muy reducido (no notas el suelo)",
    ],
    veredicto:
      "Si pesas más de 85kg, juegas de poste o ala-pívot potente y priorizas protección sobre velocidad, es la mejor opción del mercado. Si eres un base rápido, mantente lejos.",

    imagen_principal: "/shoes/nike-lebron-22.png",
    imagenes: [],

    fuentes: [
      {
        tipo: "weartesters",
        url: "https://weartesters.com/nike-lebron-22-performance-review/",
      },
      {
        tipo: "hoops-geek",
        url: "https://www.thehoopsgeek.com/nike-lebron-22-review/",
      },
    ],
    ultima_actualizacion: "2026-05-13",

    precio_msrp_eur: 200,
    links_compra: [
      {
        tienda: "amazon_es",
        url: "https://www.amazon.es/s?k=nike+lebron+22&tag=canchazapa-21",
        precio_actual: 189.99,
        disponible: true,
        tiene_afiliado: true,
        ultima_verificacion: "2026-05-13",
      },
      {
        tienda: "nike_es",
        url: "https://www.nike.com/es/w?q=lebron+22&vst=lebron+22",
        precio_actual: 200,
        disponible: true,
        tiene_afiliado: false,
        ultima_verificacion: "2026-05-13",
      },
      {
        tienda: "footlocker_es",
        url: "https://www.footlocker.es/es/search?query=nike+lebron+22",
        precio_actual: 200,
        disponible: true,
        tiene_afiliado: false,
        ultima_verificacion: "2026-05-13",
      },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 2. UA CURRY 12 â€” Premium responsive, ligera
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "ua-curry-12",
    slug: "ua-curry-12",
    marca: "Under Armour",
    modelo: "Curry 12",
    generacion: 12,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Stephen Curry",
    tecnologia_clave: ["UA Flow", "Warp 2.0 upper"],
    predecesor_id: null,
    sucesor_id: null,

    peso_real_g: 310,
    altura: "mid",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "knit",

    puntuaciones: {
      traccion: 7,
      amortiguacion: 7,
      respuesta: 9,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 9,
      durabilidad_outdoor: 4,
      ventilacion: 8,
    },
    categoria_principal: "responsive",
    tags: ["signature", "ligera", "tope-de-gama"],

    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [60, 85],
      estilos: ["tirador", "explosivo", "equilibrado"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
    },

    resumen:
      "La signature de Curry en su 12ª iteración. Tecnología UA Flow (sin goma en suela, solo foam directo al suelo) que la hace súper ligera y reactiva. Pensada para tiradores ágiles que necesitan respuesta máxima en cortes y cambios de dirección.",
    pros: [
      "Una de las zapatillas más ligeras del mercado (310g)",
      "Respuesta excelente para tiradores y guardias rápidos",
      "Court feel premium â€” sientes el suelo perfectamente",
      "Ventilación notable en pista cubierta",
    ],
    contras: [
      "Durabilidad outdoor pobre â€” el Flow se gasta rápido en asfalto",
      "Cushion limitado para jugadores >85kg",
      "No es para juego físico de poste",
    ],
    veredicto:
      "Si eres tirador o base ligero, juegas casi exclusivamente en pista cubierta y priorizas respuesta sobre protección, es de las mejores opciones premium. Para asfalto o pesos altos, busca otra cosa.",

    imagen_principal: "/shoes/ua-curry-12.jpg",
    imagenes: [],

    fuentes: [
      {
        tipo: "weartesters",
        url: "https://weartesters.com/under-armour-curry-12-performance-review/",
      },
      {
        tipo: "hoops-geek",
        url: "https://www.thehoopsgeek.com/under-armour-curry-12-review/",
      },
    ],
    ultima_actualizacion: "2026-05-13",

    precio_msrp_eur: 160,
    links_compra: [
      { tienda: "ua_es", url: "https://www.underarmour.es/es-es/c/hombre/zapatillas/baloncesto/?q=curry+12", precio_actual: 150, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=under+armour+curry+12+baloncesto&tag=canchazapa-21", precio_actual: 149.99, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
      { tienda: "jd_sports_es", url: "https://www.jdsports.es/search/curry+12", precio_actual: 160, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 3. NIKE SABRINA 2 â€” Gama media, ligera, balanceada
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-sabrina-2",
    slug: "nike-sabrina-2",
    marca: "Nike",
    modelo: "Sabrina 2",
    generacion: 2,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Sabrina Ionescu",
    tecnologia_clave: ["Zoom Air", "Cushlon 3.0"],
    predecesor_id: null,
    sucesor_id: null,

    peso_real_g: 310,
    altura: "mid",
    horma: "normal",
    drop_mm: 9,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 7,
      respuesta: 9,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 9,
      durabilidad_outdoor: 6,
      ventilacion: 8,
    },
    categoria_principal: "balanced",
    tags: ["signature", "ligera", "value-premium"],

    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [55, 85],
      estilos: ["tirador", "explosivo", "equilibrado"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
    },

    resumen:
      "La mejor relación calidad-precio del catálogo signature de Nike. 28 gramos más ligera que la Sabrina 1, con Zoom Air en talón y Cushlon 3.0 en mediopié. Una zapatilla all-around que funciona para guardias y aleros que mezclan estilos.",
    pros: [
      "Excelente relación calidad-precio (â‚¬120)",
      "Equilibrio entre respuesta y amortiguación",
      "Tracción muy fiable indoor",
      "Versatilidad: sirve para varios estilos de juego",
    ],
    contras: [
      "No destaca en ningún aspecto concreto",
      "Cushion insuficiente para jugadores grandes",
      "Stock irregular en algunas tallas",
    ],
    veredicto:
      "Si eres base, escolta o alero, juegas mayormente indoor y quieres lo mejor por debajo de â‚¬130, es de las apuestas más seguras del año. Sólida en todo, sin debilidades graves.",

    imagen_principal: "/shoes/nike-sabrina-2.png",
    imagenes: [],

    fuentes: [
      {
        tipo: "weartesters",
        url: "https://weartesters.com/nike-sabrina-2-performance-review/",
      },
      {
        tipo: "hoops-geek",
        url: "https://www.thehoopsgeek.com/nike-sabrina-2-review/",
      },
    ],
    ultima_actualizacion: "2026-05-13",

    precio_msrp_eur: 120,
    links_compra: [
      {
        tienda: "amazon_es",
        url: "https://www.amazon.es/s?k=nike+sabrina+2&tag=canchazapa-21",
        precio_actual: 109.99,
        disponible: true,
        tiene_afiliado: true,
        ultima_verificacion: "2026-05-13",
      },
      {
        tienda: "nike_es",
        url: "https://www.nike.com/es/w?q=sabrina+2&vst=sabrina+2",
        precio_actual: 120,
        disponible: true,
        tiene_afiliado: false,
        ultima_verificacion: "2026-05-13",
      },
      {
        tienda: "decathlon",
        url: "https://www.awin1.com/cread.php?awinmid=105405&awinaffid=2908587&ued=https%3A%2F%2Fwww.decathlon.es%2Fes%2Fsearch%3FNtt%3Dsabrina",
        precio_actual: 115,
        disponible: false,
        tiene_afiliado: true,
        ultima_verificacion: "2026-05-13",
      },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 4. ANTA KAI 1 SPEED â€” Value premium, técnica
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "anta-kai-1-speed",
    slug: "anta-kai-1-speed",
    marca: "Anta",
    modelo: "KAI 1 Speed",
    generacion: 1,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Kyrie Irving",
    tecnologia_clave: ["Nitroedge foam", "Carbon plate"],
    predecesor_id: null,
    sucesor_id: "anta-kai-2",

    peso_real_g: 340,
    altura: "low",
    horma: "normal",
    drop_mm: 6,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 9,
      amortiguacion: 6,
      respuesta: 9,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 8,
      durabilidad_outdoor: 7,
      ventilacion: 7,
    },
    categoria_principal: "traction-king",
    tags: ["signature", "value-premium", "low-top", "china-brand"],

    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [60, 90],
      estilos: ["explosivo", "tirador"],
    },
    no_recomendada_para: {
      posiciones: ["pivot", "ala-pivot"],
      lesiones: ["tobillos"],
    },

    resumen:
      "La signature oficial de Kyrie Irving con Anta (tras dejar Nike). Tracción de las mejores del año según WearTesters, placa de carbono para respuesta y un precio que la hace imbatible en relación calidad-precio. Apuesta del momento para guardias técnicos.",
    pros: [
      "Tracción excepcional, una de las mejores 2024-25",
      "Respuesta y court feel premium gracias a la placa de carbono",
      "Excelente relación calidad-precio (â‚¬115)",
      "Low-top moderno y cómodo",
    ],
    contras: [
      "Low-top no apto para jugadores con tobillos débiles",
      "Cushion firme, no para impactos pesados",
      "Disponibilidad limitada fuera de China/AliExpress",
    ],
    veredicto:
      "Si eres base o escolta técnico, buscas respuesta y tracción, y no tienes problemas de tobillo, es una de las mejores compras del año. Para tobillos delicados o juego potente, busca otra opción.",

    imagen_principal: "/shoes/anta-kai-1-speed.jpg",
    imagenes: [],

    fuentes: [
      {
        tipo: "weartesters",
        url: "https://weartesters.com/anta-kai-1-performance-review/",
      },
      {
        tipo: "hoops-geek",
        url: "https://www.thehoopsgeek.com/anta-kai-1-review/",
      },
    ],
    ultima_actualizacion: "2026-05-13",

    precio_msrp_eur: 115,
    links_compra: [
      {
        tienda: "aliexpress",
        url: "https://s.click.aliexpress.com/e/_c3Ax5OIz",
        precio_actual: 99.99,
        disponible: true,
        tiene_afiliado: true,
        ultima_verificacion: "2026-05-13",
      },
      {
        tienda: "amazon_es",
        url: "https://www.amazon.es/s?k=anta+kai+1&tag=canchazapa-21",
        precio_actual: 125,
        disponible: true,
        tiene_afiliado: true,
        ultima_verificacion: "2026-05-13",
      },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 5. ADIDAS CROSS 'EM UP SELECT â€” Presupuesto outdoor
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "adidas-cross-em-up-select",
    slug: "adidas-cross-em-up-select",
    marca: "Adidas",
    modelo: "Cross 'Em Up Select",
    año_lanzamiento: 2023,
    genero: "unisex",
    tecnologia_clave: ["Bounce cushion", "Suela de goma reforzada"],
    predecesor_id: null,
    sucesor_id: null,

    peso_real_g: 380,
    altura: "high",
    horma: "normal",
    drop_mm: 12,
    tipo_cierre: "cordones",
    material_superior: "synthetic",

    puntuaciones: {
      traccion: 7,
      amortiguacion: 5,
      respuesta: 5,
      soporte_lateral: 8,
      estabilidad: 8,
      peso_score: 7,
      durabilidad_outdoor: 9,
      ventilacion: 5,
    },
    categoria_principal: "balanced",
    tags: ["presupuesto", "outdoor", "iniciacion", "high-top"],

    ideal_para: {
      posiciones: ["alero", "ala-pivot", "pivot"],
      peso_jugador_kg: [55, 100],
      estilos: ["equilibrado", "potente"],
      lesiones_compatibles: ["tobillos"],
    },
    no_recomendada_para: {
      estilos: ["explosivo"],
    },

    resumen:
      "La mejor compra por debajo de â‚¬70 para juego outdoor. Goma reforzada que aguanta asfalto durante meses, high-top para tobillos delicados y un cushion Bounce básico pero fiable. Pensada para iniciación o jugadores casuales que machacan la zapa.",
    pros: [
      "Durabilidad outdoor excepcional â€” aguanta meses en asfalto",
      "High-top con buen soporte de tobillo a este precio",
      "Estabilidad sólida para jugadores con bases pesados",
      "Precio imbatible (â‚¬60)",
    ],
    contras: [
      "Cushion muy básico, no para muchas horas de juego",
      "Court feel limitado, sensación de bote rígido",
      "Estética simple, no destaca",
      "Pesada para el rendimiento que ofrece",
    ],
    veredicto:
      "Si tu presupuesto es bajo, juegas en exterior o pistas duras, y priorizas durabilidad sobre tecnología, es la compra inteligente. Si vas a jugar mucho indoor y quieres rendimiento, sube de gama.",

    imagen_principal: "/shoes/adidas-cross-em-up-select.jpeg",
    imagenes: [],

    fuentes: [
      {
        tipo: "weartesters",
        url: "https://weartesters.com/category/budget-basketball-shoes/",
      },
    ],
    ultima_actualizacion: "2026-05-13",

    precio_msrp_eur: 60,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=cross+em+up+select", precio_actual: 55, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+cross+em+up+select&tag=canchazapa-21", precio_actual: 54.99, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
      { tienda: "decathlon", url: "https://www.awin1.com/cread.php?awinmid=105405&awinaffid=2908587&ued=https%3A%2F%2Fwww.decathlon.es%2Fes%2Fsearch%3FNtt%3Dadidas%2Bcross%2Bem%2Bup", precio_actual: 60, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 6. NIKE KD 18 â€” Tope gama, all-around cushion
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-kd-18",
    slug: "nike-kd-18",
    marca: "Nike",
    modelo: "KD 18",
    generacion: 18,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Kevin Durant",
    tecnologia_clave: ["Air Zoom forefoot", "Cushlon foam", "Air Strobel"],
    predecesor_id: "nike-kd-17",
    sucesor_id: "nike-kd-19",
    peso_real_g: 422,
    altura: "mid",
    horma: "estrecha",
    drop_mm: 5,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 9, amortiguacion: 9, respuesta: 8,
      soporte_lateral: 8, estabilidad: 8, peso_score: 5,
      durabilidad_outdoor: 7, ventilacion: 6,
    },
    categoria_principal: "cushion-focused",
    tags: ["signature", "tope-de-gama", "moderna"],
    ideal_para: {
      posiciones: ["alero", "ala-pivot", "escolta"],
      peso_jugador_kg: [75, 105],
      estilos: ["equilibrado", "tirador", "potente"],
      lesiones_compatibles: ["rodillas", "tobillos"],
    },
    no_recomendada_para: { posiciones: ["base"], estilos: ["explosivo"] },
    resumen: "Sucesor continuista del KD 17 con misma plataforma pero soporte mejorado. Tracción sobresaliente y cushion de los más cómodos del mercado, aunque ha ganado peso.",
    pros: [
      "Energy return forefoot del 72.7%",
      "Tracción excepcional indoor/outdoor",
      "Soporte y lockdown reforzados",
      "Cómoda desde el primer día",
    ],
    contras: [
      "Pesada (422 g)",
      "Horma estrecha incómoda en pies anchos",
      "Diseño conservador, sin innovación",
    ],
    veredicto: "Para aleros y forwards que priorizan amortiguación y tracción sobre velocidad. Si eres un base rápido, busca otra cosa.",
    imagen_principal: "/shoes/nike-kd-18.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/nike-kd-18-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/nike-kd-18/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 170,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=kd+18&vst=kd+18", precio_actual: 169.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=kd+18", precio_actual: 174.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "basket_world", url: "https://basketworld.com/buscar?q=kd+18", precio_actual: 169.95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 7. NIKE KOBE 8 PROTRO â€” Retro low-top, court feel
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-kobe-8-protro",
    slug: "nike-kobe-8-protro",
    marca: "Nike",
    modelo: "Kobe 8 Protro",
    generacion: 8,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Kobe Bryant",
    tecnologia_clave: ["React foam drop-in", "Engineered mesh", "Torsional shank plate"],
    peso_real_g: 360,
    altura: "low",
    horma: "estrecha",
    drop_mm: 6,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 9, amortiguacion: 7, respuesta: 9,
      soporte_lateral: 8, estabilidad: 8, peso_score: 7,
      durabilidad_outdoor: 6, ventilacion: 9,
    },
    categoria_principal: "responsive",
    tags: ["signature", "tope-de-gama", "low-top", "ligera", "retro"],
    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [60, 90],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
      lesiones: ["tobillos"],
    },
    resumen: "Retro performance del legendario Kobe 8 System con React en lugar de Lunarlon. Low-top ultraligero pensado para guards explosivos con mentalidad Mamba.",
    pros: [
      "Tracción sticky de las mejores",
      "Engineered mesh súper transpirable",
      "Court feel impresionante",
      "Lockdown perfecto",
    ],
    contras: [
      "Horma muy estrecha",
      "Amortiguación baja para jugadores pesados",
      "Rubber blando que se desgasta en outdoor",
    ],
    veredicto: "Para guards rápidos y pies estrechos que aman la sensación del Kobe 8 original. No es para jugadores pesados ni outdoor intensivo.",
    imagen_principal: "/shoes/nike-kobe-8-protro.png",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/nike-kobe-8-system-re-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/nike-kobe-protro-8/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 200,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=kobe+8+protro&vst=kobe+8+protro", precio_actual: 200, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=kobe+8", precio_actual: 210, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "snipes_eu", url: "https://www.awin1.com/cread.php?awinmid=122628&awinaffid=2908587&ued=https%3A%2F%2Fwww.snipes.com%2Fes-es%2Fc%2Fzapatillas%3Fq%3Dkobe%2B8", precio_actual: 200, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-26" },
      { tienda: "basket_world", url: "https://basketworld.com/buscar?q=kobe+8", precio_actual: 199.95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 8. JORDAN LUKA 5 â€” Tope gama, cushion ground-based
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "jordan-luka-5",
    slug: "jordan-luka-5",
    marca: "Jordan",
    modelo: "Luka 5",
    generacion: 5,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Luka DonÄiÄ‡",
    tecnologia_clave: ["Full-length Zoom Strobel", "Cushlon 3.0", "ISOband"],
    peso_real_g: 395,
    altura: "mid",
    horma: "normal",
    drop_mm: 7,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 7, amortiguacion: 9, respuesta: 8,
      soporte_lateral: 7, estabilidad: 6, peso_score: 6,
      durabilidad_outdoor: 6, ventilacion: 7,
    },
    categoria_principal: "cushion-focused",
    tags: ["signature", "tope-de-gama", "moderna"],
    ideal_para: {
      posiciones: ["escolta", "alero", "base"],
      peso_jugador_kg: [75, 100],
      estilos: ["equilibrado", "potente", "tirador"],
    },
    no_recomendada_para: { estilos: ["explosivo"], lesiones: ["tobillos"] },
    resumen: "El mejor Luka hasta la fecha: Zoom Strobel full-length con Cushlon 3.0 que se siente increíble. Penaliza algo en tracción en pista sucia y el heel es algo inestable.",
    pros: [
      "Cushion espectacular bouncy y protector",
      "Buen lockdown",
      "Versátil para varios estilos",
      "Mejor energy return de la línea Luka",
    ],
    contras: [
      "Heel area inestable en cambios bruscos",
      "Tracción mediocre en pista sucia",
      "Algo pesada",
    ],
    veredicto: "Para jugadores ground-based equilibrados o tiradores potentes que priorizan cushion. No es para explosivos que necesitan estabilidad máxima.",
    imagen_principal: "/shoes/jordan-luka-5.png",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/jordan-luka-5-performance-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/jordan-luka-5/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 135,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=jordan+luka+5&vst=jordan+luka+5", precio_actual: 135, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=jordan+luka+5", precio_actual: 140, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "basket_world", url: "https://basketworld.com/buscar?q=jordan+luka+5", precio_actual: 134.95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 9. NIKE GT CUT 3 â€” Tope gama, ZoomX balanced
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-gt-cut-3",
    slug: "nike-gt-cut-3",
    marca: "Nike",
    modelo: "GT Cut 3",
    generacion: 3,
    año_lanzamiento: 2024,
    genero: "unisex",
    tecnologia_clave: ["ZoomX foam", "Phylon carrier", "Translucent rubber"],
    peso_real_g: 335,
    altura: "low",
    horma: "normal",
    drop_mm: 6,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 9, amortiguacion: 9, respuesta: 9,
      soporte_lateral: 8, estabilidad: 8, peso_score: 8,
      durabilidad_outdoor: 5, ventilacion: 8,
    },
    categoria_principal: "balanced",
    tags: ["tope-de-gama", "low-top", "ligera", "moderna"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [65, 95],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
      lesiones: ["tobillos"],
    },
    resumen: "Primera basket con ZoomX. Una de las shoes más completas del mercado: ligera, bouncy, tracción elite. Su único talón de Aquiles es la durabilidad outdoor.",
    pros: [
      "ZoomX bouncy y squishy",
      "Solo 335 g, súper ligera",
      "Tracción herringbone agresiva indoor",
      "Court feel y respuesta excelentes",
    ],
    contras: [
      "Rubber blando que se desgasta en outdoor",
      "No apta para outdoor intensivo",
      "Disponibilidad limitada en Europa",
    ],
    veredicto: "La mejor opción indoor para guards rápidos. No la compres si juegas mayoritariamente en cemento.",
    imagen_principal: "/shoes/nike-gt-cut-3.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/nike-gt-cut-3-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/nike-air-zoom-gt-cut-3/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 190,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=gt+cut+3&vst=gt+cut+3", precio_actual: 189.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=gt+cut+3", precio_actual: 195, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "basket_world", url: "https://basketworld.com/buscar?q=gt+cut+3", precio_actual: 189.95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 10. JORDAN TATUM 3 â€” Tope gama, versátil
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "jordan-tatum-3",
    slug: "jordan-tatum-3",
    marca: "Jordan",
    modelo: "Tatum 3",
    generacion: 3,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Jayson Tatum",
    tecnologia_clave: ["Cushlon 3.0", "Forefoot Zoom Air", "TPU foot frame"],
    peso_real_g: 340,
    altura: "mid",
    horma: "estrecha",
    drop_mm: 7,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8, amortiguacion: 8, respuesta: 8,
      soporte_lateral: 8, estabilidad: 8, peso_score: 8,
      durabilidad_outdoor: 6, ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["signature", "tope-de-gama", "moderna", "ligera"],
    ideal_para: {
      posiciones: ["escolta", "alero", "base"],
      peso_jugador_kg: [70, 95],
      estilos: ["equilibrado", "explosivo", "tirador"],
    },
    no_recomendada_para: { posiciones: ["pivot"] },
    resumen: "El mejor Tatum hasta la fecha. Cushlon 3.0 con Zoom Air en el antepié da un equilibrio excelente. Versátil para muchas posiciones y estilos.",
    pros: [
      "Cushion bien balanceado",
      "Tracción confiable incluso en pista polvorienta",
      "Buen soporte torsional",
      "Ligera (340 g)",
    ],
    contras: [
      "Tracción thin/shallow, durabilidad outdoor cuestionable",
      "Forefoot estrecho",
      "Foam expuesto puede sufrir",
    ],
    veredicto: "Para wings versátiles y guards que tiran mucho. La opción Jordan más completa para uso indoor regular.",
    imagen_principal: "/shoes/jordan-tatum-3.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/jordan-tatum-3-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/jordan-tatum-3/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 145,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=jordan+tatum+3&vst=jordan+tatum+3", precio_actual: 144.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=tatum+3", precio_actual: 150, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "basket_world", url: "https://basketworld.com/buscar?q=tatum+3", precio_actual: 144.95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 11. NIKE JA 2 â€” Tope gama, base rápido low-top
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-ja-2",
    slug: "nike-ja-2",
    marca: "Nike",
    modelo: "Ja 2",
    generacion: 2,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Ja Morant",
    tecnologia_clave: ["Phylon midsole", "Forefoot Zoom Air"],
    peso_real_g: 355,
    altura: "low",
    horma: "normal",
    drop_mm: 4,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 9, amortiguacion: 6, respuesta: 8,
      soporte_lateral: 7, estabilidad: 7, peso_score: 7,
      durabilidad_outdoor: 7, ventilacion: 8,
    },
    categoria_principal: "responsive",
    tags: ["signature", "tope-de-gama", "low-top", "ligera"],
    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [60, 85],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: {
      posiciones: ["pivot", "ala-pivot"],
      estilos: ["potente"],
      lesiones: ["tobillos"],
    },
    resumen: "Continuista respecto al Ja 1 pero con materiales más baratos. Buen performer pero sin alma. Tracción top, cushion firme y rápida.",
    pros: [
      "Tracción grippy y consistente",
      "Drop bajo (~4 mm) para court feel máximo",
      "Ligera y rápida",
      "Buen precio",
    ],
    contras: [
      "Materiales muy baratos, look poco premium",
      "Cushion firme, poca protección para pesados",
      "Diseño genérico sin identidad",
    ],
    veredicto: "Para guards rápidos con presupuesto medio que quieren un performer eficiente. Si valoras estética o cushion, mira el Dame 9.",
    imagen_principal: "/shoes/nike-ja-2.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/nike-ja-2-good-but-boring/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/nike-ja-2/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=ja+2&vst=ja+2", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=ja+2", precio_actual: 124.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "basket_world", url: "https://basketworld.com/buscar?q=nike+ja+2", precio_actual: 119.95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 12. LI-NING WAY OF WADE ALL CITY 13 â€” Value premium
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "lining-wow-allcity-13",
    slug: "lining-wow-allcity-13",
    marca: "Li-Ning",
    modelo: "Way of Wade All City 13",
    generacion: 13,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Dwyane Wade",
    tecnologia_clave: ["Boom foam full-length", "GCU Rubber", "VAJRA SKIN upper", "TPU Euro Plate"],
    peso_real_g: 380,
    altura: "mid",
    horma: "estrecha",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "synthetic",
    puntuaciones: {
      traccion: 9, amortiguacion: 9, respuesta: 8,
      soporte_lateral: 9, estabilidad: 9, peso_score: 7,
      durabilidad_outdoor: 8, ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["signature", "value-premium", "china-brand", "moderna"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [65, 100],
      estilos: ["explosivo", "equilibrado", "tirador"],
    },
    no_recomendada_para: { posiciones: ["pivot"] },
    resumen: "Top tier performance a precio mid-tier. Cushion Boom de los mejores del mercado, tracción y soporte impecables. Una de las mejores compras del año.",
    pros: [
      "Cushion Boom elite full-length",
      "Tracción durable y agresiva",
      "Soporte excelente sin perder agilidad",
      "Relación calidad/precio insuperable",
    ],
    contras: [
      "Horma estrecha, los pies anchos sufren",
      "Disponibilidad limitada en España",
      "Estética polarizante",
    ],
    veredicto: "El mejor performance por debajo de 180 â‚¬ si lo encuentras. No es para pies anchos ni para pívots pesados.",
    imagen_principal: "/shoes/lining-wow-allcity-13.png",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/way-of-wade-all-city-13-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/li-ning-way-of-wade-all-city-13/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 150,
    links_compra: [
      { tienda: "aliexpress", url: "https://s.click.aliexpress.com/e/_c3UwfTVr", precio_actual: 145, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=way+of+wade+all+city+13&tag=canchazapa-21", precio_actual: 159, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 13. NIKE KYRIE LOW 5 â€” Gama media, court feel
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-kyrie-low-5",
    slug: "nike-kyrie-low-5",
    marca: "Nike",
    modelo: "Kyrie Low 5",
    generacion: 5,
    año_lanzamiento: 2024,
    genero: "unisex",
    tecnologia_clave: ["Forefoot Zoom Air", "Phylon midsole"],
    peso_real_g: 350,
    altura: "low",
    horma: "normal",
    drop_mm: 6,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 9, amortiguacion: 6, respuesta: 9,
      soporte_lateral: 7, estabilidad: 7, peso_score: 7,
      durabilidad_outdoor: 6, ventilacion: 8,
    },
    categoria_principal: "responsive",
    tags: ["low-top", "ligera", "moderna"],
    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [60, 85],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: {
      posiciones: ["pivot", "ala-pivot"],
      estilos: ["potente"],
      lesiones: ["tobillos"],
    },
    resumen: "Continuación de la fórmula Kyrie con menos drama: low-top reactivo y rápido. Cushion firme pensado para court feel máximo y aceleraciones.",
    pros: [
      "Tracción grippy multidireccional",
      "Court feel y respuesta top",
      "Ideal para crossovers y sprints",
      "Ligero y ágil",
    ],
    contras: [
      "Cushion firme y bajo, sin protección para pesados",
      "Outdoor limitado",
      "Ya no es Kyrie signature (Anta tiene su línea)",
    ],
    veredicto: "Para guards rápidos que priorizan court feel. Si pesas más de 90 kg o saltas mucho, busca cushion más generoso.",
    imagen_principal: "/shoes/nike-kyrie-low-5.png",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/nike-kyrie-low-5-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/nike-kyrie-low-5/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=kyrie+low+5&vst=kyrie+low+5", precio_actual: 119.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=kyrie+low+5", precio_actual: 124.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "basket_world", url: "https://basketworld.com/buscar?q=kyrie+low+5", precio_actual: 119.95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 14. ANTA KAI 2 â€” Gama media, signature Kyrie
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "anta-kai-2",
    slug: "anta-kai-2",
    marca: "Anta",
    modelo: "KAI 2",
    generacion: 2,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Kyrie Irving",
    tecnologia_clave: ["Nitro Edge foam", "Caged midsole", "Full-length rubber outsole"],
    predecesor_id: "anta-kai-1-speed",
    peso_real_g: 400,
    altura: "mid",
    horma: "normal",
    drop_mm: 7,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 9, amortiguacion: 8, respuesta: 8,
      soporte_lateral: 8, estabilidad: 8, peso_score: 6,
      durabilidad_outdoor: 8, ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["signature", "value-premium", "china-brand", "moderna"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [65, 95],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["pivot"] },
    resumen: "Segunda signature de Kyrie con Anta. Salto importante desde la KAI 1: cushion mejor, materiales premium y tracción agresiva por menos de 150 â‚¬.",
    pros: [
      "Tracción full-length de las mejores del año",
      "Nitro Edge bouncy y reactivo",
      "Materiales premium para su precio",
      "Soporte excelente con caged midsole",
    ],
    contras: [
      "Algo pesada para guards",
      "Disponibilidad limitada fuera de Asia",
      "Forefoot padding modesto",
    ],
    veredicto: "Si te gustan los Kyrie y quieres pagar la mitad, esta es tu zapa. Para guards y wings que necesitan agarre extremo.",
    imagen_principal: "/shoes/anta-kai-2.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/anta-kai-2-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/anta-kai-2/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 140,
    links_compra: [
      { tienda: "aliexpress", url: "https://s.click.aliexpress.com/e/_c4kdfzDB", precio_actual: 135, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=anta+kai+2&tag=canchazapa-21", precio_actual: 149, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 15. ANTA KT 10 â€” Gama media, tirador estable
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "anta-kt-10",
    slug: "anta-kt-10",
    marca: "Anta",
    modelo: "KT 10",
    generacion: 10,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Klay Thompson",
    tecnologia_clave: ["NitroEdge foam", "Carbon fiber plate", "TPU sidewall plates"],
    peso_real_g: 405,
    altura: "mid",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8, amortiguacion: 9, respuesta: 8,
      soporte_lateral: 9, estabilidad: 9, peso_score: 5,
      durabilidad_outdoor: 7, ventilacion: 6,
    },
    categoria_principal: "balanced",
    tags: ["signature", "value-premium", "china-brand"],
    ideal_para: {
      posiciones: ["escolta", "alero", "ala-pivot"],
      peso_jugador_kg: [75, 105],
      estilos: ["tirador", "equilibrado", "potente"],
      lesiones_compatibles: ["tobillos"],
    },
    no_recomendada_para: { posiciones: ["base"], estilos: ["explosivo"] },
    resumen: "Una de las shoes más completas de 2024-25. Cushion estable, soporte top y carbon plate. Necesita break-in pero luego es una bestia versátil.",
    pros: [
      "NitroEdge bouncy con carbon plate",
      "Soporte y containment elite",
      "Versátil para todas las posiciones",
      "Materiales premium",
    ],
    contras: [
      "Pesada y rígida los primeros usos",
      "Forefoot stiff, sacrifica agilidad",
      "Tracción sufre en pista polvorienta",
    ],
    veredicto: "Para tiradores y wings que valoran estabilidad sobre velocidad. Klay-style: tirar con plataforma sólida.",
    imagen_principal: "/shoes/anta-kt-10.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/anta-kt-10-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/anta-kt-10/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 160,
    links_compra: [
      { tienda: "aliexpress", url: "https://s.click.aliexpress.com/e/_c3S006Ff", precio_actual: 155, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=anta+kt+10&tag=canchazapa-21", precio_actual: 169, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 16. JORDAN LUKA 3 â€” Gama media, outdoor balanced
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "jordan-luka-3",
    slug: "jordan-luka-3",
    marca: "Jordan",
    modelo: "Luka 3",
    generacion: 3,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Luka DonÄiÄ‡",
    tecnologia_clave: ["Formula 23 foam", "IsoPlate", "Multidirectional traction"],
    sucesor_id: "jordan-luka-5",
    peso_real_g: 384,
    altura: "mid",
    horma: "normal",
    drop_mm: 6,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 8, amortiguacion: 6, respuesta: 6,
      soporte_lateral: 8, estabilidad: 8, peso_score: 7,
      durabilidad_outdoor: 7, ventilacion: 6,
    },
    categoria_principal: "balanced",
    tags: ["signature", "moderna"],
    ideal_para: {
      posiciones: ["escolta", "alero", "base"],
      peso_jugador_kg: [70, 100],
      estilos: ["equilibrado", "potente"],
    },
    no_recomendada_para: { estilos: ["explosivo"] },
    resumen: "Decente pero sin innovación para un signature de 130 â‚¬. Lo mejor es la tracción y el IsoPlate. Materiales pobres para el precio.",
    pros: [
      "Tracción multidireccional fantástica",
      "IsoPlate da estabilidad lateral",
      "Buena para outdoor casual",
      "Mejor cushion que Luka 1/2",
    ],
    contras: [
      "Materiales baratos para el precio",
      "Sin innovación tecnológica",
      "Cushion no destaca en nada",
    ],
    veredicto: "Solo si encuentras buena oferta. A precio completo hay mejores. Para jugadores ground-based equilibrados.",
    imagen_principal: "/shoes/jordan-luka-3.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/jordan-luka-3-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/jordan-luka-3/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 130,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=jordan+luka+3&vst=jordan+luka+3", precio_actual: 129.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=jordan+luka+3", precio_actual: 119.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "basket_world", url: "https://basketworld.com/buscar?q=jordan+luka+3", precio_actual: 124.95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 17. LI-NING WAY OF WADE 12 â€” Tope gama, ligera reactiva
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "lining-wow-12",
    slug: "lining-wow-12",
    marca: "Li-Ning",
    modelo: "Way of Wade 12",
    generacion: 12,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Dwyane Wade",
    tecnologia_clave: ["Super Boom foam", "Carbon fiber plate", "GCU outsole", "TPEE toebox"],
    peso_real_g: 330,
    altura: "mid",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 9, amortiguacion: 9, respuesta: 9,
      soporte_lateral: 8, estabilidad: 8, peso_score: 9,
      durabilidad_outdoor: 7, ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["signature", "value-premium", "china-brand", "ligera", "tope-de-gama"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [60, 95],
      estilos: ["explosivo", "equilibrado", "tirador"],
    },
    no_recomendada_para: { posiciones: ["pivot"] },
    resumen: "Lo mejor de las WoW 10 y 11 combinado: ligera (330 g), bouncy y con carbon plate. Una de las mejores basket de 2024 a cualquier precio.",
    pros: [
      "Solo 330 g, ultra ligera",
      "Super Boom bouncy y rápida",
      "Carbon plate aporta propulsión",
      "Glove-like fit excelente",
    ],
    contras: [
      "Tracción ocasional necesita wiping",
      "Disponibilidad limitada en Europa",
      "Estética polariza",
    ],
    veredicto: "Para guards explosivos que quieren todo: ligereza, cushion y respuesta. El secreto mejor guardado del mercado.",
    imagen_principal: "/shoes/lining-wow-12.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/way-of-wade-12-performance-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/li-ning-way-of-wade-12/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 200,
    links_compra: [
      { tienda: "aliexpress", url: "https://s.click.aliexpress.com/e/_c4qQ0xx7", precio_actual: 190, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=way+of+wade+12&tag=canchazapa-21", precio_actual: 215, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 18. NEW BALANCE FRESH FOAM BB v3 â€” Cushion king for big players
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nb-fresh-foam-bb-v3",
    slug: "nb-fresh-foam-bb-v3",
    marca: "New Balance",
    modelo: "Fresh Foam BB v3",
    generacion: 3,
    año_lanzamiento: 2024,
    genero: "unisex",
    tecnologia_clave: ["Fresh Foam X midsole", "Wave-bone traction"],
    peso_real_g: 410,
    altura: "mid",
    horma: "ancha",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8, amortiguacion: 9, respuesta: 6,
      soporte_lateral: 7, estabilidad: 7, peso_score: 5,
      durabilidad_outdoor: 7, ventilacion: 7,
    },
    categoria_principal: "cushion-focused",
    tags: ["tope-de-gama", "moderna"],
    ideal_para: {
      posiciones: ["alero", "ala-pivot", "pivot"],
      peso_jugador_kg: [80, 110],
      estilos: ["potente", "equilibrado"],
      lesiones_compatibles: ["rodillas", "fascia"],
    },
    no_recomendada_para: { posiciones: ["base"], estilos: ["explosivo"] },
    resumen: "El mejor Fresh Foam BB hasta la fecha: cushion enorme sin perder court feel del todo. Tracción sólida con patrón tipo Superstar. Penaliza altura y peso.",
    pros: [
      "Cushion plush sin precedentes para NB basket",
      "Tracción wave-bone fiable",
      "Cómodo desde el primer día",
      "Buena para pies anchos",
    ],
    contras: [
      "Sit-high, te separa del suelo",
      "Pesada (410 g)",
      "Respuesta limitada por la cantidad de foam",
    ],
    veredicto: "Para jugadores pesados que priorizan absorción sobre velocidad. Pívots y forwards la amarán; bases la odiarán.",
    imagen_principal: "/shoes/nb-fresh-foam-bb-v3.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/new-balance-fresh-foam-bb-v3-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/new-balance-fresh-foam-bb-v3/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 140,
    links_compra: [
      { tienda: "nb_es", url: "https://www.newbalance.es/search?q=fresh+foam+bb+v3", precio_actual: 140, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=new+balance+fresh+foam+bb+v3+baloncesto&tag=canchazapa-21", precio_actual: 139, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
      { tienda: "jd_sports_es", url: "https://www.jdsports.es/search/new+balance+bb+v3", precio_actual: 144.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 19. ADIDAS HARDEN VOL 9 â€” Gama media, tirador potente
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "adidas-harden-vol-9",
    slug: "adidas-harden-vol-9",
    marca: "Adidas",
    modelo: "Harden Vol 9",
    generacion: 9,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "James Harden",
    tecnologia_clave: ["Boost + Lightstrike combo", "Containment cage upper"],
    peso_real_g: 395,
    altura: "mid",
    horma: "normal",
    drop_mm: 7,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8, amortiguacion: 8, respuesta: 7,
      soporte_lateral: 8, estabilidad: 8, peso_score: 6,
      durabilidad_outdoor: 6, ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["signature", "moderna"],
    ideal_para: {
      posiciones: ["escolta", "alero", "base"],
      peso_jugador_kg: [70, 100],
      estilos: ["equilibrado", "potente", "tirador"],
    },
    no_recomendada_para: { estilos: ["explosivo"] },
    resumen: "Evolución refinada de la línea Harden. Más ligera que la 8, con cushion balanceado y tracción fiable indoor. No es revolucionaria pero es sólida.",
    pros: [
      "Boost + Lightstrike cómodo y reactivo",
      "Soporte lateral excelente",
      "Más ligera que la Vol 8",
      "Buena para tiradores potentes",
    ],
    contras: [
      "Tracción thin, dura poco outdoor",
      "Sin innovación fuerte",
      "Estética polariza",
    ],
    veredicto: "Para guards y wings que valoran cushion y soporte sobre velocidad. Mejor opción Harden en años.",
    imagen_principal: "/shoes/adidas-harden-vol-9.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/adidas-harden-vol-9-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/adidas-harden-volume-9/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 160,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=harden+vol+9", precio_actual: 160, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "jd_sports_es", url: "https://www.jdsports.es/search/harden+vol+9", precio_actual: 159.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+harden+vol+9+baloncesto&tag=canchazapa-21", precio_actual: 169, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
      { tienda: "basket_world", url: "https://basketworld.com/buscar?q=harden+vol+9", precio_actual: 159.95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 20. ADIDAS DAME CERTIFIED â€” Value premium budget
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "adidas-dame-certified",
    slug: "adidas-dame-certified",
    marca: "Adidas",
    modelo: "Dame Certified",
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Damian Lillard",
    tecnologia_clave: ["Bounce foam", "Wavebone outsole", "Wide base"],
    peso_real_g: 404,
    altura: "mid",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 9, amortiguacion: 6, respuesta: 8,
      soporte_lateral: 8, estabilidad: 9, peso_score: 5,
      durabilidad_outdoor: 8, ventilacion: 6,
    },
    categoria_principal: "traction-king",
    tags: ["signature", "presupuesto", "value-premium"],
    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [60, 90],
      estilos: ["explosivo", "equilibrado", "tirador"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "Modelo budget de Lillard que sorprende: tracción top, base ancha súper estable y materiales que se sienten premium. El cushion firme es su único pero.",
    pros: [
      "Tracción wavebone agresiva y durable",
      "Base muy ancha y estable",
      "Materiales premium para 95 â‚¬",
      "Excelente para outdoor",
    ],
    contras: [
      "Cushion firme con poca protección para pesados",
      "Pesada (404 g)",
      "Diseño minimalista que no enamora",
    ],
    veredicto: "La mejor opción budget para guards que necesitan tracción y soporte. Si pesas más de 90 kg, busca cushion más generoso.",
    imagen_principal: "/shoes/adidas-dame-certified.png",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/adidas-dame-certified/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/adidas-dame-certified/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 95,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=dame+certified", precio_actual: 95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "jd_sports_es", url: "https://www.jdsports.es/search/dame+certified", precio_actual: 94.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+dame+certified+baloncesto&tag=canchazapa-21", precio_actual: 92, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 21. PUMA MB.04 â€” Gama media, signature LaMelo
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "puma-mb-04",
    slug: "puma-mb-04",
    marca: "Puma",
    modelo: "MB.04",
    generacion: 4,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "LaMelo Ball",
    tecnologia_clave: ["Nitro foam pucks", "EVA carrier", "Mesh upper"],
    peso_real_g: 410,
    altura: "mid",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 6, amortiguacion: 8, respuesta: 7,
      soporte_lateral: 8, estabilidad: 7, peso_score: 5,
      durabilidad_outdoor: 6, ventilacion: 7,
    },
    categoria_principal: "cushion-focused",
    tags: ["signature", "moderna"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [70, 95],
      estilos: ["equilibrado", "tirador"],
    },
    no_recomendada_para: { estilos: ["explosivo"] },
    resumen: "Cuarta signature de LaMelo. Nitro foam cómodo y bouncy, lockdown excelente. Penaliza en tracción sobre pista sucia y en outdoor.",
    pros: [
      "Nitro foam reactivo y protector",
      "Lockdown y fit excelentes",
      "Mejor estética de la línea MB",
      "Cómoda como lifestyle también",
    ],
    contras: [
      "Tracción inconsistente en pista sucia",
      "No apta para outdoor",
      "Pesada y bulky",
    ],
    veredicto: "Para guards y wings que aman la línea MB y juegan indoor en pista limpia. Outdoor: olvídalo.",
    imagen_principal: "/shoes/puma-mb-04.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/puma-mb-04-low-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/puma-mb04/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 130,
    links_compra: [
      { tienda: "puma_es", url: "https://eu.puma.com/es/es/pd/zapatillas-de-baloncesto-mb-04-lo-team-unisex/312174?swatch=02", precio_actual: 70, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "jd_sports_es", url: "https://www.jdsports.es/search/puma+mb+04", precio_actual: 129.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=puma+mb.04+baloncesto&tag=canchazapa-21", precio_actual: 125, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 22. NIKE PRECISION 8 â€” Presupuesto iniciación
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-precision-8",
    slug: "nike-precision-8",
    marca: "Nike",
    modelo: "Precision 8",
    generacion: 8,
    año_lanzamiento: 2025,
    genero: "unisex",
    tecnologia_clave: ["Phylon midsole", "Herringbone outsole"],
    peso_real_g: 360,
    altura: "mid",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 8, amortiguacion: 5, respuesta: 7,
      soporte_lateral: 7, estabilidad: 7, peso_score: 7,
      durabilidad_outdoor: 8, ventilacion: 7,
    },
    categoria_principal: "traction-king",
    tags: ["presupuesto", "iniciacion"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [60, 85],
      estilos: ["equilibrado", "explosivo"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "La basket más barata de Nike y sorprende. Tracción fiable, soporte decente, cushion básico pero funcional. Mejor opción sub-80 â‚¬ con tick.",
    pros: [
      "Tracción herringbone multidireccional",
      "Soporte sólido para el precio",
      "Rubber duradero para outdoor",
      "Solo 80 â‚¬",
    ],
    contras: [
      "Cushion Phylon básico, sin Zoom",
      "Materiales modestos",
      "No para impactos grandes",
    ],
    veredicto: "Ideal para inicio o jugador casual con presupuesto bajo. Si compites en serio, sube de gama.",
    imagen_principal: "/shoes/nike-precision-8.png",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/nike-precision-8-performance-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/nike-precision-8/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 80,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=nike+precision+8&vst=precision+8", precio_actual: 79.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=precision+8", precio_actual: 84.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "basket_world", url: "https://basketworld.com/buscar?q=precision+8", precio_actual: 79.95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 23. NIKE LEBRON WITNESS 9 â€” Presupuesto cushion para pesados
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-lebron-witness-9",
    slug: "nike-lebron-witness-9",
    marca: "Nike",
    modelo: "LeBron Witness 9",
    generacion: 9,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "LeBron James",
    tecnologia_clave: ["Full-length ReactX foam"],
    peso_real_g: 428,
    altura: "mid",
    horma: "ancha",
    drop_mm: 6,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 7, amortiguacion: 9, respuesta: 6,
      soporte_lateral: 7, estabilidad: 8, peso_score: 5,
      durabilidad_outdoor: 7, ventilacion: 6,
    },
    categoria_principal: "cushion-focused",
    tags: ["signature", "presupuesto", "value-premium"],
    ideal_para: {
      posiciones: ["alero", "ala-pivot", "pivot"],
      peso_jugador_kg: [80, 115],
      estilos: ["potente", "equilibrado"],
      lesiones_compatibles: ["rodillas", "fascia"],
    },
    no_recomendada_para: { posiciones: ["base"], estilos: ["explosivo"] },
    resumen: "La Witness más cushioned de la historia gracias a ReactX. Excelente para jugadores pesados con presupuesto medio. Penaliza peso (428 g) y tracción en suciedad.",
    pros: [
      "ReactX foam con 61-64% energy return",
      "Cushion plush y protector",
      "Roomy fit, ideal pies anchos",
      "100 â‚¬ para signature LeBron",
    ],
    contras: [
      "Pesada (428 g)",
      "Tracción sensible al polvo",
      "Respuesta limitada por foam soft",
    ],
    veredicto: "Para forwards y pívots medianos/pesados con presupuesto. Si eres guard rápido, esta no es.",
    imagen_principal: "/shoes/nike-lebron-witness-9.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/nike-lebron-9-performance-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/nike-lebron-witness-9/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 100,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=lebron+witness+9&vst=lebron+witness+9", precio_actual: 99.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=witness+9", precio_actual: 104.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "basket_world", url: "https://basketworld.com/buscar?q=witness+9", precio_actual: 99.95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 24. ADIDAS DAME 9 â€” Value premium gama media
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "adidas-dame-9",
    slug: "adidas-dame-9",
    marca: "Adidas",
    modelo: "Dame 9",
    generacion: 9,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Damian Lillard",
    tecnologia_clave: ["Full-length Lightstrike", "Integrated torsion system", "Thunderbolt traction"],
    predecesor_id: "adidas-dame-8",
    sucesor_id: "adidas-dame-x",
    peso_real_g: 395,
    altura: "mid",
    horma: "ancha",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8, amortiguacion: 9, respuesta: 7,
      soporte_lateral: 8, estabilidad: 8, peso_score: 6,
      durabilidad_outdoor: 6, ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["signature", "value-premium", "moderna"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero", "ala-pivot"],
      peso_jugador_kg: [70, 105],
      estilos: ["equilibrado", "potente", "tirador"],
    },
    no_recomendada_para: { estilos: ["explosivo"] },
    resumen: "Una de las mejores zapas de 2024. Lightstrike plush y reactivo, tracción intrincada y soporte top. 120 â‚¬ por todo este performance es un robo.",
    pros: [
      "Lightstrike full-length, súper cómodo",
      "Tracción thunderbolt grippy",
      "Roomy fit para pies anchos",
      "Precio excelente para tope tier",
    ],
    contras: [
      "Rubber se desgasta rápido",
      "Break-in largo, dura los primeros usos",
      "Algo pesada",
    ],
    veredicto: "Top pick value: para todas las posiciones excepto pívots. Mejor opción budget-premium del año.",
    imagen_principal: "/shoes/adidas-dame-9.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/adidas-dame-9-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/adidas-dame-9/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=dame+9", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "jd_sports_es", url: "https://www.jdsports.es/search/dame+9", precio_actual: 119.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+dame+9+baloncesto&tag=canchazapa-21", precio_actual: 124, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
      { tienda: "basket_world", url: "https://basketworld.com/buscar?q=dame+9", precio_actual: 119.95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 25. ADIDAS CROSS 'EM UP SPEED â€” Presupuesto velocidad iniciación
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "adidas-cross-em-up-speed",
    slug: "adidas-cross-em-up-speed",
    marca: "Adidas",
    modelo: "Cross 'Em Up Speed",
    año_lanzamiento: 2024,
    genero: "unisex",
    tecnologia_clave: ["Cloudfoam midsole", "Synthetic upper", "Herringbone outsole"],
    peso_real_g: 380,
    altura: "mid",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "synthetic",
    puntuaciones: {
      traccion: 7, amortiguacion: 6, respuesta: 6,
      soporte_lateral: 7, estabilidad: 7, peso_score: 6,
      durabilidad_outdoor: 7, ventilacion: 6,
    },
    categoria_principal: "balanced",
    tags: ["presupuesto", "iniciacion"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [55, 80],
      estilos: ["equilibrado", "explosivo"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "Variante Speed del Cross 'Em Up orientada a juventud y jugadores casuales. Cloudfoam cómodo, tracción decente y precio bajísimo.",
    pros: [
      "Precio muy accesible",
      "Cloudfoam cómodo desde el primer día",
      "Diseño limpio y juvenil",
      "Buena durabilidad de upper",
    ],
    contras: [
      "Cushion básico, sin tecnología destacable",
      "Sin reviews profesionales detalladas",
      "Performance genérico",
    ],
    veredicto: "Para iniciación o uso casual. No es para competición seria. Si presupuesto sube de 70 â‚¬, mira el Dame Certified.",
    imagen_principal: "/shoes/adidas-cross-em-up-speed.jpg",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 65,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=cross+em+up+speed", precio_actual: 60, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+cross+em+up+speed+baloncesto&tag=canchazapa-21", precio_actual: 60, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
      { tienda: "jd_sports_es", url: "https://www.jdsports.es/search/cross+em+up+speed", precio_actual: 69.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 26. JORDAN ONE TAKE 6 â€” Presupuesto outdoor potente
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "jordan-one-take-5",
    slug: "jordan-one-take-5",
    marca: "Jordan",
    modelo: "One Take 5",
    generacion: 5,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Russell Westbrook",
    tecnologia_clave: ["Forefoot Zoom Air", "Phylon midsole", "Cup sole"],
    peso_real_g: 410,
    altura: "mid",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "synthetic",
    puntuaciones: {
      traccion: 8, amortiguacion: 6, respuesta: 7,
      soporte_lateral: 8, estabilidad: 8, peso_score: 5,
      durabilidad_outdoor: 8, ventilacion: 6,
    },
    categoria_principal: "balanced",
    tags: ["signature", "presupuesto", "outdoor"],
    ideal_para: {
      posiciones: ["escolta", "alero", "ala-pivot"],
      peso_jugador_kg: [70, 100],
      estilos: ["potente", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["base"], estilos: ["explosivo"] },
    resumen: "Línea de Russell Westbrook con vibe skate-shoe. Rubber gordo lateral, sole resistente y tracción en todas direcciones. Pensada para outdoor y juego potente.",
    pros: [
      "Rubber durable, ideal outdoor",
      "Lockdown excelente",
      "Tracción multidireccional",
      "Precio razonable",
    ],
    contras: [
      "Pesada y bulky",
      "Phylon básico sin gran protección",
      "Estética polariza",
    ],
    veredicto: "Para jugadores potentes que juegan principalmente outdoor o necesitan durabilidad sobre lujo. No es para guards rápidos.",
    imagen_principal: "/shoes/jordan-one-take-5.png",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/jordan-one-take-5-review/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=jordan+one+take+6&vst=jordan+one+take+6", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=one+take+6", precio_actual: 114.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "basket_world", url: "https://basketworld.com/buscar?q=one+take+6", precio_actual: 109.95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 27. DECATHLON TARMAK FAST 900 â€” Presupuesto Decathlon low-top
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "decathlon-tarmak-fast-900",
    slug: "decathlon-tarmak-fast-900",
    marca: "Decathlon Tarmak",
    modelo: "Fast 900 Low-1",
    generacion: 1,
    año_lanzamiento: 2024,
    genero: "unisex",
    tecnologia_clave: ["TMK-GUARD", "Full foam interior", "NBA licensed"],
    peso_real_g: 375,
    altura: "low",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 7, amortiguacion: 7, respuesta: 8,
      soporte_lateral: 7, estabilidad: 7, peso_score: 7,
      durabilidad_outdoor: 7, ventilacion: 7,
    },
    categoria_principal: "responsive",
    tags: ["presupuesto", "low-top", "ligera"],
    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [60, 85],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: {
      posiciones: ["pivot", "ala-pivot"],
      estilos: ["potente"],
      lesiones: ["tobillos"],
    },
    resumen: "Primera low-top performance de Decathlon, diseñada con Isaia Cordinier. Ligera (375 g), responsiva y con TMK-GUARD para cambios de dirección. Precio insuperable.",
    pros: [
      "Ligera y rápida",
      "Buena para cambios de dirección",
      "Probada indoor y outdoor",
      "85 â‚¬ con licencia NBA",
    ],
    contras: [
      "Cushion modesto, no para pesados",
      "Sin reviews internacionales profundas",
      "Solo disponible en Decathlon",
    ],
    veredicto: "Para guards con presupuesto justo que buscan zapa rápida. La mejor relación calidad/precio low-top en tiendas físicas en España.",
    imagen_principal: "/shoes/decathlon-tarmak-fast-900.jpg",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 85,
    links_compra: [
      { tienda: "decathlon", url: "https://www.awin1.com/cread.php?awinmid=105405&awinaffid=2908587&ued=https%3A%2F%2Fwww.decathlon.es%2Fes%2Fsearch%3FNtt%3Dtarmak%2Bfast%2B900", precio_actual: 84.99, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=tarmak+fast+900&tag=canchazapa-21", precio_actual: 89, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 28. DECATHLON TARMAK VOLTZY 500 MID â€” Iniciación ultra-budget
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "decathlon-tarmak-voltzy-500",
    slug: "decathlon-tarmak-voltzy-500",
    marca: "Decathlon Tarmak",
    modelo: "Voltzy 500 mid",
    generacion: 1,
    año_lanzamiento: 2024,
    genero: "unisex",
    tecnologia_clave: ["EVA midsole", "Mid-cut ankle support"],
    peso_real_g: 420,
    altura: "mid",
    horma: "ancha",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "synthetic",
    puntuaciones: {
      traccion: 6, amortiguacion: 6, respuesta: 5,
      soporte_lateral: 7, estabilidad: 7, peso_score: 4,
      durabilidad_outdoor: 7, ventilacion: 6,
    },
    categoria_principal: "balanced",
    tags: ["presupuesto", "iniciacion"],
    ideal_para: {
      posiciones: ["alero", "ala-pivot", "pivot"],
      peso_jugador_kg: [70, 100],
      estilos: ["equilibrado", "potente"],
      lesiones_compatibles: ["tobillos"],
    },
    no_recomendada_para: { estilos: ["explosivo"] },
    resumen: "Modelo básico mid-top de Decathlon para jugadores casuales o iniciación. Estable y robusto pero pesado y con cushion básico. Sub-50 â‚¬.",
    pros: [
      "Precio extremadamente bajo",
      "Estable para iniciación",
      "Mid-top da soporte tobillo",
      "Disponible en tiendas físicas",
    ],
    contras: [
      "Pesada y poco reactiva",
      "Materiales modestos",
      "Sin tecnología destacable",
      "No competitiva",
    ],
    veredicto: "Solo para iniciación o jugador muy casual con presupuesto extremo. Subiendo a 80 â‚¬ ya hay mejores opciones.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 45,
    links_compra: [
      { tienda: "decathlon", url: "https://www.awin1.com/cread.php?awinmid=105405&awinaffid=2908587&ued=https%3A%2F%2Fwww.decathlon.es%2Fes%2Fsearch%3FNtt%3Dtarmak%2Bvoltzy", precio_actual: 44.99, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=tarmak+voltzy+500&tag=canchazapa-21", precio_actual: 49, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 29. PEAK LOU WILLIAMS UNDERGROUND â€” Value premium china
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "peak-lou-williams-underground",
    slug: "peak-lou-williams-underground",
    marca: "Peak",
    modelo: "Lou Williams Underground",
    generacion: 1,
    año_lanzamiento: 2023,
    genero: "unisex",
    signature_player: "Lou Williams",
    tecnologia_clave: ["TaiChi adaptive foam", "P-MOTIVE", "Herringbone-brain coral outsole"],
    peso_real_g: 390,
    altura: "mid",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8, amortiguacion: 8, respuesta: 7,
      soporte_lateral: 7, estabilidad: 7, peso_score: 6,
      durabilidad_outdoor: 7, ventilacion: 7,
    },
    categoria_principal: "cushion-focused",
    tags: ["signature", "value-premium", "china-brand"],
    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [65, 90],
      estilos: ["explosivo", "tirador", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "Signature de Lou Williams con TaiChi adaptive foam. Cómoda y muy buena tracción, con vibe street-friendly. Precio accesible para signature.",
    pros: [
      "TaiChi adaptive foam cómodo",
      "Tracción herringbone-coral original",
      "Lockdown sólido",
      "Diseño street llamativo",
    ],
    contras: [
      "Respuesta menos que otras Peak",
      "Distribución limitada en Europa",
      "Signature de jugador minor",
    ],
    veredicto: "Para guards que buscan algo distinto y cómodo a buen precio. Cult favorite si la encuentras.",
    imagen_principal: "/shoes/peak-lou-williams-underground.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/peak-lou-williams-underground-2/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "aliexpress", url: "https://s.click.aliexpress.com/e/_c32FKd4H", precio_actual: 105, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=peak+lou+williams+underground&tag=canchazapa-21", precio_actual: 115, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 30. ANTA SHOCK THE GAME 5.0 â€” Presupuesto china outdoor
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "anta-shock-the-game-5",
    slug: "anta-shock-the-game-5",
    marca: "Anta",
    modelo: "Shock The Game 5.0",
    generacion: 5,
    año_lanzamiento: 2024,
    genero: "unisex",
    tecnologia_clave: ["A-SHOCK stabilizer", "Nitrogen foam", "Carbon fiber plate"],
    peso_real_g: 400,
    altura: "mid",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 8, amortiguacion: 8, respuesta: 7,
      soporte_lateral: 7, estabilidad: 7, peso_score: 6,
      durabilidad_outdoor: 8, ventilacion: 6,
    },
    categoria_principal: "balanced",
    tags: ["presupuesto", "value-premium", "china-brand", "outdoor"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [65, 95],
      estilos: ["equilibrado", "potente"],
      lesiones_compatibles: ["fascia"],
    },
    no_recomendada_para: { estilos: ["explosivo"] },
    resumen: "Anta budget con A-SHOCK stabilizer y nitrógeno. Sorprende por la calidad: cushion bouncy, soporte estable y rubber durable. Top option para pies planos y outdoor.",
    pros: [
      "Cushion nitrógeno bouncy",
      "Carbon plate aporta lively launch",
      "Rubber high-performance durable",
      "Excelente para outdoor y pies planos",
    ],
    contras: [
      "Forefoot ajustado para pies anchos",
      "Diseño noventero polariza",
      "Disponibilidad limitada en Europa",
    ],
    veredicto: "Para jugadores con presupuesto justo que necesitan estabilidad y soporte outdoor. Una sorpresa por 100 â‚¬.",
    imagen_principal: "/shoes/anta-shock-the-game-5.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/anta-shock-the-game-5-0-review/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 100,
    links_compra: [
      { tienda: "aliexpress", url: "https://s.click.aliexpress.com/e/_c3G68WNT", precio_actual: 95, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=anta+shock+the+game+5&tag=canchazapa-21", precio_actual: 109, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-13" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 31. JORDAN XXXVII â€” Retro-performance equilibrado
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "jordan-xxxvii",
    slug: "jordan-xxxvii",
    marca: "Jordan",
    modelo: "Air Jordan 37",
    generacion: 37,
    año_lanzamiento: 2022,
    genero: "unisex",
    tecnologia_clave: ["Flight Plate", "Air Strobel", "Zoom Air"],
    peso_real_g: 355,
    altura: "mid",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 9, amortiguacion: 7, respuesta: 8,
      soporte_lateral: 7, estabilidad: 7, peso_score: 7,
      durabilidad_outdoor: 5, ventilacion: 7,
    },
    categoria_principal: "responsive",
    tags: ["retro-performance", "flight-plate", "all-around", "descuento"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [68, 95],
      estilos: ["explosivo", "equilibrado", "tirador"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "El Jordan más equilibrado de los últimos años. El Flight Plate de fibra de carbono + Air Strobel ofrece una combinación de respuesta y cushion difícil de igualar. Generación 2022 ahora a precios muy atractivos.",
    pros: [
      "Tracción herringbone de primer nivel",
      "Flight Plate da propulsión real",
      "Buen court feel para un Jordan moderno",
      "Precio actual muy competitivo",
    ],
    contras: [
      "Indoor only (outsole fina)",
      "No apto para jugadores muy pesados",
      "Tallas se agotan rápido en colorways populares",
    ],
    veredicto: "Para escoltas y aleros que quieren un Jordan con rendimiento real sin pagar precio de lanzamiento. Un clásico moderno ahora asequible.",
    imagen_principal: "/shoes/jordan-xxxvii.png",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 185,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=air+jordan+37&vst=air+jordan+37", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=air+jordan+37+baloncesto&tag=canchazapa-21", precio_actual: 120, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=air+jordan+37", precio_actual: 115, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=air+jordan+37", precio_actual: 125, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 32. NIKE LEBRON 21 â€” Cushion para jugadores grandes
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-lebron-21",
    slug: "nike-lebron-21",
    marca: "Nike",
    modelo: "LeBron 21",
    generacion: 21,
    año_lanzamiento: 2023,
    genero: "unisex",
    signature_player: "LeBron James",
    tecnologia_clave: ["Cushlon 3.0", "Air Zoom"],
    peso_real_g: 420,
    altura: "high",
    horma: "ancha",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    sucesor_id: "nike-lebron-22",
    puntuaciones: {
      traccion: 8, amortiguacion: 8, respuesta: 5,
      soporte_lateral: 8, estabilidad: 8, peso_score: 5,
      durabilidad_outdoor: 7, ventilacion: 5,
    },
    categoria_principal: "cushion-focused",
    tags: ["signature", "cushion", "big-men", "descuento", "clasico"],
    ideal_para: {
      posiciones: ["pivot", "ala-pivot"],
      peso_jugador_kg: [85, 130],
      estilos: ["potente", "equilibrado"],
      lesiones_compatibles: ["rodillas"],
    },
    no_recomendada_para: { posiciones: ["base", "escolta"], estilos: ["explosivo"] },
    resumen: "Una generación anterior al LeBron 22 pero con el mismo ADN: cushion masivo, soporte para jugadores grandes y protección de rodillas. La opción inteligente si buscas el rendimiento LeBron sin pagar precio de estreno.",
    pros: [
      "Cushion Cushlon+Zoom casi igual al 22",
      "~50â‚¬ más barato que la gen actual",
      "Soporte lateral excepcional en high-top",
      "Durabilidad outdoor sólida",
    ],
    contras: [
      "Muy pesada para juego explosivo",
      "Court feel casi nulo",
      "Ventilación mejorable",
    ],
    veredicto: "Si el LeBron 22 se sale de tu presupuesto, el 21 es prácticamente el mismo zapato con diferente upper. Para pívots y alas pesados, el mejor ratio calidad-precio del mercado ahora mismo.",
    imagen_principal: "/shoes/nike-lebron-21.png",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 190,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=lebron+21&vst=lebron+21", precio_actual: 135, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+lebron+21+baloncesto&tag=canchazapa-21", precio_actual: 135, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=nike+lebron+21", precio_actual: 145, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+lebron+21", precio_actual: 150, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 33. NIKE ZOOM FREAK 4 â€” Cushion para alas/pívots
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-zoom-freak-4",
    slug: "nike-zoom-freak-4",
    marca: "Nike",
    modelo: "Zoom Freak 4",
    generacion: 4,
    año_lanzamiento: 2022,
    genero: "unisex",
    signature_player: "Giannis Antetokounmpo",
    tecnologia_clave: ["React", "Zoom Air forefoot"],
    peso_real_g: 385,
    altura: "mid",
    horma: "ancha",
    drop_mm: 9,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8, amortiguacion: 7, respuesta: 6,
      soporte_lateral: 8, estabilidad: 8, peso_score: 6,
      durabilidad_outdoor: 6, ventilacion: 6,
    },
    categoria_principal: "cushion-focused",
    tags: ["signature", "value", "big-men", "descuento"],
    ideal_para: {
      posiciones: ["ala-pivot", "pivot", "alero"],
      peso_jugador_kg: [80, 115],
      estilos: ["potente", "equilibrado"],
      lesiones_compatibles: ["rodillas", "fascia"],
    },
    no_recomendada_para: { posiciones: ["base"], estilos: ["explosivo"] },
    resumen: "El cuarto zapato de Giannis combina React y Zoom para ofrecer protección a jugadores corpulentos. Horma ancha, soporte lateral contenido y durabilidad para indoor y outdoor suave.",
    pros: [
      "Horma ancha ideal para pies anchos",
      "React + Zoom da cushion balanceado",
      "Buen soporte para alas/pívots",
      "Precio actual muy accesible",
    ],
    contras: [
      "Demasiado pesada para bases",
      "Sin carbon plate, sensación algo plana",
      "No es la Freak más responsive",
    ],
    veredicto: "Para alas-pívot y pívots con presupuesto ajustado que necesitan amortiguación y soporte sin llegar a los â‚¬180 del LeBron.",
    imagen_principal: "/shoes/nike-zoom-freak-4.jpg",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=zoom+freak+4&vst=zoom+freak+4", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+zoom+freak+4+baloncesto&tag=canchazapa-21", precio_actual: 80, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=nike+zoom+freak+4", precio_actual: 85, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+zoom+freak+4", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 34. NIKE GIANNIS IMMORTALITY 3 â€” Budget para jugadores grandes
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-giannis-immortality-3",
    slug: "nike-giannis-immortality-3",
    marca: "Nike",
    modelo: "Giannis Immortality 3",
    generacion: 3,
    año_lanzamiento: 2023,
    genero: "unisex",
    signature_player: "Giannis Antetokounmpo",
    tecnologia_clave: ["React foam"],
    peso_real_g: 375,
    altura: "mid",
    horma: "ancha",
    drop_mm: 9,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 7, amortiguacion: 6, respuesta: 5,
      soporte_lateral: 7, estabilidad: 7, peso_score: 6,
      durabilidad_outdoor: 6, ventilacion: 5,
    },
    categoria_principal: "balanced",
    tags: ["budget", "big-men", "presupuesto"],
    ideal_para: {
      posiciones: ["ala-pivot", "pivot", "alero"],
      peso_jugador_kg: [75, 110],
      estilos: ["equilibrado", "potente"],
    },
    no_recomendada_para: { posiciones: ["base", "escolta"], estilos: ["explosivo"] },
    resumen: "La línea budget de Giannis. React foam básico sin Zoom, talla ancha, tracción adecuada. No pretende ser premium â€” pretende dar una opción Nike para jugadores grandes con presupuesto limitado.",
    pros: [
      "Horma ancha para pies anchos",
      "Precio imbatible para Nike",
      "Talla grande disponible",
      "Suficientemente estable para juego interior",
    ],
    contras: [
      "Cushion básico sin zoom ni placa",
      "Ventilación muy justa",
      "Sin court feel",
      "No apta para corredores rápidos",
    ],
    veredicto: "La opción más económica para un jugador grande que quiere una Nike fiable. No esperes maravillas, pero no te fallará.",
    imagen_principal: "/shoes/nike-giannis-immortality-3.png",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 65,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=giannis+immortality+3&vst=giannis+immortality+3", precio_actual: 50, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+giannis+immortality+3&tag=canchazapa-21", precio_actual: 50, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=nike+giannis+immortality+3", precio_actual: 55, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 35. PUMA ALL-PRO NITRO â€” Sorpresa responsive de Puma
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "puma-all-pro-nitro",
    slug: "puma-all-pro-nitro",
    marca: "Puma",
    modelo: "All-Pro Nitro 2",
    generacion: 2,
    año_lanzamiento: 2024,
    genero: "unisex",
    tecnologia_clave: ["Nitrofoam+", "Pebax plate", "PumaGrip outsole"],
    peso_real_g: 295,
    altura: "mid",
    horma: "normal",
    drop_mm: 7,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 8, amortiguacion: 8, respuesta: 9,
      soporte_lateral: 7, estabilidad: 7, peso_score: 9,
      durabilidad_outdoor: 6, ventilacion: 8,
    },
    categoria_principal: "responsive",
    tags: ["responsive", "nitrofoam", "guards", "pebax"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [60, 90],
      estilos: ["explosivo", "equilibrado", "tirador"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "Segunda generación de la sorpresa de Puma. Nitrofoam mejorado + placa Pebax que devuelve energía de forma explosiva. Tracción PumaGrip revisada, más ligera que la gen anterior. Relación calidad-precio brutal.",
    pros: [
      "Nitrofoam+ más reactivo que la gen 1",
      "Placa Pebax da propulsión elite",
      "Ligera (295g) para su nivel de cushion",
      "Tracción PumaGrip más duradera",
    ],
    contras: [
      "Durabilidad outdoor mejorada pero sigue siendo interior",
      "Soporte lateral podría ser más robusto",
      "Poca presencia en tiendas físicas españolas",
    ],
    veredicto: "Para bases y escoltas explosivos que quieren respuesta elite sin pagar los precios de Nike/Adidas. Segunda iteración que mejora en todo a la gen 1.",
    imagen_principal: "/shoes/puma-all-pro-nitro.jpg",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 130,
    links_compra: [
      { tienda: "puma_es", url: "https://eu.puma.com/es/es/pd/zapatillas-de-baloncesto-all-pro-nitro-2-unisex/312839?swatch=02", precio_actual: 130, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=puma+all+pro+nitro+2+baloncesto&tag=canchazapa-21", precio_actual: 125, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=puma+all+pro+nitro+2", precio_actual: 130, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 36. PUMA MB.03 â€” Signature LaMelo generación anterior
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "puma-mb03",
    slug: "puma-mb03",
    marca: "Puma",
    modelo: "MB.03",
    generacion: 3,
    año_lanzamiento: 2023,
    genero: "unisex",
    signature_player: "LaMelo Ball",
    tecnologia_clave: ["Nitrofoam"],
    peso_real_g: 310,
    altura: "mid",
    horma: "normal",
    drop_mm: 7,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 8, amortiguacion: 6, respuesta: 8,
      soporte_lateral: 7, estabilidad: 6, peso_score: 8,
      durabilidad_outdoor: 5, ventilacion: 7,
    },
    categoria_principal: "responsive",
    tags: ["signature", "guard", "nitrofoam", "descuento"],
    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [60, 85],
      estilos: ["explosivo", "equilibrado", "tirador"],
    },
    no_recomendada_para: { posiciones: ["pivot", "ala-pivot"], estilos: ["potente"] },
    resumen: "La generación anterior del zapato de LaMelo. Nitrofoam sin placa â€” más suave y menos explosivo que el MB.04 pero muy ligero y confortable para bases y escoltas.",
    pros: [
      "Ligero y ágil",
      "Nitrofoam da buen cushion para el peso",
      "Tracción herringbone sólida",
      "Precio actual accesible",
    ],
    contras: [
      "Sin placa, menos propulsión que MB.04",
      "Estabilidad lateral justa para jugadores pesados",
      "Outdoor no recomendado",
    ],
    veredicto: "Si el MB.04 se sale de presupuesto, el MB.03 es una alternativa sólida. Mismo concepto, algo menos de tecnología, 40-50â‚¬ menos.",
    imagen_principal: "/shoes/puma-mb03.png",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "puma_es", url: "https://eu.puma.com/es/es/buscar?q=mb+03+baloncesto", precio_actual: 70, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=puma+mb03+baloncesto&tag=canchazapa-21", precio_actual: 70, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=puma+mb.03", precio_actual: 75, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 37. UA FLOW BREAKTHRU 4 â€” Reina del outdoor
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "ua-flow-breakthru-4",
    slug: "ua-flow-breakthru-4",
    marca: "Under Armour",
    modelo: "Flow Breakthru 4",
    generacion: 4,
    año_lanzamiento: 2022,
    genero: "unisex",
    tecnologia_clave: ["Flow compound sole", "HOVR foam"],
    sucesor_id: "ua-flow-breakthru-5",
    peso_real_g: 315,
    altura: "mid",
    horma: "normal",
    drop_mm: 6,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 9, amortiguacion: 6, respuesta: 8,
      soporte_lateral: 7, estabilidad: 7, peso_score: 8,
      durabilidad_outdoor: 9, ventilacion: 7,
    },
    categoria_principal: "traction-king",
    tags: ["outdoor", "flow", "multi-superficie", "descuento"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [65, 95],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "La única zapatilla del mercado con suela Flow (sin rubber). El compound Flow de UA es increíblemente versátil: agarra como lija en exterior y se comporta perfectamente en pista cubierta. La reina del outdoor.",
    pros: [
      "Tracción Flow imbatible en cualquier superficie",
      "HOVR foam confortable",
      "Muy ligera para ser tan durable",
      "La más versátil del mercado indoor/outdoor",
    ],
    contras: [
      "Court feel diferente (inusual al principio)",
      "Amortiguación básica para jugadores pesados",
      "Soporte tobillo justo",
    ],
    veredicto: "Si juegas en exterior o cambias frecuentemente de pista, esta es tu zapatilla. Nada supera al Flow en tracción multisuperficie. A 70â‚¬ es una ganga.",
    imagen_principal: "/shoes/ua-flow-breakthru-4.jpg",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 100,
    links_compra: [
      { tienda: "ua_es", url: "https://www.underarmour.es/es-es/c/hombre/zapatillas/baloncesto/?q=flow+breakthru+4", precio_actual: 70, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=under+armour+flow+breakthru+4+baloncesto&tag=canchazapa-21", precio_actual: 70, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=under+armour+flow+breakthru+4", precio_actual: 75, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // UA FLOW BREAKTHRU 5 â€” La evolución del outdoor
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "ua-flow-breakthru-5",
    slug: "ua-flow-breakthru-5",
    marca: "Under Armour",
    modelo: "Flow Breakthru 5",
    generacion: 5,
    año_lanzamiento: 2023,
    genero: "unisex",
    signature_player: undefined,
    tecnologia_clave: ["Flow compound sole", "UA HOVR foam", "TPU shank"],
    predecesor_id: "ua-flow-breakthru-4",
    sucesor_id: null,
    peso_real_g: 305,
    altura: "mid",
    horma: "normal",
    drop_mm: 6,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 9, amortiguacion: 7, respuesta: 8,
      soporte_lateral: 8, estabilidad: 8, peso_score: 7,
      durabilidad_outdoor: 9, ventilacion: 7,
    },
    categoria_principal: "traction-king",
    tags: ["outdoor", "flow", "multi-superficie", "mid-cut", "soporte"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [65, 100],
      estilos: ["explosivo", "equilibrado"],
      lesiones_compatibles: ["tobillos"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "La Flow Breakthru 5 mejora sobre la 4 con más soporte lateral y una suela Flow refinada. Sigue siendo la reina del outdoor: agarra en cualquier superficie y se porta bien en pista cubierta. La opción UA para quien juega en cualquier cancha.",
    pros: [
      "Tracción Flow insuperable en exterior",
      "Más soporte lateral que la Breakthru 4",
      "Versátil indoor/outdoor",
      "Buena relación calidad-precio",
    ],
    contras: [
      "Court feel diferente al rubber tradicional",
      "No es la más ligera para un guard",
      "Amortiguación básica para jugadores muy pesados",
    ],
    veredicto: "Si juegas en cemento o cambias de superficie constantemente, la Breakthru 5 es tu mejor opción. La mejora de soporte lateral sobre la 4 la hace más completa para aleros y jugadores activos.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-19",
    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "ua_es", url: "https://www.underarmour.es/es-es/c/hombre/zapatillas/baloncesto/?q=flow+breakthru+5", precio_actual: 95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=under+armour+flow+breakthru+5+baloncesto&tag=canchazapa-21", precio_actual: 90, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-19" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 38. ADIDAS AE 1 â€” Debut de Anthony Edwards
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "adidas-ae-1",
    slug: "adidas-ae-1",
    marca: "Adidas",
    modelo: "AE 1",
    generacion: 1,
    año_lanzamiento: 2023,
    genero: "unisex",
    signature_player: "Anthony Edwards",
    tecnologia_clave: ["Lightstrike Pro", "Continental rubber"],
    peso_real_g: 320,
    altura: "mid",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 9, amortiguacion: 7, respuesta: 8,
      soporte_lateral: 7, estabilidad: 7, peso_score: 8,
      durabilidad_outdoor: 7, ventilacion: 8,
    },
    categoria_principal: "responsive",
    tags: ["signature", "guard", "lightstrike-pro", "descuento"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [65, 90],
      estilos: ["explosivo", "equilibrado", "tirador"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "El debut de Anthony Edwards en Adidas supera todas las expectativas. Lightstrike Pro da una de las mejores sensaciones de cushion responsivo del mercado, y el rubber Continental clava la tracción en cualquier pista. Uno de los mejores zapatos para guards de los últimos años.",
    pros: [
      "Tracción Continental de primer nivel",
      "Lightstrike Pro muy responsivo y ligero",
      "Ventilación excelente",
      "Buen lateral containment para low-mid",
    ],
    contras: [
      "Horma algo estrecha en antepiè â€” probad talla antes",
      "Outdoor uso moderado",
      "Precio original alto aunque ahora baja",
    ],
    veredicto: "Para bases y escoltas que quieren lo mejor de Adidas en guards sin pagar el premium del lanzamiento. Uno de los mejores valores del mercado ahora mismo.",
    imagen_principal: "/shoes/adidas-ae-1.jpg",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 140,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=ae+1+baloncesto", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+ae+1+baloncesto&tag=canchazapa-21", precio_actual: 85, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=adidas+ae+1+baloncesto", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=adidas+ae+1", precio_actual: 95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 39. NEW BALANCE TWO WXY V4 â€” El fiable de NB
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nb-two-wxy-v4",
    slug: "nb-two-wxy-v4",
    marca: "New Balance",
    modelo: "Two WXY v4",
    generacion: 4,
    año_lanzamiento: 2023,
    genero: "unisex",
    tecnologia_clave: ["FuelCell foam", "TPU shank"],
    peso_real_g: 330,
    altura: "mid",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 8, amortiguacion: 7, respuesta: 7,
      soporte_lateral: 7, estabilidad: 7, peso_score: 7,
      durabilidad_outdoor: 6, ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["balanced", "fuelcell", "all-around"],
    ideal_para: {
      posiciones: ["alero", "escolta", "base"],
      peso_jugador_kg: [70, 95],
      estilos: ["equilibrado", "tirador"],
    },
    no_recomendada_para: { posiciones: ["pivot"] },
    resumen: "New Balance consolida su línea de baloncesto con el Two WXY v4. FuelCell foam bien balanceado, tracción sólida y un perfil mid cómodo para partidas largas. La opción NB para quien no quiere firma de un jugador específico.",
    pros: [
      "FuelCell da buena relación cushion/respuesta",
      "Tracción consistente en pista indoor",
      "Cómodo para sesiones largas",
      "Precio accesible",
    ],
    contras: [
      "No destaca en ningún aspecto de forma especial",
      "Cushion algo corto para jugadores >100kg",
      "Outdoor limitado",
    ],
    veredicto: "El Toyota Camry del baloncesto: fiable, consistente, sin sorpresas. Para aleros y escoltas equilibrados que quieren una NB que simplemente funcione.",
    imagen_principal: "/shoes/nb-two-wxy-v4.png",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 95,
    links_compra: [
      { tienda: "nb_es", url: "https://www.newbalance.es/search?q=two+wxy+v4", precio_actual: 75, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=new+balance+two+wxy+v4+baloncesto&tag=canchazapa-21", precio_actual: 72, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=new+balance+two+wxy+v4", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 40. JORDAN LUKA 2 â€” Signature versátil de Luka
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "jordan-luka-2",
    slug: "jordan-luka-2",
    marca: "Jordan",
    modelo: "Luka 2",
    generacion: 2,
    año_lanzamiento: 2022,
    genero: "unisex",
    signature_player: "Luka Doncic",
    tecnologia_clave: ["Zoom Air forefoot", "Air Strobel"],
    peso_real_g: 360,
    altura: "mid",
    horma: "normal",
    drop_mm: 9,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8, amortiguacion: 7, respuesta: 6,
      soporte_lateral: 7, estabilidad: 7, peso_score: 6,
      durabilidad_outdoor: 5, ventilacion: 6,
    },
    categoria_principal: "balanced",
    tags: ["signature", "versatile", "tirador", "descuento", "clasico"],
    ideal_para: {
      posiciones: ["alero", "escolta", "ala-pivot"],
      peso_jugador_kg: [75, 100],
      estilos: ["tirador", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["explosivo"] },
    resumen: "La segunda entrega de Luka ofrece Zoom Air forefoot + Air Strobel para cushion cómodo y responsivo. Pensada para jugadores versátiles que necesitan confort en ataque y estabilidad en defensa.",
    pros: [
      "Buena combinación cushion/respuesta",
      "Versatil para distintas posiciones",
      "Tracción herringbone fiable",
      "Precio actual muy atractivo",
    ],
    contras: [
      "Algo pesada para el nivel de respuesta",
      "Outdoor limitado",
      "Indoor only recomendado",
    ],
    veredicto: "Para el jugador versátil que quiere un Jordan signature con cushion real a un precio razonable. La Luka 5 es superior pero el Luka 2 sale ahora por 40-50â‚¬ menos.",
    imagen_principal: "/shoes/jordan-luka-2.jpg",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 125,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=luka+2&vst=luka+2", precio_actual: 75, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=jordan+luka+2+baloncesto&tag=canchazapa-21", precio_actual: 75, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=jordan+luka+2", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=jordan+luka+2", precio_actual: 85, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 41. NIKE PG 6 â€” Court feel para guards
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-pg-6",
    slug: "nike-pg-6",
    marca: "Nike",
    modelo: "PG 6",
    generacion: 6,
    año_lanzamiento: 2022,
    genero: "unisex",
    signature_player: "Paul George",
    tecnologia_clave: ["React", "Zoom Air unit"],
    peso_real_g: 330,
    altura: "low",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 9, amortiguacion: 6, respuesta: 8,
      soporte_lateral: 6, estabilidad: 6, peso_score: 8,
      durabilidad_outdoor: 6, ventilacion: 8,
    },
    categoria_principal: "responsive",
    tags: ["signature", "guard", "low-top", "court-feel", "descuento"],
    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [65, 90],
      estilos: ["explosivo", "tirador"],
    },
    no_recomendada_para: { posiciones: ["pivot", "ala-pivot"], estilos: ["potente"] },
    resumen: "La PG 6 es para los guards que valoran el court feel por encima de todo. Tracción herringbone de primer nivel, Zoom Air para propulsión y low-top para máxima agilidad. Una de las mejores opciones para bases explosivos a precio de saldo.",
    pros: [
      "Tracción herringbone sobresaliente",
      "Court feel excelente en low-top",
      "Muy ligera y ágil",
      "React + Zoom bien balanceados",
    ],
    contras: [
      "Low-top: no recomendada con historial de tobillos",
      "Cushion básico para jugadores pesados",
      "Indoor principalmente",
    ],
    veredicto: "Para bases y escoltas que priorizan velocidad y court feel. Con la PG 6 a 65â‚¬, pocas zapatillas ofrecen mejor tracción por ese precio.",
    imagen_principal: "/shoes/nike-pg-6.png",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=pg+6&vst=pg+6", precio_actual: 65, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+pg+6+baloncesto&tag=canchazapa-21", precio_actual: 65, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=nike+pg+6", precio_actual: 72, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 42. NIKE GT JUMP 2 â€” Pensada para pívots
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-gt-jump-2",
    slug: "nike-gt-jump-2",
    marca: "Nike",
    modelo: "Air Zoom G.T. Jump 2",
    generacion: 2,
    año_lanzamiento: 2023,
    genero: "unisex",
    tecnologia_clave: ["Zoom Air pods (heel+forefoot)", "React foam"],
    peso_real_g: 390,
    altura: "high",
    horma: "ancha",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 9, amortiguacion: 8, respuesta: 7,
      soporte_lateral: 8, estabilidad: 8, peso_score: 5,
      durabilidad_outdoor: 5, ventilacion: 6,
    },
    categoria_principal: "cushion-focused",
    tags: ["big-men", "zoom", "high-top", "descuento"],
    ideal_para: {
      posiciones: ["pivot", "ala-pivot"],
      peso_jugador_kg: [85, 130],
      estilos: ["potente", "equilibrado"],
      lesiones_compatibles: ["rodillas", "tobillos"],
    },
    no_recomendada_para: { posiciones: ["base", "escolta"], estilos: ["explosivo"] },
    resumen: "Diseñada específicamente para pívots y grandes que saltan. Zoom Air pods en talón y antepié dan cushion de impacto real, el high-top ofrece soporte máximo de tobillo y la horma ancha da comfort a pies grandes.",
    pros: [
      "Doble Zoom Air para máxima absorción de impactos",
      "High-top con excelente soporte tobillo",
      "Tracción herringbone superior",
      "Horma ancha para pies grandes",
    ],
    contras: [
      "Muy pesada, no para guards",
      "Indoor only (suela fina)",
      "Precio todavía algo alto",
    ],
    veredicto: "El zapato de Nike pensado desde cero para el juego interior. Si eres pívot, saltas mucho y tienes historial de rodillas o tobillos, la GT Jump 2 ofrece la mejor protección del mercado Nike ahora mismo.",
    imagen_principal: "/shoes/nike-gt-jump-2.png",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 150,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=gt+jump+2&vst=gt+jump+2", precio_actual: 95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+air+zoom+gt+jump+2&tag=canchazapa-21", precio_actual: 95, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=nike+gt+jump+2", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+gt+jump+2", precio_actual: 105, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 43. NIKE LEBRON 23 â€” Tope de gama cushion 2025
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-lebron-23",
    slug: "nike-lebron-23",
    marca: "Nike",
    modelo: "LeBron 23",
    generacion: 23,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "LeBron James",
    tecnologia_clave: ["ZoomX foam", "Carbon fiber plate", "Air Zoom"],
    predecesor_id: "nike-lebron-22",
    sucesor_id: null,

    peso_real_g: 430,
    altura: "high",
    horma: "ancha",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 10,
      respuesta: 6,
      soporte_lateral: 9,
      estabilidad: 9,
      peso_score: 4,
      durabilidad_outdoor: 6,
      ventilacion: 5,
    },
    categoria_principal: "cushion-focused",
    tags: ["signature", "tope-de-gama", "cushion", "moderna", "big-men"],

    ideal_para: {
      posiciones: ["pivot", "ala-pivot"],
      peso_jugador_kg: [85, 130],
      estilos: ["potente", "equilibrado"],
      lesiones_compatibles: ["rodillas", "fascia"],
    },
    no_recomendada_para: {
      posiciones: ["base", "escolta"],
      estilos: ["explosivo"],
    },

    resumen:
      "El LeBron 23 lleva el cushion a otro nivel con ZoomX + placa de carbono. La combinación entrega 72% de retorno de energía en antepié â€” el mayor registrado en un zapato de baloncesto Nike. Para jugadores grandes que quieren la máxima protección del mercado en 2025.",
    pros: [
      "Amortiguación líder absoluta del mercado en 2025",
      "ZoomX devuelve energía como ningún otro",
      "Soporte tobillo excelente en high-top",
      "Placa de carbono añade propulsión real",
    ],
    contras: [
      "El más pesado del catálogo (430g)",
      "Court feel prácticamente nulo",
      "Precio premium muy elevado",
      "No apta para juego rápido",
    ],
    veredicto:
      "Si eres pívot, pesas más de 90kg y el presupuesto no es problema, el LeBron 23 es el techo tecnológico del mercado. Si buscas velocidad, ni lo mires.",

    imagen_principal: "/shoes/nike-lebron-23.jpg",
    imagenes: [],

    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/nike-lebron-23-performance-review/" },
    ],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 220,
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+lebron+23+basketball&tag=canchazapa-21", precio_actual: 210, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=lebron+23&vst=lebron+23", precio_actual: 220, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+lebron+23", precio_actual: 215, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 44. NIKE JA 3 â€” Guard explosivo 2025
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-ja-3",
    slug: "nike-ja-3",
    marca: "Nike",
    modelo: "Ja 3",
    generacion: 3,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Ja Morant",
    tecnologia_clave: ["Zoom Air Strobel", "React foam", "Herringbone traction"],
    predecesor_id: "nike-ja-2",

    peso_real_g: 310,
    altura: "mid",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 9,
      amortiguacion: 6,
      respuesta: 9,
      soporte_lateral: 7,
      estabilidad: 6,
      peso_score: 9,
      durabilidad_outdoor: 5,
      ventilacion: 8,
    },
    categoria_principal: "responsive",
    tags: ["signature", "guard", "explosivo", "moderna", "ligera"],

    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [60, 88],
      estilos: ["explosivo", "tirador"],
    },
    no_recomendada_para: {
      posiciones: ["pivot", "ala-pivot"],
      estilos: ["potente"],
    },

    resumen:
      "El primer zapato de Ja diseñado completamente desde cero. Más ligero y más reactivo que el Ja 2, con tracción herringbone brutalmente agresiva y un Zoom Air Strobel que conecta con el suelo de forma directa. El zapato de los guards explosivos de 2025.",
    pros: [
      "Tracción herringbone entre las mejores del año",
      "Extremadamente ligera para su nivel de tech",
      "Zoom Air Strobel muy responsivo",
      "Ventilación superior",
    ],
    contras: [
      "Estabilidad lateral justa para jugadores anchos",
      "Cushion básico para >90kg",
      "Reviews mixtas en durabilidad del upper",
      "Indoor principalmente",
    ],
    veredicto:
      "Para bases explosivos que quieren el zapato más reactivo del mercado Nike en 2025. Si el Ja 2 te gustaba, el 3 es una evolución real.",

    imagen_principal: "/shoes/nike-ja-3.png",
    imagenes: [],

    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/nike-ja-3-performance-review/" },
    ],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 135,
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+ja+3+basketball&tag=canchazapa-21", precio_actual: 130, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=ja+3&vst=ja+3", precio_actual: 135, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+ja+3", precio_actual: 135, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 45. ADIDAS AE 2 â€” Mejor guard Adidas 2025
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "adidas-ae-2",
    slug: "adidas-ae-2",
    marca: "Adidas",
    modelo: "AE 2",
    generacion: 2,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Anthony Edwards",
    tecnologia_clave: ["Lightstrike Pro 2.0", "Continental rubber", "TPU shank"],
    predecesor_id: "adidas-ae-1",

    peso_real_g: 305,
    altura: "mid",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 9,
      amortiguacion: 7,
      respuesta: 9,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 9,
      durabilidad_outdoor: 7,
      ventilacion: 8,
    },
    categoria_principal: "responsive",
    tags: ["signature", "guard", "lightstrike-pro", "moderna", "top-guard-2025"],

    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [65, 92],
      estilos: ["explosivo", "equilibrado", "tirador"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
    },

    resumen:
      "El AE 2 mejora al AE 1 en todo lo que importa: más ligero, mejor ajuste en antepié y Lightstrike Pro actualizado que devuelve más energía. Sin el 'sophomore slump' típico â€” uno de los mejores zapatos para guards del año.",
    pros: [
      "Más ligero que el AE 1 (305g vs 320g)",
      "Tracción Continental imbatible",
      "Lightstrike Pro aún más responsivo",
      "Ventilación mejorada",
    ],
    contras: [
      "Horma algo estrecha en el antepié â€” probar talla",
      "Para indoor principalmente",
      "Precio en zona alta",
    ],
    veredicto:
      "El mejor zapato para guards de Adidas en 2025. Si ya te gustó el AE 1, el 2 es estrictamente mejor. Una de las mejores opciones explosivas del mercado ahora mismo.",

    imagen_principal: "/shoes/adidas-ae-2.jpg",
    imagenes: [],

    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/adidas-ae-2-performance-review/" },
    ],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 145,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=ae+2+baloncesto", precio_actual: 140, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+ae+2+baloncesto&tag=canchazapa-21", precio_actual: 135, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=adidas+ae+2", precio_actual: 145, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=adidas+ae+2+baloncesto", precio_actual: 140, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 46. PUMA MB.05 â€” Nitrofoam SQD, línea LaMelo
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "puma-mb05",
    slug: "puma-mb05",
    marca: "Puma",
    modelo: "MB.05",
    generacion: 5,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "LaMelo Ball",
    tecnologia_clave: ["Nitrofoam SQD", "Engineered mesh upper"],

    peso_real_g: 305,
    altura: "mid",
    horma: "normal",
    drop_mm: 7,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 7,
      respuesta: 8,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 9,
      durabilidad_outdoor: 5,
      ventilacion: 8,
    },
    categoria_principal: "responsive",
    tags: ["signature", "guard", "nitrofoam", "moderna", "ligera"],

    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [60, 88],
      estilos: ["explosivo", "equilibrado", "tirador"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
    },

    resumen:
      "La quinta entrega de LaMelo actualiza el Nitrofoam a la versión SQD (más compacta y reactiva) con un upper de mesh engineered inspirado en el número 1 de LaMelo. La más ligera y responsiva de la línea MB hasta la fecha.",
    pros: [
      "Nitrofoam SQD más reactivo que versiones anteriores",
      "Muy ligera (305g)",
      "Upper engineered transpirable",
      "Diseño atrevido característico de LaMelo",
    ],
    contras: [
      "Outdoor no recomendado",
      "Sin placa, algo menos explosiva que la All-Pro Nitro",
      "Soporte tobillo justo",
    ],
    veredicto:
      "Para fans de la línea MB o guards que quieren la última tecnología Nitrofoam Puma. Una evolución sólida que compite con la Ja 3 y la AE 2 en el segmento guard reactivo.",

    imagen_principal: "/shoes/puma-mb05.jpg",
    imagenes: [],

    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/puma-mb05-performance-review/" },
    ],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "puma_es", url: "https://eu.puma.com/es/es/c/puma-basketball?q=%3Arelevance%3Abrand%3APUMA%3AproductType%3Afootwear&text=MB+05", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=puma+mb05+zapatillas+baloncesto&tag=canchazapa-21", precio_actual: 115, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=puma+mb.05+baloncesto", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 47. CONVERSE SHAI 001 â€” Debut SGA, sorpresa del año
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "converse-shai-001",
    slug: "converse-shai-001",
    marca: "Converse",
    modelo: "SHAI 001",
    generacion: 1,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Shai Gilgeous-Alexander",
    tecnologia_clave: ["React foam", "Herringbone outsole", "Integrated ankle collar"],

    peso_real_g: 315,
    altura: "mid",
    horma: "normal",
    drop_mm: 7,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 6,
      respuesta: 8,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 8,
      durabilidad_outdoor: 5,
      ventilacion: 7,
    },
    categoria_principal: "responsive",
    tags: ["signature", "guard", "moderna", "estilo", "converse"],

    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [65, 92],
      estilos: ["equilibrado", "tirador", "explosivo"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
    },

    resumen:
      "Converse volvió a la élite del rendimiento con el debut de SGA. La SHAI 001 mezcla un diseño limpio y minimal con React foam funcional y tracción herringbone fiable. La sorpresa más agradable de 2025 â€” demostró que Converse puede competir en performance.",
    pros: [
      "Diseño más limpio y versátil del año",
      "React foam cómodo y ligero",
      "Tracción herringbone sólida",
      "Válida tanto para jugar como para vestir",
    ],
    contras: [
      "Sin tecnología premium (sin Zoom ni placa)",
      "Cushion básico para jugadores pesados",
      "Sin historial de durabilidad largo en Converse performance",
    ],
    veredicto:
      "Para el jugador que quiere un zapato de performance con estilo diferente. La SHAI 001 no bate a la AE 2 o Ja 3 en tech puro, pero ofrece un equilibrio único de rendimiento y diseño limpio.",

    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],

    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/converse-shai-001-performance-review/" },
    ],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 130,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=converse+shai+001&vst=converse+shai+001", precio_actual: 125, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=converse+shai+001+baloncesto&tag=canchazapa-21", precio_actual: 125, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=converse+shai+001", precio_actual: 130, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=converse+shai+001", precio_actual: 128, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 48. NIKE GT CUT 4 â€” Tracción 10/10, cima guards cortadores
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-gt-cut-4",
    slug: "nike-gt-cut-4",
    marca: "Nike",
    modelo: "Air Zoom G.T. Cut 4",
    generacion: 4,
    año_lanzamiento: 2025,
    genero: "unisex",
    tecnologia_clave: ["Zoom Air Strobel", "React foam", "Herringbone traction"],
    predecesor_id: "nike-gt-cut-3",

    peso_real_g: 305,
    altura: "low",
    horma: "normal",
    drop_mm: 7,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",

    puntuaciones: {
      traccion: 10,
      amortiguacion: 7,
      respuesta: 9,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 9,
      durabilidad_outdoor: 5,
      ventilacion: 8,
    },
    categoria_principal: "responsive",
    tags: ["guard", "low-top", "court-feel", "moderna", "traction-king", "wembanyama"],

    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [60, 92],
      estilos: ["explosivo", "tirador"],
    },
    no_recomendada_para: {
      posiciones: ["pivot", "ala-pivot"],
      estilos: ["potente"],
    },

    resumen:
      "La GT Cut 4 perfecciona lo que hizo grande a la línea: tracción 10/10 con herringbone de nueva generación, Zoom Air Strobel aún más reactivo y peso mínimo. Victor Wembanyama la usó en la temporada NBA 25-26 con su colorway Gold Panther. La cima del rendimiento para guards cortadores.",
    pros: [
      "Tracción 10/10 â€” la mejor herringbone del mercado",
      "Zoom Air Strobel ultra-reactivo",
      "Extremadamente ligera",
      "Court feel excepcional en low-top",
    ],
    contras: [
      "Low-top: no para historial de tobillos",
      "Indoor only (outsole fina)",
      "Precio elevado",
    ],
    veredicto:
      "Si la tracción y la reactividad son tu prioridad absoluta y no tienes problemas de tobillos, la GT Cut 4 es el techo del mercado en 2025. La mejor de la historia de la línea.",

    imagen_principal: "/shoes/nike-gt-cut-4.png",
    imagenes: [],

    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/nike-gt-cut-4-performance-review/" },
    ],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 170,
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+gt+cut+4+basketball&tag=canchazapa-21", precio_actual: 160, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=gt+cut+4&vst=gt+cut+4", precio_actual: 170, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+gt+cut+4", precio_actual: 165, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 49. LI-NING GAMMA 2 â€” Joya escondida 2026
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "lining-gamma-2",
    slug: "lining-gamma-2",
    marca: "Li-Ning",
    modelo: "Gamma 2",
    generacion: 2,
    año_lanzamiento: 2026,
    genero: "unisex",
    tecnologia_clave: ["Li-Ning BOOM foam", "Carbon fiber plate", "Full-length cushion"],

    peso_real_g: 298,
    altura: "mid",
    horma: "normal",
    drop_mm: 7,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 9,
      amortiguacion: 8,
      respuesta: 9,
      soporte_lateral: 8,
      estabilidad: 8,
      peso_score: 9,
      durabilidad_outdoor: 6,
      ventilacion: 8,
    },
    categoria_principal: "responsive",
    tags: ["china-brand", "moderna", "value-premium", "top-2026", "explosivo"],

    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [65, 95],
      estilos: ["explosivo", "equilibrado", "tirador"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
    },

    resumen:
      "WearTesters la nombró 'mejor zapatilla de baloncesto de 2026 hasta la fecha'. BOOM foam + placa de carbono a 120â‚¬ es una combinación que avergüenza a muchos modelos que cuestan el doble. La mejor relación rendimiento-precio del mercado en 2026.",
    pros: [
      "BOOM foam + placa carbono a precio accesible",
      "Una de las más ligeras del catálogo (298g)",
      "Tracción excepcional",
      "Soporte y estabilidad muy por encima de su precio",
    ],
    contras: [
      "Disponibilidad limitada en España (aliexpress/amazon import)",
      "Marca menos conocida en Europa",
      "Sin red de servicio técnico local",
    ],
    veredicto:
      "La joya escondida de 2026. Si no te importa importarla, la Gamma 2 ofrece el mejor rendimiento por euro del mercado. WearTesters no se equivoca: es el zapato del año.",

    imagen_principal: "/shoes/lining-gamma-2.jpg",
    imagenes: [],

    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/li-ning-gamma-2-performance-review/" },
    ],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "aliexpress", url: "https://s.click.aliexpress.com/e/_c3PkhD37", precio_actual: 105, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=li-ning+gamma+2+basketball&tag=canchazapa-21", precio_actual: 115, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 50. ANTA KT 11 â€” Mejor KT de la historia
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "anta-kt-11",
    slug: "anta-kt-11",
    marca: "Anta",
    modelo: "KT 11",
    generacion: 11,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Klay Thompson",
    tecnologia_clave: ["Nitrogen foam", "A-FLASHEDGE technology", "Woven upper"],
    predecesor_id: "anta-kt-10",

    peso_real_g: 328,
    altura: "mid",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",

    puntuaciones: {
      traccion: 9,
      amortiguacion: 7,
      respuesta: 8,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 7,
      durabilidad_outdoor: 7,
      ventilacion: 7,
    },
    categoria_principal: "responsive",
    tags: ["signature", "guard", "china-brand", "tirador", "moderna"],

    ideal_para: {
      posiciones: ["escolta", "alero", "base"],
      peso_jugador_kg: [70, 95],
      estilos: ["tirador", "equilibrado", "explosivo"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
    },

    resumen:
      "La KT 11 estrena upper de tejido woven de alta calidad y mantiene el nitrógeno foam que hizo grande a la línea. El jersey número 31 de Klay (ahora en Dallas) inspira el diseño. Una de las mejores opciones para tiradores y escoltas que buscan tracción excepcional y un upper premium sin pagar precio Nike.",
    pros: [
      "Upper woven de calidad superior",
      "Tracción excelente para exterior moderado",
      "Nitrogen foam bien balanceado",
      "Precio muy competitivo para el nivel tech",
    ],
    contras: [
      "Disponibilidad algo limitada en España",
      "Diseño polarizante",
      "Cushion justo para jugadores >100kg",
    ],
    veredicto:
      "Para escoltas tiradores al estilo Klay que quieren tracción y estilo premium de marca china sin pagar marca occidental. La mejor KT de la historia y una de las mejores opciones del segmento 100-110â‚¬.",

    imagen_principal: "/shoes/anta-kt-11.jpg",
    imagenes: [],

    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/anta-kt-11-performance-review/" },
    ],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "aliexpress", url: "https://s.click.aliexpress.com/e/_c3AJpADb", precio_actual: 95, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=anta+kt+11+basketball&tag=canchazapa-21", precio_actual: 105, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
      { tienda: "basket_world", url: "https://www.basketworld.es/buscar?q=anta+kt+11", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 51. REEBOK QUESTION MID â€” El clásico de Allen Iverson
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "reebok-question-mid",
    slug: "reebok-question-mid",
    marca: "Reebok",
    modelo: "Question Mid",
    año_lanzamiento: 1996,
    genero: "unisex",
    signature_player: "Allen Iverson",
    tecnologia_clave: ["Hexalite cushion", "DMX foam", "Leather upper"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 405,
    altura: "mid",
    horma: "normal",
    drop_mm: 9,
    tipo_cierre: "cordones",
    material_superior: "leather",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 5,
      respuesta: 7,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 5,
      durabilidad_outdoor: 6,
      ventilacion: 7,
    },
    categoria_principal: "responsive",
    tags: ["retro", "clasico", "iverson", "leather", "icono"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [60, 90],
      estilos: ["explosivo", "equilibrado", "tirador"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
    },
    resumen: "El zapato más icónico de la historia del baloncesto de calle. La Question Mid de Allen Iverson combina upper de cuero que envuelve el pie como un guante, tracción de goma muy pegajosa y un estilo que nunca pasa de moda. WearTesters la sigue recomendando para jugar 30 años después de su debut.",
    pros: [
      "Tracción de goma extremadamente pegajosa",
      "Upper de cuero durable y envolvente",
      "Icono cultural â€” nadie cuestiona por qué las llevas",
      "Muy buena ventilación para ser de cuero",
      "Soporte lateral sólido en mid-top",
    ],
    contras: [
      "Amortiguación básica (Hexalite solo en talón)",
      "Pesada para juego moderno explosivo",
      "Cuero requiere mantenimiento",
      "No apta para jugadores >90 kg que necesitan cushion",
    ],
    veredicto: "Si eres de los que valoran el legado y quieres algo que juega bien Y tiene historia, la Question Mid es única. No es la más técnica, pero la tracción y el soporte siguen siendo sólidos. Para escoltas y bases que quieren estilo de leyenda.",
    imagen_principal: "/shoes/reebok-question-mid.webp",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/reebok-question-performance-review/" },
      { tipo: "runrepeat-lab", url: "https://runrepeat.com/reebok-question-mid" },
    ],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 130,
    links_compra: [
      { tienda: "reebok_es", url: "https://www.reebok.es/buscar?q=question+mid", precio_actual: 130, disponible: false, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=reebok+question+mid", precio_actual: 115, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=reebok+question+mid", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "snipes_eu", url: "https://www.awin1.com/cread.php?awinmid=122628&awinaffid=2908587&ued=https%3A%2F%2Fwww.snipes.com%2Fes-es%2Fc%2Fzapatillas%3Fq%3Dreebok%2Bquestion", precio_actual: 120, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-26" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=reebok+question+mid+baloncesto&tag=canchazapa-21", precio_actual: 118, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 52. REEBOK ANSWER IV â€” El zapato de las Finales 2001
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "reebok-answer-iv",
    slug: "reebok-answer-iv",
    marca: "Reebok",
    modelo: "Answer IV",
    generacion: 4,
    año_lanzamiento: 2001,
    genero: "unisex",
    signature_player: "Allen Iverson",
    tecnologia_clave: ["DMX foam", "3D Ultralite frame", "Leather upper"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 390,
    altura: "mid",
    horma: "normal",
    drop_mm: 9,
    tipo_cierre: "cordones",
    material_superior: "leather",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 6,
      respuesta: 7,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 6,
      durabilidad_outdoor: 6,
      ventilacion: 6,
    },
    categoria_principal: "responsive",
    tags: ["retro", "clasico", "iverson", "finales-2001", "icono", "leather"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [65, 92],
      estilos: ["explosivo", "equilibrado", "tirador"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
    },
    resumen: "El zapato con el que Allen Iverson ganó el MVP de las Finales en 2001 contra los Lakers de Shaq y Kobe. DMX foam más avanzado que la Question, algo más ligera y mejor cushion. WearTesters la califica como jugable hoy en día con tracción excepcional.",
    pros: [
      "Historia inigualable â€” Finales 2001",
      "DMX foam mejor que Hexalite de la Question",
      "Tracción muy buena en cuero liso",
      "Algo más ligera que la Question Mid",
      "Marco 3D Ultralite añade estabilidad lateral",
    ],
    contras: [
      "Cushion limitado para estándares modernos",
      "Cuero requiere cuidado",
      "Disponibilidad por colorway limitada",
      "No recomendada para jugadores pesados",
    ],
    veredicto: "Para el coleccionista que quiere jugar con historia en los pies. La Answer IV es el mejor zapato de rendimiento retro de Reebok â€” técnicamente superior a la Question y con la historia de las Finales. A ~100â‚¬ en rebajas, una ganga cultural.",
    imagen_principal: "/shoes/reebok-answer-iv.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/reebok-answer-iv-4-retro-performance-review/" },
    ],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "reebok_es", url: "https://www.reebok.es/buscar?q=answer+iv", precio_actual: 120, disponible: false, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=reebok+answer+iv", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=reebok+answer+iv", precio_actual: 105, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "snipes_eu", url: "https://www.awin1.com/cread.php?awinmid=122628&awinaffid=2908587&ued=https%3A%2F%2Fwww.snipes.com%2Fes-es%2Fc%2Fzapatillas%3Fq%3Dreebok%2Banswer", precio_actual: 105, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-26" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=reebok+answer+iv+baloncesto&tag=canchazapa-21", precio_actual: 100, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 53. REEBOK ENGINE A â€” El regreso de Reebok al rendimiento (2025)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "reebok-engine-a",
    slug: "reebok-engine-a",
    marca: "Reebok",
    modelo: "Engine A",
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Angel Reese",
    tecnologia_clave: ["ERS (Energy Return System)", "SuperFloat nitrogen foam", "Herringbone outsole"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 335,
    altura: "mid",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 7,
      respuesta: 7,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 7,
      durabilidad_outdoor: 7,
      ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["moderna", "reebok-performance", "angel-reese", "balanced", "outdoor-viable"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero", "ala-pivot"],
      peso_jugador_kg: [65, 95],
      estilos: ["equilibrado", "explosivo", "tirador"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
    },
    resumen: "El regreso de Reebok a las zapatillas de rendimiento real. La Engine A estrena el sistema ERS con nitrogen-infused SuperFloat foam en talón y antepié, herringbone multidireccional durable para outdoor, y un upper sintético moldeado ultraligero. Debut de Angel Reese. La mejor zapatilla de performance de Reebok en 15 años.",
    pros: [
      "ERS + SuperFloat foam muy cómodo y responsivo",
      "Herringbone con goma gruesa válida para outdoor",
      "Upper moldeado ligero y transpirable",
      "Reebok vuelve con algo que merece atención",
      "Precio accesible para el nivel tech",
    ],
    contras: [
      "Sin historial largo de durabilidad (zapato nuevo)",
      "Disponibilidad puede ser limitada en España",
      "No tan explosiva como la AE 2 o GT Cut 4",
    ],
    veredicto: "Para el jugador que quiere algo diferente y equilibrado. La Engine A no lidera en ninguna categoría concreta pero es sólida en todo â€” y el rubber grueso la hace viable para exterior. Un regreso de Reebok que merece ser tomado en serio.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/reebok-engine-a/" },
    ],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "reebok_es", url: "https://www.reebok.es/buscar?q=engine+a", precio_actual: 120, disponible: false, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=reebok+engine+a", precio_actual: 115, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=reebok+engine+a+baloncesto&tag=canchazapa-21", precio_actual: 112, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-15" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 54. UA CURRY 13 â€” Signature premium, generación actual
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "ua-curry-13",
    slug: "ua-curry-13",
    marca: "Under Armour",
    modelo: "Curry 13",
    generacion: 13,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Stephen Curry",
    tecnologia_clave: ["UA Flow 2.0", "Warp 3.0 upper", "TPU heel counter"],
    predecesor_id: "ua-curry-12",
    sucesor_id: null,

    peso_real_g: 308,
    altura: "mid",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "knit",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 7,
      respuesta: 9,
      soporte_lateral: 8,
      estabilidad: 8,
      peso_score: 9,
      durabilidad_outdoor: 4,
      ventilacion: 8,
    },
    categoria_principal: "responsive",
    tags: ["signature", "ligera", "tope-de-gama", "curry"],

    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [60, 90],
      estilos: ["tirador", "explosivo", "equilibrado"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
    },

    resumen:
      "La Curry 13 evoluciona la icónica línea Flow con el nuevo Warp 3.0 upper y mejoras en el soporte lateral. Mantiene el ADN de la línea: ultraligera, con court feel directo y respuesta máxima para tiradores. Disponible actualmente en Under Armour España.",
    pros: [
      "Continuación refinada de la fórmula Flow â€” ligera y reactiva",
      "Warp 3.0 upper con mejor soporte lateral que la Curry 12",
      "Peso mínimo (~308g) para su nivel de protección",
      "Disponible en España a 140â‚¬",
    ],
    contras: [
      "Suela Flow poco durable en asfalto",
      "Cushion insuficiente para jugadores pesados o lesiones de tobillo",
      "Horma estrecha en antepié â€” probar antes de comprar",
    ],
    veredicto:
      "La mejor opción actual de UA para bases y escolteros que buscan respuesta máxima en pista cubierta. Si ya te gustó la Curry 12, la 13 es una mejora directa. Para asfalto o pesos > 90kg, busca otra cosa.",

    imagen_principal: "/shoes/ua-curry-13.jpg",
    imagenes: [],

    fuentes: [
      {
        tipo: "evaluacion-propia",
        url: "https://www.underarmour.es/es-es/p/calzado/curry-13/6007670.html",
      },
    ],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 160,
    links_compra: [
      { tienda: "ua_es", url: "https://www.underarmour.es/es-es/c/hombre/zapatillas/baloncesto/?q=curry+13", precio_actual: 140, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 55. UA LOCKDOWN 7 â€” Entrada de gama UA, muy asequible
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "ua-lockdown-7",
    slug: "ua-lockdown-7",
    marca: "Under Armour",
    modelo: "Lockdown 7",
    generacion: 7,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: undefined,
    tecnologia_clave: ["EVA foam midsole", "herringbone outsole", "mesh upper"],
    predecesor_id: null,
    sucesor_id: null,

    peso_real_g: 340,
    altura: "low",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 7,
      amortiguacion: 6,
      respuesta: 6,
      soporte_lateral: 6,
      estabilidad: 7,
      peso_score: 6,
      durabilidad_outdoor: 7,
      ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["budget", "entrada-gama", "outdoor-viable", "low-top"],

    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [60, 85],
      estilos: ["equilibrado", "tirador"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente", "explosivo"],
    },

    resumen:
      "La opción más asequible de UA para baloncesto. EVA foam básico pero funcional, herringbone con buena tracción en pista y exterior. No compite con zapatillas premium en amortiguación o respuesta, pero cumple para uso casual y recreativo a un precio difícil de batir.",
    pros: [
      "Precio muy accesible (75â‚¬ aprox.)",
      "Herringbone durable para outdoor e indoor",
      "Upper mesh transpirable",
      "Buen choice para principiantes o uso esporádico",
    ],
    contras: [
      "EVA básico â€” menos cushion y respuesta que modelos premium",
      "Soporte de tobillo limitado en cortes bruscos",
      "Peso algo elevado para lo que ofrece",
    ],
    veredicto:
      "Si tu presupuesto es ajustado o buscas una segunda zapatilla para entrenar outdoor sin arriesgar tus buenas zapatillas, la Lockdown 7 cumple. Para juego serio o frecuente, sube de gama.",

    imagen_principal: "/shoes/ua-lockdown-7.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 75,
    links_compra: [
      { tienda: "ua_es", url: "https://www.underarmour.es/es-es/p/calzado/ua_lockdown%C2%A07/3028512.html", precio_actual: 75, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 56. UA SPAWN 7 MID â€” Mid-range de performance UA
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "ua-spawn-7-mid",
    slug: "ua-spawn-7-mid",
    marca: "Under Armour",
    modelo: "Spawn 7 Mid",
    generacion: 7,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: undefined,
    tecnologia_clave: ["UA HOVR foam", "herringbone outsole", "mesh+TPU upper"],
    predecesor_id: null,
    sucesor_id: null,

    peso_real_g: 365,
    altura: "mid",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 7,
      respuesta: 7,
      soporte_lateral: 8,
      estabilidad: 8,
      peso_score: 6,
      durabilidad_outdoor: 7,
      ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["mid-top", "soporte", "mid-range", "outdoor-viable"],

    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [70, 100],
      estilos: ["equilibrado", "potente"],
    },
    no_recomendada_para: {
      posiciones: [],
      estilos: ["explosivo"],
    },

    resumen:
      "La Spawn 7 Mid de UA ofrece un buen equilibrio entre soporte y amortiguación. HOVR foam en mediasuela proporciona energía devuelta sin sacrificar cushion. Upper mid con buen soporte lateral para jugadores físicos. Una opción sólida de gama media disponible en UA España.",
    pros: [
      "HOVR foam con buena amortiguación y respuesta",
      "Perfil mid con soporte lateral adecuado",
      "Herringbone durable para indoor y outdoor",
      "Precio justo en gama media (120â‚¬)",
    ],
    contras: [
      "Peso algo elevado para su nivel",
      "Menos reactiva que la Curry 13",
      "No top-tier en ninguna categoría",
    ],
    veredicto:
      "Para jugadores físicos de posición interior o aleros que necesitan soporte sin pagar precio premium. La Spawn 7 Mid cumple bien en pista cubierta y aguanta el exterior. Buena opción de gama media dentro del catálogo UA.",

    imagen_principal: "/shoes/ua-spawn-7-mid.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "ua_es", url: "https://www.underarmour.es/es-es/p/calzado/ua_spawn_7%C2%A0mid/6000753.html", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 57. UA FUTR X 4 â€” Upper-mid UA, reactiva y estable
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "ua-futr-x-4",
    slug: "ua-futr-x-4",
    marca: "Under Armour",
    modelo: "FUTR X 4",
    generacion: 4,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: undefined,
    tecnologia_clave: ["UA HOVR foam", "Flow-inspired outsole", "knit upper"],
    predecesor_id: null,
    sucesor_id: null,

    peso_real_g: 345,
    altura: "mid",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "knit",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 8,
      respuesta: 8,
      soporte_lateral: 8,
      estabilidad: 8,
      peso_score: 7,
      durabilidad_outdoor: 5,
      ventilacion: 8,
    },
    categoria_principal: "balanced",
    tags: ["mid-top", "reactiva", "versatil", "upper-mid"],

    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [65, 95],
      estilos: ["equilibrado", "explosivo", "tirador"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
    },

    resumen:
      "La FUTR X 4 es la zapatilla más equilibrada del catálogo UA: HOVR foam con buena energía devuelta, outsole reactiva similar al Flow en rendimiento, knit upper transpirable y soporte lateral sólido. Disponible en UA España a 120â‚¬.",
    pros: [
      "Excelente equilibrio cushion-respuesta con HOVR",
      "Knit upper cómodo y transpirable",
      "Soporte lateral bueno para cambios de dirección",
      "Versatilidad para distintos estilos de juego",
    ],
    contras: [
      "Outsole menos durable en exterior que herringbone clásico",
      "No tan ligera como la Curry 13",
      "Relativa novedad â€” sin historial de durabilidad largo",
    ],
    veredicto:
      "La mejor opción de UA para jugadores que quieren algo equilibrado sin decidirse entre la Curry (ultra-reactiva, poca protección) y la Spawn (más física). La FUTR X 4 funciona bien en todas las posiciones.",

    imagen_principal: "/shoes/ua-futr-x-4.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "ua_es", url: "https://www.underarmour.es/es-es/p/calzado/ua_futr_x_4/3028831.html", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 58. UA CURRY 3Z 25 â€” Curry budget, entrada de gama Curry
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "ua-curry-3z-25",
    slug: "ua-curry-3z-25",
    marca: "Under Armour",
    modelo: "Curry 3Z 25",
    generacion: 25,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Stephen Curry",
    tecnologia_clave: ["EVA foam midsole", "herringbone outsole", "mesh upper"],
    predecesor_id: null,
    sucesor_id: null,

    peso_real_g: 350,
    altura: "low",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 7,
      amortiguacion: 6,
      respuesta: 6,
      soporte_lateral: 6,
      estabilidad: 7,
      peso_score: 7,
      durabilidad_outdoor: 8,
      ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["budget", "curry", "entrada-gama", "low-top", "outdoor-viable"],

    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [60, 85],
      estilos: ["tirador", "equilibrado"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
    },

    resumen:
      "La versión asequible de la línea Curry. EVA foam básico pero funcional, herringbone resistente para outdoor, y el respaldo del nombre Curry. Ideal para jugadores que quieren el look Curry sin el precio premium. Disponible en UA España a 85â‚¬.",
    pros: [
      "Precio muy asequible (85â‚¬) con el nombre Curry",
      "Herringbone durable para outdoor e indoor",
      "Buena opción para principiantes o uso recreativo",
      "Ligera para su precio",
    ],
    contras: [
      "Muy inferior a la Curry 12/13 en cushion y respuesta",
      "EVA básico â€” no hay UA Flow ni HOVR",
      "No tiene las tecnologías premium de la línea Curry",
    ],
    veredicto:
      "Si quieres el sello Curry sin gastar 140â‚¬+, la Curry 3Z 25 es la respuesta. No es una zapatilla técnicamente avanzada, pero cumple para uso recreativo o pistas exteriores. Para juego serio, invierte en la Curry 13.",

    imagen_principal: "/shoes/ua-curry-3z-25.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 85,
    links_compra: [
      { tienda: "ua_es", url: "https://www.underarmour.es/es-es/p/calzado/curry_3z_25/6000749.html", precio_actual: 85, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 59. Nike Luka 77 â€” Signature Luka, gama media Nike Brand
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-luka-77",
    slug: "nike-luka-77",
    marca: "Nike",
    modelo: "Luka 77",
    generacion: 1,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Luka DonÄiÄ‡",
    tecnologia_clave: ["React foam", "Zoom Air heel", "knit upper"],
    predecesor_id: null,
    sucesor_id: null,

    peso_real_g: 355,
    altura: "low",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "knit",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 8,
      respuesta: 7,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 7,
      durabilidad_outdoor: 5,
      ventilacion: 8,
    },
    categoria_principal: "balanced",
    tags: ["low-top", "signature", "reactiva", "gama-media"],

    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [65, 95],
      estilos: ["equilibrado", "equilibrado", "tirador"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
    },

    resumen:
      "La Nike Luka 77 es la primera zapatilla de Luka DonÄiÄ‡ bajo Nike Brand (no Jordan Brand), el número 77 hace referencia a su dorsal en Eslovenia. React + Zoom Air en el talón, upper knit y outsole herringbone. Gama media con acabado premium y estética minimalista.",
    pros: [
      "Combinación React + Zoom Air ofrece buen cushion y algo de respuesta",
      "Knit upper cómodo y transpirable desde el primer uso",
      "Estética limpia, fácil de combinar",
      "Precio competitivo para zapatilla signature",
    ],
    contras: [
      "Menos soporte lateral que la Jordan Luka series",
      "Outsole no tan durable en exterior como herringbone clásico",
      "Primera generación â€” sin historial de durabilidad",
    ],
    veredicto:
      "Para fans de Luka o jugadores de gama media que quieren un calzado equilibrado a buen precio. No alcanza el nivel técnico de la GT Cut 4 ni el cushion de la LeBron 23, pero a 99.99â‚¬ es una opción sólida.",

    imagen_principal: "/shoes/nike-luka-77.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 100,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/t/luka-77-zapatillas-de-baloncesto-BERU1e7j/IF1610-500", precio_actual: 99.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 60. Nike Book 2 â€” Devin Booker signature, equilibrada y elegante
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-book-2",
    slug: "nike-book-2",
    marca: "Nike",
    modelo: "Book 2",
    generacion: 2,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Devin Booker",
    tecnologia_clave: ["Zoom Air forefoot", "React midsole", "mesh upper"],
    predecesor_id: null,
    sucesor_id: null,

    peso_real_g: 335,
    altura: "low",
    horma: "normal",
    drop_mm: 9,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 8,
      respuesta: 8,
      soporte_lateral: 8,
      estabilidad: 7,
      peso_score: 8,
      durabilidad_outdoor: 5,
      ventilacion: 8,
    },
    categoria_principal: "responsive",
    tags: ["low-top", "signature", "ligera", "rapida", "explosiva"],

    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [60, 90],
      estilos: ["explosivo", "explosivo", "tirador"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
    },

    resumen:
      "La Nike Book 2 es la segunda zapatilla signature de Devin Booker. Mejora significativa sobre la Book 1: Zoom Air en el antepié para respuesta en arranques, midsole React para cushion durante el juego, upper mesh ligero. Diseñada para jugadores rápidos y tiradores.",
    pros: [
      "Zoom Air en antepié: respuesta excelente en cambios de dirección",
      "Ligera y cómoda desde el primer uso",
      "Buen agarre con outsole multidireccional",
      "Upper mesh transpirable",
    ],
    contras: [
      "Menor amortiguación que zapatillas de gama alta con Zoom Air strobel",
      "Soporte de tobillo básico en diseño low",
      "Precio de 150â‚¬ exige comparar con opciones similares",
    ],
    veredicto:
      "Una de las mejores opciones para bases y escoltas explosivos que priorizan velocidad y comodidad. La combinación React + Zoom Air en antepié la hace destacar en su rango de precio.",

    imagen_principal: "/shoes/nike-book-2.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 150,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/t/book-2-rising-zapatillas-de-baloncesto-m5KwDWWn/IB6687-001", precio_actual: 149.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 61. Nike Kobe 9 Low Protro â€” Retro icónico, bajo y preciso
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-kobe-9-low-protro",
    slug: "nike-kobe-9-low-protro",
    marca: "Nike",
    modelo: "Kobe 9 Low Protro",
    generacion: 9,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Kobe Bryant",
    tecnologia_clave: ["Zoom Air", "Flyknit upper", "outsole herringbone"],
    predecesor_id: null,
    sucesor_id: null,

    peso_real_g: 310,
    altura: "low",
    horma: "estrecha",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 9,
      amortiguacion: 7,
      respuesta: 9,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 9,
      durabilidad_outdoor: 6,
      ventilacion: 8,
    },
    categoria_principal: "responsive",
    tags: ["low-top", "retro", "ligera", "rapida", "explosiva", "clasica"],

    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [55, 85],
      estilos: ["explosivo", "explosivo", "equilibrado", "tirador"],
    },
    no_recomendada_para: {
      posiciones: ["pivot", "ala-pivot"],
      estilos: ["potente"],
    },

    resumen:
      "La Kobe 9 Low Protro es la versión moderna del clásico de 2014, una de las mejores zapatillas de Kobe. Flyknit upper ultraligero, Zoom Air en antepié, outsole herringbone de alto rendimiento. Ligera y precisa como pocas. Ideal para quienes buscan rendimiento puro y estética icónica.",
    pros: [
      "Flyknit upper extremadamente ligero y preciso",
      "Outsole herringbone: agarre excepcional multidireccional",
      "Zoom Air en antepié: respuesta táctil directa",
      "Diseño icónico atemporal",
    ],
    contras: [
      "Amortiguación mínima â€” no apta para jugadores pesados o exteriores",
      "Horma ajustada: puede requerir media talla más",
      "Precio elevado para un retro (180â‚¬)",
      "Sin soporte de tobillo en diseño low",
    ],
    veredicto:
      "Para jugadores que valoran la precisión y el feeling con la pista sobre el cushion. El Flyknit + herringbone hacen de la Kobe 9 Low Protro una de las zapatillas de baloncesto más técnicamente puras disponibles hoy. No para principiantes ni jugadores de exterior.",

    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 180,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/t/kobe-9-low-protro-zapatillas-de-baloncesto-a69NSpgE/IM6119-800", precio_actual: 179.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
      { tienda: "snipes_eu", url: "https://www.awin1.com/cread.php?awinmid=122628&awinaffid=2908587&ued=https%3A%2F%2Fwww.snipes.com%2Fes-es%2Fc%2Fzapatillas%3Fq%3Dkobe%2B9", precio_actual: 180, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-26" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 62. Nike Sabrina 3 â€” Ionescu signature, cushion y agarre
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-sabrina-3",
    slug: "nike-sabrina-3",
    marca: "Nike",
    modelo: "Sabrina 3",
    generacion: 3,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Sabrina Ionescu",
    tecnologia_clave: ["Zoom Air strobel", "React foam", "rubber outsole"],
    predecesor_id: null,
    sucesor_id: null,

    peso_real_g: 330,
    altura: "low",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 9,
      amortiguacion: 8,
      respuesta: 8,
      soporte_lateral: 8,
      estabilidad: 8,
      peso_score: 8,
      durabilidad_outdoor: 6,
      ventilacion: 8,
    },
    categoria_principal: "balanced",
    tags: ["low-top", "signature", "cushion", "agarre", "versatil"],

    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [55, 90],
      estilos: ["equilibrado", "explosivo", "tirador"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
    },

    resumen:
      "La Nike Sabrina 3 es la evolución más completa de la línea Ionescu. Zoom Air strobel full-length para cushion reactivo en todo el pie, React foam para amortiguación duradera, outsole con excelente agarre. Una de las zapatillas más versátiles de Nike para baloncesto en 2025.",
    pros: [
      "Zoom Air strobel full-length: cushion reactivo en todo el pie",
      "Outsole con patrón de herringbone modificado â€” agarre excelente",
      "Estabilidad lateral buena para un low-top",
      "Precio justo para las tecnologías incluidas",
    ],
    contras: [
      "Estética más orientada al juego femenino â€” no a todos gusta",
      "Cushion muy blando puede resultar impreciso para algunos",
      "Sin versión mid para quienes prefieren soporte de tobillo",
    ],
    veredicto:
      "Una zapatilla seria que no debe descartarse por ser femenina en origen. El Zoom Air strobel + React la convierten en una de las opciones más completas de Nike bajo los 130â‚¬. Recomendada para jugadores ágiles de cualquier género.",

    imagen_principal: "/shoes/nike-sabrina-3.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 130,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/t/sabrina-3-zapatillas-de-baloncesto-UrtEcG8G/HF2881-303", precio_actual: 129.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 63. Jordan Tatum 4 â€” Tatum signature, cushion premium
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "jordan-tatum-4",
    slug: "jordan-tatum-4",
    marca: "Jordan",
    modelo: "Tatum 4",
    generacion: 4,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Jayson Tatum",
    tecnologia_clave: ["Zoom Air strobel", "React midsole", "knit upper"],
    predecesor_id: "jordan-tatum-3",
    sucesor_id: null,

    peso_real_g: 345,
    altura: "low",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "knit",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 8,
      respuesta: 8,
      soporte_lateral: 8,
      estabilidad: 7,
      peso_score: 8,
      durabilidad_outdoor: 5,
      ventilacion: 8,
    },
    categoria_principal: "balanced",
    tags: ["low-top", "signature", "cushion", "versatil", "reactiva"],

    ideal_para: {
      posiciones: ["alero", "escolta", "base"],
      peso_jugador_kg: [65, 100],
      estilos: ["equilibrado", "explosivo", "tirador"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
    },

    resumen:
      "La Jordan Tatum 4 es la zapatilla signature más madura de Jayson Tatum. Zoom Air strobel para cushion reactivo en todo el pie, React foam para durabilidad, knit upper preciso. La combinación perfecta para aleros que necesitan un calzado versátil sin renunciar al cushion.",
    pros: [
      "Zoom Air strobel full-length â€” cushion reactivo en todo el pie",
      "Knit upper: sujeción precisa sin puntos de presión",
      "Buen soporte lateral para un low-top",
      "Precio competitivo para su nivel tecnológico",
    ],
    contras: [
      "Sin versión mid â€” solo disponible como low-top",
      "Peso algo superior a otras opciones speed de Nike",
      "Outsole puede desgastarse rápido en exterior",
    ],
    veredicto:
      "Para aleros y escoltas que quieren un calzado con cushion serio sin el precio de la LeBron o la Kobe Protro. La Tatum 4 es una compra inteligente a 90.99â‚¬ â€” probablemente la mejor relación calidad-precio de la línea Jordan signature en 2025.",

    imagen_principal: "/shoes/jordan-tatum-4.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 90,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/t/tatum-4-zapatillas-de-baloncesto-Bbr6tfuA/HQ4614-004", precio_actual: 90.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 64. Nike Zoom Freak 7 â€” Giannis, potencia y estabilidad
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-zoom-freak-7",
    slug: "nike-zoom-freak-7",
    marca: "Nike",
    modelo: "Zoom Freak 7",
    generacion: 7,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Giannis Antetokounmpo",
    tecnologia_clave: ["Zoom Air pods", "foam midsole", "TPU shank"],
    predecesor_id: "nike-zoom-freak-4",
    sucesor_id: null,

    peso_real_g: 390,
    altura: "mid",
    horma: "ancha",
    drop_mm: 12,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 9,
      amortiguacion: 8,
      respuesta: 7,
      soporte_lateral: 9,
      estabilidad: 9,
      peso_score: 5,
      durabilidad_outdoor: 7,
      ventilacion: 7,
    },
    categoria_principal: "cushion-focused",
    tags: ["mid-top", "signature", "potente", "estable", "potente"],

    ideal_para: {
      posiciones: ["pivot", "ala-pivot", "alero"],
      peso_jugador_kg: [85, 130],
      estilos: ["potente", "potente", "potente"],
    },
    no_recomendada_para: {
      posiciones: ["base"],
      estilos: ["explosivo"],
    },

    resumen:
      "La Nike Zoom Freak 7 está diseñada para jugadores de físico potente, como el propio Giannis. Zoom Air pods estratégicamente situados, construcción mid-top para soporte de tobillo, horma ancha para pies grandes o anchos. La opción Nike para interiores y aleros físicos.",
    pros: [
      "Soporte lateral excepcional para interiores",
      "Zoom Air pods dan respuesta en momentos clave",
      "Horma ancha â€” ideal para pies anchos o grandes",
      "Outsole durable, apto para exterior ocasional",
    ],
    contras: [
      "Pesada â€” no apta para jugadores que priorizan velocidad",
      "Amortiguación no tan plush como la LeBron 23",
      "Precio elevado para zapatilla de posición interior",
    ],
    veredicto:
      "La mejor opción Nike para pivots y aleros físicos que necesitan una zapatilla robusta. Si juegas como Giannis â€” potencia, cambios de dirección bruscos, juego en la pintura â€” la Freak 7 es la elección correcta.",

    imagen_principal: "/shoes/nike-zoom-freak-7.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 115,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/t/giannis-freak-7-light-aqua-zapatillas-de-baloncesto-unI5zoUd/HF3450-402", precio_actual: 114.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 65. Nike Giannis Immortality 5 â€” Gama media Giannis, accesible
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-giannis-immortality-5",
    slug: "nike-giannis-immortality-5",
    marca: "Nike",
    modelo: "Giannis Immortality 5",
    generacion: 5,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Giannis Antetokounmpo",
    tecnologia_clave: ["foam cushion", "rubber outsole", "mesh upper"],
    predecesor_id: "nike-giannis-immortality-3",
    sucesor_id: null,

    peso_real_g: 360,
    altura: "low",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 7,
      respuesta: 7,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 7,
      durabilidad_outdoor: 6,
      ventilacion: 8,
    },
    categoria_principal: "balanced",
    tags: ["low-top", "signature", "accesible", "gama-baja"],

    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [60, 100],
      estilos: ["equilibrado", "equilibrado", "equilibrado"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
    },

    resumen:
      "La Giannis Immortality 5 es la línea de entrada al ecosistema de calzado de Giannis. Sin tecnología Zoom Air, pero con foam decente, outsole de buen agarre y upper mesh transpirable. Perfecta para jugadores recreativos, principiantes o quienes tienen presupuesto ajustado.",
    pros: [
      "Precio excelente para una zapatilla con licencia NBA",
      "Outsole con buen agarre en pista cubierta",
      "Ligera para el precio",
      "Upper mesh transpirable",
    ],
    contras: [
      "Sin Zoom Air â€” cushion básico",
      "No apta para juego intensivo o jugadores pesados",
      "Soporte lateral mínimo",
    ],
    veredicto:
      "La mejor opción bajo 90â‚¬ con respaldo de una marca premium. Para juego recreativo, entrenos o como segunda zapatilla, la Immortality 5 es una opción sólida y asequible. Para juego competitivo, invierte en la Freak 7 o la Tatum 4.",

    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 90,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/t/giannis-immortality-5-zapatillas-de-baloncesto-5HW4SGTy/IM5130-700", precio_actual: 89.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 66. Nike GT Cut Academy 2 â€” Gama media del GT Cut, versátil
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-gt-cut-academy-2",
    slug: "nike-gt-cut-academy-2",
    marca: "Nike",
    modelo: "GT Cut Academy 2",
    generacion: 2,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: undefined,
    tecnologia_clave: ["foam cushion", "rubber outsole multidireccional", "synthetic upper"],
    predecesor_id: null,
    sucesor_id: null,

    peso_real_g: 340,
    altura: "low",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "synthetic",

    puntuaciones: {
      traccion: 9,
      amortiguacion: 7,
      respuesta: 7,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 7,
      durabilidad_outdoor: 6,
      ventilacion: 7,
    },
    categoria_principal: "responsive",
    tags: ["low-top", "accesible", "gama-media", "versatil", "agarre"],

    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [60, 90],
      estilos: ["explosivo", "equilibrado", "equilibrado"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
    },

    resumen:
      "La GT Cut Academy 2 lleva el outsole herringbone multidireccional de la GT Cut 4 a un precio más accesible. Sin Zoom Air, pero con agarre excepcional gracias al patrón de outsole del GT Cut. Ideal para jugadores que priorizan el agarre y la agilidad sin pagar precio premium.",
    pros: [
      "Outsole inspirado en el GT Cut 4: agarre multidireccional sobresaliente",
      "Precio muy competitivo (100â‚¬)",
      "Perfil bajo y ligero para jugadores de velocidad",
      "Buena durabilidad para el precio",
    ],
    contras: [
      "Sin Zoom Air â€” cushion básico comparado con el GT Cut 4",
      "Upper sintético menos transpirable que mesh",
      "No tan reactiva como la versión premium",
    ],
    veredicto:
      "Si quieres el agarre del GT Cut 4 sin el gasto, la GT Cut Academy 2 es la respuesta. Perfecta para jugadores de velocidad con presupuesto ajustado o para uso en entrenos intensivos. La relación calidad-precio es excepcional a 99.99â‚¬.",

    imagen_principal: "/shoes/nike-gt-cut-academy-2.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 100,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/t/gt-cut-academy-2-zapatillas-de-baloncesto-KR3H9TWw/HV9774-002", precio_actual: 99.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 67. Puma Stewie 4 â€” Breanna Stewart signature, versatil para interiores
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "puma-stewie-4",
    slug: "puma-stewie-4",
    marca: "Puma",
    modelo: "Stewie 4",
    generacion: 4,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Breanna Stewart",
    tecnologia_clave: ["Nitrofoam midsole", "outsole herringbone", "synthetic upper"],
    predecesor_id: null,
    sucesor_id: null,

    peso_real_g: 355,
    altura: "mid",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "synthetic",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 8,
      respuesta: 7,
      soporte_lateral: 8,
      estabilidad: 8,
      peso_score: 7,
      durabilidad_outdoor: 6,
      ventilacion: 7,
    },
    categoria_principal: "cushion-focused",
    tags: ["mid-top", "signature", "estable", "potente", "versatil"],

    ideal_para: {
      posiciones: ["alero", "ala-pivot", "pivot"],
      peso_jugador_kg: [65, 100],
      estilos: ["equilibrado", "potente", "potente"],
    },
    no_recomendada_para: {
      posiciones: ["base"],
      estilos: ["explosivo"],
    },

    resumen:
      "La Puma Stewie 4 es la zapatilla signature de Breanna Stewart (MVP WNBA), ahora disponible para todos. Nitrofoam para cushion consistente, outsole herringbone para tracción en pista cubierta, y diseño mid-top para soporte de tobillo. Una opción mid-range sólida para jugadores físicos.",
    pros: [
      "Nitrofoam: cushion reactivo y duradero",
      "Outsole herringbone con buen agarre en pista cubierta",
      "Mid-top: soporte de tobillo decente",
      "Precio competitivo a 120â‚¬ para zapatilla con Nitrofoam",
    ],
    contras: [
      "No tan ligera como las opciones speed",
      "Upper sintético menos transpirable que mesh",
      "Estética predominantemente femenina en algunos colorways",
    ],
    veredicto:
      "Una opción sólida y a menudo ignorada en el catálogo Puma. Si juegas en posiciones de interior y buscas Nitrofoam a un precio razonable, la Stewie 4 compite de tú a tú con la Freak 7 y la Curry 13. Merece más atención de la que recibe.",

    imagen_principal: "/shoes/puma-stewie-4.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "puma_es", url: "https://eu.puma.com/es/es/pd/zapatillas-de-baloncesto-stewie-4-most-wanted-para-mujer/312744?search=true&swatch=01", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 68. Jordan Zion 4 â€” potencia y cushion para interiores grandes
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "jordan-zion-4",
    slug: "jordan-zion-4",
    marca: "Jordan",
    modelo: "Zion 4",
    generacion: 4,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Zion Williamson",
    tecnologia_clave: ["React foam midsole", "herringbone outsole", "reinforced upper"],
    predecesor_id: null,
    sucesor_id: null,

    peso_real_g: 425,
    altura: "mid",
    horma: "ancha",
    drop_mm: 11,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 9,
      respuesta: 6,
      soporte_lateral: 8,
      estabilidad: 9,
      peso_score: 3,
      durabilidad_outdoor: 6,
      ventilacion: 6,
    },
    categoria_principal: "cushion-focused",
    tags: ["mid-top", "signature", "potente", "interior", "horma-ancha", "amortiguacion-maxima"],

    ideal_para: {
      posiciones: ["ala-pivot", "pivot"],
      peso_jugador_kg: [90, 140],
      estilos: ["potente"],
    },
    no_recomendada_para: {
      posiciones: ["base", "escolta"],
      estilos: ["explosivo"],
    },

    resumen:
      "La Jordan Zion 4 está diseñada para jugadores corpulentos que necesitan máxima protección y estabilidad. Con React foam de alta densidad y una base reforzada, ofrece el cushion que necesita un jugador físico. La horma ancha es ideal para pies anchos. Precio muy competitivo en rebajas.",
    pros: [
      "React foam de alta densidad: máximo cushion para interiores pesados",
      "Base ultra estable para jugadores de más de 90 kg",
      "Horma ancha: ideal para pies anchos o juego físico",
      "Excelente tracción herringbone",
      "Precio rebajado (~85â‚¬) â€” una de las mejores opciones para pivots",
    ],
    contras: [
      "Muy pesada (~425g) â€” no apta para jugadores de velocidad",
      "Respuesta limitada comparada con opciones más reactivas",
      "Ventilación justa para partidos largos",
      "Estética polarizadora",
    ],
    veredicto:
      "Si juegas de pivot o ala-pivot y pesas más de 90 kg, la Zion 4 es una de las mejores protecciones para rodillas y tobillos del mercado por ~85â‚¬. No es para correr, es para dominar la pintura. Horma ancha, React foam sólido y precio rebajado: difícil de superar para su perfil.",

    imagen_principal: "/shoes/jordan-zion-4.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 149.99,
    links_compra: [
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/product/jordan-zion-4-hombre-zapatillas/314109478504.html", precio_actual: 85, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 69. Adidas AE 3 â€” Anthony Edwards tercera edición, respuesta y agarre
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "adidas-ae-3",
    slug: "adidas-ae-3",
    marca: "Adidas",
    modelo: "AE 3",
    generacion: 3,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Anthony Edwards",
    tecnologia_clave: ["Lightstrike Pro midsole", "herringbone outsole", "mesh upper"],
    predecesor_id: "adidas-ae-2",
    sucesor_id: null,

    peso_real_g: 340,
    altura: "low",
    horma: "normal",
    drop_mm: 9,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 9,
      amortiguacion: 7,
      respuesta: 9,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 8,
      durabilidad_outdoor: 6,
      ventilacion: 8,
    },
    categoria_principal: "responsive",
    tags: ["low-top", "signature", "explosivo", "guards", "lightstrike-pro", "rapido"],

    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [60, 95],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
    },

    resumen:
      "La Adidas AE 3 es la tercera zapatilla signature de Anthony Edwards y su mejor obra hasta ahora. Lightstrike Pro mejorado, outsole herringbone renovado con excelente tracción, y un upper ligero de mesh. Si buscas velocidad y primer paso explosivo en el rango de 130â‚¬, la AE 3 es una de las mejores opciones del mercado.",
    pros: [
      "Lightstrike Pro: respuesta entre las mejores de 2025",
      "Outsole herringbone con tracción top en pistas cubiertas",
      "Upper mesh ligero y bien ventilado",
      "Relación calidad-precio excepcional a 130â‚¬",
      "Perfil bajo para movilidad máxima en guards",
    ],
    contras: [
      "No la ideal para jugadores de más de 95-100 kg",
      "Low-top: no recomendada si tienes historial de esguinces",
      "Durabilidad outdoor moderada",
    ],
    veredicto:
      "La AE 3 es la evolución más lograda de la línea Anthony Edwards: más agarre, más respuesta y mejor fit que las versiones anteriores. A 130â‚¬ compite directamente con la Nike Ja 3 y la GT Cut 4. Si eres guard o escolta y priorizas la reactividad, es una de las compras más inteligentes del año.",

    imagen_principal: "/shoes/adidas-ae-3.jpg",
    imagenes: [],

    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/adidas-ae-3-performance-review/" },
    ],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 129.99,
    links_compra: [
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/product/adidas-anthony-edwards-3-hombre-zapatillas/314109779604.html", precio_actual: 129.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 70. Jordan Luka 4 â€” Luka Doncic 4ª, versatilidad para guards/aleros
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "jordan-luka-4",
    slug: "jordan-luka-4",
    marca: "Jordan",
    modelo: "Luka 4",
    generacion: 4,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Luka Doncic",
    tecnologia_clave: ["Zoom Air unit", "herringbone outsole", "knit upper"],
    predecesor_id: "jordan-luka-3",
    sucesor_id: null,

    peso_real_g: 370,
    altura: "mid",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "knit",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 8,
      respuesta: 7,
      soporte_lateral: 8,
      estabilidad: 8,
      peso_score: 6,
      durabilidad_outdoor: 6,
      ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["mid-top", "signature", "equilibrado", "versatil", "zoom-air"],

    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [70, 105],
      estilos: ["equilibrado", "tirador"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: [],
    },

    resumen:
      "La Jordan Luka 4 continúa la tradición de la línea Doncic: Zoom Air para cushion reactivo, upper de knit para comodidad, y soporte lateral mid-top. Perfecta para guards y aleros que buscan un equilibrio entre amortiguación y respuesta. A 80â‚¬ en rebajas es una auténtica ganga.",
    pros: [
      "Zoom Air: cushion reactivo y responsive",
      "Upper knit: comodidad y ajuste natural al pie",
      "Mid-top: soporte de tobillo superior a low-tops",
      "Perfil equilibrado: serve para múltiples posiciones",
      "Precio rebajado (~80â‚¬) â€” excelente relación calidad-precio",
    ],
    contras: [
      "Algo más pesada que las opciones speed",
      "Upper knit puede desgastarse más rápido en uso outdoor",
      "Respuesta no tan alta como Ja 3 o AE 3",
    ],
    veredicto:
      "Si buscas una zapatilla mid-top bien equilibrada para guards y aleros con Zoom Air a 80â‚¬, la Luka 4 es difícil de superar en su rango de precio. La línea Doncic siempre ha ofrecido buen valor, y la 4ª edición no es excepción. Ideal para el jugador que busca confort y soporte sin sacrificar respuesta.",

    imagen_principal: "/shoes/jordan-luka-4.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 139.99,
    links_compra: [
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/product/jordan-luka-4-hombre-zapatillas/314109477704.html", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 71. Nike Book 1 â€” Devin Booker signature, shooter-oriented
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-book-1",
    slug: "nike-book-1",
    marca: "Nike",
    modelo: "Book 1",
    generacion: 1,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Devin Booker",
    tecnologia_clave: ["Zoom Air forefoot", "herringbone outsole", "knit upper"],
    predecesor_id: null,
    sucesor_id: "nike-book-2",

    peso_real_g: 345,
    altura: "low",
    horma: "normal",
    drop_mm: 9,
    tipo_cierre: "cordones",
    material_superior: "knit",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 7,
      respuesta: 8,
      soporte_lateral: 6,
      estabilidad: 7,
      peso_score: 8,
      durabilidad_outdoor: 6,
      ventilacion: 8,
    },
    categoria_principal: "responsive",
    tags: ["low-top", "signature", "tirador", "guards", "zoom-air", "ligera"],

    ideal_para: {
      posiciones: ["escolta", "alero", "base"],
      peso_jugador_kg: [60, 90],
      estilos: ["tirador", "equilibrado"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
    },

    resumen:
      "La Nike Book 1 es la primera zapatilla signature de Devin Booker, diseñada para el jugador de perímetro que necesita respuesta, agarre y ligereza. Zoom Air en el antepié, outsole herringbone y upper knit que abraza el pie. Actualmente disponible a 60â‚¬ â€” una oportunidad increíble para su nivel de rendimiento.",
    pros: [
      "Zoom Air en el antepié: respuesta notable para tiradores",
      "Outsole herringbone con excelente agarre en pista cubierta",
      "Upper knit cómodo y bien ventilado",
      "Muy ligera para ser una low-top con Zoom",
      "Precio rebajado a 60â‚¬ â€” mejor valor del catálogo Nike actualmente",
    ],
    contras: [
      "Low-top: sin soporte de tobillo superior",
      "No ideal para jugadores físicos de más de 90 kg",
      "Amortiguación moderada (no es la prioridad en este modelo)",
    ],
    veredicto:
      "A 60â‚¬ la Book 1 es probablemente la mejor compra del catálogo Nike ahora mismo para guards y escoltas. Zoom Air, tracción herringbone y comodidad de knit â€” todo lo que necesita un jugador de perímetro, a un precio que no tiene rival. El hecho de que sea la primera edición de Booker le da un punto de coleccionismo extra.",

    imagen_principal: "/shoes/nike-book-1.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/product/nike-book-1-hombre-zapatillas/314109163304.html", precio_actual: 60, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 72. Adidas Harden Vol 10 â€” James Harden, protección máxima para guards pesados
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "adidas-harden-vol-10",
    slug: "adidas-harden-vol-10",
    marca: "Adidas",
    modelo: "Harden Vol 10",
    generacion: 10,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "James Harden",
    tecnologia_clave: ["Lightstrike Pro midsole", "herringbone outsole", "mesh upper"],
    predecesor_id: "adidas-harden-vol-9",
    sucesor_id: null,

    peso_real_g: 390,
    altura: "mid",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 8,
      respuesta: 8,
      soporte_lateral: 8,
      estabilidad: 8,
      peso_score: 5,
      durabilidad_outdoor: 6,
      ventilacion: 7,
    },
    categoria_principal: "cushion-focused",
    tags: ["mid-top", "signature", "equilibrado", "guards", "lightstrike-pro"],

    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [75, 110],
      estilos: ["equilibrado", "tirador"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: [],
    },

    resumen:
      "La Adidas Harden Vol 10 es la décima iteración de la línea de James Harden, con Lightstrike Pro mejorado y un outsole herringbone que ofrece tracción sólida. Mid-top para soporte de tobillo. Diseñada para el guard de físico que necesita cushion y soporte sin perder respuesta. A 160â‚¬ compite en el segmento premium.",
    pros: [
      "Lightstrike Pro: una de las mejores mezclas cushion-respuesta del mercado",
      "Mid-top con soporte lateral elevado",
      "Outsole herringbone con buena tracción",
      "Diseño equilibrado para el guard de físico",
    ],
    contras: [
      "Precio premium (160â‚¬) para un modelo mid-range en prestaciones",
      "Algo más pesada que la competencia directa",
      "Estética que puede no gustar a todos",
    ],
    veredicto:
      "La Harden 10 es la zapatilla definitiva para el guard que pesa entre 85-105 kg y busca Lightstrike Pro con soporte mid-top. Compite con la Luka 5 y la Curry 13 en el mismo rango. Si valoras el equilibrio entre cushion, respuesta y soporte lateral, la Harden 10 es una elección sólida a 160â‚¬.",

    imagen_principal: "/shoes/adidas-harden-vol-10.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 159.99,
    links_compra: [
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/product/adidas-harden-volume-10-hombre-zapatillas/314109881004.html", precio_actual: 159.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 74. NIKE KD 17 â€” Durant signature, cushion equilibrado
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-kd-17",
    slug: "nike-kd-17",
    marca: "Nike",
    modelo: "KD 17",
    generacion: 17,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Kevin Durant",
    tecnologia_clave: ["Zoom Air", "knit upper"],
    predecesor_id: null,
    sucesor_id: "nike-kd-18",
    peso_real_g: 345,
    altura: "low",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "knit",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 8,
      respuesta: 8,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 8,
      durabilidad_outdoor: 6,
      ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["signature", "tope-de-gama", "moderna"],
    ideal_para: {
      posiciones: ["alero", "escolta", "ala-pivot"],
      peso_jugador_kg: [70, 100],
      estilos: ["equilibrado", "tirador", "explosivo"],
      lesiones_compatibles: ["rodillas"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: [] },
    resumen: "La penúltima signature de Kevin Durant combina Zoom Air con un upper de knit muy cómodo. Muy equilibrada en todos los parámetros, perfecta para aleros versátiles.",
    pros: ["Muy equilibrada en todas las métricas", "Ligera para su cushion", "Cómoda desde el primer día"],
    contras: ["Durabilidad outdoor limitada", "Tracción puede perder agarre con polvo"],
    veredicto: "Una de las zapatillas más equilibradas del mercado. Ideal para aleros que quieren un poco de todo sin sacrificar nada.",
    imagen_principal: "/shoes/nike-kd-17.jpg",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/nike-kd-17-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 160,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=kd+17&vst=kd+17", precio_actual: 160, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+kd+17", precio_actual: 155, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 75. NIKE D.O.N. ISSUE 6 â€” Donovan Mitchell, budget signature
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-don-issue-6",
    slug: "nike-don-issue-6",
    marca: "Nike",
    modelo: "D.O.N. Issue 6",
    generacion: 6,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Donovan Mitchell",
    tecnologia_clave: ["Zoom Air", "herringbone outsole"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 370,
    altura: "mid",
    horma: "normal",
    drop_mm: 9,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 9,
      amortiguacion: 7,
      respuesta: 7,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 7,
      durabilidad_outdoor: 8,
      ventilacion: 7,
    },
    categoria_principal: "traction-king",
    tags: ["signature", "value-premium", "moderna"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [65, 90],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "Sexta entrega de la línea signature de Donovan Mitchell. Destaca por su tracción herringbone excepcional y su precio asequible para ser una firma de jugador NBA.",
    pros: ["Tracción de primer nivel", "Buena durabilidad outdoor", "Precio competitivo para signature"],
    contras: ["Algo pesada", "Cushion solo correcto, no destacado"],
    veredicto: "Para jugadores que priorizan el agarre y juegan tanto interior como exterior. Una de las mejores relaciones calidad-precio en signatures.",
    imagen_principal: "/shoes/nike-don-issue-6.jpg",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/nike-don-issue-6-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=don+issue+6&vst=don+issue+6", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+don+issue+6", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 76. PUMA SCOOT ZEROS â€” Scoot Henderson, ultra ligera
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "puma-scoot-zeros",
    slug: "puma-scoot-zeros",
    marca: "Puma",
    modelo: "Scoot Zeros",
    generacion: 1,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Scoot Henderson",
    tecnologia_clave: ["NITRO foam", "herringbone"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 310,
    altura: "low",
    horma: "normal",
    drop_mm: 7,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 7,
      respuesta: 9,
      soporte_lateral: 6,
      estabilidad: 6,
      peso_score: 9,
      durabilidad_outdoor: 6,
      ventilacion: 9,
    },
    categoria_principal: "responsive",
    tags: ["signature", "ligera", "moderna"],
    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [60, 85],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["pivot", "ala-pivot"], estilos: ["potente"] },
    resumen: "Primera signature de Scoot Henderson, uno de los bases más explosivos de la NBA. Ultra ligera con NITRO foam de Puma que ofrece excelente respuesta sin sacrificar cushion.",
    pros: ["Extremadamente ligera", "Muy buena ventilación", "Respuesta excelente para bases explosivos"],
    contras: ["Poco soporte lateral para jugadores grandes", "Durabilidad outdoor mejorable"],
    veredicto: "La elección perfecta para bases ligeros que buscan velocidad y respuesta. No apta para jugadores potentes.",
    imagen_principal: "/shoes/puma-scoot-zeros.jpg",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/puma-scoot-zeros-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "puma_es", url: "https://es.puma.com/es_ES/search?q=scoot+zeros", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=puma+scoot+zeros", precio_actual: 115, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 77. NIKE PG 7 â€” Paul George, budget traction king
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "adidas-dame-8",
    slug: "adidas-dame-8",
    marca: "Adidas",
    modelo: "Dame 8",
    generacion: 8,
    año_lanzamiento: 2023,
    genero: "unisex",
    signature_player: "Damian Lillard",
    tecnologia_clave: ["Lightstrike Pro", "herringbone"],
    predecesor_id: null,
    sucesor_id: "adidas-dame-9",
    peso_real_g: 320,
    altura: "low",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 7,
      respuesta: 9,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 9,
      durabilidad_outdoor: 7,
      ventilacion: 8,
    },
    categoria_principal: "responsive",
    tags: ["signature", "ligera", "value-premium"],
    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [60, 85],
      estilos: ["explosivo", "tirador", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "La Dame 8 con Lightstrike Pro es una de las zapatillas más rápidas de Adidas. Ligera, reactiva y con buena tracción herringbone.",
    pros: ["Muy ligera", "Respuesta excelente", "Buena ventilación"],
    contras: ["Cushion modesto para jugadores pesados", "Soporte lateral básico"],
    veredicto: "Perfecta para bases tiradores que quieren velocidad y reactividad a buen precio.",
    imagen_principal: "/shoes/adidas-dame-8.jpg",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/adidas-dame-8-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=dame+8", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=adidas+dame+8", precio_actual: 95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 79. NIKE ZOOM FREAK 5 â€” Giannis, balanced traction
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-zoom-freak-5",
    slug: "nike-zoom-freak-5",
    marca: "Nike",
    modelo: "Zoom Freak 5",
    generacion: 5,
    año_lanzamiento: 2023,
    genero: "unisex",
    signature_player: "Giannis Antetokounmpo",
    tecnologia_clave: ["Zoom Air", "herringbone", "wide base"],
    predecesor_id: null,
    sucesor_id: "nike-zoom-freak-7",
    peso_real_g: 430,
    altura: "mid",
    horma: "ancha",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 9,
      amortiguacion: 8,
      respuesta: 6,
      soporte_lateral: 9,
      estabilidad: 9,
      peso_score: 5,
      durabilidad_outdoor: 8,
      ventilacion: 5,
    },
    categoria_principal: "cushion-focused",
    tags: ["signature", "tope-de-gama"],
    ideal_para: {
      posiciones: ["ala-pivot", "pivot", "alero"],
      peso_jugador_kg: [85, 130],
      estilos: ["potente", "equilibrado"],
      lesiones_compatibles: ["rodillas", "tobillos"],
    },
    no_recomendada_para: { posiciones: ["base"], estilos: ["explosivo"] },
    resumen: "Diseñada para la potencia de Giannis. Base ultra ancha, soporte lateral masivo y tracción de élite. Para jugadores grandes que dominan la pintura.",
    pros: ["Soporte lateral excepcional", "Tracción de primer nivel", "Estabilidad máxima para jugadores pesados"],
    contras: ["Muy pesada", "Poco court feel", "No apta para juego explosivo"],
    veredicto: "La mejor opción para pívots y ala-pívots potentes que necesitan estabilidad máxima.",
    imagen_principal: "/shoes/nike-zoom-freak-5.jpg",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/nike-zoom-freak-5-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 140,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=zoom+freak+5&vst=zoom+freak+5", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+zoom+freak+5", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 80. ADIDAS EXHIBIT A â€” budget responsive, escolta/alero
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "adidas-exhibit-a",
    slug: "adidas-exhibit-a",
    marca: "Adidas",
    modelo: "Exhibit A",
    generacion: 1,
    año_lanzamiento: 2022,
    genero: "unisex",
    tecnologia_clave: ["Lightstrike", "herringbone"],
    predecesor_id: null,
    sucesor_id: "adidas-exhibit-b",
    peso_real_g: 350,
    altura: "mid",
    horma: "normal",
    drop_mm: 9,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 6,
      respuesta: 7,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 8,
      durabilidad_outdoor: 7,
      ventilacion: 8,
    },
    categoria_principal: "balanced",
    tags: ["budget", "moderna"],
    ideal_para: {
      posiciones: ["escolta", "alero", "base"],
      peso_jugador_kg: [65, 90],
      estilos: ["equilibrado", "explosivo"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "Zapatilla de gama media de Adidas muy equilibrada. Ligera, transpirable y con buena tracción herringbone. Una de las mejores opciones budget de la marca.",
    pros: ["Buen precio", "Muy transpirable", "Tracción sólida"],
    contras: ["Cushion básico", "No destaca en nada en concreto"],
    veredicto: "Buena opción para jugadores con presupuesto ajustado que buscan una zapatilla equilibrada y transpirable.",
    imagen_principal: "/shoes/adidas-exhibit-a.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 80,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=exhibit+a", precio_actual: 65, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+exhibit+a+baloncesto&tag=canchazapa-21", precio_actual: 60, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 81. ADIDAS EXHIBIT B â€” mid-budget responsive
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "adidas-exhibit-b",
    slug: "adidas-exhibit-b",
    marca: "Adidas",
    modelo: "Exhibit B",
    generacion: 2,
    año_lanzamiento: 2023,
    genero: "unisex",
    tecnologia_clave: ["Lightstrike Pro", "herringbone"],
    predecesor_id: "adidas-exhibit-a",
    sucesor_id: null,
    peso_real_g: 340,
    altura: "mid",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 7,
      respuesta: 8,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 8,
      durabilidad_outdoor: 7,
      ventilacion: 8,
    },
    categoria_principal: "balanced",
    tags: ["value-premium", "moderna"],
    ideal_para: {
      posiciones: ["escolta", "alero", "base"],
      peso_jugador_kg: [65, 90],
      estilos: ["equilibrado", "explosivo", "tirador"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "Versión mejorada del Exhibit A con Lightstrike Pro. Más reactiva y ligera que su predecesora, manteniendo el buen precio.",
    pros: ["Mejor cushion que la Exhibit A", "Ligera y transpirable", "Precio muy competitivo"],
    contras: ["Cushion todavía modesto", "Soporte lateral básico"],
    veredicto: "El upgrade perfecto del Exhibit A. Más cushion y reactividad por poco más de precio.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 95,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=exhibit+b", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+exhibit+b+baloncesto&tag=canchazapa-21", precio_actual: 75, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 82. NIKE KYRIE INFINITY 2 â€” budget tracción alta
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-kyrie-infinity-2",
    slug: "nike-kyrie-infinity-2",
    marca: "Nike",
    modelo: "Kyrie Infinity 2",
    generacion: 2,
    año_lanzamiento: 2023,
    genero: "unisex",
    tecnologia_clave: ["Zoom Air", "360° traction"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 365,
    altura: "low",
    horma: "normal",
    drop_mm: 9,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 9,
      amortiguacion: 7,
      respuesta: 8,
      soporte_lateral: 7,
      estabilidad: 6,
      peso_score: 7,
      durabilidad_outdoor: 7,
      ventilacion: 7,
    },
    categoria_principal: "traction-king",
    tags: ["value-premium", "moderna"],
    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [60, 85],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "Sin la firma oficial de Kyrie Irving, Nike relanza el modelo Infinity 2 con la misma tracción 360° que hizo famosa la línea. Gran opción budget para bases.",
    pros: ["Tracción 360° excepcional", "Buena respuesta", "Precio accesible"],
    contras: ["Estabilidad algo baja en comparación con otras Kyrie", "Cushion básico"],
    veredicto: "Para bases que necesitan cambios de dirección rápidos y agarre constante a buen precio.",
    imagen_principal: "/shoes/nike-kyrie-infinity-2.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 100,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=kyrie+infinity+2&vst=kyrie+infinity+2", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+kyrie+infinity+2", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 83. JORDAN xxxviii (38) â€” alto cushion, alero/pivot ligero
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "jordan-xxxviii",
    slug: "jordan-xxxviii",
    marca: "Jordan",
    modelo: "Air Jordan XXXVIII",
    generacion: 38,
    año_lanzamiento: 2023,
    genero: "unisex",
    tecnologia_clave: ["Zoom Air Strobel", "Eclipse Plate"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 395,
    altura: "mid",
    horma: "normal",
    drop_mm: 9,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 9,
      respuesta: 7,
      soporte_lateral: 8,
      estabilidad: 8,
      peso_score: 6,
      durabilidad_outdoor: 6,
      ventilacion: 6,
    },
    categoria_principal: "cushion-focused",
    tags: ["tope-de-gama", "moderna"],
    ideal_para: {
      posiciones: ["alero", "ala-pivot"],
      peso_jugador_kg: [75, 105],
      estilos: ["equilibrado", "potente"],
      lesiones_compatibles: ["rodillas"],
    },
    no_recomendada_para: { posiciones: ["base"], estilos: ["explosivo"] },
    resumen: "La línea Air Jordan en su 38ª edición ofrece Zoom Air Strobel completo para un cushion premium. Ideal para aleros y ala-pívots que buscan protección y estilo.",
    pros: ["Cushion premium", "Muy buena estabilidad", "Icónico diseño Jordan"],
    contras: ["Algo pesada", "Durabilidad outdoor limitada", "Precio alto"],
    veredicto: "Para el jugador que quiere el look y el rendimiento Jordan en una posición versátil. Premium en todo.",
    imagen_principal: "/shoes/jordan-xxxviii.jpg",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/air-jordan-xxxviii-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 180,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=jordan+xxxviii&vst=jordan+xxxviii", precio_actual: 160, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=jordan+xxxviii", precio_actual: 155, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 84. UA JET 23 â€” budget UA, tracción sólida
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "ua-jet-23",
    slug: "ua-jet-23",
    marca: "Under Armour",
    modelo: "Jet 23",
    generacion: 23,
    año_lanzamiento: 2023,
    genero: "unisex",
    tecnologia_clave: ["UA Micro G", "herringbone"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 380,
    altura: "mid",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 7,
      respuesta: 6,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 6,
      durabilidad_outdoor: 8,
      ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["budget", "moderna"],
    ideal_para: {
      posiciones: ["alero", "ala-pivot", "escolta"],
      peso_jugador_kg: [70, 100],
      estilos: ["equilibrado", "potente"],
    },
    no_recomendada_para: { posiciones: [], estilos: ["explosivo"] },
    resumen: "La línea budget de Under Armour con buena durabilidad outdoor. UA Micro G ofrece cushion suficiente para el precio. Ideal para jugadores que buscan una zapatilla fiable sin gastar mucho.",
    pros: ["Excelente precio", "Buena durabilidad outdoor", "Tracción sólida"],
    contras: ["Cushion básico", "No destaca en respuesta", "Algo pesada"],
    veredicto: "La opción más asequible y fiable de UA. Para jugadores con presupuesto ajustado que juegan en pistas mixtas.",
    imagen_principal: "/shoes/ua-jet-23.webp",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 75,
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=under+armour+jet+23+baloncesto&tag=canchazapa-21", precio_actual: 65, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=under+armour+jet+23", precio_actual: 70, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 85. PUMA ALL-PRO NITRO 2 â€” cushion premium, pivot
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "puma-all-pro-nitro-2",
    slug: "puma-all-pro-nitro-2",
    marca: "Puma",
    modelo: "All-Pro NITRO 2",
    generacion: 2,
    año_lanzamiento: 2024,
    genero: "unisex",
    tecnologia_clave: ["NITRO Elite foam", "herringbone"],
    predecesor_id: "puma-all-pro-nitro",
    sucesor_id: null,
    peso_real_g: 400,
    altura: "high",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 9,
      respuesta: 7,
      soporte_lateral: 9,
      estabilidad: 9,
      peso_score: 5,
      durabilidad_outdoor: 7,
      ventilacion: 6,
    },
    categoria_principal: "cushion-focused",
    tags: ["tope-de-gama", "moderna"],
    ideal_para: {
      posiciones: ["pivot", "ala-pivot"],
      peso_jugador_kg: [85, 130],
      estilos: ["potente", "equilibrado"],
      lesiones_compatibles: ["rodillas", "tobillos"],
    },
    no_recomendada_para: { posiciones: ["base"], estilos: ["explosivo"] },
    resumen: "Segunda generación del All-Pro NITRO con el foam NITRO Elite mejorado. Cushion de élite para jugadores grandes. Compite directamente con la LeBron 22 en protección.",
    pros: ["Cushion NITRO Elite excepcional", "Soporte tobillo en high-top", "Estabilidad top para pívots"],
    contras: ["Pesada", "Precio alto", "No apta para juego rápido"],
    veredicto: "La mejor alternativa Puma para pívots y ala-pívots que quieren protección máxima. Compite con LeBron 22 en cushion.",
    imagen_principal: "/shoes/puma-all-pro-nitro-2.jpg",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/puma-all-pro-nitro-2-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 130,
    links_compra: [
      { tienda: "puma_es", url: "https://es.puma.com/es_ES/search?q=all+pro+nitro+2", precio_actual: 130, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=puma+all+pro+nitro+2", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 86. NIKE AIR MAX IMPACT 5 â€” presupuesto, interior básico
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-air-max-impact-5",
    slug: "nike-air-max-impact-5",
    marca: "Nike",
    modelo: "Air Max Impact 5",
    generacion: 5,
    año_lanzamiento: 2024,
    genero: "unisex",
    tecnologia_clave: ["Air Max cushion", "multidirectional traction"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 400,
    altura: "mid",
    horma: "ancha",
    drop_mm: 12,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 7,
      amortiguacion: 8,
      respuesta: 5,
      soporte_lateral: 7,
      estabilidad: 8,
      peso_score: 5,
      durabilidad_outdoor: 7,
      ventilacion: 6,
    },
    categoria_principal: "cushion-focused",
    tags: ["budget", "moderna"],
    ideal_para: {
      posiciones: ["pivot", "ala-pivot", "alero"],
      peso_jugador_kg: [80, 120],
      estilos: ["potente", "equilibrado"],
      lesiones_compatibles: ["rodillas"],
    },
    no_recomendada_para: { posiciones: ["base"], estilos: ["explosivo"] },
    resumen: "La opción más accesible de Nike con Air Max. Sin ser revolucionaria, ofrece cushion decente y estabilidad para jugadores de interior con presupuesto ajustado.",
    pros: ["Precio muy asequible", "Cushion Air Max suficiente", "Estabilidad correcta para su precio"],
    contras: ["Pesada", "Court feel nulo", "No apta para juego explosivo"],
    veredicto: "Para el jugador de interior que quiere cushion Nike sin gastar más de 80â‚¬. Simple y funcional.",
    imagen_principal: "/shoes/nike-air-max-impact-5.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 80,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=air+max+impact+5&vst=air+max+impact+5", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+air+max+impact+5&tag=canchazapa-21", precio_actual: 72, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 87. LI-NING SONIC 12 â€” traction king, mercado chino
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "lining-sonic-12",
    slug: "lining-sonic-12",
    marca: "Li-Ning",
    modelo: "Sonic 12",
    generacion: 12,
    año_lanzamiento: 2024,
    genero: "unisex",
    tecnologia_clave: ["CLOUD III foam", "herringbone", "carbon plate"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 340,
    altura: "low",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 9,
      amortiguacion: 7,
      respuesta: 8,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 8,
      durabilidad_outdoor: 6,
      ventilacion: 8,
    },
    categoria_principal: "traction-king",
    tags: ["value-premium", "moderna"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [65, 90],
      estilos: ["explosivo", "equilibrado", "tirador"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "Una de las mejores zapatillas de tracción por precio del mercado. La Sonic 12 de Li-Ning con carbon plate y CLOUD III foam compite con marcas que doblan su precio.",
    pros: ["Tracción excelente", "Relación calidad-precio imbatible", "Ligera para su rendimiento"],
    contras: ["Durabilidad outdoor limitada", "Difícil de encontrar en tiendas físicas españolas"],
    veredicto: "La alternativa de presupuesto medio más sorprendente. Si no te importa comprar online, bate a zapatillas el doble de caras en tracción.",
    imagen_principal: "/shoes/lining-sonic-12.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 100,
    links_compra: [
      { tienda: "aliexpress", url: "https://s.click.aliexpress.com/e/_c39LpYQ5", precio_actual: 85, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-18" },
      { tienda: "kickscrew", url: "https://www.kickscrew.com/search?q=li+ning+sonic+12", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 88. NIKE GIANNIS IMMORTALITY 4 â€” budget Giannis, tracción
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-giannis-immortality-4",
    slug: "nike-giannis-immortality-4",
    marca: "Nike",
    modelo: "Giannis Immortality 4",
    generacion: 4,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Giannis Antetokounmpo",
    tecnologia_clave: ["Cushlon foam", "herringbone"],
    predecesor_id: "nike-giannis-immortality-3",
    sucesor_id: "nike-giannis-immortality-5",
    peso_real_g: 420,
    altura: "mid",
    horma: "ancha",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 7,
      respuesta: 5,
      soporte_lateral: 8,
      estabilidad: 8,
      peso_score: 5,
      durabilidad_outdoor: 8,
      ventilacion: 6,
    },
    categoria_principal: "traction-king",
    tags: ["signature", "budget"],
    ideal_para: {
      posiciones: ["pivot", "ala-pivot", "alero"],
      peso_jugador_kg: [80, 120],
      estilos: ["potente", "equilibrado"],
      lesiones_compatibles: ["tobillos"],
    },
    no_recomendada_para: { posiciones: ["base"], estilos: ["explosivo"] },
    resumen: "La línea budget de Giannis en su cuarta iteración. Misma base de horma ancha y buena tracción que la Freak, a precio mucho más asequible.",
    pros: ["Excelente precio para una signature", "Buena durabilidad outdoor", "Horma ancha cómoda"],
    contras: ["Muy pesada", "Cushion básico", "Sin tecnología premium"],
    veredicto: "La opción más asequible para jugadores de interior con pie ancho. La Freak budget que funciona.",
    imagen_principal: "/shoes/nike-giannis-immortality-4.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 85,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=giannis+immortality+4&vst=giannis+immortality+4", precio_actual: 85, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=giannis+immortality+4", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 89. NIKE GT RUN 2 â€” cushion para corredores/tiradores
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-gt-run-2",
    slug: "nike-gt-run-2",
    marca: "Nike",
    modelo: "GT Run 2",
    generacion: 2,
    año_lanzamiento: 2023,
    genero: "unisex",
    tecnologia_clave: ["Zoom Air", "React foam"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 360,
    altura: "mid",
    horma: "normal",
    drop_mm: 9,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 7,
      amortiguacion: 8,
      respuesta: 8,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 7,
      durabilidad_outdoor: 6,
      ventilacion: 8,
    },
    categoria_principal: "balanced",
    tags: ["value-premium", "moderna"],
    ideal_para: {
      posiciones: ["escolta", "alero", "base"],
      peso_jugador_kg: [65, 90],
      estilos: ["tirador", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "Nike GT Run 2 equilibra cushion y respuesta con una combinación de Zoom Air y React foam. Para jugadores que corren mucho y necesitan protección sin perder agilidad.",
    pros: ["Buen cushion para el precio", "Muy transpirable", "Respuesta agradable"],
    contras: ["Tracción mejorable en superficies polvorientas", "Durabilidad outdoor justa"],
    veredicto: "Para el escolta tirador que hace mucho trabajo fuera del balón y necesita cushion y transpirabilidad.",
    imagen_principal: "/shoes/nike-gt-run-2.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=gt+run+2&vst=gt+run+2", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+gt+run+2", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 90. JORDAN SUPER/FLY 10 â€” legacy budget Jordan
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "jordan-super-fly-8",
    slug: "jordan-super-fly-8",
    marca: "Jordan",
    modelo: "Super/Fly 8",
    generacion: 10,
    año_lanzamiento: 2024,
    genero: "unisex",
    tecnologia_clave: ["Air", "herringbone"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 395,
    altura: "mid",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 7,
      respuesta: 6,
      soporte_lateral: 8,
      estabilidad: 8,
      peso_score: 6,
      durabilidad_outdoor: 8,
      ventilacion: 6,
    },
    categoria_principal: "balanced",
    tags: ["value-premium"],
    ideal_para: {
      posiciones: ["alero", "ala-pivot", "escolta"],
      peso_jugador_kg: [75, 105],
      estilos: ["equilibrado", "potente"],
    },
    no_recomendada_para: { posiciones: ["base"], estilos: ["explosivo"] },
    resumen: "Décima entrega de la clásica línea Jordan Super/Fly. Versátil, duradera y con buen soporte lateral. Perfecta para jugadores versátiles que no quieren gastar en tope de gama.",
    pros: ["Versátil y duradera", "Buen soporte lateral", "Icónico diseño Jordan"],
    contras: ["Cushion modesto", "Algo pesada"],
    veredicto: "La opción Jordan equilibrada para aleros y ala-pívots con presupuesto medio.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 115,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=jordan+super+fly+10&vst=jordan+super+fly+10", precio_actual: 115, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=jordan+super+fly+10", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 91. PEAK TAICHI FLASH â€” Asian brand, cushion reactivo
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "peak-taichi-flash",
    slug: "peak-taichi-flash",
    marca: "Peak",
    modelo: "TaiChi Flash",
    generacion: 1,
    año_lanzamiento: 2024,
    genero: "unisex",
    tecnologia_clave: ["TaiChi foam", "herringbone"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 330,
    altura: "low",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 8,
      respuesta: 8,
      soporte_lateral: 6,
      estabilidad: 6,
      peso_score: 8,
      durabilidad_outdoor: 6,
      ventilacion: 8,
    },
    categoria_principal: "responsive",
    tags: ["value-premium", "moderna"],
    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [60, 85],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "Peak sorprende con el TaiChi Flash: un foam propio que combina cushion y respuesta a un precio muy competitivo. La opción premium de la marca asiática.",
    pros: ["Cushion y respuesta sorprendentes", "Ligera", "Precio muy competitivo"],
    contras: ["Difícil de encontrar en España", "Soporte lateral básico"],
    veredicto: "Para el jugador aventurero que quiere descubrir marcas asiáticas de calidad. Sorprende en todo por su precio.",
    imagen_principal: "/shoes/peak-taichi-flash.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 90,
    links_compra: [
      { tienda: "aliexpress", url: "https://s.click.aliexpress.com/e/_c4tjkTxx", precio_actual: 75, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 92. NIKE ZOOM FREAK 6 â€” Giannis mid-gen
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-zoom-freak-6",
    slug: "nike-zoom-freak-6",
    marca: "Nike",
    modelo: "Zoom Freak 6",
    generacion: 6,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Giannis Antetokounmpo",
    tecnologia_clave: ["Zoom Air", "wide herringbone"],
    predecesor_id: "nike-zoom-freak-5",
    sucesor_id: "nike-zoom-freak-7",
    peso_real_g: 415,
    altura: "mid",
    horma: "ancha",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 9,
      amortiguacion: 8,
      respuesta: 6,
      soporte_lateral: 9,
      estabilidad: 9,
      peso_score: 5,
      durabilidad_outdoor: 8,
      ventilacion: 5,
    },
    categoria_principal: "cushion-focused",
    tags: ["signature", "tope-de-gama"],
    ideal_para: {
      posiciones: ["ala-pivot", "pivot", "alero"],
      peso_jugador_kg: [85, 130],
      estilos: ["potente", "equilibrado"],
      lesiones_compatibles: ["rodillas", "tobillos"],
    },
    no_recomendada_para: { posiciones: ["base"], estilos: ["explosivo"] },
    resumen: "Versión mejorada de la Freak 5 con mejor Zoom Air y materiales más refinados. Sigue siendo la referencia para pivots y ala-pívots de gran envergadura.",
    pros: ["Soporte lateral excepcional", "Mejor cushion que la Freak 5", "Durabilidad outdoor sólida"],
    contras: ["Muy pesada", "Cara para su propuesta"],
    veredicto: "Para pívots y ala-pívots potentes que quieren la mejor protección de Nike a precio alto.",
    imagen_principal: "/shoes/nike-zoom-freak-6.jpg",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/nike-zoom-freak-6-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 150,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=zoom+freak+6&vst=zoom+freak+6", precio_actual: 150, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+zoom+freak+6", precio_actual: 140, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 93. ADIDAS CROSS EM UP 5 â€” budget all-round
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "adidas-cross-em-up-5",
    slug: "adidas-cross-em-up-5",
    marca: "Adidas",
    modelo: "Cross Em Up 5",
    generacion: 5,
    año_lanzamiento: 2023,
    genero: "gs",
    tecnologia_clave: ["Bounce foam", "herringbone"],
    predecesor_id: null,
    sucesor_id: "adidas-cross-em-up-select",
    peso_real_g: 355,
    altura: "mid",
    horma: "normal",
    drop_mm: 9,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 6,
      respuesta: 7,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 7,
      durabilidad_outdoor: 8,
      ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["budget", "junior"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [45, 75],
      estilos: ["equilibrado", "explosivo"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "La zapatilla junior de Adidas más popular. Bounce foam básico, buena tracción y durabilidad outdoor. Perfecta para jóvenes jugadores que empiezan.",
    pros: ["Precio muy asequible para junior", "Buena durabilidad outdoor", "Tracción sólida"],
    contras: ["Cushion básico", "No apta para adultos pesados"],
    veredicto: "La referencia budget para jugadores junior. Funcional, duradera y asequible.",
    imagen_principal: "/shoes/adidas-cross-em-up-5.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 65,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=cross+em+up+5", precio_actual: 55, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+cross+em+up+5&tag=canchazapa-21", precio_actual: 50, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 94. NIKE LEBRON WITNESS 8 â€” budget LeBron
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-lebron-witness-8",
    slug: "nike-lebron-witness-8",
    marca: "Nike",
    modelo: "LeBron Witness 8",
    generacion: 8,
    año_lanzamiento: 2023,
    genero: "unisex",
    tecnologia_clave: ["Air Max cushion", "herringbone"],
    predecesor_id: null,
    sucesor_id: "nike-lebron-witness-9",
    peso_real_g: 415,
    altura: "mid",
    horma: "ancha",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 8,
      respuesta: 5,
      soporte_lateral: 8,
      estabilidad: 8,
      peso_score: 5,
      durabilidad_outdoor: 8,
      ventilacion: 6,
    },
    categoria_principal: "cushion-focused",
    tags: ["budget", "moderna"],
    ideal_para: {
      posiciones: ["pivot", "ala-pivot", "alero"],
      peso_jugador_kg: [80, 120],
      estilos: ["potente", "equilibrado"],
      lesiones_compatibles: ["rodillas"],
    },
    no_recomendada_para: { posiciones: ["base"], estilos: ["explosivo"] },
    resumen: "La línea presupuesto de LeBron con Air Max. Ofrece la estética y cushion LeBron a un precio accesible. La Witness es la puerta de entrada al universo James.",
    pros: ["Precio muy asequible para la marca LeBron", "Buen cushion para su precio", "Duradera"],
    contras: ["Pesada", "Sin tecnología premium", "Tracción básica"],
    veredicto: "Para el fan de LeBron con presupuesto ajustado. Cushion correcto a precio justo.",
    imagen_principal: "/shoes/nike-lebron-witness-8.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 90,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=lebron+witness+8&vst=lebron+witness+8", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+lebron+witness+8&tag=canchazapa-21", precio_actual: 80, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+lebron+witness+8", precio_actual: 85, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 95. NEW BALANCE KAWHI 1 â€” signature Kawhi, traction
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nb-kawhi-1",
    slug: "nb-kawhi-1",
    marca: "New Balance",
    modelo: "Kawhi 1",
    generacion: 1,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Kawhi Leonard",
    tecnologia_clave: ["FuelCell foam", "herringbone"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 385,
    altura: "low",
    horma: "normal",
    drop_mm: 9,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 9,
      amortiguacion: 8,
      respuesta: 7,
      soporte_lateral: 8,
      estabilidad: 8,
      peso_score: 6,
      durabilidad_outdoor: 8,
      ventilacion: 7,
    },
    categoria_principal: "traction-king",
    tags: ["signature", "tope-de-gama", "moderna"],
    ideal_para: {
      posiciones: ["alero", "ala-pivot", "escolta"],
      peso_jugador_kg: [75, 105],
      estilos: ["equilibrado", "potente"],
      lesiones_compatibles: ["rodillas"],
    },
    no_recomendada_para: { posiciones: ["base"], estilos: ["explosivo"] },
    resumen: "Primera signature de Kawhi Leonard con New Balance. FuelCell foam con tracción herringbone de primer nivel. Refleja el juego metódico y potente de The Klaw.",
    pros: ["Tracción excepcional", "Cushion premium con FuelCell", "Durabilidad outdoor excelente"],
    contras: ["Algo pesada para aleros ágiles", "Precio alto para NB"],
    veredicto: "La primera y esperada signature de Kawhi no decepciona. Para aleros que quieren tracción y cushion a partes iguales.",
    imagen_principal: "/shoes/nb-kawhi-1.jpg",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/new-balance-kawhi-1-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 150,
    links_compra: [
      { tienda: "nb_es", url: "https://www.newbalance.es/es/buscar?q=kawhi+1", precio_actual: 150, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=new+balance+kawhi+1", precio_actual: 140, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 96. ANTA GORgordon HAY 1 â€” budget Anta, exterior
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "anta-shock-wave-5",
    slug: "anta-shock-wave-5",
    marca: "Anta",
    modelo: "Shock Wave 5",
    generacion: 5,
    año_lanzamiento: 2024,
    genero: "unisex",
    tecnologia_clave: ["A-Flashfoam", "herringbone"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 360,
    altura: "mid",
    horma: "normal",
    drop_mm: 9,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 7,
      respuesta: 7,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 7,
      durabilidad_outdoor: 9,
      ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["value-premium", "moderna"],
    ideal_para: {
      posiciones: ["alero", "escolta", "ala-pivot"],
      peso_jugador_kg: [70, 100],
      estilos: ["equilibrado", "potente"],
    },
    no_recomendada_para: { posiciones: [], estilos: ["explosivo"] },
    resumen: "Anta Shock Wave 5 con A-Flashfoam: la mejor zapatilla de exterior de la marca china. Durabilidad outdoor excepcional y tracción constante en cualquier superficie.",
    pros: ["Durabilidad outdoor líder en su precio", "Tracción constante en exterior", "Buena relación calidad-precio"],
    contras: ["No destaca en rendimiento indoor premium", "Difícil de encontrar en tiendas físicas"],
    veredicto: "La zapatilla ideal para quien juega principalmente en pistas exteriores y quiere durabilidad máxima a precio razonable.",
    imagen_principal: "/shoes/anta-shock-wave-5.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 90,
    links_compra: [
      { tienda: "aliexpress", url: "https://s.click.aliexpress.com/e/_c3574IK9", precio_actual: 75, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-18" },
      { tienda: "kickscrew", url: "https://www.kickscrew.com/search?q=anta+shock+wave+5", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 97. NIKE SABRINA 1 â€” signature Sabrina Ionescu gen 1
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-sabrina-1",
    slug: "nike-sabrina-1",
    marca: "Nike",
    modelo: "Sabrina 1",
    generacion: 1,
    año_lanzamiento: 2023,
    genero: "women",
    signature_player: "Sabrina Ionescu",
    tecnologia_clave: ["Zoom Air", "herringbone 360°"],
    predecesor_id: null,
    sucesor_id: "nike-sabrina-2",
    peso_real_g: 300,
    altura: "low",
    horma: "normal",
    drop_mm: 7,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 9,
      amortiguacion: 7,
      respuesta: 9,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 9,
      durabilidad_outdoor: 7,
      ventilacion: 8,
    },
    categoria_principal: "traction-king",
    tags: ["signature", "ligera", "women", "moderna"],
    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [50, 80],
      estilos: ["explosivo", "tirador", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "La primera signature de Sabrina Ionescu fue un éxito rotundo. Ultra ligera, con tracción 360° y respuesta excelente. Pensada para bases explosivas pero unisex en la práctica.",
    pros: ["Ultra ligera", "Tracción 360° excepcional", "Respuesta muy alta"],
    contras: ["Cushion modesto para jugadores pesados", "Poco soporte tobillo"],
    veredicto: "La zapatilla para bases explosivos (hombre o mujer) que quieren lo más rápido del mercado Nike.",
    imagen_principal: "/shoes/nike-sabrina-1.jpg",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/nike-sabrina-1-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=sabrina+1&vst=sabrina+1", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+sabrina+1", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 98. ADIDAS HARDEN STEPBACK 4 â€” budget Harden
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "adidas-harden-stepback-4",
    slug: "adidas-harden-stepback-4",
    marca: "Adidas",
    modelo: "Harden Stepback 4",
    generacion: 4,
    año_lanzamiento: 2023,
    genero: "unisex",
    signature_player: "James Harden",
    tecnologia_clave: ["Bounce foam", "herringbone"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 370,
    altura: "low",
    horma: "normal",
    drop_mm: 9,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 7,
      respuesta: 7,
      soporte_lateral: 6,
      estabilidad: 6,
      peso_score: 7,
      durabilidad_outdoor: 7,
      ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["signature", "budget"],
    ideal_para: {
      posiciones: ["escolta", "base", "alero"],
      peso_jugador_kg: [65, 90],
      estilos: ["tirador", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "La línea budget de Harden con Bounce foam y buena tracción herringbone. Pensada para escoltas y bases que quieren un modelo signature accesible.",
    pros: ["Precio muy asequible para una signature", "Tracción sólida", "Cómoda desde el primer uso"],
    contras: ["Cushion básico", "Estabilidad lateral limitada"],
    veredicto: "La opción más económica para el fan de Harden. Funcional y asequible para juego perimetral.",
    imagen_principal: "/shoes/adidas-harden-stepback-4.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 80,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=harden+stepback+4", precio_actual: 70, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+harden+stepback+4&tag=canchazapa-21", precio_actual: 65, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 99. NIKE KYRIE FLYTRAP 6 â€” ultra budget base/escolta
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-kyrie-flytrap-6",
    slug: "nike-kyrie-flytrap-6",
    marca: "Nike",
    modelo: "Kyrie Flytrap 6",
    generacion: 6,
    año_lanzamiento: 2023,
    genero: "unisex",
    tecnologia_clave: ["Cushlon foam", "herringbone"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 375,
    altura: "mid",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 6,
      respuesta: 7,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 7,
      durabilidad_outdoor: 8,
      ventilacion: 7,
    },
    categoria_principal: "traction-king",
    tags: ["budget"],
    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [60, 85],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "La opción más barata de la familia Kyrie. Tracción sólida y durabilidad outdoor para bases y escoltas que buscan el ADN Kyrie sin gastar más de 70â‚¬.",
    pros: ["Precio muy asequible", "Buena tracción", "Duradera en outdoor"],
    contras: ["Cushion básico", "Sin tecnología premium"],
    veredicto: "El punto de entrada a las Kyrie. Para jugadores de base con presupuesto ajustado que valoran el agarre.",
    imagen_principal: "/shoes/nike-kyrie-flytrap-6.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 70,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=kyrie+flytrap+6&vst=kyrie+flytrap+6", precio_actual: 70, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+kyrie+flytrap+6&tag=canchazapa-21", precio_actual: 60, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 100. JORDAN LUKA 1 â€” primera signature Doncic
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "jordan-luka-1",
    slug: "jordan-luka-1",
    marca: "Jordan",
    modelo: "Luka 1",
    generacion: 1,
    año_lanzamiento: 2022,
    genero: "unisex",
    signature_player: "Luka DonÄiÄ‡",
    tecnologia_clave: ["Zoom Air", "wide base", "herringbone"],
    predecesor_id: null,
    sucesor_id: "jordan-luka-2",
    peso_real_g: 400,
    altura: "mid",
    horma: "ancha",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 8,
      respuesta: 6,
      soporte_lateral: 8,
      estabilidad: 9,
      peso_score: 5,
      durabilidad_outdoor: 7,
      ventilacion: 6,
    },
    categoria_principal: "cushion-focused",
    tags: ["signature", "tope-de-gama"],
    ideal_para: {
      posiciones: ["alero", "ala-pivot", "escolta"],
      peso_jugador_kg: [80, 110],
      estilos: ["potente", "equilibrado"],
      lesiones_compatibles: ["rodillas", "tobillos"],
    },
    no_recomendada_para: { posiciones: ["base"], estilos: ["explosivo"] },
    resumen: "La primera signature de Luka DonÄiÄ‡ sorprendió con una base ultra ancha y estabilidad excelente. Pensada para jugadores potentes y versátiles como el propio Luka.",
    pros: ["Estabilidad excepcional", "Horma ancha muy cómoda", "Cushion sólido"],
    contras: ["Pesada", "Respuesta baja para un alero ágil"],
    veredicto: "Para el jugador al estilo Luka: potente, técnico y que necesita una base sólida. Ahora a precios de outlet muy interesantes.",
    imagen_principal: "/shoes/jordan-luka-1.jpg",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/jordan-luka-1-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 140,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=jordan+luka+1&vst=jordan+luka+1", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=jordan+luka+1", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 101. UA HOVR HAVOC 5 â€” cushion mid UA
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "ua-hovr-havoc-5",
    slug: "ua-hovr-havoc-5",
    marca: "Under Armour",
    modelo: "HOVR Havoc 5",
    generacion: 5,
    año_lanzamiento: 2024,
    genero: "unisex",
    tecnologia_clave: ["UA HOVR foam", "herringbone"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 390,
    altura: "mid",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 8,
      respuesta: 7,
      soporte_lateral: 8,
      estabilidad: 8,
      peso_score: 6,
      durabilidad_outdoor: 7,
      ventilacion: 7,
    },
    categoria_principal: "cushion-focused",
    tags: ["value-premium", "moderna"],
    ideal_para: {
      posiciones: ["alero", "ala-pivot", "escolta"],
      peso_jugador_kg: [75, 105],
      estilos: ["equilibrado", "potente"],
      lesiones_compatibles: ["rodillas"],
    },
    no_recomendada_para: { posiciones: ["base"], estilos: ["explosivo"] },
    resumen: "UA HOVR Havoc 5 con el foam HOVR mejorado. Cushion premium de UA para jugadores versátiles que buscan protección y estabilidad a precio razonable.",
    pros: ["HOVR foam excelente para cushion", "Buen soporte lateral", "Precio competitivo vs Nike/Adidas"],
    contras: ["Algo pesada", "Court feel reducido"],
    veredicto: "La alternativa UA más equilibrada para aleros y ala-pívots. Más barata que las grandes firmas con rendimiento similar.",
    imagen_principal: "/shoes/ua-hovr-havoc-5.webp",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=under+armour+hovr+havoc+5&tag=canchazapa-21", precio_actual: 95, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=under+armour+hovr+havoc+5", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 102. NIKE AIR ZOOM CROSSOVER 2 â€” junior/youth budget
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-air-zoom-crossover-2",
    slug: "nike-air-zoom-crossover-2",
    marca: "Nike",
    modelo: "Air Zoom Crossover 2",
    generacion: 2,
    año_lanzamiento: 2023,
    genero: "gs",
    tecnologia_clave: ["Zoom Air", "herringbone"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 330,
    altura: "mid",
    horma: "normal",
    drop_mm: 9,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 7,
      respuesta: 7,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 8,
      durabilidad_outdoor: 7,
      ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["budget", "junior"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [40, 70],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "La zapatilla junior de Nike con Zoom Air a precio accesible. Perfecta para jóvenes jugadores que quieren tecnología Nike sin el precio tope de gama.",
    pros: ["Zoom Air a buen precio", "Ligera para junior", "Buena tracción"],
    contras: ["No apta para adultos pesados", "Cushion básico para uso intensivo"],
    veredicto: "La mejor opción Nike para jugadores junior que quieren rendimiento real sin gastar más de 75â‚¬.",
    imagen_principal: "/shoes/nike-air-zoom-crossover-2.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 75,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=air+zoom+crossover+2&vst=air+zoom+crossover+2", precio_actual: 75, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+air+zoom+crossover+2", precio_actual: 65, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 103. ADIDAS OWNTHEGAME 3 â€” ultra budget, iniciación
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "adidas-ownthegame-3",
    slug: "adidas-ownthegame-3",
    marca: "Adidas",
    modelo: "OwnTheGame 3",
    generacion: 3,
    año_lanzamiento: 2024,
    genero: "unisex",
    tecnologia_clave: ["Bounce foam", "rubber outsole"],
    predecesor_id: "adidas-ownthegame-2",
    sucesor_id: null,
    peso_real_g: 385,
    altura: "mid",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "synthetic",
    puntuaciones: {
      traccion: 7,
      amortiguacion: 6,
      respuesta: 5,
      soporte_lateral: 6,
      estabilidad: 7,
      peso_score: 6,
      durabilidad_outdoor: 7,
      ventilacion: 6,
    },
    categoria_principal: "balanced",
    tags: ["budget"],
    ideal_para: {
      posiciones: ["alero", "ala-pivot", "escolta"],
      peso_jugador_kg: [60, 95],
      estilos: ["equilibrado"],
    },
    no_recomendada_para: { posiciones: [], estilos: ["explosivo"] },
    resumen: "La opción más económica de Adidas para baloncesto. Sin pretensiones: funcional, duradera y asequible para iniciación o uso recreativo.",
    pros: ["Precio imbatible", "Durable para el precio", "Disponible en cualquier tienda"],
    contras: ["Sin tecnología destacable", "Cushion y respuesta básicos", "No apta para competición seria"],
    veredicto: "Para el jugador recreativo o principiante que quiere estrenar marca Adidas sin gastar más de 55â‚¬.",
    imagen_principal: "/shoes/adidas-ownthegame-3.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 55,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=ownthegame+3", precio_actual: 55, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+ownthegame+3+baloncesto&tag=canchazapa-21", precio_actual: 48, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 104. NEW BALANCE OMN1S â€” retro performance, traction
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nb-omn1s",
    slug: "nb-omn1s",
    marca: "New Balance",
    modelo: "OMN1S",
    generacion: 1,
    año_lanzamiento: 2019,
    genero: "unisex",
    tecnologia_clave: ["FuelCell foam", "herringbone"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 370,
    altura: "low",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 9,
      amortiguacion: 7,
      respuesta: 8,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 7,
      durabilidad_outdoor: 7,
      ventilacion: 7,
    },
    categoria_principal: "traction-king",
    tags: ["value-premium"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [65, 90],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "El clásico moderno de New Balance. La OMN1S fue el punto de inflexión de la marca en baloncesto. Tracción herringbone excepcional y FuelCell reactivo. Disponible a precios de outlet.",
    pros: ["Tracción de élite", "FuelCell reactivo", "Ahora muy asequible en outlet"],
    contras: ["Modelo antiguo (2019)", "Difícil de encontrar en tallas completas"],
    veredicto: "Si la encuentras en tu talla, es una de las mejores relaciones calidad-precio del mercado. Tracción imbatible.",
    imagen_principal: "/shoes/nb-omn1s.jpg",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/new-balance-omn1s-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 130,
    links_compra: [
      { tienda: "nb_es", url: "https://www.newbalance.es/es/buscar?q=omn1s", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=new+balance+omn1s&tag=canchazapa-21", precio_actual: 80, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 105. PUMA PLAYMAKER PRO MID â€” budget Puma, soporte tobillo
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "puma-playmaker-pro-mid",
    slug: "puma-playmaker-pro-mid",
    marca: "Puma",
    modelo: "Playmaker Pro Mid",
    generacion: 1,
    año_lanzamiento: 2023,
    genero: "unisex",
    tecnologia_clave: ["NITRO foam", "herringbone"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 370,
    altura: "mid",
    horma: "normal",
    drop_mm: 9,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 7,
      respuesta: 7,
      soporte_lateral: 8,
      estabilidad: 8,
      peso_score: 7,
      durabilidad_outdoor: 7,
      ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["value-premium"],
    ideal_para: {
      posiciones: ["alero", "escolta", "ala-pivot"],
      peso_jugador_kg: [70, 100],
      estilos: ["equilibrado"],
      lesiones_compatibles: ["tobillos"],
    },
    no_recomendada_para: { posiciones: [], estilos: ["explosivo"] },
    resumen: "Puma Playmaker Pro Mid con NITRO foam. Buen soporte de tobillo gracias al corte mid, tracción sólida y precio muy competitivo para la tecnología que ofrece.",
    pros: ["NITRO foam a precio asequible", "Buen soporte tobillo mid", "Tracción consistente"],
    contras: ["No destaca en ningún parámetro top", "Algo pesada"],
    veredicto: "Para jugadores con historial de torceduras que buscan soporte tobillo a precio medio sin gastar en tope de gama.",
    imagen_principal: "/shoes/puma-playmaker-pro-mid.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 90,
    links_compra: [
      { tienda: "puma_es", url: "https://es.puma.com/es_ES/search?q=playmaker+pro+mid", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=puma+playmaker+pro+mid+baloncesto&tag=canchazapa-21", precio_actual: 80, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 106. LI-NING YU SHUAI 18 â€” premium chino, traction/responsive
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "lining-yu-shuai-18",
    slug: "lining-yu-shuai-18",
    marca: "Li-Ning",
    modelo: "Yu Shuai 18",
    generacion: 18,
    año_lanzamiento: 2024,
    genero: "unisex",
    tecnologia_clave: ["CLOUD IV foam", "carbon plate", "herringbone"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 320,
    altura: "low",
    horma: "normal",
    drop_mm: 7,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 9,
      amortiguacion: 8,
      respuesta: 9,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 9,
      durabilidad_outdoor: 6,
      ventilacion: 9,
    },
    categoria_principal: "responsive",
    tags: ["tope-de-gama", "ligera", "moderna"],
    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [60, 85],
      estilos: ["explosivo", "tirador", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "La línea premium de Li-Ning para guard players. CLOUD IV foam con carbon plate, tracción excepcional y peso ultra reducido. Compite con las mejores Adidas y Nike del mercado.",
    pros: ["Rendimiento de élite a precio chino", "Ultra ligera con carbon plate", "Tracción y respuesta excepcionales"],
    contras: ["Difícil de encontrar en España", "Durabilidad outdoor mejorable", "Tallas asiáticas (suelen ser más pequeñas)"],
    veredicto: "Para el jugador dispuesto a comprar online y descubrir lo mejor del mercado asiático. Rendimiento de gama alta a mitad de precio.",
    imagen_principal: "/shoes/lining-yu-shuai-18.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "aliexpress", url: "https://s.click.aliexpress.com/e/_c4ttOCV7", precio_actual: 100, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-18" },
      { tienda: "kickscrew", url: "https://www.kickscrew.com/search?q=li+ning+yu+shuai+18", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 107. NIKE KD 16 â€” Durant pre-18, balanced
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-kd-16",
    slug: "nike-kd-16",
    marca: "Nike",
    modelo: "KD 16",
    generacion: 16,
    año_lanzamiento: 2023,
    genero: "unisex",
    signature_player: "Kevin Durant",
    tecnologia_clave: ["Zoom Air", "Cushlon foam"],
    predecesor_id: null,
    sucesor_id: "nike-kd-17",
    peso_real_g: 355,
    altura: "low",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 8,
      respuesta: 7,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 7,
      durabilidad_outdoor: 6,
      ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["signature", "tope-de-gama"],
    ideal_para: {
      posiciones: ["alero", "escolta", "ala-pivot"],
      peso_jugador_kg: [70, 100],
      estilos: ["equilibrado", "tirador"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: [] },
    resumen: "La KD 16 con Zoom Air sigue la tradición equilibrada de la línea Durant. Ahora disponible a precios de outlet muy atractivos.",
    pros: ["Muy equilibrada", "Ahora a precios reducidos de outlet", "Cómoda para aleros versátiles"],
    contras: ["Durabilidad outdoor básica", "Superada por la KD 17 en todo"],
    veredicto: "Si la encuentras de oferta, es una excelente zapatilla para aleros. La predecesora directa de la KD 17.",
    imagen_principal: "/shoes/nike-kd-16.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 160,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=kd+16&vst=kd+16", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+kd+16", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 108. ADIDAS AE 1.5 â€” Anthony Edwards mid-gen
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "adidas-ae-1-5",
    slug: "adidas-ae-1-5",
    marca: "Adidas",
    modelo: "AE 1.5",
    generacion: 2,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Anthony Edwards",
    tecnologia_clave: ["Lightstrike Pro", "herringbone"],
    predecesor_id: "adidas-ae-1",
    sucesor_id: "adidas-ae-2",
    peso_real_g: 325,
    altura: "low",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 7,
      respuesta: 9,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 9,
      durabilidad_outdoor: 6,
      ventilacion: 8,
    },
    categoria_principal: "responsive",
    tags: ["signature", "ligera", "moderna"],
    ideal_para: {
      posiciones: ["escolta", "base", "alero"],
      peso_jugador_kg: [65, 90],
      estilos: ["explosivo", "tirador"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "La versión intermedia entre AE 1 y AE 2. Lightstrike Pro refinado con nueva upper más transpirable. Una de las zapatillas más rápidas de 2024.",
    pros: ["Rapidísima y muy ligera", "Excelente respuesta Lightstrike Pro", "Muy transpirable"],
    contras: ["Durabilidad outdoor limitada", "Cushion modesto para jugadores pesados"],
    veredicto: "Para escoltas explosivos tipo Ant Edwards que necesitan velocidad pura.",
    imagen_principal: "/shoes/adidas-ae-1-5.jpg",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/adidas-ae-1-5-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 130,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=ae+1.5", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=adidas+ae+1.5", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 109. CONVERSE ALL STAR PRO BB â€” retro performance
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "converse-all-star-pro-bb",
    slug: "converse-all-star-pro-bb",
    marca: "Converse",
    modelo: "All Star Pro BB",
    generacion: 1,
    año_lanzamiento: 2019,
    genero: "unisex",
    tecnologia_clave: ["Nike Zoom Air", "herringbone"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 390,
    altura: "high",
    horma: "normal",
    drop_mm: 9,
    tipo_cierre: "cordones",
    material_superior: "leather",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 8,
      respuesta: 7,
      soporte_lateral: 9,
      estabilidad: 8,
      peso_score: 5,
      durabilidad_outdoor: 7,
      ventilacion: 5,
    },
    categoria_principal: "cushion-focused",
    tags: ["tope-de-gama"],
    ideal_para: {
      posiciones: ["escolta", "alero", "ala-pivot"],
      peso_jugador_kg: [75, 105],
      estilos: ["equilibrado", "potente"],
      lesiones_compatibles: ["tobillos"],
    },
    no_recomendada_para: { posiciones: ["base"], estilos: ["explosivo"] },
    resumen: "Converse vuelve al baloncesto de rendimiento con Nike Zoom Air. Diseño high-top icónico con tecnología moderna. Para el jugador que quiere estilo y soporte tobillo premium.",
    pros: ["Soporte tobillo high-top excepcional", "Nike Zoom Air integrado", "Diseño icónico único"],
    contras: ["Pesada", "Ventilación escasa (leather upper)", "Precio elevado para Converse"],
    veredicto: "Para jugadores con problemas de tobillo que también quieren el look más icónico del baloncesto con tecnología moderna.",
    imagen_principal: "/shoes/converse-all-star-pro-bb.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 140,
    links_compra: [
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=converse+all+star+pro+bb", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=converse+all+star+pro+bb&tag=canchazapa-21", precio_actual: 110, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 110. NIKE PRECISION 7 â€” entry-level Nike
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-precision-7",
    slug: "nike-precision-7",
    marca: "Nike",
    modelo: "Precision 7",
    generacion: 7,
    año_lanzamiento: 2023,
    genero: "unisex",
    tecnologia_clave: ["Phylon foam", "herringbone"],
    predecesor_id: null,
    sucesor_id: "nike-precision-8",
    peso_real_g: 380,
    altura: "mid",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 7,
      amortiguacion: 6,
      respuesta: 5,
      soporte_lateral: 6,
      estabilidad: 7,
      peso_score: 6,
      durabilidad_outdoor: 7,
      ventilacion: 6,
    },
    categoria_principal: "balanced",
    tags: ["budget"],
    ideal_para: {
      posiciones: ["alero", "ala-pivot", "escolta"],
      peso_jugador_kg: [65, 95],
      estilos: ["equilibrado"],
    },
    no_recomendada_para: { posiciones: [], estilos: ["explosivo"] },
    resumen: "La línea de entrada de Nike para baloncesto. Sin pretensiones técnicas pero con el nombre y la calidad de construcción Nike a precio mínimo.",
    pros: ["Precio de entrada Nike más bajo", "Durable para uso recreativo", "Disponible en cualquier tienda"],
    contras: ["Sin tecnología destacable", "Solo para uso recreativo o entrenamiento básico"],
    veredicto: "Para el jugador que quiere estrenar Nike sin gastar más de 65â‚¬. La puerta de entrada a la marca.",
    imagen_principal: "/shoes/nike-precision-7.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 65,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=precision+7&vst=precision+7", precio_actual: 65, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+precision+7+baloncesto&tag=canchazapa-21", precio_actual: 55, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // NIKE JA 1 â€” Traction king del guard explosivo
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-ja-1",
    slug: "nike-ja-1",
    marca: "Nike",
    modelo: "Ja 1",
    generacion: 1,
    año_lanzamiento: 2023,
    genero: "unisex",
    signature_player: "Ja Morant",
    tecnologia_clave: ["Cushlon foam", "React foam", "herringbone traction"],
    predecesor_id: null,
    sucesor_id: "nike-ja-2",

    peso_real_g: 310,
    altura: "low",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 9,
      amortiguacion: 7,
      respuesta: 8,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 8,
      durabilidad_outdoor: 6,
      ventilacion: 7,
    },
    categoria_principal: "traction-king",
    tags: ["signature", "guard", "traction", "explosivo"],

    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [60, 90],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },

    resumen: "La primera firma de Ja Morant destaca por una tracción de herringbone excepcional y un setup de amortiguación Cushlon+React que da respuesta sin sacrificar court feel. Ligera, baja y diseñada para guards rápidos.",
    pros: [
      "Tracción herringbone de primer nivel",
      "Ligera para ser una signature (310g)",
      "React en antepié da respuesta snappy",
      "Precio asequible para signature Nike",
    ],
    contras: [
      "Sin soporte de tobillo al ser low",
      "Cushlon básico en talón, poco acolchado",
      "Durabilidad outdoor limitada",
    ],
    veredicto: "Para guards explosivos que priorizan tracción y velocidad sobre protección. La Ja 2 la supera en tech, pero la Ja 1 sigue siendo una ganga a precio reducido.",

    imagen_principal: "/shoes/nike-ja-1.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/nike-ja-1/", fecha: "2023-04-01" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/nike-ja-1/", fecha: "2023-05-01" },
    ],
    ultima_actualizacion: "2026-05-19",
    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=ja+1&vst=ja+1", precio_actual: 85, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=nike+ja+1", precio_actual: 89, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+ja+1+baloncesto&tag=canchazapa-21", precio_actual: 79, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-19" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // ADIDAS TRAE YOUNG 3 â€” traction king del guard
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "adidas-trae-young-3",
    slug: "adidas-trae-young-3",
    marca: "Adidas",
    modelo: "Trae Young 3",
    generacion: 3,
    año_lanzamiento: 2023,
    genero: "unisex",
    signature_player: "Trae Young",
    tecnologia_clave: ["custom wedge foam", "dual-pattern traction", "Torsion System"],
    predecesor_id: null,
    sucesor_id: null,

    peso_real_g: 280,
    altura: "low",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "knit",

    puntuaciones: {
      traccion: 9,
      amortiguacion: 6,
      respuesta: 9,
      soporte_lateral: 8,
      estabilidad: 8,
      peso_score: 9,
      durabilidad_outdoor: 5,
      ventilacion: 8,
    },
    categoria_principal: "traction-king",
    tags: ["signature", "guard", "traction", "explosivo", "indoor"],

    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [55, 85],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["pivot", "ala-pivot"], estilos: ["potente"] },

    resumen: "Tercera generación de la firma de Trae Young. Tracción dual excepcional con foam wedge reactivo a ras del suelo. Ligera, rápida y con lockdown de primer nivel para guards ágiles.",
    pros: [
      "Tracción indoor excepcional (dual-pattern)",
      "Muy reactiva y baja al suelo",
      "Lockdown y estabilidad sobresalientes con placa Torsion",
      "La más ligera de la serie",
    ],
    contras: [
      "Poco cushion para jugadores pesados",
      "Requiere período de rodaje",
      "Tracción se degrada rápido en exterior",
    ],
    veredicto: "Para guards ágiles que viven en el perímetro y necesitan agarre y respuesta explosiva. La mejor Trae Young de la serie.",

    imagen_principal: "/shoes/adidas-trae-young-3.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/adidas-trae-young-3-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/adidas-trae-young-3/" },
    ],
    ultima_actualizacion: "2026-05-19",
    precio_msrp_eur: 150,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=trae+young+3", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=adidas+trae+young+3", precio_actual: 130, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+trae+young+3+baloncesto&tag=canchazapa-21", precio_actual: 115, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-19" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // NEW BALANCE TWO WXY v5 â€” el más versátil de NB
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nb-two-wxy-v5",
    slug: "nb-two-wxy-v5",
    marca: "New Balance",
    modelo: "TWO WXY v5",
    generacion: 5,
    año_lanzamiento: 2024,
    genero: "unisex",
    tecnologia_clave: ["FuelCell foam", "Fresh Foam X", "suction-cup traction", "torsional plate"],
    predecesor_id: "nb-two-wxy-v4",
    sucesor_id: "nb-two-wxy-v6",

    peso_real_g: 390,
    altura: "low",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 9,
      amortiguacion: 8,
      respuesta: 8,
      soporte_lateral: 8,
      estabilidad: 8,
      peso_score: 6,
      durabilidad_outdoor: 7,
      ventilacion: 8,
    },
    categoria_principal: "balanced",
    tags: ["positionless", "moderna", "tope-de-gama", "indoor"],

    ideal_para: {
      posiciones: ["base", "escolta", "alero", "ala-pivot"],
      peso_jugador_kg: [65, 105],
      estilos: ["equilibrado", "explosivo", "potente"],
    },
    no_recomendada_para: {},

    resumen: "La quinta generación del TWO WXY combina FuelCell y Fresh Foam X en tándem con tracción suction-cup de primer nivel. El modelo más versátil del catálogo NB, apto para cualquier posición.",
    pros: [
      "Amortiguación dual FuelCell + Fresh Foam X muy completa",
      "Tracción suction-cup excepcional en cualquier pista",
      "Versátil para todas las posiciones",
      "Placa torsional da estabilidad premium",
    ],
    contras: [
      "Algo pesada (390g) para guards explosivos",
      "Upper puede sentirse estrecho al inicio",
    ],
    veredicto: "La opción más equilibrada del catálogo NB. Sirve para cualquier posición y nivel, con tracción y cushion de primer nivel.",

    imagen_principal: "/shoes/nb-two-wxy-v5.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/new-balance-two-wxy-v5/" },
      { tipo: "runrepeat-lab", url: "https://runrepeat.com/new-balance-two-wxy-v5" },
    ],
    ultima_actualizacion: "2026-05-19",
    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "nb_es", url: "https://www.newbalance.es/es/buscar?q=two+wxy+v5", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=new+balance+two+wxy+v5", precio_actual: 115, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=new+balance+two+wxy+v5+baloncesto&tag=canchazapa-21", precio_actual: 110, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-19" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // NIKE GT HUSTLE 3 â€” cushion máximo para pivots
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-gt-hustle-3",
    slug: "nike-gt-hustle-3",
    marca: "Nike",
    modelo: "GT Hustle 3",
    generacion: 3,
    año_lanzamiento: 2024,
    genero: "unisex",
    tecnologia_clave: ["double-stacked Air Zoom", "Flyknit", "gum rubber outsole"],
    predecesor_id: null,
    sucesor_id: null,

    peso_real_g: 370,
    altura: "low",
    horma: "normal",
    drop_mm: 9,
    tipo_cierre: "cordones",
    material_superior: "knit",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 10,
      respuesta: 9,
      soporte_lateral: 6,
      estabilidad: 6,
      peso_score: 7,
      durabilidad_outdoor: 5,
      ventilacion: 8,
    },
    categoria_principal: "cushion-focused",
    tags: ["tope-de-gama", "cushion", "moderna", "indoor", "pivot"],

    ideal_para: {
      posiciones: ["pivot", "ala-pivot", "alero"],
      peso_jugador_kg: [85, 130],
      estilos: ["potente", "equilibrado"],
      lesiones_compatibles: ["rodillas"],
    },
    no_recomendada_para: { posiciones: ["base"], estilos: ["explosivo"] },

    resumen: "La GT Hustle 3 empuja la amortiguación al máximo con doble Air Zoom stacked. Victor Wembanyama la usa en la NBA. La opción definitiva para pivots que buscan protección de impactos con Flyknit ligero.",
    pros: [
      "Amortiguación Air Zoom doble stack excepcional",
      "81.5% de retorno energético (top del mercado)",
      "Flyknit ligero y muy transpirable",
      "Ideal para rodillas castigadas",
    ],
    contras: [
      "Soporte lateral limitado para movimientos laterales explosivos",
      "Precio muy alto",
      "No apta para exterior (gum rubber)",
    ],
    veredicto: "La mejor Nike para pivots que quieren máxima protección de impactos. Si juegas bajo el aro y tienes rodillas castigadas, esta es tu zapatilla.",

    imagen_principal: "/shoes/nike-gt-hustle-3.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/nike-zoom-gt-hustle-3-review/" },
      { tipo: "runrepeat-lab", url: "https://runrepeat.com/nike-gt-hustle-3" },
    ],
    ultima_actualizacion: "2026-05-19",
    precio_msrp_eur: 185,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=gt+hustle+3&vst=gt+hustle+3", precio_actual: 185, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+gt+hustle+3", precio_actual: 180, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+gt+hustle+3+baloncesto&tag=canchazapa-21", precio_actual: 170, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-19" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // NEW BALANCE KAWHI 2 â€” evolución ligera de The Klaw
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nb-kawhi-2",
    slug: "nb-kawhi-2",
    marca: "New Balance",
    modelo: "Kawhi 2",
    generacion: 2,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Kawhi Leonard",
    tecnologia_clave: ["FuelCell foam", "Fitweave Lite", "performance plate"],
    predecesor_id: "nb-kawhi-1",
    sucesor_id: null,

    peso_real_g: 340,
    altura: "low",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",

    puntuaciones: {
      traccion: 9,
      amortiguacion: 8,
      respuesta: 8,
      soporte_lateral: 8,
      estabilidad: 8,
      peso_score: 7,
      durabilidad_outdoor: 8,
      ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["signature", "tope-de-gama", "moderna", "positionless"],

    ideal_para: {
      posiciones: ["alero", "ala-pivot", "escolta"],
      peso_jugador_kg: [75, 110],
      estilos: ["equilibrado", "potente"],
      lesiones_compatibles: ["tobillos"],
    },
    no_recomendada_para: { posiciones: ["base"], estilos: ["explosivo"] },

    resumen: "Segunda signature de Kawhi Leonard con NB. Más ligera que la Kawhi 1 gracias al Fitweave Lite, mantiene la tracción mordaz y añade FuelCell full-length con placa de rendimiento para cortes más explosivos.",
    pros: [
      "Más ligera que la Kawhi 1 (340g vs 385g)",
      "Tracción excepcional heredada de la primera",
      "FuelCell full-length muy reactivo",
      "Placa de rendimiento mejora los cortes laterales",
    ],
    contras: [
      "Cushion ligeramente menos plush que la Kawhi 1",
      "Horma algo estrecha al inicio",
    ],
    veredicto: "La evolución natural de la Kawhi 1. Más rápida y ligera sin sacrificar la tracción que hizo famosa a la primera. La mejor opción NB para aleros versátiles.",

    imagen_principal: "/shoes/nb-kawhi-2.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/new-balance-kawhi-2-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/new-balance-kawhi-2/" },
    ],
    ultima_actualizacion: "2026-05-19",
    precio_msrp_eur: 160,
    links_compra: [
      { tienda: "nb_es", url: "https://www.newbalance.es/es/buscar?q=kawhi+2", precio_actual: 160, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=new+balance+kawhi+2", precio_actual: 150, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=new+balance+kawhi+2+baloncesto&tag=canchazapa-21", precio_actual: 145, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-19" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // ADIDAS TRAE YOUNG 4 â€” sucesor del traction king
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "adidas-trae-young-4",
    slug: "adidas-trae-young-4",
    marca: "Adidas",
    modelo: "Trae Young 4",
    generacion: 4,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Trae Young",
    tecnologia_clave: ["custom wedge foam", "dual-pattern traction", "Torsion System"],
    predecesor_id: "adidas-trae-young-3",
    sucesor_id: null,
    peso_real_g: 260,
    altura: "low",
    horma: "estrecha",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "knit",
    puntuaciones: {
      traccion: 9, amortiguacion: 6, respuesta: 9,
      soporte_lateral: 8, estabilidad: 8, peso_score: 9,
      durabilidad_outdoor: 5, ventilacion: 8,
    },
    categoria_principal: "traction-king",
    tags: ["signature", "guard", "traction", "explosivo", "indoor"],
    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [55, 85],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["pivot", "ala-pivot"], estilos: ["potente"] },
    resumen: "La cuarta entrega de la firma de Trae Young mantiene la tracción dual excepcional de la serie con un foam wedge reactivo a ras del suelo. Más refinada que la Trae 3.",
    pros: ["Tracción dual indoor excepcional", "Muy reactiva y ligera (260g)", "Lockdown de primer nivel", "Diseño más maduro que generaciones anteriores"],
    contras: ["Poco cushion para jugadores pesados", "Durabilidad outdoor limitada", "Horma estrecha puede no adaptarse a todos"],
    veredicto: "La mejor Trae Young de la serie. Para guards ágiles del perímetro que necesitan el máximo agarre y velocidad de reacción.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-19",
    precio_msrp_eur: 130,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=trae+young+4", precio_actual: 130, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=adidas+trae+young+4", precio_actual: 125, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+trae+young+4+baloncesto&tag=canchazapa-21", precio_actual: 115, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-19" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // JORDAN TATUM 2 â€” el alero versátil de Jayson
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "jordan-tatum-2",
    slug: "jordan-tatum-2",
    marca: "Jordan",
    modelo: "Tatum 2",
    generacion: 2,
    año_lanzamiento: 2023,
    genero: "unisex",
    signature_player: "Jayson Tatum",
    tecnologia_clave: ["Zoom Air", "React foam", "herringbone"],
    predecesor_id: null,
    sucesor_id: "jordan-tatum-3",
    peso_real_g: 320,
    altura: "low",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8, amortiguacion: 8, respuesta: 8,
      soporte_lateral: 8, estabilidad: 8, peso_score: 8,
      durabilidad_outdoor: 7, ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["signature", "alero", "moderna", "tope-de-gama"],
    ideal_para: {
      posiciones: ["alero", "ala-pivot", "escolta"],
      peso_jugador_kg: [75, 105],
      estilos: ["equilibrado", "explosivo"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "Segunda firma de Jayson Tatum con Jordan Brand. Combinación de Zoom Air y React foam para el alero versátil moderno. Predecesor directo de la popular Tatum 3.",
    pros: ["Amortiguación Zoom+React muy equilibrada", "Buena tracción herringbone", "Polivalente para todas las posiciones perimetrales", "Durabilidad outdoor decente"],
    contras: ["Superada por la Tatum 3 en tecnología", "Sin innovación destacada respecto a generaciones anteriores"],
    veredicto: "Una sólida signature para aleros que buscan equilibrio completo. Vale la pena buscarla a precio reducido frente a la Tatum 3.",
    imagen_principal: "/shoes/jordan-tatum-2.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-19",
    precio_msrp_eur: 155,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=tatum+2&vst=tatum+2", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=jordan+tatum+2", precio_actual: 130, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=jordan+tatum+2+baloncesto&tag=canchazapa-21", precio_actual: 110, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-19" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // JORDAN ZION 3 â€” max cushion para el toro
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "jordan-zion-3",
    slug: "jordan-zion-3",
    marca: "Jordan",
    modelo: "Zion 3",
    generacion: 3,
    año_lanzamiento: 2023,
    genero: "unisex",
    signature_player: "Zion Williamson",
    tecnologia_clave: ["full-length React foam", "Zoom Air Strobel", "herringbone"],
    predecesor_id: null,
    sucesor_id: "jordan-zion-4",
    peso_real_g: 415,
    altura: "low",
    horma: "ancha",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8, amortiguacion: 10, respuesta: 7,
      soporte_lateral: 7, estabilidad: 7, peso_score: 4,
      durabilidad_outdoor: 6, ventilacion: 6,
    },
    categoria_principal: "cushion-focused",
    tags: ["signature", "pivot", "cushion", "tope-de-gama"],
    ideal_para: {
      posiciones: ["ala-pivot", "pivot", "alero"],
      peso_jugador_kg: [95, 140],
      estilos: ["potente", "explosivo"],
      lesiones_compatibles: ["rodillas"],
    },
    no_recomendada_para: { posiciones: ["base", "escolta"], estilos: ["equilibrado"] },
    resumen: "Tercera firma de Zion Williamson, diseñada para aguantar el impacto brutal de un jugador de 130kg. React full-length y Zoom Air Strobel ofrecen la máxima protección de impactos de toda la línea.",
    pros: ["Amortiguación máxima para jugadores muy pesados", "Horma ancha ideal para pies anchos", "Tracción herringbone agresiva", "Build quality premium"],
    contras: ["Muy pesada (415g) â€” no apta para guards", "Cara para lo que ofrece técnicamente", "Superada ya por la Zion 4"],
    veredicto: "La opción definitiva para pivots y ala-pivots de más de 95kg. Si tu cuerpo pide amortiguación máxima, esta es la zapatilla.",
    imagen_principal: "/shoes/jordan-zion-3.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-19",
    precio_msrp_eur: 185,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=zion+3&vst=zion+3", precio_actual: 150, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=jordan+zion+3", precio_actual: 160, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=jordan+zion+3+baloncesto&tag=canchazapa-21", precio_actual: 140, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-19" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // PUMA CLYDE ALL-PRO â€” NITRO versátil
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "puma-clyde-all-pro",
    slug: "puma-clyde-all-pro",
    marca: "Puma",
    modelo: "Clyde All-Pro",
    generacion: 1,
    año_lanzamiento: 2022,
    genero: "unisex",
    signature_player: "Clyde Drexler",
    tecnologia_clave: ["NITRO foam", "TPU shank", "herringbone"],
    predecesor_id: null,
    sucesor_id: "puma-clyde-all-pro-2",
    peso_real_g: 317,
    altura: "low",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 8, amortiguacion: 8, respuesta: 8,
      soporte_lateral: 7, estabilidad: 7, peso_score: 8,
      durabilidad_outdoor: 7, ventilacion: 8,
    },
    categoria_principal: "balanced",
    tags: ["versatil", "guard", "nitro", "buena-relacion-calidad-precio"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [60, 95],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },
    resumen: "La Clyde All-Pro es la apuesta de Puma para competir en gama alta con NITRO foam, su espuma de nitrógeno más reactiva. Ligera, versátil y con buena tracción herringbone â€” una sorpresa muy competitiva para guards y aleros.",
    pros: ["NITRO foam: respuesta y amortiguación equilibradas", "Peso muy competitivo (317g)", "Tracción herringbone fiable en interior", "Horma estándar â€” encaja con la mayoría de pies"],
    contras: ["Puma tiene menor presencia en España â€” difícil de encontrar", "Soporte de tobillo limitado al ser low", "Durabilidad outdoor no testeada extensivamente"],
    veredicto: "Opción muy sólida y algo infravalorada por la poca presencia de Puma en baloncesto. Si la encuentras a buen precio, es una compra muy inteligente para guards y aleros.",
    imagen_principal: "/shoes/puma-clyde-all-pro.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-19",
    precio_msrp_eur: 130,
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=puma+clyde+all+pro+baloncesto&tag=canchazapa-21", precio_actual: 100, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-19" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=puma+clyde+all+pro", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // NIKE LEBRON NXXT GEN â€” LeBron ligero y versátil
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-lebron-nxxt-gen",
    slug: "nike-lebron-nxxt-gen",
    marca: "Nike",
    modelo: "LeBron NXXT Gen",
    generacion: 1,
    año_lanzamiento: 2022,
    genero: "unisex",
    signature_player: "LeBron James",
    tecnologia_clave: ["Air Max", "Zoom Air Strobel", "React"],
    predecesor_id: "nike-lebron-20",
    sucesor_id: "nike-lebron-nxxt-gen-ampd",
    peso_real_g: 360,
    altura: "low",
    horma: "ancha",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8, amortiguacion: 9, respuesta: 7,
      soporte_lateral: 8, estabilidad: 8, peso_score: 6,
      durabilidad_outdoor: 7, ventilacion: 7,
    },
    categoria_principal: "cushion-focused",
    tags: ["signature", "versatil", "alero", "cushion", "lebron"],
    ideal_para: {
      posiciones: ["alero", "ala-pivot", "escolta"],
      peso_jugador_kg: [80, 120],
      estilos: ["potente", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["base"], estilos: ["explosivo"] },
    resumen: "El LeBron NXXT Gen es la apuesta de Nike por un LeBron más ligero y accesible. Combina Air Max en talón y Zoom Air Strobel en antepié con una construcción low que lo hace más versátil que sus predecesores. Menos monstruo, más polivalente.",
    pros: ["Cushion premium en toda la longitud del pie", "Construcción low â€” más versátil que LeBrons anteriores", "Horma ancha cómoda para pies anchos", "Tracción fiable en pista cubierta"],
    contras: ["Pesado para un low (360g)", "Respuesta no al nivel de la línea Curry o GT Cut", "Precio elevado para lo que ofrece frente a rivales"],
    veredicto: "Buena opción para aleros y ala-pivots con pies anchos que quieren un LeBron sin renunciar a versatilidad. Si buscas máxima explosividad, mira otras opciones.",
    imagen_principal: "/shoes/nike-lebron-nxxt-gen.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-19",
    precio_msrp_eur: 200,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=lebron+nxxt+gen&vst=lebron+nxxt+gen", precio_actual: 160, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=lebron+nxxt+gen", precio_actual: 170, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+lebron+nxxt+gen+baloncesto&tag=canchazapa-21", precio_actual: 150, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-19" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // NIKE AIR ZOOM GT JUMP 3 â€” Big man reactivo
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-gt-jump-3",
    slug: "nike-gt-jump-3",
    marca: "Nike",
    modelo: "Air Zoom GT Jump 3",
    generacion: 3,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: undefined,
    tecnologia_clave: ["Zoom Air", "Air Strobel", "TPU cage"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 395,
    altura: "mid",
    horma: "ancha",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",
    puntuaciones: {
      traccion: 8, amortiguacion: 9, respuesta: 7,
      soporte_lateral: 9, estabilidad: 9, peso_score: 4,
      durabilidad_outdoor: 7, ventilacion: 7,
    },
    categoria_principal: "cushion-focused",
    tags: ["pivot", "big-man", "soporte", "cushion", "mid-cut"],
    ideal_para: {
      posiciones: ["pivot", "ala-pivot"],
      peso_jugador_kg: [90, 140],
      estilos: ["potente", "equilibrado"],
      lesiones_compatibles: ["rodillas", "tobillos"],
    },
    no_recomendada_para: { posiciones: ["base", "escolta"], estilos: ["explosivo"] },
    resumen: "La GT Jump 3 es la referencia Nike para pivots y ala-pivots. Zoom Air en talón y Strobel completo ofrecen amortiguación premium para jugadores grandes, con un cage de TPU que da soporte lateral excepcional en corte mid.",
    pros: ["Amortiguación de primer nivel para jugadores pesados", "Soporte lateral y de tobillo sobresaliente", "Tracción fiable en interior", "Horma ancha â€” cómoda para pies anchos"],
    contras: ["Muy pesada (395g) â€” impensable para guards", "Precio elevado", "Lenta en cambios de dirección rápidos"],
    veredicto: "La opción más sólida de Nike para pivots que necesitan máximo soporte y cushion. Si juegas de 5 y pesas más de 90kg, esta es tu zapatilla.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-19",
    precio_msrp_eur: 160,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=gt+jump+3&vst=gt+jump+3", precio_actual: 150, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=gt+jump+3", precio_actual: 155, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // UNDER ARMOUR CURRY 11 â€” Flow ultraligero
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "ua-curry-11",
    slug: "ua-curry-11",
    marca: "Under Armour",
    modelo: "Curry 11",
    generacion: 11,
    año_lanzamiento: 2023,
    genero: "unisex",
    signature_player: "Stephen Curry",
    tecnologia_clave: ["UA FLOW", "Flow outsole", "herringbone"],
    predecesor_id: null,
    sucesor_id: "ua-curry-12",
    peso_real_g: 280,
    altura: "low",
    horma: "estrecha",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 9, amortiguacion: 8, respuesta: 9,
      soporte_lateral: 7, estabilidad: 7, peso_score: 9,
      durabilidad_outdoor: 7, ventilacion: 8,
    },
    categoria_principal: "responsive",
    tags: ["signature", "guard", "traction", "explosivo", "tope-de-gama"],
    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [60, 90],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["pivot", "ala-pivot"], estilos: ["potente"] },
    resumen: "La Curry 11 lleva la suela UA FLOW a su máxima expresión. Sin goma exterior separada, la suela es amortiguación y tracción a la vez. Increíblemente ligera y reactiva para un guard de élite.",
    pros: ["UA FLOW: amortiguación y tracción integradas", "Muy ligera para la tecnología que ofrece", "Respuesta excepcional al corte", "Continuación de la exitosa línea Curry"],
    contras: ["Horma estrecha â€” no apta para pies anchos", "Soporte de tobillo limitado al ser low", "Superada por la Curry 12"],
    veredicto: "Una de las mejores opciones para guards que buscan máxima respuesta con tecnología UA FLOW. Vale la pena encontrarla a precio rebajado.",
    imagen_principal: "/shoes/ua-curry-11.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-19",
    precio_msrp_eur: 160,
    links_compra: [
      { tienda: "ua_es", url: "https://www.underarmour.es/es-es/p/curry-11/3027359.html", precio_actual: 130, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=curry+11", precio_actual: 140, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=under+armour+curry+11+baloncesto&tag=canchazapa-21", precio_actual: 120, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-19" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // ADIDAS HARDEN VOL 8 â€” Predecesor del Vol 9
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "adidas-harden-vol-8",
    slug: "adidas-harden-vol-8",
    marca: "Adidas",
    modelo: "Harden Vol 8",
    generacion: 8,
    año_lanzamiento: 2022,
    genero: "unisex",
    signature_player: "James Harden",
    tecnologia_clave: ["Lightstrike Pro", "herringbone", "malla tejida"],
    predecesor_id: null,
    sucesor_id: "adidas-harden-vol-9",

    peso_real_g: 340,
    altura: "low",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 8,
      respuesta: 7,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 7,
      durabilidad_outdoor: 7,
      ventilacion: 8,
    },
    categoria_principal: "balanced",
    tags: ["signature", "guard", "escolta", "tirador", "lightstrike-pro"],

    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [70, 100],
      estilos: ["tirador", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["pivot", "ala-pivot"], estilos: ["potente"] },

    resumen: "La Harden Vol 8 consolida el uso de Lightstrike Pro en la línea signature de Harden. Tracción herringbone multidireccional fiable y perfil bajo que favorece el juego de manejo de balón y tiro exterior.",
    pros: [
      "Lightstrike Pro: buena relación amortiguación-respuesta",
      "Tracción herringbone multidireccional",
      "Ligera para su categoría",
      "Buena ventilación gracias a la malla tejida",
    ],
    contras: [
      "Superada por la Vol 9 en todos los aspectos",
      "Soporte lateral básico",
      "Precio original elevado para lo que ofrece hoy",
    ],
    veredicto: "Una buena zapatilla de guard en su momento. Ahora se puede encontrar a buen precio de segunda mano o en outlets. Sólida si la encuentras rebajada.",

    imagen_principal: "/shoes/adidas-harden-vol-8.jpg",
    imagenes: [],

    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-20",

    precio_msrp_eur: 160,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=harden+vol+8", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-20" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+harden+vol+8+baloncesto&tag=canchazapa-21", precio_actual: 80, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-20" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // NEW BALANCE TWO WXY v6 â€” Top de gama NB 2024
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nb-two-wxy-v6",
    slug: "nb-two-wxy-v6",
    marca: "New Balance",
    modelo: "TWO WXY v6",
    generacion: 6,
    año_lanzamiento: 2024,
    genero: "unisex",
    tecnologia_clave: ["FuelCell", "herringbone", "goma translúcida"],
    predecesor_id: "nb-two-wxy-v5",
    sucesor_id: undefined,

    peso_real_g: 350,
    altura: "low",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",

    puntuaciones: {
      traccion: 9,
      amortiguacion: 8,
      respuesta: 8,
      soporte_lateral: 8,
      estabilidad: 8,
      peso_score: 7,
      durabilidad_outdoor: 8,
      ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["tope-de-gama", "guard", "escolta", "fuelcell", "moderna"],

    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [65, 95],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: ["potente"] },

    resumen: "La TWO WXY v6 es el tope de gama de New Balance para 2024. FuelCell reactivo combinado con una tracción herringbone en goma translúcida que ofrece un agarre excepcional en cancha interior. Una de las mejores opciones para guards que valoran el equilibrio total.",
    pros: [
      "FuelCell: amortiguación reactiva y ligera",
      "Tracción herringbone translúcida muy fiable",
      "Construcción premium con precio competitivo vs Nike/Adidas",
      "Soporte lateral sólido para ser low",
    ],
    contras: [
      "Disponibilidad limitada en España",
      "No signature â€” menor presencia de marketing",
      "Algo pesada para los más velocistas",
    ],
    veredicto: "La mejor apuesta de New Balance para guards en 2024. Si priorizas rendimiento sobre marketing, la TWO WXY v6 supera a muchas signatures en valor real.",

    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],

    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-20",

    precio_msrp_eur: 200,
    links_compra: [
      { tienda: "nb_es", url: "https://www.newbalance.es/es/buscar?q=two+wxy+v6", precio_actual: 185, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-20" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=new+balance+two+wxy+v6+baloncesto&tag=canchazapa-21", precio_actual: 180, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-20" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // JORDAN WHY NOT .6 â€” Russell Westbrook, mid
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "jordan-why-not-6",
    slug: "jordan-why-not-6",
    marca: "Jordan",
    modelo: "Why Not .6",
    generacion: 6,
    año_lanzamiento: 2022,
    genero: "unisex",
    signature_player: "Russell Westbrook",
    tecnologia_clave: ["Zoom Air Strobel", "herringbone", "mid-top"],
    predecesor_id: null,
    sucesor_id: null,

    peso_real_g: 335,
    altura: "mid",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 8,
      respuesta: 8,
      soporte_lateral: 8,
      estabilidad: 8,
      peso_score: 7,
      durabilidad_outdoor: 7,
      ventilacion: 7,
    },
    categoria_principal: "responsive",
    tags: ["signature", "guard", "escolta", "explosivo", "mid-top"],

    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [70, 100],
      estilos: ["explosivo", "equilibrado"],
      lesiones_compatibles: ["tobillos"],
    },
    no_recomendada_para: { posiciones: ["pivot", "ala-pivot"], estilos: ["potente"] },

    resumen: "La Why Not .6 refleja el estilo de juego explosivo y sin frenos de Russell Westbrook. Zoom Air Strobel en todo el pie para máxima respuesta en cada zancada. El perfil mid ofrece soporte de tobillo extra sin perder agilidad.",
    pros: [
      "Zoom Air Strobel: respuesta inmediata",
      "Tracción herringbone multidireccional fiable",
      "Soporte de tobillo extra al ser mid",
      "Cushion equilibrado para el juego explosivo",
    ],
    contras: [
      "Firma de un jugador en declive â€” disponibilidad cayendo",
      "Algo pesada para ser una 'explosiva'",
      "No destaca en ninguna categoría de forma sobresaliente",
    ],
    veredicto: "Una zapatilla sólida para bases explosivos que quieran soporte de tobillo extra. Se puede encontrar a precio reducido dado que Westbrook ya no es el nombre que era.",

    imagen_principal: "/shoes/jordan-why-not-6.jpg",
    imagenes: [],

    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-20",

    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=why+not+6&vst=why+not+6", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-20" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=jordan+why+not+6+baloncesto&tag=canchazapa-21", precio_actual: 80, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-20" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // ADIDAS OWNTHEGAME 2.0 â€” Budget todo terreno
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "adidas-ownthegame-2",
    slug: "adidas-ownthegame-2",
    marca: "Adidas",
    modelo: "Ownthegame 2.0",
    generacion: 2,
    año_lanzamiento: 2021,
    genero: "unisex",
    tecnologia_clave: ["Bounce", "herringbone", "goma duradera"],
    predecesor_id: null,
    sucesor_id: "adidas-ownthegame-3",

    peso_real_g: 370,
    altura: "low",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 7,
      amortiguacion: 6,
      respuesta: 5,
      soporte_lateral: 6,
      estabilidad: 7,
      peso_score: 5,
      durabilidad_outdoor: 8,
      ventilacion: 6,
    },
    categoria_principal: "balanced",
    tags: ["budget", "entrenamiento", "todas-posiciones", "outdoor"],

    ideal_para: {
      posiciones: ["base", "escolta", "alero", "ala-pivot", "pivot"],
      peso_jugador_kg: [60, 110],
      estilos: ["equilibrado"],
    },
    no_recomendada_para: { estilos: ["explosivo"] },

    resumen: "La Ownthegame 2.0 de Adidas es la opción budget más accesible de la marca alemana. Cushion Bounce básico y suela herringbone duradera que la convierten en una buena zapatilla de entrenamiento o de iniciación al baloncesto.",
    pros: [
      "Precio muy accesible",
      "Buena durabilidad para exterior",
      "Tracción herringbone básica pero funcional",
      "Disponible en muchas tallas y colores",
    ],
    contras: [
      "Cushion Bounce básico â€” no para competición seria",
      "Pesada para su nivel de prestaciones",
      "Superada por la Ownthegame 3",
    ],
    veredicto: "Perfecta como primera zapatilla de baloncesto o para entrenamientos casuales. No esperes rendimiento de competición, pero para iniciarse o entrenar es más que suficiente.",

    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],

    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-20",

    precio_msrp_eur: 70,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=ownthegame+2.0", precio_actual: 55, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-20" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+ownthegame+2.0+baloncesto&tag=canchazapa-21", precio_actual: 50, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-20" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // UNDER ARMOUR ASSERT 10 â€” Budget UA entrenamiento
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "ua-assert-10",
    slug: "ua-assert-10",
    marca: "Under Armour",
    modelo: "Assert 10",
    generacion: 10,
    año_lanzamiento: 2023,
    genero: "unisex",
    tecnologia_clave: ["UA Charged Cushioning", "herringbone"],
    predecesor_id: null,
    sucesor_id: null,

    peso_real_g: 340,
    altura: "low",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 6,
      amortiguacion: 6,
      respuesta: 5,
      soporte_lateral: 6,
      estabilidad: 6,
      peso_score: 6,
      durabilidad_outdoor: 7,
      ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["budget", "entrenamiento", "todas-posiciones"],

    ideal_para: {
      posiciones: ["base", "escolta", "alero", "ala-pivot", "pivot"],
      peso_jugador_kg: [60, 100],
      estilos: ["equilibrado"],
    },
    no_recomendada_para: { estilos: ["explosivo", "potente"] },

    resumen: "La UA Assert 10 es la propuesta budget de Under Armour para baloncesto recreativo y entrenamiento. UA Charged Cushioning básico con buena ventilación y tracción herringbone suficiente para cancha interior.",
    pros: [
      "Precio muy competitivo para marca UA",
      "Buena ventilación para ser budget",
      "Ligera para su rango de precio",
      "Durabilidad aceptable en exterior",
    ],
    contras: [
      "Cushion básico â€” no apta para competición",
      "Tracción herringbone básico, no multidireccional",
      "Pocas opciones de colores",
    ],
    veredicto: "La opción más económica de Under Armour para baloncesto. Ideal para entrenamientos o para quien empieza y no quiere invertir mucho. Sin pretensiones de rendimiento elite.",

    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],

    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-20",

    precio_msrp_eur: 60,
    links_compra: [
      { tienda: "ua_es", url: "https://www.underarmour.es/es-es/zapatillas-baloncesto/", precio_actual: 55, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-20" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=under+armour+assert+10+baloncesto&tag=canchazapa-21", precio_actual: 50, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-20" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 131. NIKE KD 19 – Kevin Durant 19ª, Zoom Strobel + Cushlon 3.0, TPU dagger
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "nike-kd-19",
    slug: "nike-kd-19",
    marca: "Nike",
    modelo: "KD 19",
    generacion: 19,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Kevin Durant",
    tecnologia_clave: ["Zoom Strobel full-length", "Cushlon 3.0", "Midfoot TPU shank", "TPU dagger upper"],
    predecesor_id: "nike-kd-18",
    sucesor_id: null,

    peso_real_g: 368,
    altura: "low",
    horma: "estrecha",
    drop_mm: 6,
    tipo_cierre: "cordones",
    material_superior: "synthetic",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 8,
      respuesta: 8,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 7,
      durabilidad_outdoor: 6,
      ventilacion: 6,
    },
    categoria_principal: "responsive",
    tags: ["signature", "tope-de-gama", "moderna", "low-top", "guards", "2025"],

    ideal_para: {
      posiciones: ["escolta", "alero", "base"],
      peso_jugador_kg: [70, 100],
      estilos: ["explosivo", "equilibrado", "tirador"],
      lesiones_compatibles: ["rodillas"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
    },

    resumen:
      "La Nike KD 19 marca un giro radical en la línea de Kevin Durant: abandona el knit y apuesta por una estructura TPU tipo 'daga' inspirada en su apodo 'Slim Reaper'. El Zoom Strobel full-length paired con Cushlon 3.0 ofrece el mejor balance respuesta-amortiguación de la línea hasta la fecha. Más ligera y reactiva que la KD 18.",
    pros: [
      "Zoom Strobel full-length: bounce y respuesta top en 2025",
      "Cushlon 3.0 absorbe impactos sin sacrificar court feel",
      "Upper TPU estructurado: lockdown superior al knit",
      "Más ligera que la KD 18 a pesar del upper sólido",
      "Tracción herringbone sólida en pista interior",
    ],
    contras: [
      "Horma estrecha: incómoda para pies anchos o normales",
      "Upper TPU: menos transpirable que modelos de mesh o knit",
      "Durabilidad outdoor moderada",
      "Low-top: soporte de tobillo limitado",
    ],
    veredicto:
      "La mejor KD en años. Si eres escolta o alero, tienes pie estrecho y priorizas respuesta y bounce, la KD 19 es una de las compras más inteligentes de 2025. Para pies anchos o si necesitas más tobillo, considera la KD 18 o la Air Jordan 40.",

    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],

    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/nike-kd-19-performance-review/" },
    ],
    ultima_actualizacion: "2026-05-25",

    precio_msrp_eur: 149.99,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=kd+19&vst=kd+19", precio_actual: 149.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-25" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=kd+19", precio_actual: 154.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-25" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+kd+19+baloncesto&tag=canchazapa-21", precio_actual: 149.99, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-25" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 132. AIR JORDAN 40 – ZoomX + Zoom Strobel: primera en la historia Nike
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "jordan-40",
    slug: "jordan-40",
    marca: "Jordan",
    modelo: "Air Jordan 40",
    generacion: 40,
    año_lanzamiento: 2025,
    genero: "unisex",
    tecnologia_clave: ["ZoomX foam full-length", "Zoom Strobel", "6 internal webbing straps", "40° herringbone traction"],
    predecesor_id: null,
    sucesor_id: null,

    peso_real_g: 395,
    altura: "mid",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh+tpu",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 10,
      respuesta: 9,
      soporte_lateral: 8,
      estabilidad: 7,
      peso_score: 6,
      durabilidad_outdoor: 6,
      ventilacion: 7,
    },
    categoria_principal: "cushion-focused",
    tags: ["tope-de-gama", "moderna", "2025", "zoomx", "mainline-jordan"],

    ideal_para: {
      posiciones: ["escolta", "alero", "ala-pivot"],
      peso_jugador_kg: [75, 110],
      estilos: ["equilibrado", "potente", "tirador"],
      lesiones_compatibles: ["rodillas"],
    },
    no_recomendada_para: {
      posiciones: ["base"],
      estilos: ["explosivo"],
    },

    resumen:
      "La Air Jordan 40 es un hito en la historia de Nike: primera zapatilla que combina ZoomX foam full-length (85% energy return, la misma tecnología del Vaporfly) con Zoom Strobel. El resultado es la amortiguación más avanzada que Jordan Brand ha puesto en una zapatilla de baloncesto. Seis correas internas de sujeción y patrón herringbone de 40° completan un paquete premium.",
    pros: [
      "ZoomX + Zoom Strobel: combinación de cushion más avanzada de Jordan Brand",
      "85% energy return — el máximo en baloncesto",
      "6 correas internas: lockdown y contención lateral excepcionales",
      "Herringbone de 40° optimizado para arranques y frenadas",
      "Materiales premium que justifican el precio",
    ],
    contras: [
      "El ZoomX es imán de polvo: traction se degrada rápido sin limpiar",
      "Ligera inestabilidad en el antepié bajo carga lateral intensa",
      "Precio muy elevado (190€+)",
      "Pesada para ser una zapatilla de guards",
    ],
    veredicto:
      "La Air Jordan 40 es la zapatilla mainline de Jordan Brand más impresionante en años. Si buscas el máximo cushion posible en un modelo Jordan, aquí está. Ideal para aleros y forwards que priorizan amortiguación sobre velocidad. Para bases, el ZoomX es excesivo y el precio no justifica el rendimiento extra.",

    imagen_principal: "/shoes/jordan-40.jpg",
    imagenes: [],

    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/air-jordan-40-performance-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/air-jordan-40/" },
    ],
    ultima_actualizacion: "2026-05-25",

    precio_msrp_eur: 199.99,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=air+jordan+40&vst=air+jordan+40", precio_actual: 199.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-25" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=jordan+40", precio_actual: 209.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-25" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=air+jordan+40+baloncesto&tag=canchazapa-21", precio_actual: 199.99, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-25" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 133. ADIDAS DAME X – Damian Lillard 10ª, primer modelo signature <100€
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "adidas-dame-x",
    slug: "adidas-dame-x",
    marca: "Adidas",
    modelo: "Dame X",
    generacion: 10,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Damian Lillard",
    tecnologia_clave: ["Lightstrike midsole", "Stretch-woven upper", "Generative rubber outsole"],
    predecesor_id: "adidas-dame-9",
    sucesor_id: null,

    peso_real_g: 330,
    altura: "low",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 7,
      amortiguacion: 7,
      respuesta: 7,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 8,
      durabilidad_outdoor: 6,
      ventilacion: 8,
    },
    categoria_principal: "balanced",
    tags: ["signature", "budget", "low-top", "guards", "2025", "valor"],

    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [60, 90],
      estilos: ["explosivo", "equilibrado", "tirador"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
    },

    resumen:
      "La Adidas Dame X es el décimo modelo signature de Damian Lillard y el primero de la historia de adidas Basketball en venderse por menos de 100€. Sin sacrificar rendimiento: Lightstrike sólido, upper stretch-woven ligero y suela generativa multidireccional. Una propuesta honesta y bien ejecutada para guards con presupuesto ajustado.",
    pros: [
      "Primer shoe signature adidas por debajo de 100€",
      "Tracción multidireccional fiable en pista interior",
      "Upper stretch-woven ligero y bien ventilado",
      "Ligera y cómoda desde el primer día",
      "Buena relación calidad-precio para guards y escoltas",
    ],
    contras: [
      "Lightstrike básico (no Pro): respuesta inferior a la AE 3",
      "Materiales de calidad más modesta que la Dame 9",
      "Sin función de cushion alta: no apta para jugadores >95kg",
      "Durabilidad outdoor limitada",
    ],
    veredicto:
      "La Dame X es el punto de entrada perfecto al catálogo signature de adidas. A menos de 90€ ofrece más que muchos modelos genéricos de 80€. Si eres base, escolta o alero, juegas en pista interior y no quieres gastar más de 100€, es una de las mejores opciones del mercado 2025.",

    imagen_principal: "/shoes/adidas-dame-x.jpg",
    imagenes: [],

    fuentes: [
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/adidas-dame-x/" },
    ],
    ultima_actualizacion: "2026-05-25",

    precio_msrp_eur: 94.99,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/zapatillas-dame-x", precio_actual: 94.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-25" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=dame+x", precio_actual: 94.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-25" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+dame+x+baloncesto&tag=canchazapa-21", precio_actual: 89.99, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-25" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 134. UA D. FOX 2 (Curry Brand) – De'Aaron Fox 2ª, Charged + UA Flow
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ua-d-fox-2",
    slug: "ua-d-fox-2",
    marca: "Under Armour",
    modelo: "D. Fox 2",
    generacion: 2,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "De'Aaron Fox",
    tecnologia_clave: ["Charged Cushioning", "UA Flow outsole", "Molded engineered strap", "External TPU heel counter"],
    predecesor_id: null,
    sucesor_id: null,

    peso_real_g: 340,
    altura: "low",
    horma: "estrecha",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 7,
      respuesta: 8,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 8,
      durabilidad_outdoor: 7,
      ventilacion: 8,
    },
    categoria_principal: "responsive",
    tags: ["signature", "low-top", "guards", "curry-brand", "2025", "ua-flow"],

    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [65, 95],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: {
      posiciones: ["pivot", "ala-pivot"],
      estilos: ["potente"],
    },

    resumen:
      "La UA D. Fox 2 es la segunda zapatilla signature de De'Aaron Fox bajo el paraguas de Curry Brand (Under Armour). Combina Charged Cushioning con la suela UA Flow sin pegamento, aportando una plataforma ligera, reactiva y con excelente durabilidad. El strap moldeado de ingeniería y el TPU heel counter exterior añaden lockdown sin penalizar el peso.",
    pros: [
      "UA Flow outsole: tracción firme y durabilidad superior al promedio",
      "Charged Cushioning: responsive y confortable para guards",
      "Strap moldeado: lockdown y contención lateral excelentes",
      "Upper ligero y transpirable",
      "Precio razonable para un signature shoe premium",
    ],
    contras: [
      "Horma estrecha: no recomendada para pies anchos",
      "Low-top: soporte de tobillo limitado",
      "Cushion moderado: no ideal para jugadores >95kg",
      "Disponibilidad limitada en España",
    ],
    veredicto:
      "La mejor propuesta de Curry Brand en 2025 para bases explosivos. Si tu prioridad es un primer paso rápido, tracción fiable y lockdown excepcional, la D. Fox 2 compite directamente con la Nike Ja 3 y la AE 3. Para pies anchos o jugadores grandes, mejor mirar otra opción.",

    imagen_principal: "/shoes/ua-d-fox-2.jpg",
    imagenes: [],

    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/curry-fox-2-performance-review/" },
    ],
    ultima_actualizacion: "2026-05-25",

    precio_msrp_eur: 119.99,
    links_compra: [
      { tienda: "ua_es", url: "https://www.underarmour.es/es-es/c/zapatillas-baloncesto/", precio_actual: 119.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-25" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=under+armour+d+fox+2+baloncesto&tag=canchazapa-21", precio_actual: 119.99, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-25" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 135. NIKE KOBE 9 HIGH PROTRO – Retro high, cushion Zoom Air
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "nike-kobe-9-high-protro",
    slug: "nike-kobe-9-high-protro",
    marca: "Nike",
    modelo: "Kobe 9 High Protro",
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Kobe Bryant",
    tecnologia_clave: ["Zoom Air full-length", "Flyknit upper", "carbon fiber shank"],
    predecesor_id: "nike-kobe-8-protro",
    sucesor_id: null,

    peso_real_g: 385,
    altura: "high",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "flyknit",

    puntuaciones: {
      traccion: 9,
      amortiguacion: 8,
      respuesta: 8,
      soporte_lateral: 9,
      estabilidad: 8,
      peso_score: 5,
      durabilidad_outdoor: 7,
      ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["retro", "protro", "signature", "high-top", "kobe", "2024"],

    ideal_para: {
      posiciones: ["alero", "escolta", "ala-pivot"],
      peso_jugador_kg: [70, 105],
      estilos: ["equilibrado", "potente"],
      lesiones_compatibles: ["tobillos", "rodillas"],
    },
    no_recomendada_para: {
      posiciones: [],
      estilos: ["explosivo"],
    },

    resumen:
      "La Kobe 9 High Protro recupera el modelo más voluminoso de la línea Kobe con Zoom Air full-length y upper Flyknit, actualizado con suela moderna. La caña alta y el soporte lateral la hacen ideal para jugadores que buscan protección máxima de tobillo sin renunciar a tracción y cushion de primer nivel.",
    pros: [
      "Caña alta con excelente protección de tobillo",
      "Zoom Air full-length: cushion reactivo y sólido",
      "Tracción herringbone de muy alta calidad",
      "Upper Flyknit: ligero para ser high-top",
      "Icónica estética Kobe con actualización técnica",
    ],
    contras: [
      "385g — pesada para guards que priorizan velocidad",
      "Precio elevado como toda la línea Protro",
      "High-top puede sentirse rígido las primeras horas",
    ],
    veredicto:
      "La mejor Kobe Protro para jugadores que necesitan protección de tobillo. Aleros y ala-pívots con historial de esguinces encontrarán aquí un equilibrio excepcional entre estética retro y rendimiento moderno.",

    imagen_principal: "/shoes/nike-kobe-9-high-protro.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/nike-kobe-9-high-protro-performance-review/" },
    ],
    ultima_actualizacion: "2026-05-26",
    precio_msrp_eur: 199.99,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=kobe+9+protro&vst=kobe+9+protro", precio_actual: 199.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-26" },
      { tienda: "snipes_eu", url: "https://www.awin1.com/cread.php?awinmid=122628&awinaffid=2908587&ued=https%3A%2F%2Fwww.snipes.com%2Fes-es%2Fc%2Fzapatillas%3Fq%3Dkobe%2B9%2Bprotro", precio_actual: 199.99, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-26" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+kobe+9+protro+baloncesto&tag=canchazapa-21", precio_actual: 199.99, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-26" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 136. ADIDAS HARDEN VOL. 10 – Lightstrike Pro, guard premium
  // Ya en catálogo como adidas-harden-vol-10 (imagen fija ahora)
  // 136. JORDAN SUPER FLY 10 – Verticalidad, pívots y aleros
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "jordan-super-fly-10",
    slug: "jordan-super-fly-10",
    marca: "Jordan",
    modelo: "Super Fly 10",
    generacion: 10,
    año_lanzamiento: 2025,
    genero: "unisex",
    tecnologia_clave: ["Zoom Air Strobel", "TPU cage", "herringbone outsole"],
    predecesor_id: "jordan-super-fly-8",
    sucesor_id: null,

    peso_real_g: 398,
    altura: "high",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 9,
      amortiguacion: 8,
      respuesta: 7,
      soporte_lateral: 9,
      estabilidad: 9,
      peso_score: 4,
      durabilidad_outdoor: 7,
      ventilacion: 7,
    },
    categoria_principal: "cushion-focused",
    tags: ["high-top", "2025", "pivots", "aleros", "estabilidad"],

    ideal_para: {
      posiciones: ["pivot", "ala-pivot", "alero"],
      peso_jugador_kg: [85, 130],
      estilos: ["potente", "equilibrado"],
      lesiones_compatibles: ["tobillos", "rodillas"],
    },
    no_recomendada_para: {
      posiciones: ["base"],
      estilos: ["explosivo"],
    },

    resumen:
      "La Jordan Super Fly 10 es la zapatilla de Jordan Brand para pívots y jugadores de poste de 2025. Caña high con TPU cage estructural, Zoom Air Strobel y uno de los mejores herringbones del mercado. Pensada para jugadores físicos que necesitan estabilidad máxima en el juego interior.",
    pros: [
      "Estabilidad 9/10 — la más sólida de la línea Jordan 2025",
      "Soporte lateral excepcional gracias al TPU cage",
      "Tracción herringbone excelente en interior",
      "Zoom Air Strobel: cushion reactivo para pívots",
      "Ideal para jugadores >90kg en el poste",
    ],
    contras: [
      "398g — una de las más pesadas del catálogo",
      "No apta para guards o estilos explosivos",
      "Precio premium Jordan",
    ],
    veredicto:
      "La opción de Jordan Brand para el juego interior en 2025. Si eres pívot o ala-pívot de más de 90kg y priorizas estabilidad y soporte tobillo sobre velocidad, la Super Fly 10 compite directamente con la LeBron 23.",

    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-26",
    precio_msrp_eur: 159.99,
    links_compra: [
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=jordan+super+fly+10", precio_actual: 159.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-26" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=jordan+super+fly+10+baloncesto&tag=canchazapa-21", precio_actual: 159.99, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-26" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 137. PUMA MB.06 – LaMelo Ball, Nitro foam, guard explosivo
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "puma-mb-06",
    slug: "puma-mb-06",
    marca: "Puma",
    modelo: "MB.06",
    generacion: 6,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "LaMelo Ball",
    tecnologia_clave: ["Nitro foam", "Propulsion plate", "RS-X inspired outsole"],
    predecesor_id: "puma-mb05",
    sucesor_id: null,

    peso_real_g: 348,
    altura: "low",
    horma: "normal",
    drop_mm: 7,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 7,
      respuesta: 8,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 7,
      durabilidad_outdoor: 6,
      ventilacion: 8,
    },
    categoria_principal: "responsive",
    tags: ["signature", "low-top", "guards", "lamelo", "2025", "nitro"],

    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [65, 95],
      estilos: ["explosivo", "equilibrado", "tirador"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
    },

    resumen:
      "La MB.06 es la sexta generación de la línea signature de LaMelo Ball con Puma. Nitro foam mejorado, placa de propulsión renovada y diseño inspirado en las RS-X. Más reactiva que la MB.05 con mejor tracción en interior. La propuesta de Puma en el segmento guard explosivo de 2025.",
    pros: [
      "Nitro foam 2025: más reactivo y ligero que la generación anterior",
      "Placa de propulsión: primer paso más explosivo",
      "Diseño llamativo — LaMelo tiene el mejor colorway game del mercado",
      "Buena ventilación para partidos largos",
      "Tracción sólida en interior",
    ],
    contras: [
      "Soporte lateral moderado — low-top sin TPU lateral",
      "Durabilidad outdoor limitada",
      "No compite con GT Cut 4 o AE 3 en rendimiento puro",
    ],
    veredicto:
      "La mejor MB de la línea hasta la fecha. Para guards de hasta 90kg que quieren una zapatilla reactiva, llamativa y con buena ventilación, la MB.06 es una alternativa sólida a la AE 3 y la Ja 3 en 2025.",

    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-26",
    precio_msrp_eur: 139.99,
    links_compra: [
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=puma+mb+06", precio_actual: 139.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-26" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=puma+mb+06+baloncesto&tag=canchazapa-21", precio_actual: 139.99, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-26" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 138. ADIDAS PRO VISION – Budget court, exterior durable
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "adidas-pro-vision",
    slug: "adidas-pro-vision",
    marca: "Adidas",
    modelo: "Pro Vision",
    año_lanzamiento: 2024,
    genero: "unisex",
    tecnologia_clave: ["Cloudfoam cushion", "Rubber outsole", "Mesh upper"],
    predecesor_id: null,
    sucesor_id: null,

    peso_real_g: 370,
    altura: "mid",
    horma: "normal",
    drop_mm: 9,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 7,
      amortiguacion: 6,
      respuesta: 6,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 6,
      durabilidad_outdoor: 8,
      ventilacion: 7,
    },
    categoria_principal: "balanced",
    tags: ["budget", "outdoor", "mid-top", "2024", "adidas"],

    ideal_para: {
      posiciones: ["base", "escolta", "alero", "ala-pivot"],
      peso_jugador_kg: [60, 100],
      estilos: ["equilibrado", "potente"],
    },
    no_recomendada_para: {
      posiciones: [],
      estilos: ["explosivo"],
    },

    resumen:
      "La Adidas Pro Vision es la zapatilla de entrada/mid-range de Adidas para 2024. Cloudfoam básico, suela de goma robusta con buena durabilidad outdoor y horma mid-top versátil. Sin tecnología premium pero con el build quality típico de Adidas a un precio accesible. Perfecta como primera zapatilla o para uso outdoor moderado.",
    pros: [
      "Durabilidad outdoor 8/10 — suela de goma resistente al asfalto",
      "Mid-top con soporte lateral decente",
      "Precio competitivo para el nivel Adidas",
      "Horma versátil — funciona para casi todas las posiciones",
    ],
    contras: [
      "Cloudfoam básico — sin la respuesta del Lightstrike o Boost",
      "No apta para jugadores de alto rendimiento",
      "Peso alto para no tener tecnología premium",
    ],
    veredicto:
      "La opción de Adidas para quien busca una zapatilla fiable por debajo de 80€ con buena durabilidad outdoor. No es para alto rendimiento — para eso mira la AE 3 o Dame X. Pero para recreativo casual en interior y exterior, cumple bien.",

    imagen_principal: "/shoes/adidas-pro-vision.jpg",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-26",
    precio_msrp_eur: 74.99,
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+pro+vision+baloncesto&tag=canchazapa-21", precio_actual: 74.99, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-26" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=adidas+pro+vision", precio_actual: 74.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-26" },
    ],
  },

  // ─── SESIÓN 8: 5 zapas nuevas ────────────────────────────────────────────────
  {
    id: "jordan-xxxix",
    slug: "jordan-xxxix",
    marca: "Jordan",
    modelo: "XXXIX",
    año_lanzamiento: 2024,
    genero: "unisex",
    tecnologia_clave: ["Full-length ZoomX foam", "Full-length Air Zoom", "Herringbone traction"],
    predecesor_id: "jordan-xxxviii",
    sucesor_id: null,

    peso_real_g: 335,
    altura: "mid",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "mesh",

    puntuaciones: {
      traccion: 9,
      amortiguacion: 9,
      respuesta: 9,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 7,
      durabilidad_outdoor: 6,
      ventilacion: 8,
    },
    categoria_principal: "balanced",
    tags: ["2024", "jordan", "mid-top", "zoomx", "air-zoom", "signature", "paolo-banchero"],

    ideal_para: {
      posiciones: ["escolta", "alero", "ala-pivot"],
      peso_jugador_kg: [70, 105],
      estilos: ["equilibrado", "explosivo"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: [],
    },

    resumen:
      "La Air Jordan XXXIX es la primera zapatilla de baloncesto con ZoomX de longitud completa + Air Zoom de longitud completa combinados — un hito en cushioning de Jordan Brand. Debutada por Paolo Banchero en los playoffs 2024, ofrece un nivel de amortiguación sin precedentes en la línea Jordan sin sacrificar respuesta. La suela herringbone mantiene la tracción excelente de la línea.",
    pros: [
      "ZoomX full-length + Air Zoom full-length — el mejor cushion de la historia de Jordan Brand",
      "Tracción herringbone elite en interior",
      "Diseño premium — una de las mejor acabadas de 2024",
      "Versátil para escoltas, aleros y ala-pívots",
    ],
    contras: [
      "Precio muy elevado (200€+)",
      "No apta para outdoor — suela suave ZoomX se desgasta rápido",
      "No la mejor para pívots con mucho impacto",
    ],
    veredicto:
      "La XXXIX es la cúspide de la tecnología Jordan en 2024. Si buscas el máximo cushion en una zapatilla Jordan sin renunciar a la tracción herringbone clásica, es la opción. Compite directamente con el LeBron 22 en amortiguación.",

    imagen_principal: "/shoes/jordan-xxxix.jpg",
    imagenes: [],
    fuentes: ["https://about.nike.com/en/newsroom/releases/air-jordan-39-official-images", "https://ballershoesdb.com/shoes/air-jordan-39/"],
    ultima_actualizacion: "2026-05-26",
    precio_msrp_eur: 200,
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=Air+Jordan+39+baloncesto&tag=canchazapa-21", precio_actual: 210, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-26" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=air+jordan+39", precio_actual: 210, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-26" },
      { tienda: "snipes_eu", url: "https://www.awin1.com/cread.php?awinmid=122628&awinaffid=2908587&ued=https%3A%2F%2Fwww.snipes.com%2Fes-es%2Fc%2Fzapatillas%3Fq%3Djordan%2B39", precio_actual: 200, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-26" },
    ],
  },




  {
    id: "puma-stewie-3",
    slug: "puma-stewie-3",
    marca: "Puma",
    modelo: "Stewie 3",
    año_lanzamiento: 2024,
    genero: "mujer",
    tecnologia_clave: ["Nitrofoam", "ProFoam+", "TPU shank plate", "Herringbone outsole"],
    predecesor_id: null,
    sucesor_id: null,

    peso_real_g: 300,
    altura: "low",
    horma: "normal",
    drop_mm: 6,
    tipo_cierre: "cordones",
    material_superior: "woven mesh",

    puntuaciones: {
      traccion: 8,
      amortiguacion: 6,
      respuesta: 7,
      soporte_lateral: 6,
      estabilidad: 6,
      peso_score: 9,
      durabilidad_outdoor: 6,
      ventilacion: 8,
    },
    categoria_principal: "speed",
    tags: ["2024", "puma", "low-top", "mujer", "breanna-stewart", "guards", "ligera", "nitrofoam"],

    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [55, 85],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: {
      posiciones: ["pivot", "ala-pivot"],
      estilos: ["potente"],
    },

    resumen:
      "La Puma Stewie 3 es la tercera firma de Breanna Stewart (dos veces campeona WNBA). Combina Nitrofoam en el antepié con ProFoam+ en el talón y una placa de TPU para estabilidad torsional. Su upper de malla tejida es más transpirable que generaciones anteriores. Diseñada específicamente para la anatomía del pie femenino — no es un modelo masculino recoloreado.",
    pros: [
      "Nitrofoam + ProFoam+ — la mejor combinación de Puma en una firma",
      "Horma femenina real — superior al ajuste de modelos unisex",
      "Ultraligera (300g) — entre las más ligeras del mercado",
      "Tracción herringbone sólida en interior",
    ],
    contras: [
      "Cushion limitado para posiciones interiores",
      "Low-top — poca protección de tobillo",
      "Disponibilidad en España más limitada que Nike o Adidas",
    ],
    veredicto:
      "La Stewie 3 es una de las pocas zapatillas de baloncesto con diseño femenino real. Si juegas de base o escolta y quieres tecnología de primer nivel a 120€, es una de las mejores opciones del mercado en 2024-2025.",

    imagen_principal: "/shoes/puma-stewie-3.jpg",
    imagenes: [],
    fuentes: ["https://weartesters.com/puma-stewie-3-review/", "https://ballershoesdb.com/shoes/puma-stewie-3/"],
    ultima_actualizacion: "2026-05-26",
    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=Puma+Stewie+3+baloncesto&tag=canchazapa-21", precio_actual: 120, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-26" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=puma+stewie+3", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-26" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ZAPAS RETRO / HISTÓRICAS — excluidas del quiz (es_retro: true)
  // Puntuaciones = rendimiento técnico real de su época, no valor coleccionismo
  // ═══════════════════════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────────────────────────────────
  // R-01. AIR JORDAN 1 (1985)
  {
    id: "air-jordan-1",
    slug: "air-jordan-1",
    es_retro: true,
    marca: "Jordan",
    modelo: "Air Jordan 1",
    año_lanzamiento: 1985,
    genero: "unisex",
    signature_player: "Michael Jordan",
    tecnologia_clave: ["Cuero full-grain", "Suela vulcanizada", "Foam básico", "Alta caña"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 460,
    altura: "high",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "leather",
    puntuaciones: {
      traccion: 5,
      amortiguacion: 3,
      respuesta: 2,
      soporte_lateral: 5,
      estabilidad: 5,
      peso_score: 3,
      durabilidad_outdoor: 6,
      ventilacion: 3,
    },
    categoria_principal: "balanced",
    tags: ["retro", "iconic", "jordan", "leather", "high-top", "coleccionismo"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero", "ala-pivot", "pivot"],
      peso_jugador_kg: [50, 130],
      estilos: ["equilibrado"],
    },
    no_recomendada_para: {
      lesiones: ["rodillas", "tobillos", "fascia"],
      posiciones: ["pivot"],
    },
    resumen: "La que lo empezó todo. La Air Jordan 1 de 1985 fue baneada por la NBA, calzó al mejor de todos los tiempos y redefinió lo que una zapatilla podía significar culturalmente. Tecnológicamente, por estándares actuales, es un cuero pesado con foam básico y cero Air. Su score refleja eso — pero nadie la compra para jugar.",
    pros: [
      "Icono cultural absoluto — la zapatilla más influyente de la historia",
      "Construcción en cuero que dura décadas si se cuida",
      "Alta caña: algo de soporte de tobillo pasivo",
      "Disponible en cientos de colorways únicos",
    ],
    contras: [
      "Sin Air visible ni amortiguación moderna — foam básico",
      "Muy pesada para estándares actuales (460g+)",
      "Cero transpirabilidad en cuero completo",
      "No recomendada para jugar en serio con ella",
    ],
    veredicto: "Un 3.8/10 en rendimiento, un 10/10 en historia. Si vas a la pista con unas AJ1, hazlo por estilo, no por performance. Para colección, con atadura cultural incalculable.",
    imagen_principal: "/shoes/air-jordan-1.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-27",
    precio_msrp_eur: 180,
    links_compra: [
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/category/jordan/air-jordan-1", precio_actual: 180, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-27" },
      { tienda: "jd_sports_es", url: "https://www.jdsports.es/search?q=air+jordan+1", precio_actual: 185, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-27" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=air+jordan+1+retro&tag=canchazapa-21", precio_actual: 190, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // R-02. AIR JORDAN 3 (1988)
  {
    id: "air-jordan-3",
    slug: "air-jordan-3",
    es_retro: true,
    marca: "Jordan",
    modelo: "Air Jordan 3",
    año_lanzamiento: 1988,
    genero: "unisex",
    signature_player: "Michael Jordan",
    tecnologia_clave: ["Visible Air heel", "Jumpman logo (debut)", "Elephant print", "Foam midsole"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 440,
    altura: "mid",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "leather",
    puntuaciones: {
      traccion: 6,
      amortiguacion: 4,
      respuesta: 3,
      soporte_lateral: 5,
      estabilidad: 5,
      peso_score: 3,
      durabilidad_outdoor: 6,
      ventilacion: 3,
    },
    categoria_principal: "balanced",
    tags: ["retro", "iconic", "jordan", "elephant-print", "jumpman", "coleccionismo"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero", "ala-pivot", "pivot"],
      peso_jugador_kg: [50, 130],
      estilos: ["equilibrado"],
    },
    no_recomendada_para: { lesiones: ["rodillas", "tobillos", "fascia"] },
    resumen: "La Air Jordan 3 de 1988 fue la primera con el logo Jumpman y la primera con Air visible en el talón. Diseñada por Tinker Hatfield, cambió el lenguaje visual del calzado deportivo. El estampado 'elephant print' sigue siendo uno de los más reconocibles 35 años después.",
    pros: [
      "Primera con Jumpman y Air visible — punto de inflexión histórico",
      "Outsole elephant print icónico con buen agarre en su época",
      "Construcción robusta en cuero premium",
      "Una de las favoritas absolutas de los coleccionistas",
    ],
    contras: [
      "Air unit mínima comparada con lo moderno",
      "Foam muy básico por estándares actuales",
      "Pesada y sin transpirabilidad moderna",
    ],
    veredicto: "El nacimiento del Jumpman. Llévala para mostrar historia, no para jugar 40 minutos. Un 4.4/10 en performance, pero emotivamente indiscutible.",
    imagen_principal: "/shoes/air-jordan-3.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-27",
    precio_msrp_eur: 200,
    links_compra: [
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=air+jordan+3", precio_actual: 200, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-27" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=air+jordan+3+retro&tag=canchazapa-21", precio_actual: 210, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // R-03. AIR JORDAN 4 (1989) — "Cement"
  {
    id: "air-jordan-4",
    slug: "air-jordan-4",
    es_retro: true,
    marca: "Jordan",
    modelo: "Air Jordan 4",
    año_lanzamiento: 1989,
    genero: "unisex",
    signature_player: "Michael Jordan",
    tecnologia_clave: ["Air unit en talón", "Wings de soporte lateral", "Malla en lateral", "Cement outsole"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 435,
    altura: "mid",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "leather",
    puntuaciones: {
      traccion: 6,
      amortiguacion: 4,
      respuesta: 3,
      soporte_lateral: 6,
      estabilidad: 6,
      peso_score: 3,
      durabilidad_outdoor: 6,
      ventilacion: 4,
    },
    categoria_principal: "balanced",
    tags: ["retro", "iconic", "jordan", "cement", "coleccionismo", "do-the-right-thing"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero", "ala-pivot", "pivot"],
      peso_jugador_kg: [50, 130],
      estilos: ["equilibrado"],
    },
    no_recomendada_para: { lesiones: ["rodillas", "tobillos", "fascia"] },
    resumen: "La Jordan 4 'Cement' de 1989 es una de las más solicitadas de la historia. Fue la primera Jordan con malla en el lateral para ventilación y los icónicos 'wings' de soporte. La usó MJ para el 'The Shot' en Cleveland y se inmortalizó en 'Do The Right Thing' de Spike Lee.",
    pros: [
      "Wings laterales: soporte pasable para su época",
      "Malla en lateral: mejor ventilación que la AJ1/3",
      "Outsole 'cement' con patrón icónico y decente grip",
      "Colorways míticos: 'Fire Red', 'Bred', 'Cement' — valor enorme",
    ],
    contras: [
      "Air unit pequeña vs cualquier zapato moderno",
      "Pesada y con foam envejecido",
      "Suelas de foam duro — nada reactivo",
    ],
    veredicto: "La favorita de muchos coleccionistas. Un 4.5/10 en performance con tecnología de 1989, pero culturalmente una de las 5 zapatillas más importantes jamás creadas.",
    imagen_principal: "/shoes/air-jordan-4.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-27",
    precio_msrp_eur: 220,
    links_compra: [
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=air+jordan+4", precio_actual: 220, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-27" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=air+jordan+4+retro&tag=canchazapa-21", precio_actual: 230, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // R-04. AIR JORDAN 6 (1991) — primer campeonato
  {
    id: "air-jordan-6",
    slug: "air-jordan-6",
    es_retro: true,
    marca: "Jordan",
    modelo: "Air Jordan 6",
    año_lanzamiento: 1991,
    genero: "unisex",
    signature_player: "Michael Jordan",
    tecnologia_clave: ["Air unit heel", "Internal heel counter", "Rubber outsole", "Strap en empeine"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 430,
    altura: "mid",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "leather",
    puntuaciones: {
      traccion: 6,
      amortiguacion: 5,
      respuesta: 4,
      soporte_lateral: 6,
      estabilidad: 6,
      peso_score: 3,
      durabilidad_outdoor: 6,
      ventilacion: 4,
    },
    categoria_principal: "balanced",
    tags: ["retro", "iconic", "jordan", "primer-titulo", "coleccionismo", "infrared"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero", "ala-pivot", "pivot"],
      peso_jugador_kg: [50, 130],
      estilos: ["equilibrado"],
    },
    no_recomendada_para: { lesiones: ["rodillas", "fascia"] },
    resumen: "Con la Air Jordan 6, Michael Jordan ganó su primer anillo en 1991. El counter interno de talón y la lengüeta pull-tab fueron innovaciones reales en su época. El colorway 'Infrared' original (blanco/negro/rojo) es uno de los más deseados de todos los tiempos.",
    pros: [
      "El anillo del primer campeonato — carga emocional máxima",
      "Heel counter interno: lockdown decente para 1991",
      "Air unit algo mayor que las Jordan anteriores",
      "Pull-tab de lengüeta: detalle funcional que se copió en toda la industria",
    ],
    contras: [
      "Foam envejecido por estándares modernos",
      "Pesada y sin transpirabilidad",
      "Sin el soporte lateral de diseños contemporáneos",
    ],
    veredicto: "La zapatilla del primer título de MJ. Performance 4.9/10 — suficiente para ganar en 1991, insuficiente hoy. Para colección, un must absoluto.",
    imagen_principal: "/shoes/air-jordan-6.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-27",
    precio_msrp_eur: 210,
    links_compra: [
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=air+jordan+6", precio_actual: 210, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-27" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=air+jordan+6+retro&tag=canchazapa-21", precio_actual: 215, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // R-05. AIR JORDAN 11 (1995) — patent leather, Space Jam
  {
    id: "air-jordan-11",
    slug: "air-jordan-11",
    es_retro: true,
    marca: "Jordan",
    modelo: "Air Jordan 11",
    año_lanzamiento: 1995,
    genero: "unisex",
    signature_player: "Michael Jordan",
    tecnologia_clave: ["Patent leather", "Ballistic mesh", "Carbon fiber shank", "Full-length Air"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 415,
    altura: "high",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "leather",
    puntuaciones: {
      traccion: 6,
      amortiguacion: 6,
      respuesta: 5,
      soporte_lateral: 6,
      estabilidad: 6,
      peso_score: 4,
      durabilidad_outdoor: 5,
      ventilacion: 5,
    },
    categoria_principal: "balanced",
    tags: ["retro", "iconic", "jordan", "space-jam", "patent-leather", "concord", "coleccionismo"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero", "ala-pivot", "pivot"],
      peso_jugador_kg: [50, 130],
      estilos: ["equilibrado"],
    },
    no_recomendada_para: { lesiones: ["rodillas"] },
    resumen: "La Air Jordan 11 de 1995 es la más vendida de la historia. La barniz de cuero patente, el hilo balístico en el upper y el shank de fibra de carbono fueron avanzados para su época. MJ la usó para volver al baloncesto en 1995 y para Space Jam en 1996. Cada año hay una colorway nueva que agota en minutos.",
    pros: [
      "Full-length Air: mejor amortiguación de su generación",
      "Carbon fiber shank: rigidez torsional real — innovación real en 1995",
      "Ballistic mesh: buena transpirabilidad para ser una zapatilla de cuero",
      "La más performante de todas las Jordan retro listadas aquí",
    ],
    contras: [
      "Patent leather: raya con facilidad, no es para pista",
      "Cuero patente resbala en pista mojada",
      "Precio desorbitado en fechas de lanzamiento retro",
    ],
    veredicto: "La única Jordan retro con la que todavía podrías jugar un pickup y no quedar en ridículo técnico. 5.4/10 performance pero culturalmente es la más codiciada del mercado.",
    imagen_principal: "/shoes/air-jordan-11.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-27",
    precio_msrp_eur: 220,
    links_compra: [
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=air+jordan+11", precio_actual: 220, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-27" },
      { tienda: "jd_sports_es", url: "https://www.jdsports.es/search?q=air+jordan+11", precio_actual: 220, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-27" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=air+jordan+11+retro&tag=canchazapa-21", precio_actual: 240, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // R-06. AIR JORDAN 13 (1997) — "Playoffs", pantera
  {
    id: "air-jordan-13",
    slug: "air-jordan-13",
    es_retro: true,
    marca: "Jordan",
    modelo: "Air Jordan 13",
    año_lanzamiento: 1997,
    genero: "unisex",
    signature_player: "Michael Jordan",
    tecnologia_clave: ["Air unit 360 visible", "Carbon fiber shank", "Holographic eye", "Herringbone outsole"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 440,
    altura: "mid",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "leather",
    puntuaciones: {
      traccion: 7,
      amortiguacion: 6,
      respuesta: 5,
      soporte_lateral: 6,
      estabilidad: 6,
      peso_score: 3,
      durabilidad_outdoor: 6,
      ventilacion: 5,
    },
    categoria_principal: "traction-king",
    tags: ["retro", "iconic", "jordan", "playoffs", "pantera", "coleccionismo"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero", "ala-pivot", "pivot"],
      peso_jugador_kg: [50, 130],
      estilos: ["equilibrado"],
    },
    no_recomendada_para: { lesiones: ["rodillas"] },
    resumen: "Inspirada en la pantera negra, la Jordan 13 de 1997 tiene el 'ojo holográfico' en la suela y el outsole con el mejor grip de todas las Jordan retro. MJ la llevó en los Playoffs del 98 — los últimos que ganó con los Bulls. Su outsole circular multidireccional fue un diseño genuinamente avanzado.",
    pros: [
      "Mejor tracción de todas las Jordan retro — outsole circular icónico",
      "Air visible + carbon fiber shank: combinación sólida para 1997",
      "El ojo holográfico es el detalle de diseño más único de cualquier retro",
      "Se puede jugar algún partido con ella sin quedar en evidencia",
    ],
    contras: [
      "Muy pesada para estándares actuales",
      "Foam de mediados de los 90 — sin energía de retorno",
    ],
    veredicto: "La Jordan retro más performante junto a la 11. Tracción real (7/10) y un diseño bestial. Score global 5.5/10. Para jugar pickup ocasional o colección, es fantástica.",
    imagen_principal: "/shoes/air-jordan-13.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-27",
    precio_msrp_eur: 210,
    links_compra: [
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=air+jordan+13", precio_actual: 210, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-27" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=air+jordan+13+retro&tag=canchazapa-21", precio_actual: 215, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // R-07. NIKE KOBE 4 PROTRO (2009/retro 2019)
  {
    id: "nike-kobe-4-protro",
    slug: "nike-kobe-4-protro",
    es_retro: true,
    marca: "Nike",
    modelo: "Kobe 4 Protro",
    año_lanzamiento: 2009,
    genero: "unisex",
    signature_player: "Kobe Bryant",
    tecnologia_clave: ["Zoom Air forefoot", "Low-top", "Herringbone outsole", "Synthetic upper"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 300,
    altura: "low",
    horma: "normal",
    drop_mm: 9,
    tipo_cierre: "cordones",
    material_superior: "synthetic",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 6,
      respuesta: 7,
      soporte_lateral: 5,
      estabilidad: 6,
      peso_score: 7,
      durabilidad_outdoor: 5,
      ventilacion: 7,
    },
    categoria_principal: "responsive",
    tags: ["retro", "kobe", "low-top", "zoom-air", "coleccionismo", "wizenard", "ftb"],
    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [50, 85],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      estilos: ["potente"],
      lesiones: ["tobillos"],
    },
    resumen: "La Kobe 4 fue revolucionaria en 2009: la primera Kobe signature low-top cuando los jugadores aún usaban high-tops 'por seguridad'. Ligera, reactiva, con Zoom Air en antepié. Kobe la llevó para ganar su primer título sin Shaq. La versión Protro (retro con materiales actualizados) es técnicamente competitiva todavía hoy.",
    pros: [
      "Zoom Air antepié: responsividad real — sigue siendo competitiva hoy",
      "Outsole herringbone excelente — uno de los mejores grips de un retro",
      "Ligera para ser una retro (300g) gracias al upper sintético del Protro",
      "Fit ajustado y preciso: ideal para guards",
    ],
    contras: [
      "Low-top: riesgo de tobillo en jugadores con historial de esguince",
      "Durabilidad outdoor limitada — el outsole se desgasta rápido en asfalto",
      "Stock muy limitado en cada drop — precios de resale disparados",
    ],
    veredicto: "La Kobe Protro más jugable de todas. Con un 6.5/10 en performance, todavía puedes saltar a la pista sin vergüenza. Para guards explosivos y coleccionistas es la compra perfecta.",
    imagen_principal: "/shoes/nike-kobe-4-protro.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-27",
    precio_msrp_eur: 175,
    links_compra: [
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=kobe+4+protro", precio_actual: 175, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-27" },
      { tienda: "kickscrew", url: "https://www.kickscrew.com/collections/kobe-4-protro", precio_actual: 180, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-27" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=Nike+Kobe+4+Protro&tag=canchazapa-21", precio_actual: 200, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // R-08. NIKE KOBE 5 PROTRO (2010/retro 2020) — "Chaos", "Big Stage"
  {
    id: "nike-kobe-5-protro",
    slug: "nike-kobe-5-protro",
    es_retro: true,
    marca: "Nike",
    modelo: "Kobe 5 Protro",
    año_lanzamiento: 2010,
    genero: "unisex",
    signature_player: "Kobe Bryant",
    tecnologia_clave: ["Zoom Air dual", "Low-top minimalista", "Herringbone outsole", "Fit System"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 290,
    altura: "low",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "synthetic",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 6,
      respuesta: 7,
      soporte_lateral: 5,
      estabilidad: 6,
      peso_score: 8,
      durabilidad_outdoor: 5,
      ventilacion: 7,
    },
    categoria_principal: "responsive",
    tags: ["retro", "kobe", "low-top", "chaos", "big-stage", "coleccionismo"],
    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [50, 85],
      estilos: ["explosivo"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      lesiones: ["tobillos"],
    },
    resumen: "La Kobe 5 fue aún más ligera y minimalista que la 4. Doble unidad Zoom Air (antepié y talón) y el upper más fino de la saga signature de Kobe. La llevó para ganar el segundo ring back-to-back. El colorway 'Chaos' del Joker es uno de los más buscados de la historia.",
    pros: [
      "La más ligera de todas las Kobe Protro (290g)",
      "Doble Zoom Air: excelente para guards explosivos",
      "Outsole herringbone de alta calidad — grip fiable",
      "'Chaos', 'Big Stage', 'Prelude' — colorways míticos",
    ],
    contras: [
      "Upper muy fino: poco soporte lateral",
      "Low-top puro: no apta para jugadores con problemas de tobillo",
      "Durabilidad outdoor: outsole de Protro se desgasta rápido",
    ],
    veredicto: "La favorita de muchos guards reales para jugar. 6.6/10 en performance — todavía funcional en pista interior. Y si encuentras un 'Chaos' en tu talla, es una reliquia.",
    imagen_principal: "/shoes/nike-kobe-5-protro.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-27",
    precio_msrp_eur: 175,
    links_compra: [
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=kobe+5+protro", precio_actual: 175, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-27" },
      { tienda: "kickscrew", url: "https://www.kickscrew.com/collections/kobe-5-protro", precio_actual: 185, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-27" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=Nike+Kobe+5+Protro&tag=canchazapa-21", precio_actual: 195, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // R-09. NIKE KOBE 6 PROTRO (2010/retro 2021) — "Grinch"
  {
    id: "nike-kobe-6-protro",
    slug: "nike-kobe-6-protro",
    es_retro: true,
    marca: "Nike",
    modelo: "Kobe 6 Protro",
    año_lanzamiento: 2010,
    genero: "unisex",
    signature_player: "Kobe Bryant",
    tecnologia_clave: ["Zoom Air forefoot+heel", "Low-top", "Herringbone outsole", "Kobe System upper"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 295,
    altura: "low",
    horma: "normal",
    drop_mm: 8,
    tipo_cierre: "cordones",
    material_superior: "synthetic",
    puntuaciones: {
      traccion: 8,
      amortiguacion: 7,
      respuesta: 7,
      soporte_lateral: 5,
      estabilidad: 6,
      peso_score: 8,
      durabilidad_outdoor: 5,
      ventilacion: 7,
    },
    categoria_principal: "responsive",
    tags: ["retro", "kobe", "low-top", "grinch", "coleccionismo", "mambamentality"],
    ideal_para: {
      posiciones: ["base", "escolta"],
      peso_jugador_kg: [50, 90],
      estilos: ["explosivo", "equilibrado"],
    },
    no_recomendada_para: {
      posiciones: ["pivot"],
      lesiones: ["tobillos"],
    },
    resumen: "La Kobe 6 perfeccionó la fórmula de las 4 y 5. El upper Kobe System mejoró el soporte sin añadir peso. La versión 'Grinch' (verde navideño de 2010) es la zapatilla retro más deseada de la saga Kobe. Su Protro de 2021 agotó en segundos y se revende a 3× el precio MSRP.",
    pros: [
      "La más equilibrada de las Kobe Protro — mejor combinación peso/soporte",
      "Zoom Air dual actualizado — responsividad real en 2026",
      "Upper Kobe System: mejor fit que la 4 y 5",
      "'Grinch' 2021: uno de los drops más icónicos de la última década",
    ],
    contras: [
      "Stock prácticamente imposible en colorways populares",
      "Precio de resale muy por encima del MSRP en Grinch/Prelude",
      "Low-top: no apta para problemas de tobillo",
    ],
    veredicto: "La mejor de las Kobe Protro técnicamente. 6.7/10 en performance — si la encuentras en tu talla, puedes jugar con ella y no arrepentirte. El 'Grinch' es la unicornio absoluta.",
    imagen_principal: "/shoes/nike-kobe-6-protro.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-27",
    precio_msrp_eur: 175,
    links_compra: [
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=kobe+6+protro", precio_actual: 175, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-27" },
      { tienda: "kickscrew", url: "https://www.kickscrew.com/collections/kobe-6-protro", precio_actual: 195, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-27" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=Nike+Kobe+6+Protro&tag=canchazapa-21", precio_actual: 200, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // R-10. REEBOK SHAQ ATTAQ (1992)
  {
    id: "reebok-shaq-attaq",
    slug: "reebok-shaq-attaq",
    es_retro: true,
    marca: "Reebok",
    modelo: "Shaq Attaq",
    año_lanzamiento: 1992,
    genero: "unisex",
    signature_player: "Shaquille O'Neal",
    tecnologia_clave: ["Pump technology", "High-top", "Hexalite cushioning", "Cuero full-grain"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 570,
    altura: "high",
    horma: "ancha",
    drop_mm: 12,
    tipo_cierre: "cordones",
    material_superior: "leather",
    puntuaciones: {
      traccion: 5,
      amortiguacion: 5,
      respuesta: 3,
      soporte_lateral: 6,
      estabilidad: 7,
      peso_score: 1,
      durabilidad_outdoor: 5,
      ventilacion: 3,
    },
    categoria_principal: "cushion-focused",
    tags: ["retro", "shaq", "reebok", "pump", "high-top", "coleccionismo", "nba-1992"],
    ideal_para: {
      posiciones: ["pivot", "ala-pivot"],
      peso_jugador_kg: [85, 130],
      estilos: ["potente"],
    },
    no_recomendada_para: {
      estilos: ["explosivo"],
      lesiones: ["fascia"],
    },
    resumen: "La Shaq Attaq fue diseñada para el jugador más dominante físicamente de su generación. Con la tecnología Pump de Reebok y construcción en cuero masivo, pesaba más de medio kilo. Shaquille O'Neal la usó en el Orlando Magic. Hoy es un símbolo de los 90 y un objeto de colección puro.",
    pros: [
      "Tecnología Pump: inflado para ajuste — innovadora en 1992",
      "Hexalite en talón: amortiguación decente para pívots de su época",
      "Estabilidad brutal gracias al peso y la base ancha",
      "Icono visual de los 90 — inmediatamente reconocible",
    ],
    contras: [
      "570g — la más pesada de este catálogo. Literal como llevar dos ladrillos",
      "Sin energía de retorno — foam básico bajo el Hexalite",
      "Cuero completo: sin transpirabilidad",
      "Para jugar hoy con ella necesitas mucha tolerancia al dolor",
    ],
    veredicto: "Un 4.4/10 que se justifica por lo brutal del contexto: Shaq la llevó en los 90. Para cualquier pivot alto que quiera un gag sobre el court. Para colección, una pieza de los 90 auténtica.",
    imagen_principal: "/shoes/reebok-shaq-attaq.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-27",
    precio_msrp_eur: 150,
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=Reebok+Shaq+Attaq&tag=canchazapa-21", precio_actual: 150, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // R-11. REEBOK PUMP OMNI LITE (1989) — la Pump original de baloncesto
  {
    id: "reebok-pump-omni-lite",
    slug: "reebok-pump-omni-lite",
    es_retro: true,
    marca: "Reebok",
    modelo: "Pump Omni Lite",
    año_lanzamiento: 1989,
    genero: "unisex",
    signature_player: undefined,
    tecnologia_clave: ["Pump inflation system", "High-top", "Hexalite", "Cuero/sintético"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 490,
    altura: "high",
    horma: "normal",
    drop_mm: 12,
    tipo_cierre: "cordones",
    material_superior: "leather",
    puntuaciones: {
      traccion: 5,
      amortiguacion: 5,
      respuesta: 3,
      soporte_lateral: 7,
      estabilidad: 6,
      peso_score: 2,
      durabilidad_outdoor: 5,
      ventilacion: 3,
    },
    categoria_principal: "cushion-focused",
    tags: ["retro", "reebok", "pump", "high-top", "dee-brown", "coleccionismo", "1989"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [50, 100],
      estilos: ["equilibrado"],
    },
    no_recomendada_para: {
      estilos: ["explosivo"],
      lesiones: ["fascia"],
    },
    resumen: "La Pump fue la gran innovación de Reebok: inflas la zapatilla con la pelotita de baloncesto en la lengüeta para un ajuste personalizado. Dee Brown la usó (y la infló) en el concurso de mates del All-Star 1991 — sin mirar la canasta — y ganó. Un momento televisivo mítico.",
    pros: [
      "Sistema Pump genuinamente innovador — inflado personalizado del ajuste",
      "Soporte lateral del tobillo mejorado gracias al ajuste de aire",
      "Un objeto de colección con narrativa cultural potentísima",
      "La pelotita de baloncesto en la lengüeta es el detalle más memorable de los 90",
    ],
    contras: [
      "490g — casi medio kilo por pie",
      "Sin energía de retorno real",
      "Foam de 1989 — amortiguación anticuada",
      "La cámara de aire puede pincharse con los años",
    ],
    veredicto: "Un 4.3/10 en performance, pero la historia de Dee Brown en el All-Star vale más que cualquier score. Para coleccionistas de los 90, una pieza fundamental.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-27",
    precio_msrp_eur: 160,
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=Reebok+Pump+Omni+Lite&tag=canchazapa-21", precio_actual: 160, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // R-12. NIKE AIR FOAMPOSITE ONE (1997) — Penny Hardaway
  {
    id: "nike-air-foamposite-one",
    slug: "nike-air-foamposite-one",
    es_retro: true,
    marca: "Nike",
    modelo: "Air Foamposite One",
    año_lanzamiento: 1997,
    genero: "unisex",
    signature_player: "Penny Hardaway",
    tecnologia_clave: ["Foamposite shell", "Zoom Air", "Herringbone circular", "Carbon fiber shank"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 530,
    altura: "high",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "synthetic",
    puntuaciones: {
      traccion: 5,
      amortiguacion: 5,
      respuesta: 3,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 2,
      durabilidad_outdoor: 7,
      ventilacion: 1,
    },
    categoria_principal: "traction-king",
    tags: ["retro", "foamposite", "penny", "hardaway", "coleccionismo", "galaxy", "royal"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [50, 100],
      estilos: ["equilibrado"],
    },
    no_recomendada_para: {
      estilos: ["explosivo"],
      lesiones: ["fascia", "rodillas"],
    },
    resumen: "La Foamposite es probablemente la zapatilla más extraña y más icónica de la historia del baloncesto. El upper es una sola pieza de plástico inyectado — como llevar un casco de moto en el pie. Sin costuras, sin malla. Penny Hardaway la usó en el Orlando Magic cuando era el segundo mejor jugador del mundo. Es increíblemente duradera y extremadamente incómoda.",
    pros: [
      "Durabilidad outdoor: el shell de Foamposite no se desgasta — casi indestructible",
      "Soporte lateral pasivo máximo — la carcasa rígida no cede",
      "Estabilidad excelente — no hay torsión posible con ese upper",
      "Zoom Air: buena amortiguación para su época",
      "El colorway 'Royal' es uno de los 5 más icónicos de la historia",
    ],
    contras: [
      "530g — tan pesada como una bota de montaña",
      "Ventilación: literalmente cero. Es plástico sólido",
      "Sin energía de retorno — foam básico debajo del Zoom",
      "Rigidez del shell: el pie tarda semanas en adaptarse",
    ],
    veredicto: "1/10 en ventilación, 7/10 en durabilidad, una leyenda del diseño. La Foamposite es la zapatilla más polarizante de la historia: o la amas o la odias. Con 4.6/10 en performance, es mejor para la vitrina que para el partido.",
    imagen_principal: "/shoes/nike-air-foamposite-one.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-27",
    precio_msrp_eur: 250,
    links_compra: [
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?q=foamposite", precio_actual: 250, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-27" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=Nike+Air+Foamposite+One&tag=canchazapa-21", precio_actual: 280, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // R-13. CONVERSE CHUCK TAYLOR ALL STAR (1917) — la abuela de todas
  {
    id: "converse-chuck-taylor",
    slug: "converse-chuck-taylor",
    es_retro: true,
    marca: "Converse",
    modelo: "Chuck Taylor All Star",
    año_lanzamiento: 1917,
    genero: "unisex",
    signature_player: "Chuck Taylor",
    tecnologia_clave: ["Lona de algodón", "Suela de goma vulcanizada", "Punta de goma", "Ninguna otra tecnología"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 380,
    altura: "high",
    horma: "ancha",
    drop_mm: 0,
    tipo_cierre: "cordones",
    material_superior: "mesh",
    puntuaciones: {
      traccion: 3,
      amortiguacion: 1,
      respuesta: 1,
      soporte_lateral: 2,
      estabilidad: 4,
      peso_score: 6,
      durabilidad_outdoor: 3,
      ventilacion: 8,
    },
    categoria_principal: "balanced",
    tags: ["retro", "converse", "classica", "lona", "vintage", "coleccionismo", "hip-hop"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero", "ala-pivot", "pivot"],
      peso_jugador_kg: [50, 130],
      estilos: ["equilibrado"],
    },
    no_recomendada_para: {
      lesiones: ["rodillas", "tobillos", "fascia"],
      posiciones: ["pivot"],
    },
    resumen: "La Chuck Taylor de 1917 fue LA zapatilla de baloncesto durante décadas. Se llevó en los JJOO de 1936 y dominó la NBA hasta los años 70. Hoy es una zapatilla de lifestyle pura — con 0mm de drop, 1/10 en amortiguación y 2/10 en soporte lateral, jugar con ellas es un acto de fe. Pero nadie supera su valor cultural.",
    pros: [
      "La zapatilla más vendida de la historia — más de 1.000 millones de pares",
      "Suela de goma vulcanizada: el origen de todo el baloncesto moderno",
      "Transpirabilidad máxima: es lona de algodón — el pie respira",
      "Precio accesible — la única retro por menos de 80€",
    ],
    contras: [
      "0mm de drop: sin amortiguación de ningún tipo",
      "Suela plana de goma fina: grip mínimo en cancha mojada",
      "1/10 en cushion: el foam no existe — es lona y goma",
      "Para jugadores con más de 80kg: el impacto en rodillas es considerable",
    ],
    veredicto: "El score global más bajo del catálogo: 3.5/10. Pero si tienes que llevar solo una zapatilla en una isla desierta, posiblemente sea esta. No la uses para jugar en serio — úsala para todo lo demás.",
    imagen_principal: "/shoes/converse-chuck-taylor.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-27",
    precio_msrp_eur: 75,
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=Converse+Chuck+Taylor+All+Star+high&tag=canchazapa-21", precio_actual: 75, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
      { tienda: "zalando_es", url: "https://www.zalando.es/converse-zapatillas-altas/", precio_actual: 75, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-27" },
      { tienda: "jd_sports_es", url: "https://www.jdsports.es/search?q=converse+chuck+taylor", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-27" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // R-14. NIKE AIR PENNY 2 (1996) — Penny Hardaway
  {
    id: "nike-air-penny-2",
    slug: "nike-air-penny-2",
    es_retro: true,
    marca: "Nike",
    modelo: "Air Penny 2",
    año_lanzamiento: 1996,
    genero: "unisex",
    signature_player: "Penny Hardaway",
    tecnologia_clave: ["Zoom Air", "Foamposite-lite upper", "Strap de sujeción", "Carbon fiber"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 420,
    altura: "mid",
    horma: "normal",
    drop_mm: 10,
    tipo_cierre: "cordones",
    material_superior: "synthetic",
    puntuaciones: {
      traccion: 6,
      amortiguacion: 5,
      respuesta: 4,
      soporte_lateral: 6,
      estabilidad: 6,
      peso_score: 4,
      durabilidad_outdoor: 5,
      ventilacion: 4,
    },
    categoria_principal: "balanced",
    tags: ["retro", "penny", "hardaway", "nike", "coleccionismo", "orlando-magic"],
    ideal_para: {
      posiciones: ["base", "escolta", "alero"],
      peso_jugador_kg: [50, 95],
      estilos: ["equilibrado", "explosivo"],
    },
    no_recomendada_para: {
      lesiones: ["rodillas"],
      posiciones: ["pivot"],
    },
    resumen: "La Air Penny 2 de 1996 fue la segunda de la saga de Anfernee 'Penny' Hardaway. El upper con elementos de Foamposite-lite, el strap de sujeción y el Zoom Air la convirtieron en una de las zapatillas más técnicas de su año. Penny era el favorito para suceder a Jordan — y sus zapas lo reflejaban.",
    pros: [
      "Zoom Air: buena responsividad para guards de su época",
      "Strap de empeine: lockdown real sin ser high-top",
      "Upper Foamposite-lite: más ligero y transpirable que la Foamposite One",
      "Outsole con herringbone decente — tracción fiable",
    ],
    contras: [
      "Pesada para ser una mid-top (420g)",
      "Foam midsole de los 90 — sin energía de retorno",
      "Precio de resale elevado en buen estado",
    ],
    veredicto: "La segunda mejor signature de Penny y una de las más codiciadas de los 90. 4.9/10 en performance para 1996 era sobresaliente. Hoy es nostalgia pura — y válida para pickup si te apetece.",
    imagen_principal: "/shoes/nike-air-penny-2.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-27",
    precio_msrp_eur: 160,
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=Nike+Air+Penny+2&tag=canchazapa-21", precio_actual: 160, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // R-15. NIKE ZOOM GENERATION (2003) — LeBron James rookie year
  {
    id: "nike-zoom-generation",
    slug: "nike-zoom-generation",
    es_retro: true,
    marca: "Nike",
    modelo: "Zoom Generation",
    año_lanzamiento: 2003,
    genero: "unisex",
    signature_player: "LeBron James",
    tecnologia_clave: ["Zoom Air full-length", "High-top", "Leather+mesh upper", "External heel counter"],
    predecesor_id: null,
    sucesor_id: null,
    peso_real_g: 450,
    altura: "high",
    horma: "normal",
    drop_mm: 11,
    tipo_cierre: "cordones",
    material_superior: "leather",
    puntuaciones: {
      traccion: 6,
      amortiguacion: 6,
      respuesta: 5,
      soporte_lateral: 6,
      estabilidad: 6,
      peso_score: 3,
      durabilidad_outdoor: 6,
      ventilacion: 4,
    },
    categoria_principal: "balanced",
    tags: ["retro", "lebron", "james", "rookie", "coleccionismo", "2003", "chosen-one"],
    ideal_para: {
      posiciones: ["alero", "ala-pivot"],
      peso_jugador_kg: [80, 120],
      estilos: ["potente", "equilibrado"],
    },
    no_recomendada_para: {
      lesiones: ["rodillas"],
      estilos: ["explosivo"],
    },
    resumen: "La Nike Zoom Generation fue la primera zapatilla signature de LeBron James, el rookie elegido número 1 en 2003. Nike le ofreció el mayor contrato de patrocinio de la historia para un jugador sin un solo partido en la NBA. La ZG era una high-top sólida con Zoom Air full-length — ambiciosa para el primer año de un jugador de 18 años.",
    pros: [
      "Zoom Air full-length: amortiguación decente para forwards de su generación",
      "High-top con contador de talón externo: soporte real",
      "La primera LeBron signature — valor histórico incalculable",
      "Upper cuero+malla: más transpirable que las Jordan de su época",
    ],
    contras: [
      "450g — boot de high-top clásico, pesada",
      "El diseño acusa los años — voluminosa para estándares actuales",
      "Muy difícil de encontrar en stock — principalmente resale",
    ],
    veredicto: "El inicio de la mayor saga de zapatillas del siglo XXI. 5.25/10 en performance — sólida para 2003, anticuada hoy. Para cualquier fan de LeBron es la pieza definitiva.",
    imagen_principal: "/shoes/nike-zoom-generation.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-27",
    precio_msrp_eur: 180,
    links_compra: [
      { tienda: "kickscrew", url: "https://www.kickscrew.com/search?q=Nike+Zoom+Generation", precio_actual: 180, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-27" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=Nike+Zoom+Generation+LeBron&tag=canchazapa-21", precio_actual: 200, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
    ],
  },

];

/**
 * Catálogo con precios actualizados por el scraper (precios.json).
 * Si precios.json está vacío, se usan los precios editoriales de _rawZapatillas.
 */
export const zapatillas: Zapatilla[] = mergePricesIntoShoes(
  _rawZapatillas,
  preciosJson as PreciosJson
);

/**
 * Helper para encontrar una zapatilla por slug (usado en páginas de detalle).
 */
export function getZapatillaBySlug(slug: string): Zapatilla | undefined {
  return zapatillas.find((z) => z.slug === slug);
}

/**
 * Helper para listar todas las zapatillas (usado en /catalogo y motor de scoring).
 */
export function getAllZapatillas(): Zapatilla[] {
  return zapatillas;
}

