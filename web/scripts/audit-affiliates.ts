// Auditoría de enlaces de afiliado: verifica que cada link tiene_afiliado:true
// (a) use el awinmid/red correcto para su tienda, y (b) la URL de destino apunte
// al modelo correcto (no a búsqueda genérica ni a otro modelo).
import { getAllZapatillas } from "../src/data/zapatillas";
import { writeFileSync } from "node:fs";

// awinmid esperado por tienda (de CLAUDE.md)
const AWIN_MID: Record<string, string> = {
  decathlon: "105405",
  atmosfera_sport: "26255",
  adidas_es: "77008",
  aliexpress: "11640",
  forumsport_es: "23805",
  snipes_eu: "122628",
};

// tiendas afiliadas activas (deben tener tiene_afiliado:true legítimamente)
const AFILIADO_OK = new Set([
  "amazon_es", "decathlon", "atmosfera_sport", "adidas_es", "aliexpress",
  "forumsport_es", "snipes_eu", "fuikaomar_es", "elcorteingles_es",
]);

function decodeUed(url: string): string | null {
  const m = url.match(/[?&]ued=([^&]+)/);
  if (m) { try { return decodeURIComponent(m[1]); } catch { return m[1]; } }
  // TradeTracker / fuikaomar: u=
  const m2 = url.match(/[?&]u=([^&]+)/);
  if (m2) { try { return decodeURIComponent(m2[1]); } catch { return m2[1]; } }
  return null;
}

function tokens(s: string): string[] {
  return (s.toLowerCase().match(/[a-z0-9]+/g) || []).filter(t => t.length >= 2 && !/^(the|de|of|es|com|www|nike|las|los|para)$/.test(t));
}

