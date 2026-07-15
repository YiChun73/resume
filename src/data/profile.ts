import avatarHero from '@/assets/images/avatar-1.svg'
import avatarAbout from '@/assets/images/avatar-2.svg'

// Non-textual profile config; copy lives in the `hero`/`about` locale messages.
export interface Profile {
  avatarHero: string
  avatarAbout: string
  email: string
}

export const profile: Profile = {
  avatarHero,
  avatarAbout,
  email: 'ycWang0107@gmail.com',
}
