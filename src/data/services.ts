import serviceDesign from '@/assets/images/service-1.svg'
import serviceDev from '@/assets/images/service-2.svg'
import servicePhoto from '@/assets/images/service-3.svg'

export interface Service {
  title: string
  description: string
  image: string
  /** card background (CSS color value) */
  background: string
  shadow: 'blue' | 'yellow' | 'pink'
  /** white text variant */
  light: boolean
}

export const services: Service[] = [
  {
    title: 'UI/UX design',
    description: 'Lorem ipsum dolor sit amet consectetuer adipiscing elit aenean commodo ligula eget.',
    image: serviceDesign,
    background: 'var(--color-service-blue)',
    shadow: 'blue',
    light: true,
  },
  {
    title: 'Web Development',
    description: 'Lorem ipsum dolor sit amet consectetuer adipiscing elit aenean commodo ligula eget.',
    image: serviceDev,
    background: 'var(--color-service-yellow)',
    shadow: 'yellow',
    light: false,
  },
  {
    title: 'Photography',
    description: 'Lorem ipsum dolor sit amet consectetuer adipiscing elit aenean commodo ligula eget.',
    image: servicePhoto,
    background: 'var(--color-service-pink)',
    shadow: 'pink',
    light: true,
  },
]
