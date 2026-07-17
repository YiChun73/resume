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
        <!-- above the fold and the LCP candidate: keep eager, hint the preload scanner -->
        <img
          :src="profile.avatarHero"
          :alt="t('hero.name')"
          class="avatar"
          width="108"
          height="108"
          fetchpriority="high"
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

      <!-- shape geometry copied verbatim from the reference theme; only the
           hardcoded fills are swapped for currentColor so the palette stays
           in the design tokens -->
      <div ref="scene" class="parallax" aria-hidden="true">
        <svg class="layer p1" data-depth="0.3" width="27" height="29">
          <path d="M21.15625.60099c4.37954 3.67487 6.46544 9.40612 5.47254 15.03526-.9929 5.62915-4.91339 10.30141-10.2846 12.25672-5.37122 1.9553-11.3776.89631-15.75715-2.77856l2.05692-2.45134c3.50315 2.93948 8.3087 3.78663 12.60572 2.22284 4.297-1.5638 7.43381-5.30209 8.22768-9.80537.79387-4.50328-.8749-9.08872-4.37803-12.02821L21.15625.60099z" fill="currentColor" fill-rule="evenodd" />
        </svg>
        <svg class="layer p2" data-depth="0.2" width="26" height="26">
          <path d="M13 3.3541L2.42705 24.5h21.1459L13 3.3541z" stroke="currentColor" stroke-width="3" fill="none" fill-rule="evenodd" />
        </svg>
        <svg class="layer p3" data-depth="0.3" width="30" height="25">
          <path d="M.1436 8.9282C3.00213 3.97706 8.2841.92763 14.00013.92796c5.71605.00032 10.9981 3.04992 13.85641 8 2.8583 4.95007 2.8584 11.0491-.00014 16.00024l-2.77128-1.6c2.28651-3.96036 2.28631-8.84002.00011-12.8002-2.2862-3.96017-6.5124-6.40017-11.08513-6.4-4.57271.00018-8.79872 2.43984-11.08524 6.4002l-2.77128-1.6z" fill="currentColor" fill-rule="evenodd" />
        </svg>
        <svg class="layer p4" data-depth="0.6" width="15" height="23">
          <rect transform="rotate(30 9.86603 10.13397)" x="7" width="3" height="25" rx="1.5" fill="currentColor" fill-rule="evenodd" />
        </svg>
        <svg class="layer p5" data-depth="0.2" width="15" height="23">
          <rect transform="rotate(30 9.86603 10.13397)" x="7" width="3" height="25" rx="1.5" fill="currentColor" fill-rule="evenodd" />
        </svg>
        <svg class="layer p6" data-depth="0.5" width="49" height="17">
          <g fill="currentColor" fill-rule="evenodd">
            <path d="M.5 16.5c0-5.71709 2.3825-10.99895 6.25-13.8567 3.8675-2.85774 8.6325-2.85774 12.5 0C23.1175 5.50106 25.5 10.78292 25.5 16.5H23c0-4.57303-1.90625-8.79884-5-11.08535-3.09375-2.28652-6.90625-2.28652-10 0C4.90625 7.70116 3 11.92697 3 16.5H.5z" />
            <path d="M23.5 16.5c0-5.71709 2.3825-10.99895 6.25-13.8567 3.8675-2.85774 8.6325-2.85774 12.5 0C46.1175 5.50106 48.5 10.78292 48.5 16.5H46c0-4.57303-1.90625-8.79884-5-11.08535-3.09375-2.28652-6.90625-2.28652-10 0-3.09375 2.28651-5 6.51232-5 11.08535h-2.5z" />
          </g>
        </svg>
        <svg class="layer p7" data-depth="0.4" width="26" height="26">
          <path d="M13 22.6459L2.42705 1.5h21.1459L13 22.6459z" stroke="currentColor" stroke-width="3" fill="none" fill-rule="evenodd" />
        </svg>
        <svg class="layer p8" data-depth="0.3" width="19" height="21">
          <rect transform="rotate(-40 6.25252 10.12626)" x="7" width="3" height="25" rx="1.5" fill="currentColor" fill-rule="evenodd" />
        </svg>
        <svg class="layer p9" data-depth="0.3" width="30" height="25">
          <path d="M29.8564 16.0718c-2.85854 4.95114-8.1405 8.00057-13.85654 8.00024-5.71605-.00032-10.9981-3.04992-13.85641-8-2.8583-4.95007-2.8584-11.0491.00014-16.00024l2.77128 1.6c-2.28651 3.96036-2.28631 8.84002-.00011 12.8002 2.2862 3.96017 6.5124 6.40017 11.08513 6.4 4.57271-.00018 8.79872-2.43984 11.08524-6.4002l2.77128 1.6z" fill="currentColor" fill-rule="evenodd" />
        </svg>
        <svg class="layer p10" data-depth="0.2" width="47" height="29">
          <g fill="currentColor" fill-rule="evenodd">
            <path d="M46.78878 17.19094c-1.95535 5.3723-6.00068 9.52077-10.61234 10.8834-4.61167 1.36265-9.0893-.26708-11.74616-4.27524-2.65686-4.00817-3.08917-9.78636-1.13381-15.15866l2.34923.85505c-1.56407 4.29724-1.2181 8.92018.90705 12.12693 2.12514 3.20674 5.70772 4.5107 9.39692 3.4202 3.68921-1.0905 6.92581-4.40949 8.48988-8.70673l2.34923.85505z" />
            <path d="M25.17585 9.32448c-1.95535 5.3723-6.00068 9.52077-10.61234 10.8834-4.61167 1.36264-9.0893-.26708-11.74616-4.27525C.16049 11.92447-.27182 6.14628 1.68354.77398l2.34923.85505c-1.56407 4.29724-1.2181 8.92018.90705 12.12692 2.12514 3.20675 5.70772 4.5107 9.39692 3.4202 3.68921-1.0905 6.92581-4.40948 8.48988-8.70672l2.34923.85505z" />
          </g>
        </svg>
        <svg class="layer p11" data-depth="0.5" width="33" height="20">
          <path d="M32.36774.34317c.99276 5.63023-1.09332 11.3614-5.47227 15.03536-4.37895 3.67396-10.3855 4.73307-15.75693 2.77837C5.76711 16.2022 1.84665 11.53014.8539 5.8999l3.15139-.55567c.7941 4.50356 3.93083 8.24147 8.22772 9.8056 4.29688 1.56413 9.10275.71673 12.60554-2.2227C28.34133 9.98771 30.01045 5.4024 29.21635.89884l3.15139-.55567z" fill="currentColor" fill-rule="evenodd" />
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.home {
  background: var(--color-dark);
  padding: 0;
  // fixed height like the reference, so the parallax percentages always
  // resolve against the viewport even when mobile padding overflows it
  height: 100vh;
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
  .p3 { left: 10%; }
  .p5 { top: 3%; }
  .p9 { top: 5%; }
  .p10 { right: 10%; }
}
</style>
