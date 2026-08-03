<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { ExpertiseArea } from '@/data/expertise'

const props = defineProps<{
  area: ExpertiseArea
}>()

const { t } = useI18n()

const title = computed(() => t(`expertise.items.${props.area.id}.title`))
</script>

<template>
  <div
    class="expertise-box rounded text-center"
    :class="[`shadow-${area.shadow}`, { 'expertise-box--light': area.light }]"
    :style="{ background: area.background }"
  >
    <img :src="area.image" :alt="title" width="80" height="80" loading="lazy" decoding="async" />
    <h3>{{ title }}</h3>
    <p>{{ t(`expertise.items.${area.id}.description`) }}</p>
  </div>
</template>

<style scoped lang="scss">
.expertise-box {
  // the .row stretches the columns; fill it so cards of unequal copy stay level
  height: 100%;
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
