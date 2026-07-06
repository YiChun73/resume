<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'

import AppIcon from '@/components/ui/AppIcon.vue'
import type { PortfolioItem } from '@/data/portfolio'

const props = defineProps<{
  item: PortfolioItem | null
}>()

const emit = defineEmits<{
  close: []
}>()

const closeButton = ref<HTMLButtonElement | null>(null)
const galleryIndex = ref(0)

const media = computed(() => props.item?.media ?? null)

const galleryImages = computed(() =>
  media.value?.type === 'gallery' ? media.value.images : [],
)

function next(): void {
  if (!galleryImages.value.length) return
  galleryIndex.value = (galleryIndex.value + 1) % galleryImages.value.length
}

function previous(): void {
  if (!galleryImages.value.length) return
  galleryIndex.value =
    (galleryIndex.value - 1 + galleryImages.value.length) % galleryImages.value.length
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') emit('close')
  if (event.key === 'ArrowRight') next()
  if (event.key === 'ArrowLeft') previous()
}

watch(
  () => props.item,
  async (item) => {
    galleryIndex.value = 0
    if (item) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', onKeydown)
      await nextTick()
      closeButton.value?.focus()
    } else {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeydown)
    }
  },
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="item && media"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="item.title"
        @click.self="emit('close')"
      >
        <button
          ref="closeButton"
          class="lightbox-close"
          type="button"
          aria-label="Close dialog"
          @click="emit('close')"
        >
          <AppIcon name="close" size="28px" />
        </button>

        <div class="lightbox-content">
          <img
            v-if="media.type === 'image'"
            class="lightbox-image"
            :src="media.src"
            :alt="item.title"
          />

          <template v-else-if="media.type === 'gallery'">
            <div class="lightbox-gallery">
              <span class="gallery-counter"
                >{{ galleryIndex + 1 }} / {{ galleryImages.length }}</span
              >
              <button
                class="gallery-arrow gallery-arrow--prev"
                type="button"
                aria-label="Previous image"
                @click="previous"
              >
                <AppIcon name="chevron-left" size="32px" />
              </button>
              <img
                class="lightbox-image"
                :src="galleryImages[galleryIndex]"
                :alt="`${item.title} (${galleryIndex + 1}/${galleryImages.length})`"
                @click="next"
              />
              <button
                class="gallery-arrow gallery-arrow--next"
                type="button"
                aria-label="Next image"
                @click="next"
              >
                <AppIcon name="chevron-right" size="32px" />
              </button>
            </div>
          </template>

          <div v-else-if="media.type === 'video' || media.type === 'audio'" class="lightbox-frame">
            <iframe
              :src="media.url"
              :title="item.title"
              allow="autoplay; fullscreen"
              allowfullscreen
            />
          </div>

          <div v-else-if="media.type === 'inline'" class="white-popup">
            <img :src="media.image" :alt="media.heading" />
            <h2>{{ media.heading }}</h2>
            <p v-for="paragraph in media.paragraphs" :key="paragraph">{{ paragraph }}</p>
            <a :href="media.cta.url" class="btn btn-default" target="_blank" rel="noopener">
              {{ media.cta.label }}
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1043;
  background: rgba(11, 11, 11, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  transition: opacity 0.3s ease-out;
}

.lightbox-close {
  position: absolute;
  top: 16px;
  right: 20px;
  color: #fff;
  padding: 8px;
  opacity: 1;
  transition: var(--transition-base);
  z-index: 1;

  &:hover {
    opacity: 0.75;
  }

  &:focus-visible {
    outline: 2px solid #fff;
    border-radius: 4px;
  }
}

.lightbox-content {
  max-width: min(90vw, 900px);
  max-height: 90vh;
  transition: all 0.2s ease-in-out;
}

.lightbox-image {
  display: block;
  max-width: 100%;
  max-height: 82vh;
  margin: 0 auto;
  cursor: pointer;
}

.lightbox-gallery {
  position: relative;
}

.gallery-counter {
  color: #fff;
  font-size: 14px;
  position: absolute;
  top: -28px;
  left: 0;
}

.gallery-arrow {
  color: #fff;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px;
  opacity: 0.85;
  transition: var(--transition-base);

  &:hover {
    opacity: 1;
  }

  &--prev {
    left: -56px;
  }

  &--next {
    right: -56px;
  }

  @include media-down(md) {
    &--prev {
      left: -10px;
    }

    &--next {
      right: -10px;
    }
  }
}

.lightbox-frame {
  width: min(90vw, 900px);
  aspect-ratio: 16 / 9;

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
}

.white-popup {
  background: #fff;
  border-radius: 25px;
  padding: 30px;
  text-align: left;
  max-width: 650px;
  max-height: 85vh;
  overflow-y: auto;

  h2 {
    font-size: 28px;
  }
}

// zoom-in open/close animation
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;

  .lightbox-content {
    opacity: 0;
    transform: scale(0.8);
  }
}
</style>
