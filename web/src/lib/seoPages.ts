import type { Zapatilla } from "./types";

// ─────────────────────────────────────────────────────────────────────
// Config para páginas SEO long-tail.
// Cada entry genera una página estática en /<slug>.
//
// Editorial: las 20 páginas siguen una estructura idéntica para mantener
// la coherencia visual; lo que varía es el filtro/orden, el copy, y las FAQ.
// ─────────────────────────────────────────────────────────────────────

type Sort = (a: Zapatilla, b: Zapatilla) => number;

export interface SeoPage {
  slug: string;
  // SEO
  title: string;
  description: string;
  // Hero
  eyebrow: string;
  h1Pre: string;
  h1Accent: string;
  h1Post?: string;
  lede: string;
  // Filter + sort para el top 5
  filter: (z: Zapatilla) => boolean;
  sort: Sort;
  // Editorial: cómo elegir
  guideTitle: string;
  guideIntro: string;
  guidePoints: { lab: string; body: string }[];
  // FAQ (con schema FAQPage)
  faqs: { q: string; a: string }[];
  // Internal linking
  related: string[]; // slugs to other seo pages
  // Link al catálogo prefiltrado
  catalogQuery: string;
  catalogLabel: string;
}

// ── Helpers de score ─────────────────────────────────────────────────
function avg(z: Zapatilla): number {
  const v = Object.values(z.puntuaciones);
  return v.reduce((a, b) => a + b, 0) / v.length;
}
function lowestPrice(z: Zapatilla): number {
  const ps = z.links_compra
    .filter((l) => l.disponible)
    .map((l) => l.precio_actual);
  return ps.length > 0 ? Math.min(...ps) : z.precio_msrp_eur;
}

const byScoreDesc: Sort = (a, b) => avg(b) - avg(a);
const byPriceAsc: Sort = (a, b) => lowestPrice(a) - lowestPrice(b);
const byPriceDesc: Sort = (a, b) => lowestPrice(b) - lowestPrice(a);

// Composable: ordena primero por X, desempata por score
const byThenScore = (primary: Sort): Sort => (a, b) => {
  const p = primary(a, b);
  return p !== 0 ? p : byScoreDesc(a, b);
};

// ─────────────────────────────────────────────────────────────────────
// 1) POSICIÓN (5)
// ─────────────────────────────────────────────────────────────────────
const posicion = (
  pos: Zapatilla["ideal_para"]["posiciones"][number],
  human: string,
  humanPlural: string,
  posMeta: { eyebrow: string; lede: string; intro: string; points: { lab: string; body: string }[]; faqs: { q: string; a: string }[] }
): SeoPage => ({
  slug: `mejor-zapatilla-${pos}`,
  title: `Mejor zapatilla de baloncesto para ${humanPlural} | CANCHA.ZAPA`,
  description: `Las 5 mejores zapatillas de baloncesto para ${humanPlural}. Análisis técnico, precio verificado y veredicto honesto. Sin BS.`,
  eyebrow: posMeta.eyebrow,
  h1Pre: "Mejor zapatilla",
  h1Accent: `para ${humanPlural}`,
  h1Post: "",
  lede: posMeta.lede,
  filter: (z) => z.ideal_para.posiciones.includes(pos),
  sort: byScoreDesc,
  guideTitle: `Cómo elegir zapa para ${human}`,
  guideIntro: posMeta.intro,
  guidePoints: posMeta.points,
  faqs: posMeta.faqs,
  related: [],
  catalogQuery: `?posicion=${pos}`,
  catalogLabel: `Ver todas las zapatillas para ${humanPlural}`,
});

// ─────────────────────────────────────────────────────────────────────
// 2) CANCHA (2)
// ─────────────────────────────────────────────────────────────────────
const cancha = (
  variant: "outdoor" | "indoor",
  cfg: { humanPlural: string; eyebrow: string; lede: string; intro: string; points: { lab: string; body: string }[]; faqs: { q: string; a: string }[]; filter: (z: Zapatilla) => boolean; sort: Sort; catalogQuery: string }
): SeoPage => ({
  slug: `zapatillas-${variant}`,
  title: `Las mejores zapatillas de baloncesto para ${cfg.humanPlural} | CANCHA.ZAPA`,
  description: `Top 5 zapatillas de baloncesto para ${cfg.humanPlural}. Tracción, durabilidad y precio verificado.`,
  eyebrow: cfg.eyebrow,
  h1Pre: "Zapatillas para",
  h1Accent: cfg.humanPlural,
  h1Post: "",
  lede: cfg.lede,
  filter: cfg.filter,
  sort: cfg.sort,
  guideTitle: `Cómo elegir zapa de ${variant}`,
  guideIntro: cfg.intro,
  guidePoints: cfg.points,
  faqs: cfg.faqs,
  related: [],
  catalogQuery: cfg.catalogQuery,
  catalogLabel: `Ver catálogo filtrado por ${variant}`,
});

// ─────────────────────────────────────────────────────────────────────
// 3) CATEGORÍA (4)
// ─────────────────────────────────────────────────────────────────────
const categoria = (
  catKey: Zapatilla["categoria_principal"],
  cfg: { humanPlural: string; eyebrow: string; lede: string; intro: string; points: { lab: string; body: string }[]; faqs: { q: string; a: string }[] }
): SeoPage => ({
  slug: `zapatillas-${catKey === "cushion-focused" ? "cushion" : catKey === "responsive" ? "reactivas" : catKey === "traction-king" ? "traccion" : "equilibradas"}`,
  title: `Zapatillas de baloncesto ${cfg.humanPlural} | CANCHA.ZAPA`,
  description: `Las 5 mejores zapatillas de baloncesto ${cfg.humanPlural}. Análisis técnico, precio verificado.`,
  eyebrow: cfg.eyebrow,
  h1Pre: "Zapatillas",
  h1Accent: cfg.humanPlural,
  h1Post: "",
  lede: cfg.lede,
  filter: (z) => z.categoria_principal === catKey,
  sort: byScoreDesc,
  guideTitle: `Cómo elegir una zapa ${cfg.humanPlural}`,
  guideIntro: cfg.intro,
  guidePoints: cfg.points,
  faqs: cfg.faqs,
  related: [],
  catalogQuery: `?categoria=${catKey}`,
  catalogLabel: `Ver todas las zapatillas ${cfg.humanPlural}`,
});

// ─────────────────────────────────────────────────────────────────────
// 4) PRESUPUESTO (3)
// ─────────────────────────────────────────────────────────────────────
const presupuesto = (
  slug: string,
  cfg: { title: string; description: string; eyebrow: string; h1Pre: string; h1Accent: string; lede: string; intro: string; points: { lab: string; body: string }[]; faqs: { q: string; a: string }[]; filter: (z: Zapatilla) => boolean; sort: Sort; catalogQuery: string; catalogLabel: string }
): SeoPage => ({
  slug,
  ...cfg,
  guideTitle: "Cómo gastar bien tu presupuesto",
  guidePoints: cfg.points,
  guideIntro: cfg.intro,
  related: [],
});

// ─────────────────────────────────────────────────────────────────────
// 5) LESIONES (3)
// ─────────────────────────────────────────────────────────────────────
const lesion = (
  slug: string,
  cfg: { title: string; description: string; eyebrow: string; h1Pre: string; h1Accent: string; lede: string; intro: string; points: { lab: string; body: string }[]; faqs: { q: string; a: string }[]; filter: (z: Zapatilla) => boolean; sort: Sort; catalogQuery: string; catalogLabel: string }
): SeoPage => ({
  slug,
  ...cfg,
  guideTitle: "Cómo elegir si tienes este problema",
  guidePoints: cfg.points,
  guideIntro: cfg.intro,
  related: [],
});

// ─────────────────────────────────────────────────────────────────────
// 6) MARCA (3)
// ─────────────────────────────────────────────────────────────────────
const marca = (
  marcaKey: string,
  cfg: { title: string; description: string; eyebrow: string; lede: string; intro: string; points: { lab: string; body: string }[]; faqs: { q: string; a: string }[] }
): SeoPage => ({
  slug: `mejores-zapatillas-${marcaKey.toLowerCase().replace(/\s+/g, "-")}`,
  title: cfg.title,
  description: cfg.description,
  eyebrow: cfg.eyebrow,
  h1Pre: "Mejores zapatillas",
  h1Accent: marcaKey,
  h1Post: "",
  lede: cfg.lede,
  filter: (z) => z.marca.toLowerCase() === marcaKey.toLowerCase(),
  sort: byScoreDesc,
  guideTitle: `Cómo es la oferta de ${marcaKey}`,
  guideIntro: cfg.intro,
  guidePoints: cfg.points,
  faqs: cfg.faqs,
  related: [],
  catalogQuery: `?marca=${encodeURIComponent(marcaKey)}`,
  catalogLabel: `Ver todas las zapatillas ${marcaKey}`,
});

