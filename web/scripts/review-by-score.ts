import { getAllZapatillas } from "../src/data/zapatillas";
import { scoreDisplay, compareByScore, mostramosPrecio } from "../src/lib/scoring";
import { writeFileSync } from "node:fs";

const z = getAllZapatillas().slice().sort(compareByScore);
const lines: string[] = [];
z.forEach((s, i) => {
  lines.push(`#${i + 1} [${scoreDisplay(s).toFixed(1)}] ${s.marca} ${s.modelo} (${s.slug})`);
  for (const l of s.links_compra) {
    const aff = l.tiene_afiliado ? "AFF" : "no ";
    const shown = mostramosPrecio(l) ? `${l.precio_actual}€` : "VERPRECIO";
    const disp = l.disponible === false ? " [no-disp]" : "";
    lines.push(`    ${aff} ${l.tienda.padEnd(20)} ${String(shown).padEnd(10)}${disp} ${l.url}`);
  }
  lines.push("");
});
writeFileSync("scripts/review-by-score.out.txt", lines.join("\n"));
console.log("total:", z.length, "-> scripts/review-by-score.out.txt");