// ¿el destino es un ID opaco (no contiene nombre de producto legible)?
function isOpaque(dest: string): boolean {
  const d = dest.toLowerCase();
  // Amazon /dp/ASIN o /gp/ sin slug de nombre; AliExpress item/NNN o s.click shortlink
  if (/s\.click\.aliexpress|aliexpress\.[a-z]+\/item\/\d+/.test(d)) return true;
  if (/amazon\.[a-z.]+\/dp\/[a-z0-9]+\/?($|\?)/.test(d)) return true; // /dp/ASIN sin slug previo
  if (/amazon\.[a-z.]+\/gp\//.test(d)) return true;
  return false;
}

const shoes = getAllZapatillas();
let total = 0;
const issues: { slug: string; tienda: string; tipo: string; detalle: string; url: string }[] = [];

for (const z of shoes) {
  // tokens del modelo + signature player (AE1 -> Anthony Edwards, etc.)
  const modelToks = tokens(`${z.modelo} ${z.signature_player || ""}`).filter(t => !/^(low|mid|high|protro|gs|zoom|air|nitro)$/.test(t));
  const slugToks = z.slug.split("-").filter(t => t.length >= 2 && !/^(nike|adidas|jordan|puma|under|armour|lining|anta|peak|new|balance|reebok|converse)$/.test(t));
  const allToks = [...new Set([...modelToks, ...slugToks])];
  for (const link of z.links_compra) {
    if (!link.tiene_afiliado) continue;
    total++;
    const url = link.url;
    const tienda = link.tienda;

    if (!AFILIADO_OK.has(tienda)) {
      issues.push({ slug: z.slug, tienda, tipo: "TIENDA_NO_AFILIADA", detalle: `tiene_afiliado:true pero ${tienda} no está activa`, url });
    }

    const expectMid = AWIN_MID[tienda];
    if (expectMid) {
      const midM = url.match(/awinmid=(\d+)/);
      if (midM && midM[1] !== expectMid) {
        issues.push({ slug: z.slug, tienda, tipo: "AWINMID_INCORRECTO", detalle: `awinmid=${midM[1]} pero ${tienda} debería ser ${expectMid}`, url });
      }
    }

    const dest = decodeUed(url) || url;
    const destLow = dest.toLowerCase();
    const isSearch = /\/search|[?&](q|query|text|k|s|term)=|\/buscar|\/w\?/.test(destLow);
    const opaque = isOpaque(dest);
    const hit = allToks.some(t => destLow.includes(t));

    if (opaque && !isSearch) {
      issues.push({ slug: z.slug, tienda, tipo: "OPACO_VERIFICAR_NAVEGADOR", detalle: `ID opaco (ASIN/item) — no verificable por texto`, url: dest.slice(0, 110) });
    } else if (isSearch) {
      // extraer el término de búsqueda y comprobar que nombra el modelo correcto
      const qm = dest.match(/[?&](?:k|q|query|text|term|s)=([^&]+)/);
      const term = qm ? decodeURIComponent(qm[1].replace(/\+/g, " ")).toLowerCase() : "";
      const termHit = allToks.filter(t => term.includes(t)).length;
      if (!term) {
        issues.push({ slug: z.slug, tienda, tipo: "BUSQUEDA_SIN_TERMINO", detalle: `búsqueda sin término legible`, url: dest.slice(0, 110) });
      } else if (termHit === 0) {
        issues.push({ slug: z.slug, tienda, tipo: "BUSQUEDA_TERMINO_MALO", detalle: `término "${term}" no nombra el modelo (esperaba: ${allToks.join(",")})`, url: dest.slice(0, 110) });
      } else {
        issues.push({ slug: z.slug, tienda, tipo: "BUSQUEDA_OK", detalle: `término "${term}" ✓`, url: dest.slice(0, 90) });
      }
    } else if (!hit) {
      // URL con nombre de producto legible pero NINGÚN token del modelo coincide => probable modelo equivocado
      issues.push({ slug: z.slug, tienda, tipo: "MODELO_EQUIVOCADO?", detalle: `URL nombra otro producto (esperaba: ${allToks.join(",")})`, url: dest.slice(0, 110) });
    }
  }
}

// agrupar por tipo
const byType: Record<string, number> = {};
for (const i of issues) byType[i.tipo] = (byType[i.tipo] || 0) + 1;

console.log(`\n=== AUDITORÍA ENLACES AFILIADOS ===`);
console.log(`Total enlaces tiene_afiliado:true: ${total}`);
console.log(`Total incidencias: ${issues.length}\n`);
console.log(`Por tipo:`);
for (const [t, n] of Object.entries(byType).sort((a, b) => b[1] - a[1])) console.log(`  ${t}: ${n}`);

// volcar las más graves (mismatch real, no opacas ni búsquedas OK)
const graves = issues.filter(i => /INCORRECTO|NO_AFILIADA|EQUIVOCADO|TERMINO_MALO|SIN_TERMINO/.test(i.tipo));
console.log(`\n=== GRAVES (${graves.length}) — modelo/término equivocado o config rota ===`);
for (const i of graves) console.log(`[${i.tipo}] ${i.slug} · ${i.tienda}\n    ${i.detalle}\n    ${i.url}`);

// desglose por tienda de lo que necesita verificación en navegador
const need = issues.filter(i => /EQUIVOCADO|OPACO/.test(i.tipo));
const byStore: Record<string, number> = {};
for (const i of need) byStore[i.tienda] = (byStore[i.tienda] || 0) + 1;
console.log(`\n=== A VERIFICAR EN NAVEGADOR (${need.length}) por tienda ===`);
for (const [k, n] of Object.entries(byStore).sort((a, b) => b[1] - a[1])) console.log(`  ${k}: ${n}`);

// guardar worklist completo a JSON para ir tachando
const out = { generado: new Date().toISOString(), total, porTipo: byType, issues };
writeFileSync(new URL("./audit-affiliates.out.json", import.meta.url), JSON.stringify(out, null, 2));
console.log(`\n→ worklist completo en scripts/audit-affiliates.out.json`);
