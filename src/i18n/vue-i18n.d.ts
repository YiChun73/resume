import type { MessageSchema } from './locales/en-US'

// Types every t()/tm() key against the en-US message schema.
declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends MessageSchema {}
}
