// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://luistorresphd.com',
  integrations: [sitemap()],
  prefetch: { defaultStrategy: 'hover' },
  // The CSS is small; inlining it removes a render-blocking request.
  build: { inlineStylesheets: 'always' },
  // Old routes from the React site.
  redirects: {
    '/activity': '/work/',
    '/projects': '/work/',
    '/education': '/resume/',
  },
});
