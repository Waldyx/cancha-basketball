/**
 * Orquestador principal del scraper de precios.
 *
 * Uso:
 *   npx tsx scripts/scraper/index.ts            # scrape completo
 *   npx tsx scripts/scraper/index.ts --dry-run  # solo imprime, no escribe
 *   npx tsx scripts/scraper/index.ts --tienda amazon_es  # solo una tienda
 *   npx tsx scripts/scraper/index.ts --id nike-lebron-22 # solo una zapatilla
 */

import { chromium, type Browser, type BrowserContext } from "playwright";
import { writePreciosJson } from "./output.js";
import type { ScrapeResult, ShoeRef, StoreScraper } from "./types.js";
import { getComision } from "./commissions.js";

// Store scrapers
import { amazon_es } from "./stores/amazon_es.js";
import { decathlon } from "./stores/decathlon.js";
import { nike_es } from "./stores/nike_es.js";
import { adidas_es } from "./stores/adidas_es.js";
import { zalando_es } from "./stores/zalando_es.js";
import { footlocker_es } from "./stores/footlocker_es.js";
import { jd_sports_es } from "./stores/jd_sports_es.js";
import { sprinter_es } from "./stores/sprinter_es.js";
import { basket_world } from "./stores/basket_world.js";
import { aliexpress } from "./stores/aliexpress.js";
import { puma_es } from "./stores/puma_es.js";
import { ua_es } from "./stores/ua_es.js";
import { nb_es } from "./stores/nb_es.js";
import { reebok_es } from "./stores/reebok_es.js";
import { kickscrew } from "./stores/generic.js";

// Importar datos del catálogo directamente (bypasando el merge)
import { createRequire } from "module";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Cargamos zapatillas.ts compilado via ts-node/tsx
// Para evitar el import circular, leemos el JSON raw
interface LinkCompraRaw {
  tienda: string;
  url: string;
  precio_actual: number;
  disponible: boolean;
}
interface ZapatillaRaw {
  id: string;
  marca: string;
  modelo: string;
  links_compra: LinkCompraRaw[];
}

// Dynamically import zapatillas using tsx's resolver
const { zapatillas } = await import("../../src/data/zapatillas.js");

const SCRAPERS: Record<string, StoreScraper> = {
  amazon_es,
  decathlon,
  nike_es,
  adidas_es,
  zalando_es,
  footlocker_es,
  jd_sports_es,
  sprinter_es,
  basket_world,
  aliexpress,
  puma_es,
  ua_es,
  nb_es,
  reebok_es,
  kickscrew,
};

/** Umbral de empate de precio en EUR */
const TIE_THRESHOLD = 0.5;

/** Pausa aleatoria entre requests para evitar rate-limiting */
function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function randomDelay(min = 1500, max = 3500): Promise<void> {
  return sleep(min + Math.random() * (max - min));
}

/**
 * Cuando varias tiendas tienen precios empatados, ordena por comisión
 * y devuelve el array reordenado (la más rentable primero).
 */
function applyCommissionTiebreak(results: ScrapeResult[]): ScrapeResult[] {
  const available = results.filter((r) => r.disponible && r.precio_actual > 0);
  if (available.length < 2) return results;

  const minPrice = Math.min(...available.map((r) => r.precio_actual));

  const tied = available.filter((r) => r.precio_actual - minPrice <= TIE_THRESHOLD);

  if (tied.length <= 1) return results;

  // Ordenar empatadas por comisión desc
  tied.sort((a, b) => getComision(b.tienda) - getComision(a.tienda));

  // Reconstruir array: empatadas (ordenadas) primero, resto al final
  const notTied = results.filter(
    (r) => !tied.find((t) => t.tienda === r.tienda)
  );

  console.log(
    `  🏆 Empate ${minPrice}€: ${tied.map((t) => `${t.tienda}(${getComision(t.tienda)}%)`).join(" > ")}`
  );

  return [...tied, ...notTied];
}

// ─── Parseo de argumentos CLI ────────────────────────────────────────────────
const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const filterTienda = args.includes("--tienda")
  ? args[args.indexOf("--tienda") + 1]
  : null;
