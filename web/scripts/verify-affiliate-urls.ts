// Verifica en navegador real (cloakbrowser stealth) que cada URL de afiliado
// "a verificar" apunta al modelo correcto. Lee el título del producto y lo
// compara con los tokens del modelo esperado.
import { getAllZapatillas } from "../src/data/zapatillas";
import { launchContext } from "cloakbrowser";
import type { BrowserContext } from "playwright-core";
import { readFileSync, writeFileSync } from "node:fs";

function tokens(s: string): string[] {
  return (s.toLowerCase().match(/[a-z0-9]+/g) || []).filter(
    t => t.length >= 2 && !/^(the|de|of|es|com|www|las|los|para|low|mid|high|zoom|air|nitro)$/.test(t)
  );
}

const shoes = getAllZapatillas();
const byslug = new Map(shoes.map(z => [z.slug, z]));

const audit = JSON.parse(readFileSync(new URL("./audit-affiliates.out.json", import.meta.url), "utf8"));
const worklist: { slug: string; tienda: string; tipo: string; url: string }[] =
  audit.issues.filter((i: any) => /EQUIVOCADO|OPACO/.test(i.tipo));

// URL real original (la del wrapper) — para reabrir hay que usar la del dato, no la recortada
function realUrl(slug: string, tienda: string, shown: string): string {
  const z = byslug.get(slug)!;
  const link = z.links_compra.find(l => l.tienda === tienda && (l.url.includes(shown.slice(0, 40)) || shown.includes(l.url.slice(0, 40))));
  return link?.url || shown;
}

async function titleOf(context: BrowserContext, url: string): Promise<string> {
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(1200);
    const t = await page.evaluate(() => {
      const pt = document.querySelector("#productTitle")?.textContent;
      if (pt) return pt.trim();
      const og = document.querySelector('meta[property="og:title"]')?.getAttribute("content");
      if (og) return og.trim();
      const h1 = document.querySelector("h1")?.textContent;
      if (h1) return h1.trim();
      return document.title;
    });
    return (t || "").slice(0, 140);
  } finally {
    await page.close().catch(() => {});
  }
}

const ONLY = process.argv.includes("--tienda") ? process.argv[process.argv.indexOf("--tienda") + 1] : null;

(async () => {
  const list = ONLY ? worklist.filter(w => w.tienda === ONLY) : worklist;
  console.log(`Verificando ${list.length} URLs${ONLY ? ` (tienda=${ONLY})` : ""}...\n`);
  const context = await launchContext({
    headless: true, locale: "es-ES", timezone: "Europe/Madrid",
    viewport: { width: 1366, height: 768 },
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--no-first-run", "--no-default-browser-check"],
    contextOptions: { extraHTTPHeaders: { "Accept-Language": "es-ES,es;q=0.9,en;q=0.8" } },
  });
  const results: any[] = [];
  for (const w of list) {
    const z = byslug.get(w.slug)!;
    const expect = [...new Set(tokens(`${z.modelo} ${z.signature_player || ""}`))];
    const url = realUrl(w.slug, w.tienda, w.url);
    let title = "", verdict = "";
    try {
      title = await titleOf(context, url);
      const tl = title.toLowerCase();
      const hit = expect.some(t => tl.includes(t));
      verdict = !title ? "??? (sin título)" : hit ? "OK" : "MISMATCH";
    } catch (e: any) {
      verdict = "ERROR: " + (e.message || "").slice(0, 50);
    }
    const line = `[${verdict}] ${w.slug} · ${w.tienda}\n    esperaba: ${expect.join(",")}\n    título:   ${title}`;
    console.log(line);
    results.push({ ...w, urlReal: url, title, verdict, expect });
  }
  await context.close();
  writeFileSync(new URL("./verify-affiliate-urls.out.json", import.meta.url), JSON.stringify(results, null, 2));
  const mismatch = results.filter(r => /MISMATCH/.test(r.verdict));
  console.log(`\n=== RESUMEN ===`);
  console.log(`OK: ${results.filter(r => r.verdict === "OK").length} · MISMATCH: ${mismatch.length} · errores/sin-título: ${results.filter(r => /ERROR|\?\?\?/.test(r.verdict)).length}`);
  console.log(`\nMISMATCH (modelo equivocado):`);
  for (const m of mismatch) console.log(`  ${m.slug} · ${m.tienda} → "${m.title}"`);
})();
