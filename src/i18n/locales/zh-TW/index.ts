import type { MessageSchema } from '../en-US'

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
import notFound from './notFound'
import testimonials from './testimonials'

// typed against the en-US schema so missing keys fail the build
const zhTW: MessageSchema = {
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
  notFound,
}

export default zhTW
