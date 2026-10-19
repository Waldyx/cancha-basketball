// Catálogo para /resultados, sin los campos que el motor del quiz y sus tarjetas no leen.
// Antes la página importaba `zapatillas` entero en su JS (645 KB, 127 KB comprimido, con
// resúmenes, pros, contras y precios.json dentro); así son ~26 KB comprimidos y se cachea.
// ⚠ Si `recomendar()` (lib/scoring.ts) o `renderCard` de resultados.astro empiezan a usar uno
// de estos campos, hay que sacarlo de la lista. `quizCatalogo.test.ts` compara las
// recomendaciones con el catálogo entero y con el recortado.
import type { Zapatilla } from "./types";

export const CAMPOS_FUERA_QUIZ = [
  "resumen",
  "pros",
  "contras",
  "veredicto",
  "fuentes",
  "imagenes",
  "video_review_url",
  "tecnologia_clave",
  "material_superior",
  "tipo_cierre",
  "predecesor_id",
  "sucesor_id",
  "ultima_actualizacion",
  "tags",
] as const;

export function catalogoQuiz(zs: Zapatilla[]): Zapatilla[] {
  const fuera = new Set<string>(CAMPOS_FUERA_QUIZ);
  return zs.map((z) => Object.fromEntries(Object.entries(z).filter(([k]) => !fuera.has(k))) as unknown as Zapatilla);
}
