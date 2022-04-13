import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from 'rollup-plugin-chrome-extension';
import manifest from './src/manifest.json';

export default defineConfig({
  build: {
    rollupOptions: {
      // add any html pages here
      input: {
        // output file at '/index.html'
        popup: resolve(__dirname, 'src/pages/popup/index.html'),
      },
    },
  },
  plugins: [react(), crx({ manifest })],
});
