/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Web3Forms access key for the contact form (https://web3forms.com).
   * Public by design — it only identifies the receiving inbox.
   */
  readonly VITE_WEB3FORMS_ACCESS_KEY: string
}
