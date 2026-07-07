import { onBeforeUnmount, onMounted, type Ref } from 'vue'

interface ParallaxLayer {
  el: HTMLElement
  depthX: number
  depthY: number
  x: number
  y: number
}

/**
 * Mouse parallax for the hero shapes. Children of `scene` carrying a
 * `data-depth` attribute drift against the pointer, eased with rAF lerp
 * (replaces the original parallax.js `relativeInput` behaviour).
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
    const relX = (event.clientX - rect.left) / rect.width - 0.5
    const relY = (event.clientY - rect.top) / rect.height - 0.5
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
      const destX = targetX * layer.depthX * rect.width * 0.1
      const destY = targetY * layer.depthY * rect.height * 0.1
      layer.x += (destX - layer.x) * 0.08
      layer.y += (destY - layer.y) * 0.08
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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    layers = Array.from(scene.value.querySelectorAll<HTMLElement>('[data-depth]')).map((el) => {
      const depthX = Number(el.dataset.depth ?? 0)
      const depthY = el.dataset.depthY !== undefined ? Number(el.dataset.depthY) : depthX
      return { el, depthX, depthY, x: 0, y: 0 }
    })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('pointermove', onPointerMove)
    cancelAnimationFrame(frame)
  })
}
