import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Design tokens and media-query mixins are available in every
        // component <style> without an explicit @use.
        additionalData: '@use "@/styles/variables" as *;\n@use "@/styles/mixins" as *;\n',
      },
    },
  },
})
