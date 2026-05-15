import type {
  Zapatilla,
  RespuestasQuiz,
  Recomendacion,
  Puntuaciones,
  LinkCompra,
} from "./types";

type Atributo = keyof Puntuaciones;

const ATRIBUTOS: Atributo[] = [
  "traccion",
  "amortiguacion",
  "respuesta",
  "soporte_lateral",
  "estabilidad",
  "peso_score",
  "durabilidad_outdoor",
  "ventilacion",
];

const NOMBRES_ATRIBUTO: Record<Atributo, string> = {
  traccion: "tracción",
  amortiguacion: "amortiguación",
  respuesta: "respuesta",
  soporte_lateral: "soporte lateral",
  estabilidad: "estabilidad",
  peso_score: "ligereza",
  durabilidad_outdoor: "durabilidad outdoor",
  ventilacion: "ventilación",
};

const RANGO_PESO_KG: Record<RespuestasQuiz["peso"], [number, number]> = {
  "menos-70": [50, 70],
  "70-85": [70, 85],
  "85-100": [85, 100],
  "mas-100": [100, 130],
};

// ─────────────────────────────────────────────────────────
// 1. Pesos del quiz → multiplicadores por atributo
// ─────────────────────────────────────────────────────────

export function calcularPesos(
  respuestas: RespuestasQuiz
): Record<Atributo, number> {
  const pesos: Record<Atributo, number> = {
    traccion: 1.0,
    amortiguacion: 1.0,
    respuesta: 1.0,
    soporte_lateral: 1.0,
    estabilidad: 1.0,
    peso_score: 1.0,
    durabilidad_outdoor: 1.0,
    ventilacion: 1.0,
  };

  // Q1: Posición
  switch (respuestas.posicion) {
    case "base":
    case "escolta":
      pesos.respuesta += 0.5;
      pesos.peso_score += 0.5;
      pesos.traccion += 0.3;
      break;
    case "alero":
      break;
    case "ala-pivot":
    case "pivot":
      pesos.amortiguacion += 0.5;
      pesos.soporte_lateral += 0.5;
      pesos.estabilidad += 0.5;
      break;
  }

  // Q2: Peso del jugador
  switch (respuestas.peso) {
    case "menos-70":
      pesos.peso_score += 0.5;
      break;
    case "70-85":
      break;
    case "85-100":
      pesos.amortiguacion += 0.5;
      pesos.estabilidad += 0.5;
      break;
    case "mas-100":
      pesos.amortiguacion += 0.8;
      pesos.estabilidad += 0.8;
      pesos.soporte_lateral += 0.3;
      break;
  }

  // Q3: Estilo
  switch (respuestas.estilo) {
    case "explosivo":
      pesos.respuesta += 0.7;
      pesos.peso_score += 0.5;
      break;
    case "equilibrado":
      break;
    case "potente":
      pesos.amortiguacion += 0.7;
      pesos.estabilidad += 0.5;
      break;
    case "tirador":
      pesos.respuesta += 0.5;
      pesos.soporte_lateral += 0.3;
      break;
  }

  // Q4: Cancha
  switch (respuestas.cancha) {
    case "interior":
      pesos.traccion += 0.5;
      break;
    case "exterior":
      pesos.durabilidad_outdoor += 1.0;
      break;
    case "mixto":
      pesos.durabilidad_outdoor += 0.5;
      pesos.traccion += 0.2;
      break;
  }

  // Q5: Lesiones (multi-select)
  for (const lesion of respuestas.lesiones) {
    switch (lesion) {
      case "rodillas":
        pesos.amortiguacion += 1.0;
        break;
      case "tobillos":
        pesos.soporte_lateral += 0.8;
        pesos.estabilidad += 0.5;
        break;
      case "fascia":
        pesos.amortiguacion += 0.5;
        break;
    }
  }

  // Q6: Prioridad única — multiplica x1.5 el atributo correspondiente
  switch (respuestas.prioridad) {
    case "proteccion":
      pesos.amortiguacion *= 1.5;
      break;
    case "reactividad":
      pesos.respuesta *= 1.5;
      break;
    case "soporte-tobillo":
      pesos.soporte_lateral *= 1.5;
      pesos.estabilidad *= 1.2;
      break;
    case "durabilidad":
      pesos.durabilidad_outdoor *= 1.5;
      break;
    case "precio":
      // No es un atributo. Afecta a la ordenación final como tiebreaker secundario.
      break;
  }

  return pesos;
}

