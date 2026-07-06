<script setup lang="ts">
import type { Service } from '@/data/services'

defineProps<{
  service: Service
}>()
</script>

<template>
  <div
    class="service-box rounded text-center"
    :class="[`shadow-${service.shadow}`, { 'service-box--light': service.light }]"
    :style="{ background: service.background }"
  >
    <img :src="service.image" :alt="service.title" width="80" height="80" />
    <h3>{{ service.title }}</h3>
    <p>{{ service.description }}</p>
  </div>
</template>

<style scoped lang="scss">
.service-box {
  padding: 30px;
  transform: translateY(0);
  transition: var(--transition-base);

  &:hover {
    transform: translateY(-10px);
  }

  img {
    margin-bottom: 22px;
  }

  h3 {
    font-size: 20px;
    margin: 0 0 1rem;
  }

  p {
    margin: 0;
  }

  &--light {
    color: #f8f9fa;

    h3 {
      color: #fff;
    }
  }
}
</style>
