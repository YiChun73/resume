import { computed, onBeforeUnmount, ref, watch, type ComputedRef, type Ref } from 'vue'

/**
 * Animates a number from 0 to `value` once `active` becomes true
 * (2s, matching the original counter behaviour).
 */
export function useCountUp(
  value: number,
  active: Ref<boolean>,
  duration = 2000,
): ComputedRef<string> {
  const current = ref(0)
  let frame = 0

  function run(): void {
    const start = performance.now()
    const tick = (now: number): void => {
      const progress = Math.min((now - start) / duration, 1)
      current.value = Math.round(value * progress)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
  }

  watch(
    active,
    (visible) => {
      if (!visible) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        current.value = value
        return
      }
      run()
    },
    { immediate: true },
  )

  onBeforeUnmount(() => cancelAnimationFrame(frame))

  return computed(() => String(current.value))
}
