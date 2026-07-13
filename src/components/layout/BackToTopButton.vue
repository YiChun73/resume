<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import AppIcon from '@/components/ui/AppIcon.vue'
import { useSmoothScroll } from '@/composables/useSmoothScroll'

const { t } = useI18n()
const visible = ref(false)
const { scrollToTop } = useSmoothScroll()

function onScroll(): void {
  visible.value = window.scrollY >= 350
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition name="fade">
    <button
      v-show="visible"
      class="return-to-top"
      type="button"
      :aria-label="t('common.backToTop')"
      @click="scrollToTop"
    >
      <AppIcon name="arrow-up" size="16px" />
    </button>
  </Transition>
</template>

<style scoped lang="scss">
.return-to-top {
  position: fixed;
  bottom: 25px;
  right: 25px;
  height: 40px;
  width: 40px;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
  transition: var(--transition-base);

  &:hover {
    background: var(--color-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--color-secondary);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