// ─────────────────────────────────────────────────────────
// 2. Filtros duros (las zapas que NO encajan, fuera)
// ─────────────────────────────────────────────────────────

export function aplicarFiltrosDuros(
  zapatillas: Zapatilla[],
  respuestas: RespuestasQuiz
): Zapatilla[] {
  return zapatillas.filter((z) => {
    // Presupuesto: si tiene tope, el precio mínimo disponible debe encajar
    // Usamos != null (loose) para cubrir tanto null como undefined
    if (respuestas.presupuesto_max_eur != null) {
      const precioMin = z.links_compra
        .filter((l) => l.disponible)
        .reduce((min, l) => Math.min(min, l.precio_actual), Infinity);

      const precioReferencia = isFinite(precioMin)
        ? precioMin
        : z.precio_msrp_eur;
      if (precioReferencia > respuestas.presupuesto_max_eur) return false;
    }

    // Cancha exterior: durabilidad outdoor ≥ 5
    if (
      respuestas.cancha === "exterior" &&
      z.puntuaciones.durabilidad_outdoor < 5
    ) {
      return false;
    }

    // Lesión rodillas: amortiguación ≥ 6
    if (
      respuestas.lesiones.includes("rodillas") &&
      z.puntuaciones.amortiguacion < 6
    ) {
      return false;
    }

    // Lesión tobillos: no low-top
    if (respuestas.lesiones.includes("tobillos") && z.altura === "low") {
      return false;
    }

    // Ancho de pie: pie ancho no encaja en horma estrecha
    if (respuestas.ancho_pie === "ancho" && z.horma === "estrecha") {
      return false;
    }

    return true;
  });
}

// ─────────────────────────────────────────────────────────
// 3. Score de una zapatilla dado un set de pesos
// ─────────────────────────────────────────────────────────

export function calcularScore(
  zapatilla: Zapatilla,
  pesos: Record<Atributo, number>
): number {
  let sumaScores = 0;
  let sumaPesos = 0;

  for (const attr of ATRIBUTOS) {
    sumaScores += zapatilla.puntuaciones[attr] * pesos[attr];
    sumaPesos += pesos[attr];
  }

  // Score en escala 1-10 (igual que las puntuaciones)
  return sumaScores / sumaPesos;
}

// ─────────────────────────────────────────────────────────
// 3b. Factor de encaje según perfil (ideal_para / no_recomendada_para)
// ─────────────────────────────────────────────────────────

export function calcularFitFactor(
  zapatilla: Zapatilla,
  respuestas: RespuestasQuiz
): number {
  let factor = 1.0;

  // Bonus por encaje con ideal_para
  if (zapatilla.ideal_para.posiciones.includes(respuestas.posicion)) {
    factor += 0.15;
  }
  if (zapatilla.ideal_para.estilos.includes(respuestas.estilo)) {
    factor += 0.1;
  }

  // Bonus por ancho de pie
  if (
    respuestas.ancho_pie === "ancho" &&
    (zapatilla.horma === "ancha" || zapatilla.horma === "normal")
  ) {
    factor += 0.1;
  } else if (respuestas.ancho_pie === "normal" && zapatilla.horma === "normal") {
    factor += 0.05;
  }

  // Penalty si está marcada como no recomendada para el perfil
  if (
    zapatilla.no_recomendada_para.posiciones?.includes(respuestas.posicion)
  ) {
    factor -= 0.3;
  }
  if (zapatilla.no_recomendada_para.estilos?.includes(respuestas.estilo)) {
    factor -= 0.2;
  }

  return Math.max(0.3, factor); // Nunca menos de 0.3 (queremos que aparezcan, no que desaparezcan)
}

