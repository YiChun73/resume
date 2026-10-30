<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'

import AppLightbox from '@/components/ui/AppLightbox.vue'
import PortfolioCard from '@/components/ui/PortfolioCard.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { useInView } from '@/composables/useInView'
import { useI18n } from '@/i18n/use-i18n'
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

function openLightbox(item: PortfolioItem): void {
  lightboxItem.value = item
}

function closeLightbox(): void {
  lightboxItem.value = null
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
        :aria-label="t('portfolio.filterLabel')"
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
