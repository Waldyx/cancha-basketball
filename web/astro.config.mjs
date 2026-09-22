// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';
import { readFileSync } from 'node:fs';

// Zapas ocultas (sin opción de compra afiliada): su ficha se sigue sirviendo a 200
// con noindex para poder rescatarla, pero no se le pide a Google que la indexe.
// La lista la genera `prebuild` (scripts/gen-chat-catalog.ts) desde el catálogo;
// si no existe todavía, el sitemap sale completo en vez de romper el build.
/** @type {string[]} */
let ocultas = [];
try {
  ocultas = JSON.parse(readFileSync(new URL('./src/data/ocultas.json', import.meta.url), 'utf8'));
} catch {}
// ⚠ Comparacion EXACTA del slug, no `includes`: `jordan-xxxvii` es subcadena de
// `jordan-xxxviii` y `adidas-cross-em-up-5` de `...-5-gs`, asi que un `includes`
// se llevaba por delante dos fichas visibles (medido en el build del 22-sep).
/** @param {string} page */
const esOculta = (page) => {
  const m = page.match(/\/zapatilla\/([^/]+)\/?$/);
  return m !== null && ocultas.includes(m[1]);
};

// https://astro.build/config
export default defineConfig({
  site: 'https://canchazapa.com',
  integrations: [
    sitemap({
      // Excluir del sitemap las rutas bloqueadas en robots.txt para evitar
      // avisos de "indexada pero bloqueada por robots" en Search Console:
      // páginas dinámicas (vacías sin sessionStorage) y las imágenes OG.
      filter: (page) =>
        !page.includes('/resultados') &&
        !page.includes('/comparar') &&
        !page.includes('/og/') &&
        !esOculta(page),
    }),
  ],
  redirects: {
    '/catalogo': '/zapatillas',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
