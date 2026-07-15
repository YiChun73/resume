export const SUPPORT_LOCALES = ['zh-TW', 'en-US'] as const
export type SupportLocale = (typeof SUPPORT_LOCALES)[number]

/**
 * Picks the supported locale from browser language preferences: the first
 * Chinese variant wins as Traditional Chinese, the first English variant as
 * English; null means no preference matched.
 *
 * Single source for locale detection. Besides the runtime i18n setup, the
 * pre-paint inline script in vite.config.ts serializes this function with
 * Function.prototype.toString(), so it must stay self-contained: no captured
 * imports or constants (SUPPORT_LOCALES included) and no DOM access.
 */
export function pickLocale(candidates: readonly string[]): SupportLocale | null {
  for (const candidate of candidates) {
    const language = String(candidate).toLowerCase()
    if (language.startsWith('zh')) return 'zh-TW'
    if (language.startsWith('en')) return 'en-US'
  }
  return null
}
