/**
 * Auditoría de FRESCURA de precios por tienda.
 *
 *   npx tsx scripts/audit-frescura.ts
 *   npx tsx scripts/audit-frescura.ts --todas   # incluye tiendas sin afiliado
 *
 * Es la medición que manda la prioridad del trabajo de scraping: un enlace que
 * monetiza pero lleva 60 días sin verificar muestra un precio que probablemente
 * ya no existe. Por defecto solo cuenta los enlaces CON afiliado, que son los
 * únicos que dan dinero.
 *
 * "Fresco" = verificado hace 3 días o menos. Ojo al leerlo: un scraper recién
 * añadido sale a 0% hasta que corre la pasada nocturna siguiente.
 */
const { zapatillas } = await import("../src/data/zapatillas.js");

const soloAfiliados = !process.argv.includes("--todas");
const HOY = Date.now();

function diasDesde(fecha?: string): number {
  if (!fecha) return Number.POSITIVE_INFINITY;
  const t = new Date(fecha).getTime();
  return Number.isNaN(t) ? Number.POSITIVE_INFINITY : Math.round((HOY - t) / 86_400_000);
}

const porTienda = new Map<string, number[]>();
for (const z of zapatillas) {
  for (const l of z.links_compra) {
    if (soloAfiliados && !l.tiene_afiliado) continue;
    const lista = porTienda.get(l.tienda) ?? [];
    lista.push(diasDesde(l.ultima_verificacion));
    porTienda.set(l.tienda, lista);
  }
}

const filas = [...porTienda.entries()]
  .map(([tienda, dias]) => {
    const orden = [...dias].sort((a, b) => a - b);
    const mediana = orden[Math.floor(orden.length / 2)];
    return {
      tienda,
      enlaces: dias.length,
      frescos: dias.filter((d) => d <= 3).length,
      mediana: Number.isFinite(mediana) ? `${mediana}d` : "s/f",
    };
  })
  .sort((a, b) => b.enlaces - a.enlaces);

console.log(`Frescura de precios — ${soloAfiliados ? "solo enlaces con afiliado" : "todos los enlaces"}`);
console.log(
  "tienda".padEnd(20) + "enlaces".padStart(8) + "frescos ≤3d".padStart(14) + "mediana".padStart(9)
);
console.log("─".repeat(51));
for (const f of filas) {
  const pct = Math.round((f.frescos / f.enlaces) * 100);
  console.log(
    f.tienda.padEnd(20) +
      String(f.enlaces).padStart(8) +
      `${f.frescos} (${pct}%)`.padStart(14) +
      f.mediana.padStart(9)
  );
}

const total = filas.reduce((a, f) => a + f.enlaces, 0);
const frescos = filas.reduce((a, f) => a + f.frescos, 0);
console.log("─".repeat(51));
console.log(`TOTAL ${total} enlaces · ${frescos} frescos (${Math.round((frescos / total) * 100)}%)`);
