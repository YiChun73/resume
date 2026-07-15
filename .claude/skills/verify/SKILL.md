---
name: verify
description: Build, launch, and drive this Vue 3 + Vite resume site to verify changes at the browser surface.
---

# Verifying this repo

## Build & serve

```bash
npm run build                 # vue-tsc -b && vite build → dist/
npm run preview -- --port 4173 --strictPort   # serves dist/
```

Env vars from the shell override `.env` at build time — e.g. build with a
test Web3Forms key: `VITE_WEB3FORMS_ACCESS_KEY=e2e-test-key npm run build`.

## Drive (Playwright)

No Playwright in project deps; a working install lives in the npx cache
(`~/.npm/_npx/*/node_modules/playwright`, chromium in
`~/Library/Caches/ms-playwright`). Symlink that `node_modules` into the
scratchpad and run a plain `.mjs` script with `node` (ESM ignores
`NODE_PATH`; resolution walks up from the script's directory).

## Flows worth driving

- Contact form (`#contact`): submits to Web3Forms
  (`api.web3forms.com/submit`). Mock it with `page.route()` — 200
  `{success:true}` for the success path, 400/abort for error paths.
  With the placeholder key in `.env`, code short-circuits to the error
  alert without any network call (by design).
- Locale: strings come from `src/i18n/locales/{zh-TW,en-US}`; default
  locale depends on browser language, Playwright defaults to en-US.

## Gotchas

- Web3Forms (Cloudflare) rejects curl AND Playwright's chromium
  headless shell — even the CORS preflight 403s ("use our API in
  client side"). For a real (unmocked) submission, launch the
  installed Chrome with a normal UA:
  `chromium.launch({ channel: 'chrome', headless: true })` +
  `newPage({ userAgent: '<UA without "Headless">' })`. A real
  submission emails the real inbox — label it as a test.

- `--experimental-default-type=module` is not supported on Node 24;
  just name scripts `.mjs`.
- The scrollspy/section layout means elements need
  `scrollIntoViewIfNeeded()` before interaction.
