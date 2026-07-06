<script setup lang="ts">
import { computed } from 'vue'

import SectionTitle from '@/components/ui/SectionTitle.vue'
import TestimonialCard from '@/components/ui/TestimonialCard.vue'
import { useCarousel } from '@/composables/useCarousel'
import { clients } from '@/data/clients'
import { testimonials } from '@/data/testimonials'

const carousel = useCarousel(testimonials.length)

// clone of the first slide appended for the seamless loop
const slides = computed(() => {
  const first = testimonials[0]
  return first ? [...testimonials, first] : testimonials
})
</script>

<template>
  <section id="testimonials">
    <div class="container">
      <SectionTitle title="Clients & Reviews" />

      <div
        class="testimonials-wrapper"
        role="region"
        aria-roledescription="carousel"
        aria-label="Client reviews"
        @mouseenter="carousel.pause"
        @mouseleave="carousel.resume"
      >
        <div class="viewport">
          <div
            class="track"
            :style="carousel.trackStyle.value"
            @transitionend="carousel.onTransitionEnd"
            @pointerdown="carousel.onPointerDown"
            @pointerup="carousel.onPointerUp"
          >
            <div
              v-for="(testimonial, index) in slides"
              :key="index"
              class="slide"
              :aria-hidden="index !== carousel.activeIndex.value"
            >
              <TestimonialCard :testimonial="testimonial" />
            </div>
          </div>
        </div>

        <ul class="dots" role="tablist" aria-label="Choose review">
          <li v-for="(_item, index) in testimonials" :key="index">
            <button
              type="button"
              :class="{ active: carousel.activeIndex.value === index }"
              :aria-label="`Go to slide ${index + 1}`"
              :aria-current="carousel.activeIndex.value === index"
              @click="carousel.goTo(index)"
            />
          </li>
        </ul>
      </div>

      <div class="row">
        <div v-for="client in clients" :key="client.name" class="col-md-3 col-6">
          <div class="client-item">
            <img :src="client.logo" :alt="client.name" width="48" height="48" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.testimonials-wrapper {
  max-width: 700px;
  margin: auto;
}

.viewport {
  overflow: hidden;
}

.track {
  display: flex;
  touch-action: pan-y;
  user-select: none;
}

.slide {
  flex: 0 0 100%;
  min-width: 0;

  img {
    -webkit-user-drag: none;
  }
}

.dots {
  display: flex;
  justify-content: center;
  gap: 10px;

  button {
    display: block;
    width: 10px;
    height: 6px;
    padding: 0;
    border-radius: 3px;
    background: var(--color-dot);
    transition: var(--transition-base);

    &.active {
      width: 20px;
      background: var(--color-primary);
    }
  }
}

.client-item {
  min-height: 50px;
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
