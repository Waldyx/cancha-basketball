// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Cambiar cuando tengamos dominio real (Fase 11)
  site: 'https://cancha.example',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
