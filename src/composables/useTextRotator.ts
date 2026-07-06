import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

/**
 * Cycles through `phrases` (4s per phrase, like the original text rotator).
 * Re-keying the rendered span replays the entrance animation.
 */
export function useTextRotator(phrases: string[], interval = 4000): Ref<string> {
  const current = ref(phrases[0] ?? '')
  let index = 0
  let timer = 0

  onMounted(() => {
    timer = window.setInterval(() => {
      index = (index + 1) % phrases.length
      current.value = phrases[index] ?? ''
    }, interval)
  })

  onBeforeUnmount(() => window.clearInterval(timer))

  return current
}
