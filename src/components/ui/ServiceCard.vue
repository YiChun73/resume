<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { Service } from '@/data/services'

const props = defineProps<{
  service: Service
}>()

const { t } = useI18n()

const title = computed(() => t(`services.items.${props.service.id}.title`))
</script>

<template>
  <div
    class="service-box rounded text-center"
    :class="[`shadow-${service.shadow}`, { 'service-box--light': service.light }]"
    :style="{ background: service.background }"
  >
    <img :src="service.image" :alt="title" width="80" height="80" />
    <h3>{{ title }}</h3>
    <p>{{ t(`services.items.${service.id}.description`) }}</p>
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
