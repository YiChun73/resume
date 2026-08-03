<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import ExpertiseCard from '@/components/ui/ExpertiseCard.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import { expertiseAreas } from '@/data/expertise'

const { t } = useI18n()
const { scrollToSection } = useSmoothScroll()
</script>

<template>
  <section id="expertise">
    <div class="container">
      <SectionTitle :title="t('expertise.title')" />

      <div class="row">
        <div v-for="area in expertiseAreas" :key="area.id" class="col-md-4 area-col">
          <ExpertiseCard :area="area" />
        </div>
      </div>

      <div class="contact-note text-center">
        <i18n-t keypath="expertise.note" tag="p" scope="global">
          <template #link>
            <a href="#contact" @click.prevent="scrollToSection('contact')">
              {{ t('expertise.noteLink') }}
            </a>
          </template>
        </i18n-t>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@include media-down(md) {
  .area-col:not(:last-child) {
    margin-bottom: 30px;
  }
}

.contact-note {
  margin-top: 3rem;

  p {
    margin: 0;
  }
}
</style>
