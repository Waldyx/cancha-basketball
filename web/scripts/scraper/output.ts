import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import type { ScrapeResult } from "./types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, "../../src/data/precios.json");

export interface PreciosOutput {
  generated_at: string;
  shoes: Record<string, { links_compra: ScrapeResult[] }>;
}

export function writePreciosJson(shoes: PreciosOutput["shoes"]): void {
  const output: PreciosOutput = {
    generated_at: new Date().toISOString(),
    shoes,
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2) + "\n", "utf-8");
  console.log(`✅ precios.json actualizado → ${OUTPUT_PATH}`);
}
