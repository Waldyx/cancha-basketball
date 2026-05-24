import type { Zapatilla } from "../lib/types";
import { mergePricesIntoShoes } from "../lib/mergePrices";
import type { PreciosJson } from "../lib/mergePrices";
import preciosJson from "./precios.json";

/**
 * CatÃ¡logo inicial de zapatillas (MVP).
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
      "El tope de gama de Nike para 2024-25. Cushion masivo con Air Zoom y Cushlon 3.0 que la convierte en una de las zapatillas mÃ¡s protectoras del mercado. Pensada para jugadores grandes y potentes que necesitan absorciÃ³n de impactos al mÃ¡ximo nivel.",
    pros: [
      "AmortiguaciÃ³n lÃ­der en su categorÃ­a",
      "Estabilidad excelente para jugadores >90kg",
      "Soporte lateral en high-top muy contenido",
      "Durabilidad sÃ³lida indoor y outdoor",
    ],
    contras: [
      "Demasiado pesada para juego explosivo",
      "Precio elevado",
      "Court feel muy reducido (no notas el suelo)",
    ],
    veredicto:
      "Si pesas mÃ¡s de 85kg, juegas de poste o ala-pÃ­vot potente y priorizas protecciÃ³n sobre velocidad, es la mejor opciÃ³n del mercado. Si eres un base rÃ¡pido, mantente lejos.",

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
      "La signature de Curry en su 12Âª iteraciÃ³n. TecnologÃ­a UA Flow (sin goma en suela, solo foam directo al suelo) que la hace sÃºper ligera y reactiva. Pensada para tiradores Ã¡giles que necesitan respuesta mÃ¡xima en cortes y cambios de direcciÃ³n.",
    pros: [
      "Una de las zapatillas mÃ¡s ligeras del mercado (310g)",
      "Respuesta excelente para tiradores y guardias rÃ¡pidos",
      "Court feel premium â€” sientes el suelo perfectamente",
      "VentilaciÃ³n notable en pista cubierta",
    ],
    contras: [
      "Durabilidad outdoor pobre â€” el Flow se gasta rÃ¡pido en asfalto",
      "Cushion limitado para jugadores >85kg",
      "No es para juego fÃ­sico de poste",
    ],
    veredicto:
      "Si eres tirador o base ligero, juegas casi exclusivamente en pista cubierta y priorizas respuesta sobre protecciÃ³n, es de las mejores opciones premium. Para asfalto o pesos altos, busca otra cosa.",

    imagen_principal: "https://ballershoesdb.com/wp-content/uploads/UACurry12-Cropped-650x406.jpg",
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
      "La mejor relaciÃ³n calidad-precio del catÃ¡logo signature de Nike. 28 gramos mÃ¡s ligera que la Sabrina 1, con Zoom Air en talÃ³n y Cushlon 3.0 en mediopiÃ©. Una zapatilla all-around que funciona para guardias y aleros que mezclan estilos.",
    pros: [
      "Excelente relaciÃ³n calidad-precio (â‚¬120)",
      "Equilibrio entre respuesta y amortiguaciÃ³n",
      "TracciÃ³n muy fiable indoor",
      "Versatilidad: sirve para varios estilos de juego",
    ],
    contras: [
      "No destaca en ningÃºn aspecto concreto",
      "Cushion insuficiente para jugadores grandes",
      "Stock irregular en algunas tallas",
    ],
    veredicto:
      "Si eres base, escolta o alero, juegas mayormente indoor y quieres lo mejor por debajo de â‚¬130, es de las apuestas mÃ¡s seguras del aÃ±o. SÃ³lida en todo, sin debilidades graves.",

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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 4. ANTA KAI 1 SPEED â€” Value premium, tÃ©cnica
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
      "La signature oficial de Kyrie Irving con Anta (tras dejar Nike). TracciÃ³n de las mejores del aÃ±o segÃºn WearTesters, placa de carbono para respuesta y un precio que la hace imbatible en relaciÃ³n calidad-precio. Apuesta del momento para guardias tÃ©cnicos.",
    pros: [
      "TracciÃ³n excepcional, una de las mejores 2024-25",
      "Respuesta y court feel premium gracias a la placa de carbono",
      "Excelente relaciÃ³n calidad-precio (â‚¬115)",
      "Low-top moderno y cÃ³modo",
    ],
    contras: [
      "Low-top no apto para jugadores con tobillos dÃ©biles",
      "Cushion firme, no para impactos pesados",
      "Disponibilidad limitada fuera de China/AliExpress",
    ],
    veredicto:
      "Si eres base o escolta tÃ©cnico, buscas respuesta y tracciÃ³n, y no tienes problemas de tobillo, es una de las mejores compras del aÃ±o. Para tobillos delicados o juego potente, busca otra opciÃ³n.",

    imagen_principal: "https://ballershoesdb.com/wp-content/uploads/Anta-Kai-1-Speed-Cropped-650x406.jpg",
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
      "La mejor compra por debajo de â‚¬70 para juego outdoor. Goma reforzada que aguanta asfalto durante meses, high-top para tobillos delicados y un cushion Bounce bÃ¡sico pero fiable. Pensada para iniciaciÃ³n o jugadores casuales que machacan la zapa.",
    pros: [
      "Durabilidad outdoor excepcional â€” aguanta meses en asfalto",
      "High-top con buen soporte de tobillo a este precio",
      "Estabilidad sÃ³lida para jugadores con bases pesados",
      "Precio imbatible (â‚¬60)",
    ],
    contras: [
      "Cushion muy bÃ¡sico, no para muchas horas de juego",
      "Court feel limitado, sensaciÃ³n de bote rÃ­gido",
      "EstÃ©tica simple, no destaca",
      "Pesada para el rendimiento que ofrece",
    ],
    veredicto:
      "Si tu presupuesto es bajo, juegas en exterior o pistas duras, y priorizas durabilidad sobre tecnologÃ­a, es la compra inteligente. Si vas a jugar mucho indoor y quieres rendimiento, sube de gama.",

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
    resumen: "Sucesor continuista del KD 17 con misma plataforma pero soporte mejorado. TracciÃ³n sobresaliente y cushion de los mÃ¡s cÃ³modos del mercado, aunque ha ganado peso.",
    pros: [
      "Energy return forefoot del 72.7%",
      "TracciÃ³n excepcional indoor/outdoor",
      "Soporte y lockdown reforzados",
      "CÃ³moda desde el primer dÃ­a",
    ],
    contras: [
      "Pesada (422 g)",
      "Horma estrecha incÃ³moda en pies anchos",
      "DiseÃ±o conservador, sin innovaciÃ³n",
    ],
    veredicto: "Para aleros y forwards que priorizan amortiguaciÃ³n y tracciÃ³n sobre velocidad. Si eres un base rÃ¡pido, busca otra cosa.",
    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/40711/nike-kd-18-kevin-durant-lab-test-and-review-23703824-main.jpg",
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
      "TracciÃ³n sticky de las mejores",
      "Engineered mesh sÃºper transpirable",
      "Court feel impresionante",
      "Lockdown perfecto",
    ],
    contras: [
      "Horma muy estrecha",
      "AmortiguaciÃ³n baja para jugadores pesados",
      "Rubber blando que se desgasta en outdoor",
    ],
    veredicto: "Para guards rÃ¡pidos y pies estrechos que aman la sensaciÃ³n del Kobe 8 original. No es para jugadores pesados ni outdoor intensivo.",
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
    resumen: "El mejor Luka hasta la fecha: Zoom Strobel full-length con Cushlon 3.0 que se siente increÃ­ble. Penaliza algo en tracciÃ³n en pista sucia y el heel es algo inestable.",
    pros: [
      "Cushion espectacular bouncy y protector",
      "Buen lockdown",
      "VersÃ¡til para varios estilos",
      "Mejor energy return de la lÃ­nea Luka",
    ],
    contras: [
      "Heel area inestable en cambios bruscos",
      "TracciÃ³n mediocre en pista sucia",
      "Algo pesada",
    ],
    veredicto: "Para jugadores ground-based equilibrados o tiradores potentes que priorizan cushion. No es para explosivos que necesitan estabilidad mÃ¡xima.",
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
    resumen: "Primera basket con ZoomX. Una de las shoes mÃ¡s completas del mercado: ligera, bouncy, tracciÃ³n elite. Su Ãºnico talÃ³n de Aquiles es la durabilidad outdoor.",
    pros: [
      "ZoomX bouncy y squishy",
      "Solo 335 g, sÃºper ligera",
      "TracciÃ³n herringbone agresiva indoor",
      "Court feel y respuesta excelentes",
    ],
    contras: [
      "Rubber blando que se desgasta en outdoor",
      "No apta para outdoor intensivo",
      "Disponibilidad limitada en Europa",
    ],
    veredicto: "La mejor opciÃ³n indoor para guards rÃ¡pidos. No la compres si juegas mayoritariamente en cemento.",
    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/40285/nike-g-t-cut-3-lab-test-and-review-2-21609057-main.jpg",
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
  // 10. JORDAN TATUM 3 â€” Tope gama, versÃ¡til
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
    resumen: "El mejor Tatum hasta la fecha. Cushlon 3.0 con Zoom Air en el antepiÃ© da un equilibrio excelente. VersÃ¡til para muchas posiciones y estilos.",
    pros: [
      "Cushion bien balanceado",
      "TracciÃ³n confiable incluso en pista polvorienta",
      "Buen soporte torsional",
      "Ligera (340 g)",
    ],
    contras: [
      "TracciÃ³n thin/shallow, durabilidad outdoor cuestionable",
      "Forefoot estrecho",
      "Foam expuesto puede sufrir",
    ],
    veredicto: "Para wings versÃ¡tiles y guards que tiran mucho. La opciÃ³n Jordan mÃ¡s completa para uso indoor regular.",
    imagen_principal: "https://ballershoesdb.com/wp-content/uploads/JordanTatum3-Cropped-650x406.jpg",
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
  // 11. NIKE JA 2 â€” Tope gama, base rÃ¡pido low-top
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
    resumen: "Continuista respecto al Ja 1 pero con materiales mÃ¡s baratos. Buen performer pero sin alma. TracciÃ³n top, cushion firme y rÃ¡pida.",
    pros: [
      "TracciÃ³n grippy y consistente",
      "Drop bajo (~4 mm) para court feel mÃ¡ximo",
      "Ligera y rÃ¡pida",
      "Buen precio",
    ],
    contras: [
      "Materiales muy baratos, look poco premium",
      "Cushion firme, poca protecciÃ³n para pesados",
      "DiseÃ±o genÃ©rico sin identidad",
    ],
    veredicto: "Para guards rÃ¡pidos con presupuesto medio que quieren un performer eficiente. Si valoras estÃ©tica o cushion, mira el Dame 9.",
    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/40624/nike-ja-2-main-picture-22690861-main.jpg",
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
    resumen: "Top tier performance a precio mid-tier. Cushion Boom de los mejores del mercado, tracciÃ³n y soporte impecables. Una de las mejores compras del aÃ±o.",
    pros: [
      "Cushion Boom elite full-length",
      "TracciÃ³n durable y agresiva",
      "Soporte excelente sin perder agilidad",
      "RelaciÃ³n calidad/precio insuperable",
    ],
    contras: [
      "Horma estrecha, los pies anchos sufren",
      "Disponibilidad limitada en EspaÃ±a",
      "EstÃ©tica polarizante",
    ],
    veredicto: "El mejor performance por debajo de 180 â‚¬ si lo encuentras. No es para pies anchos ni para pÃ­vots pesados.",
    imagen_principal: "https://wowsole.com/wp-content/uploads/2025/03/wac13-white-gold.png",
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
    resumen: "ContinuaciÃ³n de la fÃ³rmula Kyrie con menos drama: low-top reactivo y rÃ¡pido. Cushion firme pensado para court feel mÃ¡ximo y aceleraciones.",
    pros: [
      "TracciÃ³n grippy multidireccional",
      "Court feel y respuesta top",
      "Ideal para crossovers y sprints",
      "Ligero y Ã¡gil",
    ],
    contras: [
      "Cushion firme y bajo, sin protecciÃ³n para pesados",
      "Outdoor limitado",
      "Ya no es Kyrie signature (Anta tiene su lÃ­nea)",
    ],
    veredicto: "Para guards rÃ¡pidos que priorizan court feel. Si pesas mÃ¡s de 90 kg o saltas mucho, busca cushion mÃ¡s generoso.",
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
    resumen: "Segunda signature de Kyrie con Anta. Salto importante desde la KAI 1: cushion mejor, materiales premium y tracciÃ³n agresiva por menos de 150 â‚¬.",
    pros: [
      "TracciÃ³n full-length de las mejores del aÃ±o",
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
    resumen: "Una de las shoes mÃ¡s completas de 2024-25. Cushion estable, soporte top y carbon plate. Necesita break-in pero luego es una bestia versÃ¡til.",
    pros: [
      "NitroEdge bouncy con carbon plate",
      "Soporte y containment elite",
      "VersÃ¡til para todas las posiciones",
      "Materiales premium",
    ],
    contras: [
      "Pesada y rÃ­gida los primeros usos",
      "Forefoot stiff, sacrifica agilidad",
      "TracciÃ³n sufre en pista polvorienta",
    ],
    veredicto: "Para tiradores y wings que valoran estabilidad sobre velocidad. Klay-style: tirar con plataforma sÃ³lida.",
    imagen_principal: "https://uk.anta.com/cdn/shop/files/ANTA-KT-10-Dallas-Media-1_2a325205-2301-4700-8a76-d4b427c4d9e6_600x600.jpg?v=1776753137",
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
    resumen: "Decente pero sin innovaciÃ³n para un signature de 130 â‚¬. Lo mejor es la tracciÃ³n y el IsoPlate. Materiales pobres para el precio.",
    pros: [
      "TracciÃ³n multidireccional fantÃ¡stica",
      "IsoPlate da estabilidad lateral",
      "Buena para outdoor casual",
      "Mejor cushion que Luka 1/2",
    ],
    contras: [
      "Materiales baratos para el precio",
      "Sin innovaciÃ³n tecnolÃ³gica",
      "Cushion no destaca en nada",
    ],
    veredicto: "Solo si encuentras buena oferta. A precio completo hay mejores. Para jugadores ground-based equilibrados.",
    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/40440/jordan-luka-3-main-21807191-main.jpg",
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
      "Super Boom bouncy y rÃ¡pida",
      "Carbon plate aporta propulsiÃ³n",
      "Glove-like fit excelente",
    ],
    contras: [
      "TracciÃ³n ocasional necesita wiping",
      "Disponibilidad limitada en Europa",
      "EstÃ©tica polariza",
    ],
    veredicto: "Para guards explosivos que quieren todo: ligereza, cushion y respuesta. El secreto mejor guardado del mercado.",
    imagen_principal: "https://wowsole.com/wp-content/uploads/2025/10/Way-of-Wade-12-Announcement-1-500x500.jpg",
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
    resumen: "El mejor Fresh Foam BB hasta la fecha: cushion enorme sin perder court feel del todo. TracciÃ³n sÃ³lida con patrÃ³n tipo Superstar. Penaliza altura y peso.",
    pros: [
      "Cushion plush sin precedentes para NB basket",
      "TracciÃ³n wave-bone fiable",
      "CÃ³modo desde el primer dÃ­a",
      "Buena para pies anchos",
    ],
    contras: [
      "Sit-high, te separa del suelo",
      "Pesada (410 g)",
      "Respuesta limitada por la cantidad de foam",
    ],
    veredicto: "Para jugadores pesados que priorizan absorciÃ³n sobre velocidad. PÃ­vots y forwards la amarÃ¡n; bases la odiarÃ¡n.",
    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/40826/new-balance-fresh-foam-bb-v-3-lab-test-and-review-24644417-main.jpg",
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
    resumen: "EvoluciÃ³n refinada de la lÃ­nea Harden. MÃ¡s ligera que la 8, con cushion balanceado y tracciÃ³n fiable indoor. No es revolucionaria pero es sÃ³lida.",
    pros: [
      "Boost + Lightstrike cÃ³modo y reactivo",
      "Soporte lateral excelente",
      "MÃ¡s ligera que la Vol 8",
      "Buena para tiradores potentes",
    ],
    contras: [
      "TracciÃ³n thin, dura poco outdoor",
      "Sin innovaciÃ³n fuerte",
      "EstÃ©tica polariza",
    ],
    veredicto: "Para guards y wings que valoran cushion y soporte sobre velocidad. Mejor opciÃ³n Harden en aÃ±os.",
    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/40675/adidas-harden-vol-9-main-22673476-main.jpg",
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
    resumen: "Modelo budget de Lillard que sorprende: tracciÃ³n top, base ancha sÃºper estable y materiales que se sienten premium. El cushion firme es su Ãºnico pero.",
    pros: [
      "TracciÃ³n wavebone agresiva y durable",
      "Base muy ancha y estable",
      "Materiales premium para 95 â‚¬",
      "Excelente para outdoor",
    ],
    contras: [
      "Cushion firme con poca protecciÃ³n para pesados",
      "Pesada (404 g)",
      "DiseÃ±o minimalista que no enamora",
    ],
    veredicto: "La mejor opciÃ³n budget para guards que necesitan tracciÃ³n y soporte. Si pesas mÃ¡s de 90 kg, busca cushion mÃ¡s generoso.",
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
    resumen: "Cuarta signature de LaMelo. Nitro foam cÃ³modo y bouncy, lockdown excelente. Penaliza en tracciÃ³n sobre pista sucia y en outdoor.",
    pros: [
      "Nitro foam reactivo y protector",
      "Lockdown y fit excelentes",
      "Mejor estÃ©tica de la lÃ­nea MB",
      "CÃ³moda como lifestyle tambiÃ©n",
    ],
    contras: [
      "TracciÃ³n inconsistente en pista sucia",
      "No apta para outdoor",
      "Pesada y bulky",
    ],
    veredicto: "Para guards y wings que aman la lÃ­nea MB y juegan indoor en pista limpia. Outdoor: olvÃ­dalo.",
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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 22. NIKE PRECISION 8 â€” Presupuesto iniciaciÃ³n
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
    resumen: "La basket mÃ¡s barata de Nike y sorprende. TracciÃ³n fiable, soporte decente, cushion bÃ¡sico pero funcional. Mejor opciÃ³n sub-80 â‚¬ con tick.",
    pros: [
      "TracciÃ³n herringbone multidireccional",
      "Soporte sÃ³lido para el precio",
      "Rubber duradero para outdoor",
      "Solo 80 â‚¬",
    ],
    contras: [
      "Cushion Phylon bÃ¡sico, sin Zoom",
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
    resumen: "La Witness mÃ¡s cushioned de la historia gracias a ReactX. Excelente para jugadores pesados con presupuesto medio. Penaliza peso (428 g) y tracciÃ³n en suciedad.",
    pros: [
      "ReactX foam con 61-64% energy return",
      "Cushion plush y protector",
      "Roomy fit, ideal pies anchos",
      "100 â‚¬ para signature LeBron",
    ],
    contras: [
      "Pesada (428 g)",
      "TracciÃ³n sensible al polvo",
      "Respuesta limitada por foam soft",
    ],
    veredicto: "Para forwards y pÃ­vots medianos/pesados con presupuesto. Si eres guard rÃ¡pido, esta no es.",
    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/41015/nike-le-bron-witness-9-lab-test-and-review-24011343-main.jpg",
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
    resumen: "Una de las mejores zapas de 2024. Lightstrike plush y reactivo, tracciÃ³n intrincada y soporte top. 120 â‚¬ por todo este performance es un robo.",
    pros: [
      "Lightstrike full-length, sÃºper cÃ³modo",
      "TracciÃ³n thunderbolt grippy",
      "Roomy fit para pies anchos",
      "Precio excelente para tope tier",
    ],
    contras: [
      "Rubber se desgasta rÃ¡pido",
      "Break-in largo, dura los primeros usos",
      "Algo pesada",
    ],
    veredicto: "Top pick value: para todas las posiciones excepto pÃ­vots. Mejor opciÃ³n budget-premium del aÃ±o.",
    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/40347/adidas-dame-9-main-22687931-main.jpg",
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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 25. ADIDAS CROSS 'EM UP SPEED â€” Presupuesto velocidad iniciaciÃ³n
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
    resumen: "Variante Speed del Cross 'Em Up orientada a juventud y jugadores casuales. Cloudfoam cÃ³modo, tracciÃ³n decente y precio bajÃ­simo.",
    pros: [
      "Precio muy accesible",
      "Cloudfoam cÃ³modo desde el primer dÃ­a",
      "DiseÃ±o limpio y juvenil",
      "Buena durabilidad de upper",
    ],
    contras: [
      "Cushion bÃ¡sico, sin tecnologÃ­a destacable",
      "Sin reviews profesionales detalladas",
      "Performance genÃ©rico",
    ],
    veredicto: "Para iniciaciÃ³n o uso casual. No es para competiciÃ³n seria. Si presupuesto sube de 70 â‚¬, mira el Dame Certified.",
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
    resumen: "LÃ­nea de Russell Westbrook con vibe skate-shoe. Rubber gordo lateral, sole resistente y tracciÃ³n en todas direcciones. Pensada para outdoor y juego potente.",
    pros: [
      "Rubber durable, ideal outdoor",
      "Lockdown excelente",
      "TracciÃ³n multidireccional",
      "Precio razonable",
    ],
    contras: [
      "Pesada y bulky",
      "Phylon bÃ¡sico sin gran protecciÃ³n",
      "EstÃ©tica polariza",
    ],
    veredicto: "Para jugadores potentes que juegan principalmente outdoor o necesitan durabilidad sobre lujo. No es para guards rÃ¡pidos.",
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
    resumen: "Primera low-top performance de Decathlon, diseÃ±ada con Isaia Cordinier. Ligera (375 g), responsiva y con TMK-GUARD para cambios de direcciÃ³n. Precio insuperable.",
    pros: [
      "Ligera y rÃ¡pida",
      "Buena para cambios de direcciÃ³n",
      "Probada indoor y outdoor",
      "85 â‚¬ con licencia NBA",
    ],
    contras: [
      "Cushion modesto, no para pesados",
      "Sin reviews internacionales profundas",
      "Solo disponible en Decathlon",
    ],
    veredicto: "Para guards con presupuesto justo que buscan zapa rÃ¡pida. La mejor relaciÃ³n calidad/precio low-top en tiendas fÃ­sicas en EspaÃ±a.",
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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 28. DECATHLON TARMAK VOLTZY 500 MID â€” IniciaciÃ³n ultra-budget
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
    resumen: "Modelo bÃ¡sico mid-top de Decathlon para jugadores casuales o iniciaciÃ³n. Estable y robusto pero pesado y con cushion bÃ¡sico. Sub-50 â‚¬.",
    pros: [
      "Precio extremadamente bajo",
      "Estable para iniciaciÃ³n",
      "Mid-top da soporte tobillo",
      "Disponible en tiendas fÃ­sicas",
    ],
    contras: [
      "Pesada y poco reactiva",
      "Materiales modestos",
      "Sin tecnologÃ­a destacable",
      "No competitiva",
    ],
    veredicto: "Solo para iniciaciÃ³n o jugador muy casual con presupuesto extremo. Subiendo a 80 â‚¬ ya hay mejores opciones.",
    imagen_principal: "https://ballershoesdb.com/wp-content/uploads/TarmakFast900Low1-Cropped-650x406.jpg",
    imagenes: [],
    fuentes: [],
    ultima_actualizacion: "2026-05-13",
    precio_msrp_eur: 45,
    links_compra: [
      { tienda: "decathlon", url: "https://www.decathlon.es/es/search?Ntt=tarmak+voltzy", precio_actual: 44.99, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=tarmak+voltzy+500", precio_actual: 49, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-13" },
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
    resumen: "Signature de Lou Williams con TaiChi adaptive foam. CÃ³moda y muy buena tracciÃ³n, con vibe street-friendly. Precio accesible para signature.",
    pros: [
      "TaiChi adaptive foam cÃ³modo",
      "TracciÃ³n herringbone-coral original",
      "Lockdown sÃ³lido",
      "DiseÃ±o street llamativo",
    ],
    contras: [
      "Respuesta menos que otras Peak",
      "DistribuciÃ³n limitada en Europa",
      "Signature de jugador minor",
    ],
    veredicto: "Para guards que buscan algo distinto y cÃ³modo a buen precio. Cult favorite si la encuentras.",
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
    resumen: "Anta budget con A-SHOCK stabilizer y nitrÃ³geno. Sorprende por la calidad: cushion bouncy, soporte estable y rubber durable. Top option para pies planos y outdoor.",
    pros: [
      "Cushion nitrÃ³geno bouncy",
      "Carbon plate aporta lively launch",
      "Rubber high-performance durable",
      "Excelente para outdoor y pies planos",
    ],
    contras: [
      "Forefoot ajustado para pies anchos",
      "DiseÃ±o noventero polariza",
      "Disponibilidad limitada en Europa",
    ],
    veredicto: "Para jugadores con presupuesto justo que necesitan estabilidad y soporte outdoor. Una sorpresa por 100 â‚¬.",
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
    resumen: "El Jordan mÃ¡s equilibrado de los Ãºltimos aÃ±os. El Flight Plate de fibra de carbono + Air Strobel ofrece una combinaciÃ³n de respuesta y cushion difÃ­cil de igualar. GeneraciÃ³n 2022 ahora a precios muy atractivos.",
    pros: [
      "TracciÃ³n herringbone de primer nivel",
      "Flight Plate da propulsiÃ³n real",
      "Buen court feel para un Jordan moderno",
      "Precio actual muy competitivo",
    ],
    contras: [
      "Indoor only (outsole fina)",
      "No apto para jugadores muy pesados",
      "Tallas se agotan rÃ¡pido en colorways populares",
    ],
    veredicto: "Para escoltas y aleros que quieren un Jordan con rendimiento real sin pagar precio de lanzamiento. Un clÃ¡sico moderno ahora asequible.",
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
    resumen: "Una generaciÃ³n anterior al LeBron 22 pero con el mismo ADN: cushion masivo, soporte para jugadores grandes y protecciÃ³n de rodillas. La opciÃ³n inteligente si buscas el rendimiento LeBron sin pagar precio de estreno.",
    pros: [
      "Cushion Cushlon+Zoom casi igual al 22",
      "~50â‚¬ mÃ¡s barato que la gen actual",
      "Soporte lateral excepcional en high-top",
      "Durabilidad outdoor sÃ³lida",
    ],
    contras: [
      "Muy pesada para juego explosivo",
      "Court feel casi nulo",
      "VentilaciÃ³n mejorable",
    ],
    veredicto: "Si el LeBron 22 se sale de tu presupuesto, el 21 es prÃ¡cticamente el mismo zapato con diferente upper. Para pÃ­vots y alas pesados, el mejor ratio calidad-precio del mercado ahora mismo.",
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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 33. NIKE ZOOM FREAK 4 â€” Cushion para alas/pÃ­vots
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
    resumen: "El cuarto zapato de Giannis combina React y Zoom para ofrecer protecciÃ³n a jugadores corpulentos. Horma ancha, soporte lateral contenido y durabilidad para indoor y outdoor suave.",
    pros: [
      "Horma ancha ideal para pies anchos",
      "React + Zoom da cushion balanceado",
      "Buen soporte para alas/pÃ­vots",
      "Precio actual muy accesible",
    ],
    contras: [
      "Demasiado pesada para bases",
      "Sin carbon plate, sensaciÃ³n algo plana",
      "No es la Freak mÃ¡s responsive",
    ],
    veredicto: "Para alas-pÃ­vot y pÃ­vots con presupuesto ajustado que necesitan amortiguaciÃ³n y soporte sin llegar a los â‚¬180 del LeBron.",
    imagen_principal: "https://ballershoesdb.com/wp-content/uploads/Nike-Zoom-Freak-4-650x406.jpg",
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
    resumen: "La lÃ­nea budget de Giannis. React foam bÃ¡sico sin Zoom, talla ancha, tracciÃ³n adecuada. No pretende ser premium â€” pretende dar una opciÃ³n Nike para jugadores grandes con presupuesto limitado.",
    pros: [
      "Horma ancha para pies anchos",
      "Precio imbatible para Nike",
      "Talla grande disponible",
      "Suficientemente estable para juego interior",
    ],
    contras: [
      "Cushion bÃ¡sico sin zoom ni placa",
      "VentilaciÃ³n muy justa",
      "Sin court feel",
      "No apta para corredores rÃ¡pidos",
    ],
    veredicto: "La opciÃ³n mÃ¡s econÃ³mica para un jugador grande que quiere una Nike fiable. No esperes maravillas, pero no te fallarÃ¡.",
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
    resumen: "Segunda generaciÃ³n de la sorpresa de Puma. Nitrofoam mejorado + placa Pebax que devuelve energÃ­a de forma explosiva. TracciÃ³n PumaGrip revisada, mÃ¡s ligera que la gen anterior. RelaciÃ³n calidad-precio brutal.",
    pros: [
      "Nitrofoam+ mÃ¡s reactivo que la gen 1",
      "Placa Pebax da propulsiÃ³n elite",
      "Ligera (295g) para su nivel de cushion",
      "TracciÃ³n PumaGrip mÃ¡s duradera",
    ],
    contras: [
      "Durabilidad outdoor mejorada pero sigue siendo interior",
      "Soporte lateral podrÃ­a ser mÃ¡s robusto",
      "Poca presencia en tiendas fÃ­sicas espaÃ±olas",
    ],
    veredicto: "Para bases y escoltas explosivos que quieren respuesta elite sin pagar los precios de Nike/Adidas. Segunda iteraciÃ³n que mejora en todo a la gen 1.",
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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 36. PUMA MB.03 â€” Signature LaMelo generaciÃ³n anterior
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
    resumen: "La generaciÃ³n anterior del zapato de LaMelo. Nitrofoam sin placa â€” mÃ¡s suave y menos explosivo que el MB.04 pero muy ligero y confortable para bases y escoltas.",
    pros: [
      "Ligero y Ã¡gil",
      "Nitrofoam da buen cushion para el peso",
      "TracciÃ³n herringbone sÃ³lida",
      "Precio actual accesible",
    ],
    contras: [
      "Sin placa, menos propulsiÃ³n que MB.04",
      "Estabilidad lateral justa para jugadores pesados",
      "Outdoor no recomendado",
    ],
    veredicto: "Si el MB.04 se sale de presupuesto, el MB.03 es una alternativa sÃ³lida. Mismo concepto, algo menos de tecnologÃ­a, 40-50â‚¬ menos.",
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
    resumen: "La Ãºnica zapatilla del mercado con suela Flow (sin rubber). El compound Flow de UA es increÃ­blemente versÃ¡til: agarra como lija en exterior y se comporta perfectamente en pista cubierta. La reina del outdoor.",
    pros: [
      "TracciÃ³n Flow imbatible en cualquier superficie",
      "HOVR foam confortable",
      "Muy ligera para ser tan durable",
      "La mÃ¡s versÃ¡til del mercado indoor/outdoor",
    ],
    contras: [
      "Court feel diferente (inusual al principio)",
      "AmortiguaciÃ³n bÃ¡sica para jugadores pesados",
      "Soporte tobillo justo",
    ],
    veredicto: "Si juegas en exterior o cambias frecuentemente de pista, esta es tu zapatilla. Nada supera al Flow en tracciÃ³n multisuperficie. A 70â‚¬ es una ganga.",
    imagen_principal: "https://cdn.sportshop.com/catalog/product/1500/1500/1/7/172611_1.jpg",
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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // UA FLOW BREAKTHRU 5 â€” La evoluciÃ³n del outdoor
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
    resumen: "La Flow Breakthru 5 mejora sobre la 4 con mÃ¡s soporte lateral y una suela Flow refinada. Sigue siendo la reina del outdoor: agarra en cualquier superficie y se porta bien en pista cubierta. La opciÃ³n UA para quien juega en cualquier cancha.",
    pros: [
      "TracciÃ³n Flow insuperable en exterior",
      "MÃ¡s soporte lateral que la Breakthru 4",
      "VersÃ¡til indoor/outdoor",
      "Buena relaciÃ³n calidad-precio",
    ],
    contras: [
      "Court feel diferente al rubber tradicional",
      "No es la mÃ¡s ligera para un guard",
      "AmortiguaciÃ³n bÃ¡sica para jugadores muy pesados",
    ],
    veredicto: "Si juegas en cemento o cambias de superficie constantemente, la Breakthru 5 es tu mejor opciÃ³n. La mejora de soporte lateral sobre la 4 la hace mÃ¡s completa para aleros y jugadores activos.",
    imagen_principal: "https://ballershoesdb.com/wp-content/uploads/UA-Flow-Breakthru-5-Cropped-650x406.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-19",
    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "ua_es", url: "https://www.underarmour.es/es-es/c/hombre/zapatillas/baloncesto/?q=flow+breakthru+5", precio_actual: 95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=under+armour+flow+breakthru+5+baloncesto", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
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
    resumen: "El debut de Anthony Edwards en Adidas supera todas las expectativas. Lightstrike Pro da una de las mejores sensaciones de cushion responsivo del mercado, y el rubber Continental clava la tracciÃ³n en cualquier pista. Uno de los mejores zapatos para guards de los Ãºltimos aÃ±os.",
    pros: [
      "TracciÃ³n Continental de primer nivel",
      "Lightstrike Pro muy responsivo y ligero",
      "VentilaciÃ³n excelente",
      "Buen lateral containment para low-mid",
    ],
    contras: [
      "Horma algo estrecha en antepiÃ¨ â€” probad talla antes",
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
    resumen: "New Balance consolida su lÃ­nea de baloncesto con el Two WXY v4. FuelCell foam bien balanceado, tracciÃ³n sÃ³lida y un perfil mid cÃ³modo para partidas largas. La opciÃ³n NB para quien no quiere firma de un jugador especÃ­fico.",
    pros: [
      "FuelCell da buena relaciÃ³n cushion/respuesta",
      "TracciÃ³n consistente en pista indoor",
      "CÃ³modo para sesiones largas",
      "Precio accesible",
    ],
    contras: [
      "No destaca en ningÃºn aspecto de forma especial",
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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 40. JORDAN LUKA 2 â€” Signature versÃ¡til de Luka
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
    resumen: "La segunda entrega de Luka ofrece Zoom Air forefoot + Air Strobel para cushion cÃ³modo y responsivo. Pensada para jugadores versÃ¡tiles que necesitan confort en ataque y estabilidad en defensa.",
    pros: [
      "Buena combinaciÃ³n cushion/respuesta",
      "Versatil para distintas posiciones",
      "TracciÃ³n herringbone fiable",
      "Precio actual muy atractivo",
    ],
    contras: [
      "Algo pesada para el nivel de respuesta",
      "Outdoor limitado",
      "Indoor only recomendado",
    ],
    veredicto: "Para el jugador versÃ¡til que quiere un Jordan signature con cushion real a un precio razonable. La Luka 5 es superior pero el Luka 2 sale ahora por 40-50â‚¬ menos.",
    imagen_principal: "https://ballershoesdb.com/wp-content/uploads/JordanLuka2-Cropped-650x406.jpg",
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
    resumen: "La PG 6 es para los guards que valoran el court feel por encima de todo. TracciÃ³n herringbone de primer nivel, Zoom Air para propulsiÃ³n y low-top para mÃ¡xima agilidad. Una de las mejores opciones para bases explosivos a precio de saldo.",
    pros: [
      "TracciÃ³n herringbone sobresaliente",
      "Court feel excelente en low-top",
      "Muy ligera y Ã¡gil",
      "React + Zoom bien balanceados",
    ],
    contras: [
      "Low-top: no recomendada con historial de tobillos",
      "Cushion bÃ¡sico para jugadores pesados",
      "Indoor principalmente",
    ],
    veredicto: "Para bases y escoltas que priorizan velocidad y court feel. Con la PG 6 a 65â‚¬, pocas zapatillas ofrecen mejor tracciÃ³n por ese precio.",
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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 42. NIKE GT JUMP 2 â€” Pensada para pÃ­vots
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
    resumen: "DiseÃ±ada especÃ­ficamente para pÃ­vots y grandes que saltan. Zoom Air pods en talÃ³n y antepiÃ© dan cushion de impacto real, el high-top ofrece soporte mÃ¡ximo de tobillo y la horma ancha da comfort a pies grandes.",
    pros: [
      "Doble Zoom Air para mÃ¡xima absorciÃ³n de impactos",
      "High-top con excelente soporte tobillo",
      "TracciÃ³n herringbone superior",
      "Horma ancha para pies grandes",
    ],
    contras: [
      "Muy pesada, no para guards",
      "Indoor only (suela fina)",
      "Precio todavÃ­a algo alto",
    ],
    veredicto: "El zapato de Nike pensado desde cero para el juego interior. Si eres pÃ­vot, saltas mucho y tienes historial de rodillas o tobillos, la GT Jump 2 ofrece la mejor protecciÃ³n del mercado Nike ahora mismo.",
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
      "El LeBron 23 lleva el cushion a otro nivel con ZoomX + placa de carbono. La combinaciÃ³n entrega 72% de retorno de energÃ­a en antepiÃ© â€” el mayor registrado en un zapato de baloncesto Nike. Para jugadores grandes que quieren la mÃ¡xima protecciÃ³n del mercado en 2025.",
    pros: [
      "AmortiguaciÃ³n lÃ­der absoluta del mercado en 2025",
      "ZoomX devuelve energÃ­a como ningÃºn otro",
      "Soporte tobillo excelente en high-top",
      "Placa de carbono aÃ±ade propulsiÃ³n real",
    ],
    contras: [
      "El mÃ¡s pesado del catÃ¡logo (430g)",
      "Court feel prÃ¡cticamente nulo",
      "Precio premium muy elevado",
      "No apta para juego rÃ¡pido",
    ],
    veredicto:
      "Si eres pÃ­vot, pesas mÃ¡s de 90kg y el presupuesto no es problema, el LeBron 23 es el techo tecnolÃ³gico del mercado. Si buscas velocidad, ni lo mires.",

    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/41003/nike-le-bron-23-lab-test-and-review-23697124-main.jpg",
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
      "El primer zapato de Ja diseÃ±ado completamente desde cero. MÃ¡s ligero y mÃ¡s reactivo que el Ja 2, con tracciÃ³n herringbone brutalmente agresiva y un Zoom Air Strobel que conecta con el suelo de forma directa. El zapato de los guards explosivos de 2025.",
    pros: [
      "TracciÃ³n herringbone entre las mejores del aÃ±o",
      "Extremadamente ligera para su nivel de tech",
      "Zoom Air Strobel muy responsivo",
      "VentilaciÃ³n superior",
    ],
    contras: [
      "Estabilidad lateral justa para jugadores anchos",
      "Cushion bÃ¡sico para >90kg",
      "Reviews mixtas en durabilidad del upper",
      "Indoor principalmente",
    ],
    veredicto:
      "Para bases explosivos que quieren el zapato mÃ¡s reactivo del mercado Nike en 2025. Si el Ja 2 te gustaba, el 3 es una evoluciÃ³n real.",

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
      "El AE 2 mejora al AE 1 en todo lo que importa: mÃ¡s ligero, mejor ajuste en antepiÃ© y Lightstrike Pro actualizado que devuelve mÃ¡s energÃ­a. Sin el 'sophomore slump' tÃ­pico â€” uno de los mejores zapatos para guards del aÃ±o.",
    pros: [
      "MÃ¡s ligero que el AE 1 (305g vs 320g)",
      "TracciÃ³n Continental imbatible",
      "Lightstrike Pro aÃºn mÃ¡s responsivo",
      "VentilaciÃ³n mejorada",
    ],
    contras: [
      "Horma algo estrecha en el antepiÃ© â€” probar talla",
      "Para indoor principalmente",
      "Precio en zona alta",
    ],
    veredicto:
      "El mejor zapato para guards de Adidas en 2025. Si ya te gustÃ³ el AE 1, el 2 es estrictamente mejor. Una de las mejores opciones explosivas del mercado ahora mismo.",

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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 46. PUMA MB.05 â€” Nitrofoam SQD, lÃ­nea LaMelo
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
      "La quinta entrega de LaMelo actualiza el Nitrofoam a la versiÃ³n SQD (mÃ¡s compacta y reactiva) con un upper de mesh engineered inspirado en el nÃºmero 1 de LaMelo. La mÃ¡s ligera y responsiva de la lÃ­nea MB hasta la fecha.",
    pros: [
      "Nitrofoam SQD mÃ¡s reactivo que versiones anteriores",
      "Muy ligera (305g)",
      "Upper engineered transpirable",
      "DiseÃ±o atrevido caracterÃ­stico de LaMelo",
    ],
    contras: [
      "Outdoor no recomendado",
      "Sin placa, algo menos explosiva que la All-Pro Nitro",
      "Soporte tobillo justo",
    ],
    veredicto:
      "Para fans de la lÃ­nea MB o guards que quieren la Ãºltima tecnologÃ­a Nitrofoam Puma. Una evoluciÃ³n sÃ³lida que compite con la Ja 3 y la AE 2 en el segmento guard reactivo.",

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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 47. CONVERSE SHAI 001 â€” Debut SGA, sorpresa del aÃ±o
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
      "Converse volviÃ³ a la Ã©lite del rendimiento con el debut de SGA. La SHAI 001 mezcla un diseÃ±o limpio y minimal con React foam funcional y tracciÃ³n herringbone fiable. La sorpresa mÃ¡s agradable de 2025 â€” demostrÃ³ que Converse puede competir en performance.",
    pros: [
      "DiseÃ±o mÃ¡s limpio y versÃ¡til del aÃ±o",
      "React foam cÃ³modo y ligero",
      "TracciÃ³n herringbone sÃ³lida",
      "VÃ¡lida tanto para jugar como para vestir",
    ],
    contras: [
      "Sin tecnologÃ­a premium (sin Zoom ni placa)",
      "Cushion bÃ¡sico para jugadores pesados",
      "Sin historial de durabilidad largo en Converse performance",
    ],
    veredicto:
      "Para el jugador que quiere un zapato de performance con estilo diferente. La SHAI 001 no bate a la AE 2 o Ja 3 en tech puro, pero ofrece un equilibrio Ãºnico de rendimiento y diseÃ±o limpio.",

    imagen_principal: "https://ballershoesdb.com/wp-content/uploads/converse-shai-001-Cropped-650x406.jpg",
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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 48. NIKE GT CUT 4 â€” TracciÃ³n 10/10, cima guards cortadores
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
      "La GT Cut 4 perfecciona lo que hizo grande a la lÃ­nea: tracciÃ³n 10/10 con herringbone de nueva generaciÃ³n, Zoom Air Strobel aÃºn mÃ¡s reactivo y peso mÃ­nimo. Victor Wembanyama la usÃ³ en la temporada NBA 25-26 con su colorway Gold Panther. La cima del rendimiento para guards cortadores.",
    pros: [
      "TracciÃ³n 10/10 â€” la mejor herringbone del mercado",
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
      "Si la tracciÃ³n y la reactividad son tu prioridad absoluta y no tienes problemas de tobillos, la GT Cut 4 es el techo del mercado en 2025. La mejor de la historia de la lÃ­nea.",

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
      "WearTesters la nombrÃ³ 'mejor zapatilla de baloncesto de 2026 hasta la fecha'. BOOM foam + placa de carbono a 120â‚¬ es una combinaciÃ³n que avergÃ¼enza a muchos modelos que cuestan el doble. La mejor relaciÃ³n rendimiento-precio del mercado en 2026.",
    pros: [
      "BOOM foam + placa carbono a precio accesible",
      "Una de las mÃ¡s ligeras del catÃ¡logo (298g)",
      "TracciÃ³n excepcional",
      "Soporte y estabilidad muy por encima de su precio",
    ],
    contras: [
      "Disponibilidad limitada en EspaÃ±a (aliexpress/amazon import)",
      "Marca menos conocida en Europa",
      "Sin red de servicio tÃ©cnico local",
    ],
    veredicto:
      "La joya escondida de 2026. Si no te importa importarla, la Gamma 2 ofrece el mejor rendimiento por euro del mercado. WearTesters no se equivoca: es el zapato del aÃ±o.",

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
      "La KT 11 estrena upper de tejido woven de alta calidad y mantiene el nitrÃ³geno foam que hizo grande a la lÃ­nea. El jersey nÃºmero 31 de Klay (ahora en Dallas) inspira el diseÃ±o. Una de las mejores opciones para tiradores y escoltas que buscan tracciÃ³n excepcional y un upper premium sin pagar precio Nike.",
    pros: [
      "Upper woven de calidad superior",
      "TracciÃ³n excelente para exterior moderado",
      "Nitrogen foam bien balanceado",
      "Precio muy competitivo para el nivel tech",
    ],
    contras: [
      "Disponibilidad algo limitada en EspaÃ±a",
      "DiseÃ±o polarizante",
      "Cushion justo para jugadores >100kg",
    ],
    veredicto:
      "Para escoltas tiradores al estilo Klay que quieren tracciÃ³n y estilo premium de marca china sin pagar marca occidental. La mejor KT de la historia y una de las mejores opciones del segmento 100-110â‚¬.",

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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 51. REEBOK QUESTION MID â€” El clÃ¡sico de Allen Iverson
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
    resumen: "El zapato mÃ¡s icÃ³nico de la historia del baloncesto de calle. La Question Mid de Allen Iverson combina upper de cuero que envuelve el pie como un guante, tracciÃ³n de goma muy pegajosa y un estilo que nunca pasa de moda. WearTesters la sigue recomendando para jugar 30 aÃ±os despuÃ©s de su debut.",
    pros: [
      "TracciÃ³n de goma extremadamente pegajosa",
      "Upper de cuero durable y envolvente",
      "Icono cultural â€” nadie cuestiona por quÃ© las llevas",
      "Muy buena ventilaciÃ³n para ser de cuero",
      "Soporte lateral sÃ³lido en mid-top",
    ],
    contras: [
      "AmortiguaciÃ³n bÃ¡sica (Hexalite solo en talÃ³n)",
      "Pesada para juego moderno explosivo",
      "Cuero requiere mantenimiento",
      "No apta para jugadores >90 kg que necesitan cushion",
    ],
    veredicto: "Si eres de los que valoran el legado y quieres algo que juega bien Y tiene historia, la Question Mid es Ãºnica. No es la mÃ¡s tÃ©cnica, pero la tracciÃ³n y el soporte siguen siendo sÃ³lidos. Para escoltas y bases que quieren estilo de leyenda.",
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
    resumen: "El zapato con el que Allen Iverson ganÃ³ el MVP de las Finales en 2001 contra los Lakers de Shaq y Kobe. DMX foam mÃ¡s avanzado que la Question, algo mÃ¡s ligera y mejor cushion. WearTesters la califica como jugable hoy en dÃ­a con tracciÃ³n excepcional.",
    pros: [
      "Historia inigualable â€” Finales 2001",
      "DMX foam mejor que Hexalite de la Question",
      "TracciÃ³n muy buena en cuero liso",
      "Algo mÃ¡s ligera que la Question Mid",
      "Marco 3D Ultralite aÃ±ade estabilidad lateral",
    ],
    contras: [
      "Cushion limitado para estÃ¡ndares modernos",
      "Cuero requiere cuidado",
      "Disponibilidad por colorway limitada",
      "No recomendada para jugadores pesados",
    ],
    veredicto: "Para el coleccionista que quiere jugar con historia en los pies. La Answer IV es el mejor zapato de rendimiento retro de Reebok â€” tÃ©cnicamente superior a la Question y con la historia de las Finales. A ~100â‚¬ en rebajas, una ganga cultural.",
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
    resumen: "El regreso de Reebok a las zapatillas de rendimiento real. La Engine A estrena el sistema ERS con nitrogen-infused SuperFloat foam en talÃ³n y antepiÃ©, herringbone multidireccional durable para outdoor, y un upper sintÃ©tico moldeado ultraligero. Debut de Angel Reese. La mejor zapatilla de performance de Reebok en 15 aÃ±os.",
    pros: [
      "ERS + SuperFloat foam muy cÃ³modo y responsivo",
      "Herringbone con goma gruesa vÃ¡lida para outdoor",
      "Upper moldeado ligero y transpirable",
      "Reebok vuelve con algo que merece atenciÃ³n",
      "Precio accesible para el nivel tech",
    ],
    contras: [
      "Sin historial largo de durabilidad (zapato nuevo)",
      "Disponibilidad puede ser limitada en EspaÃ±a",
      "No tan explosiva como la AE 2 o GT Cut 4",
    ],
    veredicto: "Para el jugador que quiere algo diferente y equilibrado. La Engine A no lidera en ninguna categorÃ­a concreta pero es sÃ³lida en todo â€” y el rubber grueso la hace viable para exterior. Un regreso de Reebok que merece ser tomado en serio.",
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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 54. UA CURRY 13 â€” Signature premium, generaciÃ³n actual
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
      "La Curry 13 evoluciona la icÃ³nica lÃ­nea Flow con el nuevo Warp 3.0 upper y mejoras en el soporte lateral. Mantiene el ADN de la lÃ­nea: ultraligera, con court feel directo y respuesta mÃ¡xima para tiradores. Disponible actualmente en Under Armour EspaÃ±a.",
    pros: [
      "ContinuaciÃ³n refinada de la fÃ³rmula Flow â€” ligera y reactiva",
      "Warp 3.0 upper con mejor soporte lateral que la Curry 12",
      "Peso mÃ­nimo (~308g) para su nivel de protecciÃ³n",
      "Disponible en EspaÃ±a a 140â‚¬",
    ],
    contras: [
      "Suela Flow poco durable en asfalto",
      "Cushion insuficiente para jugadores pesados o lesiones de tobillo",
      "Horma estrecha en antepiÃ© â€” probar antes de comprar",
    ],
    veredicto:
      "La mejor opciÃ³n actual de UA para bases y escolteros que buscan respuesta mÃ¡xima en pista cubierta. Si ya te gustÃ³ la Curry 12, la 13 es una mejora directa. Para asfalto o pesos > 90kg, busca otra cosa.",

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
      "La opciÃ³n mÃ¡s asequible de UA para baloncesto. EVA foam bÃ¡sico pero funcional, herringbone con buena tracciÃ³n en pista y exterior. No compite con zapatillas premium en amortiguaciÃ³n o respuesta, pero cumple para uso casual y recreativo a un precio difÃ­cil de batir.",
    pros: [
      "Precio muy accesible (75â‚¬ aprox.)",
      "Herringbone durable para outdoor e indoor",
      "Upper mesh transpirable",
      "Buen choice para principiantes o uso esporÃ¡dico",
    ],
    contras: [
      "EVA bÃ¡sico â€” menos cushion y respuesta que modelos premium",
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
      "La Spawn 7 Mid de UA ofrece un buen equilibrio entre soporte y amortiguaciÃ³n. HOVR foam en mediasuela proporciona energÃ­a devuelta sin sacrificar cushion. Upper mid con buen soporte lateral para jugadores fÃ­sicos. Una opciÃ³n sÃ³lida de gama media disponible en UA EspaÃ±a.",
    pros: [
      "HOVR foam con buena amortiguaciÃ³n y respuesta",
      "Perfil mid con soporte lateral adecuado",
      "Herringbone durable para indoor y outdoor",
      "Precio justo en gama media (120â‚¬)",
    ],
    contras: [
      "Peso algo elevado para su nivel",
      "Menos reactiva que la Curry 13",
      "No top-tier en ninguna categorÃ­a",
    ],
    veredicto:
      "Para jugadores fÃ­sicos de posiciÃ³n interior o aleros que necesitan soporte sin pagar precio premium. La Spawn 7 Mid cumple bien en pista cubierta y aguanta el exterior. Buena opciÃ³n de gama media dentro del catÃ¡logo UA.",

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
      "La FUTR X 4 es la zapatilla mÃ¡s equilibrada del catÃ¡logo UA: HOVR foam con buena energÃ­a devuelta, outsole reactiva similar al Flow en rendimiento, knit upper transpirable y soporte lateral sÃ³lido. Disponible en UA EspaÃ±a a 120â‚¬.",
    pros: [
      "Excelente equilibrio cushion-respuesta con HOVR",
      "Knit upper cÃ³modo y transpirable",
      "Soporte lateral bueno para cambios de direcciÃ³n",
      "Versatilidad para distintos estilos de juego",
    ],
    contras: [
      "Outsole menos durable en exterior que herringbone clÃ¡sico",
      "No tan ligera como la Curry 13",
      "Relativa novedad â€” sin historial de durabilidad largo",
    ],
    veredicto:
      "La mejor opciÃ³n de UA para jugadores que quieren algo equilibrado sin decidirse entre la Curry (ultra-reactiva, poca protecciÃ³n) y la Spawn (mÃ¡s fÃ­sica). La FUTR X 4 funciona bien en todas las posiciones.",

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
      "La versiÃ³n asequible de la lÃ­nea Curry. EVA foam bÃ¡sico pero funcional, herringbone resistente para outdoor, y el respaldo del nombre Curry. Ideal para jugadores que quieren el look Curry sin el precio premium. Disponible en UA EspaÃ±a a 85â‚¬.",
    pros: [
      "Precio muy asequible (85â‚¬) con el nombre Curry",
      "Herringbone durable para outdoor e indoor",
      "Buena opciÃ³n para principiantes o uso recreativo",
      "Ligera para su precio",
    ],
    contras: [
      "Muy inferior a la Curry 12/13 en cushion y respuesta",
      "EVA bÃ¡sico â€” no hay UA Flow ni HOVR",
      "No tiene las tecnologÃ­as premium de la lÃ­nea Curry",
    ],
    veredicto:
      "Si quieres el sello Curry sin gastar 140â‚¬+, la Curry 3Z 25 es la respuesta. No es una zapatilla tÃ©cnicamente avanzada, pero cumple para uso recreativo o pistas exteriores. Para juego serio, invierte en la Curry 13.",

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
      "La Nike Luka 77 es la primera zapatilla de Luka DonÄiÄ‡ bajo Nike Brand (no Jordan Brand), el nÃºmero 77 hace referencia a su dorsal en Eslovenia. React + Zoom Air en el talÃ³n, upper knit y outsole herringbone. Gama media con acabado premium y estÃ©tica minimalista.",
    pros: [
      "CombinaciÃ³n React + Zoom Air ofrece buen cushion y algo de respuesta",
      "Knit upper cÃ³modo y transpirable desde el primer uso",
      "EstÃ©tica limpia, fÃ¡cil de combinar",
      "Precio competitivo para zapatilla signature",
    ],
    contras: [
      "Menos soporte lateral que la Jordan Luka series",
      "Outsole no tan durable en exterior como herringbone clÃ¡sico",
      "Primera generaciÃ³n â€” sin historial de durabilidad",
    ],
    veredicto:
      "Para fans de Luka o jugadores de gama media que quieren un calzado equilibrado a buen precio. No alcanza el nivel tÃ©cnico de la GT Cut 4 ni el cushion de la LeBron 23, pero a 99.99â‚¬ es una opciÃ³n sÃ³lida.",

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
      "La Nike Book 2 es la segunda zapatilla signature de Devin Booker. Mejora significativa sobre la Book 1: Zoom Air en el antepiÃ© para respuesta en arranques, midsole React para cushion durante el juego, upper mesh ligero. DiseÃ±ada para jugadores rÃ¡pidos y tiradores.",
    pros: [
      "Zoom Air en antepiÃ©: respuesta excelente en cambios de direcciÃ³n",
      "Ligera y cÃ³moda desde el primer uso",
      "Buen agarre con outsole multidireccional",
      "Upper mesh transpirable",
    ],
    contras: [
      "Menor amortiguaciÃ³n que zapatillas de gama alta con Zoom Air strobel",
      "Soporte de tobillo bÃ¡sico en diseÃ±o low",
      "Precio de 150â‚¬ exige comparar con opciones similares",
    ],
    veredicto:
      "Una de las mejores opciones para bases y escoltas explosivos que priorizan velocidad y comodidad. La combinaciÃ³n React + Zoom Air en antepiÃ© la hace destacar en su rango de precio.",

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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 61. Nike Kobe 9 Low Protro â€” Retro icÃ³nico, bajo y preciso
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
      "La Kobe 9 Low Protro es la versiÃ³n moderna del clÃ¡sico de 2014, una de las mejores zapatillas de Kobe. Flyknit upper ultraligero, Zoom Air en antepiÃ©, outsole herringbone de alto rendimiento. Ligera y precisa como pocas. Ideal para quienes buscan rendimiento puro y estÃ©tica icÃ³nica.",
    pros: [
      "Flyknit upper extremadamente ligero y preciso",
      "Outsole herringbone: agarre excepcional multidireccional",
      "Zoom Air en antepiÃ©: respuesta tÃ¡ctil directa",
      "DiseÃ±o icÃ³nico atemporal",
    ],
    contras: [
      "AmortiguaciÃ³n mÃ­nima â€” no apta para jugadores pesados o exteriores",
      "Horma ajustada: puede requerir media talla mÃ¡s",
      "Precio elevado para un retro (180â‚¬)",
      "Sin soporte de tobillo en diseÃ±o low",
    ],
    veredicto:
      "Para jugadores que valoran la precisiÃ³n y el feeling con la pista sobre el cushion. El Flyknit + herringbone hacen de la Kobe 9 Low Protro una de las zapatillas de baloncesto mÃ¡s tÃ©cnicamente puras disponibles hoy. No para principiantes ni jugadores de exterior.",

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
      "La Nike Sabrina 3 es la evoluciÃ³n mÃ¡s completa de la lÃ­nea Ionescu. Zoom Air strobel full-length para cushion reactivo en todo el pie, React foam para amortiguaciÃ³n duradera, outsole con excelente agarre. Una de las zapatillas mÃ¡s versÃ¡tiles de Nike para baloncesto en 2025.",
    pros: [
      "Zoom Air strobel full-length: cushion reactivo en todo el pie",
      "Outsole con patrÃ³n de herringbone modificado â€” agarre excelente",
      "Estabilidad lateral buena para un low-top",
      "Precio justo para las tecnologÃ­as incluidas",
    ],
    contras: [
      "EstÃ©tica mÃ¡s orientada al juego femenino â€” no a todos gusta",
      "Cushion muy blando puede resultar impreciso para algunos",
      "Sin versiÃ³n mid para quienes prefieren soporte de tobillo",
    ],
    veredicto:
      "Una zapatilla seria que no debe descartarse por ser femenina en origen. El Zoom Air strobel + React la convierten en una de las opciones mÃ¡s completas de Nike bajo los 130â‚¬. Recomendada para jugadores Ã¡giles de cualquier gÃ©nero.",

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
      "La Jordan Tatum 4 es la zapatilla signature mÃ¡s madura de Jayson Tatum. Zoom Air strobel para cushion reactivo en todo el pie, React foam para durabilidad, knit upper preciso. La combinaciÃ³n perfecta para aleros que necesitan un calzado versÃ¡til sin renunciar al cushion.",
    pros: [
      "Zoom Air strobel full-length â€” cushion reactivo en todo el pie",
      "Knit upper: sujeciÃ³n precisa sin puntos de presiÃ³n",
      "Buen soporte lateral para un low-top",
      "Precio competitivo para su nivel tecnolÃ³gico",
    ],
    contras: [
      "Sin versiÃ³n mid â€” solo disponible como low-top",
      "Peso algo superior a otras opciones speed de Nike",
      "Outsole puede desgastarse rÃ¡pido en exterior",
    ],
    veredicto:
      "Para aleros y escoltas que quieren un calzado con cushion serio sin el precio de la LeBron o la Kobe Protro. La Tatum 4 es una compra inteligente a 90.99â‚¬ â€” probablemente la mejor relaciÃ³n calidad-precio de la lÃ­nea Jordan signature en 2025.",

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
      "La Nike Zoom Freak 7 estÃ¡ diseÃ±ada para jugadores de fÃ­sico potente, como el propio Giannis. Zoom Air pods estratÃ©gicamente situados, construcciÃ³n mid-top para soporte de tobillo, horma ancha para pies grandes o anchos. La opciÃ³n Nike para interiores y aleros fÃ­sicos.",
    pros: [
      "Soporte lateral excepcional para interiores",
      "Zoom Air pods dan respuesta en momentos clave",
      "Horma ancha â€” ideal para pies anchos o grandes",
      "Outsole durable, apto para exterior ocasional",
    ],
    contras: [
      "Pesada â€” no apta para jugadores que priorizan velocidad",
      "AmortiguaciÃ³n no tan plush como la LeBron 23",
      "Precio elevado para zapatilla de posiciÃ³n interior",
    ],
    veredicto:
      "La mejor opciÃ³n Nike para pivots y aleros fÃ­sicos que necesitan una zapatilla robusta. Si juegas como Giannis â€” potencia, cambios de direcciÃ³n bruscos, juego en la pintura â€” la Freak 7 es la elecciÃ³n correcta.",

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
      "La Giannis Immortality 5 es la lÃ­nea de entrada al ecosistema de calzado de Giannis. Sin tecnologÃ­a Zoom Air, pero con foam decente, outsole de buen agarre y upper mesh transpirable. Perfecta para jugadores recreativos, principiantes o quienes tienen presupuesto ajustado.",
    pros: [
      "Precio excelente para una zapatilla con licencia NBA",
      "Outsole con buen agarre en pista cubierta",
      "Ligera para el precio",
      "Upper mesh transpirable",
    ],
    contras: [
      "Sin Zoom Air â€” cushion bÃ¡sico",
      "No apta para juego intensivo o jugadores pesados",
      "Soporte lateral mÃ­nimo",
    ],
    veredicto:
      "La mejor opciÃ³n bajo 90â‚¬ con respaldo de una marca premium. Para juego recreativo, entrenos o como segunda zapatilla, la Immortality 5 es una opciÃ³n sÃ³lida y asequible. Para juego competitivo, invierte en la Freak 7 o la Tatum 4.",

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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 66. Nike GT Cut Academy 2 â€” Gama media del GT Cut, versÃ¡til
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
      "La GT Cut Academy 2 lleva el outsole herringbone multidireccional de la GT Cut 4 a un precio mÃ¡s accesible. Sin Zoom Air, pero con agarre excepcional gracias al patrÃ³n de outsole del GT Cut. Ideal para jugadores que priorizan el agarre y la agilidad sin pagar precio premium.",
    pros: [
      "Outsole inspirado en el GT Cut 4: agarre multidireccional sobresaliente",
      "Precio muy competitivo (100â‚¬)",
      "Perfil bajo y ligero para jugadores de velocidad",
      "Buena durabilidad para el precio",
    ],
    contras: [
      "Sin Zoom Air â€” cushion bÃ¡sico comparado con el GT Cut 4",
      "Upper sintÃ©tico menos transpirable que mesh",
      "No tan reactiva como la versiÃ³n premium",
    ],
    veredicto:
      "Si quieres el agarre del GT Cut 4 sin el gasto, la GT Cut Academy 2 es la respuesta. Perfecta para jugadores de velocidad con presupuesto ajustado o para uso en entrenos intensivos. La relaciÃ³n calidad-precio es excepcional a 99.99â‚¬.",

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
      "La Puma Stewie 4 es la zapatilla signature de Breanna Stewart (MVP WNBA), ahora disponible para todos. Nitrofoam para cushion consistente, outsole herringbone para tracciÃ³n en pista cubierta, y diseÃ±o mid-top para soporte de tobillo. Una opciÃ³n mid-range sÃ³lida para jugadores fÃ­sicos.",
    pros: [
      "Nitrofoam: cushion reactivo y duradero",
      "Outsole herringbone con buen agarre en pista cubierta",
      "Mid-top: soporte de tobillo decente",
      "Precio competitivo a 120â‚¬ para zapatilla con Nitrofoam",
    ],
    contras: [
      "No tan ligera como las opciones speed",
      "Upper sintÃ©tico menos transpirable que mesh",
      "EstÃ©tica predominantemente femenina en algunos colorways",
    ],
    veredicto:
      "Una opciÃ³n sÃ³lida y a menudo ignorada en el catÃ¡logo Puma. Si juegas en posiciones de interior y buscas Nitrofoam a un precio razonable, la Stewie 4 compite de tÃº a tÃº con la Freak 7 y la Curry 13. Merece mÃ¡s atenciÃ³n de la que recibe.",

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
      "La Jordan Zion 4 estÃ¡ diseÃ±ada para jugadores corpulentos que necesitan mÃ¡xima protecciÃ³n y estabilidad. Con React foam de alta densidad y una base reforzada, ofrece el cushion que necesita un jugador fÃ­sico. La horma ancha es ideal para pies anchos. Precio muy competitivo en rebajas.",
    pros: [
      "React foam de alta densidad: mÃ¡ximo cushion para interiores pesados",
      "Base ultra estable para jugadores de mÃ¡s de 90 kg",
      "Horma ancha: ideal para pies anchos o juego fÃ­sico",
      "Excelente tracciÃ³n herringbone",
      "Precio rebajado (~85â‚¬) â€” una de las mejores opciones para pivots",
    ],
    contras: [
      "Muy pesada (~425g) â€” no apta para jugadores de velocidad",
      "Respuesta limitada comparada con opciones mÃ¡s reactivas",
      "VentilaciÃ³n justa para partidos largos",
      "EstÃ©tica polarizadora",
    ],
    veredicto:
      "Si juegas de pivot o ala-pivot y pesas mÃ¡s de 90 kg, la Zion 4 es una de las mejores protecciones para rodillas y tobillos del mercado por ~85â‚¬. No es para correr, es para dominar la pintura. Horma ancha, React foam sÃ³lido y precio rebajado: difÃ­cil de superar para su perfil.",

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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 69. Adidas AE 3 â€” Anthony Edwards tercera ediciÃ³n, respuesta y agarre
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
      "La Adidas AE 3 es la tercera zapatilla signature de Anthony Edwards y su mejor obra hasta ahora. Lightstrike Pro mejorado, outsole herringbone renovado con excelente tracciÃ³n, y un upper ligero de mesh. Si buscas velocidad y primer paso explosivo en el rango de 130â‚¬, la AE 3 es una de las mejores opciones del mercado.",
    pros: [
      "Lightstrike Pro: respuesta entre las mejores de 2025",
      "Outsole herringbone con tracciÃ³n top en pistas cubiertas",
      "Upper mesh ligero y bien ventilado",
      "RelaciÃ³n calidad-precio excepcional a 130â‚¬",
      "Perfil bajo para movilidad mÃ¡xima en guards",
    ],
    contras: [
      "No la ideal para jugadores de mÃ¡s de 95-100 kg",
      "Low-top: no recomendada si tienes historial de esguinces",
      "Durabilidad outdoor moderada",
    ],
    veredicto:
      "La AE 3 es la evoluciÃ³n mÃ¡s lograda de la lÃ­nea Anthony Edwards: mÃ¡s agarre, mÃ¡s respuesta y mejor fit que las versiones anteriores. A 130â‚¬ compite directamente con la Nike Ja 3 y la GT Cut 4. Si eres guard o escolta y priorizas la reactividad, es una de las compras mÃ¡s inteligentes del aÃ±o.",

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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 70. Jordan Luka 4 â€” Luka Doncic 4Âª, versatilidad para guards/aleros
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
      "La Jordan Luka 4 continÃºa la tradiciÃ³n de la lÃ­nea Doncic: Zoom Air para cushion reactivo, upper de knit para comodidad, y soporte lateral mid-top. Perfecta para guards y aleros que buscan un equilibrio entre amortiguaciÃ³n y respuesta. A 80â‚¬ en rebajas es una autÃ©ntica ganga.",
    pros: [
      "Zoom Air: cushion reactivo y responsive",
      "Upper knit: comodidad y ajuste natural al pie",
      "Mid-top: soporte de tobillo superior a low-tops",
      "Perfil equilibrado: serve para mÃºltiples posiciones",
      "Precio rebajado (~80â‚¬) â€” excelente relaciÃ³n calidad-precio",
    ],
    contras: [
      "Algo mÃ¡s pesada que las opciones speed",
      "Upper knit puede desgastarse mÃ¡s rÃ¡pido en uso outdoor",
      "Respuesta no tan alta como Ja 3 o AE 3",
    ],
    veredicto:
      "Si buscas una zapatilla mid-top bien equilibrada para guards y aleros con Zoom Air a 80â‚¬, la Luka 4 es difÃ­cil de superar en su rango de precio. La lÃ­nea Doncic siempre ha ofrecido buen valor, y la 4Âª ediciÃ³n no es excepciÃ³n. Ideal para el jugador que busca confort y soporte sin sacrificar respuesta.",

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
      "La Nike Book 1 es la primera zapatilla signature de Devin Booker, diseÃ±ada para el jugador de perÃ­metro que necesita respuesta, agarre y ligereza. Zoom Air en el antepiÃ©, outsole herringbone y upper knit que abraza el pie. Actualmente disponible a 60â‚¬ â€” una oportunidad increÃ­ble para su nivel de rendimiento.",
    pros: [
      "Zoom Air en el antepiÃ©: respuesta notable para tiradores",
      "Outsole herringbone con excelente agarre en pista cubierta",
      "Upper knit cÃ³modo y bien ventilado",
      "Muy ligera para ser una low-top con Zoom",
      "Precio rebajado a 60â‚¬ â€” mejor valor del catÃ¡logo Nike actualmente",
    ],
    contras: [
      "Low-top: sin soporte de tobillo superior",
      "No ideal para jugadores fÃ­sicos de mÃ¡s de 90 kg",
      "AmortiguaciÃ³n moderada (no es la prioridad en este modelo)",
    ],
    veredicto:
      "A 60â‚¬ la Book 1 es probablemente la mejor compra del catÃ¡logo Nike ahora mismo para guards y escoltas. Zoom Air, tracciÃ³n herringbone y comodidad de knit â€” todo lo que necesita un jugador de perÃ­metro, a un precio que no tiene rival. El hecho de que sea la primera ediciÃ³n de Booker le da un punto de coleccionismo extra.",

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

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 72. Adidas Harden Vol 10 â€” James Harden, protecciÃ³n mÃ¡xima para guards pesados
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
      "La Adidas Harden Vol 10 es la dÃ©cima iteraciÃ³n de la lÃ­nea de James Harden, con Lightstrike Pro mejorado y un outsole herringbone que ofrece tracciÃ³n sÃ³lida. Mid-top para soporte de tobillo. DiseÃ±ada para el guard de fÃ­sico que necesita cushion y soporte sin perder respuesta. A 160â‚¬ compite en el segmento premium.",
    pros: [
      "Lightstrike Pro: una de las mejores mezclas cushion-respuesta del mercado",
      "Mid-top con soporte lateral elevado",
      "Outsole herringbone con buena tracciÃ³n",
      "DiseÃ±o equilibrado para el guard de fÃ­sico",
    ],
    contras: [
      "Precio premium (160â‚¬) para un modelo mid-range en prestaciones",
      "Algo mÃ¡s pesada que la competencia directa",
      "EstÃ©tica que puede no gustar a todos",
    ],
    veredicto:
      "La Harden 10 es la zapatilla definitiva para el guard que pesa entre 85-105 kg y busca Lightstrike Pro con soporte mid-top. Compite con la Luka 5 y la Curry 13 en el mismo rango. Si valoras el equilibrio entre cushion, respuesta y soporte lateral, la Harden 10 es una elecciÃ³n sÃ³lida a 160â‚¬.",

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
    resumen: "La penÃºltima signature de Kevin Durant combina Zoom Air con un upper de knit muy cÃ³modo. Muy equilibrada en todos los parÃ¡metros, perfecta para aleros versÃ¡tiles.",
    pros: ["Muy equilibrada en todas las mÃ©tricas", "Ligera para su cushion", "CÃ³moda desde el primer dÃ­a"],
    contras: ["Durabilidad outdoor limitada", "TracciÃ³n puede perder agarre con polvo"],
    veredicto: "Una de las zapatillas mÃ¡s equilibradas del mercado. Ideal para aleros que quieren un poco de todo sin sacrificar nada.",
    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/40378/nike-kd-17-main-21793804-main.jpg",
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
    resumen: "Sexta entrega de la lÃ­nea signature de Donovan Mitchell. Destaca por su tracciÃ³n herringbone excepcional y su precio asequible para ser una firma de jugador NBA.",
    pros: ["TracciÃ³n de primer nivel", "Buena durabilidad outdoor", "Precio competitivo para signature"],
    contras: ["Algo pesada", "Cushion solo correcto, no destacado"],
    veredicto: "Para jugadores que priorizan el agarre y juegan tanto interior como exterior. Una de las mejores relaciones calidad-precio en signatures.",
    imagen_principal: "/placeholder-shoe.svg",
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
    resumen: "Primera signature de Scoot Henderson, uno de los bases mÃ¡s explosivos de la NBA. Ultra ligera con NITRO foam de Puma que ofrece excelente respuesta sin sacrificar cushion.",
    pros: ["Extremadamente ligera", "Muy buena ventilaciÃ³n", "Respuesta excelente para bases explosivos"],
    contras: ["Poco soporte lateral para jugadores grandes", "Durabilidad outdoor mejorable"],
    veredicto: "La elecciÃ³n perfecta para bases ligeros que buscan velocidad y respuesta. No apta para jugadores potentes.",
    imagen_principal: "/placeholder-shoe.svg",
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
    resumen: "SÃ©ptima entrega de la lÃ­nea de Paul George. TracciÃ³n multidireccional excepcional con Zoom Air. Buena relaciÃ³n calidad-precio para escoltas y aleros.",
    pros: ["TracciÃ³n de Ã©lite", "Buena durabilidad outdoor", "Precio razonable para signature"],
    contras: ["Cushion solo correcto", "No destaca en ningÃºn parÃ¡metro individual"],
    veredicto: "SÃ³lida y fiable. Para escoltas y aleros que necesitan agarre constante sin gastarse una fortuna.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/nike-pg-7-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=pg+7&vst=pg+7", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=nike+pg+7", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 78. ADIDAS DAME 8 â€” Damian Lillard, cushion responsive
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
    resumen: "La Dame 8 con Lightstrike Pro es una de las zapatillas mÃ¡s rÃ¡pidas de Adidas. Ligera, reactiva y con buena tracciÃ³n herringbone.",
    pros: ["Muy ligera", "Respuesta excelente", "Buena ventilaciÃ³n"],
    contras: ["Cushion modesto para jugadores pesados", "Soporte lateral bÃ¡sico"],
    veredicto: "Perfecta para bases tiradores que quieren velocidad y reactividad a buen precio.",
    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/37981/adidas-dame-8-21166019-main.jpg",
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
    resumen: "DiseÃ±ada para la potencia de Giannis. Base ultra ancha, soporte lateral masivo y tracciÃ³n de Ã©lite. Para jugadores grandes que dominan la pintura.",
    pros: ["Soporte lateral excepcional", "TracciÃ³n de primer nivel", "Estabilidad mÃ¡xima para jugadores pesados"],
    contras: ["Muy pesada", "Poco court feel", "No apta para juego explosivo"],
    veredicto: "La mejor opciÃ³n para pÃ­vots y ala-pÃ­vots potentes que necesitan estabilidad mÃ¡xima.",
    imagen_principal: "https://ballershoesdb.com/wp-content/uploads/Nike-Zoom-Freak-5-650x406.jpg",
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
    resumen: "Zapatilla de gama media de Adidas muy equilibrada. Ligera, transpirable y con buena tracciÃ³n herringbone. Una de las mejores opciones budget de la marca.",
    pros: ["Buen precio", "Muy transpirable", "TracciÃ³n sÃ³lida"],
    contras: ["Cushion bÃ¡sico", "No destaca en nada en concreto"],
    veredicto: "Buena opciÃ³n para jugadores con presupuesto ajustado que buscan una zapatilla equilibrada y transpirable.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 80,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=exhibit+a", precio_actual: 65, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+exhibit+a+baloncesto", precio_actual: 60, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
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
    resumen: "VersiÃ³n mejorada del Exhibit A con Lightstrike Pro. MÃ¡s reactiva y ligera que su predecesora, manteniendo el buen precio.",
    pros: ["Mejor cushion que la Exhibit A", "Ligera y transpirable", "Precio muy competitivo"],
    contras: ["Cushion todavÃ­a modesto", "Soporte lateral bÃ¡sico"],
    veredicto: "El upgrade perfecto del Exhibit A. MÃ¡s cushion y reactividad por poco mÃ¡s de precio.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 95,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=exhibit+b", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+exhibit+b+baloncesto", precio_actual: 75, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 82. NIKE KYRIE INFINITY 2 â€” budget tracciÃ³n alta
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "nike-kyrie-infinity-2",
    slug: "nike-kyrie-infinity-2",
    marca: "Nike",
    modelo: "Kyrie Infinity 2",
    generacion: 2,
    año_lanzamiento: 2023,
    genero: "unisex",
    tecnologia_clave: ["Zoom Air", "360Â° traction"],
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
    resumen: "Sin la firma oficial de Kyrie Irving, Nike relanza el modelo Infinity 2 con la misma tracciÃ³n 360Â° que hizo famosa la lÃ­nea. Gran opciÃ³n budget para bases.",
    pros: ["TracciÃ³n 360Â° excepcional", "Buena respuesta", "Precio accesible"],
    contras: ["Estabilidad algo baja en comparaciÃ³n con otras Kyrie", "Cushion bÃ¡sico"],
    veredicto: "Para bases que necesitan cambios de direcciÃ³n rÃ¡pidos y agarre constante a buen precio.",
    imagen_principal: "/placeholder-shoe.svg",
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
    resumen: "La lÃ­nea Air Jordan en su 38Âª ediciÃ³n ofrece Zoom Air Strobel completo para un cushion premium. Ideal para aleros y ala-pÃ­vots que buscan protecciÃ³n y estilo.",
    pros: ["Cushion premium", "Muy buena estabilidad", "IcÃ³nico diseÃ±o Jordan"],
    contras: ["Algo pesada", "Durabilidad outdoor limitada", "Precio alto"],
    veredicto: "Para el jugador que quiere el look y el rendimiento Jordan en una posiciÃ³n versÃ¡til. Premium en todo.",
    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/40183/air-jordan-xxxviii-lab-test-and-review-21611711-main.jpg",
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
  // 84. UA JET 23 â€” budget UA, tracciÃ³n sÃ³lida
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
    resumen: "La lÃ­nea budget de Under Armour con buena durabilidad outdoor. UA Micro G ofrece cushion suficiente para el precio. Ideal para jugadores que buscan una zapatilla fiable sin gastar mucho.",
    pros: ["Excelente precio", "Buena durabilidad outdoor", "TracciÃ³n sÃ³lida"],
    contras: ["Cushion bÃ¡sico", "No destaca en respuesta", "Algo pesada"],
    veredicto: "La opciÃ³n mÃ¡s asequible y fiable de UA. Para jugadores con presupuesto ajustado que juegan en pistas mixtas.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 75,
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=under+armour+jet+23+baloncesto", precio_actual: 65, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
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
    resumen: "Segunda generaciÃ³n del All-Pro NITRO con el foam NITRO Elite mejorado. Cushion de Ã©lite para jugadores grandes. Compite directamente con la LeBron 22 en protecciÃ³n.",
    pros: ["Cushion NITRO Elite excepcional", "Soporte tobillo en high-top", "Estabilidad top para pÃ­vots"],
    contras: ["Pesada", "Precio alto", "No apta para juego rÃ¡pido"],
    veredicto: "La mejor alternativa Puma para pÃ­vots y ala-pÃ­vots que quieren protecciÃ³n mÃ¡xima. Compite con LeBron 22 en cushion.",
    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/40915/puma-all-pro-nitro-2-lab-test-and-review-23998576-main.jpg",
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
  // 86. NIKE AIR MAX IMPACT 5 â€” presupuesto, interior bÃ¡sico
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
    resumen: "La opciÃ³n mÃ¡s accesible de Nike con Air Max. Sin ser revolucionaria, ofrece cushion decente y estabilidad para jugadores de interior con presupuesto ajustado.",
    pros: ["Precio muy asequible", "Cushion Air Max suficiente", "Estabilidad correcta para su precio"],
    contras: ["Pesada", "Court feel nulo", "No apta para juego explosivo"],
    veredicto: "Para el jugador de interior que quiere cushion Nike sin gastar mÃ¡s de 80â‚¬. Simple y funcional.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 80,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=air+max+impact+5&vst=air+max+impact+5", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+air+max+impact+5", precio_actual: 72, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
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
    resumen: "Una de las mejores zapatillas de tracciÃ³n por precio del mercado. La Sonic 12 de Li-Ning con carbon plate y CLOUD III foam compite con marcas que doblan su precio.",
    pros: ["TracciÃ³n excelente", "RelaciÃ³n calidad-precio imbatible", "Ligera para su rendimiento"],
    contras: ["Durabilidad outdoor limitada", "DifÃ­cil de encontrar en tiendas fÃ­sicas espaÃ±olas"],
    veredicto: "La alternativa de presupuesto medio mÃ¡s sorprendente. Si no te importa comprar online, bate a zapatillas el doble de caras en tracciÃ³n.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 100,
    links_compra: [
      { tienda: "aliexpress", url: "https://www.aliexpress.com/wholesale?SearchText=li+ning+sonic+12", precio_actual: 85, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "kickscrew", url: "https://www.kickscrew.com/search?q=li+ning+sonic+12", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 88. NIKE GIANNIS IMMORTALITY 4 â€” budget Giannis, tracciÃ³n
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
    resumen: "La lÃ­nea budget de Giannis en su cuarta iteraciÃ³n. Misma base de horma ancha y buena tracciÃ³n que la Freak, a precio mucho mÃ¡s asequible.",
    pros: ["Excelente precio para una signature", "Buena durabilidad outdoor", "Horma ancha cÃ³moda"],
    contras: ["Muy pesada", "Cushion bÃ¡sico", "Sin tecnologÃ­a premium"],
    veredicto: "La opciÃ³n mÃ¡s asequible para jugadores de interior con pie ancho. La Freak budget que funciona.",
    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/40500/nike-giannis-immortality-4-22136845-main.jpg",
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
    resumen: "Nike GT Run 2 equilibra cushion y respuesta con una combinaciÃ³n de Zoom Air y React foam. Para jugadores que corren mucho y necesitan protecciÃ³n sin perder agilidad.",
    pros: ["Buen cushion para el precio", "Muy transpirable", "Respuesta agradable"],
    contras: ["TracciÃ³n mejorable en superficies polvorientas", "Durabilidad outdoor justa"],
    veredicto: "Para el escolta tirador que hace mucho trabajo fuera del balÃ³n y necesita cushion y transpirabilidad.",
    imagen_principal: "/placeholder-shoe.svg",
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
    resumen: "DÃ©cima entrega de la clÃ¡sica lÃ­nea Jordan Super/Fly. VersÃ¡til, duradera y con buen soporte lateral. Perfecta para jugadores versÃ¡tiles que no quieren gastar en tope de gama.",
    pros: ["VersÃ¡til y duradera", "Buen soporte lateral", "IcÃ³nico diseÃ±o Jordan"],
    contras: ["Cushion modesto", "Algo pesada"],
    veredicto: "La opciÃ³n Jordan equilibrada para aleros y ala-pÃ­vots con presupuesto medio.",
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
    resumen: "Peak sorprende con el TaiChi Flash: un foam propio que combina cushion y respuesta a un precio muy competitivo. La opciÃ³n premium de la marca asiÃ¡tica.",
    pros: ["Cushion y respuesta sorprendentes", "Ligera", "Precio muy competitivo"],
    contras: ["DifÃ­cil de encontrar en EspaÃ±a", "Soporte lateral bÃ¡sico"],
    veredicto: "Para el jugador aventurero que quiere descubrir marcas asiÃ¡ticas de calidad. Sorprende en todo por su precio.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 90,
    links_compra: [
      { tienda: "aliexpress", url: "https://www.aliexpress.com/wholesale?SearchText=peak+taichi+flash+basketball", precio_actual: 75, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
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
    resumen: "VersiÃ³n mejorada de la Freak 5 con mejor Zoom Air y materiales mÃ¡s refinados. Sigue siendo la referencia para pivots y ala-pÃ­vots de gran envergadura.",
    pros: ["Soporte lateral excepcional", "Mejor cushion que la Freak 5", "Durabilidad outdoor sÃ³lida"],
    contras: ["Muy pesada", "Cara para su propuesta"],
    veredicto: "Para pÃ­vots y ala-pÃ­vots potentes que quieren la mejor protecciÃ³n de Nike a precio alto.",
    imagen_principal: "/placeholder-shoe.svg",
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
    resumen: "La zapatilla junior de Adidas mÃ¡s popular. Bounce foam bÃ¡sico, buena tracciÃ³n y durabilidad outdoor. Perfecta para jÃ³venes jugadores que empiezan.",
    pros: ["Precio muy asequible para junior", "Buena durabilidad outdoor", "TracciÃ³n sÃ³lida"],
    contras: ["Cushion bÃ¡sico", "No apta para adultos pesados"],
    veredicto: "La referencia budget para jugadores junior. Funcional, duradera y asequible.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 65,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=cross+em+up+5", precio_actual: 55, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+cross+em+up+5", precio_actual: 50, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
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
    resumen: "La lÃ­nea presupuesto de LeBron con Air Max. Ofrece la estÃ©tica y cushion LeBron a un precio accesible. La Witness es la puerta de entrada al universo James.",
    pros: ["Precio muy asequible para la marca LeBron", "Buen cushion para su precio", "Duradera"],
    contras: ["Pesada", "Sin tecnologÃ­a premium", "TracciÃ³n bÃ¡sica"],
    veredicto: "Para el fan de LeBron con presupuesto ajustado. Cushion correcto a precio justo.",
    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/40223/nike-le-bron-witness-8-main-22697959-main.jpg",
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
    resumen: "Primera signature de Kawhi Leonard con New Balance. FuelCell foam con tracciÃ³n herringbone de primer nivel. Refleja el juego metÃ³dico y potente de The Klaw.",
    pros: ["TracciÃ³n excepcional", "Cushion premium con FuelCell", "Durabilidad outdoor excelente"],
    contras: ["Algo pesada para aleros Ã¡giles", "Precio alto para NB"],
    veredicto: "La primera y esperada signature de Kawhi no decepciona. Para aleros que quieren tracciÃ³n y cushion a partes iguales.",
    imagen_principal: "/placeholder-shoe.svg",
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
    resumen: "Anta Shock Wave 5 con A-Flashfoam: la mejor zapatilla de exterior de la marca china. Durabilidad outdoor excepcional y tracciÃ³n constante en cualquier superficie.",
    pros: ["Durabilidad outdoor lÃ­der en su precio", "TracciÃ³n constante en exterior", "Buena relaciÃ³n calidad-precio"],
    contras: ["No destaca en rendimiento indoor premium", "DifÃ­cil de encontrar en tiendas fÃ­sicas"],
    veredicto: "La zapatilla ideal para quien juega principalmente en pistas exteriores y quiere durabilidad mÃ¡xima a precio razonable.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 90,
    links_compra: [
      { tienda: "aliexpress", url: "https://www.aliexpress.com/wholesale?SearchText=anta+shock+wave+5+basketball", precio_actual: 75, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
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
    tecnologia_clave: ["Zoom Air", "herringbone 360Â°"],
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
    resumen: "La primera signature de Sabrina Ionescu fue un Ã©xito rotundo. Ultra ligera, con tracciÃ³n 360Â° y respuesta excelente. Pensada para bases explosivas pero unisex en la prÃ¡ctica.",
    pros: ["Ultra ligera", "TracciÃ³n 360Â° excepcional", "Respuesta muy alta"],
    contras: ["Cushion modesto para jugadores pesados", "Poco soporte tobillo"],
    veredicto: "La zapatilla para bases explosivos (hombre o mujer) que quieren lo mÃ¡s rÃ¡pido del mercado Nike.",
    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/39777/nike-sabrina-1-21635856-main.jpg",
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
    resumen: "La lÃ­nea budget de Harden con Bounce foam y buena tracciÃ³n herringbone. Pensada para escoltas y bases que quieren un modelo signature accesible.",
    pros: ["Precio muy asequible para una signature", "TracciÃ³n sÃ³lida", "CÃ³moda desde el primer uso"],
    contras: ["Cushion bÃ¡sico", "Estabilidad lateral limitada"],
    veredicto: "La opciÃ³n mÃ¡s econÃ³mica para el fan de Harden. Funcional y asequible para juego perimetral.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 80,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=harden+stepback+4", precio_actual: 70, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+harden+stepback+4", precio_actual: 65, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
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
    resumen: "La opciÃ³n mÃ¡s barata de la familia Kyrie. TracciÃ³n sÃ³lida y durabilidad outdoor para bases y escoltas que buscan el ADN Kyrie sin gastar mÃ¡s de 70â‚¬.",
    pros: ["Precio muy asequible", "Buena tracciÃ³n", "Duradera en outdoor"],
    contras: ["Cushion bÃ¡sico", "Sin tecnologÃ­a premium"],
    veredicto: "El punto de entrada a las Kyrie. Para jugadores de base con presupuesto ajustado que valoran el agarre.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 70,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=kyrie+flytrap+6&vst=kyrie+flytrap+6", precio_actual: 70, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+kyrie+flytrap+6", precio_actual: 60, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
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
    resumen: "La primera signature de Luka DonÄiÄ‡ sorprendiÃ³ con una base ultra ancha y estabilidad excelente. Pensada para jugadores potentes y versÃ¡tiles como el propio Luka.",
    pros: ["Estabilidad excepcional", "Horma ancha muy cÃ³moda", "Cushion sÃ³lido"],
    contras: ["Pesada", "Respuesta baja para un alero Ã¡gil"],
    veredicto: "Para el jugador al estilo Luka: potente, tÃ©cnico y que necesita una base sÃ³lida. Ahora a precios de outlet muy interesantes.",
    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/39037/jordan-luka-1-21236586-main.jpg",
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
    resumen: "UA HOVR Havoc 5 con el foam HOVR mejorado. Cushion premium de UA para jugadores versÃ¡tiles que buscan protecciÃ³n y estabilidad a precio razonable.",
    pros: ["HOVR foam excelente para cushion", "Buen soporte lateral", "Precio competitivo vs Nike/Adidas"],
    contras: ["Algo pesada", "Court feel reducido"],
    veredicto: "La alternativa UA mÃ¡s equilibrada para aleros y ala-pÃ­vots. MÃ¡s barata que las grandes firmas con rendimiento similar.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=under+armour+hovr+havoc+5", precio_actual: 95, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
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
    resumen: "La zapatilla junior de Nike con Zoom Air a precio accesible. Perfecta para jÃ³venes jugadores que quieren tecnologÃ­a Nike sin el precio tope de gama.",
    pros: ["Zoom Air a buen precio", "Ligera para junior", "Buena tracciÃ³n"],
    contras: ["No apta para adultos pesados", "Cushion bÃ¡sico para uso intensivo"],
    veredicto: "La mejor opciÃ³n Nike para jugadores junior que quieren rendimiento real sin gastar mÃ¡s de 75â‚¬.",
    imagen_principal: "/placeholder-shoe.svg",
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
  // 103. ADIDAS OWNTHEGAME 3 â€” ultra budget, iniciaciÃ³n
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
    resumen: "La opciÃ³n mÃ¡s econÃ³mica de Adidas para baloncesto. Sin pretensiones: funcional, duradera y asequible para iniciaciÃ³n o uso recreativo.",
    pros: ["Precio imbatible", "Durable para el precio", "Disponible en cualquier tienda"],
    contras: ["Sin tecnologÃ­a destacable", "Cushion y respuesta bÃ¡sicos", "No apta para competiciÃ³n seria"],
    veredicto: "Para el jugador recreativo o principiante que quiere estrenar marca Adidas sin gastar mÃ¡s de 55â‚¬.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 55,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=ownthegame+3", precio_actual: 55, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+ownthegame+3+baloncesto", precio_actual: 48, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
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
    resumen: "El clÃ¡sico moderno de New Balance. La OMN1S fue el punto de inflexiÃ³n de la marca en baloncesto. TracciÃ³n herringbone excepcional y FuelCell reactivo. Disponible a precios de outlet.",
    pros: ["TracciÃ³n de Ã©lite", "FuelCell reactivo", "Ahora muy asequible en outlet"],
    contras: ["Modelo antiguo (2019)", "DifÃ­cil de encontrar en tallas completas"],
    veredicto: "Si la encuentras en tu talla, es una de las mejores relaciones calidad-precio del mercado. TracciÃ³n imbatible.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [{ tipo: "weartesters", url: "https://weartesters.com/new-balance-omn1s-performance-review/" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 130,
    links_compra: [
      { tienda: "nb_es", url: "https://www.newbalance.es/es/buscar?q=omn1s", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=new+balance+omn1s", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
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
    resumen: "Puma Playmaker Pro Mid con NITRO foam. Buen soporte de tobillo gracias al corte mid, tracciÃ³n sÃ³lida y precio muy competitivo para la tecnologÃ­a que ofrece.",
    pros: ["NITRO foam a precio asequible", "Buen soporte tobillo mid", "TracciÃ³n consistente"],
    contras: ["No destaca en ningÃºn parÃ¡metro top", "Algo pesada"],
    veredicto: "Para jugadores con historial de torceduras que buscan soporte tobillo a precio medio sin gastar en tope de gama.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 90,
    links_compra: [
      { tienda: "puma_es", url: "https://es.puma.com/es_ES/search?q=playmaker+pro+mid", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=puma+playmaker+pro+mid+baloncesto", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
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
    resumen: "La lÃ­nea premium de Li-Ning para guard players. CLOUD IV foam con carbon plate, tracciÃ³n excepcional y peso ultra reducido. Compite con las mejores Adidas y Nike del mercado.",
    pros: ["Rendimiento de Ã©lite a precio chino", "Ultra ligera con carbon plate", "TracciÃ³n y respuesta excepcionales"],
    contras: ["DifÃ­cil de encontrar en EspaÃ±a", "Durabilidad outdoor mejorable", "Tallas asiÃ¡ticas (suelen ser mÃ¡s pequeÃ±as)"],
    veredicto: "Para el jugador dispuesto a comprar online y descubrir lo mejor del mercado asiÃ¡tico. Rendimiento de gama alta a mitad de precio.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 120,
    links_compra: [
      { tienda: "aliexpress", url: "https://www.aliexpress.com/wholesale?SearchText=li+ning+yu+shuai+18+basketball", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
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
    resumen: "La KD 16 con Zoom Air sigue la tradiciÃ³n equilibrada de la lÃ­nea Durant. Ahora disponible a precios de outlet muy atractivos.",
    pros: ["Muy equilibrada", "Ahora a precios reducidos de outlet", "CÃ³moda para aleros versÃ¡tiles"],
    contras: ["Durabilidad outdoor bÃ¡sica", "Superada por la KD 17 en todo"],
    veredicto: "Si la encuentras de oferta, es una excelente zapatilla para aleros. La predecesora directa de la KD 17.",
    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/40143/nike-kd-16-2-21573145-main.jpg",
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
    resumen: "La versiÃ³n intermedia entre AE 1 y AE 2. Lightstrike Pro refinado con nueva upper mÃ¡s transpirable. Una de las zapatillas mÃ¡s rÃ¡pidas de 2024.",
    pros: ["RapidÃ­sima y muy ligera", "Excelente respuesta Lightstrike Pro", "Muy transpirable"],
    contras: ["Durabilidad outdoor limitada", "Cushion modesto para jugadores pesados"],
    veredicto: "Para escoltas explosivos tipo Ant Edwards que necesitan velocidad pura.",
    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/40491/adidas-anthony-edwards-1-low-22663445-main.jpg",
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
    resumen: "Converse vuelve al baloncesto de rendimiento con Nike Zoom Air. DiseÃ±o high-top icÃ³nico con tecnologÃ­a moderna. Para el jugador que quiere estilo y soporte tobillo premium.",
    pros: ["Soporte tobillo high-top excepcional", "Nike Zoom Air integrado", "DiseÃ±o icÃ³nico Ãºnico"],
    contras: ["Pesada", "VentilaciÃ³n escasa (leather upper)", "Precio elevado para Converse"],
    veredicto: "Para jugadores con problemas de tobillo que tambiÃ©n quieren el look mÃ¡s icÃ³nico del baloncesto con tecnologÃ­a moderna.",
    imagen_principal: "/placeholder-shoe.svg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 140,
    links_compra: [
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=converse+all+star+pro+bb", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=converse+all+star+pro+bb", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
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
    resumen: "La lÃ­nea de entrada de Nike para baloncesto. Sin pretensiones tÃ©cnicas pero con el nombre y la calidad de construcciÃ³n Nike a precio mÃ­nimo.",
    pros: ["Precio de entrada Nike mÃ¡s bajo", "Durable para uso recreativo", "Disponible en cualquier tienda"],
    contras: ["Sin tecnologÃ­a destacable", "Solo para uso recreativo o entrenamiento bÃ¡sico"],
    veredicto: "Para el jugador que quiere estrenar Nike sin gastar mÃ¡s de 65â‚¬. La puerta de entrada a la marca.",
    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/40382/nike-precision-7-21639047-main.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-18",
    precio_msrp_eur: 65,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=precision+7&vst=precision+7", precio_actual: 65, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+precision+7+baloncesto", precio_actual: 55, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-18" },
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

    resumen: "La primera firma de Ja Morant destaca por una tracciÃ³n de herringbone excepcional y un setup de amortiguaciÃ³n Cushlon+React que da respuesta sin sacrificar court feel. Ligera, baja y diseÃ±ada para guards rÃ¡pidos.",
    pros: [
      "TracciÃ³n herringbone de primer nivel",
      "Ligera para ser una signature (310g)",
      "React en antepiÃ© da respuesta snappy",
      "Precio asequible para signature Nike",
    ],
    contras: [
      "Sin soporte de tobillo al ser low",
      "Cushlon bÃ¡sico en talÃ³n, poco acolchado",
      "Durabilidad outdoor limitada",
    ],
    veredicto: "Para guards explosivos que priorizan tracciÃ³n y velocidad sobre protecciÃ³n. La Ja 2 la supera en tech, pero la Ja 1 sigue siendo una ganga a precio reducido.",

    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/39891/nike-ja-1-21212250-main.jpg",
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+ja+1+baloncesto", precio_actual: 79, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
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

    resumen: "Tercera generaciÃ³n de la firma de Trae Young. TracciÃ³n dual excepcional con foam wedge reactivo a ras del suelo. Ligera, rÃ¡pida y con lockdown de primer nivel para guards Ã¡giles.",
    pros: [
      "TracciÃ³n indoor excepcional (dual-pattern)",
      "Muy reactiva y baja al suelo",
      "Lockdown y estabilidad sobresalientes con placa Torsion",
      "La mÃ¡s ligera de la serie",
    ],
    contras: [
      "Poco cushion para jugadores pesados",
      "Requiere perÃ­odo de rodaje",
      "TracciÃ³n se degrada rÃ¡pido en exterior",
    ],
    veredicto: "Para guards Ã¡giles que viven en el perÃ­metro y necesitan agarre y respuesta explosiva. La mejor Trae Young de la serie.",

    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/40148/adidas-trae-young-3-21161581-main.jpg",
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+trae+young+3+baloncesto", precio_actual: 115, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // NEW BALANCE TWO WXY v5 â€” el mÃ¡s versÃ¡til de NB
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

    resumen: "La quinta generaciÃ³n del TWO WXY combina FuelCell y Fresh Foam X en tÃ¡ndem con tracciÃ³n suction-cup de primer nivel. El modelo mÃ¡s versÃ¡til del catÃ¡logo NB, apto para cualquier posiciÃ³n.",
    pros: [
      "AmortiguaciÃ³n dual FuelCell + Fresh Foam X muy completa",
      "TracciÃ³n suction-cup excepcional en cualquier pista",
      "VersÃ¡til para todas las posiciones",
      "Placa torsional da estabilidad premium",
    ],
    contras: [
      "Algo pesada (390g) para guards explosivos",
      "Upper puede sentirse estrecho al inicio",
    ],
    veredicto: "La opciÃ³n mÃ¡s equilibrada del catÃ¡logo NB. Sirve para cualquier posiciÃ³n y nivel, con tracciÃ³n y cushion de primer nivel.",

    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/40522/new-balance-two-wxy-v-5-22133179-main.jpg",
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=new+balance+two+wxy+v5+baloncesto", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // NIKE GT HUSTLE 3 â€” cushion mÃ¡ximo para pivots
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

    resumen: "La GT Hustle 3 empuja la amortiguaciÃ³n al mÃ¡ximo con doble Air Zoom stacked. Victor Wembanyama la usa en la NBA. La opciÃ³n definitiva para pivots que buscan protecciÃ³n de impactos con Flyknit ligero.",
    pros: [
      "AmortiguaciÃ³n Air Zoom doble stack excepcional",
      "81.5% de retorno energÃ©tico (top del mercado)",
      "Flyknit ligero y muy transpirable",
      "Ideal para rodillas castigadas",
    ],
    contras: [
      "Soporte lateral limitado para movimientos laterales explosivos",
      "Precio muy alto",
      "No apta para exterior (gum rubber)",
    ],
    veredicto: "La mejor Nike para pivots que quieren mÃ¡xima protecciÃ³n de impactos. Si juegas bajo el aro y tienes rodillas castigadas, esta es tu zapatilla.",

    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/40444/nike-g-t-hustle-3-main-21813306-main.jpg",
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+gt+hustle+3+baloncesto", precio_actual: 170, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // NEW BALANCE KAWHI 2 â€” evoluciÃ³n ligera de The Klaw
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

    resumen: "Segunda signature de Kawhi Leonard con NB. MÃ¡s ligera que la Kawhi 1 gracias al Fitweave Lite, mantiene la tracciÃ³n mordaz y aÃ±ade FuelCell full-length con placa de rendimiento para cortes mÃ¡s explosivos.",
    pros: [
      "MÃ¡s ligera que la Kawhi 1 (340g vs 385g)",
      "TracciÃ³n excepcional heredada de la primera",
      "FuelCell full-length muy reactivo",
      "Placa de rendimiento mejora los cortes laterales",
    ],
    contras: [
      "Cushion ligeramente menos plush que la Kawhi 1",
      "Horma algo estrecha al inicio",
    ],
    veredicto: "La evoluciÃ³n natural de la Kawhi 1. MÃ¡s rÃ¡pida y ligera sin sacrificar la tracciÃ³n que hizo famosa a la primera. La mejor opciÃ³n NB para aleros versÃ¡tiles.",

    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/40373/new-balance-kawhi-iv-main-21870344-main.jpg",
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
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=new+balance+kawhi+2+baloncesto", precio_actual: 145, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
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
    resumen: "La cuarta entrega de la firma de Trae Young mantiene la tracciÃ³n dual excepcional de la serie con un foam wedge reactivo a ras del suelo. MÃ¡s refinada que la Trae 3.",
    pros: ["TracciÃ³n dual indoor excepcional", "Muy reactiva y ligera (260g)", "Lockdown de primer nivel", "DiseÃ±o mÃ¡s maduro que generaciones anteriores"],
    contras: ["Poco cushion para jugadores pesados", "Durabilidad outdoor limitada", "Horma estrecha puede no adaptarse a todos"],
    veredicto: "La mejor Trae Young de la serie. Para guards Ã¡giles del perÃ­metro que necesitan el mÃ¡ximo agarre y velocidad de reacciÃ³n.",
    imagen_principal: "https://ballershoesdb.com/wp-content/uploads/Adidas-Trae-Young-4-Cropped-650x406.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-19",
    precio_msrp_eur: 130,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=trae+young+4", precio_actual: 130, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=adidas+trae+young+4", precio_actual: 125, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+trae+young+4+baloncesto", precio_actual: 115, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // JORDAN TATUM 2 â€” el alero versÃ¡til de Jayson
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
    resumen: "Segunda firma de Jayson Tatum con Jordan Brand. CombinaciÃ³n de Zoom Air y React foam para el alero versÃ¡til moderno. Predecesor directo de la popular Tatum 3.",
    pros: ["AmortiguaciÃ³n Zoom+React muy equilibrada", "Buena tracciÃ³n herringbone", "Polivalente para todas las posiciones perimetrales", "Durabilidad outdoor decente"],
    contras: ["Superada por la Tatum 3 en tecnologÃ­a", "Sin innovaciÃ³n destacada respecto a generaciones anteriores"],
    veredicto: "Una sÃ³lida signature para aleros que buscan equilibrio completo. Vale la pena buscarla a precio reducido frente a la Tatum 3.",
    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/40352/jordan-tatum-2-21609076-main.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-19",
    precio_msrp_eur: 155,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=tatum+2&vst=tatum+2", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=jordan+tatum+2", precio_actual: 130, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=jordan+tatum+2+baloncesto", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
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
    resumen: "Tercera firma de Zion Williamson, diseÃ±ada para aguantar el impacto brutal de un jugador de 130kg. React full-length y Zoom Air Strobel ofrecen la mÃ¡xima protecciÃ³n de impactos de toda la lÃ­nea.",
    pros: ["AmortiguaciÃ³n mÃ¡xima para jugadores muy pesados", "Horma ancha ideal para pies anchos", "TracciÃ³n herringbone agresiva", "Build quality premium"],
    contras: ["Muy pesada (415g) â€” no apta para guards", "Cara para lo que ofrece tÃ©cnicamente", "Superada ya por la Zion 4"],
    veredicto: "La opciÃ³n definitiva para pivots y ala-pivots de mÃ¡s de 95kg. Si tu cuerpo pide amortiguaciÃ³n mÃ¡xima, esta es la zapatilla.",
    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/40224/jordan-zion-3-main-21866150-main.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-19",
    precio_msrp_eur: 185,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=zion+3&vst=zion+3", precio_actual: 150, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=jordan+zion+3", precio_actual: 160, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=jordan+zion+3+baloncesto", precio_actual: 140, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // PUMA CLYDE ALL-PRO â€” NITRO versÃ¡til
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
    resumen: "La Clyde All-Pro es la apuesta de Puma para competir en gama alta con NITRO foam, su espuma de nitrÃ³geno mÃ¡s reactiva. Ligera, versÃ¡til y con buena tracciÃ³n herringbone â€” una sorpresa muy competitiva para guards y aleros.",
    pros: ["NITRO foam: respuesta y amortiguaciÃ³n equilibradas", "Peso muy competitivo (317g)", "TracciÃ³n herringbone fiable en interior", "Horma estÃ¡ndar â€” encaja con la mayorÃ­a de pies"],
    contras: ["Puma tiene menor presencia en EspaÃ±a â€” difÃ­cil de encontrar", "Soporte de tobillo limitado al ser low", "Durabilidad outdoor no testeada extensivamente"],
    veredicto: "OpciÃ³n muy sÃ³lida y algo infravalorada por la poca presencia de Puma en baloncesto. Si la encuentras a buen precio, es una compra muy inteligente para guards y aleros.",
    imagen_principal: "https://ballershoesdb.com/wp-content/uploads/Puma-Clyde-All-Pro-Cropped-650x406.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-19",
    precio_msrp_eur: 130,
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=puma+clyde+all+pro+baloncesto", precio_actual: 100, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=puma+clyde+all+pro", precio_actual: 110, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // NIKE LEBRON NXXT GEN â€” LeBron ligero y versÃ¡til
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
    resumen: "El LeBron NXXT Gen es la apuesta de Nike por un LeBron mÃ¡s ligero y accesible. Combina Air Max en talÃ³n y Zoom Air Strobel en antepiÃ© con una construcciÃ³n low que lo hace mÃ¡s versÃ¡til que sus predecesores. Menos monstruo, mÃ¡s polivalente.",
    pros: ["Cushion premium en toda la longitud del pie", "ConstrucciÃ³n low â€” mÃ¡s versÃ¡til que LeBrons anteriores", "Horma ancha cÃ³moda para pies anchos", "TracciÃ³n fiable en pista cubierta"],
    contras: ["Pesado para un low (360g)", "Respuesta no al nivel de la lÃ­nea Curry o GT Cut", "Precio elevado para lo que ofrece frente a rivales"],
    veredicto: "Buena opciÃ³n para aleros y ala-pivots con pies anchos que quieren un LeBron sin renunciar a versatilidad. Si buscas mÃ¡xima explosividad, mira otras opciones.",
    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/39780/nike-lebron-nxxt-gen-21212253-main.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-19",
    precio_msrp_eur: 200,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=lebron+nxxt+gen&vst=lebron+nxxt+gen", precio_actual: 160, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=lebron+nxxt+gen", precio_actual: 170, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=nike+lebron+nxxt+gen+baloncesto", precio_actual: 150, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
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
    resumen: "La GT Jump 3 es la referencia Nike para pivots y ala-pivots. Zoom Air en talÃ³n y Strobel completo ofrecen amortiguaciÃ³n premium para jugadores grandes, con un cage de TPU que da soporte lateral excepcional en corte mid.",
    pros: ["AmortiguaciÃ³n de primer nivel para jugadores pesados", "Soporte lateral y de tobillo sobresaliente", "TracciÃ³n fiable en interior", "Horma ancha â€” cÃ³moda para pies anchos"],
    contras: ["Muy pesada (395g) â€” impensable para guards", "Precio elevado", "Lenta en cambios de direcciÃ³n rÃ¡pidos"],
    veredicto: "La opciÃ³n mÃ¡s sÃ³lida de Nike para pivots que necesitan mÃ¡ximo soporte y cushion. Si juegas de 5 y pesas mÃ¡s de 90kg, esta es tu zapatilla.",
    imagen_principal: "https://ballershoesdb.com/wp-content/uploads/Nike-Air-Zoom-GT-Jump-3-Cropped-650x406.jpg",
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
    resumen: "La Curry 11 lleva la suela UA FLOW a su mÃ¡xima expresiÃ³n. Sin goma exterior separada, la suela es amortiguaciÃ³n y tracciÃ³n a la vez. IncreÃ­blemente ligera y reactiva para un guard de Ã©lite.",
    pros: ["UA FLOW: amortiguaciÃ³n y tracciÃ³n integradas", "Muy ligera para la tecnologÃ­a que ofrece", "Respuesta excepcional al corte", "ContinuaciÃ³n de la exitosa lÃ­nea Curry"],
    contras: ["Horma estrecha â€” no apta para pies anchos", "Soporte de tobillo limitado al ser low", "Superada por la Curry 12"],
    veredicto: "Una de las mejores opciones para guards que buscan mÃ¡xima respuesta con tecnologÃ­a UA FLOW. Vale la pena encontrarla a precio rebajado.",
    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/40225/under-armour-curry-11-main-21810718-main.jpg",
    imagenes: [],
    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-19",
    precio_msrp_eur: 160,
    links_compra: [
      { tienda: "ua_es", url: "https://www.underarmour.es/es-es/p/curry-11/3027359.html", precio_actual: 130, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "footlocker_es", url: "https://www.footlocker.es/es/search?query=curry+11", precio_actual: 140, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=under+armour+curry+11+baloncesto", precio_actual: 120, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-19" },
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

    resumen: "La Harden Vol 8 consolida el uso de Lightstrike Pro en la lÃ­nea signature de Harden. TracciÃ³n herringbone multidireccional fiable y perfil bajo que favorece el juego de manejo de balÃ³n y tiro exterior.",
    pros: [
      "Lightstrike Pro: buena relaciÃ³n amortiguaciÃ³n-respuesta",
      "TracciÃ³n herringbone multidireccional",
      "Ligera para su categorÃ­a",
      "Buena ventilaciÃ³n gracias a la malla tejida",
    ],
    contras: [
      "Superada por la Vol 9 en todos los aspectos",
      "Soporte lateral bÃ¡sico",
      "Precio original elevado para lo que ofrece hoy",
    ],
    veredicto: "Una buena zapatilla de guard en su momento. Ahora se puede encontrar a buen precio de segunda mano o en outlets. SÃ³lida si la encuentras rebajada.",

    imagen_principal: "https://cdn.runrepeat.com/storage/gallery/product_primary/40317/adidas-harden-volume-8-main-21831197-main.jpg",
    imagenes: [],

    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-20",

    precio_msrp_eur: 160,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=harden+vol+8", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-20" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+harden+vol+8+baloncesto", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-20" },
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
    tecnologia_clave: ["FuelCell", "herringbone", "goma translÃºcida"],
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

    resumen: "La TWO WXY v6 es el tope de gama de New Balance para 2024. FuelCell reactivo combinado con una tracciÃ³n herringbone en goma translÃºcida que ofrece un agarre excepcional en cancha interior. Una de las mejores opciones para guards que valoran el equilibrio total.",
    pros: [
      "FuelCell: amortiguaciÃ³n reactiva y ligera",
      "TracciÃ³n herringbone translÃºcida muy fiable",
      "ConstrucciÃ³n premium con precio competitivo vs Nike/Adidas",
      "Soporte lateral sÃ³lido para ser low",
    ],
    contras: [
      "Disponibilidad limitada en EspaÃ±a",
      "No signature â€” menor presencia de marketing",
      "Algo pesada para los mÃ¡s velocistas",
    ],
    veredicto: "La mejor apuesta de New Balance para guards en 2024. Si priorizas rendimiento sobre marketing, la TWO WXY v6 supera a muchas signatures en valor real.",

    imagen_principal: "https://ballershoesdb.com/wp-content/uploads/New-Balance-TWO-WXY-v6-Cropped-650x406.jpg",
    imagenes: [],

    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-20",

    precio_msrp_eur: 200,
    links_compra: [
      { tienda: "nb_es", url: "https://www.newbalance.es/es/buscar?q=two+wxy+v6", precio_actual: 185, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-20" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=new+balance+two+wxy+v6+baloncesto", precio_actual: 180, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-20" },
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

    resumen: "La Why Not .6 refleja el estilo de juego explosivo y sin frenos de Russell Westbrook. Zoom Air Strobel en todo el pie para mÃ¡xima respuesta en cada zancada. El perfil mid ofrece soporte de tobillo extra sin perder agilidad.",
    pros: [
      "Zoom Air Strobel: respuesta inmediata",
      "TracciÃ³n herringbone multidireccional fiable",
      "Soporte de tobillo extra al ser mid",
      "Cushion equilibrado para el juego explosivo",
    ],
    contras: [
      "Firma de un jugador en declive â€” disponibilidad cayendo",
      "Algo pesada para ser una 'explosiva'",
      "No destaca en ninguna categorÃ­a de forma sobresaliente",
    ],
    veredicto: "Una zapatilla sÃ³lida para bases explosivos que quieran soporte de tobillo extra. Se puede encontrar a precio reducido dado que Westbrook ya no es el nombre que era.",

    imagen_principal: "https://ballershoesdb.com/wp-content/uploads/Jordan-Why-Not-6-Cropped-650x406.jpg",
    imagenes: [],

    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-20",

    precio_msrp_eur: 110,
    links_compra: [
      { tienda: "nike_es", url: "https://www.nike.com/es/w?q=why+not+6&vst=why+not+6", precio_actual: 90, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-20" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=jordan+why+not+6+baloncesto", precio_actual: 80, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-20" },
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

    resumen: "La Ownthegame 2.0 de Adidas es la opciÃ³n budget mÃ¡s accesible de la marca alemana. Cushion Bounce bÃ¡sico y suela herringbone duradera que la convierten en una buena zapatilla de entrenamiento o de iniciaciÃ³n al baloncesto.",
    pros: [
      "Precio muy accesible",
      "Buena durabilidad para exterior",
      "TracciÃ³n herringbone bÃ¡sica pero funcional",
      "Disponible en muchas tallas y colores",
    ],
    contras: [
      "Cushion Bounce bÃ¡sico â€” no para competiciÃ³n seria",
      "Pesada para su nivel de prestaciones",
      "Superada por la Ownthegame 3",
    ],
    veredicto: "Perfecta como primera zapatilla de baloncesto o para entrenamientos casuales. No esperes rendimiento de competiciÃ³n, pero para iniciarse o entrenar es mÃ¡s que suficiente.",

    imagen_principal: "https://ballershoesdb.com/wp-content/uploads/Adidas-Ownthegame-2-Cropped-650x406.jpg",
    imagenes: [],

    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-20",

    precio_msrp_eur: 70,
    links_compra: [
      { tienda: "adidas_es", url: "https://www.adidas.es/buscar?q=ownthegame+2.0", precio_actual: 55, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-20" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=adidas+ownthegame+2.0+baloncesto", precio_actual: 50, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-20" },
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

    resumen: "La UA Assert 10 es la propuesta budget de Under Armour para baloncesto recreativo y entrenamiento. UA Charged Cushioning bÃ¡sico con buena ventilaciÃ³n y tracciÃ³n herringbone suficiente para cancha interior.",
    pros: [
      "Precio muy competitivo para marca UA",
      "Buena ventilaciÃ³n para ser budget",
      "Ligera para su rango de precio",
      "Durabilidad aceptable en exterior",
    ],
    contras: [
      "Cushion bÃ¡sico â€” no apta para competiciÃ³n",
      "TracciÃ³n herringbone bÃ¡sico, no multidireccional",
      "Pocas opciones de colores",
    ],
    veredicto: "La opciÃ³n mÃ¡s econÃ³mica de Under Armour para baloncesto. Ideal para entrenamientos o para quien empieza y no quiere invertir mucho. Sin pretensiones de rendimiento elite.",

    imagen_principal: "https://ballershoesdb.com/wp-content/uploads/UA-Assert-10-Cropped-650x406.jpg",
    imagenes: [],

    fuentes: [{ tipo: "evaluacion-propia" }],
    ultima_actualizacion: "2026-05-20",

    precio_msrp_eur: 60,
    links_compra: [
      { tienda: "ua_es", url: "https://www.underarmour.es/es-es/zapatillas-baloncesto/", precio_actual: 55, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-20" },
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=under+armour+assert+10+baloncesto", precio_actual: 50, disponible: true, tiene_afiliado: false, ultima_verificacion: "2026-05-20" },
    ],
  },
];

/**
 * CatÃ¡logo con precios actualizados por el scraper (precios.json).
 * Si precios.json estÃ¡ vacÃ­o, se usan los precios editoriales de _rawZapatillas.
 */
export const zapatillas: Zapatilla[] = mergePricesIntoShoes(
  _rawZapatillas,
  preciosJson as PreciosJson
);

/**
 * Helper para encontrar una zapatilla por slug (usado en pÃ¡ginas de detalle).
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

