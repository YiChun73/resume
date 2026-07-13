<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import SectionTitle from '@/components/ui/SectionTitle.vue'
import ServiceCard from '@/components/ui/ServiceCard.vue'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import { services } from '@/data/services'

const { t } = useI18n()
const { scrollToSection } = useSmoothScroll()
</script>

<template>
  <section id="services">
    <div class="container">
      <SectionTitle :title="t('services.title')" />

      <div class="row">
        <div v-for="service in services" :key="service.id" class="col-md-4 service-col">
          <ServiceCard :service="service" />
        </div>
      </div>

      <div class="custom-job text-center">
        <i18n-t keypath="services.note" tag="p" scope="global">
          <template #link>
            <a href="#contact" @click.prevent="scrollToSection('contact')">
              {{ t('services.noteLink') }}
            </a>
          </template>
        </i18n-t>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@include media-down(md) {
  .service-col:not(:last-child) {
    margin-bottom: 30px;
  }
}

.custom-job {
  margin-top: 3rem;

  p {
    margin: 0;
  }
}
</style>
