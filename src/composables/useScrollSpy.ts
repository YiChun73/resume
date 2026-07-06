import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

/**
 * Highlights the nav link of the section currently under the fixed header.
 */
export function useScrollSpy(sectionIds: string[], offset = 90): Ref<string> {
  const activeId = ref(sectionIds[0] ?? '')

  function update(): void {
    const scrollBottom = window.innerHeight + window.scrollY
    const pageHeight = document.documentElement.scrollHeight
    const scrollable = pageHeight > window.innerHeight + 2
    if (scrollable && pageHeight - scrollBottom < 2) {
      const last = sectionIds[sectionIds.length - 1]
      if (last) activeId.value = last
      return
    }
    let current = sectionIds[0] ?? ''
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el && el.getBoundingClientRect().top - offset <= 0) current = id
    }
    activeId.value = current
  }

  onMounted(() => {
    update()
    // re-evaluate once the whole page has mounted and laid out
    window.setTimeout(update, 0)
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', update)
    window.removeEventListener('resize', update)
  })

  return activeId
}
