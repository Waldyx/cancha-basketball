// Puntuación de consenso: ancla el score mostrado a fuentes de referencia.
// HoopsGeek (meta-agrega ~6-8 reviews expertas) es el ancla; RunRepeat corrobora.
// Si no hay fuente externa → fallback al promedio de nuestros 8 ejes (editorial).
import fuentesJson from "../data/score-fuentes.json";

export type Confianza = "alta" | "media" | "editorial";

export interface FuenteScore {
  nombre: string;
  score: number;   // normalizado /10
  escala: string;  // texto original p.ej. "8.5/10" o "91/100"
  n?: number;      // nº de reviews que agrega (HG)
  url?: string;
}

export interface ScoreInfo {
  score: number;          // 0-10, el que se muestra
  confianza: Confianza;
  fuentes: FuenteScore[]; // para la UI de transparencia
  rango?: [number, number];
}

const DATA: Record<string, any> = (fuentesJson as any).shoes ?? {};

const HG_URL = (id: string, d: any): string | undefined => d?.url;

/**
 * Devuelve el score a mostrar + confianza + fuentes.
 * @param id  id de la zapatilla
 * @param axisAvg  promedio de nuestros 8 ejes (fallback editorial)
 */
export function scoreInfo(id: string, axisAvg: number): ScoreInfo {
  const d = DATA[id];
  const fuentes: FuenteScore[] = [];

  if (d?.hg != null) {
    fuentes.push({ nombre: "HoopsGeek", score: d.hg, escala: `${d.hg}/10`, n: d.n, url: HG_URL(id, d) });
  }
  if (d?.rr != null) {
    fuentes.push({ nombre: "RunRepeat", score: Math.round(d.rr) / 10, escala: `${d.rr}/100` });
  }
  if (d?.wt_url) {
    fuentes.push({ nombre: "WearTesters", score: 0, escala: "reseña", url: d.wt_url });
  }

  // Score mostrado: HG manda (ancla experta). Si solo hay RunRepeat, se NORMALIZA
  // a la escala de HG (RR corre ~+0.6 más alto, offset empírico de las 17 zapas con
  // ambas fuentes) — si no, RR-only inflaría. Si no hay nada → promedio editorial.
  const RR_OFFSET = 0.6;
  let score: number;
  let confianza: Confianza;
  if (d?.hg != null) {
    score = d.hg;
    confianza = d.rr != null || (d.n ?? 0) >= 4 ? "alta" : "media";
  } else if (d?.rr != null) {
    score = Math.max(0, Math.round(d.rr) / 10 - RR_OFFSET);
    confianza = "media";
  } else if (d?.editorial != null) {
    // Estimación editorial CALIBRADA (anclada a la hermana verificada + reseñas
    // cualitativas) para zapas sin review numérica. Mejor que el promedio crudo.
    score = d.editorial;
    confianza = "editorial";
  } else {
    score = axisAvg;
    confianza = "editorial";
  }

  return { score: Math.round(score * 10) / 10, confianza, fuentes, rango: d?.rango };
}

export const axisAverage = (puntuaciones: Record<string, number>): number => {
  const v = Object.values(puntuaciones);
  return Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 10) / 10;
};