// ─────────────────────────────────────────────────────────────────────
// CONFIG — 20 páginas
// ─────────────────────────────────────────────────────────────────────
export const SEO_PAGES: SeoPage[] = [
  // ── POSICIÓN ────────────────────────────────────────────────────────
  posicion("base", "base", "bases", {
    eyebrow: "★ Por posición · Base",
    lede: "Para un base, la zapa pesa cada microsegundo. Reactividad, ligereza y tracción precisa son los tres ejes que importan. Te las ordenamos según puntuación técnica real, no por comisión.",
    intro: "Un base mete cambios de dirección cada 4 segundos y necesita sentir el suelo. Lo que cuenta es que la zapa te responda en el primer paso y agarre cuando frenas. Eso se traduce en tres atributos: respuesta, ligereza y tracción.",
    points: [
      { lab: "Prioriza respuesta", body: "Score 8+ en respuesta. Si la zapa amortigua demasiado pierdes el primer paso." },
      { lab: "Ligereza importa", body: "Bajo 380g idealmente. Cada 50g extra se notan en los últimos 5 minutos." },
      { lab: "Low o mid altura", body: "Las high-tops bloquean tobillo pero limitan la velocidad. Para base, low/mid casi siempre." },
      { lab: "Cushion equilibrado", body: "No exageres con el cushion. Court feel es más importante que protección máxima." },
    ],
    faqs: [
      { q: "¿Cuál es la mejor zapatilla de baloncesto para un base?",
        a: "Las que combinan respuesta 8+ con ligereza por debajo de 380g. Modelos top: Nike GT Cut 3, Anta KAI 1 Speed, UA Curry 12. Lo que tienen en común es court feel premium y peso bajo." },
      { q: "¿Mejor low-top o mid-top para bases?",
        a: "Low-top en la mayoría de casos. Solo sube a mid si tienes historial de esguinces de tobillo. La ganancia de soporte no compensa la velocidad perdida si tu tobillo está sano." },
      { q: "¿Cuánto debe pesar una zapa de base?",
        a: "Idealmente entre 320-380g en talla US 9. Más allá empieza a notarse en partidos largos." },
      { q: "¿Sirven las low-tops para asfalto?",
        a: "Algunas sí. Mira la durabilidad outdoor (score ≥ 7). La GT Cut 3 está fina; la KAI 1 Speed o la Curry 11 aguantan mejor." },
    ],
  }),

  posicion("escolta", "escolta", "escoltas", {
    eyebrow: "★ Por posición · Escolta",
    lede: "El escolta combina movimiento sin balón y tiro. Necesitas estabilidad lateral cuando frenas para el tiro y respuesta para los cortes. Estas 5 son las que mejor cumplen.",
    intro: "El escolta es el más versátil: corre sin balón, frena en seco, dispara, defiende a un rival rápido. La zapa tiene que hacer un poco de todo sin destacar en nada concreto.",
    points: [
      { lab: "Estabilidad lateral", body: "Score 7+ en soporte lateral. Frenas en seco mucho y no quieres rodar el tobillo." },
      { lab: "Respuesta media-alta", body: "Score 7-8 en respuesta. Suficiente para cortes, no tan extrema como para un base puro." },
      { lab: "Mid-tops funcionan", body: "El escolta ya puede usar mid-tops sin penalizar mucho la velocidad." },
      { lab: "Tracción consistente", body: "Frenos rápidos = necesitas patrón de suela que no resbale en parquet pulido." },
    ],
    faqs: [
      { q: "¿Qué diferencia hay entre zapa de base y de escolta?",
        a: "Mínima en realidad. El escolta puede permitirse algo más de cushion y altura mid sin penalizar tanto su juego. Si dudas entre una y otra, ve a por la del escolta." },
      { q: "¿Buena zapa para tiradores?",
        a: "Para tiradores puros: Kobe 8 Protro, Curry 12, GT Cut 3. Todas con respuesta alta y court feel premium para sentir cuando plantas el pie antes del tiro." },
      { q: "¿Vale la Curry para alguien que no es tirador?",
        a: "Sí, pero asume que su gracia está en el court feel. Si pesas >85kg o eres potente, búscate otra." },
    ],
  }),

  posicion("alero", "alero", "aleros", {
    eyebrow: "★ Por posición · Alero",
    lede: "El alero juega de todo: defiende a un base y al pívot el mismo partido. Necesita la zapa más equilibrada del mercado — sin puntos flojos, sin extremos.",
    intro: "El alero moderno (Tatum, Brown, Mikal Bridges) defiende posiciones 1-4 y mete cortes, tiros y contactos. La zapa tiene que ser equilibrada. Si destaca solo en cushion o solo en respuesta, te falla en la otra mitad del partido.",
    points: [
      { lab: "Equilibrio sobre extremos", body: "Score medio 7+ en respuesta, cushion, soporte lateral, estabilidad. Nada bajo 6." },
      { lab: "Mid-top óptimo", body: "Mid es el sweet spot — suficiente soporte sin perder movilidad." },
      { lab: "Cushion medio", body: "Necesitas algo de protección porque defiendes contra pívots, pero no exageres." },
      { lab: "Versatilidad de superficie", body: "Mira durabilidad ≥ 6 — el alero acaba jugando en cualquier sitio." },
    ],
    faqs: [
      { q: "¿Qué es una zapa equilibrada?",
        a: "La que no destaca en nada pero no falla en nada. Score 6-8 en todos los ejes. Ejemplos: Jordan Tatum 3, Adidas Harden Vol 9, Nike Sabrina 2." },
      { q: "¿La Jordan Tatum es buena para aleros?",
        a: "Sí, es probablemente la más recomendada para alero por su equilibrio. Cushion + respuesta + soporte sin extremos." },
      { q: "¿High-top tiene sentido para un alero?",
        a: "Solo si juegas físico y defiendes a pívots regularmente. Si no, mid es más versátil." },
    ],
  }),

  posicion("ala-pivot", "ala-pívot", "ala-pívots", {
    eyebrow: "★ Por posición · Ala-pívot",
    lede: "El 4 moderno corre, salta, defiende fuera y dentro. Necesitas cushion para los aterrizajes y estabilidad para los contactos en la pintura.",
    intro: "El ala-pívot es la posición que más castiga la zapa. Saltas más que un base, recibes contactos como un pívot, y encima te toca defender el perímetro. Cushion y estabilidad son innegociables.",
    points: [
      { lab: "Cushion 7+", body: "Aterrizajes constantes en el rebote y el bloqueo. Las rodillas te lo agradecen." },
      { lab: "Estabilidad alta", body: "Score 8+ en estabilidad. La base debe ser ancha para los contactos laterales." },
      { lab: "Soporte lateral fuerte", body: "Mid o high-top, según tu historial de tobillos." },
      { lab: "Peso razonable", body: "Sub-420g es lo ideal. Si vas a 450g, el último cuarto se hace eterno." },
    ],
    faqs: [
      { q: "¿Cushion o estabilidad — qué importa más para un 4?",
        a: "Ambas. Pero si tienes que elegir, estabilidad antes que cushion: una caída lateral hace más daño que un aterrizaje sin cushion." },
      { q: "¿Buena zapa para ala-pívot pesado?",
        a: "LeBron 22, Tatum 3, Adidas Harden Vol 9. Todas con cushion alto y base estable." },
      { q: "¿Aguantan el asfalto?",
        a: "La LeBron sí. La Tatum aguanta pero se gasta más rápido. Verifica el score de durabilidad outdoor por modelo." },
    ],
  }),

  posicion("pivot", "pívot", "pívots", {
    eyebrow: "★ Por posición · Pívot",
    lede: "Para un pívot, la zapa es protección antes que rendimiento. Necesitas el máximo cushion del mercado, estabilidad de tanque y soporte lateral en high-top.",
    intro: "Eres el más pesado, saltas más, recibes los contactos más fuertes. Si pesas >100kg, las zapas blandas se rompen en 3 meses. Necesitas lo más sólido del catálogo.",
    points: [
      { lab: "Cushion 8+ obligatorio", body: "Score mínimo 8. Lo ideal 9. Aquí no escatimes." },
      { lab: "Estabilidad 9+", body: "Base ancha. Sin tambaleo. Es lo que evita que aterrices torcido." },
      { lab: "High-top o mid-top alto", body: "Soporte lateral 8+. Tus tobillos cargan con todo." },
      { lab: "Durabilidad cuenta", body: "Suela gruesa. Las zapas reactivas se desintegran bajo tu peso en semanas." },
    ],
    faqs: [
      { q: "¿Cuál es la mejor zapatilla de baloncesto para pívots?",
        a: "Nike LeBron 22 es la referencia. Cushion 9, estabilidad 9, soporte 9. Si pesas >90kg, es lo más protector del mercado." },
      { q: "¿Sirven las low-tops para pívots?",
        a: "No. El soporte lateral es crítico para quien defiende en la pintura. Mid-top alto o high-top siempre." },
      { q: "¿Por qué pesan tanto las zapas de pívot?",
        a: "Porque tienen cushion masivo + refuerzos laterales. Es el trade-off. Si pesas 100kg, 30g extra de zapa no se notan; un esguince sí." },
    ],
  }),

  // ── CANCHA (2) ──────────────────────────────────────────────────────
  cancha("outdoor", {
    humanPlural: "asfalto",
    eyebrow: "★ Outdoor · Asfalto",
    lede: "Asfalto se come zapas en meses. Estas 5 sobreviven. Score de durabilidad outdoor 7+ y tracción consistente fuera del parquet.",
    intro: "El asfalto es brutal con la suela. Lo que dura 2 años en interior dura 3 meses fuera. Mira solo dos cosas: durabilidad outdoor y tracción. El resto da igual si la suela se va.",
    points: [
      { lab: "Durabilidad ≥ 7", body: "Es el filtro principal. Bajo 7 ni te molestes." },
      { lab: "Goma maciza > XDR", body: "Las suelas XDR de Nike son válidas; las gomas normales (Adidas, Decathlon) suelen aguantar más." },
      { lab: "Patrón profundo", body: "Surcos profundos = más material que gastar antes de quedarte sin grip." },
      { lab: "Tracción 7+ en exterior", body: "Algunas zapas indoor patinan en cemento. Verifica que su tracción está testeada outdoor también." },
    ],
    faqs: [
      { q: "¿Qué zapatillas duran en asfalto?",
        a: "Las que tienen score de durabilidad outdoor 7+. Top: Anta KAI 1 Speed, Adidas Cross 'Em Up Select, Nike Precision 7, Tarmak Voltzy 500." },
      { q: "¿Cuánto duran las zapas en asfalto?",
        a: "Depende del modelo. Una zapa premium con suela XDR: 6-12 meses. Una zapa standard sin XDR: 2-4 meses. Una zapa reactiva (Curry, GT Cut): 1-3 meses." },
      { q: "¿Vale la pena comprar caro para outdoor?",
        a: "No. Las mejores outdoor cuestan 60-130€. La diferencia entre ese rango y los 200€ se la come el asfalto antes de notarla." },
    ],
    filter: (z) => z.puntuaciones.durabilidad_outdoor >= 7,
    sort: byThenScore((a, b) => b.puntuaciones.durabilidad_outdoor - a.puntuaciones.durabilidad_outdoor),
    catalogQuery: "?cancha=exterior",
  }),

  cancha("indoor", {
    humanPlural: "pista cubierta",
    eyebrow: "★ Indoor · Parquet",
    lede: "Parquet limpio = máxima tracción y court feel. Sin la preocupación del asfalto, puedes ir a la zapa premium que mejor te encaje.",
    intro: "Indoor permite cualquier construcción de suela. La goma indoor es más blanda (mejor tracción) pero se gasta rápido fuera. Si juegas 100% interior, prioriza tracción y court feel, no durabilidad.",
    points: [
      { lab: "Tracción 8+", body: "El parquet pulido te perdona menos. Score 8+ en tracción asegura que no patines en frenos." },
      { lab: "Court feel premium", body: "Si juegas interior, mereces sentir el suelo. Respuesta 7+." },
      { lab: "Cushion según peso", body: "Tu posición y peso definen cuánto cushion. No es función del suelo." },
      { lab: "Ventilación importa", body: "Pabellón cerrado, pies sudados. Ventilación 6+ marca diferencia en partidos largos." },
    ],
    faqs: [
      { q: "¿Qué zapa tiene la mejor tracción indoor?",
        a: "Nike Kobe 8 Protro y Nike GT Cut 3 son referencia. Patrón herringbone clásico que agarra en parquet limpio sin patinar." },
      { q: "¿Puedo usar zapas de outdoor en pista cubierta?",
        a: "Sí, pero pierdes court feel. La goma outdoor es más gruesa y rígida. Funciona, pero no sacarás el máximo." },
      { q: "¿Por qué resbalan las zapas indoor?",
        a: "Polvo en el patrón de suela. Limpia la suela cada 2-3 partidos con un trapo húmedo. El 90% de los problemas de tracción son polvo, no la zapa." },
    ],
    filter: (z) => z.puntuaciones.traccion >= 7,
    sort: byThenScore((a, b) => b.puntuaciones.traccion - a.puntuaciones.traccion),
    catalogQuery: "?cancha=interior",
  }),

  // ── CATEGORÍA (4) ───────────────────────────────────────────────────
  categoria("cushion-focused", {
    humanPlural: "con más cushion",
    eyebrow: "★ Categoría · Cushion",
    lede: "Si pesas más de 85kg, tienes molestias de rodilla, o simplemente quieres aterrizar suave — estas 5 priorizan amortiguación sobre todo lo demás.",
    intro: "Cushion (amortiguación) protege rodillas, fascia y columna. Las zapas cushion-focused añaden hasta 80g extra pero te ahorran lesiones. Para pívots y jugadores >85kg, no es opcional.",
    points: [
      { lab: "Cushion 8+", body: "Score mínimo. Bajo 8 ya no es \"cushion-focused\"." },
      { lab: "Espumas premium", body: "Air Zoom, Boost, ZoomX, Cushlon — son la diferencia entre proteger y solo amortiguar." },
      { lab: "Peso más alto", body: "Asume 400-450g. Es el precio de la protección." },
      { lab: "Court feel reducido", body: "No sientes el suelo igual. Trade-off necesario." },
    ],
    faqs: [
      { q: "¿Qué zapa tiene más cushion del mercado?",
        a: "Nike LeBron 22 con doble cámara Air Max + Zoom. Score 9/10. New Balance Fresh Foam BB v3 le sigue muy de cerca." },
      { q: "¿Cushion alto sirve para guards rápidos?",
        a: "No. Pierdes court feel y velocidad. Para guards, prioriza respuesta sobre cushion." },
      { q: "¿Cuándo el cushion es demasiado?",
        a: "Cuando sientes que la zapa se hunde y rebota lento. Pasa con zapas tipo Hyperdunk de hace 5 años. Las modernas (Zoom Strobel, Bounce Pro) responden mejor." },
    ],
  }),

  categoria("responsive", {
    humanPlural: "reactivas",
    eyebrow: "★ Categoría · Reactivas",
    lede: "Reactivas = court feel premium + primer paso explosivo. Para guards, escoltas y cualquiera que viva en el corte.",
    intro: "Las zapas reactivas reducen al máximo el material entre tu pie y el suelo. Sientes cada cambio de dirección. A cambio: menos cushion, menos durabilidad outdoor.",
    points: [
      { lab: "Respuesta 8+", body: "Score mínimo. Court feel es el motivo de comprarla." },
      { lab: "Peso bajo", body: "Idealmente sub-360g. Cuanto más ligera, más reactiva." },
      { lab: "Tracción 8+", body: "La velocidad sin tracción no sirve. Verifica patrón herringbone o similar." },
      { lab: "No para outdoor", body: "La suela se desintegra en asfalto. Indoor only." },
    ],
    faqs: [
      { q: "¿Qué es una zapa reactiva?",
        a: "Una construida para máxima respuesta del suelo: poco material entre pie y cancha, espuma firme, suela fina. Sientes cada paso." },
      { q: "¿Para quién son las zapas reactivas?",
        a: "Para guards y escoltas que necesitan primer paso y court feel. Para pívots o jugadores >85kg, no — no protegen lo suficiente." },
      { q: "¿Aguantan asfalto?",
        a: "Mal. La GT Cut 3 dura 2-3 meses outdoor; la Curry 12 igual. Si juegas fuera, no es la categoría para ti." },
    ],
  }),

  categoria("balanced", {
    humanPlural: "equilibradas",
    eyebrow: "★ Categoría · Equilibradas",
    lede: "Sin punto flojo, sin extremos. Si dudas qué comprar y no te identificas con un perfil claro, una equilibrada es la apuesta segura.",
    intro: "\"Equilibrada\" no es \"mediocre\". Es la zapa que hace bien todo sin destacar en nada. Para el 60% de jugadores, es la categoría correcta — solo que no es la más sexy.",
    points: [
      { lab: "Todos los ejes ≥ 6", body: "Sin agujeros. Nada bajo 6 en ningún atributo." },
      { lab: "Score medio 7+", body: "La media tiene que ser alta aunque ningún eje destaque." },
      { lab: "Versatilidad de superficie", body: "Suelen aguantar bien indoor + outdoor mezclado." },
      { lab: "Precio razonable", body: "100-150€ típicamente. La premium no se justifica si no priorizas un eje." },
    ],
    faqs: [
      { q: "¿Es \"equilibrada\" lo mismo que \"todoterreno\"?",
        a: "Sí, en gran medida. Las equilibradas aguantan cualquier cancha y cualquier estilo de juego sin destacar en ninguno." },
      { q: "¿Mejor zapa equilibrada del momento?",
        a: "Jordan Tatum 3 y Adidas Harden Vol 9. Ambas con score 7+ en cada atributo, sin extremos." },
      { q: "¿Vale para mí si no sé qué soy?",
        a: "Probablemente sí. Si no tienes preferencia clara entre cushion / respuesta / tracción, una equilibrada nunca te decepciona." },
    ],
  }),

  categoria("traction-king", {
    humanPlural: "con mejor tracción",
    eyebrow: "★ Categoría · Tracción",
    lede: "Tracción king: las que agarran como velcro. Para quien frena en seco y odia patinar — en parquet o asfalto.",
    intro: "Tracción es el atributo más infravalorado. Una zapa que patina es una zapa peligrosa. Estas 5 tienen score 8+ y patrones probados en condiciones reales.",
    points: [
      { lab: "Tracción 8+", body: "Score mínimo. Bajo 8 ya no compite con esta categoría." },
      { lab: "Patrón herringbone", body: "Sigue siendo el rey. Otros patrones (radial, multidireccional) funcionan pero el herringbone es la apuesta segura." },
      { lab: "Limpieza frecuente", body: "Incluso la mejor tracción patina con polvo. Limpia cada 2-3 partidos." },
      { lab: "Duración variable", body: "Tracción no es igual a durabilidad. Una zapa puede agarrar muy bien y gastarse rápido." },
    ],
    faqs: [
      { q: "¿Qué zapa agarra mejor en parquet?",
        a: "Nike Kobe 8 Protro y Anta KAI 1 Speed. Ambas con score 9/10 en tracción y patrón herringbone profundo." },
      { q: "¿Por qué patinan las zapas nuevas?",
        a: "A veces traen una capa de fábrica que se quita con uso. 2-3 partidos y normaliza. Si sigue patinando, es polvo en suela." },
      { q: "¿Buena tracción outdoor es lo mismo?",
        a: "No. Tracción indoor (sobre parquet) y outdoor (sobre asfalto) son distintas. Verifica el atributo específico de cada zapa." },
    ],
  }),

  // ── PRESUPUESTO (3) ─────────────────────────────────────────────────
  presupuesto("zapatillas-baloncesto-baratas", {
    title: "Zapatillas de baloncesto baratas (bajo 80€) | CANCHA.ZAPA",
    description: "Las 5 mejores zapatillas de baloncesto por menos de 80€. Análisis técnico sin BS, precio verificado.",
    eyebrow: "★ Presupuesto · Bajo 80€",
    h1Pre: "Mejores zapatillas",
    h1Accent: "baratas",
    lede: "Sub-80€ no significa malas. Estas 5 cumplen y se notan. Sin marketing, solo lo que aguanta y agarra por el precio.",
    intro: "Por debajo de 80€ pierdes algunas cosas: las espumas premium (Air Zoom, Boost), los uppers de tejido avanzado. Pero ganas en relación calidad-precio. Y un junior o jugador recreativo no necesita lo demás.",
    points: [
      { lab: "Decathlon es rey", body: "Tarmak Voltzy 500 (~50€) supera en outdoor a muchas de 150€. Sin broma." },
      { lab: "Modelos antiguos descontados", body: "La Curry 10 en outlet a 60€ es mejor que cualquier zapa nueva de 80€." },
      { lab: "Asume sin tope-de-gama", body: "Cushion básico, materiales sintéticos. Está bien, solo gestiona expectativas." },
      { lab: "Lo que NO compres", body: "Marcas blancas sin tracción testeada. Mejor un modelo antiguo de marca conocida." },
    ],
    faqs: [
      { q: "¿Hay zapas de baloncesto buenas por menos de 50€?",
        a: "Sí. Tarmak Voltzy 500 (~50€), Adidas Ownthegame 2.0 (~55€). Son básicas pero cumplen para recreativo o junior." },
      { q: "¿Vale la pena gastar más de 80€?",
        a: "Depende. Si juegas federado 2+ veces por semana, los 100-130€ se justifican (cushion + tracción premium). Para recreativo casual, sub-80€ sobra." },
      { q: "¿Las baratas duran menos?",
        a: "No necesariamente. Las Voltzy 500 duran más en asfalto que muchas premium. La durabilidad depende del modelo, no del precio." },
    ],
    filter: (z) => lowestPrice(z) < 80,
    sort: byThenScore(byPriceAsc),
    catalogQuery: "?precio_max=80",
    catalogLabel: "Ver todas bajo 80€",
  }),

  presupuesto("zapatillas-baloncesto-130-euros", {
    title: "Zapatillas de baloncesto entre 80€ y 130€ | CANCHA.ZAPA",
    description: "Mejores zapatillas de baloncesto en el rango 80-130€. El sweet spot calidad-precio.",
    eyebrow: "★ Presupuesto · 80-130€",
    h1Pre: "Zapatillas",
    h1Accent: "mid-range",
    lede: "El sweet spot. Entre 80€ y 130€ tienes acceso a las espumas y tracciones premium sin pagar el sobreprecio de la línea signature.",
    intro: "Este rango es donde las marcas meten su tecnología principal sin el premium del nombre del jugador. Cushion competitivo, materiales decentes, buena durabilidad.",
    points: [
      { lab: "Modelos 'team'", body: "Las versiones non-signature suelen estar aquí: Adidas Trae Young 3, Nike Ja 2." },
      { lab: "Compras anteriores en outlet", body: "Una Curry 11 a 110€ es mejor que una Curry 12 a 160€ si te apañas con un año menos de tecnología." },
      { lab: "Tope para amateurs", body: "Salvo que juegues 4+ veces por semana o federado serio, no necesitas más." },
      { lab: "Cuidado con descatalogados", body: "Si la encuentras en mid-range pero es de hace 3 años, verifica que la suela no esté reseca." },
    ],
    faqs: [
      { q: "¿Cuánto debo gastar en zapas de baloncesto?",
        a: "Si juegas recreativo: 50-80€. Federado amateur: 80-130€. Federado serio: 130-200€. Más allá es vanidad o necesidad muy específica." },
      { q: "¿Mejores zapas por 100€?",
        a: "Adidas Trae Young 3 (~110€), Nike Ja 2 (~99€), Puma MB.04 (~120€), Anta KAI 1 Speed (~99€). Las 4 tienen score 7+." },
      { q: "¿Vale más una zapa cara o el cuidado?",
        a: "El cuidado. Una zapa de 100€ bien cuidada dura más que una de 200€ abandonada. Limpia la suela, alterna pares si juegas mucho." },
    ],
    filter: (z) => { const p = lowestPrice(z); return p >= 80 && p <= 130; },
    sort: byScoreDesc,
    catalogQuery: "?precio_min=80&precio_max=130",
    catalogLabel: "Ver todas entre 80€ y 130€",
  }),

  presupuesto("zapatillas-baloncesto-premium", {
    title: "Zapatillas de baloncesto premium (+130€) | CANCHA.ZAPA",
    description: "Top-of-the-line: las mejores zapatillas de baloncesto premium. Lo que vale el dinero y lo que no.",
    eyebrow: "★ Presupuesto · 130€+",
    h1Pre: "Zapatillas",
    h1Accent: "premium",
    lede: "El tope de gama. Espumas exclusivas, uppers de tejido knit, lo último de cada marca. Justifican el precio si tu juego pide ese plus.",
    intro: "Por encima de 130€ pagas la última tecnología y el upper más avanzado. Para jugadores que juegan mucho y notan diferencias sutiles, vale la pena. Para recreativos casuales, es vanidad.",
    points: [
      { lab: "Tecnología más reciente", body: "ZoomX, Lightstrike Pro, Flow, Cushlon 3.0 — las espumas top viven aquí." },
      { lab: "Uppers premium", body: "Knit + TPU, Flyknit, Primeknit. Más adaptables al pie pero menos durables que mesh." },
      { lab: "Diseño signature", body: "Estética cuidada. Si te importa el look (legítimo), aquí está." },
      { lab: "Diminishing returns", body: "Pagar 200€ vs 150€ rara vez aporta 33% más rendimiento. Decisión emocional, no técnica." },
    ],
    faqs: [
      { q: "¿Vale la pena gastar 200€ en zapas?",
        a: "Si juegas 4+ veces por semana federado y notas court feel y court feel, sí. Si juegas 1 vez por semana recreativo, no — gasta 100€ y compra otra cosa." },
      { q: "¿Mejores zapas premium 2025?",
        a: "Nike LeBron 22 (cushion king), Nike Kobe 8 Protro (reactiva premium), UA Curry 12 (ligereza). Cada una líder en su nicho." },
      { q: "¿Las signature siempre son mejores?",
        a: "No. La LeBron 22 es la mejor cushion del mercado, pero la Ja 1 (mid-range) supera a la LeBron 19 (signature antigua). El año del modelo importa más que el nombre." },
    ],
    filter: (z) => lowestPrice(z) > 130,
    sort: byScoreDesc,
    catalogQuery: "?precio_min=130",
    catalogLabel: "Ver catálogo premium",
  }),

  // ── LESIONES (3) ────────────────────────────────────────────────────
  lesion("zapatillas-baloncesto-para-rodillas", {
    title: "Zapatillas de baloncesto para problemas de rodilla | CANCHA.ZAPA",
    description: "Las 5 mejores zapatillas para jugar con problemas de rodilla. Máximo cushion, estabilidad y protección.",
    eyebrow: "★ Lesiones · Rodillas",
    h1Pre: "Zapatillas para",
    h1Accent: "rodillas",
    lede: "Si tienes molestias o historial de rodilla, el cushion no es opcional — es protección real. Estas 5 son las que mejor absorben impactos sin penalizar tu juego.",
    intro: "Las rodillas absorben 5-7x tu peso corporal en cada aterrizaje. Si están sensibles, una zapa con cushion bajo es como correr sin amortiguación. Es solo cuestión de tiempo. Mira siempre cushion ≥ 7.",
    points: [
      { lab: "Cushion ≥ 7 mínimo", body: "Score 7 absoluto mínimo. Idealmente 8-9 si las molestias son serias." },
      { lab: "Estabilidad importante", body: "Una zapa inestable hace que aterrices mal y empeores el problema." },
      { lab: "Cuidado con court feel extremo", body: "Las zapas muy reactivas (Curry, GT Cut) transmiten más impacto a la rodilla." },
      { lab: "Consulta a fisio", body: "Una zapa no sustituye fisioterapia. Si el dolor persiste, ve al médico antes de seguir jugando." },
    ],
    faqs: [
      { q: "¿Qué zapa protege mejor las rodillas?",
        a: "Nike LeBron 22 (cushion 9), New Balance Fresh Foam BB v3 (cushion 9), Jordan Luka 3 (cushion 8). Estas tres son referencia para rodillas sensibles." },
      { q: "¿Cushion alto soluciona el dolor de rodillas?",
        a: "Lo reduce, no lo elimina. Si tienes condromalacia rotuliana, tendinitis o lesión previa, la zapa ayuda pero no sustituye el tratamiento médico." },
      { q: "¿Puedo jugar con dolor leve de rodilla?",
        a: "Con leve, sí, con zapa adecuada y siendo conservador. Con dolor agudo o inflamación, descanso y médico. La zapa no es una solución mágica." },
    ],
    filter: (z) => z.puntuaciones.amortiguacion >= 7,
    sort: byThenScore((a, b) => b.puntuaciones.amortiguacion - a.puntuaciones.amortiguacion),
    catalogQuery: "?lesion=rodillas",
    catalogLabel: "Ver todas con cushion ≥ 7",
  }),

  lesion("zapatillas-baloncesto-para-tobillos", {
    title: "Zapatillas de baloncesto con soporte de tobillo | CANCHA.ZAPA",
    description: "Mejores zapatillas con máximo soporte lateral y altura mid/high. Para historial de esguinces o tobillos débiles.",
    eyebrow: "★ Lesiones · Tobillos",
    h1Pre: "Zapatillas para",
    h1Accent: "tobillos",
    lede: "Si te has torcido un tobillo, ya sabes. Esto es para evitar la segunda vez. Soporte lateral 8+ y altura mid o high — nunca low.",
    intro: "El soporte de tobillo no es opcional si tienes historial. Las low-tops están descartadas. Necesitas un cuello alto que bloquee la inversión lateral del pie. Y un sistema de cordones que ajuste de verdad.",
    points: [
      { lab: "Mid o high, nunca low", body: "Low-tops no protegen. Cero excepciones si vienes de esguince serio." },
      { lab: "Soporte lateral 8+", body: "Score mínimo. La construcción importa más que la altura por sí sola." },
      { lab: "Sistemas de bloqueo", body: "Lace-locks, straps adicionales — todo lo que ajuste la zapa al pie ayuda." },
      { lab: "Tobillera como complemento", body: "Una buena tobillera (no de farmacia) + zapa adecuada es la combinación de oro. La zapa sola no basta si el esguince fue serio." },
    ],
    faqs: [
      { q: "¿Mid-top o high-top para tobillos débiles?",
        a: "Mid-top moderno (Kyrie, Tatum) suele ser suficiente y más cómodo. High-top (LeBron) para esguinces graves o pívots." },
      { q: "¿La zapa solita evita esguinces?",
        a: "Reduce el riesgo, no lo elimina. Necesitas: zapa adecuada + fortalecimiento de tobillo en gimnasio + propiocepción. Lo que no se entrena no aguanta." },
      { q: "¿Vale la pena pagar una high-top si no he tenido esguinces?",
        a: "Probablemente no. Las high-tops penalizan movilidad. Si tu tobillo está sano, una mid-top está bien." },
    ],
    filter: (z) => z.altura !== "low" && z.puntuaciones.soporte_lateral >= 7,
    sort: byThenScore((a, b) => b.puntuaciones.soporte_lateral - a.puntuaciones.soporte_lateral),
    catalogQuery: "?lesion=tobillos",
    catalogLabel: "Ver todas mid/high con soporte ≥ 7",
  }),

  lesion("zapatillas-baloncesto-pie-ancho", {
    title: "Zapatillas de baloncesto para pies anchos | CANCHA.ZAPA",
    description: "Mejores zapatillas de baloncesto para pies anchos. Hormas wide reales sin sacrificar rendimiento.",
    eyebrow: "★ Pie ancho",
    h1Pre: "Zapatillas para",
    h1Accent: "pies anchos",
    lede: "Si Nike te queda apretada, no eres tú — es su horma. Estas 5 tienen horma normal o ancha sin sacrificar rendimiento.",
    intro: "Nike/Jordan tienden a horma estrecha; New Balance, Adidas, y algunas Nike de la línea LeBron son más anchas. La trampa es que muchas marcas dicen \"true to size\" cuando no lo son.",
    points: [
      { lab: "Horma ancha o normal", body: "Filtra por horma. Las marcadas \"estrecha\" se descartan." },
      { lab: "New Balance es referencia", body: "BB v3 tiene la horma más ancha del mercado entre las premium." },
      { lab: "Sube media talla si dudas", body: "Mejor un poco grande que apretada — apretada te causa problemas de fascia." },
      { lab: "Knit upper se adapta", body: "Los uppers de Primeknit/Flyknit ceden más que mesh + TPU." },
    ],
    faqs: [
      { q: "¿Qué marcas son mejores para pies anchos?",
        a: "New Balance (la más ancha), Adidas (ancha-normal), Anta (sorprendentemente ancha). Nike/Jordan suelen ir estrechas, excepto la serie LeBron." },
      { q: "¿Subir talla en lugar de buscar wide?",
        a: "Funciona a veces, pero pierdes ajuste en talón y empeine. Mejor buscar horma ancha de verdad." },
      { q: "¿Pie ancho = más riesgo de lesión?",
        a: "No directamente, pero forzar el pie en horma estrecha sí causa fascitis, juanetes, dedos en martillo. Vale la pena buscar bien." },
    ],
    filter: (z) => z.horma === "ancha" || z.horma === "normal",
    sort: byThenScore((a, b) => (a.horma === "ancha" ? -1 : 0) - (b.horma === "ancha" ? -1 : 0)),
    catalogQuery: "?ancho=ancho",
    catalogLabel: "Ver todas con horma normal/ancha",
  }),

  lesion("zapatillas-baloncesto-pie-plano", {
    title: "Zapatillas de baloncesto para pie plano y pronación | CANCHA.ZAPA",
    description: "Mejores zapatillas de baloncesto para pie plano o pronación excesiva. Qué buscar en estabilidad, soporte de arco y cushion. Top 5 recomendadas.",
    eyebrow: "★ Pie plano · Pronación",
    h1Pre: "Zapatillas para",
    h1Accent: "pie plano y pronación",
    lede: "El pie plano afecta al 20-30% de jugadores. Con la zapatilla correcta, no es una desventaja. Con la incorrecta, se convierte en una fuente de dolor en rodillas y fascia. Estas 5 son las más recomendadas.",
    intro: "El pie plano (o pronación excesiva) significa que el arco interno del pie toca el suelo casi por completo. En baloncesto, esto genera mayor estrés en rodillas y tobillos. La solución: zapatillas con estabilidad alta, cushion generoso y base ancha que distribuya las fuerzas correctamente.",
    points: [
      { lab: "Estabilidad > cushion blando", body: "Un cushion demasiado blando colapsa bajo la pronación. Necesitas espuma firme-a-media con soporte lateral 7+." },
      { lab: "Base ancha y counter de talón rígido", body: "La base ancha evita que el tobillo colapse hacia dentro. Un counter de talón rígido mantiene la alineación. Evita las ultra-ligeras sin soporte." },
      { lab: "Horma normal o ancha obligatoria", body: "Pie plano a menudo va asociado a pie ancho. Las hormas estrechas agravan la pronación. New Balance, LeBron y AE 3 son las más seguras." },
      { lab: "Plantilla ortopédica como complemento", body: "Si la pronación es severa, combina la zapatilla con una plantilla ortopédica. La zapa sola no sustituye una plantilla personalizada si la pronación es estructural." },
    ],
    faqs: [
      { q: "¿Qué zapatilla de baloncesto es mejor para pie plano?",
        a: "UA Curry 13 y Jordan Tatum 4 son las mejores opciones de 2025 para pie plano: ambas tienen estabilidad lateral 8+, cushion sólido y base ancha. Nike LeBron 22 es la opción si el peso supera los 90 kg. Evita zapatillas ultra-ligeras como la GT Cut 4 que no tienen soporte suficiente." },
      { q: "¿Puedo usar zapatillas de running con soporte pronación para baloncesto?",
        a: "No. Las zapatillas de running con soporte de pronación están diseñadas para movimiento rectilíneo, no para los cortes y cambios de dirección del baloncesto. Usar running en cancha aumenta el riesgo de lesión de tobillo." },
      { q: "¿Debo usar plantilla ortopédica con zapatillas de baloncesto?",
        a: "Si la pronación es leve, una buena zapatilla de baloncesto suele ser suficiente. Si la pronación es moderada-severa, combina la zapatilla con una plantilla de soporte. Consulta a un podólogo para una valoración personalizada." },
    ],
    filter: (z) => z.puntuaciones.estabilidad >= 7 && z.puntuaciones.amortiguacion >= 7 && z.horma !== "estrecha",
    sort: byThenScore((a, b) => b.puntuaciones.estabilidad - a.puntuaciones.estabilidad),
    catalogQuery: "?lesion=rodillas",
    catalogLabel: "Ver zapatillas con alta estabilidad",
  }),

  // ── MARCA (3) ───────────────────────────────────────────────────────
  marca("Nike", {
    title: "Mejores zapatillas de baloncesto Nike 2025 | CANCHA.ZAPA",
    description: "Las 5 mejores Nike de baloncesto: LeBron, KD, Kyrie, GT Cut, Sabrina. Análisis técnico honesto.",
    eyebrow: "★ Por marca · Nike",
    lede: "Nike domina el catálogo: signature lines de LeBron, KD, Kyrie + las team (GT Cut, Precision). Estas son sus mejores actuales según puntuación técnica.",
    intro: "Nike tiene la oferta más amplia del mercado en baloncesto. Líneas signature (LeBron, KD, Kobe, Sabrina, Ja, Giannis) cubren todos los perfiles. Las team (GT Cut, GT Hustle, Precision) son competitivas en precio.",
    points: [
      { lab: "Signature por perfil", body: "LeBron = cushion. Kobe = reactiva. KD = balanced. Ja = explosivo budget. Curry no, Curry es UA." },
      { lab: "GT Cut, joya escondida", body: "La GT Cut 3 (~190€) es de las mejores reactivas del mercado y no lleva nombre famoso. Apuesta segura." },
      { lab: "Horma estrecha general", body: "Salvo LeBron, casi todas son estrechas. Pie ancho → sube media talla." },
      { lab: "Innovación cada 18 meses", body: "Los modelos signature renuevan cada 1-2 años. Comprar el anterior con descuento es viable." },
    ],
    faqs: [
      { q: "¿Mejor Nike de baloncesto del momento?",
        a: "Depende del perfil. Pívots: LeBron 22. Guards: GT Cut 3 o Kobe 8 Protro. Aleros: KD 17 o Sabrina 2." },
      { q: "¿Las Nike duran en asfalto?",
        a: "Solo las que tienen XDR (eXtra Durable Rubber). Sin XDR, se gastan rápido. La GT Cut 3 sin XDR dura 2 meses outdoor; la LeBron 22 sí trae XDR." },
      { q: "¿Por qué Nike es tan cara?",
        a: "Marketing + signature deals + I+D en espumas. Tecnológicamente competitiva, pero pagas también el nombre." },
    ],
  }),

  marca("Jordan", {
    title: "Mejores zapatillas de baloncesto Jordan 2025 | CANCHA.ZAPA",
    description: "Las 5 mejores Jordan Brand performance: Tatum, Luka, Zion. No retros, modelos para jugar.",
    eyebrow: "★ Por marca · Jordan",
    lede: "Jordan Brand performance (no retros) es de las marcas más sólidas en 2025. Tatum, Luka y Zion compiten cara a cara con las top Nike.",
    intro: "Jordan Brand (filial de Nike) tiene su propia línea performance, separada de los retros lifestyle. Tatum, Luka, Zion son referencia para alero y ala-pívot. Suelen tener mejor relación calidad-precio que sus primas Nike signature.",
    points: [
      { lab: "Tatum = balanced top", body: "Probablemente la mejor zapa balanced del mercado. Score 7+ en todo." },
      { lab: "Luka = cushion grande", body: "Pensada para Luka, lo que significa: jugadores potentes >85kg con cushion alto." },
      { lab: "Zion = fortaleza", body: "Para los más físicos. Construcción para aguantar a un jugador de 130kg saltando." },
      { lab: "Precio relativo", body: "Las Jordan performance suelen ir 20-40€ por debajo de Nike signature equivalentes." },
    ],
    faqs: [
      { q: "¿Diferencia entre Air Jordan retros y Jordan performance?",
        a: "Los retros (XI, IV, etc.) son lifestyle — no se diseñan para baloncesto moderno. Las performance (Tatum, Luka, Zion) sí. Si vas a jugar, performance." },
      { q: "¿Vale la pena Jordan vs Nike?",
        a: "Para el mismo nivel técnico, Jordan suele costar menos. La Tatum 3 (~145€) vs Sabrina 2 (~120€) son ambas balanced — Jordan da algo más por algo más de precio." },
      { q: "¿Mejor Jordan para pívots?",
        a: "Jordan Zion 3 (~150€). Construcción de tanque, cushion alto, estabilidad para jugadores físicos." },
    ],
  }),

  marca("Adidas", {
    title: "Mejores zapatillas de baloncesto Adidas 2025 | CANCHA.ZAPA",
    description: "Las 5 mejores Adidas: Trae Young, Harden, Dame, Cross 'Em Up. Análisis honesto + mejor relación calidad-precio.",
    eyebrow: "★ Por marca · Adidas",
    lede: "Adidas es la alternativa real a Nike. Líneas signature (Harden, Trae Young, Dame) + las team. Mejor relación calidad-precio media del mercado.",
    intro: "Adidas no domina el volumen como Nike pero tiene buenos signature (Harden para potentes, Trae para guards, Dame ya descontinuada pero excelente en outlet). Las team como Cross 'Em Up son reyes del rango bajo.",
    points: [
      { lab: "Harden = pívot/4 ligero", body: "Lightstrike Pro + Bounce. Buena para jugadores potentes que aún se mueven." },
      { lab: "Trae Young = guards explosivos", body: "Reactiva con buena tracción. Compite con la Kyrie." },
      { lab: "Cross 'Em Up = budget king", body: "60€. Mejor zapa sub-80€ del mercado para principiantes/junior." },
      { lab: "Horma normal-ancha", body: "Más cómoda para la mayoría que Nike. Si vienes de Nike y te aprietan, prueba Adidas tu talla normal." },
    ],
    faqs: [
      { q: "¿Adidas o Nike?",
        a: "Adidas suele tener mejor relación calidad-precio media. Nike tiene más opciones y la frontera tecnológica. Si dudas, compara mismo modelo en ambas y revisa precio actual." },
      { q: "¿Mejor Adidas signature?",
        a: "Trae Young 3 para guards, Harden Vol 9 para potentes/aleros. Las dos con score técnico 7+." },
      { q: "¿Adidas aguanta outdoor?",
        a: "Mejor que Nike de media. Las suelas Adidas suelen ser de goma más maciza. Cross 'Em Up Select aguanta meses en asfalto." },
    ],
  }),

  // ── MARCA ADICIONAL: Under Armour ──────────────────────────────────
  {
    slug: "mejores-zapatillas-under-armour",
    title: "Mejores zapatillas Under Armour baloncesto 2026 | CANCHA.ZAPA",
    description: "Las 5 mejores zapatillas de baloncesto Under Armour: Curry 13, D. Fox 2, Flow Breakthru. Análisis técnico y precio.",
    eyebrow: "★ Por marca · Under Armour",
    h1Pre: "Mejores zapatillas",
    h1Accent: "Under Armour",
    h1Post: "",
    lede: "Under Armour es la marca de Steph Curry. UA Flow, Charged Cushioning y las líneas Curry son referencia en court feel y ligereza para guards.",
    filter: (z) => z.marca.toLowerCase() === "under armour",
    sort: byScoreDesc,
    guideTitle: "Cómo es la oferta de Under Armour",
    guideIntro: "Curry Brand (filial de UA) tiene el mejor court feel del mercado junto a la Kobe 8 Protro. La UA Flow es una tecnología patentada sin pegamento entre cámara y suela que aporta una respuesta muy diferente a lo de Nike/Adidas.",
    guidePoints: [
      { lab: "Curry = referencia guards", body: "Las Curry 12/13 tienen court feel premium y ligereza top. La preferida de muchos escoltas y bases europeos." },
      { lab: "UA Flow = suela única", body: "Espuma de suela sin pegamento. Más ligera y sensible que goma convencional. Se gasta más rápido en outdoor." },
      { lab: "Charged Cushioning = equilibrio", body: "Tecnología mid-range de UA. Buena relación cushion/respuesta sin llegar a la UA Flow." },
      { lab: "Precio competitivo", body: "UA suele estar 10-30€ por debajo de Nike equivalent. Buena propuesta para mismo nivel técnico." },
    ],
    faqs: [
      { q: "¿Merece la pena Under Armour para baloncesto?",
        a: "Sí, especialmente si eres guard o escolta. Las Curry 12 y 13 tienen el mejor court feel del mercado junto a la Kobe Protro. Si priorizas respuesta, UA es la apuesta." },
      { q: "¿Cuánto cuestan las Curry en España?",
        a: "UA Curry 13 ronda los 130-140€ en España. Las versiones anteriores (Curry 11, 12) se encuentran a 80-110€ en outlet. Muy buen valor." },
      { q: "¿UA Flow se puede usar en exterior?",
        a: "Poco tiempo. La UA Flow sin goma adicional se desgasta en 2-3 meses de outdoor. Úsalas solo en pista cubierta." },
    ],
    related: [],
    catalogQuery: "?marca=Under+Armour",
    catalogLabel: "Ver todas las zapatillas Under Armour",
  },

  // ── MUJER ──────────────────────────────────────────────────────────
  {
    slug: "zapatillas-baloncesto-mujer",
    title: "Mejores zapatillas de baloncesto para mujer 2026 | CANCHA.ZAPA",
    description: "Las 5 mejores zapatillas de baloncesto para mujer. Modelos signature femeninos y unisex adaptados. Análisis técnico y precio.",
    eyebrow: "★ Para mujer · WNBA inspired",
    h1Pre: "Zapatillas de baloncesto",
    h1Accent: "para mujer",
    h1Post: "",
    lede: "Las mejores zapatillas para jugadoras. Tanto modelos signature femeninos (Sabrina, Stewie) como opciones unisex que funcionan perfectamente para mujer.",
    filter: (z) =>
      z.genero === "women" ||
      (z.signature_player !== undefined && ["Sabrina Ionescu", "Breanna Stewart", "Caitlin Clark", "A'ja Wilson", "De'Aaron Fox"].some(p => z.signature_player?.includes(p))) ||
      (z.ideal_para.peso_jugador_kg[0] <= 60 && z.puntuaciones.respuesta >= 7),
    sort: byScoreDesc,
    guideTitle: "Cómo elegir zapa para baloncesto femenino",
    guideIntro: "La clave para jugadoras: el peso del pie es menor de media, así que la ligereza y el court feel importan más que en hombre. Las zapas signature femeninas (Sabrina, Stewie) se diseñan con hormas específicas. Las unisex con horma normal también funcionan bien.",
    guidePoints: [
      { lab: "Signature femeninas primero", body: "Nike Sabrina 2/3, Puma Stewie 4 — diseñadas específicamente para el juego femenino. Horma, peso y respuesta ajustadas." },
      { lab: "Peso más ligero", body: "Para una jugadora media (<70kg), prioriza zapas sub-350g. El court feel mejora notablemente." },
      { lab: "Horma normal o ancha", body: "Las hormas estrechas masculinas no se adaptan bien. Sabrina y Stewie tienen horma más generosa." },
      { lab: "Respuesta sobre cushion", body: "Las guardas y escoltas WNBA priorizan respuesta. Cushion es para jugadoras de poste >80kg." },
    ],
    faqs: [
      { q: "¿Cuál es la mejor zapatilla de baloncesto para mujer?",
        a: "Nike Sabrina 3 es la referencia de 2025: ligera, reactiva, horma cómoda. Puma Stewie 4 es la mejor opción para jugadoras que buscan más cushion. Ambas se encuentran por 120-130€." },
      { q: "¿Las zapas de hombre sirven para mujer?",
        a: "Sí, en talla equivalente (generalmente -1 a -1.5 tallas). Las unisex son perfectamente válidas. La ventaja de las women's es la horma ajustada al pie femenino." },
      { q: "¿Cuánto gastar en zapas de baloncesto siendo mujer?",
        a: "Igual que cualquier jugador: tu nivel y frecuencia de juego. Recreativa: 60-100€. Amateur federada: 100-150€. Elite: sin tope." },
    ],
    related: [],
    catalogQuery: "?perfil=mujer",
    catalogLabel: "Ver catálogo para mujer",
  },

  // ── JUNIOR ──────────────────────────────────────────────────────────
  {
    slug: "zapatillas-baloncesto-junior",
    title: "Mejores zapatillas de baloncesto para niños y junior 2026 | CANCHA.ZAPA",
    description: "Las mejores zapatillas de baloncesto para niños y junior. Precio asequible, tracción y durabilidad para pistas mixtas.",
    eyebrow: "★ Junior · Menores de 16",
    h1Pre: "Zapatillas junior",
    h1Accent: "para niños",
    h1Post: "",
    lede: "Para junior, el precio y la durabilidad mandan. Los pies crecen rápido y la intensidad es alta. Aquí no hace falta gastar 180€ — pero sí elegir bien.",
    filter: (z) => lowestPrice(z) < 100 && z.puntuaciones.durabilidad_outdoor >= 6,
    sort: byThenScore(byPriceAsc),
    guideTitle: "Cómo elegir zapa de baloncesto para junior",
    guideIntro: "Para jugadores jóvenes (8-16 años) la clave es que la zapa no se rompa, agarre bien y no cueste un ojo de la cara. Los pies crecen cada temporada, así que pagar 180€ no tiene sentido. Con 50-90€ tienes más que suficiente.",
    guidePoints: [
      { lab: "Sub-100€ es suficiente", body: "Adidas Cross 'Em Up (60€), Decathlon Tarmak (50€), Nike Kyrie Flytrap 6 (80€). Más que suficiente para junior." },
      { lab: "Durabilidad outdoor", body: "Los jóvenes juegan en cualquier sitio. Mira durabilidad ≥ 6 para que aguante parquet + asfalto." },
      { lab: "Tracción 7+", body: "Seguridad ante todo. Los jóvenes se mueven rápido y necesitan agarre real." },
      { lab: "Media talla grande", body: "Los pies de los jóvenes crecen rápido. Comprar media talla grande da unas semanas extra de uso." },
    ],
    faqs: [
      { q: "¿Cuánto gastar en zapas de baloncesto para un niño?",
        a: "50-90€ es el rango óptimo. Por debajo de 50€ la calidad se resiente mucho. Más de 100€ no se justifica si el pie va a crecer en 6 meses." },
      { q: "¿Mejor zapa de baloncesto para junior?",
        a: "Adidas Cross 'Em Up Speed (~60€), Nike Kyrie Flytrap 6 (~80€), Decathlon Tarmak Fast 900 (~65€). Las tres tienen tracción y durabilidad suficientes." },
      { q: "¿Sirven las zapatillas de running para baloncesto?",
        a: "No. Las de running tienen amortiguación lateral incorrecta para los cortes laterales del baloncesto. El riesgo de esguince es mayor. Usa siempre zapatillas diseñadas para basketball." },
    ],
    related: [],
    catalogQuery: "?precio_max=100",
    catalogLabel: "Ver todas las zapatillas junior",
  },

  // ── RETRO ──────────────────────────────────────────────────────────
  {
    slug: "zapatillas-baloncesto-retro",
    title: "Zapatillas de baloncesto retro | Catálogo histórico | CANCHA.ZAPA",
    description: "Las mejores zapatillas de baloncesto retro e históricas analizadas: Air Jordan, Kobe Protro, Reebok Question, Nike AF1, Converse. Scores reales, no nostalgia.",
    eyebrow: "🏅 Colección histórica",
    h1Pre: "Zapatillas de baloncesto",
    h1Accent: "retro",
    h1Post: "— Historia y rendimiento",
    lede: "29 zapatillas históricas analizadas con el mismo rigor que los modelos modernos. Descubre cuáles siguen siendo jugables y cuáles son solo para colección.",
    filter: (z) => !!z.es_retro,
    sort: (a, b) => b.año_lanzamiento - a.año_lanzamiento,
    guideTitle: "Retro no significa malo",
    guideIntro: "Las zapatillas retro de baloncesto van de las que superan el 6/10 técnico (Kobe Protros, Jordan 12/14) a las puramente históricas como la Converse Chuck Taylor de 1917. Aquí te explicamos las diferencias clave.",
    guidePoints: [
      { lab: "Kobe Protros — las mejores jugables", body: "Nike actualizó outsoles y Zoom Air en las Kobe 4/5/6 Protro. Son retros en aspecto pero modernas en rendimiento. Las más recomendadas para jugar de verdad." },
      { lab: "Jordan 12 y 14 — clásicas que aguantan", body: "Zoom Air real, herringbone tracción, cuero durable. La 12 (Flu Game) y la 14 (Last Shot) son las Jordan clásicas más jugables." },
      { lab: "Reebok Iverson — los de las Finales 2001", body: "Question Mid y Answer IV de Allen Iverson. Tracción de cuero pegajosa y DMX foam. Scores 6.2-6.4/10 para ser de 1996-2001." },
      { lab: "Iconos históricos — para colección", body: "AF1 (1982), Chuck Taylor (1917), Puma Clyde (1973), Converse Weapon (1986). Cultura pura, rendimiento limitado." },
    ],
    faqs: [
      { q: "¿Cuáles son las mejores zapatillas retro de baloncesto para jugar?", a: "Las Kobe 5 y 6 Protro son las mejores: Nike las rediseñó con Zoom Air moderno y outsoles nuevas manteniendo el aspecto original. También las Air Jordan 12 y 14 tienen Zoom Air real y son jugables. Para estilos menos explosivos, la Reebok Question Mid y la Answer IV de Iverson aguantan bien." },
      { q: "¿Son las Air Jordan retro buenas para jugar baloncesto?", a: "Depende de la generación. Las Jordan 11, 12 y 14 tienen Zoom Air real y son jugables aunque pesadas. Las Jordan 1, 2, 3 y 4 son principalmente colección — cuero rígido, cushion básico y peso elevado. Las Kobe Protro (que no son Jordan pero son Nike) son las mejores retros para jugar." },
      { q: "¿Cuánto cuestan las zapatillas retro de baloncesto en España?", a: "Las retros más accesibles son la Converse Chuck Taylor (~75€) y el Puma Clyde (~80€). Las Jordan retro van de 180€ (Jordan 1) a 250€ (Jordan 11/12). Las Kobe Protro cuestan 175-200€. Busca en KicksCrew y Amazon ES para precios competitivos." },
    ],
    related: [],
    catalogQuery: "?retro=true",
    catalogLabel: "Ver todas las zapatillas retro",
  },

  // ── MARCA ADICIONAL: Puma ──────────────────────────────────────────
  marca("Puma", {
    title: "Mejores zapatillas de baloncesto Puma 2025-2026 | CANCHA.ZAPA",
    description: "Las 5 mejores Puma de baloncesto: MB.04, MB.05, All-Pro Nitro 2, Stewie 4. Análisis técnico honesto de la línea Nitro y LaMelo Ball.",
    eyebrow: "★ Por marca · Puma",
    lede: "Puma volvió al baloncesto con la línea Nitro y LaMelo Ball. El MB.04 y MB.05 son las zapatillas más comentadas del mercado en 2025. ¿Merecen la pena?",
    intro: "Puma regresó al baloncesto de alto rendimiento en 2019 con la tecnología Nitro (nitrógeno inyectado en la espuma). La línea MB (LaMelo Ball) es la más visible, pero la All-Pro Nitro y la Scoot Zeros también tienen mérito técnico real.",
    points: [
      { lab: "Nitro foam — diferenciador clave", body: "La espuma Nitro de Puma es más ligera que la Boost de Adidas y más elástica que el Cushlon de Nike. El resultado: zapatillas más ligeras con buen retorno energético." },
      { lab: "Tracción top de mercado", body: "El outsole del MB.04 tiene uno de los mejores herringbone del mercado en 2025. Comparable a la AE 3. Para pistas con algo de polvo, Puma supera a Nike de media." },
      { lab: "LaMelo = colorways únicos", body: "Si quieres hacerte notar en la cancha, la línea MB tiene los diseños más atrevidos del mercado. El rendimiento está, pero el estilo también." },
      { lab: "Precio razonable", body: "MB.04 (~130€), All-Pro Nitro 2 (~110€), Stewie 4 (~120€). Puma suele tener promociones que bajan 20-30€ en Amazon ES y Sprinter." },
    ],
    faqs: [
      { q: "¿Son buenas las Puma para baloncesto real?",
        a: "Sí. La línea Nitro tiene tecnología de espuma real, no marketing. El MB.04 y la All-Pro Nitro 2 compiten técnicamente con Nike AE 3 y Adidas Trae Young en sus rangos de precio." },
      { q: "¿Qué diferencia hay entre MB.04 y MB.05?",
        a: "MB.04 es más reactiva y ligera (355g), MB.05 tiene más cushion (370g). Para guards explosivos: MB.04. Para jugadores más pesados que necesitan más protección: MB.05." },
      { q: "¿Dónde comprar Puma baloncesto en España?",
        a: "Amazon ES, Sprinter y Foot Locker ES suelen tener stock completo de la línea MB. Puma.com tiene a veces colorways exclusivos. JD Sports menos fiable para baloncesto Puma." },
    ],
  }),

  // ── MARCA: Anta ───────────────────────────────────────────────────
  marca("Anta", {
    title: "Mejores zapatillas de baloncesto Anta 2026 | CANCHA.ZAPA",
    description: "Las 5 mejores Anta de baloncesto: KAI 2, KAI 1 Speed, KT 11, Shock Game. Kyrie Irving y Klay Thompson endorsan a Anta. Análisis técnico honesto.",
    eyebrow: "★ Por marca · Anta",
    lede: "Anta tiene a Kyrie Irving (línea KAI) y Klay Thompson (línea KT). En 2025, la KAI 2 es la zapatilla china con mejor relación calidad-precio del mercado europeo.",
    intro: "Anta es la marca deportiva número 1 en China y ha conquistado el baloncesto internacional con endorsements de peso: Kyrie Irving abandonó Nike para firmar con Anta, y Klay Thompson lleva la línea KT desde 2014. El resultado es tecnología competitiva a precios más asequibles que Nike/Adidas.",
    points: [
      { lab: "KAI 2 = la sorpresa del año", body: "La KAI 2 de Kyrie Irving ofrece tracción y respuesta de 150€ a solo 119€. A-Flashfoam 2.0 y herringbone multidireccional. La mejor relación calidad-precio de 2025." },
      { lab: "KT 10/11 = para tiradores", body: "La línea KT de Klay Thompson prioriza estabilidad lateral y cushion sólido. Perfecta para tiradores de posición media que necesitan soporte en plant-and-shoot." },
      { lab: "Shock Game = segmento medio", body: "Para jugadores sin patrocinado favorito que buscan una Anta genérica de calidad. Precio más bajo, tecnología mid-range pero sólida." },
      { lab: "Talla y horma generosa", body: "Anta tiende a horma más ancha que Nike. Para pies anchos, es una ventaja real. Comprueba siempre las guías de talla — suelen correr entre normal y ligeramente grande." },
    ],
    faqs: [
      { q: "¿Son buenas las zapatillas Anta para baloncesto?", a: "Sí, especialmente para el precio. La KAI 2 compite técnicamente con la Nike AE 3 a 30€ menos. La marca invierte en tecnología real, no solo en marketing." },
      { q: "¿Merece la pena la Anta KAI 2 de Kyrie Irving?", a: "Sí. Tracción 8/10, respuesta 9/10, horma ancha, 119€. Para bases o escoltas con pie normal o ancho que buscan rendimiento sin gastar 150€+, es la mejor compra de 2025." },
      { q: "¿Dónde comprar Anta en España?", a: "Amazon ES es la principal fuente de Anta en España, con vendedores oficiales y devolución fácil. AliExpress tiene más colorways pero tarda más. Pocas tiendas físicas en España tienen stock." },
    ],
  }),

  // ── MARCA: Li-Ning ─────────────────────────────────────────────────
  marca("Li-Ning", {
    title: "Mejores zapatillas de baloncesto Li-Ning 2026 | CANCHA.ZAPA",
    description: "Las 5 mejores Li-Ning de baloncesto: WoW AllCity 13, Gamma 2, Sonic 12. Jimmy Butler, Wade y más. Tecnología china de vanguardia.",
    eyebrow: "★ Por marca · Li-Ning",
    lede: "Li-Ning es el competidor más ambicioso de Nike en baloncesto. Con Jimmy Butler (WoW), la marca china produce tecnología de primer nivel que todavía vuela bajo el radar en Europa.",
    intro: "Li-Ning fundó la marca en 1989, pero su salto al baloncesto de élite llegó con la línea WoW (Way of Wade) de Dwyane Wade. Hoy tienen a Jimmy Butler como endorser principal. Su tecnología de espuma BOOM es competitiva con ZoomX de Nike, y el precio es entre un 10% y 30% más bajo.",
    points: [
      { lab: "WoW AllCity 13 = premium", body: "La línea WoW es la flagship de Li-Ning. Materiales premium, BOOM foam reactivo, tracción agresiva. Comparable a la Jordan 40 en cushion y a la GT Cut en tracción." },
      { lab: "Gamma 2 = relación calidad-precio", body: "La Gamma 2 ofrece el 85% del rendimiento de la WoW a menor precio. Buena para jugadores que quieren experimentar Li-Ning sin el desembolso de las WoW." },
      { lab: "Sonic 12 = guards de primer paso", body: "La línea Sonic prioriza velocidad y respuesta. Para bases y escoltas que no necesitan mucho cushion pero sí explosividad." },
      { lab: "Talla: mide con cuidado", body: "Li-Ning tiende a tallar algo más pequeño que las marcas occidentales. Comprueba siempre la guía de tallas y, si tienes dudas, sube media talla." },
    ],
    faqs: [
      { q: "¿Es buena Li-Ning para baloncesto?", a: "Sí, y está subestimada en Europa. La WoW AllCity 13 compite con las mejores Adidas y Nike en el mismo rango de precio. La marca invierte en I+D real: BOOM foam, suelas multidireccionales propias." },
      { q: "¿Qué tecnología usa Li-Ning en sus zapatillas?", a: "BOOM foam (espuma ultra-ligera y reactiva), CLOUD foam (cushion suave para jugadores pesados), li-ning ARC (placa de carbono en modelos premium). Todo I+D propio, no licenciado." },
      { q: "¿Dónde comprar Li-Ning en España?", a: "Amazon ES es la opción más cómoda con devolución garantizada. Li-Ning no tiene tiendas físicas en España. AliExpress tiene el catálogo completo pero los plazos de entrega son más largos (2-4 semanas)." },
    ],
  }),

  // ── MARCA: New Balance ─────────────────────────────────────────────
  marca("New Balance", {
    title: "Mejores zapatillas de baloncesto New Balance 2026 | CANCHA.ZAPA",
    description: "Las 5 mejores New Balance de baloncesto: Fresh Foam BB v3, Two WXY v6, Kawhi 2. Technología FuelCell y Fresh Foam en la cancha.",
    eyebrow: "★ Por marca · New Balance",
    lede: "New Balance volvió al baloncesto con Kawhi Leonard y Jamal Murray. Su Fresh Foam BB v3 es la mejor zapatilla de cushion para pívots en 2025 a precio razonable.",
    intro: "New Balance abandonó el baloncesto en los 90 y volvió con fuerza en 2018 firmando a Kawhi Leonard. Desde entonces, la marca ha lanzado la línea Two WXY (guards), la línea Kawhi (aleros/pívots) y la OMN1S (legacy de Kawhi). Tecnología FuelCell y Fresh Foam son sus propuestas de espuma.",
    points: [
      { lab: "Fresh Foam BB v3 = cushion pívots", body: "La Fresh Foam BB v3 tiene el stack de cushion más alto de NB. Para pívots y jugadores pesados que necesitan máxima protección. Score de amortiguación 9/10." },
      { lab: "Two WXY v5/v6 = guards", body: "La línea Two WXY (WXY = \"why not?\") es para guards: ligera, reactiva, buen soporte de tobillo. FuelCell foam responsivo." },
      { lab: "Kawhi = aleros/3D", body: "Las líneas Kawhi (1, 2) están diseñadas para el juego versátil de Leonard: potencia, control, cortes. Horma media, ideal para aleros de todo tipo." },
      { lab: "Horma inglesa = cómoda", body: "NB tiene fama de horma cómoda. Su D (normal) y EE (ancha) ofrecen opciones para pies más anchos que no encajan en Nike o Adidas." },
    ],
    faqs: [
      { q: "¿New Balance es buena para baloncesto?", a: "Sí, aunque subestimada. La Fresh Foam BB v3 es la mejor zapatilla de cushion para pívots de su rango de precio. La Two WXY v6 compite con la Ja 3 y la AE 3 para guards." },
      { q: "¿Merece la pena la New Balance Fresh Foam BB v3?", a: "Para pívots con rodillas sensibles o jugadores de más de 90kg: sí. El stack de cushion es de los más generosos del mercado y el precio (~130€) es competitivo frente a Nike LeBron o Jordan Tatum." },
      { q: "¿Dónde comprar New Balance de baloncesto en España?", a: "Amazon ES y NewBalance.es tienen el catálogo completo. Foot Locker ES también tiene algo de stock. Evita comprar en webs de terceros no verificados." },
    ],
  }),

  // ── MARCA: Converse ───────────────────────────────────────────────
  marca("Converse", {
    title: "Mejores zapatillas Converse para baloncesto 2026 | CANCHA.ZAPA",
    description: "Las mejores Converse de baloncesto: BBall Pro, All Star Pro BB, Chuck Taylor. Análisis técnico honesto — ¿son buenas para jugar de verdad?",
    eyebrow: "★ Por marca · Converse",
    lede: "Converse vuelve al baloncesto de performance con la línea BBall Pro. Más allá de las clásicas Chuck Taylor, hay zapatillas técnicas serias para jugadores exigentes.",
    intro: "Converse es la marca más histórica del baloncesto: la Chuck Taylor fue la zapatilla dominante hasta los 80. Hoy, Converse (parte de Nike) ha vuelto con la línea BBall Pro para competir en el segmento de performance. No son solo un guiño nostálgico — tienen tecnología real.",
    points: [
      { lab: "BBall Pro = performance real", body: "La Converse BBall Pro tiene Air Zoom en el antepié y un outsole de goma de alta tracción. No es retro — es una zapatilla técnica que compite con Nike Ja 3 y Adidas AE 3 en cortes y respuesta." },
      { lab: "All Star Pro BB = el retro moderno", body: "La All Star Pro BB combina el estilo vintage de la Chuck con tecnología React de Nike. Para jugadores que quieren rendimiento en un silhouette clásico, es la opción perfecta." },
      { lab: "Chuck Taylor = historia, no performance", body: "Las Chuck Taylor originales (bajo y alto) no están pensadas para baloncesto moderno. La suela plana y la falta de amortiguación las hacen inadecuadas para entrenamiento intenso. Son lifestyle, no performance." },
      { lab: "Precio más accesible", body: "Las Converse de performance rondan los 100-130€, por debajo de los 150-180€ de Nike/Jordan de gama alta. Si encajas en el estilo, ofrecen buena relación calidad-precio." },
    ],
    faqs: [
      { q: "¿Las Converse sirven para jugar baloncesto?", a: "Depende del modelo. La BBall Pro y la All Star Pro BB son zapatillas técnicas reales con Air Zoom y buena tracción — sí sirven para jugar. Las Chuck Taylor originales no son apropiadas para baloncesto moderno: no tienen amortiguación suficiente." },
      { q: "¿Qué Converse es mejor para baloncesto?", a: "En 2025, la Converse BBall Pro es la mejor opción técnica de la marca. Tiene tracción competitiva, Air Zoom en el antepié y peso razonable. Compite en el segmento 100-130€ con la Nike Ja 3 y la Adidas AE 3 en talla normal." },
      { q: "¿Dónde comprar Converse de baloncesto en España?", a: "Converse.com/es, Amazon ES (vendedor oficial Nike/Converse) y Foot Locker ES tienen el catálogo más completo. JD Sports también tiene stock en temporada." },
    ],
  }),

  // ── MARCA: Reebok ─────────────────────────────────────────────────
  marca("Reebok", {
    title: "Mejores zapatillas Reebok para baloncesto 2026 | CANCHA.ZAPA",
    description: "Las mejores zapatillas de baloncesto Reebok: Question Mid, Answer V, Legacy Court. Desde el legacy de Allen Iverson hasta los modelos actuales.",
    eyebrow: "★ Por marca · Reebok",
    lede: "Reebok tiene el legado de Allen Iverson y las zapatillas más icónicas de los 90. Hoy, la marca ofrece retros de alto rendimiento y modelos de lifestyle para la cancha.",
    intro: "Reebok dominó el baloncesto en los 90 con Allen Iverson. La Question Mid y la Answer V son clásicos que se reeditan con suelas modernas. Para jugadores que quieren el estilo vintage de los 90 con rendimiento decente en parqué, Reebok es una opción a considerar.",
    points: [
      { lab: "Question Mid = ícono absoluto", body: "La Question Mid de Allen Iverson es una de las siluetas más queridas del baloncesto. Las reediciones mantienen el upper original pero actualizan la suela. Buena tracción herringbone, cushion modesto." },
      { lab: "Answer V = cushion mejorado", body: "La Answer V tiene más cushion que la Question gracias a la actualización de la entresuela. Para un zapato retro, se defiende bien en indoor con cushion suficiente para sesiones moderadas." },
      { lab: "Legacy Court = la más moderna", body: "La Legacy Court es la apuesta más técnica de Reebok actual: upper sintético ligero, suela de goma de alto grip. Menos historia, más rendimiento." },
      { lab: "Precio competitivo", body: "Las Reebok de baloncesto rondan los 80-120€, por debajo de equivalentes Nike y Adidas. Para jugadores con presupuesto limitado que quieren un clásico, son una opción razonable." },
    ],
    faqs: [
      { q: "¿Las Reebok de baloncesto son buenas para jugar?", a: "Depende del modelo. Las reediciones de la Question Mid y Answer V tienen tracción herringbone sólida para indoor. El cushion es modesto comparado con modelos actuales — úsalas para partidos amistosos, no para entrenamiento intensivo diario." },
      { q: "¿Cuál es la mejor Reebok para baloncesto en 2025?", a: "La Legacy Court es la más técnica de la línea actual. Para los que quieren el legado de Iverson, la Question Mid reedición ofrece el equilibrio entre estilo y funcionalidad básica. Para rendimiento moderno, la AE 3 o GT Cut son superiores técnicamente." },
      { q: "¿Dónde comprar Reebok en España?", a: "Reebok.es, Amazon ES y algunas tiendas Foot Locker tienen la línea de baloncesto. El stock es limitado comparado con Nike/Adidas — si encuentras tu talla, hazlo porque los retros tienden a agotar." },
    ],
  }),

  // ── MARCA: FILA ───────────────────────────────────────────────────
  marca("FILA", {
    title: "Zapatillas de baloncesto FILA: la marca que casi destrona a Jordan | CANCHA.ZAPA",
    description: "Historia y análisis de las zapatillas FILA de baloncesto. La Grant Hill 1 fue la más vendida de 1995, por delante del Air Jordan. Retros que todavía funcionan.",
    eyebrow: "🏅 Por marca · FILA",
    lede: "En 1995, FILA venció a Jordan en ventas. La Grant Hill 1 fue la zapatilla más vendida de la NBA ese año. Una historia que el marketing oficial prefiere olvidar — nosotros no.",
    intro: "FILA es la marca italiana que estuvo más cerca de destronar a Jordan en los 90. Ficharon a Grant Hill en 1994, antes de su primera temporada, y la Grant Hill 1 fue un bombazo: cuero premium, alta caña, herringbone outsole y la historia de un jugador que recibió más votos al All-Star que Michael Jordan. Hoy FILA tiene presencia mínima en baloncesto de rendimiento, pero sus retros son piezas con narrativa real.",
    points: [
      { lab: "Grant Hill 1 = el anti-Jordan de 1995", body: "La Grant Hill 1 fue la zapatilla más vendida de la NBA en 1995, por encima del Air Jordan. Cuero genuino, caño alto, herringbone clásico. Retros disponibles en 120-160€." },
      { lab: "Herringbone outsole — tracción clásica vigente", body: "El patrón herringbone de los retros FILA sigue siendo competitivo en parqué interior. Agarre comparable a zapatillas modernas básicas en pista limpia." },
      { lab: "Caño alto = soporte real", body: "La Grant Hill 1 tiene uno de los caños más altos del mercado retro. Soporte de tobillo real — útil si tienes historial de esguinces y buscas protección extra." },
      { lab: "Precio retro competitivo", body: "Los retros FILA suelen estar en el rango 100-160€, por debajo de Jordan retros equivalentes. Si buscas un clásico de los 90 sin pagar precio de Air Jordan, FILA es la opción." },
    ],
    faqs: [
      { q: "¿Las zapatillas FILA son buenas para jugar baloncesto?", a: "Los retros FILA (Grant Hill 1, etc.) funcionan para baloncesto recreativo en interior. La tracción herringbone es sólida en parqué limpio y el soporte de tobillo del caño alto es real. No son para rendimiento de alto nivel o exterior — para eso, las zapatillas técnicas de 2025 las superan claramente en cushion y respuesta." },
      { q: "¿Por qué FILA ya no está en el baloncesto de rendimiento?", a: "Tras Grant Hill, FILA no encontró otro jugador con el mismo impacto cultural. Las lesiones de tobillo de Hill (2000-2006) dañaron indirectamente la visibilidad de la marca. FILA viró hacia el lifestyle y el tenis, donde su herencia italiana tiene más peso. Hoy su presencia en baloncesto performance es casi nula." },
      { q: "¿Dónde comprar retros FILA en España?", a: "Amazon ES tiene habitualmente stock de la Grant Hill 1 reedición. FILA.com también tiene el catálogo oficial con envío a España. Para tallas o colorways específicos, KicksCrew tiene buena disponibilidad con envío internacional." },
    ],
  }),

  // ── TALLA GRANDE ──────────────────────────────────────────────────
  {
    slug: "zapatillas-baloncesto-talla-grande",
    title: "Zapatillas de baloncesto talla grande (45-50) | CANCHA.ZAPA",
    description: "Las mejores zapatillas de baloncesto en talla grande 45, 46, 47, 48 y más. Qué marcas llegan a tallas extra en España y dónde comprarlas.",
    eyebrow: "★ Talla grande · Pie grande",
    h1Pre: "Zapatillas baloncesto",
    h1Accent: "talla grande",
    h1Post: "— 45 a 50 EU",
    lede: "Si usas talla 45 o más, saber qué modelos llegan a tu talla es tan importante como la calidad de la zapatilla. Aquí filtramos lo más puntuado para que elijas con confianza.",
    filter: (z) => ["Nike", "Adidas", "Jordan", "Under Armour", "New Balance", "Li-Ning", "Anta"].includes(z.marca),
    sort: byScoreDesc,
    guideTitle: "Cómo comprar en talla grande en España",
    guideIntro: "Los jugadores con talla 45+ tienen una limitación real: no todos los modelos llegan a esas tallas en España. Las grandes marcas (Nike, Adidas, UA, New Balance) generalmente cubren hasta EU 49-50. Las marcas más pequeñas o de nicho pueden cortar en 46-47.",
    guidePoints: [
      { lab: "Nike llega hasta EU 50", body: "La mayoría de modelos Nike y Jordan llegan a US 16 (EU ~50) en stockx.com, Amazon ES tiene hasta EU 48-49 habitualmente. LeBron y KD son las líneas con mejor disponibilidad en tallas grandes." },
      { lab: "Adidas hasta EU 52", body: "Adidas es la marca con mayor rango de tallas en baloncesto: llega hasta US 18 en modelos como la AE 3 y Dame. Amazon ES y Adidas.es suelen tener tallas grandes en stock." },
      { lab: "UA Curry hasta EU 50", body: "Under Armour tiene buena disponibilidad de la línea Curry hasta EU 50. Curry 13 y 12 disponibles en tallas grandes en UA.es y Amazon ES." },
      { lab: "Pie ancho + talla grande", body: "Pie grande a menudo significa pie ancho. Nike LeBron y Adidas AE 3 tienen horma más generosa en tallas grandes. Evita modelos con horma estrecha como muchos Kyrie." },
    ],
    faqs: [
      { q: "¿Dónde comprar zapatillas de baloncesto talla 46, 47 o 48 en España?",
        a: "Amazon ES es la mejor opción con stock más amplio en tallas grandes. Nike.es y Adidas.es tienen tallas hasta EU 50 online aunque puede haber stock limitado. Foot Locker ES y JD Sports tienen menos disponibilidad. Para EU 49+, KicksCrew y StockX son opciones internacionales con envío a España." },
      { q: "¿Las zapatillas de baloncesto se hacen en talla 50?",
        a: "Sí, aunque no todos los modelos. Nike y Adidas llegan a US 16-18 (EU 49-52) en sus líneas signature principales. Jordan Brand también cubre US 16. Under Armour llega a US 15 (EU 49). Para tallas muy grandes, KicksCrew es la referencia con la mayor variedad." },
      { q: "¿En talla grande es mejor Nike o Adidas para baloncesto?",
        a: "Adidas tiene ligeramente mejor disponibilidad y horma más generosa en tallas grandes — el pie grande suele ir asociado a pie ancho, y Adidas horma es más cómoda. El LeBron de Nike también es amplio para tallas grandes. Para pívots con talla 47+: Nike LeBron 22 o Adidas AE 3 son las apuestas más seguras." },
    ],
    related: [],
    catalogQuery: "?marca=Nike",
    catalogLabel: "Ver catálogo ordenado por score",
  },

  // ── MEJOR DE 2025 ──────────────────────────────────────────────────
  {
    slug: "mejores-zapatillas-baloncesto-2025",
    title: "Las mejores zapatillas de baloncesto 2025-2026 | CANCHA.ZAPA",
    description: "Los mejores modelos de zapatillas de baloncesto de 2025 y 2026. Análisis técnico honesto de los lanzamientos más relevantes.",
    eyebrow: "★ Temporada 2025-2026",
    h1Pre: "Mejores zapatillas",
    h1Accent: "2025-2026",
    h1Post: "",
    lede: "Los lanzamientos más destacados de la temporada 2025-2026. Solo los modelos que ya se pueden comprar en España, ordenados por puntuación técnica real.",
    filter: (z) => z.año_lanzamiento >= 2025,
    sort: byScoreDesc,
    guideTitle: "Qué novedades trajo 2025 al baloncesto",
    guideIntro: "2025 ha sido un año de innovación en espumas: ZoomX llega al baloncesto con la Air Jordan 40, Lightstrike Pro evoluciona en la AE 3, y Under Armour consolida UA Flow. Los signature siguen siendo la apuesta segura.",
    guidePoints: [
      { lab: "ZoomX en baloncesto", body: "La Air Jordan 40 es la primera en combinar ZoomX + Zoom Strobel. Antes solo estaba en running." },
      { lab: "Signature más competitivos", body: "AE 3, Ja 3, Curry 13, Jordan 40 — el listón técnico sube cada año. 2025 no defrauda." },
      { lab: "Budget mejora", body: "Adidas Dame X a 95€ demuestra que se puede tener tecnología signature sin gastar 150€+." },
      { lab: "Marcas chinas maduran", body: "Anta y Li-Ning siguen mejorando. KAI 2 y WoW AllCity 13 son opciones reales para jugadores europeos." },
    ],
    faqs: [
      { q: "¿Cuáles son las mejores zapatillas de baloncesto de 2025?",
        a: "Para guards: Nike Ja 3 y AE 3. Para jugadores equilibrados: Jordan Tatum 4 y Jordan Luka 5. Para cushion máximo: Air Jordan 40 y LeBron 23. Para presupuesto ajustado: Adidas Dame X." },
      { q: "¿Merece la pena comprar modelos de 2025 vs los de 2024?",
        a: "Depende. Si el precio es similar, sí — la tecnología avanza. Pero un modelo de 2024 en outlet al 30% de descuento puede ser mejor decisión que el de 2025 a precio completo." },
      { q: "¿Cuándo se pueden comprar en España los modelos nuevos?",
        a: "Los modelos Nike/Jordan/Adidas llegan a España 2-6 semanas después del lanzamiento en USA. Amazon ES y FootLocker ES suelen tener stock en el momento del drop." },
    ],
    related: [],
    catalogQuery: "?año=2025",
    catalogLabel: "Ver todas las zapatillas de 2025",
  },
];

// ─────────────────────────────────────────────────────────────────────
// Slugs como const para getStaticPaths
// ─────────────────────────────────────────────────────────────────────
export const SEO_SLUGS = SEO_PAGES.map((p) => p.slug);

// Helper: añadir internal linking automático
// (las 3 siguientes páginas en la lista, ciclando)
SEO_PAGES.forEach((p, i) => {
  const next1 = SEO_PAGES[(i + 1) % SEO_PAGES.length];
  const next2 = SEO_PAGES[(i + 2) % SEO_PAGES.length];
  const next3 = SEO_PAGES[(i + 3) % SEO_PAGES.length];
  p.related = [next1.slug, next2.slug, next3.slug];
});

export function getSeoPage(slug: string): SeoPage | undefined {
  return SEO_PAGES.find((p) => p.slug === slug);
}
