import { computed, onBeforeUnmount, onMounted, ref, type ComputedRef, type Ref } from 'vue'

export interface UseCarouselOptions {
  autoplay?: number
  speed?: number
}

export interface Carousel {
  /** track position: slideCount means "clone of the first slide" */
  position: Ref<number>
  animated: Ref<boolean>
  activeIndex: ComputedRef<number>
  trackStyle: ComputedRef<Record<string, string>>
  goTo: (index: number) => void
  next: () => void
  pause: () => void
  resume: () => void
  onTransitionEnd: () => void
  onPointerDown: (event: PointerEvent) => void
  onPointerUp: (event: PointerEvent) => void
}

/**
 * Autoplaying looped carousel (3s per slide like the original slider).
 * The template must append a clone of the first slide for the seamless wrap.
 */
export function useCarousel(slideCount: number, options: UseCarouselOptions = {}): Carousel {
  const { autoplay = 3000, speed = 300 } = options
  const position = ref(0)
  const animated = ref(true)
  let timer = 0
  let pointerStartX: number | null = null

  const activeIndex = computed(() => position.value % slideCount)

  const trackStyle = computed(() => ({
    transform: `translateX(-${position.value * 100}%)`,
    transition: animated.value ? `transform ${speed}ms ease` : 'none',
  }))

  function next(): void {
    if (position.value >= slideCount) return
    animated.value = true
    position.value += 1
  }

  function goTo(index: number): void {
    animated.value = true
    position.value = index
  }

  function onTransitionEnd(): void {
    if (position.value === slideCount) {
      // landed on the clone: snap back to the real first slide
      animated.value = false
      position.value = 0
    }
  }

  function pause(): void {
    window.clearInterval(timer)
    timer = 0
  }

  function resume(): void {
    if (timer || slideCount < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    timer = window.setInterval(next, autoplay)
  }

  function onPointerDown(event: PointerEvent): void {
    pointerStartX = event.clientX
    pause()
  }

  function onPointerUp(event: PointerEvent): void {
    if (pointerStartX !== null) {
      const delta = event.clientX - pointerStartX
      if (delta < -40) next()
      if (delta > 40) goTo(position.value === 0 ? slideCount - 1 : position.value - 1)
      pointerStartX = null
    }
    resume()
  }

  onMounted(resume)
  onBeforeUnmount(pause)

  return {
    position,
    animated,
    activeIndex,
    trackStyle,
    goTo,
    next,
    pause,
    resume,
    onTransitionEnd,
    onPointerDown,
    onPointerUp,
  }
}
