import { describe, it, expect } from "vitest";
import {
  recomendar,
  calcularPesos,
  aplicarFiltrosDuros,
  findMejorPrecio,
  COMISIONES_TIENDA,
} from "./scoring";
import { zapatillas } from "../data/zapatillas";
import type { RespuestasQuiz } from "./types";

// ─────────────────────────────────────────────────────────
// Helper: perfil de quiz base, sobreescribible
// ─────────────────────────────────────────────────────────

function perfil(overrides: Partial<RespuestasQuiz> = {}): RespuestasQuiz {
  return {
    posicion: "alero",
    peso: "70-85",
    estilo: "equilibrado",
    cancha: "interior",
    lesiones: [],
    prioridad: "proteccion",
    presupuesto_max_eur: null,
    ...overrides,
  };
}

// ─────────────────────────────────────────────────────────
// Filtros duros
// ─────────────────────────────────────────────────────────

describe("aplicarFiltrosDuros", () => {
  it("filtra zapas que exceden el presupuesto", () => {
    const BUDGET = 80;
    const filtradas = aplicarFiltrosDuros(
      zapatillas,
      perfil({ presupuesto_max_eur: BUDGET, prioridad: "precio" })
    );
    const ids = filtradas.map((z) => z.id);
    // Comprobación dinámica: ninguna zapa filtrada debe tener un precio disponible > presupuesto
    // (el precio de referencia es el mínimo disponible, o el MSRP si no hay links)
    for (const z of filtradas) {
      const disponibles = z.links_compra.filter((l) => l.disponible);
      const precioMin = disponibles.length > 0
        ? Math.min(...disponibles.map((l) => l.precio_actual))
        : z.precio_msrp_eur;
      expect(precioMin).toBeLessThanOrEqual(BUDGET);
    }
    // Las zapas muy caras por MSRP nunca deben aparecer aunque estén de oferta temporal
    // (LeBron 22 MSRP €189 — si tiene precio de oferta <80€ es una anomalía del scraper)
    expect(ids).not.toContain("nike-lebron-22");
  });

  it("filtra low-top si el usuario tiene problemas de tobillo", () => {
    const filtradas = aplicarFiltrosDuros(
      zapatillas,
      perfil({ lesiones: ["tobillos"], prioridad: "soporte-tobillo" })
    );
    const ids = filtradas.map((z) => z.id);
    // Todos los low-top fuera
    expect(ids).not.toContain("anta-kai-1-speed");
    expect(ids).not.toContain("nike-kobe-8-protro");
    expect(ids).not.toContain("nike-gt-cut-3");
    expect(ids).not.toContain("nike-ja-2");
    expect(ids).not.toContain("nike-kyrie-low-5");
    expect(ids).not.toContain("decathlon-tarmak-fast-900");
    // Las mid/high deben quedar (al menos LeBron 22 high-top)
    expect(ids).toContain("nike-lebron-22");
  });

  it("filtra cushion < 6 si el usuario marca rodillas", () => {
    const filtradas = aplicarFiltrosDuros(
      zapatillas,
      perfil({ lesiones: ["rodillas"] })
    );
    // Regla: con rodillas, NINGUNA zapa con amortiguación < 6 debe pasar
    // (property-based: sobrevive a recalibraciones de score)
    for (const z of filtradas) {
      expect(z.puntuaciones.amortiguacion).toBeGreaterThanOrEqual(6);
    }
    // Y las de cushion alto sí siguen presentes
    const ids = filtradas.map((z) => z.id);
    expect(ids).toContain("nike-lebron-22"); // 9
  });

  it("filtra durabilidad outdoor < 5 si la cancha es exterior", () => {
    const filtradas = aplicarFiltrosDuros(
      zapatillas,
      perfil({ cancha: "exterior", prioridad: "durabilidad" })
    );
    // Regla: en exterior, NINGUNA zapa con durabilidad outdoor < 5 debe pasar
    for (const z of filtradas) {
      expect(z.puntuaciones.durabilidad_outdoor).toBeGreaterThanOrEqual(5);
    }
  });

  it("sin filtros restrictivos pasan todas las zapas no-retro", () => {
    const filtradas = aplicarFiltrosDuros(zapatillas, perfil());
    // Las retro se excluyen SIEMPRE del quiz (por diseño); el resto debe pasar.
    const noRetro = zapatillas.filter((z) => !z.es_retro).length;
    expect(filtradas.length).toBe(noRetro);
  });
});

