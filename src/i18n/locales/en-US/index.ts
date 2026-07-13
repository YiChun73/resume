import about from './about'
import blog from './blog'
import common from './common'
import contact from './contact'
import experience from './experience'
import footer from './footer'
import hero from './hero'
import meta from './meta'
import nav from './nav'
import portfolio from './portfolio'
import pricing from './pricing'
import services from './services'
import testimonials from './testimonials'

const enUS = {
  meta,
  common,
  nav,
  hero,
  about,
  services,
  experience,
  portfolio,
  pricing,
  testimonials,
  blog,
  contact,
  footer,
}

export type MessageSchema = typeof enUS

export default enUS
