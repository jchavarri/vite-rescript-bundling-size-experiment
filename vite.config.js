import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import analyze from "rollup-plugin-analyzer";

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
  plugins: [react()],
});
