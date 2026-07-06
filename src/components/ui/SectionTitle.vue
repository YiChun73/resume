<script setup lang="ts">
import { useTemplateRef } from 'vue'

import { useInView } from '@/composables/useInView'

defineProps<{
  title: string
}>()

const heading = useTemplateRef<HTMLHeadingElement>('heading')
const isInView = useInView(heading)
</script>

<template>
  <h2 ref="heading" class="section-title reveal" :class="{ 'is-visible': isInView }">
    {{ title }}
  </h2>
</template>

<style scoped lang="scss">
.section-title {
  margin-bottom: 60px;
}
</style>
