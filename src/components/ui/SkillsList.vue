<script setup lang="ts">
import { useTemplateRef } from 'vue'

import SkillCard from '@/components/ui/SkillCard.vue'
import { useInView } from '@/composables/useInView'
import { skills } from '@/data/skills'

// Bars start filling once the block rises into the top 60% of the viewport.
const root = useTemplateRef<HTMLDivElement>('root')
const isInView = useInView(root, { rootMargin: '0px 0px -40% 0px' })
</script>

<template>
  <div ref="root" class="skills">
    <SkillCard v-for="skill in skills" :key="skill.id" :skill="skill" :animate="isInView" />
  </div>
</template>
