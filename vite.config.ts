import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

import { pickLocale } from './src/i18n/pick-locale'

/**
 * Injects a pre-paint <script> that sets <html lang> while the document is
 * still being parsed — static hosting can't negotiate Accept-Language, and
 * waiting for the SPA to boot would announce the first paint as English to
 * zh users. The script serializes pickLocale() so detection has one source.
 */
function prePaintLocale(): Plugin {
  const script = `(function () {
  var candidates = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language]
  var locale = (${pickLocale.toString()})(candidates)
  if (locale) document.documentElement.lang = locale
})()`
  return {
    name: 'pre-paint-locale',
    transformIndexHtml() {
      return [{ tag: 'script', children: script, injectTo: 'head' }]
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  // vue-i18n feature flags: composition-only build, no dev warnings
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
  plugins: [vue(), prePaintLocale()],
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
