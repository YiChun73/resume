<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import type { IconName } from '@/types/icons'

export interface TimelineEntry {
  period: string
  title: string
  description: string
}

defineProps<{
  entry: TimelineEntry
  /** marker shown on the timeline, e.g. 'graduation' or 'briefcase' */
  icon: IconName
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
    <AppIcon class="marker" :name="icon" size="24px" />
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

// sits on top of the vertical line drawn by the parent card
.marker {
  background: #fff;
  color: var(--color-primary);
  position: absolute;
  left: -7px;
  top: 0;
  z-index: 1;
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