// ─────────────────────────────────────────────────────────
// 4. Regla de diversidad: máx N zapas por marca en el top
// ─────────────────────────────────────────────────────────

export function aplicarDiversidad(
  ranked: Recomendacion[],
  topN: number = 5,
  maxPorMarca: number = 2
): Recomendacion[] {
  const result: Recomendacion[] = [];
  const conteoMarca: Record<string, number> = {};

  // Primera pasada: respetar la regla
  for (const rec of ranked) {
    if (result.length >= topN) break;
    const marca = rec.zapatilla.marca;
    if ((conteoMarca[marca] ?? 0) < maxPorMarca) {
      result.push(rec);
      conteoMarca[marca] = (conteoMarca[marca] ?? 0) + 1;
    }
  }

  // Si no se llenan los slots, relajar la regla y rellenar
  if (result.length < topN) {
    for (const rec of ranked) {
      if (result.length >= topN) break;
      if (!result.includes(rec)) result.push(rec);
    }
  }

  return result;
}

// ─────────────────────────────────────────────────────────
// 5. Mejor precio disponible entre tiendas (con desempate por comisión)
// ─────────────────────────────────────────────────────────

/**
 * Comisión estimada por tienda (% sobre venta).
 * Fuente: programas de afiliados en España (Awin, CJ, Impact, Amazon Associates).
 * Se usa para desempatar cuando dos tiendas tienen el mismo precio (±0,50 €).
 */
export const COMISIONES_TIENDA: Record<string, number> = {
  aliexpress: 8,
  kickscrew: 7,
  basket_world: 7,
  puma_es: 6,
  reebok_es: 6,
  ua_es: 5,
  nb_es: 5,
  nike_es: 5,
  adidas_es: 5,
  jd_sports_es: 5,
  zalando_es: 5,
  sprinter_es: 5,
  footlocker_es: 4,
  amazon_es: 4,
  decathlon: 3,
};

/** Umbral en EUR por debajo del cual dos precios se consideran "empate". */
const PRECIO_TIE_THRESHOLD = 0.5;

/**
 * Devuelve el link más barato disponible.
 * Si dos tiendas empatan en precio (diferencia ≤ 0,50 €), gana la de mayor comisión.
 */
export function findMejorPrecio(links: LinkCompra[]): LinkCompra | undefined {
  const disponibles = links.filter((l) => l.disponible);
  if (disponibles.length === 0) return undefined;

  return disponibles.reduce((best, link) => {
    const diff = link.precio_actual - best.precio_actual;

    // Precio claramente inferior → nuevo ganador
    if (diff < -PRECIO_TIE_THRESHOLD) return link;

    // Precio claramente superior → conservar actual
    if (diff > PRECIO_TIE_THRESHOLD) return best;

    // Empate (±0,50 €) → desempatar por comisión más alta
    const comisionLink = COMISIONES_TIENDA[link.tienda] ?? 0;
    const comisionBest = COMISIONES_TIENDA[best.tienda] ?? 0;
    return comisionLink > comisionBest ? link : best;
  });
}

// ─────────────────────────────────────────────────────────
// 6. Razones humanas (max 3 por card)
// ─────────────────────────────────────────────────────────

