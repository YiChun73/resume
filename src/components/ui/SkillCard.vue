<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { Skill } from '@/data/skills'

const props = defineProps<{
  skill: Skill
  /** fills the bar when true (triggered on scroll) */
  animate: boolean
}>()

const { t } = useI18n()

const name = computed(() => t(`about.skills.${props.skill.id}`))
</script>

<template>
  <div class="skill-item">
    <div class="skill-info">
      <span class="name">{{ name }}</span>
      <span class="level">{{ skill.level }}%</span>
    </div>
    <div
      class="progress"
      role="progressbar"
      :aria-valuenow="skill.level"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-label="name"
    >
      <div
        class="progress-bar"
        :style="{
          width: props.animate ? `${skill.level}%` : '0%',
          backgroundColor: skill.color,
        }"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.skill-item {
  &:not(:last-child) {
    margin-bottom: 20px;
  }
}

.skill-info {
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  .name {
    color: var(--color-heading);
    font-size: 16px;
    font-weight: 500;
    line-height: 1.2;
    margin: 0 0 1rem;
  }

  .level {
    font-size: 14px;
  }
}

.progress {
  height: 7px;
  overflow: hidden;
  background-color: var(--color-track);
  border-radius: 15px;
}

.progress-bar {
  height: 100%;
  border-radius: 15px;
  transition: width 0.6s ease;
}
</style>
