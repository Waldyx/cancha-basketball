import { writeFileSync, readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import type { ScrapeResult } from "./types.js";
import { identidadProducto } from "../../src/lib/mergePrices.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, "../../src/data/precios.json");

/**
 * Una entrada de una tienda CON scraper que lleve más de esto sin refrescarse
 * es sospechosa: el scraper la intenta cada noche, así que si no se ha
 * actualizado es que lleva un mes fallando (o el producto ya no existe).
 * Ver los 4 enlaces MUERTOS de Snipes de la s35: seguían dando precio de mayo
 * y mandaban el click a un 404.
 */
const MAX_EDAD_DIAS = 30;

export interface PreciosOutput {
  generated_at: string;
  shoes: Record<string, { links_compra: ScrapeResult[] }>;
}

/** Identidad de un enlace dentro de una zapatilla: tienda + producto. */
function claveEnlace(l: ScrapeResult): string {
  return `${l.tienda}||${identidadProducto(l.url) ?? l.url}`;
}

function edadEnDias(l: ScrapeResult, hoy: number): number {
  const t = Date.parse((l.ultima_verificacion ?? "").slice(0, 10));
  return Number.isNaN(t) ? Infinity : (hoy - t) / 86_400_000;
}

/**
 * Escribe los precios actualizados en precios.json.
 *
 * FUSIONA POR ENLACE, no por zapatilla. Antes esto era `{...existing, ...newShoes}`,
 * que sustituía el `links_compra` ENTERO de la zapa: si una noche el scraper
 * resolvía 2 de sus 4 enlaces, los otros 2 se BORRABAN junto con el precio bueno
 * que habían conseguido la noche anterior. Eso contradecía lo que el propio
 * scraper dice hacer en index.ts ("los fallidos NO se escriben para no anular un
 * precio válido"): la intención era correcta y se perdía aquí, en la escritura.
 * Medido el 2026-08-09: 29 entradas desaparecidas en una sola noche, 17 de Amazon,
 * y la frescura agregada no acumulaba (era la de una noche suelta).
 *
 * Se emparejan por PRODUCTO (misma identidad que usa el merge de lectura), no
 * por tienda: una tienda puede tener varios listados de la misma zapa.
 *
 * CADUCIDAD: una entrada vieja se conserva solo si su tienda NO tiene scraper.
 * Las que sí lo tienen caducan a los 30 días — se reintentan cada noche, así que
 * una entrada rancia significa que lleva un mes fallando. Las tiendas SIN scraper
 * no pueden refrescar su fecha NUNCA, así que caducarlas borraría datos vivos:
 * hay enlaces (Basketball Emotion, basket4ballers, manelsanchez) que solo existen
 * aquí, y quitarlos dejaría la zapa sin esa opción de compra.
 */
export function fusionarPrecios(
  existing: PreciosOutput["shoes"],
  newShoes: PreciosOutput["shoes"],
  tiendasConScraper: ReadonlySet<string> = new Set(),
  hoy: number = Date.now()
): { shoes: PreciosOutput["shoes"]; conservadas: number; caducadas: number } {
  const conservable = (l: ScrapeResult) =>
    !tiendasConScraper.has(l.tienda) || edadEnDias(l, hoy) <= MAX_EDAD_DIAS;

  const shoes: PreciosOutput["shoes"] = {};
  let caducadas = 0;
  let conservadas = 0;

  for (const id of new Set([...Object.keys(existing), ...Object.keys(newShoes)])) {
    const previos = existing[id]?.links_compra ?? [];
    const frescos = newShoes[id]?.links_compra ?? [];

    const porEnlace = new Map<string, ScrapeResult>();
    for (const l of previos) {
      if (!conservable(l)) {
        caducadas++;
        continue;
      }
      porEnlace.set(claveEnlace(l), l);
    }
    // Lo scrapeado ESTA noche manda sobre lo que hubiera de antes.
    const clavesFrescas = new Set(frescos.map(claveEnlace));
    for (const l of frescos) porEnlace.set(claveEnlace(l), l);

    // Enlaces que esta noche NO se han resuelto pero mantienen su último precio
    // bueno: justo lo que la fusión por zapatilla tiraba a la basura.
    if (frescos.length > 0) {
      for (const clave of porEnlace.keys()) if (!clavesFrescas.has(clave)) conservadas++;
    }

    if (porEnlace.size > 0) shoes[id] = { links_compra: [...porEnlace.values()] };
  }

  return { shoes, conservadas, caducadas };
}

export function writePreciosJson(
  newShoes: PreciosOutput["shoes"],
  tiendasConScraper: ReadonlySet<string> = new Set()
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

  const { shoes, conservadas, caducadas } = fusionarPrecios(
    existing,
    newShoes,
    tiendasConScraper
  );

  if (conservadas > 0) {
    console.log(`♻️  ${conservadas} entradas conservadas de pasadas anteriores (esta noche fallaron)`);
  }
  if (caducadas > 0) {
    console.log(`🗑️  ${caducadas} entradas caducadas (>${MAX_EDAD_DIAS}d sin refrescar, tienda con scraper)`);
  }

  const output: PreciosOutput = {
    generated_at: new Date().toISOString(),
    shoes,
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2) + "\n", "utf-8");
  console.log(`✅ precios.json actualizado → ${OUTPUT_PATH}`);
}
