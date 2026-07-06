import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

export interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  /** stop observing after the first intersection (default true) */
  once?: boolean
}

/**
 * Tracks whether `target` (a template ref) has entered the viewport. Drives
 * the scroll-reveal animations, progress bars and counters.
 */
export function useInView<T extends Element>(
  target: Readonly<Ref<T | null>>,
  options: UseInViewOptions = {},
): Ref<boolean> {
  const { threshold = 0, rootMargin = '0px', once = true } = options
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
            if (once) observer?.disconnect()
          } else if (!once) {
            isInView.value = false
          }
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(target.value)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return isInView
}
