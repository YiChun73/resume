<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import SectionTitle from '@/components/ui/SectionTitle.vue'
import TestimonialCard from '@/components/ui/TestimonialCard.vue'
import { useCarousel } from '@/composables/useCarousel'
import { clients } from '@/data/clients'
import { testimonials } from '@/data/testimonials'

const { t } = useI18n()

const carousel = useCarousel(testimonials.length)

// clone of the first slide appended for the seamless loop
const firstTestimonial = testimonials[0]
const slides = firstTestimonial ? [...testimonials, firstTestimonial] : testimonials
</script>

<template>
  <section id="testimonials">
    <div class="container">
      <SectionTitle :title="t('testimonials.title')" />

      <div
        class="testimonials-wrapper"
        role="region"
        :aria-roledescription="t('testimonials.carouselRole')"
        :aria-label="t('testimonials.regionLabel')"
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
              v-for="(item, index) in slides"
              :key="index"
              class="slide"
              :aria-hidden="index !== carousel.activeIndex.value"
            >
              <TestimonialCard
                :name="t(`testimonials.items.${item.id}.name`)"
                :role="t(`testimonials.items.${item.id}.role`)"
                :avatar="item.avatar"
                :quote="t(`testimonials.items.${item.id}.quote`)"
              />
            </div>
          </div>
        </div>

        <ul class="dots" :aria-label="t('testimonials.chooseReview')">
          <li v-for="(_item, index) in testimonials" :key="index">
            <button
              type="button"
              :class="{ active: carousel.activeIndex.value === index }"
              :aria-label="t('testimonials.goToSlide', { n: index + 1 })"
              :aria-current="carousel.activeIndex.value === index ? 'true' : undefined"
              @click="carousel.goTo(index)"
            />
          </li>
        </ul>
      </div>

      <div class="row">
        <div v-for="client in clients" :key="client.name" class="col-md-3 col-6">
          <div class="client-item">
            <img
              :src="client.logo"
              :alt="client.name"
              width="48"
              height="48"
              loading="lazy"
              decoding="async"
            />
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
