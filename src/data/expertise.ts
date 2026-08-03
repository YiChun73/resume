import areaArchitecture from '@/assets/images/expertise-architecture.svg'
import areaCollaboration from '@/assets/images/expertise-collaboration.svg'
import areaPerformance from '@/assets/images/expertise-performance.svg'

// Titles and descriptions come from the `expertise.items` locale messages.
export type ExpertiseAreaId = 'architecture' | 'performance' | 'collaboration'

export interface ExpertiseArea {
  id: ExpertiseAreaId
  image: string
  /** card background (CSS color value) */
  background: string
  shadow: 'blue' | 'yellow' | 'pink'
  /** white text variant */
  light: boolean
}

export const expertiseAreas: ExpertiseArea[] = [
  {
    id: 'architecture',
    image: areaArchitecture,
    background: 'var(--color-card-blue)',
    shadow: 'blue',
    light: true,
  },
  {
    id: 'performance',
    image: areaPerformance,
    background: 'var(--color-card-yellow)',
    shadow: 'yellow',
    light: false,
  },
  {
    id: 'collaboration',
    image: areaCollaboration,
    background: 'var(--color-card-pink)',
    shadow: 'pink',
    light: true,
  },
]
