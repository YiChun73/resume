<script setup lang="ts">
import type { Testimonial } from '@/data/testimonials'

defineProps<{
  testimonial: Testimonial
}>()
</script>

<template>
  <div class="testimonial-item text-center">
    <div class="thumb">
      <img :src="testimonial.avatar" :alt="testimonial.name" width="90" height="90" />
    </div>
    <h4>{{ testimonial.name }}</h4>
    <span class="subtitle">{{ testimonial.role }}</span>
    <blockquote class="bubble bg-white padding-30 shadow-dark rounded triangle-top">
      <p>{{ testimonial.quote }}</p>
    </blockquote>
  </div>
</template>

<style scoped lang="scss">
.testimonial-item {
  padding: 0 20px 20px;
}

.thumb {
  border-radius: 50%;
  overflow: hidden;
  height: 90px;
  width: 90px;
  margin: 0 auto 1rem;
}

h4 {
  margin: 1rem 0 0;
}

.subtitle {
  color: var(--color-muted);
  font-size: 14px;
}

.bubble {
  position: relative;
  margin-top: 1.5rem;

  p {
    margin: 0;
    font-size: 16px;
  }
}
</style>
