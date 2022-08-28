import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import analyze from "rollup-plugin-analyzer";

export default defineConfig({
  build: {
    minify: false,
    rollupOptions: {
      plugins: [analyze({summaryOnly: true})],
    },
  },
  plugins: [react()],
});
