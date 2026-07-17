import { onBeforeUnmount, onMounted, type Ref } from 'vue'

import { prefersReducedMotion } from '@/utils/prefers-reduced-motion'

interface ParallaxLayer {
  el: HTMLElement
  depth: number
  x: number
  y: number
}

/**
 * Mouse parallax for the hero shapes. Children of `scene` carrying a
 * `data-depth` attribute drift against the pointer, eased with rAF lerp.
 * Mirrors parallax.js `relativeInput` semantics: input normalised to ±1
 * about the scene centre, layers offset by depth × 10% of the scene size,
 * eased with a 0.1 friction.
 */
export function useMouseParallax(scene: Readonly<Ref<HTMLElement | null>>): void {
  let layers: ParallaxLayer[] = []
  let targetX = 0
  let targetY = 0
  let frame = 0
  let running = false

  function onPointerMove(event: PointerEvent): void {
    if (!scene.value) return
    const rect = scene.value.getBoundingClientRect()
    const relX = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const relY = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    targetX = -relX
    targetY = -relY
    if (!running) {
      running = true
      frame = requestAnimationFrame(update)
    }
  }

  function update(): void {
    if (!scene.value) return
    const rect = scene.value.getBoundingClientRect()
    let settled = true
    for (const layer of layers) {
      const destX = targetX * layer.depth * rect.width * 0.1
      const destY = targetY * layer.depth * rect.height * 0.1
      layer.x += (destX - layer.x) * 0.1
      layer.y += (destY - layer.y) * 0.1
      if (Math.abs(destX - layer.x) > 0.1 || Math.abs(destY - layer.y) > 0.1) settled = false
      layer.el.style.transform = `translate3d(${layer.x.toFixed(2)}px, ${layer.y.toFixed(2)}px, 0)`
    }
    if (settled) {
      running = false
      return
    }
    frame = requestAnimationFrame(update)
  }

  onMounted(() => {
    if (!scene.value) return
    if (prefersReducedMotion()) return
    layers = Array.from(scene.value.querySelectorAll<HTMLElement>('[data-depth]')).map((el) => ({
      el,
      depth: Number(el.dataset.depth ?? 0),
      x: 0,
      y: 0,
    }))
    window.addEventListener('pointermove', onPointerMove, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('pointermove', onPointerMove)
    cancelAnimationFrame(frame)
  })
}
