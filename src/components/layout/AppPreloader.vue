<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const visible = ref(true)
let timer = 0

function hideSoon(): void {
  timer = window.setTimeout(() => {
    visible.value = false
  }, 350)
}

onMounted(() => {
  if (document.readyState === 'complete') {
    hideSoon()
  } else {
    window.addEventListener('load', hideSoon, { once: true })
  }
})

onBeforeUnmount(() => {
  window.clearTimeout(timer)
  window.removeEventListener('load', hideSoon)
})
</script>

<template>
  <Transition name="preloader">
    <div v-if="visible" class="preloader" role="status" aria-label="Loading">
      <div class="loader">
        <div class="orbit"><span class="dot" /></div>
        <div class="orbit"><span class="dot" /></div>
        <div class="orbit"><span class="dot" /></div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.preloader {
  background: var(--color-dark);
  position: fixed;
  inset: 0;
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
}

// Three dots chase each other along a figure-eight: each orbit spins
// clockwise around the right lobe, then jumps left and unwinds
// counter-clockwise around the left lobe.
.loader {
  position: relative;
  width: 120px;
  height: 60px;
}

.orbit {
  position: absolute;
  top: 0;
  left: 50%;
  width: 60px;
  height: 60px;
  animation: orbit-spin 6.9s linear infinite;

  &:nth-child(2),
  &:nth-child(2) .dot {
    animation-delay: -2.3s;
  }

  &:nth-child(3),
  &:nth-child(3) .dot {
    animation-delay: -4.6s;
  }
}

.dot {
  position: absolute;
  left: -8px;
  top: 50%;
  margin-top: -8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-primary);
  box-shadow: 2px 2px 8px rgba(255, 76, 96, 0.09);
  animation: dot-shift 6.9s linear infinite;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 14px;
    height: 14px;
    margin: -7px 0 0 -7px;
    border-radius: 50%;
    background: inherit;
  }

  &::before {
    animation: dot-trail 0.8s linear infinite;
  }

  &::after {
    animation: dot-trail 0.8s linear infinite 0.4s;
  }
}

@keyframes orbit-spin {
  50% {
    transform: rotate(360deg);
    margin-left: 0;
  }

  50.0001%,
  100% {
    margin-left: -60px;
  }
}

@keyframes dot-shift {
  0%,
  50% {
    left: -8px;
  }

  25% {
    background: var(--color-yellow);
  }

  75% {
    background: var(--color-secondary);
  }

  50.0001%,
  100% {
    left: auto;
    right: -8px;
  }
}

@keyframes dot-trail {
  100% {
    transform: translate(32px, 0) scale(0);
  }
}

.preloader-leave-active {
  transition: opacity 0.6s ease;
}

.preloader-leave-to {
  opacity: 0;
}
</style>
