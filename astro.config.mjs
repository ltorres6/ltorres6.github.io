// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://luistorresphd.com',
  integrations: [sitemap()],
  prefetch: { defaultStrategy: 'hover' },
  // Old routes from the React site.
  redirects: {
    '/activity': '/work/',
    '/projects': '/work/',
    '/education': '/resume/',
  },
});
