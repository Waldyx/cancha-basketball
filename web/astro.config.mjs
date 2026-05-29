// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

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
        !page.includes('/og/'),
    }),
  ],
  redirects: {
    '/catalogo': '/zapatillas',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
