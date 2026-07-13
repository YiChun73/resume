import serviceDesign from '@/assets/images/service-1.svg'
import serviceDev from '@/assets/images/service-2.svg'
import servicePhoto from '@/assets/images/service-3.svg'

// Titles and descriptions come from the `services.items` locale messages.
export type ServiceId = 'design' | 'development' | 'photography'

export interface Service {
  id: ServiceId
  image: string
  /** card background (CSS color value) */
  background: string
  shadow: 'blue' | 'yellow' | 'pink'
  /** white text variant */
  light: boolean
}

export const services: Service[] = [
  {
    id: 'design',
    image: serviceDesign,
    background: 'var(--color-service-blue)',
    shadow: 'blue',
    light: true,
  },
  {
    id: 'development',
    image: serviceDev,
    background: 'var(--color-service-yellow)',
    shadow: 'yellow',
    light: false,
  },
  {
    id: 'photography',
    image: servicePhoto,
    background: 'var(--color-service-pink)',
    shadow: 'pink',
    light: true,
  },
]
