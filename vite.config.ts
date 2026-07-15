import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

import enNotFound from './src/i18n/locales/en-US/notFound'
import zhNotFound from './src/i18n/locales/zh-TW/notFound'
import { pickLocale } from './src/i18n/pick-locale'

// Serialized pickLocale() shared by index.html and 404.html, so locale
// detection has one source. Sets <html lang> while the document is still
// being parsed — static hosting can't negotiate Accept-Language, and waiting
// for the SPA to boot would announce the first paint as English to zh users.
const prePaintLocaleScript = `(function () {
  var candidates = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language]
  var locale = (${pickLocale.toString()})(candidates)
  if (locale) document.documentElement.lang = locale
})()`

function prePaintLocale(): Plugin {
  return {
    name: 'pre-paint-locale',
    transformIndexHtml() {
      return [{ tag: 'script', children: prePaintLocaleScript, injectTo: 'head' }]
    },
  }
}

/**
 * Emits a static 404.html so GitHub Pages answers unknown URLs with the
 * site's own error page instead of the GitHub default. Deliberately NOT the
 * SPA-redirect hack: a single-route site has no deep links to restore, and
 * redirecting typos to the homepage would be a soft 404. Copy comes from the
 * same locale files as the in-app NotFoundView.
 */
function notFoundPage(): Plugin {
  let base = '/'
  return {
    name: 'not-found-page',
    apply: 'build',
    configResolved(config) {
      base = config.base
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: '404.html', source: notFoundHtml(base) })
    },
  }
}

function notFoundHtml(base: string): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <title>404 — ${zhNotFound.title} · ${enNotFound.title}</title>
  <script>${prePaintLocaleScript}</script>
  <style>
    /* colors mirror the design tokens in src/styles/base/_root.scss */
    body {
      margin: 0;
      min-height: 100vh;
      min-height: 100dvh; /* tracks the collapsing mobile URL bar */
      display: flex;
      text-align: center;
      background: #353353;
      font-family: -apple-system, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    }
    /* auto margins center without clipping the top on very short viewports */
    main { margin: auto; padding: 24px; }
    .code { color: #ff4c60; font-size: 96px; font-weight: 700; line-height: 1; margin: 0; }
    h1 { color: #fff; font-size: 24px; margin: 1rem 0 0.5rem; }
    p { color: #8b88b1; margin: 0.25rem 0; }
    a {
      display: inline-block;
      margin-top: 2rem;
      padding: 12px 32px;
      border-radius: 30px;
      background: #ff4c60;
      color: #fff;
      text-decoration: none;
      font-size: 16px;
      transition: transform 0.3s ease-in-out;
    }
    a:hover { transform: translateY(-3px); }
    a:focus-visible { outline: 2px solid #6c6ce5; outline-offset: 2px; }
  </style>
</head>
<body>
  <main>
    <p class="code" aria-hidden="true">404</p>
    <h1 lang="zh-TW">${zhNotFound.title}</h1>
    <p lang="zh-TW">${zhNotFound.message}</p>
    <p lang="en-US">${enNotFound.title} — ${enNotFound.message}</p>
    <a href="${base}"><span lang="zh-TW">${zhNotFound.backHome}</span> · <span lang="en-US">${enNotFound.backHome}</span></a>
  </main>
</body>
</html>
`
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
  plugins: [vue(), prePaintLocale(), notFoundPage()],
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
