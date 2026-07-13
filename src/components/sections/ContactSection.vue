<script setup lang="ts">
import { reactive, ref, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'

import mapBackground from '@/assets/images/map.svg'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { useInView } from '@/composables/useInView'
import { profile } from '@/data/profile'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

const { t } = useI18n()

const form = reactive<ContactForm>({ name: '', email: '', subject: '', message: '' })
const errors = reactive<Partial<Record<keyof ContactForm, string>>>({})
const sent = ref(false)

const info = useTemplateRef<HTMLDivElement>('info')
const infoVisible = useInView(info)

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(): boolean {
  const found: Partial<Record<keyof ContactForm, string>> = {}
  if (!form.name.trim()) found.name = t('contact.errors.nameRequired')
  if (!form.subject.trim()) found.subject = t('contact.errors.subjectRequired')
  if (!form.message.trim()) found.message = t('contact.errors.messageRequired')
  if (!form.email.trim()) found.email = t('contact.errors.emailRequired')
  else if (!EMAIL_PATTERN.test(form.email)) found.email = t('contact.errors.emailInvalid')

  for (const field of ['name', 'email', 'subject', 'message'] as const) {
    const message = found[field]
    if (message) errors[field] = message
    else delete errors[field]
  }
  return Object.keys(found).length === 0
}

function onSubmit(): void {
  sent.value = false
  if (!validate()) return
  // static site: no backend — mimic the original success feedback
  sent.value = true
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
}
</script>

<template>
  <section id="contact">
    <div class="container">
      <SectionTitle :title="t('contact.title')" />

      <div class="row">
        <div class="col-md-4">
          <div
            ref="info"
            class="contact-info"
            :style="{ backgroundImage: `url(${mapBackground})` }"
          >
            <h3 class="reveal" :class="{ 'is-visible': infoVisible }">
              {{ t('contact.heading') }}
            </h3>
            <i18n-t
              keypath="contact.intro"
              tag="p"
              scope="global"
              class="reveal"
              :class="{ 'is-visible': infoVisible }"
              style="animation-delay: 0.2s"
            >
              <template #email>
                <a :href="`mailto:${profile.email}`">{{ t('contact.introEmail') }}</a>
              </template>
            </i18n-t>
          </div>
        </div>

        <div class="col-md-8">
          <form class="contact-form" novalidate @submit.prevent="onSubmit">
            <div v-if="sent" class="alert alert-success" role="status">
              {{ t('contact.success') }}
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="visually-hidden" for="contact-name">
                    {{ t('contact.form.name') }}
                  </label>
                  <input
                    id="contact-name"
                    v-model="form.name"
                    type="text"
                    name="name"
                    class="form-control"
                    :placeholder="t('contact.form.name')"
                    required
                    :aria-invalid="Boolean(errors.name)"
                    aria-describedby="contact-name-error"
                  />
                  <div id="contact-name-error" class="help-block">{{ errors.name }}</div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label class="visually-hidden" for="contact-email">
                    {{ t('contact.form.email') }}
                  </label>
                  <input
                    id="contact-email"
                    v-model="form.email"
                    type="email"
                    name="email"
                    class="form-control"
                    :placeholder="t('contact.form.email')"
                    required
                    :aria-invalid="Boolean(errors.email)"
                    aria-describedby="contact-email-error"
                  />
                  <div id="contact-email-error" class="help-block">{{ errors.email }}</div>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-group">
                  <label class="visually-hidden" for="contact-subject">
                    {{ t('contact.form.subject') }}
                  </label>
                  <input
                    id="contact-subject"
                    v-model="form.subject"
                    type="text"
                    name="subject"
                    class="form-control"
                    :placeholder="t('contact.form.subject')"
                    required
                    :aria-invalid="Boolean(errors.subject)"
                    aria-describedby="contact-subject-error"
                  />
                  <div id="contact-subject-error" class="help-block">{{ errors.subject }}</div>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-group">
                  <label class="visually-hidden" for="contact-message">
                    {{ t('contact.form.message') }}
                  </label>
                  <textarea
                    id="contact-message"
                    v-model="form.message"
                    name="message"
                    class="form-control"
                    rows="5"
                    :placeholder="t('contact.form.message')"
                    required
                    :aria-invalid="Boolean(errors.message)"
                    aria-describedby="contact-message-error"
                  />
                  <div id="contact-message-error" class="help-block">{{ errors.message }}</div>
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn-default">{{ t('contact.send') }}</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contact-info {
  background-repeat: no-repeat;
  background-size: contain;
  min-height: 200px;

  h3 {
    font-size: 23px;
    margin: 0 0 10px;
  }

  @include media-down(md) {
    margin-bottom: 30px;
  }
}

.help-block {
  min-height: 20px;
}
</style>
