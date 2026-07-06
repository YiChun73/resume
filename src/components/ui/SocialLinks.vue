<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import type { SocialLink } from '@/data/social'

withDefaults(
  defineProps<{
    links: SocialLink[]
    /** on dark backgrounds: white icons with yellow hover */
    light?: boolean
  }>(),
  { light: false },
)
</script>

<template>
  <ul class="social-icons list-inline" :class="{ 'social-icons--light': light }">
    <li v-for="link in links" :key="link.name" class="list-inline-item">
      <a :href="link.url" target="_blank" rel="noopener" :aria-label="link.name">
        <AppIcon :name="link.icon" size="21px" />
      </a>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.social-icons {
  li:not(:last-child) {
    margin-right: 1.5rem;
  }

  a {
    color: var(--color-heading);

    &:hover {
      color: var(--color-primary);
    }
  }

  &--light a {
    color: #fff;

    &:hover {
      color: var(--color-yellow);
    }
  }
}
</style>
