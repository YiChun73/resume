export interface Skill {
  name: string
  /** 0-100 */
  level: number
  /** progress bar color (CSS color value) */
  color: string
}

export const skills: Skill[] = [
  { name: 'Development', level: 85, color: '#ffd15c' },
  { name: 'UI/UX design', level: 95, color: '#ff4c60' },
  { name: 'Photography', level: 70, color: '#6c6ce5' },
]
