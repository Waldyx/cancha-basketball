/**
 * Fichas visibles con pocas tallas en sus tiendas afiliadas (8-nov-2026).
 *
 *   npx tsx scripts/audit-tallas.ts            # umbral 4 tallas (regla de los barridos)
 *   npx tsx scripts/audit-tallas.ts 6
 *
 * Lee las `tallas` que el scraper guarda en precios.json (FuikaOmar, Atmósfera, ECI y Forum).
 * Una tienda sin tallas leídas no cuenta como «pocas»: solo se lista lo que se ha medido.
 * No pide ni una página.
 */
import { readFileSync } from "node:fs";
import { zapatillas } from "../src/data/zapatillas.ts";

const umbral = Number(process.argv[2] ?? 4);
const precios = JSON.parse(readFileSync(new URL("../src/data/precios.json", import.meta.url), "utf8"));

let medidas = 0;
const pocas: string[] = [];
for (const z of zapatillas) {
  const scr: any[] = precios.shoes?.[z.id]?.links_compra ?? [];
  const afiliadas = z.links_compra.filter((l) => l.disponible && l.tiene_afiliado !== false);
  if (afiliadas.length === 0) continue;
  const conTallas = scr.filter((l) => l.disponible && Array.isArray(l.tallas));
  if (conTallas.length === 0) continue;
  medidas++;
  // Si la ficha tiene otra afiliada sin tallas medidas (Amazon, AliExpress…), no se sabe el total.
  const tiendasMedidas = new Set(conTallas.map((l) => l.tienda));
  const sinMedir = afiliadas.filter((l) => !tiendasMedidas.has(l.tienda)).map((l) => l.tienda);
  const todas = new Set(conTallas.flatMap((l) => l.tallas as string[]));
  if (todas.size >= umbral) continue;
  const detalle = conTallas.map((l) => `${l.tienda} ${l.precio_actual}€ [${(l.tallas as string[]).join(" · ")}]`).join(" | ");
  pocas.push(`${z.id}: ${todas.size} tallas · ${detalle}${sinMedir.length ? ` · sin medir: ${[...new Set(sinMedir)].join(", ")}` : ""}`);
}
console.log(`Fichas visibles con tallas medidas: ${medidas}. Con menos de ${umbral}: ${pocas.length}`);
for (const p of pocas) console.log("- " + p);
