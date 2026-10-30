import { useI18n as useVueI18n } from 'vue-i18n'

import type { MessageSchema } from './locales/en-US'

// Dotted paths to every string leaf of the schema; arrays are no t() key.
type LeafPaths<T, Prefix extends string = ''> = {
  [K in keyof T & string]: T[K] extends string
    ? `${Prefix}${K}`
    : T[K] extends readonly unknown[]
      ? never
      : LeafPaths<T[K], `${Prefix}${K}.`>
}[keyof T & string]

export type MessageKey = LeafPaths<MessageSchema>

/** Narrows vue-i18n's t(), which accepts any string, to the en-US schema's keys. */
export function typedT(t: (key: string) => string): (key: MessageKey) => string {
  return (key) => t(key)
}

/** Checks a key handed over as data, e.g. to `<i18n-t :keypath>`. */
export function messageKey(key: MessageKey): MessageKey {
  return key
}

/** vue-i18n's useI18n() with schema-checked keys; import this one, not vue-i18n's. */
export function useI18n(): { t: (key: MessageKey) => string } {
  const { t } = useVueI18n()
  return { t: typedT(t) }
}
