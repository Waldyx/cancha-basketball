/**
 * Auditoría de SALUD de los enlaces de compra.
 *
 * Nace de la sesión 35, donde tres bugs distintos salieron tirando del hilo a
 * mano: wrappers de Awin anidados, la misma opción de compra repetida 3 veces
 * en una ficha, y 14 enlaces envueltos en una campaña de afiliado que no cubre
 * esa tienda. Los tres eran detectables sin pedir una sola página.
 *
 * Uso:  npx tsx scripts/audit-enlaces.ts
 *
 * NO hace peticiones de red: se ejecuta sobre el catálogo ya mergeado, así que
 * es instantáneo y no genera clicks de afiliado falsos. Para comprobar si una
 * URL vive hay que pedir SIEMPRE el destino desenvuelto, nunca el wrapper.
 */
import { zapatillas } from "../src/data/zapatillas";
import { unwrapWrapperUrl } from "../src/lib/mergePrices";

interface Hallazgo {
  zapa: string;
  tienda: string;
  detalle: string;
}

const nested: Hallazgo[] = [];
const duplicados: Hallazgo[] = [];
const rutasMuertas: Hallazgo[] = [];
const sinDestino: Hallazgo[] = [];
const sinOpcion: string[] = [];

/**
 * Rutas que una tienda ya NO sirve. Cada una costó una sesión descubrirla, así
 * que se quedan escritas: si alguien vuelve a meter un enlace con este patrón,
 * salta aquí en vez de dentro de tres meses.
 */
const RUTAS_MUERTAS: Array<[RegExp, string]> = [
  [/snipes\.com\/[^/]+\/c\/zapatillas\?q=/i, "Snipes retiró /c/zapatillas?q= (da 404)"],
  [/elcorteingles\.es\/deportes\/buscar\/\?term=/i, "ECI ya no sirve /deportes/buscar/?term="],
];

/**
 * Tiendas SIN programa de afiliados: si aparecen envueltas en un wrapper, ese
 * wrapper no paga y probablemente rompe el click.
 */
const SIN_PROGRAMA: Array<[string, RegExp]> = [
  ["basketballemotion_es", /tc\.tradetracker\.net/i],
];

for (const z of zapatillas as any[]) {
  const vistos = new Set<string>();
  let disponibles = 0;

  for (const l of z.links_compra ?? []) {
    const url: string = l.url ?? "";
    if (l.disponible) disponibles++;

    // 1. wrapper dentro de wrapper
    if (/awin1\.com|tradetracker\.net/i.test(url)) {
      const dec = decodeURIComponent(url);
      if (/(ued|[?&]u)=[^&]*(awin1\.com|tradetracker\.net)/i.test(dec)) {
        nested.push({ zapa: z.id, tienda: l.tienda, detalle: `${url.length} chars` });
      }
    }

    // 2. la misma opción de compra repetida en la ficha
    const clave = `${l.tienda}|${url}`;
    if (vistos.has(clave)) {
      duplicados.push({ zapa: z.id, tienda: l.tienda, detalle: "misma tienda y misma URL" });
    }
    vistos.add(clave);

    // 3. rutas que la tienda ya no sirve
    const destino = unwrapWrapperUrl(url);
    for (const [patron, motivo] of RUTAS_MUERTAS) {
      if (patron.test(destino)) {
        rutasMuertas.push({ zapa: z.id, tienda: l.tienda, detalle: motivo });
      }
    }

    // 4. wrapper de una red que no cubre esa tienda
    for (const [tienda, patron] of SIN_PROGRAMA) {
      if (l.tienda === tienda && patron.test(url)) {
        sinDestino.push({ zapa: z.id, tienda: l.tienda, detalle: "envuelto sin programa que lo pague" });
      }
    }
  }

  if ((z.links_compra?.length ?? 0) > 0 && disponibles === 0) sinOpcion.push(z.id);
}

function bloque(titulo: string, hallazgos: Hallazgo[], grave = true) {
  const marca = hallazgos.length === 0 ? "OK " : grave ? "!! " : " · ";
  console.log(`\n${marca}${titulo}: ${hallazgos.length}`);
  for (const h of hallazgos.slice(0, 25)) {
    console.log(`     ${h.zapa} · ${h.tienda} — ${h.detalle}`);
  }
  if (hallazgos.length > 25) console.log(`     … y ${hallazgos.length - 25} más`);
}

const totalEnlaces = (zapatillas as any[]).reduce(
  (n, z) => n + (z.links_compra?.length ?? 0),
  0
);

console.log(`Auditoría de enlaces — ${zapatillas.length} zapas · ${totalEnlaces} enlaces`);
console.log("─".repeat(60));

bloque("Wrappers ANIDADOS (wrapper dentro de wrapper)", nested);
bloque("Filas DUPLICADAS (misma opción repetida en la ficha)", duplicados);
bloque("Rutas que la tienda ya NO sirve", rutasMuertas);
bloque("Envuelto en una red que no cubre esa tienda", sinDestino);

console.log(`\n · Zapas con enlaces pero NINGUNO disponible: ${sinOpcion.length}`);
for (const id of sinOpcion.slice(0, 25)) console.log(`     ${id}`);
if (sinOpcion.length > 25) console.log(`     … y ${sinOpcion.length - 25} más`);

const problemas = nested.length + duplicados.length + rutasMuertas.length + sinDestino.length;
console.log("\n" + "─".repeat(60));
console.log(problemas === 0 ? "Sin hallazgos." : `${problemas} enlaces con problema.`);
