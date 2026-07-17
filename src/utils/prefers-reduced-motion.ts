/**
 * Read at call time (not cached) so animations respect a mid-session
 * change of the OS accessibility setting.
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
