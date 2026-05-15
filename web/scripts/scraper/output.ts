import { writeFileSync, readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import type { ScrapeResult } from "./types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, "../../src/data/precios.json");

export interface PreciosOutput {
  generated_at: string;
  shoes: Record<string, { links_compra: ScrapeResult[] }>;
}

/**
 * Escribe los precios actualizados en precios.json.
 * FUSIONA con el contenido existente: los IDs que no aparecen en `newShoes`
 * se conservan sin cambios. Los que sí aparecen se sobreescriben.
 * Esto permite ejecutar el scraper con --id / --tienda sin borrar el resto.
 */
export function writePreciosJson(
  newShoes: PreciosOutput["shoes"]
): void {
  // Leer datos existentes (si los hay)
  let existing: PreciosOutput["shoes"] = {};
  if (existsSync(OUTPUT_PATH)) {
    try {
      const raw = readFileSync(OUTPUT_PATH, "utf-8");
      const parsed: PreciosOutput = JSON.parse(raw);
      existing = parsed.shoes ?? {};
    } catch {
      // Si el JSON está corrupto, empezamos de cero
      existing = {};
    }
  }

  // Fusionar: los nuevos overriden a los existentes
  const merged: PreciosOutput["shoes"] = { ...existing, ...newShoes };

  const output: PreciosOutput = {
    generated_at: new Date().toISOString(),
    shoes: merged,
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2) + "\n", "utf-8");
  console.log(`✅ precios.json actualizado → ${OUTPUT_PATH}`);
}
