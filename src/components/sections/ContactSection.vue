<script setup lang="ts">
import { reactive, ref, useTemplateRef } from 'vue'

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

const form = reactive<ContactForm>({ name: '', email: '', subject: '', message: '' })
const errors = reactive<Partial<Record<keyof ContactForm, string>>>({})
const sent = ref(false)

const info = useTemplateRef<HTMLDivElement>('info')
const infoVisible = useInView(info)

function validate(): boolean {
  errors.name = form.name.trim() ? undefined : 'Name is required.'
  errors.subject = form.subject.trim() ? undefined : 'Subject is required.'
  errors.message = form.message.trim() ? undefined : 'Message is required.'
  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Email is invalid.'
  } else {
    errors.email = undefined
  }
  return !errors.name && !errors.email && !errors.subject && !errors.message
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
      <SectionTitle title="Get In Touch" />

      <div class="row">
        <div class="col-md-4">
          <div
            ref="info"
            class="contact-info"
            :style="{ backgroundImage: `url(${mapBackground})` }"
          >
            <h3 class="reveal" :class="{ 'is-visible': infoVisible }">
              Let's talk about everything!
            </h3>
            <p class="reveal" :class="{ 'is-visible': infoVisible }" style="animation-delay: 0.2s">
              Don't like forms? Send me an
              <a :href="`mailto:${profile.email}`">email</a>. 👋
            </p>
          </div>
        </div>

        <div class="col-md-8">
          <form class="contact-form" novalidate @submit.prevent="onSubmit">
            <div v-if="sent" class="alert alert-success" role="status">
              Your message has been sent successfully.
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="visually-hidden" for="contact-name">Your name</label>
                  <input
                    id="contact-name"
                    v-model="form.name"
                    type="text"
                    name="name"
                    class="form-control"
                    placeholder="Your name"
                    required
                    :aria-invalid="Boolean(errors.name)"
                    aria-describedby="contact-name-error"
                  />
                  <div id="contact-name-error" class="help-block">{{ errors.name }}</div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label class="visually-hidden" for="contact-email">Email address</label>
                  <input
                    id="contact-email"
                    v-model="form.email"
                    type="email"
                    name="email"
                    class="form-control"
                    placeholder="Email address"
                    required
                    :aria-invalid="Boolean(errors.email)"
                    aria-describedby="contact-email-error"
                  />
                  <div id="contact-email-error" class="help-block">{{ errors.email }}</div>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-group">
                  <label class="visually-hidden" for="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    v-model="form.subject"
                    type="text"
                    name="subject"
                    class="form-control"
                    placeholder="Subject"
                    required
                    :aria-invalid="Boolean(errors.subject)"
                    aria-describedby="contact-subject-error"
                  />
                  <div id="contact-subject-error" class="help-block">{{ errors.subject }}</div>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-group">
                  <label class="visually-hidden" for="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    v-model="form.message"
                    name="message"
                    class="form-control"
                    rows="5"
                    placeholder="Message"
                    required
                    :aria-invalid="Boolean(errors.message)"
                    aria-describedby="contact-message-error"
                  />
                  <div id="contact-message-error" class="help-block">{{ errors.message }}</div>
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn-default">Send Message</button>
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
