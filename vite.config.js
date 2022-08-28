import { defineConfig } from "vite";
import analyze from "rollup-plugin-analyzer";
import rescript from '@jihchi/vite-plugin-rescript';

export default defineConfig({
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat'
    }
  },
  build: {
    minify: false,
    rollupOptions: {
      plugins: [analyze({summaryOnly: true})],
    },
  },
  plugins: [rescript()],
});