// ─────────────────────────────────────────────────────────
// Pesos del quiz
// ─────────────────────────────────────────────────────────

describe("calcularPesos", () => {
  it("amplifica amortiguación para pívot pesado con rodillas y prioridad protección", () => {
    const pesos = calcularPesos(
      perfil({
        posicion: "pivot",
        peso: "mas-100",
        estilo: "potente",
        lesiones: ["rodillas"],
        prioridad: "proteccion",
      })
    );
    // base 1 + pivot 0.5 + >100kg 0.8 + potente 0.7 + rodillas 1.0 = 4.0
    // x1.5 (prioridad) = 6.0
    expect(pesos.amortiguacion).toBeCloseTo(6.0, 1);
  });

  it("amplifica respuesta para base explosivo con prioridad reactividad", () => {
    const pesos = calcularPesos(
      perfil({
        posicion: "base",
        estilo: "explosivo",
        prioridad: "reactividad",
      })
    );
    // base 1 + base 0.5 + explosivo 0.7 = 2.2
    // x1.5 (prioridad) = 3.3
    expect(pesos.respuesta).toBeCloseTo(3.3, 1);
  });

  it("amplifica durabilidad para exterior + prioridad durabilidad", () => {
    const pesos = calcularPesos(
      perfil({ cancha: "exterior", prioridad: "durabilidad" })
    );
    // base 1 + exterior 1 = 2.0, x1.5 = 3.0
    expect(pesos.durabilidad_outdoor).toBeCloseTo(3.0, 1);
  });
});

// ─────────────────────────────────────────────────────────
// Mejor precio
// ─────────────────────────────────────────────────────────

describe("findMejorPrecio", () => {
  it("devuelve el link más barato disponible para LeBron 22", () => {
    const lebron = zapatillas.find((z) => z.id === "nike-lebron-22")!;
    const links = lebron.links_compra.filter((l) => l.disponible);
    // Si no hay links disponibles en live, usar precio_msrp_eur como referencia
    if (links.length === 0) return;
    const mejor = findMejorPrecio(links);
    expect(mejor).toBeDefined();
    // Debe ser el precio mínimo entre los disponibles
    const minPrecio = Math.min(...links.map((l) => l.precio_actual));
    expect(mejor?.precio_actual).toBeLessThanOrEqual(minPrecio + 0.5); // +0.5 por desempate de comisión
  });

  it("ignora links no disponibles", () => {
    // Test con datos sintéticos para no depender de precios en vivo
    const mockLinks = [
      { tienda: "amazon_es" as const, url: "https://amazon.es/test", precio_actual: 120, disponible: false, tiene_afiliado: true, ultima_verificacion: "2025-01-01" },
      { tienda: "zalando_es" as const, url: "https://zalando.es/test", precio_actual: 109.99, disponible: true, tiene_afiliado: true, ultima_verificacion: "2025-01-01" },
      { tienda: "decathlon" as const, url: "https://decathlon.es/test", precio_actual: 99, disponible: false, tiene_afiliado: true, ultima_verificacion: "2025-01-01" },
    ];
    const mejor = findMejorPrecio(mockLinks);
    expect(mejor?.precio_actual).toBe(109.99);
    expect(mejor?.tienda).toBe("zalando_es");
  });
});

// ─────────────────────────────────────────────────────────
// Recomendaciones por perfil completo
// ─────────────────────────────────────────────────────────