export function generarRazones(
  zapatilla: Zapatilla,
  respuestas: RespuestasQuiz
): string[] {
  const razones: string[] = [];
  const p = zapatilla.puntuaciones;

  // Match por posición
  if (zapatilla.ideal_para.posiciones.includes(respuestas.posicion)) {
    razones.push(`Diseñada para tu posición (${respuestas.posicion}).`);
  }

  // Match por peso
  const [minP, maxP] = RANGO_PESO_KG[respuestas.peso];
  const [idealMin, idealMax] = zapatilla.ideal_para.peso_jugador_kg;
  if (minP >= idealMin - 5 && maxP <= idealMax + 5) {
    razones.push(`Encaja en tu rango de peso (${idealMin}-${idealMax} kg).`);
  }

  // Lesiones
  if (respuestas.lesiones.includes("rodillas") && p.amortiguacion >= 8) {
    razones.push(
      `Amortiguación ${p.amortiguacion}/10 — protege tus rodillas.`
    );
  }
  if (respuestas.lesiones.includes("tobillos") && p.soporte_lateral >= 8) {
    razones.push(
      `Soporte lateral ${p.soporte_lateral}/10 + altura ${zapatilla.altura} para tus tobillos.`
    );
  }

  // Prioridad declarada
  switch (respuestas.prioridad) {
    case "proteccion":
      if (p.amortiguacion >= 8) {
        razones.push(
          `Cushion ${p.amortiguacion}/10 — máxima protección como pediste.`
        );
      }
      break;
    case "reactividad":
      if (p.respuesta >= 8) {
        razones.push(
          `Respuesta ${p.respuesta}/10 — primer paso explosivo asegurado.`
        );
      }
      break;
    case "soporte-tobillo":
      if (p.soporte_lateral >= 8) {
        razones.push(
          `Soporte lateral ${p.soporte_lateral}/10 — tobillo bloqueado.`
        );
      }
      break;
    case "durabilidad":
      if (p.durabilidad_outdoor >= 8) {
        razones.push(
          `Durabilidad outdoor ${p.durabilidad_outdoor}/10 — aguanta el asfalto.`
        );
      }
      break;
    case "precio": {
      const mejor = findMejorPrecio(zapatilla.links_compra);
      if (mejor) {
        razones.push(`Mejor precio actual: ${mejor.precio_actual}€.`);
      }
      break;
    }
  }

  // Cancha exterior
  if (respuestas.cancha === "exterior" && p.durabilidad_outdoor >= 8) {
    razones.push(
      `Construida para exterior — durabilidad ${p.durabilidad_outdoor}/10.`
    );
  }

  // Ancho de pie
  if (respuestas.ancho_pie === "ancho" && zapatilla.horma === "ancha") {
    razones.push(`Horma ancha — perfecta para pies anchos.`);
  }

  // Fallback: rellenar con los atributos más fuertes hasta tener ≥ 2 razones
  if (razones.length < 2) {
    const ordenadosPorScore = [...ATRIBUTOS].sort((a, b) => p[b] - p[a]);
    for (const attr of ordenadosPorScore) {
      if (razones.length >= 2) break;
      const nombre = NOMBRES_ATRIBUTO[attr];
      const yaMencionado = razones.some((r) => r.toLowerCase().includes(nombre));
      if (!yaMencionado && p[attr] >= 1) {
        razones.push(`Destaca en ${nombre} (${p[attr]}/10).`);
      }
    }
  }

  return razones.slice(0, 3);
}

// ─────────────────────────────────────────────────────────
// 7. Punto de entrada: motor de recomendación completo
// ─────────────────────────────────────────────────────────

export function recomendar(
  respuestas: RespuestasQuiz,
  catalogo: Zapatilla[],
  topN: number = 5
): Recomendacion[] {
  // Paso 1: filtros duros
  const filtradas = aplicarFiltrosDuros(catalogo, respuestas);

  // Paso 2: calcular pesos según el quiz
  const pesos = calcularPesos(respuestas);

  // Paso 3: scorear todas las que pasaron (con fit factor por perfil)
  const recomendaciones: Recomendacion[] = filtradas.map((z) => {
    const scoreBase = calcularScore(z, pesos);
    const fit = calcularFitFactor(z, respuestas);
    const score = scoreBase * fit;
    return {
      zapatilla: z,
      // score está en escala 1-10; fit puede subir hasta 1.25 → max ~12.5
      // Normalizamos a 0-100: (score/10)*100, luego cap a 100
      match_pct: Math.min(100, Math.round((score / 10) * 100)),
      razones: generarRazones(z, respuestas),
      mejor_precio: findMejorPrecio(z.links_compra),
    };
  });

  // Paso 4: ordenar por match desc
  recomendaciones.sort((a, b) => b.match_pct - a.match_pct);

  // Paso 5: regla de diversidad y top N
  return aplicarDiversidad(recomendaciones, topN);
}
