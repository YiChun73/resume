import about from './about'
import blog from './blog'
import common from './common'
import contact from './contact'
import experience from './experience'
import footer from './footer'
import hero from './hero'
import meta from './meta'
import nav from './nav'
import notFound from './notFound'
import portfolio from './portfolio'
import services from './services'

const enUS = {
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

export type MessageSchema = typeof enUS

export default enUS