describe("recomendar — perfiles realistas", () => {
  it("Pívot pesado con rodillas → cushion-focused gana (LeBron 22, Witness 9 o NB BB v3)", () => {
    const recs = recomendar(
      perfil({
        posicion: "pivot",
        peso: "mas-100",
        estilo: "potente",
        lesiones: ["rodillas"],
        prioridad: "proteccion",
      }),
      zapatillas
    );
    // Ahora con 30 zapas hay varias zapas cushion-focused para pivots
    const top1 = recs[0].zapatilla.id;
    expect([
      "nike-lebron-22",
      "nike-lebron-witness-9",
      "nb-fresh-foam-bb-v3",
    ]).toContain(top1);
    expect(recs[0].match_pct).toBeGreaterThanOrEqual(70);
  });

  it("Base explosivo sin lesiones → top 3 incluye una zapa responsive de guards", () => {
    const recs = recomendar(
      perfil({
        posicion: "base",
        peso: "70-85",
        estilo: "explosivo",
        prioridad: "reactividad",
      }),
      zapatillas
    );
    const top3 = recs.slice(0, 3).map((r) => r.zapatilla.id);
    // Las zapas de base explosivo de la BD
    const zapasBaseExplosivo = [
      "anta-kai-1-speed",
      "anta-kai-2",
      "nike-kobe-8-protro",
      "nike-kyrie-low-5",
      "nike-gt-cut-3",
      "nike-ja-2",
      "lining-wow-12",
      "ua-curry-12",
    ];
    expect(top3.some((id) => zapasBaseExplosivo.includes(id))).toBe(true);
  });

  it("Presupuesto bajo + exterior → la recomendación top respeta presupuesto y outdoor", () => {
    const BUDGET = 80;
    const recs = recomendar(
      perfil({
        posicion: "alero",
        cancha: "exterior",
        prioridad: "durabilidad",
        presupuesto_max_eur: BUDGET,
      }),
      zapatillas
    );
    // El top debe respetar las restricciones duras del perfil:
    // precio ≤ presupuesto Y durabilidad outdoor ≥ 5 (property-based).
    const top = recs[0].zapatilla;
    const disponibles = top.links_compra.filter((l) => l.disponible);
    const precioMin = disponibles.length > 0
      ? Math.min(...disponibles.map((l) => l.precio_actual))
      : top.precio_msrp_eur;
    expect(precioMin).toBeLessThanOrEqual(BUDGET);
    expect(top.puntuaciones.durabilidad_outdoor).toBeGreaterThanOrEqual(5);
  });

  it("Base con tobillos delicados → no aparece la Anta KAI 1 (low-top)", () => {
    const recs = recomendar(
      perfil({
        posicion: "base",
        lesiones: ["tobillos"],
        prioridad: "soporte-tobillo",
      }),
      zapatillas
    );
    const ids = recs.map((r) => r.zapatilla.id);
    expect(ids).not.toContain("anta-kai-1-speed");
  });

  it("Cada recomendación incluye al menos 2 razones humanas", () => {
    const recs = recomendar(
      perfil({
        posicion: "base",
        estilo: "explosivo",
        prioridad: "reactividad",
      }),
      zapatillas
    );
    for (const rec of recs) {
      expect(rec.razones.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("Cada recomendación incluye mejor_precio", () => {
    const recs = recomendar(perfil(), zapatillas);
    for (const rec of recs) {
      expect(rec.mejor_precio).toBeDefined();
    }
  });

  it("match_pct está en rango 0-100", () => {
    const recs = recomendar(perfil(), zapatillas);
    for (const rec of recs) {
      expect(rec.match_pct).toBeGreaterThanOrEqual(0);
      expect(rec.match_pct).toBeLessThanOrEqual(100);
    }
  });

  it("recomendaciones ordenadas por match desc", () => {
    const recs = recomendar(perfil(), zapatillas);
    for (let i = 1; i < recs.length; i++) {
      expect(recs[i].match_pct).toBeLessThanOrEqual(recs[i - 1].match_pct);
    }
  });

  it("presupuesto_max_eur null (sin tope) no filtra por precio", () => {
    const todas = aplicarFiltrosDuros(zapatillas, perfil({ presupuesto_max_eur: null }));
    // null = sin límite → pasan todas menos las retro (excluidas por diseño)
    const noRetro = zapatillas.filter((z) => !z.es_retro).length;
    expect(todas.length).toBe(noRetro);
  });

  it("presupuesto_max_eur undefined no filtra por precio (fallo silencioso evitado)", () => {
    // El motor usa != null (loose) para cubrir undefined también
    const conUndefined = aplicarFiltrosDuros(zapatillas, {
      ...perfil(),
      presupuesto_max_eur: undefined as unknown as null,
    });
    const noRetro = zapatillas.filter((z) => !z.es_retro).length;
    expect(conUndefined.length).toBe(noRetro);
  });

  it("cada card tiene al menos 1 razón aunque la zapa tenga scores bajos", () => {
    // Perfil muy específico que podría no generar razones fácilmente
    const recs = recomendar(
      perfil({ posicion: "pivot", cancha: "exterior", prioridad: "precio" }),
      zapatillas
    );
    for (const rec of recs) {
      expect(rec.razones.length).toBeGreaterThanOrEqual(1);
    }
  });
});
