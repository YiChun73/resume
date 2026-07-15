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
import services from './services'
import notFound from './notFound'

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
  blog,
  contact,
  footer,
  notFound,
}

export default zhTW
