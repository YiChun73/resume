import { createI18n } from 'vue-i18n'

import enUS, { type MessageSchema } from './locales/en-US'
import zhTW from './locales/zh-TW'
import { pickLocale, type SupportLocale } from './pick-locale'

export { SUPPORT_LOCALES, type SupportLocale } from './pick-locale'

const messages: Record<SupportLocale, MessageSchema> = {
  'zh-TW': zhTW,
  'en-US': enUS,
}

function detectLocale(): SupportLocale {
  const candidates = navigator.languages.length ? navigator.languages : [navigator.language]
  return pickLocale(candidates) ?? 'en-US'
}

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'en-US',
  messages,
})

/** Syncs <html lang>, document.title and the meta description with the locale. */
export function applyDocumentMeta(): void {
  const { t, locale } = i18n.global
  document.documentElement.lang = locale.value
  document.title = t('meta.title')
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'))
}
