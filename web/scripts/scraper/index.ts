/**
 * Orquestador principal del scraper de precios.
 *
 * Uso:
 *   npx tsx scripts/scraper/index.ts            # scrape completo
 *   npx tsx scripts/scraper/index.ts --dry-run  # solo imprime, no escribe
 *   npx tsx scripts/scraper/index.ts --tienda amazon_es  # solo una tienda
 *   npx tsx scripts/scraper/index.ts --id nike-lebron-22 # solo una zapatilla
 *
 * Estrategia anti-bot:
 *  1. Stealth browser context (navigator.webdriver = undefined, chrome fingerprint, etc.)
 *  2. Bloqueo de recursos innecesarios (fuentes, píxeles de tracking)
 *  3. Delay aleatorio entre requests (1.5–3.5 s)
 *  4. Fallback automático a idealo.es cuando todos los scrapers fallan para una zapatilla
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
import { idealo_es, idealoSearchUrl } from "./stores/idealo.js";

// Importar datos del catálogo directamente (bypasando el merge)
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

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
  idealo_es,
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
 * Script de stealth: oculta los indicadores de automatización del navegador.
 * Se inyecta en todas las páginas antes de que se ejecute cualquier JS.
 */
const STEALTH_SCRIPT = `
  // Ocultar webdriver flag (señal más evidente de Playwright/Selenium)
  Object.defineProperty(navigator, 'webdriver', { get: () => undefined });

  // Simular objeto chrome con métodos esperados por los detectores
  if (!window.chrome) {
    window.chrome = {
      runtime: {
        connect: () => {},
        sendMessage: () => {},
      },
      loadTimes: () => ({}),
      csi: () => ({}),
      app: { isInstalled: false },
    };
  }

  // Simular plugins del navegador (headless Chrome tiene 0 plugins → señal clara)
  if (navigator.plugins.length === 0) {
    const fakePdf = { name: 'Chrome PDF Plugin', filename: 'internal-pdf-viewer', description: 'Portable Document Format' };
    const fakeViewer = { name: 'Chrome PDF Viewer', filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai', description: '' };
    Object.defineProperty(navigator, 'plugins', {
      get: () => {
        const arr = [fakePdf, fakeViewer];
        arr.item = (i) => arr[i] || null;
        arr.namedItem = (n) => arr.find(p => p.name === n) || null;
        arr.refresh = () => {};
        return arr;
      }
    });
  }

  // Idiomas (headless suele devolver [])
  Object.defineProperty(navigator, 'languages', { get: () => ['es-ES', 'es', 'en-US', 'en'] });

  // Plataforma
  Object.defineProperty(navigator, 'platform', { get: () => 'Win32' });
  Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 8 });
  Object.defineProperty(navigator, 'deviceMemory', { get: () => 8 });

  // Permissions: hacer que 'notifications' devuelva 'denied' como un navegador real
  const _origPerms = navigator.permissions?.query?.bind(navigator.permissions);
  if (_origPerms) {
    navigator.permissions.query = (params) => {
      if (params.name === 'notifications') {
        return Promise.resolve({ state: 'denied', onchange: null });
      }
      return _origPerms(params);
    };
  }
`;

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
  const notTied = results.filter((r) => !tied.find((t) => t.tienda === r.tienda));

  console.log(
    `  🏆 Empate ${minPrice}€: ${tied
      .map((t) => `${t.tienda}(${getComision(t.tienda)}%)`)
      .join(" > ")}`
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
// Idealo fallback desactivado por defecto hasta confirmar URL correcta (idealo.es cambió su formato en 2025)
// Activar con --idealo cuando el URL format esté verificado
const skipIdealo = !args.includes("--idealo");

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
  let idealoFallbacks = 0;

  const browser: Browser = await chromium.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      // Ocultar señales de automatización al nivel del motor
      "--disable-blink-features=AutomationControlled",
      // Reducir uso de memoria
      "--disable-dev-shm-usage",
      // Deshabilitar la pantalla de bienvenida de Chrome
      "--no-first-run",
      "--no-default-browser-check",
    ],
  });

  // Contexto con UA y configuración regional realistas
  const context: BrowserContext = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    locale: "es-ES",
    timezoneId: "Europe/Madrid",
    viewport: { width: 1366, height: 768 },
    extraHTTPHeaders: {
      "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
      "sec-ch-ua": '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
    },
    // Proporcionar geolocalización de España para los permisos
    geolocation: { longitude: -3.7037, latitude: 40.4168 }, // Madrid
    permissions: ["geolocation"],
  });

  // ── Inyectar stealth script en TODAS las páginas ─────────────────────────
  await context.addInitScript(STEALTH_SCRIPT);

  // ── Bloquear recursos que no aportan al scraping (fuentes, tracking) ─────
  // NO bloqueamos imágenes porque algunos detectores verifican que se carguen
  await context.route(
    "**/*.{woff,woff2,ttf,eot,otf}",
    (route) => route.abort()
  );
  await context.route(
    (url) => {
      const h = url.hostname;
      return (
        h.includes("doubleclick") ||
        h.includes("google-analytics") ||
        h.includes("googletagmanager") ||
        h.includes("facebook.net") ||
        h.includes("hotjar") ||
        h.includes("segment.com") ||
        h.includes("amplitude.com") ||
        h.includes("mixpanel")
      );
    },
    (route) => route.abort()
  );

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

    let shoeSuccesses = 0;

    for (const link of linksToScrape) {
      // Skip idealo entries in the catalog — se manejan vía fallback automático
      if (link.tienda === "idealo_es" && !filterTienda) continue;

      const scraper = SCRAPERS[link.tienda];
      if (!scraper) {
        console.log(`  ⚠️  Sin scraper para: ${link.tienda}`);
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
          shoeSuccesses++;
          const changed = result.precio_actual !== link.precio_actual;
          const changeStr = changed
            ? ` (era ${link.precio_actual}€)`
            : " (sin cambio)";
          console.log(`→ ${result.precio_actual}€${changeStr}`);
        } else {
          failCount++;
          console.log(
            `→ ❌ no encontrado (conservando ${link.precio_actual}€)`
          );
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

    // ── Fallback automático a idealo cuando todos los scrapers fallan ────────
    if (shoeSuccesses === 0 && !skipIdealo && !filterTienda) {
      process.stdout.write(`  🔍 idealo (fallback)    `);
      const idealoUrl = idealoSearchUrl(shoe.marca, shoe.modelo);
      const page = await context.newPage();
      try {
        const result = await idealo_es.scrape(page, idealoUrl, shoe_ref);
        if (result.disponible && result.precio_actual > 0) {
          idealoFallbacks++;
          console.log(`→ ${result.precio_actual}€ (idealo.es)`);

          // El resultado de idealo se añade como entrada adicional
          // Para no contaminar los links existentes, lo insertamos al final
          results.push(result);
        } else {
          console.log(`→ ❌ sin resultado en idealo`);
        }
      } catch (err) {
        console.log(`→ 💥 idealo error: ${(err as Error).message.slice(0, 50)}`);
      } finally {
        await page.close();
        await randomDelay();
      }
    }

    // Solo guardar en precios.json los resultados exitosos.
    // Los fallidos NO se escriben: la función mergePrices conservará el precio editorial.
    // Esto evita que un fallo de scraping (bot-detection, timeout) anule un precio válido.
    const successfulResults = results.filter((r) => r.disponible && r.precio_actual > 0);
    const sortedResults = applyCommissionTiebreak(successfulResults);
    if (sortedResults.length > 0) {
      output[shoe.id] = { links_compra: sortedResults };
    }
  }

  await context.close();
  await browser.close();

  // ── Resumen ───────────────────────────────────────────────────────────────
  console.log("\n─────────────────────────────────────");
  console.log(`✅ Éxito:            ${successCount}/${totalRequests}`);
  console.log(`❌ Fallido:          ${failCount}/${totalRequests}`);
  if (idealoFallbacks > 0) {
    console.log(`🔍 Idealo fallbacks: ${idealoFallbacks}`);
  }

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
