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
  background: var(--color-dark);
  padding: 20px 0;
  border-bottom: solid 1px var(--color-border-on-dark);
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
  line-height: 33px;
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
  padding: 4px 10px;
  border: 1px solid var(--color-border-on-dark);
  border-radius: 4px;

  &:focus-visible {
    outline: 2px solid var(--color-yellow);
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

  .navbar-menu {
    flex-basis: 100%;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.35s ease;

    &.is-open {
      max-height: 320px;
    }
  }

  .navbar-nav {
    display: block;

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
