import type { MessageSchema } from './locales/en-US'

// Types the messages after the en-US schema; use-i18n.ts makes t() check its keys.
declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends MessageSchema {}
}
