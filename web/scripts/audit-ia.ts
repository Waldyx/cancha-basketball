/**
 * Comprueba que los modelos gratuitos de las funciones de IA (chat, coach, sesion) siguen
 * existiendo en OpenRouter. La cadena se ha quedado medio muerta varias veces (ago, 21-sep y
 * 19-oct-2026) y siempre se descubrió por un fallo en producción.
 *
 *   npx tsx scripts/audit-ia.ts
 *
 * No necesita clave: lee el listado público /api/v1/models. Sale con código 1 si falta alguno.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const dir = resolve(dirname(fileURLToPath(import.meta.url)), "../api");
const FUNCIONES = ["chat.ts", "coach.ts", "sesion.ts"];

const usados = new Map<string, string[]>();
for (const f of FUNCIONES) {
  const src = readFileSync(resolve(dir, f), "utf8");
  for (const m of src.matchAll(/"([a-z0-9-]+\/[a-z0-9.\-]+:free)"/gi)) {
    usados.set(m[1], [...(usados.get(m[1]) ?? []), f].filter((v, i, a) => a.indexOf(v) === i));
  }
}

const r = await fetch("https://openrouter.ai/api/v1/models");
if (!r.ok) {
  console.error(`OpenRouter respondió ${r.status}: no se puede comprobar.`);
  process.exit(2);
}
const vivos = new Set(((await r.json()) as { data: { id: string }[] }).data.map((m) => m.id));
const libres = [...vivos].filter((id) => id.endsWith(":free"));

let muertos = 0;
console.log(`Modelos gratuitos en OpenRouter hoy: ${libres.length}\n`);
for (const [id, fs] of usados) {
  const ok = vivos.has(id);
  if (!ok) muertos++;
  console.log(`${ok ? "OK  " : "FALTA"} ${id}  (${fs.join(", ")})`);
}
const nuevos = libres.filter((id) => !usados.has(id));
if (nuevos.length) console.log(`\nGratuitos que no usamos: ${nuevos.join(", ")}`);
if (muertos) {
  console.log(`\n${muertos} modelo(s) de la cadena ya no existen gratis: quitarlos de las tres funciones.`);
  process.exit(1);
}
console.log("\nCadena entera viva (que exista no quiere decir que no dé 429: eso solo se ve en producción).");
