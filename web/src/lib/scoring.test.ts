import { describe, it, expect } from "vitest";
import {
  recomendar,
  calcularPesos,
  aplicarFiltrosDuros,
  findMejorPrecio,
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
    const filtradas = aplicarFiltrosDuros(
      zapatillas,
      perfil({ presupuesto_max_eur: 80, prioridad: "precio" })
    );
    const ids = filtradas.map((z) => z.id);
    // Tope €80: pasan zapas baratas (Cross 'Em Up Select, Precision 8...)
    expect(ids).toContain("adidas-cross-em-up-select");
    // NO pasan las caras (LeBron 22 cuesta €189.99)
    expect(ids).not.toContain("nike-lebron-22");
    expect(ids).not.toContain("ua-curry-12");
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
    const ids = filtradas.map((z) => z.id);
    // Zapas con amortiguación < 6 fuera
    expect(ids).not.toContain("adidas-cross-em-up-select"); // 5
    expect(ids).not.toContain("nike-precision-8"); // 5
    // Las con cushion alto sí
    expect(ids).toContain("nike-lebron-22"); // 9
    expect(ids).toContain("nike-lebron-witness-9"); // 9
  });

  it("filtra durabilidad outdoor < 5 si la cancha es exterior", () => {
    const filtradas = aplicarFiltrosDuros(
      zapatillas,
      perfil({ cancha: "exterior", prioridad: "durabilidad" })
    );
    const ids = filtradas.map((z) => z.id);
    // Curry 12 tiene durabilidad outdoor 4
    expect(ids).not.toContain("ua-curry-12");
  });

  it("sin filtros restrictivos pasan todas las zapas", () => {
    const filtradas = aplicarFiltrosDuros(zapatillas, perfil());
    expect(filtradas.length).toBe(zapatillas.length);
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
  it("devuelve el link más barato disponible", () => {
    const lebron = zapatillas.find((z) => z.id === "nike-lebron-22")!;
    const mejor = findMejorPrecio(lebron.links_compra);
    expect(mejor?.precio_actual).toBe(189.99);
    expect(mejor?.tienda).toBe("amazon_es");
  });

  it("ignora links no disponibles", () => {
    const sabrina = zapatillas.find((z) => z.id === "nike-sabrina-2")!;
    const mejor = findMejorPrecio(sabrina.links_compra);
    // Decathlon (115€) no está disponible, así que el mejor es Amazon (109.99€)
    expect(mejor?.precio_actual).toBe(109.99);
    expect(mejor?.tienda).toBe("amazon_es");
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

  it("Presupuesto bajo + exterior → top incluye zapa outdoor durable", () => {
    const recs = recomendar(
      perfil({
        posicion: "alero",
        cancha: "exterior",
        prioridad: "durabilidad",
        presupuesto_max_eur: 80,
      }),
      zapatillas
    );
    // Sub-80€ outdoor: Cross 'Em Up Select, Precision 8, Voltzy 500, Cross Em Up Speed o UA Flow Breakthru 4
    const top1 = recs[0].zapatilla.id;
    expect([
      "adidas-cross-em-up-select",
      "nike-precision-8",
      "decathlon-tarmak-voltzy-500",
      "adidas-cross-em-up-speed",
      "ua-flow-breakthru-4",
    ]).toContain(top1);
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

  it("presupuesto_max_eur null (sin tope) no filtra nada", () => {
    const todas = aplicarFiltrosDuros(zapatillas, perfil({ presupuesto_max_eur: null }));
    // null = sin límite → deben pasar todas (sin otras restricciones)
    expect(todas.length).toBe(zapatillas.length);
  });

  it("presupuesto_max_eur undefined no filtra nada (fallo silencioso evitado)", () => {
    // El motor usa != null (loose) para cubrir undefined también
    const conUndefined = aplicarFiltrosDuros(zapatillas, {
      ...perfil(),
      presupuesto_max_eur: undefined as unknown as null,
    });
    expect(conUndefined.length).toBe(zapatillas.length);
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
