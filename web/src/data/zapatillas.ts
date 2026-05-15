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
        url: "https://www.nike.com/es/t/lebron-xxii",
        precio_actual: 200,
        disponible: true,
        tiene_afiliado: false,
        ultima_verificacion: "2026-05-13",
      },
      {
        tienda: "footlocker_es",
        url: "https://www.footlocker.es/es/category/men/basketball-shoes.html",
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
      {
        tienda: "amazon_es",
        url: "https://www.amazon.es/s?k=under+armour+curry+12",
        precio_actual: 149.99,
        disponible: true,
        tiene_afiliado: false,
        ultima_verificacion: "2026-05-13",
      },
      {
        tienda: "jd_sports_es",
        url: "https://www.jdsports.es/search/curry-12/",
        precio_actual: 160,
        disponible: true,
        tiene_afiliado: false,
        ultima_verificacion: "2026-05-13",
      },
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
        url: "https://www.nike.com/es/t/sabrina-2",
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
      {
        tienda: "amazon_es",
        url: "https://www.amazon.es/s?k=adidas+cross+em+up+select",
        precio_actual: 54.99,
        disponible: true,
        tiene_afiliado: false,
        ultima_verificacion: "2026-05-13",
      },
      {
        tienda: "decathlon",
        url: "https://www.decathlon.es/es/search?Ntt=adidas+cross+em+up",
        precio_actual: 60,
        disponible: true,
        tiene_afiliado: false,
        ultima_verificacion: "2026-05-13",
      },
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
      { tienda: "nike_es", url: "https://www.nike.com/es/t/kd-18", precio_actual: 169.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
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
      { tienda: "nike_es", url: "https://www.nike.com/es/t/kobe-8-protro", precio_actual: 200, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
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
      { tienda: "nike_es", url: "https://www.nike.com/es/t/jordan-luka-5", precio_actual: 135, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
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
      { tienda: "nike_es", url: "https://www.nike.com/es/t/gt-cut-3", precio_actual: 189.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
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
      { tienda: "nike_es", url: "https://www.nike.com/es/t/jordan-tatum-3", precio_actual: 144.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
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
      { tienda: "nike_es", url: "https://www.nike.com/es/t/ja-2", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
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
      { tienda: "nike_es", url: "https://www.nike.com/es/t/kyrie-low-5", precio_actual: 119.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
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
      { tienda: "nike_es", url: "https://www.nike.com/es/t/jordan-luka-3", precio_actual: 129.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=new+balance+fresh+foam+bb+v3", precio_actual: 139, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "jd_sports_es", url: "https://www.jdsports.es/search/new-balance-bb-v3", precio_actual: 144.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
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
      { tienda: "jd_sports_es", url: "https://www.jdsports.es/search/harden-vol-9", precio_actual: 159.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+harden+vol+9", precio_actual: 169, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
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
      { tienda: "jd_sports_es", url: "https://www.jdsports.es/search/dame-certified", precio_actual: 94.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+dame+certified", precio_actual: 92, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
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
      { tienda: "jd_sports_es", url: "https://www.jdsports.es/search/?q=puma+mb+04", precio_actual: 129.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
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
      { tienda: "nike_es", url: "https://www.nike.com/es/t/precision-8", precio_actual: 79.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
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
      { tienda: "nike_es", url: "https://www.nike.com/es/t/lebron-witness-9", precio_actual: 99.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
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
      { tienda: "jd_sports_es", url: "https://www.jdsports.es/search/dame-9", precio_actual: 119.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+dame+9", precio_actual: 124, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+cross+em+up+speed", precio_actual: 60, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "jd_sports_es", url: "https://www.jdsports.es/search/cross-em-up-speed", precio_actual: 69.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
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
      { tienda: "nike_es", url: "https://www.nike.com/es/t/jordan-one-take-6", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
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
    modelo: "Air Jordan XXXVII",
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=air+jordan+xxxvii", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=air+jordan+xxxvii", precio_actual: 115, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=air+jordan+xxxvii", precio_actual: 125, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+lebron+21", precio_actual: 135, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+zoom+freak+4", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=puma+mb.03+basketball", precio_actual: 70, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=puma+mb+03", precio_actual: 75, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=under+armour+flow+breakthru+4", precio_actual: 70, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+ae+1+basketball", precio_actual: 85, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=adidas+ae+1", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=new+balance+two+wxy+v4", precio_actual: 72, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=jordan+luka+2", precio_actual: 75, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+pg+6+basketball", precio_actual: 65, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+gt+jump+2+basketball", precio_actual: 95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
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
      { tienda: "nike_es", url: "https://www.nike.com/es/t/lebron-23", precio_actual: 220, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
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
      { tienda: "nike_es", url: "https://www.nike.com/es/t/ja-3", precio_actual: 135, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+ae+2+basketball", precio_actual: 135, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=adidas+ae+2", precio_actual: 145, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=adidas+ae+2", precio_actual: 140, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=converse+shai+001+basketball", precio_actual: 125, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
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
      { tienda: "nike_es", url: "https://www.nike.com/es/t/air-zoom-gt-cut-4", precio_actual: 170, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
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
      { tienda: "reebok_es", url: "https://www.reebok.com/es-es/question-mid", precio_actual: 130, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=reebok+question+mid", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=reebok+question+mid", precio_actual: 115, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=reebok+question+mid", precio_actual: 118, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
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
      { tienda: "reebok_es", url: "https://www.reebok.com/es-es/answer-iv", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=reebok+answer+iv", precio_actual: 105, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=reebok+answer+iv", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
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
      { tienda: "reebok_es", url: "https://www.reebok.com/es-es/engine-a", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "zalando_es", url: "https://www.zalando.es/buscar/?q=reebok+engine+a", precio_actual: 115, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=reebok+engine+a+basketball", precio_actual: 112, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-15" },
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
