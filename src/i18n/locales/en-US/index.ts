import about from './about'
import blog from './blog'
import common from './common'
import contact from './contact'
import experience from './experience'
import expertise from './expertise'
import footer from './footer'
import hero from './hero'
import meta from './meta'
import nav from './nav'
import notFound from './notFound'
import portfolio from './portfolio'

const enUS = {
  meta,
  common,
  nav,
  hero,
  about,
  expertise,
  experience,
  portfolio,
  blog,
  contact,
  footer,
  notFound,
}

export type MessageSchema = typeof enUS

export default enUS
