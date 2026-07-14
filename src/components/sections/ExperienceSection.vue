<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'

import SectionTitle from '@/components/ui/SectionTitle.vue'
import TimelineItem, { type TimelineEntry } from '@/components/ui/TimelineItem.vue'
import { useInView } from '@/composables/useInView'

const { t, tm, rt } = useI18n()

function localizeEntries(entries: TimelineEntry[]): TimelineEntry[] {
  return entries.map((entry) => ({
    period: rt(entry.period),
    title: rt(entry.title),
    description: rt(entry.description),
  }))
}

// computed so the lists re-resolve when the locale changes
const education = computed(() => localizeEntries(tm('experience.education')))
const work = computed(() => localizeEntries(tm('experience.work')))

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
