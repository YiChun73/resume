import type { IconName } from '@/types/icons'

// Labels come from the `about.facts` locale messages.
export type FactId = 'projects' | 'coffee' | 'clients' | 'awards'

export interface Fact {
  id: FactId
  icon: IconName
  value: number
}

export const facts: Fact[] = [
  { id: 'projects', icon: 'fire', value: 198 },
  { id: 'coffee', icon: 'cup', value: 5670 },
  { id: 'clients', icon: 'people', value: 427 },
  { id: 'awards', icon: 'badge', value: 35 },
]
