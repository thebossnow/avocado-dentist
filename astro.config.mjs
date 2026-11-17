// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://avocadodentist.com',
  // Astro 7 defaults to 'jsx' whitespace stripping; keep the v6 HTML-aware behavior.
  compressHTML: true,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});