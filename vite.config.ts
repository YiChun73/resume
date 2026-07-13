import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  // vue-i18n feature flags: composition-only build, no dev warnings
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
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
