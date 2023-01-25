import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  site: 'https://sethcalebweeks.github.io',
  base: '/astro-blog',
  integrations: [tailwind({
    config: { applyBaseStyles: false },
  })],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});