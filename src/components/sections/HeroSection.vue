<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'

import SocialLinks from '@/components/ui/SocialLinks.vue'
import { useMouseParallax } from '@/composables/useMouseParallax'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import { useTextRotator } from '@/composables/useTextRotator'
import { profile } from '@/data/profile'
import { socialLinks } from '@/data/social'

const { t, tm, rt } = useI18n()

const scene = useTemplateRef<HTMLElement>('scene')
const role = useTextRotator(tm('hero.roles').map((phrase) => rt(phrase)))
const { scrollToSection } = useSmoothScroll()

useMouseParallax(scene)
</script>

<template>
  <section id="home" class="home">
    <div class="container">
      <div class="intro">
        <img
          :src="profile.avatarHero"
          :alt="t('hero.name')"
          class="avatar"
          width="108"
          height="108"
        />

        <h1>{{ t('hero.name') }}</h1>
        <p class="tagline">
          {{ t('hero.taglinePrefix') }}<Transition name="rotate" mode="out-in">
            <span :key="role" class="rotating-text">{{ role }}</span>
          </Transition>
        </p>

        <SocialLinks class="socials" :links="socialLinks" light />

        <div class="cta">
          <a href="#contact" class="btn btn-default" @click.prevent="scrollToSection('contact')">
            {{ t('hero.hireMe') }}
          </a>
        </div>
      </div>

      <div class="scroll-down">
        <a href="#about" class="mouse-wrapper" @click.prevent="scrollToSection('about')">
          <span>{{ t('hero.scrollDown') }}</span>
          <span class="mouse">
            <span class="wheel" />
          </span>
        </a>
      </div>

      <div ref="scene" class="parallax" aria-hidden="true">
        <svg class="layer p1" data-depth="0.3" width="27" height="29" viewBox="0 0 27 29">
          <circle cx="13.5" cy="14.5" r="11" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="52 17" stroke-linecap="round" transform="rotate(115 13.5 14.5)" />
        </svg>
        <svg class="layer p2" data-depth="0.2" width="26" height="26" viewBox="0 0 26 26">
          <polygon points="13,3.4 2.4,24.5 23.6,24.5" fill="none" stroke="currentColor" stroke-width="3" />
        </svg>
        <svg class="layer p3" data-depth="0.3" width="30" height="25" viewBox="0 0 30 25">
          <path d="M2 23a13 13 0 0 1 26 0" fill="none" stroke="currentColor" stroke-width="3" />
        </svg>
        <svg class="layer p4" data-depth="0.6" width="15" height="23" viewBox="0 0 15 23">
          <rect x="6" y="-1" width="3" height="25" rx="1.5" fill="currentColor" transform="rotate(30 7.5 11.5)" />
        </svg>
        <svg class="layer p5" data-depth="0.2" width="15" height="23" viewBox="0 0 15 23">
          <rect x="6" y="-1" width="3" height="25" rx="1.5" fill="currentColor" transform="rotate(30 7.5 11.5)" />
        </svg>
        <svg class="layer p6" data-depth="0.5" width="49" height="17" viewBox="0 0 49 17">
          <g fill="none" stroke="currentColor" stroke-width="3">
            <path d="M2 16a10.5 10.5 0 0 1 21 0" />
            <path d="M26 16a10.5 10.5 0 0 1 21 0" />
          </g>
        </svg>
        <svg class="layer p7" data-depth="0.4" width="26" height="26" viewBox="0 0 26 26">
          <polygon points="13,22.6 2.4,1.5 23.6,1.5" fill="none" stroke="currentColor" stroke-width="3" />
        </svg>
        <svg class="layer p8" data-depth="0.3" width="19" height="21" viewBox="0 0 19 21">
          <rect x="8" y="-2" width="3" height="25" rx="1.5" fill="currentColor" transform="rotate(-40 9.5 10.5)" />
        </svg>
        <svg class="layer p9" data-depth="0.3" data-depth-y="-1.30" width="30" height="25" viewBox="0 0 30 25">
          <path d="M28 2a13 13 0 0 1-26 0" fill="none" stroke="currentColor" stroke-width="3" />
        </svg>
        <svg class="layer p10" data-depth="0.2" width="47" height="29" viewBox="0 0 47 29">
          <g fill="none" stroke="currentColor" stroke-width="3" transform="rotate(-16 23.5 14.5)">
            <path d="M4 22a10 10 0 0 1 20 0" />
            <path d="M24 15a10 10 0 0 1 20 0" />
          </g>
        </svg>
        <svg class="layer p11" data-depth="0.5" width="33" height="20" viewBox="0 0 33 20">
          <path d="M2 2a15.5 15.5 0 0 0 29 6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.home {
  background: var(--color-dark);
  padding: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;

  @include media-down(md) {
    padding: 300px 0;
  }
}

.intro {
  margin: auto;
  max-width: 540px;
  text-align: center;
  position: relative;
  z-index: 1;

  h1 {
    color: #fff;
    font-size: 36px;
    margin: 0 0 0.5rem;
  }
}

.avatar {
  margin-bottom: 1.5rem;
}

.tagline {
  color: #fff;
  font-size: 16px;
  margin: 0;
}

.rotating-text {
  display: inline-block;
}

.rotate-enter-active {
  animation: bounce-in 1s both;
}

.socials {
  margin-top: 1.5rem;
}

.cta {
  margin-top: 1.5rem;
}

.scroll-down {
  position: absolute;
  bottom: 40px;
  left: 0;
  width: 100%;
  z-index: 1;

  @media only screen and (max-height: 500px) {
    display: none;
  }
}

.mouse-wrapper {
  color: #fff;
  font-size: 14px;
  display: block;
  max-width: 100px;
  margin: auto;
  text-align: center;

  &:hover {
    color: #fff;
  }
}

.mouse {
  border: solid 2px #fff;
  border-radius: 16px;
  display: block;
  margin: 10px auto 0;
  height: 26px;
  width: 20px;
  position: relative;
}

.wheel {
  background: #fff;
  border-radius: 100%;
  display: block;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  height: 4px;
  width: 4px;
  animation: ani-mouse 2s linear infinite;
}

.parallax {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
}

.layer {
  position: absolute;
}

.p1 { left: 10%; top: 10%; color: var(--color-yellow); }
.p2 { left: 25%; top: 30%; color: var(--color-primary); }
.p3 { left: 15%; bottom: 30%; color: var(--color-teal); }
.p4 { left: 10%; bottom: 10%; color: var(--color-yellow); }
.p5 { left: 45%; top: 10%; color: var(--color-secondary); }
.p6 { left: 40%; bottom: 10%; color: var(--color-primary); }
.p7 { top: 20%; right: 30%; color: var(--color-yellow); }
.p8 { right: 30%; bottom: 20%; color: var(--color-secondary); }
.p9 { right: 10%; top: 10%; color: var(--color-secondary); }
.p10 { top: 45%; right: 20%; color: var(--color-teal); }
.p11 { bottom: 10%; right: 10%; color: var(--color-yellow); }

@include media-down(sm) {
  .p2 { left: 15%; }
  .p5 { top: 3%; }
  .p9 { top: 5%; }
  .p10 { right: 10%; }
}
</style>
