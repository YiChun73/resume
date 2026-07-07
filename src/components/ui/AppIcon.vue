<script setup lang="ts">
import { computed } from 'vue'

import type { IconName } from '@/types/icons'

const props = withDefaults(
  defineProps<{
    name: IconName
    /** CSS font-size controlling the icon box, e.g. '21px' */
    size?: string
  }>(),
  { size: '1em' },
)

const modules = import.meta.glob<string>('@/assets/icons/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const registry = new Map<string, string>()
for (const [path, svg] of Object.entries(modules)) {
  const file = path.split('/').pop()
  if (file) registry.set(file.replace('.svg', ''), svg)
}

const markup = computed(() => registry.get(props.name) ?? '')
</script>

<template>
  <span class="app-icon" :style="{ fontSize: size }" aria-hidden="true" v-html="markup" />
</template>

<style scoped lang="scss">
.app-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  :deep(svg) {
    height: 1em;
    width: auto;

    // Font Awesome glyphs carry no fill attribute; own line icons do.
    &:not([fill]) {
      fill: currentColor;
    }
  }
}
</style>
