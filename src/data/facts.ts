import type { IconName } from '@/types/icons'

export interface Fact {
  icon: IconName
  value: number
  label: string
}

export const facts: Fact[] = [
  { icon: 'fire', value: 198, label: 'Projects completed' },
  { icon: 'cup', value: 5670, label: 'Cup of coffee' },
  { icon: 'people', value: 427, label: 'Satisfied clients' },
  { icon: 'badge', value: 35, label: 'Nominees winner' },
]
