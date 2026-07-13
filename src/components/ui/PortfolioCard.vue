<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppIcon from '@/components/ui/AppIcon.vue'
import type { PortfolioItem } from '@/data/portfolio'

const props = defineProps<{
  item: PortfolioItem
}>()

const emit = defineEmits<{
  open: [item: PortfolioItem]
}>()

const { t } = useI18n()

const title = computed(() => t(`portfolio.items.${props.item.slug}`))

const term = computed(() =>
  props.item.termCategories
    .map((category) => t(`portfolio.categories.${category}`))
    .join(t('portfolio.categoryJoin')),
)

const isExternal = computed(() => props.item.media.type === 'external')

const externalUrl = computed(() =>
  props.item.media.type === 'external' ? props.item.media.url : undefined,
)
</script>

<template>
  <component
    :is="isExternal ? 'a' : 'button'"
    class="work-link"
    :href="externalUrl"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener' : undefined"
    :type="isExternal ? undefined : 'button'"
    :aria-haspopup="isExternal ? undefined : 'dialog'"
    @click="isExternal ? undefined : emit('open', item)"
  >
    <span class="portfolio-item rounded shadow-dark">
      <span class="details">
        <span class="term">{{ term }}</span>
        <span class="title">{{ title }}</span>
        <span class="more-button">
          <AppIcon :name="item.icon" size="20px" />
        </span>
      </span>
      <span class="thumb">
        <img :src="item.thumbnail" :alt="title" />
        <span class="mask" />
      </span>
    </span>
  </component>
</template>

<style scoped lang="scss">
.work-link {
  display: block;
  width: 100%;
  padding: 0;
  text-align: left;
  border: 0;

  &:focus-visible {
    outline: 2px solid var(--color-secondary);
    outline-offset: 4px;
    border-radius: var(--radius-card);
  }
}

.portfolio-item {
  display: block;
  position: relative;
  overflow: hidden;
}

.thumb {
  display: block;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
  }
}

.mask {
  background: var(--color-secondary);
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: var(--transition-base);
}

.details {
  color: #fff;
  display: block;
  position: absolute;
  inset: 0;
  z-index: 1;
}

.term {
  color: #fff;
  background: var(--color-primary);
  border-radius: 0 0 15px 15px;
  display: inline-block;
  font-size: 14px;
  padding: 3px 10px;
  position: absolute;
  top: 0;
  left: 20px;
  opacity: 0;
  transform: translateY(-40px);
  transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
}

.title {
  color: #fff;
  display: block;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 10px;
  padding: 0 20px;
  position: absolute;
  top: 60px;
  opacity: 0;
  transform: translateY(30px);
  transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
}

.more-button {
  color: #fff;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-yellow);
  border-radius: 100%;
  height: 40px;
  width: 40px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  opacity: 0;
  transition: var(--transition-base);
}

.work-link:hover,
.work-link:focus-visible {
  .mask {
    opacity: 0.9;
  }

  .term,
  .title {
    opacity: 1;
    transform: translateY(0);
  }

  .more-button {
    opacity: 1;
  }
}
</style>
