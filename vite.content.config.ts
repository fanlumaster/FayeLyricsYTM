import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        content: path.resolve(__dirname, "src/content/content.ts")
      },
      output: {
        entryFileNames: "[name].js",
        inlineDynamicImports: true // 单入口可以安全使用
      }
    }
  }
})