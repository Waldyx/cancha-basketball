import type { Zapatilla } from "./types";
import { findMejorPrecioMostrado } from "./scoring";

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
// Descuento (0-1) del precio MOSTRADO (solo tiendas afiliadas y sin reventa) frente al MSRP.
// A diferencia de lowestPrice, no cuenta tiendas sin afiliado ni precios de reventa.
// Un descuento solo cuenta si el precio se verificó hace poco y no es tan bajo que huela
// a dato malo (por encima del 55 % casi siempre es un precio mal leído o una réplica).
function descuentoMostrado(z: Zapatilla): number {
  const mejor = findMejorPrecioMostrado(z.links_compra, z.precio_msrp_eur);
  if (!mejor || !(mejor.precio_actual > 0) || !(z.precio_msrp_eur > 0)) return 0;
  const dias = (Date.now() - new Date(mejor.ultima_verificacion).getTime()) / 86_400_000;
  if (!(dias <= 10)) return 0;
  const d = 1 - mejor.precio_actual / z.precio_msrp_eur;
  return d > 0.55 ? 0 : d;
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
        a: "Las que combinan respuesta 8+ con ligereza de unos 380g o menos. Modelos top: Nike GT Cut 3, Anta KAI 1 Speed, UA Curry 12. Lo que tienen en común es court feel premium y peso bajo." },
      { q: "¿Mejor low-top o mid-top para bases?",
        a: "Low-top en la mayoría de casos. Solo sube a mid si tienes historial de esguinces de tobillo. La ganancia de soporte no compensa la velocidad perdida si tu tobillo está sano." },
      { q: "¿Cuánto debe pesar una zapa de base?",
        a: "Idealmente entre 320-380g en talla US 9. Más allá empieza a notarse en partidos largos." },
      { q: "¿Sirven las low-tops para asfalto?",
        a: "Algunas sí. Mira la durabilidad outdoor (score ≥ 7): entre las low-top, la KT 11 y la Shock Wave 5 aguantan bien; la GT Cut 3, la KAI 1 Speed y la Curry 11 se quedan por debajo." },
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
      { lab: "Mid-top óptimo", body: "Mid da más sujeción de tobillo, pero varias de las mejores equilibradas (Tatum 3, Harden Vol 9) son low-top." },
      { lab: "Cushion medio", body: "Necesitas algo de protección porque defiendes contra pívots, pero no exageres." },
      { lab: "Versatilidad de superficie", body: "Mira durabilidad ≥ 6 — el alero acaba jugando en cualquier sitio." },
    ],
    faqs: [
      { q: "¿Qué es una zapa equilibrada?",
        a: "La que no destaca en nada pero no falla en nada. Ningún eje por debajo de 6. Ejemplos: Adidas Harden Vol 9, Nike Sabrina 2, Anta KAI 2." },
      { q: "¿La Jordan Tatum es buena para aleros?",
        a: "Sí, es una opción equilibrada para alero: cushion, respuesta y soporte altos y parejos. Ojo: es low-top, de horma estrecha y se gasta pronto en asfalto." },
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
      { lab: "Peso razonable", body: "Cuanto menos pese mejor, pero en este puesto se acepta algo más de peso a cambio de protección." },
    ],
    faqs: [
      { q: "¿Cushion o estabilidad — qué importa más para un 4?",
        a: "Ambas. Pero si tienes que elegir, estabilidad antes que cushion: una caída lateral hace más daño que un aterrizaje sin cushion." },
      { q: "¿Buena zapa para ala-pívot pesado?",
        a: "LeBron 22, Tatum 3, Adidas Harden Vol 9. Todas con cushion alto y base estable." },
      { q: "¿Aguantan el asfalto?",
        a: "Ninguna de las dos es de asfalto: la LeBron 22 y la Tatum 3 tienen la misma durabilidad exterior, media. Verifica el score de durabilidad outdoor por modelo." },
    ],
  }),

  posicion("pivot", "pívot", "pívots", {
    eyebrow: "★ Por posición · Pívot",
    lede: "Para un pívot, la zapa es protección antes que rendimiento. Necesitas el máximo cushion del mercado, estabilidad de tanque y soporte lateral alto.",
    intro: "Eres el más pesado, saltas más, recibes los contactos más fuertes. Si pesas >100kg, las zapas blandas se rompen en 3 meses. Necesitas lo más sólido del catálogo.",
    points: [
      { lab: "Cushion 8+ obligatorio", body: "Score mínimo 8. Lo ideal 9. Aquí no escatimes." },
      { lab: "Estabilidad 9+", body: "Base ancha. Sin tambaleo. Es lo que evita que aterrices torcido." },
      { lab: "Soporte lateral alto, mejor con mid-top", body: "Soporte lateral 8+. Tus tobillos cargan con todo." },
      { lab: "Durabilidad cuenta", body: "Suela gruesa. Las zapas reactivas se desintegran bajo tu peso en semanas." },
    ],
    faqs: [
      { q: "¿Cuál es la mejor zapatilla de baloncesto para pívots?",
        a: "Nike LeBron 22 es la referencia: cushion, estabilidad y soporte lateral al máximo en nuestra ficha. Si pesas >90kg, es de lo más protector del catálogo." },
      { q: "¿Sirven las low-tops para pívots?",
        a: "Depende del soporte, no solo de la altura: la LeBron 22 es low-top y aun así tiene el soporte lateral al máximo. Si tienes historial de tobillos, busca mid-top." },
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
      { lab: "Goma maciza > XDR", body: "Las suelas XDR de Nike son válidas, pero lo que manda es la goma de cada modelo: mira el score de durabilidad exterior de la ficha." },
      { lab: "Patrón profundo", body: "Surcos profundos = más material que gastar antes de quedarte sin grip." },
      { lab: "Tracción 7+ en exterior", body: "Algunas zapas indoor patinan en cemento. Verifica que su tracción está testeada outdoor también." },
    ],
    faqs: [
      { q: "¿Qué zapatillas duran en asfalto?",
        a: "Las de goma dura y surcos profundos: en el catálogo, las que tienen durabilidad en exterior 7 o más. Entre las asequibles, Nike Precision 7, Jordan Luka .77, Adidas Dame Certified y Anta Shock Wave 5." },
      { q: "¿Cuánto duran las zapas en asfalto?",
        a: "Depende del modelo. Una Curry 12 (durabilidad exterior muy baja) se gasta en pocas semanas de asfalto; una Luka .77 o una Shock Wave 5 (de las más altas del catálogo) aguantan mucho más." },
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
        a: "Entre las de amortiguación más alta del catálogo están la Nike LeBron 22 (Air Zoom y Cushlon 3.0), la LeBron 23 (ZoomX, Cushlon y placa de carbono) y la KD 19 (Zoom Strobel y Cushlon 3.0)." },
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
        a: "Mal. La Curry 12 tiene una durabilidad exterior muy baja y se gasta en pocas semanas de asfalto; la GT Cut 3 aguanta algo más, pero tampoco es de calle. Si juegas fuera, no es la categoría para ti." },
    ],
  }),

  categoria("balanced", {
    humanPlural: "equilibradas",
    eyebrow: "★ Categoría · Equilibradas",
    lede: "Sin punto flojo, sin extremos. Si dudas qué comprar y no te identificas con un perfil claro, una equilibrada es la apuesta segura.",
    intro: "\"Equilibrada\" no es \"mediocre\". Es la zapa que hace bien todo sin destacar en nada. Para la mayoría de jugadores, es la categoría correcta — solo que no es la más sexy.",
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
        a: "Adidas Harden Vol 9 y Anta KAI 2. Ambas con score 7+ en cada atributo, sin puntos flojos." },
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
        a: "Muchas tienen la nota máxima de tracción en nuestra ficha; dos de las que más destacan son la Nike Kobe 8 Protro y la Anta KAI 1 Speed. En los rankings tienes el resto." },
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
      { lab: "Las baratas también aguantan", body: "Una Nike Precision 7 o una Jordan Luka .77 aguantan el exterior mejor que muchas zapatillas de 150 €: lo que manda es la goma, no el precio." },
      { lab: "Modelos antiguos descontados", body: "Una Curry 10 u 11 por debajo de su precio oficial rinde más que muchas zapas nuevas básicas; mira su precio de hoy en la ficha." },
      { lab: "Asume sin tope-de-gama", body: "Cushion básico, materiales sintéticos. Está bien, solo gestiona expectativas." },
      { lab: "Lo que NO compres", body: "Marcas blancas sin tracción testeada. Mejor un modelo antiguo de marca conocida." },
    ],
    faqs: [
      { q: "¿Hay zapas de baloncesto buenas por menos de 50€?",
        a: "A veces, según tienda y talla. La Decathlon Tarmak Fast 900 y la Adidas Ownthegame 3 son básicas pero cumplen para jugar de forma recreativa, y a veces hay gamas altas de temporadas pasadas rebajadas a ese precio. Mira el precio de hoy en cada ficha." },
      { q: "¿Vale la pena gastar más de 80€?",
        a: "Depende. Si juegas federado 2+ veces por semana, los 100-130€ se justifican (cushion + tracción premium). Para recreativo casual, sub-80€ sobra." },
      { q: "¿Las baratas duran menos?",
        a: "No necesariamente. Una Nike Precision 7 dura más en asfalto que muchas premium. La durabilidad depende de la goma, no del precio." },
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
      { lab: "Gama media", body: "Muchas zapas de gama media están en este rango: Nike Ja 2, Puma MB.05 o Anta KT 11." },
      { lab: "Compras anteriores en outlet", body: "Una Curry 11 rebajada es mejor compra que una Curry 12 a precio completo si te apañas con un año menos de tecnología." },
      { lab: "Tope para amateurs", body: "Salvo que juegues 4+ veces por semana o federado serio, no necesitas más." },
      { lab: "Cuidado con descatalogados", body: "Si la encuentras en mid-range pero es de hace 3 años, verifica que la suela no esté reseca." },
    ],
    faqs: [
      { q: "¿Cuánto debo gastar en zapas de baloncesto?",
        a: "Si juegas recreativo: 50-80€. Federado amateur: 80-130€. Federado serio: 130-200€. Más allá es vanidad o necesidad muy específica." },
      { q: "¿Mejores zapas por 100€?",
        a: "Adidas Trae Young 3, Nike Ja 2, Puma MB.04 y Anta KAI 1 Speed. Las 4 tienen score 7+; el precio de hoy está en cada ficha." },
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
        a: "Si juegas 4+ veces por semana federado y notas el court feel y la respuesta, sí. Si juegas 1 vez por semana recreativo, no — gasta 100€ y compra otra cosa." },
      { q: "¿Mejores zapas premium 2025?",
        a: "Nike LeBron 22 (cushion king), Nike Kobe 8 Protro (reactiva premium), UA Curry 12 (ligereza). Cada una líder en su nicho." },
      { q: "¿Las signature siempre son mejores?",
        a: "No. Una signature antigua puede quedarse por detrás de un modelo de gama media más reciente. El año del modelo importa más que el nombre." },
    ],
    filter: (z) => lowestPrice(z) > 130,
    sort: byScoreDesc,
    catalogQuery: "?precio_min=130",
    catalogLabel: "Ver catálogo premium",
  }),

  // ── RELACIÓN CALIDAD-PRECIO (valor por euro, no solo precio bajo) ─────
  {
    slug: "zapatillas-baloncesto-calidad-precio",
    title: "Mejores zapatillas de baloncesto calidad-precio 2026 | CANCHA.ZAPA",
    description:
      "Las zapatillas de baloncesto con mejor relación calidad-precio en 2026: máximo rendimiento por euro, no solo las más baratas. Ranking honesto por score/precio con precios verificados en tiendas españolas.",
    eyebrow: "★ Relación calidad-precio",
    h1Pre: "Zapatillas baloncesto",
    h1Accent: "calidad-precio",
    h1Post: "2026",
    lede: "No es lo mismo barato que buen valor. Aquí mandan las que dan más rendimiento por cada euro: score alto a precio contenido. Las marcas chinas y los modelos de gama media arrasan en esta lista.",
    filter: (z) => z.genero !== "gs" && !z.es_retro && avg(z) >= 8.0 && lowestPrice(z) <= 130,
    sort: (a, b) => avg(b) / lowestPrice(b) - avg(a) / lowestPrice(a),
    guideTitle: "Cómo medir la relación calidad-precio de verdad",
    guideIntro:
      "El 'mejor precio' no es el número más bajo, es el rendimiento que te llevas por lo que pagas. Una zapa de 100€ con score 8.9 bate a una de 60€ con score 6.5. Estas son las claves para no confundir barato con buen valor.",
    guidePoints: [
      { lab: "Mira score ÷ precio, no solo el precio", body: "Una Anta KAI Speed o una Adidas Dame X rinden como flagships mucho más caras. Ese es el valor real." },
      { lab: "Las marcas chinas son las reinas del valor", body: "Anta, Li-Ning, Rigorer y 361° ofrecen tecnología de primer nivel (placas de carbono, espumas reactivas) a mitad de precio que Nike/Jordan. El 'pero' es importarlas (AliExpress)." },
      { lab: "La gama media reciente puede batir a una signature antigua", body: "Una Nike Ja 2 o una Puma MB.05 pueden rendir más que una signature de hace 3 años, y a menor precio." },
      { lab: "El precio de hoy manda", body: "Una flagship del año pasado en outlet a 110€ puede ser mejor valor que la nueva a 180€. Verifica siempre el precio actual, no el MSRP." },
    ],
    faqs: [
      { q: "¿Cuál es la zapatilla de baloncesto con mejor relación calidad-precio en 2026?",
        a: "La gama Anta KAI Speed (KAI 1 Speed y KAI 2 Speed, a buen precio en AliExpress) y la Adidas Dame X encabezan la relación calidad-precio: rinden como flagships mucho más caras." },
      { q: "¿Las zapatillas chinas de baloncesto valen la pena?",
        a: "Sí, en rendimiento puro son imbatibles por precio: Anta y Li-Ning montan placas de carbono, y Rigorer placas de TPU, con espumas reactivas de primer nivel. El inconveniente es la disponibilidad (suelen venir de AliExpress) y el tallaje, que conviene revisar." },
      { q: "¿Buena relación calidad-precio significa barata?",
        a: "No. Barata es solo precio bajo; buena relación calidad-precio es rendimiento alto por euro. Una zapa de 100€ con score 8.9 es mejor compra que una de 55€ con score 6.5 si juegas en serio." },
      { q: "¿Merece la pena pagar más de 130€?",
        a: "Solo si juegas federado serio y notas diferencias sutiles de court feel. Para la mayoría, el sweet spot de valor está entre 70€ y 130€, donde tienes tecnología top sin pagar el premium del nombre." },
    ],
    related: [
      "zapatillas-baloncesto-baratas",
      "zapatillas-baloncesto-130-euros",
      "mejores-zapatillas-baloncesto-2025",
    ],
    catalogQuery: "?precio_max=130",
    catalogLabel: "Ver catálogo bajo 130€",
  },

  // ── LESIONES (3) ────────────────────────────────────────────────────
  lesion("zapatillas-baloncesto-para-rodillas", {
    title: "Zapatillas de baloncesto para problemas de rodilla | CANCHA.ZAPA",
    description: "Las 5 mejores zapatillas para jugar con problemas de rodilla. Máximo cushion, estabilidad y protección.",
    eyebrow: "★ Lesiones · Rodillas",
    h1Pre: "Zapatillas para",
    h1Accent: "rodillas",
    lede: "Si tienes molestias o historial de rodilla, el cushion no es opcional — es protección real. Estas 5 son las que mejor absorben impactos sin penalizar tu juego.",
    intro: "Las rodillas absorben varias veces tu peso corporal en cada aterrizaje. Si están sensibles, una zapa con cushion bajo es como correr sin amortiguación. Es solo cuestión de tiempo. Mira siempre cushion ≥ 7.",
    points: [
      { lab: "Cushion ≥ 7 mínimo", body: "Score 7 absoluto mínimo. Idealmente 8-9 si las molestias son serias." },
      { lab: "Estabilidad importante", body: "Una zapa inestable hace que aterrices mal y empeores el problema." },
      { lab: "Cuidado con court feel extremo", body: "Las zapas con poco cushion (por debajo de 7) transmiten más impacto a la rodilla, aunque sean muy reactivas." },
      { lab: "Consulta a fisio", body: "Una zapa no sustituye fisioterapia. Si el dolor persiste, ve al médico antes de seguir jugando." },
    ],
    faqs: [
      { q: "¿Qué zapa protege mejor las rodillas?",
        a: "La Nike LeBron 22, la LeBron 23 y la KD 19 están entre las de amortiguación más alta del catálogo, y la LeBron Witness 9 es una alternativa más económica. Son la referencia para rodillas sensibles." },
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
    lede: "Si te has torcido un tobillo, ya sabes. Esto es para evitar la segunda vez. Soporte lateral alto (mínimo 7 en nuestro filtro) y altura mid o high — nunca low.",
    intro: "El soporte de tobillo no es opcional si tienes historial. Las low-tops están descartadas. Necesitas un cuello alto que bloquee la inversión lateral del pie. Y un sistema de cordones que ajuste de verdad.",
    points: [
      { lab: "Mid o high, nunca low", body: "Low-tops no protegen. Cero excepciones si vienes de esguince serio." },
      { lab: "Soporte lateral 8+", body: "Score mínimo. La construcción importa más que la altura por sí sola." },
      { lab: "Sistemas de bloqueo", body: "Lace-locks, straps adicionales — todo lo que ajuste la zapa al pie ayuda." },
      { lab: "Tobillera como complemento", body: "Una buena tobillera (no de farmacia) + zapa adecuada es la combinación de oro. La zapa sola no basta si el esguince fue serio." },
    ],
    faqs: [
      { q: "¿Mid-top o high-top para tobillos débiles?",
        a: "Un mid-top moderno (UA Curry 13, Puma MB.04) suele ser suficiente y más cómodo. Los high-top de rendimiento casi han desaparecido, y ojo: modelos con fama de estables como la Tatum 4 o las LeBron actuales ya son low-top." },
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
    intro: "Parte de Nike/Jordan va estrecha; la serie LeBron, la Dame 9 de Adidas y algunas otras van anchas, y el resto de marcas suele ser de horma normal. La trampa es que muchas marcas dicen \"true to size\" cuando no lo son.",
    points: [
      { lab: "Horma ancha o normal", body: "Filtra por horma. Las marcadas \"estrecha\" se descartan." },
      { lab: "Mira la línea, no la marca", body: "Dentro de Nike, la LeBron y algunas Freak dan espacio en el antepié; la Zion, la Ja, la KD 18 y 19 o la Kobe 8 Protro van estrechas. Anta suele ir ceñida." },
      { lab: "Sube media talla si dudas", body: "Mejor un poco grande que apretada — apretada te causa problemas de fascia." },
      { lab: "Knit upper se adapta", body: "Los uppers de Primeknit/Flyknit ceden más que mesh + TPU." },
    ],
    faqs: [
      { q: "¿Qué marcas son mejores para pies anchos?",
        a: "Entre las marcas del catálogo, la horma más habitual de Adidas, New Balance y Anta es la normal; las más anchas son la Dame 9 de Adidas y la serie LeBron de Nike. En Nike y Jordan hay de todo: mira la horma de cada ficha." },
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
    lede: "El pie plano es frecuente entre los jugadores. Con la zapatilla correcta, no es una desventaja. Con la incorrecta, se convierte en una fuente de dolor en rodillas y fascia. Estas 5 son las más recomendadas.",
    intro: "El pie plano (o pronación excesiva) significa que el arco interno del pie toca el suelo casi por completo. En baloncesto, esto genera mayor estrés en rodillas y tobillos. La solución: zapatillas con estabilidad alta, cushion generoso y base ancha que distribuya las fuerzas correctamente.",
    points: [
      { lab: "Estabilidad > cushion blando", body: "Un cushion demasiado blando colapsa bajo la pronación. Necesitas espuma firme-a-media con soporte lateral 7+." },
      { lab: "Base ancha y counter de talón rígido", body: "La base ancha evita que el tobillo colapse hacia dentro. Un counter de talón rígido mantiene la alineación. Evita las ultra-ligeras sin soporte." },
      { lab: "Horma normal o ancha obligatoria", body: "Pie plano a menudo va asociado a pie ancho. Las hormas estrechas agravan la pronación. New Balance, LeBron y AE 2 son las más seguras." },
      { lab: "Plantilla ortopédica como complemento", body: "Si la pronación es severa, combina la zapatilla con una plantilla ortopédica. La zapa sola no sustituye una plantilla personalizada si la pronación es estructural." },
    ],
    faqs: [
      { q: "¿Qué zapatilla de baloncesto es mejor para pie plano?",
        a: "UA Curry 13 y Jordan Tatum 4 son opciones razonables para pie plano: la Curry 13 tiene estabilidad y soporte lateral altos, y la Tatum 4 los tiene medios, con cushion sólido y horma normal. Nike LeBron 22 es la opción si el peso supera los 90 kg. Evita zapatillas con poco soporte como la GT Cut 4." },
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
      { lab: "Signature por perfil", body: "LeBron = cushion. Kobe = reactiva. KD = equilibrada y de cushion alto. Ja = explosiva y ligera. Curry no: fue de UA hasta 2026 y hoy Steph es agente libre de calzado." },
      { lab: "GT Cut, joya escondida", body: "La GT Cut 3 es una zapatilla muy completa (respuesta y tracción altas, durabilidad exterior baja) y no lleva nombre famoso. Mejor para interior." },
      { lab: "Horma según el modelo", body: "La LeBron y algunas Freak son de horma ancha, buena parte son normal y otras (Kobe 8, KD 18 y 19, Ja, Sabrina 3) son estrechas. Mira la horma de cada ficha." },
      { lab: "Innovación cada 18 meses", body: "Los modelos signature renuevan cada 1-2 años. Comprar el anterior con descuento es viable." },
    ],
    faqs: [
      { q: "¿Mejor Nike de baloncesto del momento?",
        a: "Depende del perfil. Pívots: LeBron 22. Guards: GT Cut 3 o Kobe 8 Protro. Aleros: KD 17 o Sabrina 2." },
      { q: "¿Las Nike duran en asfalto?",
        a: "Depende del modelo: mira el score de durabilidad exterior de cada ficha. La GT Cut 3 y la LeBron 22 puntúan igual (5 sobre 10): ninguna de las dos es de asfalto." },
      { q: "¿Por qué Nike es tan cara?",
        a: "Marketing + signature deals + I+D en espumas. Tecnológicamente competitiva, pero pagas también el nombre." },
    ],
  }),

  marca("Jordan", {
    title: "Mejores zapatillas de baloncesto Jordan 2025 | CANCHA.ZAPA",
    description: "Las 5 mejores Jordan Brand performance: Tatum, Luka, Zion. No retros, modelos para jugar.",
    eyebrow: "★ Por marca · Jordan",
    lede: "Jordan Brand performance (no retros) es de las marcas más sólidas en 2025. Tatum, Luka y Zion compiten cara a cara con las top Nike.",
    intro: "Jordan Brand (filial de Nike) tiene su propia línea performance, separada de los retros lifestyle. Tatum, Luka, Zion son referencia para alero y ala-pívot. Cuestan parecido a sus primas Nike signature y comparten sus espumas.",
    points: [
      { lab: "Tatum = equilibrada", body: "Cushion, respuesta y soporte altos y parejos; su punto flojo es la durabilidad en exterior." },
      { lab: "Luka = cushion grande", body: "Pensada para Luka, lo que significa: jugadores potentes >85kg con cushion alto." },
      { lab: "Zion = para los más físicos", body: "La Zion 4 es la que mejor encaja (cushion y estabilidad altos); la Zion 3 se queda corta en estabilidad. Ambas son estrechas y pesadas." },
      { lab: "Precio relativo", body: "Las Jordan performance cuestan parecido a las Nike signature equivalentes." },
    ],
    faqs: [
      { q: "¿Diferencia entre Air Jordan retros y Jordan performance?",
        a: "Los retros (XI, IV, etc.) son lifestyle — no se diseñan para baloncesto moderno. Las performance (Tatum, Luka, Zion) sí. Si vas a jugar, performance." },
      { q: "¿Vale la pena Jordan vs Nike?",
        a: "Jordan y Nike cuestan parecido en la gama signature. La Tatum 3 y la Sabrina 2 son ambas equilibradas: la Tatum 3 da algo más de cushion y la Sabrina 2 más respuesta y ligereza, y cuesta menos." },
      { q: "¿Mejor Jordan para pívots?",
        a: "Jordan Zion 4. Cushion y estabilidad altos para jugadores físicos, aunque es pesada y de horma estrecha." },
    ],
  }),

  marca("Adidas", {
    title: "Mejores zapatillas de baloncesto Adidas 2025 | CANCHA.ZAPA",
    description: "Las 5 mejores Adidas: Trae Young, Harden, Dame, Cross 'Em Up. Análisis honesto + mejor relación calidad-precio.",
    eyebrow: "★ Por marca · Adidas",
    lede: "Adidas es la alternativa real a Nike. Líneas signature (Harden, Trae Young, Dame) + las team. Suele dar buena relación calidad-precio.",
    intro: "Adidas no domina el volumen como Nike pero tiene buenos signature (Harden para potentes, Trae para guards —la Trae Young 3 fue la última de su línea— y Dame, que sigue con la Dame X de 2025). Las team como la Cross 'Em Up Select (talla junior) cubren el rango bajo.",
    points: [
      { lab: "Harden = potencia y cushion", body: "La Vol 9 combina Boost y Lightstrike. Buena para jugadores potentes que aún se mueven." },
      { lab: "Trae Young = guards explosivos", body: "Reactiva con buena tracción. Compite con la Kyrie." },
      { lab: "Cross 'Em Up Select = opción junior", body: "Es de talla junior (GS) y de precio muy bajo, una buena entrada para niños y principiantes." },
      { lab: "Horma normal-ancha", body: "Más cómoda para la mayoría que Nike. Si vienes de Nike y te aprietan, prueba Adidas tu talla normal." },
    ],
    faqs: [
      { q: "¿Adidas o Nike?",
        a: "Adidas suele tener mejor relación calidad-precio media. Nike tiene más opciones y la frontera tecnológica. Si dudas, compara mismo modelo en ambas y revisa precio actual." },
      { q: "¿Mejor Adidas signature?",
        a: "Trae Young 3 para guards, Harden Vol 9 para potentes/aleros. Las dos con score técnico 7+." },
      { q: "¿Adidas aguanta outdoor?",
        a: "Depende del modelo: en nuestras fichas la durabilidad exterior media de Adidas y de Nike es parecida. De las de Adidas, aguantan muy bien la Dame Certified y la Cross 'Em Up Select (junior)." },
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
    lede: "Under Armour fue la marca de Steph Curry durante 12 años, hasta la ruptura de 2025. La UA Flow y la espuma HOVR+ son sus apuestas en court feel y ligereza para guards.",
    filter: (z) => z.marca.toLowerCase() === "under armour",
    sort: byScoreDesc,
    guideTitle: "Cómo es la oferta de Under Armour",
    guideIntro: "La línea Curry tiene un court feel de los mejores del mercado, junto a la Kobe 8 Protro. Ojo al contexto: Curry Brand ya NO es de Under Armour — Steph Curry y la marca rompieron en noviembre de 2025, él conserva la marca y sus logos, y la Curry 13 (febrero de 2026) es la última Curry de UA. La UA Flow es una suela de espuma sin goma tradicional (en la D. Fox 2, entresuela y suela en una sola pieza) que aporta una respuesta muy diferente a lo de Nike/Adidas.",
    guidePoints: [
      { lab: "Curry = referencia guards", body: "Las Curry 12/13 tienen court feel premium y ligereza top. La preferida de muchos escoltas y bases europeos. La 13 cierra la saga: no habrá Curry 14 de UA." },
      { lab: "UA Flow = suela única", body: "Espuma de suela sin pegamento. Más ligera y sensible que goma convencional. Se gasta más rápido en outdoor." },
      { lab: "HOVR = cushion", body: "La espuma HOVR (Havoc 5) y HOVR+ (Curry 13) es la apuesta de UA en amortiguación. Buena relación cushion/respuesta sin llegar a la UA Flow en court feel." },
      { lab: "Precio competitivo", body: "UA suele costar algo menos que Nike en gamas equivalentes. Buena propuesta para mismo nivel técnico." },
    ],
    faqs: [
      { q: "¿Merece la pena Under Armour para baloncesto?",
        a: "Sí, especialmente si eres guard o escolta. Las Curry 12 y 13 tienen un court feel de los mejores del mercado, junto a la Kobe Protro. Si priorizas respuesta, UA es la apuesta. Eso sí, la Curry 13 es la última de la línea: UA y Steph Curry se separaron en 2025, así que el catálogo Curry deja de renovarse." },
      { q: "¿Cuánto cuestan las Curry en España?",
        a: "El precio actual de la UA Curry 13 está en su ficha, con las tiendas que la tienen. Las versiones anteriores (Curry 11, 12) suelen aparecer en outlet con descuento. Muy buen valor." },
      { q: "¿UA Flow se puede usar en exterior?",
        a: "Poco tiempo. La UA Flow sin goma adicional se desgasta rápido en outdoor. Úsalas solo en pista cubierta." },
    ],
    related: [],
    catalogQuery: "?marca=Under+Armour",
    catalogLabel: "Ver todas las zapatillas Under Armour",
  },

  // ── MUJER ──────────────────────────────────────────────────────────
  {
    slug: "zapatillas-baloncesto-mujer",
    title: "Mejores zapatillas de baloncesto para mujer 2026 | CANCHA.ZAPA",
    description: "Las mejores zapatillas de baloncesto para mujer 2026: signatures unisex con ADN WNBA (Sabrina, Stewie, Heir Series) y moldes 100% femeninos (UA Flow Breakthru 4, Adidas Exhibit Select).",
    eyebrow: "★ Para mujer · WNBA inspired",
    h1Pre: "Zapatillas de baloncesto",
    h1Accent: "para mujer",
    h1Post: "",
    lede: "Las mejores zapatillas para jugadoras, en dos familias: signatures unisex con ADN femenino (Sabrina, A'One, Stewie, Jordan Heir Series) y moldes 100% femeninos de horma anatómica (UA Flow Breakthru 4, Adidas Exhibit Select).",
    filter: (z) =>
      z.genero === "women" ||
      (z.tags || []).includes("mujer") ||
      (z.signature_player !== undefined && ["Sabrina Ionescu", "Breanna Stewart", "A'ja Wilson"].some(p => z.signature_player?.includes(p))),
    sort: byScoreDesc,
    guideTitle: "Cómo elegir zapa para baloncesto femenino",
    guideIntro: "Hay dos enfoques y conviene distinguirlos. Las signatures con ADN femenino (Sabrina, Stewie, A'One, Jordan Heir Series) se venden en tallaje unisex pero están pensadas para el juego femenino: las usan ellas y ellos. Las de horma 100% femenina (UA Flow Breakthru 4, Adidas Exhibit Select) se construyen sobre un molde anatómico de mujer (talón estrecho, arco elevado) y no tienen versión de hombre.",
    guidePoints: [
      { lab: "Signatures unisex (las más vendidas)", body: "Nike Sabrina 3, A'One, Puma Stewie, Jordan Heir Series. Máximo rendimiento y disponibles en cualquier sitio. Horma estándar ceñida." },
      { lab: "Horma 100% femenina", body: "UA Flow Breakthru 4 y Adidas Exhibit Select (en Amazon España): talón estrecho que evita que el pie se deslice al saltar." },
      { lab: "Si el talón se te escapa", body: "Es el problema nº1 con hormas de hombre. La familia 100% femenina lo soluciona: ve directa a Flow Breakthru o Exhibit Select." },
      { lab: "Ligereza y court feel", body: "El peso medio del pie es menor: prioriza zapas ligeras y reactivas (sub-350g). La respuesta importa más que un cushion enorme salvo en poste." },
    ],
    faqs: [
      { q: "¿Cuál es la mejor zapatilla de baloncesto para mujer?",
        a: "Depende del ajuste que busques. Para rendimiento puro y disponibilidad fácil: Nike Sabrina 3 o Jordan Heir Series (signatures unisex). Para horma 100% femenina comprable en España: UA Flow Breakthru 4 o Adidas Exhibit Select." },
      { q: "¿Qué diferencia hay entre una signature unisex y una de horma 100% femenina?",
        a: "La signature unisex (Sabrina, Stewie, Heir) usa horma estándar y la compran hombres y mujeres. La de horma 100% femenina (Flow Breakthru, Exhibit) está moldeada sobre la anatomía del pie de mujer: talón más estrecho, arco elevado, menos volumen. Un hombre notaría el talón demasiado apretado." },
      { q: "¿Las zapas de hombre sirven para mujer?",
        a: "Sí, en talla equivalente, y las unisex son perfectamente válidas. La ventaja de las 100% femeninas es que evitan el deslizamiento del talón al saltar, un problema típico con hormas masculinas." },
    ],
    related: [],
    catalogQuery: "?mujer=1",
    catalogLabel: "Ver catálogo de mujer",
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
      { lab: "Sub-100€ es suficiente", body: "Adidas Cross 'Em Up Select, Nike Air Zoom Crossover 2 y Decathlon Tarmak Fast 900 NBA Junior. Más que suficiente para junior." },
      { lab: "Durabilidad outdoor", body: "Los jóvenes juegan en cualquier sitio. Mira durabilidad ≥ 6 para que aguante parquet + asfalto." },
      { lab: "Tracción 7+", body: "Seguridad ante todo. Los jóvenes se mueven rápido y necesitan agarre real." },
      { lab: "Media talla grande", body: "Los pies de los jóvenes crecen rápido. Comprar media talla grande da unas semanas extra de uso." },
    ],
    faqs: [
      { q: "¿Cuánto gastar en zapas de baloncesto para un niño?",
        a: "50-90€ es el rango óptimo. Por debajo de 50€ la calidad se resiente mucho. Más de 100€ no se justifica si el pie va a crecer en 6 meses." },
      { q: "¿Mejor zapa de baloncesto para junior?",
        a: "Adidas Cross 'Em Up Select y Nike Air Zoom Crossover 2. Las dos tienen tracción y durabilidad suficientes." },
      { q: "¿Sirven las zapatillas de running para baloncesto?",
        a: "No. Las de running tienen amortiguación lateral incorrecta para los cortes laterales del baloncesto. El riesgo de esguince es mayor. Usa siempre zapatillas diseñadas para basketball." },
    ],
    related: [],
    catalogQuery: "?junior=1",
    catalogLabel: "Ver el segmento Junior (GS)",
  },

  // ── RETRO ──────────────────────────────────────────────────────────
  {
    slug: "zapatillas-baloncesto-retro",
    title: "Zapatillas de baloncesto retro | Catálogo histórico | CANCHA.ZAPA",
    description: "Las mejores zapatillas de baloncesto retro e históricas analizadas: Air Jordan, Kobe Protro, Reebok Question, Converse. Scores reales, no nostalgia.",
    eyebrow: "🏅 Colección histórica",
    h1Pre: "Zapatillas de baloncesto",
    h1Accent: "retro",
    h1Post: "— Historia y rendimiento",
    lede: "Las zapatillas históricas, analizadas con el mismo rigor que los modelos modernos. Descubre cuáles siguen siendo jugables y cuáles son solo para colección.",
    filter: (z) => !!z.es_retro,
    sort: (a, b) => b.año_lanzamiento - a.año_lanzamiento,
    guideTitle: "Retro no significa malo",
    guideIntro: "Las zapatillas retro de baloncesto van de las que superan el 6/10 técnico (Kobe Protros, Jordan 11/12) a las puramente históricas como la Converse Chuck Taylor de 1917. Aquí te explicamos las diferencias clave.",
    guidePoints: [
      { lab: "Kobe Protros — las mejores jugables", body: "Nike actualizó las suelas y la amortiguación de las Kobe Protro (Zoom Turbo en la 5 y la 6, React en la 8 y la 9). Son retros en aspecto pero modernas en rendimiento. Las más recomendadas para jugar de verdad." },
      { lab: "Jordan 12 y 11 — clásicas que aguantan", body: "Zoom Air en la 12 y Air de longitud completa en la 11, tracción herringbone y cuero durable. La 12 (Flu Game) y la 11 son de las Jordan clásicas más jugables." },
      { lab: "Reebok Iverson — la Question Mid", body: "La Question Mid de Allen Iverson (1996). Tracción de goma pegajosa y upper de cuero. Para ser de los 90, rinde mejor de lo esperado." },
      { lab: "Iconos históricos — para colección", body: "Chuck Taylor (1917), Puma Clyde (1973), Converse Weapon (1986). Cultura pura, rendimiento limitado." },
    ],
    faqs: [
      { q: "¿Cuáles son las mejores zapatillas retro de baloncesto para jugar?", a: "La Kobe 5 Protro es de las mejores: Nike la rediseñó con Zoom Turbo en el antepié sobre Cushlon y outsole nuevo manteniendo el aspecto original. También la Air Jordan 12 tiene Zoom Air y es jugable. Para estilos menos explosivos, la Reebok Question Mid de Iverson aguanta bien." },
      { q: "¿Son las Air Jordan retro buenas para jugar baloncesto?", a: "Depende de la generación. La Jordan 12 tiene Zoom Air y la 11 un Air de longitud completa; las dos son jugables aunque pesadas. Las Jordan 1, 2, 3 y 4 son principalmente colección — cuero rígido, cushion básico y peso elevado. Las Kobe Protro (que no son Jordan pero son Nike) son las mejores retros para jugar." },
      { q: "¿Cuánto cuestan las zapatillas retro de baloncesto en España?", a: "Las retros más accesibles son la Converse Chuck Taylor (~75€) y el Puma Clyde (~80€). Las Jordan retro tienen un precio oficial de unos 180€ (Jordan 1) a 220€ (Jordan 11/12). Las Kobe Protro cuestan 175-200€. Busca en KicksCrew y Amazon ES para precios competitivos." },
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
    lede: "Puma volvió al baloncesto con la línea Nitro y LaMelo Ball. El MB.04 y el MB.05 son las más visibles de la línea. ¿Merecen la pena?",
    intro: "Puma regresó al baloncesto de alto rendimiento en 2018 y apostó después por la espuma Nitro (nitrógeno inyectado en la espuma). La línea MB (LaMelo Ball) es la más visible, pero la All-Pro Nitro y la Scoot Zeros también tienen mérito técnico real.",
    points: [
      { lab: "Nitro foam — diferenciador clave", body: "La espuma Nitro de Puma está infusionada con nitrógeno y busca ligereza y buen retorno energético." },
      { lab: "Tracción sólida", body: "El outsole del MB.04 agarra bien, aunque la MB.05, la All-Pro Nitro 2 y la Stewie 4 puntúan más alto en tracción en nuestras fichas." },
      { lab: "LaMelo = colorways únicos", body: "Si quieres hacerte notar en la cancha, la línea MB tiene los diseños más atrevidos del mercado. El rendimiento está, pero el estilo también." },
      { lab: "Precio razonable", body: "MB.04, All-Pro Nitro 2 y Stewie 4: el precio de hoy está en cada ficha. Puma suele tener promociones en Amazon ES." },
    ],
    faqs: [
      { q: "¿Son buenas las Puma para baloncesto real?",
        a: "Sí. La línea Nitro tiene tecnología de espuma real, no marketing. El MB.04 y la All-Pro Nitro 2 compiten técnicamente con la Adidas AE 2 y la Trae Young en sus rangos de precio." },
      { q: "¿Qué diferencia hay entre MB.04 y MB.05?",
        a: "En nuestra ficha la MB.05 gana en tracción, respuesta y ligereza, y empatan en amortiguación. La MB.04 es mid y sujeta algo más el tobillo. Para guards rápidos: MB.05. Si quieres más sujeción: MB.04." },
      { q: "¿Dónde comprar Puma baloncesto en España?",
        a: "En nuestro catálogo, la línea MB se compra sobre todo en Amazon ES (MB.03, MB.04, MB.05), FuikaOmar (MB.05) y Puma.com (MB.06). Mira la ficha de cada modelo para el stock de hoy." },
    ],
  }),

  // ── MARCA: Anta ───────────────────────────────────────────────────
  marca("Anta", {
    title: "Mejores zapatillas de baloncesto Anta 2026 | CANCHA.ZAPA",
    description: "Las 5 mejores Anta de baloncesto: KAI 2, KAI 1 Speed, KT 11, Shock Game. Kyrie Irving y Klay Thompson endorsan a Anta. Análisis técnico honesto.",
    eyebrow: "★ Por marca · Anta",
    lede: "Anta tiene a Kyrie Irving (línea KAI) y Klay Thompson (línea KT). La KAI 2 es una de las zapatillas chinas con mejor relación calidad-precio del mercado europeo.",
    intro: "Anta es una de las mayores marcas deportivas de China y ha conquistado el baloncesto internacional con endorsements de peso: Kyrie Irving abandonó Nike para firmar con Anta, y Klay Thompson lleva la línea KT. El resultado es tecnología competitiva a precios más asequibles que Nike/Adidas.",
    points: [
      { lab: "KAI 2 = la sorpresa del año", body: "La KAI 2 de Kyrie Irving ofrece tracción y respuesta de gama alta a precio medio. Espuma Nitro Edge, entresuela con cage y suela de goma completa. Muy buena relación calidad-precio." },
      { lab: "KT 10/11 = para tiradores", body: "La línea KT de Klay Thompson prioriza estabilidad lateral y cushion sólido. Perfecta para tiradores de posición media que necesitan soporte en plant-and-shoot." },
      { lab: "Shock Game = segmento medio", body: "Para jugadores sin patrocinado favorito que buscan una Anta genérica de calidad. Precio medio, con placa de carbono y espuma A-Flash Edge." },
      { lab: "Talla y ajuste", body: "Anta suele ir ceñida, con ajuste de guante (Kai 2, Kai 3, KT 10): con pie ancho, prueba media talla más. Comprueba siempre la guía de tallas de cada modelo." },
    ],
    faqs: [
      { q: "¿Son buenas las zapatillas Anta para baloncesto?", a: "Sí, especialmente para el precio. La KAI 2 compite técnicamente con la Adidas AE 2 y suele costar menos. La marca invierte en tecnología real, no solo en marketing." },
      { q: "¿Merece la pena la Anta KAI 2 de Kyrie Irving?", a: "Sí. En nuestra ficha está arriba en tracción, amortiguación y respuesta, con horma normal (con pie ancho, prueba media talla más). Para bases o escoltas que buscan rendimiento de gama alta sin pagar precio de gama alta, es de las mejores compras." },
      { q: "¿Dónde comprar Anta en España?", a: "En nuestro catálogo las Anta se compran sobre todo en AliExpress, con FuikaOmar y Basketball Emotion para algunos modelos (envío desde España). Hay pocas tiendas físicas en España con stock." },
    ],
  }),

  // ── MARCA: Li-Ning ─────────────────────────────────────────────────
  marca("Li-Ning", {
    title: "Mejores zapatillas de baloncesto Li-Ning 2026 | CANCHA.ZAPA",
    description: "Las mejores Li-Ning de baloncesto: Gamma 2, Way of Wade 12, All City 14 y la línea Wade (DLo 2, 808 5 Ultra V2, Flash 2). Tecnología china de vanguardia.",
    eyebrow: "★ Por marca · Li-Ning",
    lede: "Li-Ning es el competidor más ambicioso de Nike en baloncesto. Con Dwyane Wade (WoW) y Jimmy Butler (JB), la marca china produce tecnología de primer nivel que todavía vuela bajo el radar en Europa.",
    intro: "Li-Ning fundó la marca en 1990, pero su salto al baloncesto de élite llegó con la línea WoW (Way of Wade) de Dwyane Wade. Hoy también tienen a Jimmy Butler, con su línea JB. Su tecnología de espuma BOOM es competitiva con ZoomX de Nike, y suele costar menos.",
    points: [
      { lab: "Way of Wade = la flagship", body: "La línea WoW es la flagship de Li-Ning: la WoW 12 es la de gama alta y las All City (13, 13 Encore, 14) dan casi lo mismo por bastante menos. BOOM reactivo, tracción agresiva y suelas que aguantan la calle." },
      { lab: "Wade DLo, Flash, Shadow y 808 = rendimiento barato", body: "Las líneas secundarias de Way of Wade son las mejores compras de la marca: la DLo 2 (de D'Angelo Russell), la Flash 2 y la Shadow 7 llevan BOOM de longitud completa y buena tracción a precio de zapatilla de equipo, y la 808 5 Ultra V2 monta Super BOOM de longitud completa, con una de las notas de amortiguación más altas que publica HoopsGeek." },
      { lab: "Gamma 2 = la tope de gama", body: "La Gamma 2 puntúa muy alto en nuestra ficha (tracción, respuesta, cushion y soporte lateral), pero es la Li-Ning más cara, por encima de las WoW. Es muy ligera y de horma estrecha." },
      { lab: "Sonic 12 = guards de primer paso", body: "La línea Sonic prioriza velocidad y respuesta. Para bases y escoltas que no necesitan mucho cushion pero sí explosividad." },
      { lab: "Talla: mide con cuidado", body: "Li-Ning tiende a tallar algo más pequeño que las marcas occidentales. Comprueba siempre la guía de tallas y, si tienes dudas, sube media talla." },
    ],
    faqs: [
      { q: "¿Es buena Li-Ning para baloncesto?", a: "Sí, y está subestimada en Europa. La WoW AllCity 13 compite con las mejores Adidas y Nike en el mismo rango de precio. La marca invierte en I+D real: BOOM foam, suelas multidireccionales propias." },
      { q: "¿Qué tecnología usa Li-Ning en sus zapatillas?", a: "BOOM foam (espuma ultra-ligera y reactiva), Light Foam Plus (en la Sonic 12) y placas de carbono o TPU en los modelos premium. Todo I+D propio, no licenciado." },
      { q: "¿Dónde comprar Li-Ning en España?", a: "AliExpress tiene el catálogo más amplio (envío de 2 a 4 semanas) y Basketball Emotion trae algunos modelos con envío desde España. Li-Ning no tiene tiendas físicas en España." },
    ],
  }),

  // ── MARCA: New Balance ─────────────────────────────────────────────
  marca("New Balance", {
    title: "Mejores zapatillas de baloncesto New Balance 2026 | CANCHA.ZAPA",
    description: "Las mejores New Balance de baloncesto que se compran en España: TWO WXY v4, Kawhi 4 y Kawhi 1. Espumas FuelCell y Fresh Foam en la cancha.",
    eyebrow: "★ Por marca · New Balance",
    lede: "New Balance volvió al baloncesto con Kawhi Leonard. Su TWO WXY v4 es de las más equilibradas del catálogo y, además, aguanta bien el exterior.",
    intro: "New Balance abandonó el baloncesto en los 90 y volvió con fuerza en 2018 firmando a Kawhi Leonard. Desde entonces, la marca ha lanzado la línea Two WXY (guards), la línea Kawhi (aleros/pívots) y la OMN1S (legacy de Kawhi). Tecnología FuelCell y Fresh Foam son sus propuestas de espuma.",
    points: [
      { lab: "Kawhi 4 = cushion", body: "La Kawhi 4 lleva FuelCell con una de las amortiguaciones más altas del catálogo: para aleros y jugadores grandes. Es de interior: su goma dura poco en la calle." },
      { lab: "TWO WXY = todoterreno", body: "La línea TWO WXY es la más completa de New Balance: FuelCell reactiva, buen agarre y una goma dura que aguanta el exterior. La v5 está entre las mejor valoradas del catálogo." },
      { lab: "Kawhi 1 = mid y resistente", body: "La primera Kawhi es mid y con una goma dura que se defiende fuera, para aleros que quieren algo más de sujeción. Es más antigua y difícil de encontrar a buen precio." },
      { lab: "Hay versión ancha", body: "Las TWO WXY de nuestras fichas son de horma normal; si no te entra una Nike, prueba también las New Balance." },
    ],
    faqs: [
      { q: "¿New Balance es buena para baloncesto?", a: "Sí, aunque subestimada. La TWO WXY v4 es de las más equilibradas del catálogo y aguanta bien el exterior, y la Kawhi 4 es de las de más amortiguación." },
      { q: "¿Qué New Balance elegir si soy pívot o pesado?", a: "La Kawhi 4, por su FuelCell con mucha amortiguación. La Fresh Foam BB v3, que era la referencia de la marca para pívots, ya no la vende ninguna de nuestras tiendas en España." },
      { q: "¿Dónde comprar New Balance de baloncesto en España?", a: "New Balance España apenas vende baloncesto. La TWO WXY v4 se encuentra en FuikaOmar, la Kawhi 4 en FuikaOmar y la Kawhi 1 en Amazon. El precio de hoy de cada una está en su ficha." },
    ],
  }),

  // ── MARCA: Converse ───────────────────────────────────────────────
  marca("Converse", {
    title: "Mejores zapatillas Converse para baloncesto 2026 | CANCHA.ZAPA",
    description: "Las mejores Converse de baloncesto: SHAI 001, Weapon, Pro Leather, Chuck Taylor. Análisis técnico honesto — ¿son buenas para jugar de verdad?",
    eyebrow: "★ Por marca · Converse",
    lede: "Converse vuelve al baloncesto de performance con la SHAI 001 de Shai Gilgeous-Alexander. Más allá de las clásicas Chuck Taylor, hay zapatillas técnicas serias para jugadores exigentes.",
    intro: "Converse es la marca más histórica del baloncesto: la Chuck Taylor fue la zapatilla dominante hasta los 80. Hoy, Converse (parte de Nike) ha vuelto con la SHAI 001 para competir en el segmento de performance. No son solo un guiño nostálgico — tienen tecnología real.",
    points: [
      { lab: "SHAI 001 = performance real", body: "La Converse SHAI 001 monta una espuma de longitud completa con Zoom Air en el antepié y una pequeña placa de torsión, con tracción de puntos. No es retro: es una zapatilla técnica para guards." },
      { lab: "Weapon y Pro Leather = historia", body: "La Weapon (1986) y la Pro Leather (1976) son clásicos de cuero y caña alta. Para jugar hoy, mejor la SHAI 001." },
      { lab: "Chuck Taylor = historia, no performance", body: "Las Chuck Taylor originales (bajo y alto) no están pensadas para baloncesto moderno. La suela plana y la falta de amortiguación las hacen inadecuadas para entrenamiento intenso. Son lifestyle, no performance." },
      { lab: "Precio más accesible", body: "Las Converse de performance rondan los 100-130€, por debajo de los 150-180€ de Nike/Jordan de gama alta. Si encajas en el estilo, ofrecen buena relación calidad-precio." },
    ],
    faqs: [
      { q: "¿Las Converse sirven para jugar baloncesto?", a: "Depende del modelo. La SHAI 001 es una zapatilla técnica real con Zoom Air en el antepié y buena tracción — sí sirve para jugar. Las Chuck Taylor originales no son apropiadas para baloncesto moderno: no tienen amortiguación suficiente." },
      { q: "¿Qué Converse es mejor para baloncesto?", a: "La Converse SHAI 001 es la mejor opción técnica de la marca en nuestro catálogo: Zoom Air en el antepié, una pequeña placa de torsión y tracción de puntos." },
      { q: "¿Dónde comprar Converse de baloncesto en España?", a: "El stock de Converse de baloncesto cambia a menudo: mira en la ficha de cada modelo qué tiendas lo tienen hoy." },
    ],
  }),

  // ── MARCA: Reebok ─────────────────────────────────────────────────
  marca("Reebok", {
    title: "Mejores zapatillas Reebok para baloncesto 2026 | CANCHA.ZAPA",
    description: "Las mejores zapatillas de baloncesto Reebok: Question Mid, Engine A, Angel Reese 1. Desde el legacy de Allen Iverson hasta los modelos actuales.",
    eyebrow: "★ Por marca · Reebok",
    lede: "Reebok tiene el legado de Allen Iverson y las zapatillas más icónicas de los 90. Hoy, la marca ofrece retros de alto rendimiento y modelos de lifestyle para la cancha.",
    intro: "Reebok dominó el baloncesto en los 90 con Allen Iverson. La Question Mid es un clásico que se reedita con suela moderna. Para jugadores que quieren el estilo vintage de los 90 con rendimiento decente en parqué, Reebok es una opción a considerar.",
    points: [
      { lab: "Question Mid = ícono absoluto", body: "La Question Mid de Allen Iverson es una de las siluetas más queridas del baloncesto. Las reediciones mantienen el upper original pero actualizan la suela. Buena tracción herringbone, cushion modesto." },
      { lab: "Engine A = la Reebok técnica", body: "Estrena el sistema ERS con espuma SuperFloat infusionada en nitrógeno y herringbone de goma gruesa. Es la apuesta actual de rendimiento de Reebok." },
      { lab: "Angel Reese 1 = cushion", body: "La Angel Reese 1 destaca por su amortiguación ERS en dos pods de antepié y talón. Menos historia, más rendimiento." },
      { lab: "Precio competitivo", body: "Las Reebok de baloncesto suelen ir por debajo de equivalentes Nike y Adidas; mira el precio de hoy en cada ficha. Para jugadores con presupuesto limitado que quieren un clásico, son una opción razonable." },
    ],
    faqs: [
      { q: "¿Las Reebok de baloncesto son buenas para jugar?", a: "Depende del modelo. La reedición de la Question Mid tiene tracción sólida de goma para indoor. El cushion es modesto comparado con modelos actuales — úsalas para partidos amistosos, no para entrenamiento intensivo diario." },
      { q: "¿Cuál es la mejor Reebok para baloncesto en 2025?", a: "La Engine A es la más técnica de la línea actual, junto a la Angel Reese 1. Para los que quieren el legado de Iverson, la Question Mid reedición ofrece el equilibrio entre estilo y funcionalidad básica. Para rendimiento moderno, la AE 2 o GT Cut son superiores técnicamente." },
      { q: "¿Dónde comprar Reebok en España?", a: "Reebok.eu y Amazon ES tienen la línea de baloncesto. El stock es limitado comparado con Nike/Adidas — si encuentras tu talla, hazlo porque los retros tienden a agotar." },
    ],
  }),

  // ── MARCA: FILA ───────────────────────────────────────────────────
  marca("FILA", {
    title: "Zapatillas de baloncesto FILA: la marca que casi destrona a Jordan | CANCHA.ZAPA",
    description: "Historia y análisis de las zapatillas FILA de baloncesto. La Grant Hill 1 fue un éxito de ventas en 1995. Retros que todavía funcionan.",
    eyebrow: "🏅 Por marca · FILA",
    lede: "En 1995, la Grant Hill 1 fue un gran éxito de ventas para FILA.",
    intro: "FILA es la marca italiana que estuvo más cerca de destronar a Jordan en los 90. Ficharon a Grant Hill en 1994, antes de su primera temporada, y la Grant Hill 1 fue un bombazo: cuero premium, alta caña, herringbone outsole y la historia de un novato con enorme tirón popular. Hoy FILA tiene presencia mínima en baloncesto de rendimiento, pero sus retros son piezas con narrativa real.",
    points: [
      { lab: "Grant Hill 1 = el anti-Jordan de 1995", body: "La Grant Hill 1 fue un gran éxito de ventas en 1995. Cuero genuino, caña alta, herringbone clásico. Mira el precio de hoy en la ficha." },
      { lab: "Herringbone outsole — tracción clásica vigente", body: "El patrón herringbone de los retros FILA sigue siendo competitivo en parqué interior. Agarre comparable a zapatillas modernas básicas en pista limpia." },
      { lab: "Caño alto = soporte real", body: "La Grant Hill 1 tiene uno de los caños más altos del mercado retro. Soporte de tobillo real — útil si tienes historial de esguinces y buscas protección extra." },
      { lab: "Precio retro competitivo", body: "Los retros FILA suelen costar menos que los Jordan retro equivalentes. Si buscas un clásico de los 90 sin pagar precio de Air Jordan, FILA es la opción." },
    ],
    faqs: [
      { q: "¿Las zapatillas FILA son buenas para jugar baloncesto?", a: "Los retros FILA (Grant Hill 1, etc.) funcionan para baloncesto recreativo en interior. La tracción herringbone es sólida en parqué limpio y el soporte de tobillo del caño alto es real. No son para rendimiento de alto nivel o exterior — para eso, las zapatillas técnicas de 2025 las superan claramente en cushion y respuesta." },
      { q: "¿Por qué FILA ya no está en el baloncesto de rendimiento?", a: "Tras Grant Hill, FILA no encontró otro jugador con el mismo impacto cultural. Hill acabó fichando por adidas y después por Nike. FILA viró hacia el lifestyle y el tenis, donde su herencia italiana tiene más peso. Hoy su presencia en baloncesto performance es casi nula." },
      { q: "¿Dónde comprar retros FILA en España?", a: "Amazon ES tiene habitualmente stock de la Grant Hill 1 reedición. FILA.com también tiene el catálogo oficial con envío a España. Para tallas o colorways específicos, KicksCrew tiene buena disponibilidad con envío internacional." },
    ],
  }),

  // ── CALCETINES BALONCESTO ─────────────────────────────────────────
  {
    slug: "calcetines-baloncesto",
    title: "Mejores calcetines de baloncesto 2025-2026 | CANCHA.ZAPA",
    description: "Nike Elite, Adidas Cushioned, Under Armour Playmaker, Stance NBA: los mejores calcetines técnicos para baloncesto. Guía de selección por tipo de zapatilla.",
    eyebrow: "★ Accesorios · Calcetines",
    h1Pre: "Mejores calcetines",
    h1Accent: "de baloncesto",
    h1Post: "2025-2026",
    lede: "Un buen calcetín técnico mejora la tracción, reduce ampollas y añade cushion donde la zapatilla no llega. Nike Elite, Adidas Cushioned, Under Armour Playmaker y Stance NBA son las referencias del mercado.",
    filter: (z) => z.categoria_principal === "cushion-focused" || z.es_retro === true,
    sort: byScoreDesc,
    guideTitle: "Cómo elegir el calcetín correcto",
    guideIntro: "Los calcetines técnicos de baloncesto tienen tres funciones: amortiguación extra, reducción de fricción (ampollas) y termorregulación. La elección correcta depende de tu zapatilla y tu posición.",
    guidePoints: [
      { lab: "Nike Elite Cushioned → cushion y pívots", body: "La referencia del mercado. Cushion en talón y antepié, Dri-FIT, zona de arco sin costuras. Consulta el precio de hoy en Amazon." },
      { lab: "Nike Elite Lightweight → guards y reactivas", body: "Perfil más fino para máximo court feel. Para jugadores que quieren sentir el suelo a través de la zapatilla. Consulta el precio de hoy en Amazon." },
      { lab: "Adidas Cushioned 3-Pack → relación calidad-precio", body: "Pack de 3 pares con Climalite. El más económico por par (el más barato por par). Encaja especialmente bien con zapas Adidas. Consulta el precio de hoy en Amazon." },
      { lab: "Under Armour Playmaker → caño alto y tobillo", body: "El más alto de cañero de la lista. Compresión de arco integrada. Para zapas high-top y jugadores con historial de esguinces. Consulta el precio de hoy en Amazon." },
    ],
    faqs: [
      { q: "¿Qué calcetines de baloncesto comprar en Amazon ES?", a: "Los más vendidos y mejor valorados en Amazon ES son los Nike Elite Cushioned Crew y el pack Adidas Cushioned 3-Pack. La Nike Elite tiene el mejor cushion y durabilidad del mercado. El pack Adidas es la mejor relación calidad-precio si necesitas múltiples pares." },
      { q: "¿Los calcetines de baloncesto marcan la diferencia?", a: "Sí, especialmente en tres aspectos: amortiguación adicional (importante para retros y zapas de entrada), prevención de ampollas (el tejido técnico reduce la fricción), y termorregulación (el sudor se evacúa mejor que con algodón). Para jugadores que entrenan 2-3 veces por semana, la diferencia es notable." },
      { q: "¿Qué talla pedir en calcetines de baloncesto?", a: "Los calcetines técnicos van en rangos. Si estás en el límite del rango (ej. talla 42 y el rango es 40-42), pide el siguiente rango. Los calcetines apretados en la punta generan ampollas. La mayoría de marcas tienen equivalencias EU bien documentadas." },
    ],
    related: [],
    catalogQuery: "?categoria=cushion-focused",
    catalogLabel: "Ver zapatillas de cushion en catálogo",
  },

  // ── PLANTILLAS BALONCESTO ─────────────────────────────────────────
  {
    slug: "plantillas-baloncesto",
    title: "Zapatillas de baloncesto que piden plantilla | CANCHA.ZAPA",
    description: "Modelos retro o con poca amortiguación a los que una plantilla técnica les cambia la vida, y cómo elegirla. La guía de plantillas, en el blog.",
    eyebrow: "★ Accesorios · Plantillas",
    h1Pre: "Zapatillas que",
    h1Accent: "piden plantilla",
    h1Post: "2025-2026",
    lede: "Las plantillas de fábrica de la mayoría de zapatillas son mediocres. Una plantilla técnica puede mejorar el soporte de arco, reducir el impacto en rodillas y alargar la vida útil de la zapatilla.",
    filter: (z) => z.es_retro === true || z.puntuaciones.amortiguacion <= 6,
    sort: byScoreDesc,
    guideTitle: "Cuándo añadir una plantilla",
    guideIntro: "No siempre es necesario. Las zapatillas premium modernas (LeBron 23, Curry 13, AE 2) tienen plantillas integradas de calidad. Las plantillas técnicas tienen más sentido en zapatillas retro, modelos de entrada o si tienes problemas biomecánicos.",
    guidePoints: [
      { lab: "Sof Sole Athlete → retros y básicas", body: "Cushion extra para zapatillas retro y modelos de entrada. Espuma antibacteriana, gel en talón y antepié. La más versátil de la lista." },
      { lab: "Superfeet Green → pie plano y pronación", body: "Soporte de arco rígido, ideal para pronación y pie plano. Muy usada por podólogos deportivos. No para pie neutro sin problemas biomecánicos." },
      { lab: "Bauerfeind Sports → lesiones", body: "Nivel médico para tobillo y rodilla. Metatarsal pad integrado, cápsula de gel en talón. Para jugadores con historial de lesiones." },
      { lab: "Currex SupportST → arco bajo/neutro", body: "Tres perfiles de arco (bajo/medio/alto). Amortiguación dinámica que se activa con el impacto. Más flexible que la Superfeet." },
    ],
    faqs: [
      { q: "¿Vale la pena poner una plantilla en zapatillas de baloncesto?", a: "Depende de la zapatilla y tu perfil. Para retros (Jordan retros, Crazy 8, Grant Hill 1), zapatillas de entrada (Tarmak, Precision) o si tienes pie plano/pronación: sí, merece la pena. Para zapatillas premium modernas (LeBron 23, Curry 13), sus plantillas integradas ya son buenas — añadir otra puede comprimir el espacio." },
      { q: "¿Qué plantilla es mejor para zapatillas retro?", a: "La Sof Sole Athlete Full Length es una buena opción para zapatillas retro. Añade cushion real sin alterar demasiado el interior de la zapatilla. Las reediciones de Air Jordan, Crazy 8, Grant Hill 1 y similares tienen plantillas básicas que la Sof Sole mejora notablemente." },
      { q: "¿Las plantillas Superfeet son buenas para baloncesto?", a: "Sí, especialmente la Superfeet Green para jugadores con pronación o pie plano. El soporte de arco rígido corrija la biomecánica antes de que el problema llegue a las rodillas. Si tu pie es neutro sin problemas específicos, el arco puede resultar molesto — opta por la Currex SupportST que tiene perfiles ajustables." },
    ],
    related: [],
    catalogQuery: "?retro=true",
    catalogLabel: "Ver zapatillas retro en catálogo",
  },

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
      { lab: "Nike llega hasta EU 50", body: "La mayoría de modelos Nike y Jordan llegan a US 16 (EU ~50) en stockx.com, Amazon ES tiene hasta EU 48-49 habitualmente. Consulta la ficha de cada modelo para ver qué tallas hay hoy." },
      { lab: "Adidas hasta EU 52", body: "Adidas suele cubrir tallas muy grandes en sus modelos principales (como la AE 2 y la Dame); confirma la talla en cada tienda. Amazon ES y Adidas.es suelen tener tallas grandes en stock." },
      { lab: "UA Curry hasta EU 50", body: "Under Armour cubre la línea Curry hasta EU 49-50; confirma la talla en cada tienda. Curry 13 y 12 disponibles en tallas grandes en UA.es y Amazon ES." },
      { lab: "Pie ancho + talla grande", body: "Pie grande a menudo significa pie ancho. La Nike LeBron tiene horma ancha y la Adidas AE 2 horma normal. Evita los modelos de horma estrecha (Zion, Ja, Kobe 8, Kyrie Low 5)." },
    ],
    faqs: [
      { q: "¿Dónde comprar zapatillas de baloncesto talla 46, 47 o 48 en España?",
        a: "Amazon ES es la mejor opción con stock más amplio en tallas grandes. Nike.es y Adidas.es tienen tallas hasta EU 50 online aunque puede haber stock limitado. Foot Locker ES y JD Sports tienen menos disponibilidad. Para EU 49+, KicksCrew y StockX son opciones internacionales con envío a España." },
      { q: "¿Las zapatillas de baloncesto se hacen en talla 50?",
        a: "Sí, aunque no todos los modelos. Nike y Adidas llegan a US 16-18 (EU 49-52) en sus líneas signature principales. Jordan Brand también cubre US 16. Under Armour llega hasta EU 49-50 en la línea Curry. Para tallas muy grandes, KicksCrew es la referencia con la mayor variedad." },
      { q: "¿En talla grande es mejor Nike o Adidas para baloncesto?",
        a: "La disponibilidad cambia por modelo y tienda. En horma, la Nike LeBron (ancha) es de las más generosas del catálogo; la mayoría de Adidas es de horma normal. Para pívots con talla 47+: Nike LeBron 22 o Adidas AE 2 son las apuestas más seguras." },
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
    lede: "Los lanzamientos más destacados de la temporada 2025-2026. Los lanzamientos más destacados de la temporada, ordenados por puntuación técnica; alguno aún no ha salido a la venta y su ficha lo indica.",
    filter: (z) => z.año_lanzamiento >= 2025,
    sort: byScoreDesc,
    guideTitle: "Qué novedades trajo 2025 al baloncesto",
    guideIntro: "2025 ha sido un año de innovación en espumas: ZoomX se asienta en la pista (Air Jordan 40, Ja 3, LeBron 23), adidas sigue con Boost y Lightstrike en la AE 2 y la Curry 13 monta HOVR+ con suela UA Flow. Los signature siguen siendo la apuesta segura.",
    guidePoints: [
      { lab: "ZoomX en baloncesto", body: "La Air Jordan 40 lleva ZoomX de longitud completa con Zoom Strobel; la GT Cut 3 (2024) ya había llevado ZoomX a la pista." },
      { lab: "Signature más competitivos", body: "AE 2, Ja 3, Curry 13, Jordan 40 — el listón técnico sube cada año. 2025 no defrauda." },
      { lab: "Budget mejora", body: "Adidas Dame X, por debajo de 100 € de tarifa, demuestra que se puede tener tecnología signature sin gastar 150 € o más." },
      { lab: "Marcas chinas maduran", body: "Anta y Li-Ning siguen mejorando. KAI 2 y WoW AllCity 13 son opciones reales para jugadores europeos." },
    ],
    faqs: [
      { q: "¿Cuáles son las mejores zapatillas de baloncesto de 2025?",
        a: "Para guards: Nike Ja 3 y AE 2. Para jugadores equilibrados: Jordan Tatum 4 y Jordan Luka 4. Para cushion máximo: Air Jordan 40 y LeBron 23. Para presupuesto ajustado: Adidas Dame X." },
      { q: "¿Merece la pena comprar modelos de 2025 vs los de 2024?",
        a: "Depende. Si el precio es similar, sí — la tecnología avanza. Pero un modelo de 2024 en outlet al 30% de descuento puede ser mejor decisión que el de 2025 a precio completo." },
      { q: "¿Cuándo se pueden comprar en España los modelos nuevos?",
        a: "Los modelos nuevos de Nike, Jordan y Adidas pueden tardar semanas en llegar a España y algunos no se venden aquí al principio. Mira la disponibilidad real en cada ficha." },
    ],
    related: [],
    catalogQuery: "?año=2025",
    catalogLabel: "Ver todas las zapatillas de 2025",
  },

  // ── BLACK FRIDAY (rebajas reales de hoy, se actualizan solas con el scraper) ──
  {
    slug: "black-friday-zapatillas-baloncesto",
    title: "Black Friday zapatillas de baloncesto 2026: ofertas reales",
    description:
      "Black Friday 2026 (27 de noviembre): las zapatillas de baloncesto con rebaja real hoy en tiendas españolas, frente al precio oficial. Cómo detectar falsos descuentos.",
    eyebrow: "★ Black Friday 2026",
    h1Pre: "Black Friday",
    h1Accent: "zapatillas baloncesto",
    h1Post: "2026",
    lede: "El Black Friday es el 27 de noviembre y las tiendas aún no han anunciado sus ofertas. Mientras tanto, vigilamos los precios cada noche: este top 5 son las zapatillas con mayor rebaja real hoy frente a su precio oficial, y se actualiza solo.",
    // Fuera Li-Ning, Anta, Peak y Rigorer: su MSRP sale de la tarifa en dólares de importación a EE. UU.,
    // y su precio en POIZON frente a esa tarifa es un «descuento» de cartel, justo lo que esta página
    // enseña a no creerse (22-oct-2026). 361° sí tiene tarifa oficial en euros (361sport).
    filter: (z) => z.genero !== "gs" && !z.es_retro && !["Li-Ning", "Anta", "Peak", "Rigorer"].includes(z.marca) && descuentoMostrado(z) >= 0.15,
    sort: (a, b) => {
      const d = descuentoMostrado(b) - descuentoMostrado(a);
      return Math.abs(d) > 0.0001 ? d : byScoreDesc(a, b);
    },
    guideTitle: "Cómo cazar ofertas reales en el Black Friday",
    guideIntro:
      "Cada año se mezclan rebajas de verdad con descuentos de cartel. La única forma de distinguirlos es comparar con el precio oficial del modelo, no con el 'precio anterior' que muestre la tienda.",
    guidePoints: [
      { lab: "Compara con el precio oficial, no con el tachado", body: "Algunas tiendas suben el precio unas semanas antes para que el descuento parezca mayor. Fíjate en el precio oficial de lanzamiento y en cuánto se ha movido el precio real en las últimas semanas." },
      { lab: "Desconfía de lo más barato que el oficial por mucho", body: "Una zapatilla de marca a la mitad de precio en un marketplace desconocido puede ser una réplica. Prioriza tiendas conocidas con devolución clara." },
      { lab: "Ojo con la reventa", body: "En modelos descatalogados o retro, un precio por encima del oficial no es una oferta aunque lleve la etiqueta de Black Friday." },
      { lab: "Las tallas comunes vuelan", body: "Las tallas más habituales (42-45) se agotan primero. Si una oferta ya es buena hoy y tu talla está disponible, esperar al día 27 es una apuesta." },
      { lab: "Revisa tallas y devoluciones", body: "Cada marca calza distinto. Antes de comprar consulta nuestra guía de tallas y comprueba el plazo de devolución, que en campañas suele ampliarse." },
    ],
    faqs: [
      { q: "¿Cuándo es el Black Friday 2026?",
        a: "El viernes 27 de noviembre de 2026. El Cyber Monday cae el lunes 30 de noviembre. Muchas tiendas empiezan sus ofertas días antes y las alargan durante la semana siguiente." },
      { q: "¿Qué descuentos habrá en zapatillas de baloncesto?",
        a: "Todavía no lo sabemos: las tiendas no han anunciado sus ofertas de Black Friday. Lo que sí podemos decirte es qué modelos están ya rebajados de verdad hoy respecto a su precio oficial." },
      { q: "¿Cómo sé si un descuento es real?",
        a: "Compáralo con el precio oficial del modelo y con el histórico reciente. Si el precio 'anterior' que muestra la tienda es mayor que el oficial, el descuento está inflado. Nosotros comparamos siempre con el precio oficial." },
      { q: "¿Compensa esperar al Black Friday o comprar ya?",
        a: "Si el precio de hoy ya es bueno y tu talla está disponible, comprar ya es razonable: las tallas comunes se agotan y no hay garantía de que la oferta mejore. Si no tienes prisa, puedes vigilar el modelo hasta el 27." },
      { q: "¿Cada cuánto actualizáis los precios?",
        a: "Revisamos las tiendas que enlazamos cada noche, así que este top 5 refleja las rebajas de hoy y puede cambiar de un día para otro." },
      { q: "¿Qué hago si la talla no me sirve?",
        a: "Consulta la guía de tallas antes de comprar y elige tiendas con devolución sencilla. En compras de campaña, revisa el plazo de devolución antes de pagar." },
    ],
    related: [
      "zapatillas-baloncesto-calidad-precio",
      "zapatillas-baloncesto-baratas",
      "mejores-zapatillas-baloncesto-2025",
    ],
    catalogQuery: "",
    catalogLabel: "Ver catálogo completo",
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
