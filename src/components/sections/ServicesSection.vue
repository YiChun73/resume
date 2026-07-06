<script setup lang="ts">
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ServiceCard from '@/components/ui/ServiceCard.vue'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import { services } from '@/data/services'

const { scrollToSection } = useSmoothScroll()
</script>

<template>
  <section id="services">
    <div class="container">
      <SectionTitle title="Services" />

      <div class="row">
        <div v-for="service in services" :key="service.title" class="col-md-4 service-col">
          <ServiceCard :service="service" />
        </div>
      </div>

      <div class="custom-job text-center">
        <p>
          Looking for a custom job?
          <a href="#contact" @click.prevent="scrollToSection('contact')">Click here</a>
          to contact me! 👋
        </p>
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
