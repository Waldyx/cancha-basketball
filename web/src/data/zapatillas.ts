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
  // ───────────────────────────────────────────────
  // 1. NIKE LEBRON 22 — Tope de gama, cushion king
  // ───────────────────────────────────────────────
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

    imagen_principal:
      "https://d3pnpe87i1fkwu.cloudfront.net/IMG/024749-nike-lebron-22-fz1094-101_585x585.png",
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
        url: "https://www.amazon.es/s?k=nike+lebron+22",
        precio_actual: 189.99,
        disponible: true,
        tiene_afiliado: false,
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

  // ───────────────────────────────────────────────
  // 2. UA CURRY 12 — Premium responsive, ligera
  // ───────────────────────────────────────────────
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
      "Court feel premium — sientes el suelo perfectamente",
      "Ventilación notable en pista cubierta",
    ],
    contras: [
      "Durabilidad outdoor pobre — el Flow se gasta rápido en asfalto",
      "Cushion limitado para jugadores >85kg",
      "No es para juego físico de poste",
    ],
    veredicto:
      "Si eres tirador o base ligero, juegas casi exclusivamente en pista cubierta y priorizas respuesta sobre protección, es de las mejores opciones premium. Para asfalto o pesos altos, busca otra cosa.",

    imagen_principal:
      "https://d3pnpe87i1fkwu.cloudfront.net/IMG/024228-under-armour-curry-12-6000198-100_585x585.png",
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=under+armour+curry+12+baloncesto", precio_actual: 149.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "jd_sports_es", url: "https://www.jdsports.es/search/curry+12", precio_actual: 160, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // ───────────────────────────────────────────────
  // 3. NIKE SABRINA 2 — Gama media, ligera, balanceada
  // ───────────────────────────────────────────────
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
      "Excelente relación calidad-precio (€120)",
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
      "Si eres base, escolta o alero, juegas mayormente indoor y quieres lo mejor por debajo de €130, es de las apuestas más seguras del año. Sólida en todo, sin debilidades graves.",

    imagen_principal:
      "https://d3pnpe87i1fkwu.cloudfront.net/IMG/023561-nike-sabrina-2-fq2174-002_585x585.png",
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
        url: "https://www.amazon.es/s?k=nike+sabrina+2",
        precio_actual: 109.99,
        disponible: true,
        tiene_afiliado: false,
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
        url: "https://www.decathlon.es/es/search?Ntt=sabrina",
        precio_actual: 115,
        disponible: false,
        tiene_afiliado: false,
        ultima_verificacion: "2026-05-13",
      },
    ],
  },

  // ───────────────────────────────────────────────
  // 4. ANTA KAI 1 SPEED — Value premium, técnica
  // ───────────────────────────────────────────────
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
      "Excelente relación calidad-precio (€115)",
      "Low-top moderno y cómodo",
    ],
    contras: [
      "Low-top no apto para jugadores con tobillos débiles",
      "Cushion firme, no para impactos pesados",
      "Disponibilidad limitada fuera de China/AliExpress",
    ],
    veredicto:
      "Si eres base o escolta técnico, buscas respuesta y tracción, y no tienes problemas de tobillo, es una de las mejores compras del año. Para tobillos delicados o juego potente, busca otra opción.",

    imagen_principal:
      "https://d3pnpe87i1fkwu.cloudfront.net/IMG/022644-anta-kai-1-8124b1102s-7_585x585.png",
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
        url: "https://es.aliexpress.com/w/wholesale-anta-kai-1.html",
        precio_actual: 99.99,
        disponible: true,
        tiene_afiliado: false,
        ultima_verificacion: "2026-05-13",
      },
      {
        tienda: "amazon_es",
        url: "https://www.amazon.es/s?k=anta+kai+1",
        precio_actual: 125,
        disponible: true,
        tiene_afiliado: false,
        ultima_verificacion: "2026-05-13",
      },
    ],
  },

  // ───────────────────────────────────────────────
  // 5. ADIDAS CROSS 'EM UP SELECT — Presupuesto outdoor
  // ───────────────────────────────────────────────
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
      "La mejor compra por debajo de €70 para juego outdoor. Goma reforzada que aguanta asfalto durante meses, high-top para tobillos delicados y un cushion Bounce básico pero fiable. Pensada para iniciación o jugadores casuales que machacan la zapa.",
    pros: [
      "Durabilidad outdoor excepcional — aguanta meses en asfalto",
      "High-top con buen soporte de tobillo a este precio",
      "Estabilidad sólida para jugadores con bases pesados",
      "Precio imbatible (€60)",
    ],
    contras: [
      "Cushion muy básico, no para muchas horas de juego",
      "Court feel limitado, sensación de bote rígido",
      "Estética simple, no destaca",
      "Pesada para el rendimiento que ofrece",
    ],
    veredicto:
      "Si tu presupuesto es bajo, juegas en exterior o pistas duras, y priorizas durabilidad sobre tecnología, es la compra inteligente. Si vas a jugar mucho indoor y quieres rendimiento, sube de gama.",

    imagen_principal:
      "https://keeshoes.com/a/ale/auction_image/image1_178904.s790/adidas-cross-em-up-select-jr-ie9274-basketball-shoes-orange-790x790.jpeg",
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+cross+em+up+select", precio_actual: 54.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "decathlon", url: "https://www.decathlon.es/es/search?Ntt=adidas+cross+em+up", precio_actual: 60, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // ───────────────────────────────────────────────
  // 6. NIKE KD 18 — Tope gama, all-around cushion
  // ───────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/025738-nike-kd-18-ib3874-001_585x585.png",
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

  // ───────────────────────────────────────────────
  // 7. NIKE KOBE 8 PROTRO — Retro low-top, court feel
  // ───────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/023316-nike-kobe-protro-8-fq3548-001_585x585.png",
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
      { tienda: "basket_world", url: "https://basketworld.com/buscar?q=kobe+8", precio_actual: 199.95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // ───────────────────────────────────────────────
  // 8. JORDAN LUKA 5 — Tope gama, cushion ground-based
  // ───────────────────────────────────────────────
  {
    id: "jordan-luka-5",
    slug: "jordan-luka-5",
    marca: "Jordan",
    modelo: "Luka 5",
    generacion: 5,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Luka Dončić",
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/029296-jordan-luka-5-hv8082-002_585x585.png",
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

  // ───────────────────────────────────────────────
  // 9. NIKE GT CUT 3 — Tope gama, ZoomX balanced
  // ───────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/026011-nike-gt-cut-3-turbo-ib9632-001_585x585.png",
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

  // ───────────────────────────────────────────────
  // 10. JORDAN TATUM 3 — Tope gama, versátil
  // ───────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/024734-jordan-tatum-3-fz6598-001_585x585.png",
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

  // ───────────────────────────────────────────────
  // 11. NIKE JA 2 — Tope gama, base rápido low-top
  // ───────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/024410-nike-ja-2-fd7328-500_585x585.png",
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

  // ───────────────────────────────────────────────
  // 12. LI-NING WAY OF WADE ALL CITY 13 — Value premium
  // ───────────────────────────────────────────────
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
    veredicto: "El mejor performance por debajo de 180 € si lo encuentras. No es para pies anchos ni para pívots pesados.",
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/025133-li-ning-way-of-wade-all-city-13-abav001-10_585x585.png",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/way-of-wade-all-city-13-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/li-ning-way-of-wade-all-city-13/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 150,
    links_compra: [
      { tienda: "aliexpress", url: "https://es.aliexpress.com/w/wholesale-way-of-wade-all-city-13.html", precio_actual: 145, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=way+of+wade+all+city+13", precio_actual: 159, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // ───────────────────────────────────────────────
  // 13. NIKE KYRIE LOW 5 — Gama media, court feel
  // ───────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/015413-nike-kyrie-low-5-dj6012-100_585x585.png",
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

  // ───────────────────────────────────────────────
  // 14. ANTA KAI 2 — Gama media, signature Kyrie
  // ───────────────────────────────────────────────
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
    resumen: "Segunda signature de Kyrie con Anta. Salto importante desde la KAI 1: cushion mejor, materiales premium y tracción agresiva por menos de 150 €.",
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/026320-anta-kai-2-8125b1110s-3_585x585.png",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/anta-kai-2-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/anta-kai-2/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 140,
    links_compra: [
      { tienda: "aliexpress", url: "https://es.aliexpress.com/w/wholesale-anta-kai-2.html", precio_actual: 135, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=anta+kai+2", precio_actual: 149, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // ───────────────────────────────────────────────
  // 15. ANTA KT 10 — Gama media, tirador estable
  // ───────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/025191-anta-kt-10-8124d1101-10_585x585.png",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/anta-kt-10-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/anta-kt-10/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 160,
    links_compra: [
      { tienda: "aliexpress", url: "https://es.aliexpress.com/w/wholesale-anta-kt-10.html", precio_actual: 155, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=anta+kt+10", precio_actual: 169, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // ───────────────────────────────────────────────
  // 16. JORDAN LUKA 3 — Gama media, outdoor balanced
  // ───────────────────────────────────────────────
  {
    id: "jordan-luka-3",
    slug: "jordan-luka-3",
    marca: "Jordan",
    modelo: "Luka 3",
    generacion: 3,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Luka Dončić",
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
    resumen: "Decente pero sin innovación para un signature de 130 €. Lo mejor es la tracción y el IsoPlate. Materiales pobres para el precio.",
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/023909-jordan-luka-3-hq5054-107_585x585.png",
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

  // ───────────────────────────────────────────────
  // 17. LI-NING WAY OF WADE 12 — Tope gama, ligera reactiva
  // ───────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/028097-li-ning-way-of-wade-12-abav013-25_585x585.png",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/way-of-wade-12-performance-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/li-ning-way-of-wade-12/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 200,
    links_compra: [
      { tienda: "aliexpress", url: "https://es.aliexpress.com/w/wholesale-way-of-wade-12.html", precio_actual: 190, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=way+of+wade+12", precio_actual: 215, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // ───────────────────────────────────────────────
  // 18. NEW BALANCE FRESH FOAM BB v3 — Cushion king for big players
  // ───────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/026647-new-balance-fresh-foam-bb-v3-bbfrsis3_585x585.png",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/new-balance-fresh-foam-bb-v3-review/" },
      { tipo: "hoops-geek", url: "https://www.thehoopsgeek.com/shoe-reviews/new-balance-fresh-foam-bb-v3/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 140,
    links_compra: [
      { tienda: "nb_es", url: "https://www.newbalance.es/search?q=fresh+foam+bb+v3", precio_actual: 140, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=new+balance+fresh+foam+bb+v3+baloncesto", precio_actual: 139, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "jd_sports_es", url: "https://www.jdsports.es/search/new+balance+bb+v3", precio_actual: 144.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // ───────────────────────────────────────────────
  // 19. ADIDAS HARDEN VOL 9 — Gama media, tirador potente
  // ───────────────────────────────────────────────
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
    imagen_principal: "https://ballershoesdb.com/wp-content/uploads/HardenVol9-Cropped-650x406.jpg",
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+harden+vol+9+baloncesto", precio_actual: 169, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "basket_world", url: "https://basketworld.com/buscar?q=harden+vol+9", precio_actual: 159.95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // ───────────────────────────────────────────────
  // 20. ADIDAS DAME CERTIFIED — Value premium budget
  // ───────────────────────────────────────────────
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
      "Materiales premium para 95 €",
      "Excelente para outdoor",
    ],
    contras: [
      "Cushion firme con poca protección para pesados",
      "Pesada (404 g)",
      "Diseño minimalista que no enamora",
    ],
    veredicto: "La mejor opción budget para guards que necesitan tracción y soporte. Si pesas más de 90 kg, busca cushion más generoso.",
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/018021-adidas-dame-certified-gy8965_585x585.png",
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+dame+certified+baloncesto", precio_actual: 92, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // ───────────────────────────────────────────────
  // 21. PUMA MB.04 — Gama media, signature LaMelo
  // ───────────────────────────────────────────────
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
    imagen_principal: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/312174/01/sv01/fnd/PNA/fmt/png/MB.04-Men's-Basketball-Shoes",
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=puma+mb.04+baloncesto", precio_actual: 125, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // ───────────────────────────────────────────────
  // 22. NIKE PRECISION 8 — Presupuesto iniciación
  // ───────────────────────────────────────────────
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
    resumen: "La basket más barata de Nike y sorprende. Tracción fiable, soporte decente, cushion básico pero funcional. Mejor opción sub-80 € con tick.",
    pros: [
      "Tracción herringbone multidireccional",
      "Soporte sólido para el precio",
      "Rubber duradero para outdoor",
      "Solo 80 €",
    ],
    contras: [
      "Cushion Phylon básico, sin Zoom",
      "Materiales modestos",
      "No para impactos grandes",
    ],
    veredicto: "Ideal para inicio o jugador casual con presupuesto bajo. Si compites en serio, sube de gama.",
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/029547-nike-precision-8-ih1105-002_585x585.png",
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

  // ───────────────────────────────────────────────
  // 23. NIKE LEBRON WITNESS 9 — Presupuesto cushion para pesados
  // ───────────────────────────────────────────────
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
      "100 € para signature LeBron",
    ],
    contras: [
      "Pesada (428 g)",
      "Tracción sensible al polvo",
      "Respuesta limitada por foam soft",
    ],
    veredicto: "Para forwards y pívots medianos/pesados con presupuesto. Si eres guard rápido, esta no es.",
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/028585-nike-lebron-witness-9-hq8034-100_585x585.png",
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

  // ───────────────────────────────────────────────
  // 24. ADIDAS DAME 9 — Value premium gama media
  // ───────────────────────────────────────────────
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
    resumen: "Una de las mejores zapas de 2024. Lightstrike plush y reactivo, tracción intrincada y soporte top. 120 € por todo este performance es un robo.",
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/024289-adidas-dame-9--ie3626_585x585.png",
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+dame+9+baloncesto", precio_actual: 124, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "basket_world", url: "https://basketworld.com/buscar?q=dame+9", precio_actual: 119.95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // ───────────────────────────────────────────────
  // 25. ADIDAS CROSS 'EM UP SPEED — Presupuesto velocidad iniciación
  // ───────────────────────────────────────────────
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
    veredicto: "Para iniciación o uso casual. No es para competición seria. Si presupuesto sube de 70 €, mira el Dame Certified.",
    imagen_principal: "https://cdn.sportshop.com/catalog/product/1500/1500/1/0/106805_10.jpg",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 65,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=cross+em+up+speed", precio_actual: 60, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+cross+em+up+speed+baloncesto", precio_actual: 60, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "jd_sports_es", url: "https://www.jdsports.es/search/cross+em+up+speed", precio_actual: 69.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // ───────────────────────────────────────────────
  // 26. JORDAN ONE TAKE 6 — Presupuesto outdoor potente
  // ───────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/021020-jordan-one-take-5-fd2335-006_585x585.png",
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

  // ───────────────────────────────────────────────
  // 27. DECATHLON TARMAK FAST 900 — Presupuesto Decathlon low-top
  // ───────────────────────────────────────────────
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
      "85 € con licencia NBA",
    ],
    contras: [
      "Cushion modesto, no para pesados",
      "Sin reviews internacionales profundas",
      "Solo disponible en Decathlon",
    ],
    veredicto: "Para guards con presupuesto justo que buscan zapa rápida. La mejor relación calidad/precio low-top en tiendas físicas en España.",
    imagen_principal: "https://ballershoesdb.com/wp-content/uploads/TarmakFast900Low1-Cropped-650x406.jpg",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 85,
    links_compra: [
      { tienda: "decathlon", url: "https://www.decathlon.es/es/search?Ntt=tarmak+fast+900", precio_actual: 84.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=tarmak+fast+900", precio_actual: 89, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // ───────────────────────────────────────────────
  // 28. DECATHLON TARMAK VOLTZY 500 MID — Iniciación ultra-budget
  // ───────────────────────────────────────────────
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
    resumen: "Modelo básico mid-top de Decathlon para jugadores casuales o iniciación. Estable y robusto pero pesado y con cushion básico. Sub-50 €.",
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
    veredicto: "Solo para iniciación o jugador muy casual con presupuesto extremo. Subiendo a 80 € ya hay mejores opciones.",
    imagen_principal: "https://contents.mediadecathlon.com/p2279896/28e4a6c45e31da5bbb4d9a73e6d54c8d/p2279896.jpg?format=auto&quality=70&f=800x0",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 45,
    links_compra: [
      { tienda: "decathlon", url: "https://www.decathlon.es/es/search?Ntt=tarmak+voltzy", precio_actual: 44.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=tarmak+voltzy+500", precio_actual: 49, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // ───────────────────────────────────────────────
  // 29. PEAK LOU WILLIAMS UNDERGROUND — Value premium china
  // ───────────────────────────────────────────────
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
    imagen_principal: "https://ballershoesdb.com/wp-content/uploads/2019/12/PeakLouWilliamsUnderground-Cropped.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/peak-lou-williams-underground-2/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "aliexpress", url: "https://es.aliexpress.com/w/wholesale-peak-lou-williams.html", precio_actual: 105, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=peak+lou+williams+underground", precio_actual: 115, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // ───────────────────────────────────────────────
  // 30. ANTA SHOCK THE GAME 5.0 — Presupuesto china outdoor
  // ───────────────────────────────────────────────
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
    veredicto: "Para jugadores con presupuesto justo que necesitan estabilidad y soporte outdoor. Una sorpresa por 100 €.",
    imagen_principal: "https://ballershoesdb.com/wp-content/uploads/AntaShockTheGame5-Cropped-650x406.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/anta-shock-the-game-5-0-review/" },
    ],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 100,
    links_compra: [
      { tienda: "aliexpress", url: "https://es.aliexpress.com/w/wholesale-anta-shock-the-game-5.html", precio_actual: 95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=anta+shock+the+game+5", precio_actual: 109, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
    ],
  },

  // ───────────────────────────────────────────────
  // 31. JORDAN XXXVII — Retro-performance equilibrado
  // ───────────────────────────────────────────────
  {
    id: "jordan-xxxvii",
    slug: "jordan-xxxvii",
    marca: "Jordan Brand",
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/017014-air-jordan-37-dd6958-160_585x585.png",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 185,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=air+jordan+37&vst=air+jordan+37", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=air+jordan+37+baloncesto", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=air+jordan+37", precio_actual: 115, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=air+jordan+37", precio_actual: 125, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // ───────────────────────────────────────────────
  // 32. NIKE LEBRON 21 — Cushion para jugadores grandes
  // ───────────────────────────────────────────────
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
      "~50€ más barato que la gen actual",
      "Soporte lateral excepcional en high-top",
      "Durabilidad outdoor sólida",
    ],
    contras: [
      "Muy pesada para juego explosivo",
      "Court feel casi nulo",
      "Ventilación mejorable",
    ],
    veredicto: "Si el LeBron 22 se sale de tu presupuesto, el 21 es prácticamente el mismo zapato con diferente upper. Para pívots y alas pesados, el mejor ratio calidad-precio del mercado ahora mismo.",
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/020167-nike-lebron-21-fv2345-001_585x585.png",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 190,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=lebron+21&vst=lebron+21", precio_actual: 135, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+lebron+21+baloncesto", precio_actual: 135, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=nike+lebron+21", precio_actual: 145, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+lebron+21", precio_actual: 150, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // ───────────────────────────────────────────────
  // 33. NIKE ZOOM FREAK 4 — Cushion para alas/pívots
  // ───────────────────────────────────────────────
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
    veredicto: "Para alas-pívot y pívots con presupuesto ajustado que necesitan amortiguación y soporte sin llegar a los €180 del LeBron.",
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/016971-nike-zoom-freak-4-do9680-500_585x585.png",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=zoom+freak+4&vst=zoom+freak+4", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+zoom+freak+4+baloncesto", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=nike+zoom+freak+4", precio_actual: 85, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+zoom+freak+4", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // ───────────────────────────────────────────────
  // 34. NIKE GIANNIS IMMORTALITY 3 — Budget para jugadores grandes
  // ───────────────────────────────────────────────
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
    resumen: "La línea budget de Giannis. React foam básico sin Zoom, talla ancha, tracción adecuada. No pretende ser premium — pretende dar una opción Nike para jugadores grandes con presupuesto limitado.",
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/019721-nike-giannis-immortality-3-dz7533-003_585x585.png",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 65,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=giannis+immortality+3&vst=giannis+immortality+3", precio_actual: 50, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+giannis+immortality+3", precio_actual: 50, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=nike+giannis+immortality+3", precio_actual: 55, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // ───────────────────────────────────────────────
  // 35. PUMA ALL-PRO NITRO — Sorpresa responsive de Puma
  // ───────────────────────────────────────────────
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
    imagen_principal: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/312839/02/sv01/fnd/EEA/fmt/png/Zapatillas-de-baloncesto-All-Pro-NITRO%E2%84%A2-2",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 130,
    links_compra: [
      { tienda: "puma_es", url: "https://eu.puma.com/es/es/pd/zapatillas-de-baloncesto-all-pro-nitro-2-unisex/312839?swatch=02", precio_actual: 130, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=puma+all+pro+nitro+2+baloncesto", precio_actual: 125, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=puma+all+pro+nitro+2", precio_actual: 130, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // ───────────────────────────────────────────────
  // 36. PUMA MB.03 — Signature LaMelo generación anterior
  // ───────────────────────────────────────────────
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
    resumen: "La generación anterior del zapato de LaMelo. Nitrofoam sin placa — más suave y menos explosivo que el MB.04 pero muy ligero y confortable para bases y escoltas.",
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
    veredicto: "Si el MB.04 se sale de presupuesto, el MB.03 es una alternativa sólida. Mismo concepto, algo menos de tecnología, 40-50€ menos.",
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/019999-puma-mb03-379233_01_585x585.png",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "puma_es", url: "https://eu.puma.com/es/es/buscar?q=mb+03+baloncesto", precio_actual: 70, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=puma+mb03+baloncesto", precio_actual: 70, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=puma+mb.03", precio_actual: 75, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // ───────────────────────────────────────────────
  // 37. UA FLOW BREAKTHRU 4 — Reina del outdoor
  // ───────────────────────────────────────────────
  {
    id: "ua-flow-breakthru-4",
    slug: "ua-flow-breakthru-4",
    marca: "Under Armour",
    modelo: "Flow Breakthru 4",
    generacion: 4,
    año_lanzamiento: 2022,
    genero: "unisex",
    tecnologia_clave: ["Flow compound sole", "HOVR foam"],
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
    veredicto: "Si juegas en exterior o cambias frecuentemente de pista, esta es tu zapatilla. Nada supera al Flow en tracción multisuperficie. A 70€ es una ganga.",
    imagen_principal: "https://underarmour.scene7.com/is/image/Underarmour/3026641-001_DEFAULT?rp=standard-0pad|pdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on,on&bgc=f0f0f0&wid=566&hei=708",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 100,
    links_compra: [
      { tienda: "ua_es", url: "https://www.underarmour.es/es-es/c/hombre/zapatillas/baloncesto/?q=flow+breakthru+4", precio_actual: 70, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=under+armour+flow+breakthru+4+baloncesto", precio_actual: 70, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=under+armour+flow+breakthru+4", precio_actual: 75, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // ───────────────────────────────────────────────
  // 38. ADIDAS AE 1 — Debut de Anthony Edwards
  // ───────────────────────────────────────────────
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
      "Horma algo estrecha en antepiè — probad talla antes",
      "Outdoor uso moderado",
      "Precio original alto aunque ahora baja",
    ],
    veredicto: "Para bases y escoltas que quieren lo mejor de Adidas en guards sin pagar el premium del lanzamiento. Uno de los mejores valores del mercado ahora mismo.",
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/020751-adidas-ae-1-if1859_585x585.png",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 140,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=ae+1+baloncesto", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+ae+1+baloncesto", precio_actual: 85, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=adidas+ae+1+baloncesto", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=adidas+ae+1", precio_actual: 95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // ───────────────────────────────────────────────
  // 39. NEW BALANCE TWO WXY V4 — El fiable de NB
  // ───────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/020201-new-balance-two-wxy-v4-bb2wytr4_585x585.png",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 95,
    links_compra: [
      { tienda: "nb_es", url: "https://www.newbalance.es/search?q=two+wxy+v4", precio_actual: 75, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=new+balance+two+wxy+v4+baloncesto", precio_actual: 72, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=new+balance+two+wxy+v4", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // ───────────────────────────────────────────────
  // 40. JORDAN LUKA 2 — Signature versátil de Luka
  // ───────────────────────────────────────────────
  {
    id: "jordan-luka-2",
    slug: "jordan-luka-2",
    marca: "Jordan Brand",
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
    veredicto: "Para el jugador versátil que quiere un Jordan signature con cushion real a un precio razonable. La Luka 5 es superior pero el Luka 2 sale ahora por 40-50€ menos.",
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/019149-jordan-luka-2-dx8733-001_585x585.png",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 125,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=luka+2&vst=luka+2", precio_actual: 75, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=jordan+luka+2+baloncesto", precio_actual: 75, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=jordan+luka+2", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=jordan+luka+2", precio_actual: 85, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // ───────────────────────────────────────────────
  // 41. NIKE PG 6 — Court feel para guards
  // ───────────────────────────────────────────────
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
    veredicto: "Para bases y escoltas que priorizan velocidad y court feel. Con la PG 6 a 65€, pocas zapatillas ofrecen mejor tracción por ese precio.",
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/015244-nike-pg-6-dc1974-100_585x585.png",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=pg+6&vst=pg+6", precio_actual: 65, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+pg+6+baloncesto", precio_actual: 65, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=nike+pg+6", precio_actual: 72, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // ───────────────────────────────────────────────
  // 42. NIKE GT JUMP 2 — Pensada para pívots
  // ───────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/019210-nike-gt-jump-2-dj9431-300_585x585.png",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 150,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=gt+jump+2&vst=gt+jump+2", precio_actual: 95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+air+zoom+gt+jump+2", precio_actual: 95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=nike+gt+jump+2", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+gt+jump+2", precio_actual: 105, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // ───────────────────────────────────────────────
  // 43. NIKE LEBRON 23 — Tope de gama cushion 2025
  // ───────────────────────────────────────────────
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
      "El LeBron 23 lleva el cushion a otro nivel con ZoomX + placa de carbono. La combinación entrega 72% de retorno de energía en antepié — el mayor registrado en un zapato de baloncesto Nike. Para jugadores grandes que quieren la máxima protección del mercado en 2025.",
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

    imagen_principal:
      "https://d3pnpe87i1fkwu.cloudfront.net/IMG/027292-nike-lebron-23-ih1513-001_585x585.png",
    imagenes: [],

    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/nike-lebron-23-performance-review/" },
    ],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 220,
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+lebron+23+basketball", precio_actual: 210, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=lebron+23&vst=lebron+23", precio_actual: 220, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+lebron+23", precio_actual: 215, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // ───────────────────────────────────────────────
  // 44. NIKE JA 3 — Guard explosivo 2025
  // ───────────────────────────────────────────────
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

    imagen_principal:
      "https://d3pnpe87i1fkwu.cloudfront.net/IMG/026737-nike-ja-3-hf2793-700_585x585.png",
    imagenes: [],

    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/nike-ja-3-performance-review/" },
    ],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 135,
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+ja+3+basketball", precio_actual: 130, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=ja+3&vst=ja+3", precio_actual: 135, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+ja+3", precio_actual: 135, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // ───────────────────────────────────────────────
  // 45. ADIDAS AE 2 — Mejor guard Adidas 2025
  // ───────────────────────────────────────────────
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
      "El AE 2 mejora al AE 1 en todo lo que importa: más ligero, mejor ajuste en antepié y Lightstrike Pro actualizado que devuelve más energía. Sin el 'sophomore slump' típico — uno de los mejores zapatos para guards del año.",
    pros: [
      "Más ligero que el AE 1 (305g vs 320g)",
      "Tracción Continental imbatible",
      "Lightstrike Pro aún más responsivo",
      "Ventilación mejorada",
    ],
    contras: [
      "Horma algo estrecha en el antepié — probar talla",
      "Para indoor principalmente",
      "Precio en zona alta",
    ],
    veredicto:
      "El mejor zapato para guards de Adidas en 2025. Si ya te gustó el AE 1, el 2 es estrictamente mejor. Una de las mejores opciones explosivas del mercado ahora mismo.",

    imagen_principal:
      "https://d3pnpe87i1fkwu.cloudfront.net/IMG/027280-adidas-ae-2-js3514_585x585.png",
    imagenes: [],

    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/adidas-ae-2-performance-review/" },
    ],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 145,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=ae+2+baloncesto", precio_actual: 140, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+ae+2+baloncesto", precio_actual: 135, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=adidas+ae+2", precio_actual: 145, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=adidas+ae+2+baloncesto", precio_actual: 140, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // ───────────────────────────────────────────────
  // 46. PUMA MB.05 — Nitrofoam SQD, línea LaMelo
  // ───────────────────────────────────────────────
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

    imagen_principal:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/312480/01/fnd/PNA/fmt/png/PUMA-x-LAMELO-BALL-MB.05-Metallic-Basketball-Shoes",
    imagenes: [],

    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/puma-mb05-performance-review/" },
    ],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "puma_es", url: "https://eu.puma.com/es/es/c/puma-basketball?q=%3Arelevance%3Abrand%3APUMA%3AproductType%3Afootwear&text=MB+05", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=puma+mb05+zapatillas+baloncesto", precio_actual: 115, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=puma+mb.05+baloncesto", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // ───────────────────────────────────────────────
  // 47. CONVERSE SHAI 001 — Debut SGA, sorpresa del año
  // ───────────────────────────────────────────────
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
      "Converse volvió a la élite del rendimiento con el debut de SGA. La SHAI 001 mezcla un diseño limpio y minimal con React foam funcional y tracción herringbone fiable. La sorpresa más agradable de 2025 — demostró que Converse puede competir en performance.",
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

    imagen_principal:
      "https://d3pnpe87i1fkwu.cloudfront.net/IMG/026782-converse-shai-001-a18772c_585x585.png",
    imagenes: [],

    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/converse-shai-001-performance-review/" },
    ],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 130,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=converse+shai+001&vst=converse+shai+001", precio_actual: 125, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=converse+shai+001+baloncesto", precio_actual: 125, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=converse+shai+001", precio_actual: 130, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=converse+shai+001", precio_actual: 128, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // ───────────────────────────────────────────────
  // 48. NIKE GT CUT 4 — Tracción 10/10, cima guards cortadores
  // ───────────────────────────────────────────────
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
      "Tracción 10/10 — la mejor herringbone del mercado",
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

    imagen_principal:
      "https://d3pnpe87i1fkwu.cloudfront.net/IMG/029523-nike-gt-cut-4-iq6206-500_585x585.png",
    imagenes: [],

    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/nike-gt-cut-4-performance-review/" },
    ],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 170,
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+gt+cut+4+basketball", precio_actual: 160, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=gt+cut+4&vst=gt+cut+4", precio_actual: 170, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+gt+cut+4", precio_actual: 165, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // ───────────────────────────────────────────────
  // 49. LI-NING GAMMA 2 — Joya escondida 2026
  // ───────────────────────────────────────────────
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
      "WearTesters la nombró 'mejor zapatilla de baloncesto de 2026 hasta la fecha'. BOOM foam + placa de carbono a 120€ es una combinación que avergüenza a muchos modelos que cuestan el doble. La mejor relación rendimiento-precio del mercado en 2026.",
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

    imagen_principal:
      "https://antosports.com/cdn/shop/files/A2972BE7-FF6F-470B-A8DE-81C2D0D2D4E2.jpg?v=1770880116&width=1946",
    imagenes: [],

    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/li-ning-gamma-2-performance-review/" },
    ],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "aliexpress", url: "https://es.aliexpress.com/w/wholesale-li-ning-gamma-2.html", precio_actual: 105, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=li-ning+gamma+2+basketball", precio_actual: 115, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // ───────────────────────────────────────────────
  // 50. ANTA KT 11 — Mejor KT de la historia
  // ───────────────────────────────────────────────
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
      "Para escoltas tiradores al estilo Klay que quieren tracción y estilo premium de marca china sin pagar marca occidental. La mejor KT de la historia y una de las mejores opciones del segmento 100-110€.",

    imagen_principal:
      "https://uk.anta.com/cdn/shop/files/112611101-7_1_958ed2f1-ce55-404e-ad24-3d256dd4cd42_600x600.jpg?v=1776770241",
    imagenes: [],

    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/anta-kt-11-performance-review/" },
    ],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "aliexpress", url: "https://es.aliexpress.com/w/wholesale-anta-kt-11.html", precio_actual: 95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=anta+kt+11+basketball", precio_actual: 105, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "basket_world", url: "https://www.basketworld.es/buscar?q=anta+kt+11", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // ───────────────────────────────────────────────
  // 51. REEBOK QUESTION MID — El clásico de Allen Iverson
  // ───────────────────────────────────────────────
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
      "Icono cultural — nadie cuestiona por qué las llevas",
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
    imagen_principal: "https://citysports.com/cdn/shop/products/GX0227-2.webp?v=1660338636&width=840",
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=reebok+question+mid+baloncesto", precio_actual: 118, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // ───────────────────────────────────────────────
  // 52. REEBOK ANSWER IV — El zapato de las Finales 2001
  // ───────────────────────────────────────────────
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
      "Historia inigualable — Finales 2001",
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
    veredicto: "Para el coleccionista que quiere jugar con historia en los pies. La Answer IV es el mejor zapato de rendimiento retro de Reebok — técnicamente superior a la Question y con la historia de las Finales. A ~100€ en rebajas, una ganga cultural.",
    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/26503/reebok-answer-iv-21226079-main.jpg",
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=reebok+answer+iv+baloncesto", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // ───────────────────────────────────────────────
  // 53. REEBOK ENGINE A — El regreso de Reebok al rendimiento (2025)
  // ───────────────────────────────────────────────
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
    veredicto: "Para el jugador que quiere algo diferente y equilibrado. La Engine A no lidera en ninguna categoría concreta pero es sólida en todo — y el rubber grueso la hace viable para exterior. Un regreso de Reebok que merece ser tomado en serio.",
    imagen_principal: "https://ballershoesdb.com/wp-content/uploads/ReebokEngineA-Cropped.jpg",
    imagenes: [],
    fuentes: [
      { tipo: "weartesters", url: "https://weartesters.com/reebok-engine-a/" },
    ],
    ultima_actualizacion: "2026-05-15",
    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "reebok_es", url: "https://www.reebok.es/buscar?q=engine+a", precio_actual: 120, disponible: false, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=reebok+engine+a", precio_actual: 115, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=reebok+engine+a+baloncesto", precio_actual: 112, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
    ],
  },

  // ───────────────────────────────────────────────
  // 54. UA CURRY 13 — Signature premium, generación actual
  // ───────────────────────────────────────────────
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
      "Continuación refinada de la fórmula Flow — ligera y reactiva",
      "Warp 3.0 upper con mejor soporte lateral que la Curry 12",
      "Peso mínimo (~308g) para su nivel de protección",
      "Disponible en España a 140€",
    ],
    contras: [
      "Suela Flow poco durable en asfalto",
      "Cushion insuficiente para jugadores pesados o lesiones de tobillo",
      "Horma estrecha en antepié — probar antes de comprar",
    ],
    veredicto:
      "La mejor opción actual de UA para bases y escolteros que buscan respuesta máxima en pista cubierta. Si ya te gustó la Curry 12, la 13 es una mejora directa. Para asfalto o pesos > 90kg, busca otra cosa.",

    imagen_principal:
      "https://ballershoesdb.com/wp-content/uploads/Curry13-Cropped.jpg",
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

  // ───────────────────────────────────────────────
  // 55. UA LOCKDOWN 7 — Entrada de gama UA, muy asequible
  // ───────────────────────────────────────────────
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
      "Precio muy accesible (75€ aprox.)",
      "Herringbone durable para outdoor e indoor",
      "Upper mesh transpirable",
      "Buen choice para principiantes o uso esporádico",
    ],
    contras: [
      "EVA básico — menos cushion y respuesta que modelos premium",
      "Soporte de tobillo limitado en cortes bruscos",
      "Peso algo elevado para lo que ofrece",
    ],
    veredicto:
      "Si tu presupuesto es ajustado o buscas una segunda zapatilla para entrenar outdoor sin arriesgar tus buenas zapatillas, la Lockdown 7 cumple. Para juego serio o frecuente, sube de gama.",

    imagen_principal:
      "https://ballershoesdb.com/wp-content/uploads/Lockdown-7-Cropped.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 75,
    links_compra: [
      { tienda: "ua_es", url: "https://www.underarmour.es/es-es/p/calzado/ua_lockdown%C2%A07/3028512.html", precio_actual: 75, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // ───────────────────────────────────────────────
  // 56. UA SPAWN 7 MID — Mid-range de performance UA
  // ───────────────────────────────────────────────
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
      "Precio justo en gama media (120€)",
    ],
    contras: [
      "Peso algo elevado para su nivel",
      "Menos reactiva que la Curry 13",
      "No top-tier en ninguna categoría",
    ],
    veredicto:
      "Para jugadores físicos de posición interior o aleros que necesitan soporte sin pagar precio premium. La Spawn 7 Mid cumple bien en pista cubierta y aguanta el exterior. Buena opción de gama media dentro del catálogo UA.",

    imagen_principal:
      "https://ballershoesdb.com/wp-content/uploads/Spawn7-Cropped.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "ua_es", url: "https://www.underarmour.es/es-es/p/calzado/ua_spawn_7%C2%A0mid/6000753.html", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // ───────────────────────────────────────────────
  // 57. UA FUTR X 4 — Upper-mid UA, reactiva y estable
  // ───────────────────────────────────────────────
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
      "La FUTR X 4 es la zapatilla más equilibrada del catálogo UA: HOVR foam con buena energía devuelta, outsole reactiva similar al Flow en rendimiento, knit upper transpirable y soporte lateral sólido. Disponible en UA España a 120€.",
    pros: [
      "Excelente equilibrio cushion-respuesta con HOVR",
      "Knit upper cómodo y transpirable",
      "Soporte lateral bueno para cambios de dirección",
      "Versatilidad para distintos estilos de juego",
    ],
    contras: [
      "Outsole menos durable en exterior que herringbone clásico",
      "No tan ligera como la Curry 13",
      "Relativa novedad — sin historial de durabilidad largo",
    ],
    veredicto:
      "La mejor opción de UA para jugadores que quieren algo equilibrado sin decidirse entre la Curry (ultra-reactiva, poca protección) y la Spawn (más física). La FUTR X 4 funciona bien en todas las posiciones.",

    imagen_principal:
      "https://ballershoesdb.com/wp-content/uploads/futrx4-Cropped.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "ua_es", url: "https://www.underarmour.es/es-es/p/calzado/ua_futr_x_4/3028831.html", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // ───────────────────────────────────────────────
  // 58. UA CURRY 3Z 25 — Curry budget, entrada de gama Curry
  // ───────────────────────────────────────────────
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
      "La versión asequible de la línea Curry. EVA foam básico pero funcional, herringbone resistente para outdoor, y el respaldo del nombre Curry. Ideal para jugadores que quieren el look Curry sin el precio premium. Disponible en UA España a 85€.",
    pros: [
      "Precio muy asequible (85€) con el nombre Curry",
      "Herringbone durable para outdoor e indoor",
      "Buena opción para principiantes o uso recreativo",
      "Ligera para su precio",
    ],
    contras: [
      "Muy inferior a la Curry 12/13 en cushion y respuesta",
      "EVA básico — no hay UA Flow ni HOVR",
      "No tiene las tecnologías premium de la línea Curry",
    ],
    veredicto:
      "Si quieres el sello Curry sin gastar 140€+, la Curry 3Z 25 es la respuesta. No es una zapatilla técnicamente avanzada, pero cumple para uso recreativo o pistas exteriores. Para juego serio, invierte en la Curry 13.",

    imagen_principal:
      "https://ballershoesdb.com/wp-content/uploads/Curry3Z25-Cropped.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 85,
    links_compra: [
      { tienda: "ua_es", url: "https://www.underarmour.es/es-es/p/calzado/curry_3z_25/6000749.html", precio_actual: 85, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // ───────────────────────────────────────────────
  // 59. Nike Luka 77 — Signature Luka, gama media Nike Brand
  // ───────────────────────────────────────────────
  {
    id: "nike-luka-77",
    slug: "nike-luka-77",
    marca: "Nike",
    modelo: "Luka 77",
    generacion: 1,
    año_lanzamiento: 2025,
    genero: "unisex",
    signature_player: "Luka Dončić",
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
      "La Nike Luka 77 es la primera zapatilla de Luka Dončić bajo Nike Brand (no Jordan Brand), el número 77 hace referencia a su dorsal en Eslovenia. React + Zoom Air en el talón, upper knit y outsole herringbone. Gama media con acabado premium y estética minimalista.",
    pros: [
      "Combinación React + Zoom Air ofrece buen cushion y algo de respuesta",
      "Knit upper cómodo y transpirable desde el primer uso",
      "Estética limpia, fácil de combinar",
      "Precio competitivo para zapatilla signature",
    ],
    contras: [
      "Menos soporte lateral que la Jordan Luka series",
      "Outsole no tan durable en exterior como herringbone clásico",
      "Primera generación — sin historial de durabilidad",
    ],
    veredicto:
      "Para fans de Luka o jugadores de gama media que quieren un calzado equilibrado a buen precio. No alcanza el nivel técnico de la GT Cut 4 ni el cushion de la LeBron 23, pero a 99.99€ es una opción sólida.",

    imagen_principal:
      "https://ballershoesdb.com/wp-content/uploads/luka77-Cropped.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 100,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/t/luka-77-zapatillas-de-baloncesto-BERU1e7j/IF1610-500", precio_actual: 99.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // ───────────────────────────────────────────────
  // 60. Nike Book 2 — Devin Booker signature, equilibrada y elegante
  // ───────────────────────────────────────────────
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
      "Precio de 150€ exige comparar con opciones similares",
    ],
    veredicto:
      "Una de las mejores opciones para bases y escoltas explosivos que priorizan velocidad y comodidad. La combinación React + Zoom Air en antepié la hace destacar en su rango de precio.",

    imagen_principal:
      "https://ballershoesdb.com/wp-content/uploads/NikeBook2-Cropped.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 150,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/t/book-2-rising-zapatillas-de-baloncesto-m5KwDWWn/IB6687-001", precio_actual: 149.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // ───────────────────────────────────────────────
  // 61. Nike Kobe 9 Low Protro — Retro icónico, bajo y preciso
  // ───────────────────────────────────────────────
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
      "Amortiguación mínima — no apta para jugadores pesados o exteriores",
      "Horma ajustada: puede requerir media talla más",
      "Precio elevado para un retro (180€)",
      "Sin soporte de tobillo en diseño low",
    ],
    veredicto:
      "Para jugadores que valoran la precisión y el feeling con la pista sobre el cushion. El Flyknit + herringbone hacen de la Kobe 9 Low Protro una de las zapatillas de baloncesto más técnicamente puras disponibles hoy. No para principiantes ni jugadores de exterior.",

    imagen_principal:
      "https://ballershoesdb.com/wp-content/uploads/2017/03/kobe9-Cropped.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 180,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/t/kobe-9-low-protro-zapatillas-de-baloncesto-a69NSpgE/IM6119-800", precio_actual: 179.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // ───────────────────────────────────────────────
  // 62. Nike Sabrina 3 — Ionescu signature, cushion y agarre
  // ───────────────────────────────────────────────
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
      "Outsole con patrón de herringbone modificado — agarre excelente",
      "Estabilidad lateral buena para un low-top",
      "Precio justo para las tecnologías incluidas",
    ],
    contras: [
      "Estética más orientada al juego femenino — no a todos gusta",
      "Cushion muy blando puede resultar impreciso para algunos",
      "Sin versión mid para quienes prefieren soporte de tobillo",
    ],
    veredicto:
      "Una zapatilla seria que no debe descartarse por ser femenina en origen. El Zoom Air strobel + React la convierten en una de las opciones más completas de Nike bajo los 130€. Recomendada para jugadores ágiles de cualquier género.",

    imagen_principal:
      "https://ballershoesdb.com/wp-content/uploads/NikeSabrina3-Cropped.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 130,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/t/sabrina-3-zapatillas-de-baloncesto-UrtEcG8G/HF2881-303", precio_actual: 129.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // ───────────────────────────────────────────────
  // 63. Jordan Tatum 4 — Tatum signature, cushion premium
  // ───────────────────────────────────────────────
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
      "Zoom Air strobel full-length — cushion reactivo en todo el pie",
      "Knit upper: sujeción precisa sin puntos de presión",
      "Buen soporte lateral para un low-top",
      "Precio competitivo para su nivel tecnológico",
    ],
    contras: [
      "Sin versión mid — solo disponible como low-top",
      "Peso algo superior a otras opciones speed de Nike",
      "Outsole puede desgastarse rápido en exterior",
    ],
    veredicto:
      "Para aleros y escoltas que quieren un calzado con cushion serio sin el precio de la LeBron o la Kobe Protro. La Tatum 4 es una compra inteligente a 90.99€ — probablemente la mejor relación calidad-precio de la línea Jordan signature en 2025.",

    imagen_principal:
      "https://ballershoesdb.com/wp-content/uploads/Tatum4-Cropped.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 90,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/t/tatum-4-zapatillas-de-baloncesto-Bbr6tfuA/HQ4614-004", precio_actual: 90.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // ───────────────────────────────────────────────
  // 64. Nike Zoom Freak 7 — Giannis, potencia y estabilidad
  // ───────────────────────────────────────────────
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
      "Horma ancha — ideal para pies anchos o grandes",
      "Outsole durable, apto para exterior ocasional",
    ],
    contras: [
      "Pesada — no apta para jugadores que priorizan velocidad",
      "Amortiguación no tan plush como la LeBron 23",
      "Precio elevado para zapatilla de posición interior",
    ],
    veredicto:
      "La mejor opción Nike para pivots y aleros físicos que necesitan una zapatilla robusta. Si juegas como Giannis — potencia, cambios de dirección bruscos, juego en la pintura — la Freak 7 es la elección correcta.",

    imagen_principal:
      "https://ballershoesdb.com/wp-content/uploads/NikeGiannisFreak7-Cropped-1.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 115,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/t/giannis-freak-7-light-aqua-zapatillas-de-baloncesto-unI5zoUd/HF3450-402", precio_actual: 114.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // ───────────────────────────────────────────────
  // 65. Nike Giannis Immortality 5 — Gama media Giannis, accesible
  // ───────────────────────────────────────────────
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
      "Sin Zoom Air — cushion básico",
      "No apta para juego intensivo o jugadores pesados",
      "Soporte lateral mínimo",
    ],
    veredicto:
      "La mejor opción bajo 90€ con respaldo de una marca premium. Para juego recreativo, entrenos o como segunda zapatilla, la Immortality 5 es una opción sólida y asequible. Para juego competitivo, invierte en la Freak 7 o la Tatum 4.",

    imagen_principal:
      "https://ballershoesdb.com/wp-content/uploads/Immortality4-Cropped.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 90,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/t/giannis-immortality-5-zapatillas-de-baloncesto-5HW4SGTy/IM5130-700", precio_actual: 89.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // ───────────────────────────────────────────────
  // 66. Nike GT Cut Academy 2 — Gama media del GT Cut, versátil
  // ───────────────────────────────────────────────
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
      "Precio muy competitivo (100€)",
      "Perfil bajo y ligero para jugadores de velocidad",
      "Buena durabilidad para el precio",
    ],
    contras: [
      "Sin Zoom Air — cushion básico comparado con el GT Cut 4",
      "Upper sintético menos transpirable que mesh",
      "No tan reactiva como la versión premium",
    ],
    veredicto:
      "Si quieres el agarre del GT Cut 4 sin el gasto, la GT Cut Academy 2 es la respuesta. Perfecta para jugadores de velocidad con presupuesto ajustado o para uso en entrenos intensivos. La relación calidad-precio es excepcional a 99.99€.",

    imagen_principal:
      "https://ballershoesdb.com/wp-content/uploads/GTCutAcademy2-Cropped.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 100,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/t/gt-cut-academy-2-zapatillas-de-baloncesto-KR3H9TWw/HV9774-002", precio_actual: 99.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // ───────────────────────────────────────────────
  // 67. Puma Stewie 4 — Breanna Stewart signature, versatil para interiores
  // ───────────────────────────────────────────────
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
      "Precio competitivo a 120€ para zapatilla con Nitrofoam",
    ],
    contras: [
      "No tan ligera como las opciones speed",
      "Upper sintético menos transpirable que mesh",
      "Estética predominantemente femenina en algunos colorways",
    ],
    veredicto:
      "Una opción sólida y a menudo ignorada en el catálogo Puma. Si juegas en posiciones de interior y buscas Nitrofoam a un precio razonable, la Stewie 4 compite de tú a tú con la Freak 7 y la Curry 13. Merece más atención de la que recibe.",

    imagen_principal:
      "https://ballershoesdb.com/wp-content/uploads/stewie4-Cropped.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "puma_es", url: "https://eu.puma.com/es/es/pd/zapatillas-de-baloncesto-stewie-4-most-wanted-para-mujer/312744?search=true&swatch=01", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // ───────────────────────────────────────────────
  // 68. Jordan Zion 4 — potencia y cushion para interiores grandes
  // ───────────────────────────────────────────────
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
      "Precio rebajado (~85€) — una de las mejores opciones para pivots",
    ],
    contras: [
      "Muy pesada (~425g) — no apta para jugadores de velocidad",
      "Respuesta limitada comparada con opciones más reactivas",
      "Ventilación justa para partidos largos",
      "Estética polarizadora",
    ],
    veredicto:
      "Si juegas de pivot o ala-pivot y pesas más de 90 kg, la Zion 4 es una de las mejores protecciones para rodillas y tobillos del mercado por ~85€. No es para correr, es para dominar la pintura. Horma ancha, React foam sólido y precio rebajado: difícil de superar para su perfil.",

    imagen_principal:
      "https://ballershoesdb.com/wp-content/uploads/JordanZion4-Cropped.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 149.99,
    links_compra: [
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/product/jordan-zion-4-hombre-zapatillas/314109478504.html", precio_actual: 85, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // ───────────────────────────────────────────────
  // 69. Adidas AE 3 — Anthony Edwards tercera edición, respuesta y agarre
  // ───────────────────────────────────────────────
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
      "La Adidas AE 3 es la tercera zapatilla signature de Anthony Edwards y su mejor obra hasta ahora. Lightstrike Pro mejorado, outsole herringbone renovado con excelente tracción, y un upper ligero de mesh. Si buscas velocidad y primer paso explosivo en el rango de 130€, la AE 3 es una de las mejores opciones del mercado.",
    pros: [
      "Lightstrike Pro: respuesta entre las mejores de 2025",
      "Outsole herringbone con tracción top en pistas cubiertas",
      "Upper mesh ligero y bien ventilado",
      "Relación calidad-precio excepcional a 130€",
      "Perfil bajo para movilidad máxima en guards",
    ],
    contras: [
      "No la ideal para jugadores de más de 95-100 kg",
      "Low-top: no recomendada si tienes historial de esguinces",
      "Durabilidad outdoor moderada",
    ],
    veredicto:
      "La AE 3 es la evolución más lograda de la línea Anthony Edwards: más agarre, más respuesta y mejor fit que las versiones anteriores. A 130€ compite directamente con la Nike Ja 3 y la GT Cut 4. Si eres guard o escolta y priorizas la reactividad, es una de las compras más inteligentes del año.",

    imagen_principal:
      "https://images.footlocker.com/is/image/FLEU/314109779604?wid=500&hei=500",
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

  // ───────────────────────────────────────────────
  // 70. Jordan Luka 4 — Luka Doncic 4ª, versatilidad para guards/aleros
  // ───────────────────────────────────────────────
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
      "La Jordan Luka 4 continúa la tradición de la línea Doncic: Zoom Air para cushion reactivo, upper de knit para comodidad, y soporte lateral mid-top. Perfecta para guards y aleros que buscan un equilibrio entre amortiguación y respuesta. A 80€ en rebajas es una auténtica ganga.",
    pros: [
      "Zoom Air: cushion reactivo y responsive",
      "Upper knit: comodidad y ajuste natural al pie",
      "Mid-top: soporte de tobillo superior a low-tops",
      "Perfil equilibrado: serve para múltiples posiciones",
      "Precio rebajado (~80€) — excelente relación calidad-precio",
    ],
    contras: [
      "Algo más pesada que las opciones speed",
      "Upper knit puede desgastarse más rápido en uso outdoor",
      "Respuesta no tan alta como Ja 3 o AE 3",
    ],
    veredicto:
      "Si buscas una zapatilla mid-top bien equilibrada para guards y aleros con Zoom Air a 80€, la Luka 4 es difícil de superar en su rango de precio. La línea Doncic siempre ha ofrecido buen valor, y la 4ª edición no es excepción. Ideal para el jugador que busca confort y soporte sin sacrificar respuesta.",

    imagen_principal:
      "https://images.footlocker.com/is/image/FLEU/314109477704?wid=500&hei=500",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 139.99,
    links_compra: [
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/product/jordan-luka-4-hombre-zapatillas/314109477704.html", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // ───────────────────────────────────────────────
  // 71. Nike Book 1 — Devin Booker signature, shooter-oriented
  // ───────────────────────────────────────────────
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
      "La Nike Book 1 es la primera zapatilla signature de Devin Booker, diseñada para el jugador de perímetro que necesita respuesta, agarre y ligereza. Zoom Air en el antepié, outsole herringbone y upper knit que abraza el pie. Actualmente disponible a 60€ — una oportunidad increíble para su nivel de rendimiento.",
    pros: [
      "Zoom Air en el antepié: respuesta notable para tiradores",
      "Outsole herringbone con excelente agarre en pista cubierta",
      "Upper knit cómodo y bien ventilado",
      "Muy ligera para ser una low-top con Zoom",
      "Precio rebajado a 60€ — mejor valor del catálogo Nike actualmente",
    ],
    contras: [
      "Low-top: sin soporte de tobillo superior",
      "No ideal para jugadores físicos de más de 90 kg",
      "Amortiguación moderada (no es la prioridad en este modelo)",
    ],
    veredicto:
      "A 60€ la Book 1 es probablemente la mejor compra del catálogo Nike ahora mismo para guards y escoltas. Zoom Air, tracción herringbone y comodidad de knit — todo lo que necesita un jugador de perímetro, a un precio que no tiene rival. El hecho de que sea la primera edición de Booker le da un punto de coleccionismo extra.",

    imagen_principal:
      "https://ballershoesdb.com/wp-content/uploads/NikeBook1-Cropped.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/product/nike-book-1-hombre-zapatillas/314109163304.html", precio_actual: 60, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // ───────────────────────────────────────────────
  // 72. Adidas Harden Vol 10 — James Harden, protección máxima para guards pesados
  // ───────────────────────────────────────────────
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
      "La Adidas Harden Vol 10 es la décima iteración de la línea de James Harden, con Lightstrike Pro mejorado y un outsole herringbone que ofrece tracción sólida. Mid-top para soporte de tobillo. Diseñada para el guard de físico que necesita cushion y soporte sin perder respuesta. A 160€ compite en el segmento premium.",
    pros: [
      "Lightstrike Pro: una de las mejores mezclas cushion-respuesta del mercado",
      "Mid-top con soporte lateral elevado",
      "Outsole herringbone con buena tracción",
      "Diseño equilibrado para el guard de físico",
    ],
    contras: [
      "Precio premium (160€) para un modelo mid-range en prestaciones",
      "Algo más pesada que la competencia directa",
      "Estética que puede no gustar a todos",
    ],
    veredicto:
      "La Harden 10 es la zapatilla definitiva para el guard que pesa entre 85-105 kg y busca Lightstrike Pro con soporte mid-top. Compite con la Luka 5 y la Curry 13 en el mismo rango. Si valoras el equilibrio entre cushion, respuesta y soporte lateral, la Harden 10 es una elección sólida a 160€.",

    imagen_principal:
      "https://ballershoesdb.com/wp-content/uploads/Harden10-Cropped.jpg",
    imagenes: [],

    fuentes: [],
    ultima_actualizacion: "2026-05-16",

    precio_msrp_eur: 159.99,
    links_compra: [
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/product/adidas-harden-volume-10-hombre-zapatillas/314109881004.html", precio_actual: 159.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-16" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 74. NIKE KD 17 — Durant signature, cushion equilibrado
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/025134-nike-kd-17-fz1507-100_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/nike-kd-17-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 160,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=kd+17&vst=kd+17", precio_actual: 160, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+kd+17", precio_actual: 155, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 75. NIKE D.O.N. ISSUE 6 — Donovan Mitchell, budget signature
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/026001-nike-don-issue-6-hf4097-100_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/nike-don-issue-6-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=don+issue+6&vst=don+issue+6", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+don+issue+6", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 76. PUMA SCOOT ZEROS — Scoot Henderson, ultra ligera
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/028005-puma-scoot-zeros-309545-01_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/puma-scoot-zeros-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "puma_es", url: "https://es.puma.com/es_ES/search?q=scoot+zeros", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=puma+scoot+zeros", precio_actual: 115, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 77. NIKE PG 7 — Paul George, budget traction king
  // ────────────────────────────────────────────────────────────
  {
    id: "nike-pg-7",
    slug: "nike-pg-7",
    marca: "Nike",
    modelo: "PG 7",
    generacion: 7,
    año_lanzamiento: 2024,
    genero: "unisex",
    signature_player: "Paul George",
    tecnologia_clave: ["Zoom Air", "multidirectional traction"],
    predecesor_id: "nike-pg-6",
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
      respuesta: 7,
      soporte_lateral: 7,
      estabilidad: 7,
      peso_score: 7,
      durabilidad_outdoor: 8,
      ventilacion: 7,
    },
    categoria_principal: "traction-king",
    tags: ["signature", "value-premium"],
    ideal_para: {
      posiciones: ["escolta", "alero"],
      peso_jugador_kg: [70, 95],
      estilos: ["equilibrado", "tirador"],
    },
    no_recomendada_para: { posiciones: ["pivot"], estilos: [] },
    resumen: "Séptima entrega de la línea de Paul George. Tracción multidireccional excepcional con Zoom Air. Buena relación calidad-precio para escoltas y aleros.",
    pros: ["Tracción de élite", "Buena durabilidad outdoor", "Precio razonable para signature"],
    contras: ["Cushion solo correcto", "No destaca en ningún parámetro individual"],
    veredicto: "Sólida y fiable. Para escoltas y aleros que necesitan agarre constante sin gastarse una fortuna.",
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/027002-nike-pg-7-fz4278-100_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/nike-pg-7-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=pg+7&vst=pg+7", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+pg+7", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 78. ADIDAS DAME 8 — Damian Lillard, cushion responsive
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/023501-adidas-dame-8-ie7187_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/adidas-dame-8-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=dame+8", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=adidas+dame+8", precio_actual: 95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 79. NIKE ZOOM FREAK 5 — Giannis, balanced traction
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/023502-nike-zoom-freak-5-dz2949-100_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/nike-zoom-freak-5-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 140,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=zoom+freak+5&vst=zoom+freak+5", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+zoom+freak+5", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 80. ADIDAS EXHIBIT A — budget responsive, escolta/alero
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/021001-adidas-exhibit-a-gz7767_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 80,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=exhibit+a", precio_actual: 65, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+exhibit+a+baloncesto", precio_actual: 60, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 81. ADIDAS EXHIBIT B — mid-budget responsive
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/023003-adidas-exhibit-b-if2683_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 95,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=exhibit+b", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+exhibit+b+baloncesto", precio_actual: 75, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 82. NIKE KYRIE INFINITY 2 — budget tracción alta
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/024001-nike-kyrie-infinity-2-dm1125-100_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 100,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=kyrie+infinity+2&vst=kyrie+infinity+2", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+kyrie+infinity+2", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 83. JORDAN xxxviii (38) — alto cushion, alero/pivot ligero
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/023601-jordan-xxxviii-dz3355-100_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/air-jordan-xxxviii-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 180,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=jordan+xxxviii&vst=jordan+xxxviii", precio_actual: 160, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=jordan+xxxviii", precio_actual: 155, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 84. UA JET 23 — budget UA, tracción sólida
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/023701-ua-jet-23-3026636-001_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 75,
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=under+armour+jet+23+baloncesto", precio_actual: 65, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=under+armour+jet+23", precio_actual: 70, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 85. PUMA ALL-PRO NITRO 2 — cushion premium, pivot
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/028101-puma-all-pro-nitro-2-309550-01_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/puma-all-pro-nitro-2-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 130,
    links_compra: [
      { tienda: "puma_es", url: "https://es.puma.com/es_ES/search?q=all+pro+nitro+2", precio_actual: 130, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=puma+all+pro+nitro+2", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 86. NIKE AIR MAX IMPACT 5 — presupuesto, interior básico
  // ────────────────────────────────────────────────────────────
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
    veredicto: "Para el jugador de interior que quiere cushion Nike sin gastar más de 80€. Simple y funcional.",
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/026501-nike-air-max-impact-5-dx4992-001_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 80,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=air+max+impact+5&vst=air+max+impact+5", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+air+max+impact+5", precio_actual: 72, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 87. LI-NING SONIC 12 — traction king, mercado chino
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/027501-li-ning-sonic-12-abps009_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 100,
    links_compra: [
      { tienda: "aliexpress", url: "https://www.aliexpress.com/wholesale?SearchText=li+ning+sonic+12", precio_actual: 85, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "kickscrew", url: "https://www.kickscrew.com/search?q=li+ning+sonic+12", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 88. NIKE GIANNIS IMMORTALITY 4 — budget Giannis, tracción
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/026502-nike-giannis-immortality-4-hf5480-001_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 85,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=giannis+immortality+4&vst=giannis+immortality+4", precio_actual: 85, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=giannis+immortality+4", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 89. NIKE GT RUN 2 — cushion para corredores/tiradores
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/024003-nike-gt-run-2-dr9635-100_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=gt+run+2&vst=gt+run+2", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+gt+run+2", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 90. JORDAN SUPER/FLY 10 — legacy budget Jordan
  // ────────────────────────────────────────────────────────────
  {
    id: "jordan-super-fly-10",
    slug: "jordan-super-fly-10",
    marca: "Jordan",
    modelo: "Super/Fly 10",
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/027601-jordan-super-fly-10-hf4703-100_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 115,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=jordan+super+fly+10&vst=jordan+super+fly+10", precio_actual: 115, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=jordan+super+fly+10", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 91. PEAK TAICHI FLASH — Asian brand, cushion reactivo
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/027001-peak-taichi-flash-e04323a_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 90,
    links_compra: [
      { tienda: "aliexpress", url: "https://www.aliexpress.com/wholesale?SearchText=peak+taichi+flash+basketball", precio_actual: 75, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 92. NIKE ZOOM FREAK 6 — Giannis mid-gen
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/026003-nike-zoom-freak-6-hf4002-001_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/nike-zoom-freak-6-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 150,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=zoom+freak+6&vst=zoom+freak+6", precio_actual: 150, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+zoom+freak+6", precio_actual: 140, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 93. ADIDAS CROSS EM UP 5 — budget all-round
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/023002-adidas-cross-em-up-5-ie9257_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 65,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=cross+em+up+5", precio_actual: 55, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+cross+em+up+5", precio_actual: 50, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 94. NIKE LEBRON WITNESS 8 — budget LeBron
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/024502-nike-lebron-witness-8-hf0736-001_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 90,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=lebron+witness+8&vst=lebron+witness+8", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+lebron+witness+8", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+lebron+witness+8", precio_actual: 85, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 95. NEW BALANCE KAWHI 1 — signature Kawhi, traction
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/027801-nb-kawhi-1-bbkaw1_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/new-balance-kawhi-1-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 150,
    links_compra: [
      { tienda: "nb_es", url: "https://www.newbalance.es/es/buscar?q=kawhi+1", precio_actual: 150, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=new+balance+kawhi+1", precio_actual: 140, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 96. ANTA GORgordon HAY 1 — budget Anta, exterior
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/027901-anta-shock-wave-5_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 90,
    links_compra: [
      { tienda: "aliexpress", url: "https://www.aliexpress.com/wholesale?SearchText=anta+shock+wave+5+basketball", precio_actual: 75, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "kickscrew", url: "https://www.kickscrew.com/search?q=anta+shock+wave+5", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 97. NIKE SABRINA 1 — signature Sabrina Ionescu gen 1
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/024601-nike-sabrina-1-fq3381-001_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/nike-sabrina-1-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=sabrina+1&vst=sabrina+1", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+sabrina+1", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 98. ADIDAS HARDEN STEPBACK 4 — budget Harden
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/023901-adidas-harden-stepback-4-ie2678_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 80,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=harden+stepback+4", precio_actual: 70, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+harden+stepback+4", precio_actual: 65, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 99. NIKE KYRIE FLYTRAP 6 — ultra budget base/escolta
  // ────────────────────────────────────────────────────────────
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
    resumen: "La opción más barata de la familia Kyrie. Tracción sólida y durabilidad outdoor para bases y escoltas que buscan el ADN Kyrie sin gastar más de 70€.",
    pros: ["Precio muy asequible", "Buena tracción", "Duradera en outdoor"],
    contras: ["Cushion básico", "Sin tecnología premium"],
    veredicto: "El punto de entrada a las Kyrie. Para jugadores de base con presupuesto ajustado que valoran el agarre.",
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/023801-nike-kyrie-flytrap-6-dz4996-001_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 70,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=kyrie+flytrap+6&vst=kyrie+flytrap+6", precio_actual: 70, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+kyrie+flytrap+6", precio_actual: 60, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 100. JORDAN LUKA 1 — primera signature Doncic
  // ────────────────────────────────────────────────────────────
  {
    id: "jordan-luka-1",
    slug: "jordan-luka-1",
    marca: "Jordan",
    modelo: "Luka 1",
    generacion: 1,
    año_lanzamiento: 2022,
    genero: "unisex",
    signature_player: "Luka Dončić",
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
    resumen: "La primera signature de Luka Dončić sorprendió con una base ultra ancha y estabilidad excelente. Pensada para jugadores potentes y versátiles como el propio Luka.",
    pros: ["Estabilidad excepcional", "Horma ancha muy cómoda", "Cushion sólido"],
    contras: ["Pesada", "Respuesta baja para un alero ágil"],
    veredicto: "Para el jugador al estilo Luka: potente, técnico y que necesita una base sólida. Ahora a precios de outlet muy interesantes.",
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/022001-jordan-luka-1-dn1772-105_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/jordan-luka-1-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 140,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=jordan+luka+1&vst=jordan+luka+1", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=jordan+luka+1", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 101. UA HOVR HAVOC 5 — cushion mid UA
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/027201-ua-hovr-havoc-5-3026612-001_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=under+armour+hovr+havoc+5", precio_actual: 95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=under+armour+hovr+havoc+5", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 102. NIKE AIR ZOOM CROSSOVER 2 — junior/youth budget
  // ────────────────────────────────────────────────────────────
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
    veredicto: "La mejor opción Nike para jugadores junior que quieren rendimiento real sin gastar más de 75€.",
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/024201-nike-air-zoom-crossover-2-fb2689-001_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 75,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=air+zoom+crossover+2&vst=air+zoom+crossover+2", precio_actual: 75, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+air+zoom+crossover+2", precio_actual: 65, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 103. ADIDAS OWNTHEGAME 3 — ultra budget, iniciación
  // ────────────────────────────────────────────────────────────
  {
    id: "adidas-ownthegame-3",
    slug: "adidas-ownthegame-3",
    marca: "Adidas",
    modelo: "OwnTheGame 3",
    generacion: 3,
    año_lanzamiento: 2024,
    genero: "unisex",
    tecnologia_clave: ["Bounce foam", "rubber outsole"],
    predecesor_id: null,
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
    veredicto: "Para el jugador recreativo o principiante que quiere estrenar marca Adidas sin gastar más de 55€.",
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/026601-adidas-ownthegame-3-ig6382_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 55,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=ownthegame+3", precio_actual: 55, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+ownthegame+3+baloncesto", precio_actual: 48, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 104. NEW BALANCE OMN1S — retro performance, traction
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/020001-nb-omn1s-bbomn1sb_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/new-balance-omn1s-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 130,
    links_compra: [
      { tienda: "nb_es", url: "https://www.newbalance.es/es/buscar?q=omn1s", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=new+balance+omn1s", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 105. PUMA PLAYMAKER PRO MID — budget Puma, soporte tobillo
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/024801-puma-playmaker-pro-mid-377072-01_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 90,
    links_compra: [
      { tienda: "puma_es", url: "https://es.puma.com/es_ES/search?q=playmaker+pro+mid", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=puma+playmaker+pro+mid+baloncesto", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 106. LI-NING YU SHUAI 18 — premium chino, traction/responsive
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/028201-li-ning-yu-shuai-18-abpu007_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "aliexpress", url: "https://www.aliexpress.com/wholesale?SearchText=li+ning+yu+shuai+18+basketball", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "kickscrew", url: "https://www.kickscrew.com/search?q=li+ning+yu+shuai+18", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 107. NIKE KD 16 — Durant pre-18, balanced
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/023101-nike-kd-16-dv2917-002_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 160,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=kd+16&vst=kd+16", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+kd+16", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 108. ADIDAS AE 1.5 — Anthony Edwards mid-gen
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/026701-adidas-ae-1-5-ig3736_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/adidas-ae-1-5-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 130,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=ae+1.5", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=adidas+ae+1.5", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 109. CONVERSE ALL STAR PRO BB — retro performance
  // ────────────────────────────────────────────────────────────
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
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/020501-converse-all-star-pro-bb-170369c_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 140,
    links_compra: [
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=converse+all+star+pro+bb", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=converse+all+star+pro+bb", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // ────────────────────────────────────────────────────────────
  // 110. NIKE PRECISION 7 — entry-level Nike
  // ────────────────────────────────────────────────────────────
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
    veredicto: "Para el jugador que quiere estrenar Nike sin gastar más de 65€. La puerta de entrada a la marca.",
    imagen_principal: "https://d3pnpe87i1fkwu.cloudfront.net/IMG/023301-nike-precision-7-fn4322-002_585x585.png",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 65,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=precision+7&vst=precision+7", precio_actual: 65, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+precision+7+baloncesto", precio_actual: 55, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
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
