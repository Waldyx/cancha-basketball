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
  slug: `mejores-zapatillas-${marcaKey.toLowerCase()}`,
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

  // ── MARCA ADICIONAL: Puma ──────────────────────────────────────────
  marca("Puma", {
    title: "Mejores zapatillas de baloncesto Puma 2026 | CANCHA.ZAPA",
    description: "Las 5 mejores Puma: LaMelo MB, Scoot Zeros, All-Pro Nitro. Análisis técnico + precio actualizado.",
    eyebrow: "★ Por marca · Puma",
    lede: "Puma volvió al baloncesto serio con LaMelo Ball y Scoot Henderson. NITROFOAM y All-Pro Nitro son sus apuestas para el performance.",
    intro: "Puma tardó décadas en volver al baloncesto, pero lo hizo bien. LaMelo Ball lleva la línea MB (innovadora, polarizante), mientras Scoot Henderson representa a los guards explosivos. Sus espumas NITROFOAM son competitivas.",
    points: [
      { lab: "MB line = expresión", body: "Las LaMelo MB son zapatillas de carácter: diseño atrevido, NITROFOAM reactivo, talla ligeramente grande." },
      { lab: "Scoot Zeros = court feel", body: "Para guards que priorizan sensación de suelo. Ligera, reactiva, sin el exceso de cushion de la MB." },
      { lab: "All-Pro Nitro = balanced", body: "La más equilibrada de Puma. Para aleros o jugadores que no quieren extremos." },
      { lab: "Disponibilidad en España", body: "Puma se encuentra en Foot Locker, JD Sports, Zalando y Puma.com. Menos presencia que Nike/Adidas." },
    ],
    faqs: [
      { q: "¿Puma es buena para baloncesto?",
        a: "Sí, si encajas en su perfil. Las MB son para guards expresivos; las All-Pro Nitro para jugadores equilibrados. La calidad técnica es real, no marketing." },
      { q: "¿La MB.05 de LaMelo Ball es buena para jugar?",
        a: "Sí. NITROFOAM con buena respuesta, tracción sólida, upper ventilado. No es la más ligera pero rinde bien indoor. Ojo: la talla tiende a quedar grande." },
      { q: "¿Mejor Puma para guards?",
        a: "Scoot Zeros o Clyde All-Pro 2. Ambas con respuesta alta y peso bajo, mejor para guards que la MB (más pesada y cushion)." },
    ],
  }),

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
