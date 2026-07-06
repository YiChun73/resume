import type { IconName } from '@/types/icons'

export interface SocialLink {
  name: string
  icon: IconName
  url: string
}

export const socialLinks: SocialLink[] = [
  { name: 'Instagram', icon: 'instagram', url: 'https://instagram.com' },
  { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com' },
  { name: 'Behance', icon: 'behance', url: 'https://behance.net' },
  { name: 'Dribbble', icon: 'dribbble', url: 'https://dribbble.com' },
  { name: 'Pinterest', icon: 'pinterest-p', url: 'https://pinterest.com' },
]
