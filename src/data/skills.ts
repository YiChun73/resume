// Names come from the `about.skills` locale messages.
export type SkillId = 'development' | 'uiux' | 'photography'

export interface Skill {
  id: SkillId
  /** 0-100 */
  level: number
  /** progress bar color (CSS color value) */
  color: string
}

export const skills: Skill[] = [
  { id: 'development', level: 95, color: 'var(--color-yellow)' },
  { id: 'uiux', level: 80, color: 'var(--color-primary)' },
  { id: 'photography', level: 70, color: 'var(--color-secondary)' },
]
