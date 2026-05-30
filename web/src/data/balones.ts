// balones.ts — Catálogo de balones de baloncesto
// Misma filosofía que zapatillas.ts: datos técnicos honestos, sin BS de marketing

export type Terreno = "indoor" | "outdoor" | "hybrid";
export type MaterialBalon = "rubber" | "composite" | "leather";
export type TallaBalon = 5 | 6 | 7;

export interface Balon {
  id: string;
  slug: string;
  marca: string;
  modelo: string;
  año_lanzamiento: number;
  terreno: Terreno;
  material: MaterialBalon;
  talla_principal: TallaBalon;
  tallas_disponibles: TallaBalon[];
  precio_msrp_eur: number;
  puntuaciones: {
    grip: number;          // Agarre y tacto — /10
    durabilidad: number;   // Cuánto aguanta antes de pelarse — /10
    rebote: number;        // Consistencia del bote — /10
    control: number;       // Control en pases y tiro — /10
  };
  resumen: string;
  pros: string[];
  contras: string[];
  veredicto: string;
  imagen_principal: string;
  tags: string[];
  links_compra: {
    tienda: string;
    url: string;
    precio_actual: number;
    disponible: boolean;
    tiene_afiliado: boolean;
    ultima_verificacion: string;
  }[];
  ultima_actualizacion: string;
}

