<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'

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

const { t } = useI18n()

const items = ref<PortfolioItem[]>([...portfolioItems])
const activeFilter = ref<PortfolioCategory | null>(null)
const allLoaded = ref(false)
const lightboxItem = ref<PortfolioItem | null>(null)

const filterBar = useTemplateRef<HTMLUListElement>('filterBar')
const filterVisible = useInView(filterBar)

const filteredItems = computed(() => {
  const filter = activeFilter.value
  if (!filter) return items.value
  return items.value.filter((item) => item.categories.includes(filter))
})

function filterLabel(filter: PortfolioCategory | null): string {
  return filter ? t(`portfolio.categories.${filter}`) : t('portfolio.filterAll')
}

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
  const match = portfolioFilters.find((filter) => (filter ?? '') === select.value)
  activeFilter.value = match ?? null
}

function loadMore(): void {
  items.value = [...items.value, ...portfolioItemsPage2]
  allLoaded.value = true
}
</script>

<template>
  <section id="works">
    <div class="container">
      <SectionTitle :title="t('portfolio.title')" />

      <ul
        ref="filterBar"
        class="portfolio-filter list-inline reveal"
        :class="{ 'is-visible': filterVisible }"
      >
        <li v-for="filter in portfolioFilters" :key="filter ?? 'all'" class="list-inline-item">
          <button
            type="button"
            :class="{ current: activeFilter === filter }"
            :aria-pressed="activeFilter === filter"
            @click="activeFilter = filter"
          >
            {{ filterLabel(filter) }}
          </button>
        </li>
      </ul>

      <div class="pf-filter-wrapper">
        <label class="visually-hidden" for="portfolio-filter-select">
          {{ t('portfolio.filterLabel') }}
        </label>
        <select
          id="portfolio-filter-select"
          class="portfolio-filter-mobile"
          :value="activeFilter ?? ''"
          @change="onSelectFilter"
        >
          <option v-for="filter in portfolioFilters" :key="filter ?? 'all'" :value="filter ?? ''">
            {{ filterLabel(filter) }}
          </option>
        </select>
      </div>

      <TransitionGroup name="pf" tag="div" class="row portfolio-wrapper">
        <div v-for="item in filteredItems" :key="item.id" class="col-sm-6 col-md-4 grid-item">
          <PortfolioCard :item="item" @open="openLightbox" />
        </div>
      </TransitionGroup>

      <div v-if="!allLoaded" class="load-more text-center">
        <button type="button" class="btn btn-default" @click="loadMore">
          {{ t('portfolio.loadMore') }}
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
