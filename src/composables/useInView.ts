import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

export interface UseInViewOptions {
  rootMargin?: string
}

/**
 * Tracks whether `target` (a template ref) has entered the viewport, and
 * stops observing after the first intersection. Drives the scroll-reveal
 * animations, progress bars and counters.
 */
export function useInView<T extends Element>(
  target: Readonly<Ref<T | null>>,
  options: UseInViewOptions = {},
): Ref<boolean> {
  const { rootMargin = '0px' } = options
  const isInView = ref(false)

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!target.value) return
    if (!('IntersectionObserver' in window)) {
      isInView.value = true
      return
    }
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            isInView.value = true
            observer?.disconnect()
          }
        }
      },
      { rootMargin },
    )
    observer.observe(target.value)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return isInView
}