export const balones: Balon[] = [

  // ─── INDOOR / CUERO ───────────────────────────────────────────────────────

  {
    id: "wilson-evolution",
    slug: "wilson-evolution",
    marca: "Wilson",
    modelo: "Evolution",
    año_lanzamiento: 2000,
    terreno: "indoor",
    material: "leather",
    talla_principal: 7,
    tallas_disponibles: [5, 6, 7],
    precio_msrp_eur: 170,
    puntuaciones: {
      grip: 10,
      durabilidad: 7,
      rebote: 9,
      control: 10,
    },
    resumen: "El balón más usado en el baloncesto universitario americano y referencia mundial para indoor. Cuero compuesto de microfibre con canales profundos — el mejor grip del mercado. Requiere pista limpia y seca para rendir. Si juegas en parquet, no hay nada mejor.",
    pros: [
      "El mejor grip del mercado — microfibre que mejora con el uso",
      "Control de tiro y pase excepcional",
      "Canales profundos para mejor agarre en todo momento",
      "El balón 'pro' más vendido del mundo por algo",
    ],
    contras: [
      "Solo para indoor — en cemento se destroza en una semana",
      "Requiere inflado preciso — muy sensible a la presión",
      "El más caro de la gama doméstica",
    ],
    veredicto: "9.5/10 en parquet. 0/10 en cemento. Si juegas en pista interior y buscas el mejor tacto posible, es el balón. Sin discusión.",
    imagen_principal: "/balls/wilson-evolution.webp",
    tags: ["indoor", "cuero", "premium", "grip", "universitario"],
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=wilson+evolution+basketball&tag=canchazapa-21", precio_actual: 170, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
      { tienda: "decathlon", url: "https://www.awin1.com/cread.php?awinmid=105405&awinaffid=2908587&ued=https%3A%2F%2Fwww.decathlon.es%2Fes%2Fsearch%3FNtt%3Dwilson%2Bevolution", precio_actual: 175, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
    ],
    ultima_actualizacion: "2026-05-27",
  },

  {
    id: "molten-bg5000",
    slug: "molten-bg5000",
    marca: "Molten",
    modelo: "BG5000",
    año_lanzamiento: 2010,
    terreno: "indoor",
    material: "leather",
    talla_principal: 7,
    tallas_disponibles: [6, 7],
    precio_msrp_eur: 160,
    puntuaciones: {
      grip: 9,
      durabilidad: 7,
      rebote: 10,
      control: 9,
    },
    resumen: "El balón oficial de la FIBA y de las grandes competiciones europeas. Si has visto el Eurobasket o la ACB en los últimos años, has visto este balón. Cuero sintético premium, rebote increíblemente consistente, perfecto para pista limpia. Ligeramente menos grip que el Wilson Evolution pero mejor rebote.",
    pros: [
      "Balón oficial FIBA — el mismo que usan en el Eurobasket y ACB",
      "Rebote más consistente y predecible del catálogo",
      "Cuero sintético de altísima calidad",
      "Diseño inconfundible — paneles de colores para mejor visibilidad",
    ],
    contras: [
      "Solo indoor — aguanta menos en exterior que un composite normal",
      "Precio premium",
      "El grip es ligeramente inferior al Wilson Evolution",
    ],
    veredicto: "9.5/10 para competición indoor. Si juegas en ligas federadas o entrenas en pabellón, este es el estándar. El rebote más consistente que vas a encontrar.",
    imagen_principal: "/balls/molten-bg5000.webp",
    tags: ["indoor", "cuero", "fiba", "oficial", "competicion", "acb"],
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=molten+bg5000+baloncesto&tag=canchazapa-21", precio_actual: 160, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
    ],
    ultima_actualizacion: "2026-05-27",
  },

  {
    id: "spalding-nba-official",
    slug: "spalding-nba-official",
    marca: "Spalding",
    modelo: "NBA Official Game Ball",
    año_lanzamiento: 1983,
    terreno: "indoor",
    material: "leather",
    talla_principal: 7,
    tallas_disponibles: [7],
    precio_msrp_eur: 200,
    puntuaciones: {
      grip: 9,
      durabilidad: 6,
      rebote: 9,
      control: 9,
    },
    resumen: "El balón oficial de la NBA desde 1983 hasta 2021. Cuero Horween full-grain, el mismo que lleva décadas en los parquets más famosos del mundo. Requiere rodaje — las primeras horas es duro, después del uso el cuero se asienta y el tacto es excepcional. Sustituido por Wilson en la NBA a partir de 2021.",
    pros: [
      "El balón de la NBA durante 38 años — historia pura",
      "Cuero Horween full-grain: el mejor envejecimiento del catálogo",
      "Grip que mejora con el uso — como un buen guante de béisbol",
      "El tacto más auténtico 'de TV' que puedes conseguir",
    ],
    contras: [
      "El más caro del catálogo",
      "Requiere rodaje de varias semanas — empieza duro",
      "Solo indoor en pista limpia",
      "Ya no es el balón oficial NBA — sustituido por Wilson",
    ],
    veredicto: "8.5/10 en rendimiento, 10/10 en nostalgia. El balón de Kobe, LeBron y Jordan. Si buscas el tacto más auténtico de parquet, es incomparable una vez rodado.",
    imagen_principal: "/balls/spalding-nba-official.webp",
    tags: ["indoor", "cuero", "nba", "oficial", "premium", "spalding"],
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=spalding+nba+official+game+ball&tag=canchazapa-21", precio_actual: 200, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
    ],
    ultima_actualizacion: "2026-05-27",
  },

  // ─── HYBRID / COMPOSITE ───────────────────────────────────────────────────

  {
    id: "wilson-nba-replica",
    slug: "wilson-nba-replica",
    marca: "Wilson",
    modelo: "NBA Replica",
    año_lanzamiento: 2021,
    terreno: "hybrid",
    material: "composite",
    talla_principal: 7,
    tallas_disponibles: [5, 6, 7],
    precio_msrp_eur: 45,
    puntuaciones: {
      grip: 7,
      durabilidad: 8,
      rebote: 8,
      control: 7,
    },
    resumen: "La versión accesible del balón oficial NBA. Composite de calidad decente, aguanta tanto indoor como outdoor con uso moderado. El equilibrio perfecto entre precio y versatilidad para el jugador casual que no quiere gastarse 150€+ en un balón de cuero y tampoco quiere uno de goma puro.",
    pros: [
      "El mejor precio/calidad del catálogo para uso mixto",
      "Aguanta indoor y outdoor sin destrozarse",
      "Diseño NBA oficial — el mismo aspecto que en la tele",
      "Disponible en tallas 5, 6 y 7",
    ],
    contras: [
      "Composite menos durable que rubber en outdoor duro",
      "Grip inferior al cuero en pista limpia",
      "El rebote es menos consistente que los balones premium",
    ],
    veredicto: "7.5/10 para uso mixto casual. El balón que recomendarías a cualquier amigo que juega dos o tres veces por semana en diferentes pistas. La opción inteligente si no quieres complicarte.",
    imagen_principal: "/balls/wilson-nba-replica.webp",
    tags: ["hybrid", "composite", "nba", "wilson", "precio-calidad", "versatil"],
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=wilson+nba+replica+basketball&tag=canchazapa-21", precio_actual: 45, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
      { tienda: "decathlon", url: "https://www.awin1.com/cread.php?awinmid=105405&awinaffid=2908587&ued=https%3A%2F%2Fwww.decathlon.es%2Fes%2Fsearch%3FNtt%3Dwilson%2Bnba", precio_actual: 45, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
    ],
    ultima_actualizacion: "2026-05-27",
  },

  {
    id: "molten-bg3800",
    slug: "molten-bg3800",
    marca: "Molten",
    modelo: "BG3800",
    año_lanzamiento: 2015,
    terreno: "hybrid",
    material: "composite",
    talla_principal: 7,
    tallas_disponibles: [6, 7],
    precio_msrp_eur: 65,
    puntuaciones: {
      grip: 8,
      durabilidad: 8,
      rebote: 9,
      control: 8,
    },
    resumen: "El hermano pequeño del BG5000 oficial. Composite de calidad superior, aguanta bien en exterior con superficie razonable y rinde excelente en interior. El favorito de los equipos de ligas locales que necesitan un balón que dure toda la temporada y no cueste el sueldo de un jugador.",
    pros: [
      "El mejor composite del catálogo — casi tan bueno como el BG5000 en parquet",
      "Rebote consistente en cualquier superficie",
      "Durable en uso mixto — aguanta toda la temporada",
      "Diseño Molten inconfundible — fácil de seguir en movimiento",
    ],
    contras: [
      "Precio ligeramente elevado para ser un composite",
      "En cemento duro se desgasta antes de lo esperado",
      "Menos disponible en tiendas físicas españolas que Wilson",
    ],
    veredicto: "8.5/10 para uso mixto serio. El mejor composite del mercado. Si juegas en ligas locales con pistas variables, el Molten BG3800 es la opción más inteligente.",
    imagen_principal: "/balls/molten-bg3800.webp",
    tags: ["hybrid", "composite", "molten", "liga-local", "versatil"],
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=molten+bg3800+baloncesto&tag=canchazapa-21", precio_actual: 65, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
    ],
    ultima_actualizacion: "2026-05-27",
  },

  {
    id: "decathlon-tarmak-r100",
    slug: "decathlon-tarmak-r100",
    marca: "Decathlon",
    modelo: "Tarmak R100",
    año_lanzamiento: 2022,
    terreno: "hybrid",
    material: "composite",
    talla_principal: 7,
    tallas_disponibles: [5, 6, 7],
    precio_msrp_eur: 20,
    puntuaciones: {
      grip: 7,
      durabilidad: 8,
      rebote: 7,
      control: 7,
    },
    resumen: "El balón de Decathlon más accesible. Composite básico que aguanta exterior con uso moderado e interior sin problemas. Para jugadores que empiezan o que no quieren arriesgarse con un balón caro. La opción más accesible del catálogo.",
    pros: [
      "El más barato del catálogo con calidad aceptable",
      "Disponible en Decathlon España — entrega rápida y devolución fácil",
      "Tallas 5, 6 y 7 — perfecto para familias y equipos junior",
      "Composite suficiente para uso casual indoor y outdoor suave",
    ],
    contras: [
      "El composite menos premium del catálogo",
      "En cemento duro se desgasta en 2-3 meses de uso intensivo",
      "Grip por debajo de los composites de gama media",
    ],
    veredicto: "7.0/10 para iniciación y uso casual. El balón para el padre que quiere uno decente para jugar con su hijo sin gastarse una fortuna. Solo en Decathlon — no lo encontrarás en Amazon.",
    imagen_principal: "/balls/decathlon-tarmak-r100.webp",
    tags: ["hybrid", "composite", "decathlon", "precio-calidad", "iniciacion", "junior"],
    links_compra: [
      { tienda: "decathlon", url: "https://www.awin1.com/cread.php?awinmid=105405&awinaffid=2908587&ued=https%3A%2F%2Fwww.decathlon.es%2Fes%2Fp%2Fbalon-de-baloncesto-talla-7-tarmak-r100-naranja-perfecto-para-iniciarte%2F306440%2Fc197m8547127", precio_actual: 20, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-31" },
    ],
    ultima_actualizacion: "2026-05-31",
  },

  // ─── OUTDOOR / GOMA ───────────────────────────────────────────────────────

  {
    id: "wilson-forge",
    slug: "wilson-forge",
    marca: "Wilson",
    modelo: "Forge",
    año_lanzamiento: 2019,
    terreno: "outdoor",
    material: "rubber",
    talla_principal: 7,
    tallas_disponibles: [5, 6, 7],
    precio_msrp_eur: 35,
    puntuaciones: {
      grip: 7,
      durabilidad: 10,
      rebote: 8,
      control: 7,
    },
    resumen: "El balón de cemento más durable del catálogo. Goma vulcanizada de alta densidad diseñada específicamente para asfalto — aguanta temporadas enteras de uso intensivo sin pelarse. No tiene el tacto de un composite, pero tampoco se rompe. El balón para el jugador de calle que quiere algo que dure.",
    pros: [
      "El más durable del catálogo — aguanta años en cemento",
      "Precio muy accesible para la calidad que ofrece",
      "Rebote consistente incluso en superficies irregulares",
      "Grip aceptable incluso en días de lluvia leve",
    ],
    contras: [
      "Tacto de goma — muy diferente al cuero o composite",
      "Más pesado que composites de la misma talla",
      "No apto para pista interior — raya el parquet",
    ],
    veredicto: "9.0/10 para cemento. Si juegas en exterior 3+ veces por semana, el Wilson Forge es la inversión más inteligente que puedes hacer. No hay nada más durable en su rango de precio.",
    imagen_principal: "/balls/wilson-forge.webp",
    tags: ["outdoor", "goma", "cemento", "durable", "calle", "precio-calidad"],
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=wilson+forge+outdoor+basketball&tag=canchazapa-21", precio_actual: 35, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
      { tienda: "decathlon", url: "https://www.awin1.com/cread.php?awinmid=105405&awinaffid=2908587&ued=https%3A%2F%2Fwww.decathlon.es%2Fes%2Fsearch%3FNtt%3Dwilson%2Bforge", precio_actual: 35, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
    ],
    ultima_actualizacion: "2026-05-27",
  },

  {
    id: "spalding-streetball",
    slug: "spalding-streetball",
    marca: "Spalding",
    modelo: "Streetball",
    año_lanzamiento: 2005,
    terreno: "outdoor",
    material: "rubber",
    talla_principal: 7,
    tallas_disponibles: [5, 6, 7],
    precio_msrp_eur: 30,
    puntuaciones: {
      grip: 8,
      durabilidad: 9,
      rebote: 8,
      control: 7,
    },
    resumen: "El clásico del streetball. Canales extra profundos para mejor agarre en condiciones de calle — sudor, polvo, superficies irregulares. Goma reforzada que aguanta los abusos del asfalto. Es el balón más vendido en pistas de barrio de toda España por una razón: funciona.",
    pros: [
      "Canales más profundos del catálogo — grip excelente para un rubber",
      "Ideal para condiciones de calle: calor, polvo, superficies irregulares",
      "El más barato del catálogo con calidad real",
      "El balón de barrio más reconocible — todo el mundo lo conoce",
    ],
    contras: [
      "Rebote menos preciso que composites en superficies planas",
      "Tacto de goma puro — no simula el tacto de competición",
      "No apto para interior",
    ],
    veredicto: "8.5/10 para streetball y exterior duro. El rey de la pista de barrio. Si tu cancha tiene grietas, polvo y jugáis con cualquier tiempo, el Spalding Streetball es el más fiable.",
    imagen_principal: "/balls/spalding-streetball.webp",
    tags: ["outdoor", "goma", "cemento", "streetball", "calle", "barrio"],
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=spalding+streetball+baloncesto&tag=canchazapa-21", precio_actual: 30, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
    ],
    ultima_actualizacion: "2026-05-27",
  },

  {
    id: "molten-xb",
    slug: "molten-xb",
    marca: "Molten",
    modelo: "XB",
    año_lanzamiento: 2018,
    terreno: "outdoor",
    material: "rubber",
    talla_principal: 7,
    tallas_disponibles: [5, 6, 7],
    precio_msrp_eur: 28,
    puntuaciones: {
      grip: 7,
      durabilidad: 9,
      rebote: 9,
      control: 7,
    },
    resumen: "El rubber de Molten — la misma consistencia de rebote que caracteriza a la marca, en goma dura para exterior. Más barato que el BG3800 y más durable en cemento. El favorito para entrenamientos de equipos en pistas mixtas donde no puedes arriesgar un balón de cuero.",
    pros: [
      "Rebote Molten: el más consistente del catálogo outdoor",
      "El más barato del catálogo — precio de iniciación",
      "Buena durabilidad en cemento",
      "Disponible en tallas 5, 6 y 7",
    ],
    contras: [
      "Grip inferior al Spalding Streetball en superficie mojada",
      "Tacto rígido — necesita rodaje",
      "Diseño menos reconocible que Wilson o Spalding",
    ],
    veredicto: "7.5/10 para exterior. La opción económica de Molten — buena calidad de rebote a precio de entrada. Perfecto para entrenamiento o para equipos que necesitan varios balones sin arruinarse.",
    imagen_principal: "/balls/molten-xb.webp",
    tags: ["outdoor", "goma", "cemento", "molten", "iniciacion", "entrenamiento"],
    links_compra: [
      { tienda: "amazon_es", url: "https://www.amazon.es/s?k=molten+xb+outdoor+basketball&tag=canchazapa-21", precio_actual: 28, disponible: true, tiene_afiliado: true, ultima_verificacion: "2026-05-27" },
    ],
    ultima_actualizacion: "2026-05-27",
  },

];

// Helpers
export function getBalonBySlug(slug: string): Balon | undefined {
  return balones.find(b => b.slug === slug);
}

export function getBalonesBy(terreno?: Terreno, material?: MaterialBalon): Balon[] {
  return balones.filter(b =>
    (!terreno || b.terreno === terreno) &&
    (!material || b.material === material)
  );
}

export function scoreBalon(b: Balon): number {
  const v = Object.values(b.puntuaciones);
  return Math.round((v.reduce((a, x) => a + x, 0) / v.length) * 10) / 10;
}
