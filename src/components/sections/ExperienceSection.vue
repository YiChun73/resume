<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'

import SectionTitle from '@/components/ui/SectionTitle.vue'
import TimelineItem, { type TimelineEntry } from '@/components/ui/TimelineItem.vue'
import { useInView } from '@/composables/useInView'
import { educationIds, workIds, type EducationId, type WorkId } from '@/data/experience'
import { useI18n } from '@/i18n/use-i18n'

const { t } = useI18n()

function timelineEntry(
  key: `experience.education.${EducationId}` | `experience.work.${WorkId}`,
): TimelineEntry {
  return {
    period: t(`${key}.period`),
    title: t(`${key}.title`),
    description: t(`${key}.description`),
  }
}

// computed so the lists re-resolve when the locale changes
const education = computed(() =>
  educationIds.map((id) => timelineEntry(`experience.education.${id}`)),
)
const work = computed(() => workIds.map((id) => timelineEntry(`experience.work.${id}`)))

const eduCard = useTemplateRef<HTMLDivElement>('eduCard')
const expCard = useTemplateRef<HTMLDivElement>('expCard')
const eduVisible = useInView(eduCard)
const expVisible = useInView(expCard)
</script>

<template>
  <section id="experience">
    <div class="container">
      <SectionTitle :title="t('experience.title')" />

      <div class="row">
        <div class="col-md-6 timeline-col">
          <div ref="eduCard" class="timeline bg-white rounded shadow-dark padding-30 overflow-hidden">
            <TimelineItem
              v-for="(entry, index) in education"
              :key="entry.title"
              :entry="entry"
              icon="graduation"
              :index="index"
              :visible="eduVisible"
            />
            <span class="line" />
          </div>
        </div>

        <div class="col-md-6">
          <div ref="expCard" class="timeline bg-white rounded shadow-dark padding-30 overflow-hidden">
            <TimelineItem
              v-for="(entry, index) in work"
              :key="entry.title"
              :entry="entry"
              icon="briefcase"
              :index="index"
              :visible="expVisible"
            />
            <span class="line" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.timeline {
  position: relative;
}

.line {
  position: absolute;
  width: 1px;
  background-color: var(--color-primary);
  top: 30px;
  bottom: 30px;
  left: 34px;
}

@include media-down(md) {
  .timeline-col {
    margin-bottom: 30px;
  }
}
</style>
