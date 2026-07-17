import { reactive, ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'

export interface ContactFormFields {
  name: string
  email: string
  subject: string
  message: string
}

export type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FIELDS = ['name', 'email', 'subject', 'message'] as const

/**
 * State, validation and Web3Forms submission for the contact form;
 * ContactSection.vue owns the markup.
 */
export function useContactForm(): {
  form: ContactFormFields
  errors: Partial<Record<keyof ContactFormFields, string>>
  status: Ref<SubmitStatus>
  botcheck: Ref<boolean>
  onSubmit: () => Promise<void>
} {
  const { t } = useI18n()

  const form = reactive<ContactFormFields>({ name: '', email: '', subject: '', message: '' })
  const errors = reactive<Partial<Record<keyof ContactFormFields, string>>>({})
  const status = ref<SubmitStatus>('idle')
  // Honeypot: humans never see this field, bots tend to fill every field.
  const botcheck = ref(false)

  function validate(): boolean {
    const found: Partial<Record<keyof ContactFormFields, string>> = {}
    if (!form.name.trim()) found.name = t('contact.errors.nameRequired')
    if (!form.subject.trim()) found.subject = t('contact.errors.subjectRequired')
    if (!form.message.trim()) found.message = t('contact.errors.messageRequired')
    if (!form.email.trim()) found.email = t('contact.errors.emailRequired')
    else if (!EMAIL_PATTERN.test(form.email)) found.email = t('contact.errors.emailInvalid')

    for (const field of FIELDS) {
      const message = found[field]
      if (message) errors[field] = message
      else delete errors[field]
    }
    return Object.keys(found).length === 0
  }

  async function onSubmit(): Promise<void> {
    if (status.value === 'sending') return
    status.value = 'idle'
    if (!validate()) return

    status.value = 'sending'
    try {
      if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === 'REPLACE_WITH_YOUR_ACCESS_KEY') {
        throw new Error('VITE_WEB3FORMS_ACCESS_KEY is not configured')
      }
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          botcheck: botcheck.value,
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      })
      const result = (await response.json()) as { success?: boolean }
      if (!response.ok || result.success !== true) {
        throw new Error(`Web3Forms rejected the submission (HTTP ${response.status})`)
      }
      status.value = 'success'
      form.name = ''
      form.email = ''
      form.subject = ''
      form.message = ''
    } catch (cause) {
      console.error('Contact form submission failed:', cause)
      status.value = 'error'
    }
  }

  return { form, errors, status, botcheck, onSubmit }
}
