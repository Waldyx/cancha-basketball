import { getAllZapatillas } from "../src/data/zapatillas";
import { scoreInfo, axisAverage } from "../src/lib/scoreFuentes";
const z = getAllZapatillas().filter(s => s.genero !== "gs" && !s.es_retro);

const rows = z.map(s => {
  const before = axisAverage(s.puntuaciones as any);
  const info = scoreInfo(s.id, before);
  return { id: s.id, before, after: info.score, conf: info.confianza, d: Math.round((info.score - before) * 10) / 10 };
});

const tiers = { alta: 0, media: 0, editorial: 0 } as any;
rows.forEach(r => tiers[r.conf]++);

console.log("=== TOP 20 ANTES (promedio ejes) ===");
[...rows].sort((a,b)=>b.before-a.before).slice(0,20).forEach((r,i)=>console.log(`${String(i+1).padStart(2)}. ${String(r.before).padEnd(4)} ${r.id}`));

console.log("\n=== TOP 20 DESPUES (consenso anclado) ===");
[...rows].sort((a,b)=>b.after-a.after).slice(0,20).forEach((r,i)=>console.log(`${String(i+1).padStart(2)}. ${String(r.after).padEnd(4)} ${r.id}  ${r.conf==="alta"?"🟢":r.conf==="media"?"🟡":"⚪"}${r.d!==0?" ("+(r.d>0?"+":"")+r.d+")":""}`));

console.log("\n=== MAYORES CAMBIOS ===");
console.log("Bajan mas:");
[...rows].filter(r=>r.d<0).sort((a,b)=>a.d-b.d).slice(0,8).forEach(r=>console.log(`  ${r.id}: ${r.before} → ${r.after} (${r.d})`));
console.log("Suben mas:");
[...rows].filter(r=>r.d>0).sort((a,b)=>b.d-a.d).slice(0,8).forEach(r=>console.log(`  ${r.id}: ${r.before} → ${r.after} (+${r.d})`));

console.log("\n=== CONFIANZA ===");
console.log(`🟢 alta (HG+RR/multi-review): ${tiers.alta}  ·  🟡 media (1 fuente): ${tiers.media}  ·  ⚪ editorial (sin review): ${tiers.editorial}`);
console.log(`Total no-retro no-gs: ${rows.length}`);
