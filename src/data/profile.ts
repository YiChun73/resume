import avatarHero from '@/assets/images/avatar-1.svg'
import avatarAbout from '@/assets/images/avatar-2.svg'

export interface Profile {
  name: string
  /** phrases cycled by the hero text rotator */
  roles: string[]
  avatarHero: string
  avatarAbout: string
  bio: string
  email: string
  copyright: string
}

export const profile: Profile = {
  name: 'Bolby Doe',
  roles: ['UI/UX designer', 'Front-End developer', 'Photography lover'],
  avatarHero,
  avatarAbout,
  bio: 'I am Bolby Doe, web developer from London, United Kingdom. I have rich experience in web site design and building and customization, also I am good at WordPress.',
  email: 'name@example.com',
  copyright: '© 2020 Bolby Template.',
}
