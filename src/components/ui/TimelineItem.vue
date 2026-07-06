<script setup lang="ts">
import type { TimelineEntry } from '@/data/timeline'

defineProps<{
  entry: TimelineEntry
  /** stagger position used for the reveal delay */
  index: number
  visible: boolean
}>()
</script>

<template>
  <div
    class="timeline-container reveal"
    :class="{ 'is-visible': visible }"
    :style="{ animationDelay: `${index * 0.2}s` }"
  >
    <div class="content">
      <span class="time">{{ entry.period }}</span>
      <h3 class="title">{{ entry.title }}</h3>
      <p>{{ entry.description }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.timeline-container {
  padding-left: 50px;
  margin-bottom: 50px;
  position: relative;
  width: 100%;

  &:last-of-type {
    margin-bottom: 0;
  }
}

.time {
  color: var(--color-muted);
  font-size: 14px;
}

.title {
  font-size: 20px;
  margin: 10px 0;
}

p {
  margin: 0;
}
</style>
