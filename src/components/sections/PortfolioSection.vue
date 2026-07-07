<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'

import AppIcon from '@/components/ui/AppIcon.vue'
import AppLightbox from '@/components/ui/AppLightbox.vue'
import PortfolioCard from '@/components/ui/PortfolioCard.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { useInView } from '@/composables/useInView'
import {
  portfolioFilters,
  portfolioItems,
  portfolioItemsPage2,
  type PortfolioCategory,
  type PortfolioItem,
} from '@/data/portfolio'

const items = ref<PortfolioItem[]>([...portfolioItems])
const activeFilter = ref<PortfolioCategory | null>(null)
const loading = ref(false)
const allLoaded = ref(false)
const lightboxItem = ref<PortfolioItem | null>(null)

const filterBar = useTemplateRef<HTMLUListElement>('filterBar')
const filterVisible = useInView(filterBar)

const filteredItems = computed(() => {
  const filter = activeFilter.value
  if (!filter) return items.value
  return items.value.filter((item) => item.categories.includes(filter))
})

let opener: HTMLElement | null = null

function openLightbox(item: PortfolioItem): void {
  opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
  lightboxItem.value = item
}

function closeLightbox(): void {
  lightboxItem.value = null
  opener?.focus()
  opener = null
}

function onSelectFilter(event: Event): void {
  const select = event.target
  if (!(select instanceof HTMLSelectElement)) return
  const match = portfolioFilters.find((filter) => (filter.value ?? '') === select.value)
  activeFilter.value = match?.value ?? null
}

function loadMore(): void {
  if (loading.value) return
  loading.value = true
  window.setTimeout(() => {
    items.value = [...items.value, ...portfolioItemsPage2]
    loading.value = false
    allLoaded.value = true
  }, 1000)
}
</script>

<template>
  <section id="works">
    <div class="container">
      <SectionTitle title="Recent works" />

      <ul
        ref="filterBar"
        class="portfolio-filter list-inline reveal"
        :class="{ 'is-visible': filterVisible }"
      >
        <li v-for="filter in portfolioFilters" :key="filter.label" class="list-inline-item">
          <button
            type="button"
            :class="{ current: activeFilter === filter.value }"
            :aria-pressed="activeFilter === filter.value"
            @click="activeFilter = filter.value"
          >
            {{ filter.label }}
          </button>
        </li>
      </ul>

      <div class="pf-filter-wrapper">
        <label class="visually-hidden" for="portfolio-filter-select">Filter works</label>
        <select
          id="portfolio-filter-select"
          class="portfolio-filter-mobile"
          :value="activeFilter ?? ''"
          @change="onSelectFilter"
        >
          <option v-for="filter in portfolioFilters" :key="filter.label" :value="filter.value ?? ''">
            {{ filter.label }}
          </option>
        </select>
      </div>

      <TransitionGroup name="pf" tag="div" class="row portfolio-wrapper">
        <div v-for="item in filteredItems" :key="item.id" class="col-sm-6 col-md-4 grid-item">
          <PortfolioCard :item="item" @open="openLightbox" />
        </div>
      </TransitionGroup>

      <div v-if="!allLoaded" class="load-more text-center">
        <button type="button" class="btn btn-default" :disabled="loading" @click="loadMore">
          <AppIcon v-show="loading" class="spinner" name="spinner" size="16px" />
          Load more
        </button>
      </div>

      <AppLightbox :item="lightboxItem" @close="closeLightbox" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.portfolio-filter {
  margin-bottom: 25px;

  li:not(:last-child) {
    margin-right: 1.8rem;
  }

  button {
    color: var(--color-text);
    font-family: var(--font-sans);
    font-size: 16px;
    font-weight: 700;
    transition: var(--transition-base);

    &:hover,
    &.current {
      color: var(--color-primary);
    }
  }

  @include media-down(md) {
    display: none;
  }
}

.pf-filter-wrapper {
  display: none;

  @include media-down(md) {
    display: block;
  }
}

.portfolio-filter-mobile {
  font-size: 16px;
  border: 1px solid var(--color-icon-muted);
  border-radius: 10px;
  background: var(--color-surface);
  padding: 8px 12px;
  margin-bottom: 30px;
  width: 100%;
}

.portfolio-wrapper {
  position: relative;

  [class*='col-'] {
    margin-top: 15px;
    margin-bottom: 15px;
  }

  @include media-down(md) {
    .grid-item {
      max-width: calc(360px + 2 * #{$gutter});
      margin-left: auto;
      margin-right: auto;
    }
  }
}

.load-more {
  margin-top: 1.5rem;

  .spinner {
    margin-right: 10px;
    animation: spin 1s linear infinite;
  }

  .btn:disabled {
    opacity: 1;
    cursor: not-allowed;
  }
}

// filtering: fade/scale items in and out, glide survivors to their new spot
.pf-move {
  transition: transform 0.4s ease;
}

.pf-enter-active,
.pf-leave-active {
  transition: all 0.3s ease;
}

.pf-enter-from,
.pf-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.pf-leave-active {
  position: absolute;
}
</style>
