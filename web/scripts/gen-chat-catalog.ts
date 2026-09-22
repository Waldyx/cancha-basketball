/**
 * gen-chat-catalog.ts — genera api/_catalog.json para la función serverless del chat.
 *
 * Por qué existe: en Vercel, con "type":"module", la función /api/chat.ts se ejecuta
 * en ESM puro SIN bundling. Importar la cadena de TS del catálogo
 * (../src/data/zapatillas → scoring → types → precios.json) revienta con
 * ERR_MODULE_NOT_FOUND (imports sin extensión no resuelven en Node ESM).
 *
 * Solución: precompilamos aquí (con tsx, que sí resuelve la cadena) el MISMO string
 * compacto de catálogo que usaba el system prompt y lo volcamos a un único JSON.
 * La función solo importa ese JSON (con extensión → seguro en ESM) y queda
 * autocontenida: el chat nunca arriesga el build del catálogo.
 *
 * Se ejecuta en `prebuild` (npm lo corre antes de `astro build`), así los precios
 * van siempre frescos. El JSON también se commitea como fallback.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { zapatillas, zapatillasTodas } from "../src/data/zapatillas";
import { findMejorPrecio } from "../src/lib/scoring";

const catalogo = zapatillas
  .map((z) => {
    const s = z.puntuaciones;
    const precio = findMejorPrecio(z.links_compra)?.precio_actual ?? z.precio_msrp_eur;
    return (
      `${z.slug} | ${z.marca} ${z.modelo} | ${z.categoria_principal} | ${Math.round(precio)}€ | ` +
      `tracc ${s.traccion} cushion ${s.amortiguacion} resp ${s.respuesta} ` +
      `soporte ${s.soporte_lateral} estab ${s.estabilidad} ligereza ${s.peso_score} ` +
      `outdoor ${s.durabilidad_outdoor} vent ${s.ventilacion} | ${z.altura} | horma ${z.horma}` +
      (z.tags.includes("retro") ? " | RETRO" : "") +
      (z.genero === "gs" ? " | JUNIOR-GS" : "") +
      (z.genero === "women" ? " | MUJER-100%" : z.tags.includes("mujer") ? " | MUJER-tambien" : "")
    );
  })
  .join("\n");

const __dirname = dirname(fileURLToPath(import.meta.url));

// Slugs de las zapas ocultas, para que el sitemap no las liste. Se genera aquí y no
// en astro.config.mjs porque la config no puede importar la cadena TS del catálogo.
// Las fichas ocultas se siguen construyendo (200 + noindex): lo que se evita es
// pedirle a Google que las indexe mientras no haya forma afiliada de comprarlas.
const ocultas = zapatillasTodas.filter((z) => z.oculto).map((z) => z.slug);
const outOcultas = resolve(__dirname, "../src/data/ocultas.json");
writeFileSync(outOcultas, JSON.stringify(ocultas, null, 0));
console.log(`[gen-chat-catalog] ${ocultas.length} zapas ocultas → ${outOcultas}`);

const out = resolve(__dirname, "../api/_catalog.json");
// Sin timestamp: evita que el JSON quede "sucio" en git tras cada build.
writeFileSync(out, JSON.stringify({ catalogo, zapas: zapatillas.length }, null, 0));
console.log(`[gen-chat-catalog] ${zapatillas.length} zapas → ${out}`);
