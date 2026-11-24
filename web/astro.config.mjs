import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://utxo.ag',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  // only for dev and preview; in production the Caddyfile redirects / by language before any file is served
  redirects: { '/': '/de' },
  vite: { build: { assetsInlineLimit: 0 } },
});
