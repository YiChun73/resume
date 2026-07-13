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
  { id: 'development', level: 85, color: '#ffd15c' },
  { id: 'uiux', level: 95, color: '#ff4c60' },
  { id: 'photography', level: 70, color: '#6c6ce5' },
]
