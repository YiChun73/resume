<script setup lang="ts">
import { toRef } from 'vue'

import AppIcon from '@/components/ui/AppIcon.vue'
import { useCountUp } from '@/composables/useCountUp'
import type { Fact } from '@/data/facts'

const props = defineProps<{
  fact: Fact
  /** starts the counter when true (triggered on scroll) */
  active: boolean
}>()

const display = useCountUp(props.fact.value, toRef(props, 'active'))
</script>

<template>
  <div class="fact-item">
    <AppIcon class="fact-icon" :name="fact.icon" size="36px" />
    <div class="details">
      <h3 class="number">{{ display }}</h3>
      <p>{{ fact.label }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fact-item {
  position: relative;
}

.fact-icon {
  color: var(--color-icon-muted);
  position: absolute;
  left: 0;
  top: 4px;
}

.details {
  margin-left: 60px;
}

.number {
  font-size: 30px;
  margin: 0;
}

p {
  margin: 0;
  font-size: 16px;
}
</style>
