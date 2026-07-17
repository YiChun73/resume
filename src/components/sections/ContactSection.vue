<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'

import mapBackground from '@/assets/images/map.svg'
import FormField from '@/components/ui/FormField.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { useContactForm } from '@/composables/useContactForm'
import { useInView } from '@/composables/useInView'
import { profile } from '@/data/profile'

const { t } = useI18n()

const { form, errors, status, botcheck, onSubmit } = useContactForm()

const info = useTemplateRef<HTMLDivElement>('info')
const infoVisible = useInView(info)
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
            <div v-if="status === 'success'" class="alert alert-success" role="status">
              {{ t('contact.success') }}
            </div>
            <div v-else-if="status === 'error'" class="alert alert-danger" role="alert">
              {{ t('contact.error') }}
            </div>

            <!-- Honeypot for Web3Forms spam filtering; hidden from humans. -->
            <input
              v-model="botcheck"
              type="checkbox"
              name="botcheck"
              tabindex="-1"
              autocomplete="off"
              aria-hidden="true"
              style="display: none"
            />

            <div class="row">
              <div class="col-md-6">
                <FormField
                  id="contact-name"
                  v-model="form.name"
                  name="name"
                  :label="t('contact.form.name')"
                  :error="errors.name"
                />
              </div>

              <div class="col-md-6">
                <FormField
                  id="contact-email"
                  v-model="form.email"
                  name="email"
                  type="email"
                  :label="t('contact.form.email')"
                  :error="errors.email"
                />
              </div>

              <div class="col-md-12">
                <FormField
                  id="contact-subject"
                  v-model="form.subject"
                  name="subject"
                  :label="t('contact.form.subject')"
                  :error="errors.subject"
                />
              </div>

              <div class="col-md-12">
                <FormField
                  id="contact-message"
                  v-model="form.message"
                  name="message"
                  multiline
                  :label="t('contact.form.message')"
                  :error="errors.message"
                />
              </div>
            </div>

            <button type="submit" class="btn btn-default" :disabled="status === 'sending'">
              {{ status === 'sending' ? t('contact.sending') : t('contact.send') }}
            </button>
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
</style>
