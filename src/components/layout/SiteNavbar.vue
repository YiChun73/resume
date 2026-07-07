<script setup lang="ts">
import { ref } from 'vue'

import { useScrollSpy } from '@/composables/useScrollSpy'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import { navItems } from '@/data/navigation'

const menuOpen = ref(false)
const { scrollToSection } = useSmoothScroll()
const activeId = useScrollSpy(navItems.map((item) => item.target))

function onNavClick(target: string): void {
  menuOpen.value = false
  scrollToSection(target)
}
</script>

<template>
  <header class="site-header">
    <div class="container">
      <nav class="navbar" aria-label="Main navigation">
        <a class="navbar-brand" href="/" aria-label="Bolby — home" @click.prevent="onNavClick('home')">
          <svg width="107" height="33" viewBox="0 0 107 33" aria-hidden="true">
            <text
              x="0"
              y="25"
              font-family="Rubik, sans-serif"
              font-size="26"
              font-weight="700"
              fill="#fff"
            >
              Bolby
            </text>
            <circle cx="76" cy="24" r="4" fill="#ff4c60" />
          </svg>
        </a>

        <button
          class="navbar-toggler"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="site-menu"
          aria-label="Toggle navigation"
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
            <li v-for="item in navItems" :key="item.target">
              <a
                class="nav-link"
                :class="{ active: activeId === item.target }"
                :href="`#${item.target}`"
                :aria-current="activeId === item.target ? 'true' : undefined"
                @click.prevent="onNavClick(item.target)"
              >
                {{ item.label }}
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
