<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useScrollSpy } from '@/composables/useScrollSpy'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import { navTargets, type NavTarget } from '@/data/navigation'

const { t } = useI18n()
const menuOpen = ref(false)
const { scrollToSection } = useSmoothScroll()
const activeId = useScrollSpy([...navTargets])

function onNavClick(target: NavTarget): void {
  menuOpen.value = false
  scrollToSection(target)
}
</script>

<template>
  <header class="site-header">
    <div class="container">
      <nav class="navbar" :aria-label="t('common.mainNav')">
        <a
          class="navbar-brand"
          href="/"
          :aria-label="t('nav.brandHome')"
          @click.prevent="onNavClick('home')"
        >
          <span aria-hidden="true">{{ t('common.brand') }}</span>
          <span class="brand-dot" aria-hidden="true"></span>
        </a>

        <button
          class="navbar-toggler"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="site-menu"
          :aria-label="t('common.toggleNav')"
          @click="menuOpen = !menuOpen"
        >
          <svg viewBox="0 0 30 30" width="30" height="30" aria-hidden="true">
            <path
              stroke="rgba(255, 255, 255, 0.55)"
              stroke-linecap="round"
              stroke-width="2"
              d="M4 7h22M4 15h22M4 23h22"
            />
          </svg>
        </button>

        <div id="site-menu" class="navbar-menu" :class="{ 'is-open': menuOpen }">
          <ul class="navbar-nav">
            <li v-for="target in navTargets" :key="target">
              <a
                class="nav-link"
                :class="{ active: activeId === target }"
                :href="`#${target}`"
                :aria-current="activeId === target ? 'true' : undefined"
                @click.prevent="onNavClick(target)"
              >
                {{ t(`nav.${target}`) }}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.site-header {
  --color-focus-ring: var(--color-yellow);
  background: var(--color-dark);
  padding: $navbar-padding-y 0;
  border-bottom: solid $navbar-border-width var(--color-border-on-dark);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.navbar-brand {
  display: inline-flex;
  align-items: baseline;
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  line-height: $navbar-brand-line-height;
}

// Matches the reference logo's period: a 6.6px rounded square sitting on the baseline.
.brand-dot {
  display: inline-block;
  width: 6.6px;
  height: 6.6px;
  margin-left: 2px;
  border-radius: 1px;
  background: var(--color-primary);
}

.navbar-toggler {
  display: none;
  height: $navbar-toggler-height;
  padding: 4px 10px;
  border: 1px solid var(--color-border-on-dark);
  border-radius: 4px;

  &:focus-visible {
    outline: 2px solid var(--color-focus-ring);
  }
}

.navbar-nav {
  display: flex;
  align-items: center;

  li:not(:last-child) {
    padding-right: 3rem;
  }
}

.nav-link {
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  padding: 0;

  &:hover,
  &.active {
    color: var(--color-yellow);
  }
}

@include media-down(lg) {
  .navbar-toggler {
    display: block;
  }

  // Collapsed links are visibility: hidden, so they leave the tab order and
  // the accessibility tree; the grid row grows to the menu's real height.
  .navbar-menu {
    flex-basis: 100%;
    display: grid;
    grid-template-rows: 0fr;
    visibility: hidden;
    transition:
      grid-template-rows 0.35s ease,
      visibility 0.35s;

    &.is-open {
      grid-template-rows: 1fr;
      visibility: visible;
    }
  }

  .navbar-nav {
    display: block;
    min-height: 0;
    overflow: hidden;

    li:not(:last-child) {
      padding-right: 0;
    }
  }

  .nav-link {
    display: block;
    padding: 7px 0;
  }
}
</style>
