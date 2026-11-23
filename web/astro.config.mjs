import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://utxo.ag',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  redirects: { '/': '/de' },
  vite: { build: { assetsInlineLimit: 0 } },
});
