import { prefersReducedMotion } from '@/utils/prefers-reduced-motion'

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
}

function animateScrollTo(targetY: number, duration: number): void {
  if (prefersReducedMotion()) {
    window.scrollTo(0, targetY)
    return
  }
  const startY = window.scrollY
  const distance = targetY - startY
  const start = performance.now()

  function step(now: number): void {
    const progress = Math.min((now - start) / duration, 1)
    window.scrollTo(0, startY + distance * easeInOutQuad(progress))
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

/**
 * Anchor scrolling with the same feel as the original one-page script
 * (800ms ease-in-out to sections, 400ms back to top).
 */
export function useSmoothScroll(): {
  scrollToSection: (id: string) => void
  scrollToTop: () => void
} {
  function scrollToSection(id: string): void {
    const el = document.getElementById(id)
    if (!el) return
    animateScrollTo(el.getBoundingClientRect().top + window.scrollY, 800)
  }

  function scrollToTop(): void {
    animateScrollTo(0, 400)
  }

  return { scrollToSection, scrollToTop }
}
