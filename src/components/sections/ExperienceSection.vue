<script setup lang="ts">
import { useTemplateRef } from 'vue'

import SectionTitle from '@/components/ui/SectionTitle.vue'
import TimelineItem from '@/components/ui/TimelineItem.vue'
import { useInView } from '@/composables/useInView'
import { education, experience } from '@/data/timeline'

const eduCard = useTemplateRef<HTMLDivElement>('eduCard')
const expCard = useTemplateRef<HTMLDivElement>('expCard')
const eduVisible = useInView(eduCard)
const expVisible = useInView(expCard)
</script>

<template>
  <section id="experience">
    <div class="container">
      <SectionTitle title="Experience" />

      <div class="row">
        <div class="col-md-6 timeline-col">
          <div ref="eduCard" class="timeline bg-white rounded shadow-dark padding-30 overflow-hidden">
            <TimelineItem
              v-for="(entry, index) in education"
              :key="entry.title"
              :entry="entry"
              :index="index"
              :visible="eduVisible"
            />
            <span class="line" />
          </div>
        </div>

        <div class="col-md-6">
          <div ref="expCard" class="timeline bg-white rounded shadow-dark padding-30 overflow-hidden">
            <TimelineItem
              v-for="(entry, index) in experience"
              :key="entry.title"
              :entry="entry"
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