const filterId = args.includes("--id")
  ? args[args.indexOf("--id") + 1]
  : null;

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  console.log("🔍 CANCHA — Scraper de precios");
  console.log(`   Fecha: ${new Date().toISOString()}`);
  console.log(`   Dry run: ${isDryRun}`);
  if (filterTienda) console.log(`   Tienda: ${filterTienda}`);
  if (filterId) console.log(`   Zapatilla: ${filterId}`);
  console.log();

  // Filtrar catálogo
  let catalog = zapatillas as unknown as ZapatillaRaw[];
  if (filterId) catalog = catalog.filter((z) => z.id === filterId);

  const output: Record<string, { links_compra: ScrapeResult[] }> = {};
  let totalRequests = 0;
  let successCount = 0;
  let failCount = 0;

  const browser: Browser = await chromium.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled",
    ],
  });

  // Contexto con UA realista
  const context: BrowserContext = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    locale: "es-ES",
    timezoneId: "Europe/Madrid",
    viewport: { width: 1280, height: 800 },
    extraHTTPHeaders: {
      "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
    },
  });

  for (const shoe of catalog) {
    const shoe_ref: ShoeRef = {
      id: shoe.id,
      marca: shoe.marca,
      modelo: shoe.modelo,
    };

    const results: ScrapeResult[] = [];
    const linksToScrape = filterTienda
      ? shoe.links_compra.filter((l) => l.tienda === filterTienda)
      : shoe.links_compra;

    if (linksToScrape.length === 0) continue;

    console.log(`\n📦 ${shoe.marca} ${shoe.modelo} (${shoe.id})`);

    for (const link of linksToScrape) {
      const scraper = SCRAPERS[link.tienda];
      if (!scraper) {
        console.log(`  ⚠️  Sin scraper para: ${link.tienda}`);
        // Conservar precio existente
        results.push({
          tienda: link.tienda,
          url: link.url,
          precio_actual: link.precio_actual,
          disponible: link.disponible,
          ultima_verificacion: new Date().toISOString().slice(0, 10),
        });
        continue;
      }

      totalRequests++;
      const page = await context.newPage();

      try {
        process.stdout.write(`  🌐 ${link.tienda.padEnd(16)} `);
        const result = await scraper.scrape(page, link.url, shoe_ref);

        if (result.disponible && result.precio_actual > 0) {
          successCount++;
          const changed = result.precio_actual !== link.precio_actual;
          const changeStr = changed
            ? ` (era ${link.precio_actual}€)`
            : " (sin cambio)";
          console.log(`→ ${result.precio_actual}€${changeStr}`);
        } else {
          failCount++;
          console.log(`→ ❌ no encontrado (conservando ${link.precio_actual}€)`);
          // Fallback: conservar precio anterior
          result.precio_actual = link.precio_actual;
          result.disponible = false;
        }

        results.push(result);
      } catch (err) {
        failCount++;
        console.log(`→ 💥 error: ${(err as Error).message.slice(0, 60)}`);
        results.push({
          tienda: link.tienda,
          url: link.url,
          precio_actual: link.precio_actual,
          disponible: false,
          ultima_verificacion: new Date().toISOString().slice(0, 10),
        });
      } finally {
        await page.close();
        await randomDelay();
      }
    }

    // Aplicar desempate por comisión
    const sortedResults = applyCommissionTiebreak(results);
    output[shoe.id] = { links_compra: sortedResults };
  }

  await context.close();
  await browser.close();

  // Resumen
  console.log("\n─────────────────────────────");
  console.log(`✅ Éxito:   ${successCount}/${totalRequests}`);
  console.log(`❌ Fallido: ${failCount}/${totalRequests}`);

  if (!isDryRun) {
    writePreciosJson(output);
    console.log("💾 precios.json escrito.");
  } else {
    console.log("🔍 Dry run — no se escribió nada.");
    console.log(JSON.stringify(output, null, 2).slice(0, 2000) + "\n...");
  }
}

main().catch((err) => {
  console.error("💥 Error fatal:", err);
  process.exit(1);
});
