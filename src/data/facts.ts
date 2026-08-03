import type { IconName } from '@/types/icons'

// Labels come from the `about.facts` locale messages.
export type FactId = 'experience' | 'frameworks' | 'teams'

export interface Fact {
  id: FactId
  icon: IconName
  value: number
}

export const facts: Fact[] = [
  { id: 'experience', icon: 'fire', value: 6 },
  { id: 'frameworks', icon: 'badge', value: 3 },
  { id: 'teams', icon: 'briefcase', value: 3 },
]
