import { createI18n } from 'vue-i18n'

import enUS, { type MessageSchema } from './locales/en-US'
import zhTW from './locales/zh-TW'

export const SUPPORT_LOCALES = ['zh-TW', 'en-US'] as const
export type SupportLocale = (typeof SUPPORT_LOCALES)[number]

const messages: Record<SupportLocale, MessageSchema> = {
  'zh-TW': zhTW,
  'en-US': enUS,
}

/**
 * Picks the locale from the browser's language preferences: any Chinese
 * variant maps to Traditional Chinese, everything else falls back to English.
 */
function detectLocale(): SupportLocale {
  const candidates = navigator.languages.length ? navigator.languages : [navigator.language]
  for (const candidate of candidates) {
    const language = candidate.toLowerCase()
    if (language.startsWith('zh')) return 'zh-TW'
    if (language.startsWith('en')) return 'en-US'
  }
  return 'en-US'
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
