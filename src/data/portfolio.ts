import singleWork from '@/assets/images/single-work.svg'
import work1 from '@/assets/images/works/1.svg'
import work2 from '@/assets/images/works/2.svg'
import work3 from '@/assets/images/works/3.svg'
import work4 from '@/assets/images/works/4.svg'
import work5 from '@/assets/images/works/5.svg'
import work6 from '@/assets/images/works/6.svg'
import type { IconName } from '@/types/icons'

export type PortfolioCategory = 'creative' | 'art' | 'design' | 'branding'

// Titles come from the `portfolio.items` locale messages.
export type PortfolioSlug =
  | 'projectManagement'
  | 'guestApp'
  | 'deliveryApp'
  | 'onboarding'
  | 'imacMockup'
  | 'gameStore'

interface MediaImage {
  type: 'image'
  src: string
}

interface MediaGallery {
  type: 'gallery'
  images: string[]
}

interface MediaEmbed {
  type: 'video' | 'audio'
  /** iframe src */
  url: string
}

interface MediaExternal {
  type: 'external'
  url: string
}

/** copy comes from the `portfolio.dialog` locale messages */
interface MediaInline {
  type: 'inline'
  image: string
  ctaUrl: string
}

export type PortfolioMedia = MediaImage | MediaGallery | MediaEmbed | MediaExternal | MediaInline

export interface PortfolioItem {
  id: number
  slug: PortfolioSlug
  categories: PortfolioCategory[]
  /** categories shown on the hover badge (not always all of them) */
  termCategories: PortfolioCategory[]
  thumbnail: string
  icon: IconName
  media: PortfolioMedia
}

/** filter values in display order; null means "everything" */
export const portfolioFilters: (PortfolioCategory | null)[] = [
  null,
  'creative',
  'art',
  'design',
  'branding',
]

const walkthroughDialog: MediaInline = {
  type: 'inline',
  image: singleWork,
  ctaUrl: 'https://dribbble.com',
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    slug: 'projectManagement',
    categories: ['art'],
    termCategories: ['art'],
    thumbnail: work1,
    icon: 'magnifier-add',
    media: { type: 'image', src: work1 },
  },
  {
    id: 2,
    slug: 'guestApp',
    categories: ['creative', 'design'],
    termCategories: ['creative'],
    thumbnail: work2,
    icon: 'options',
    media: walkthroughDialog,
  },
  {
    id: 3,
    slug: 'deliveryApp',
    categories: ['branding'],
    termCategories: ['branding'],
    thumbnail: work3,
    icon: 'camrecorder',
    media: {
      type: 'video',
      url: 'https://www.youtube.com/embed/qf9z4ulfmYw?autoplay=1',
    },
  },
  {
    id: 4,
    slug: 'onboarding',
    categories: ['creative'],
    termCategories: ['creative'],
    thumbnail: work4,
    icon: 'music-tone-alt',
    media: {
      type: 'audio',
      url: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/240233494&color=%23ff5500&auto_play=true&visual=true',
    },
  },
  {
    id: 5,
    slug: 'imacMockup',
    categories: ['art', 'branding'],
    termCategories: ['art', 'branding'],
    thumbnail: work5,
    icon: 'picture',
    media: { type: 'gallery', images: [work5, work4] },
  },
  {
    id: 6,
    slug: 'gameStore',
    categories: ['creative', 'design'],
    termCategories: ['creative', 'design'],
    thumbnail: work6,
    icon: 'link',
    media: { type: 'external', url: 'https://themeforest.net/user/pxlsolutions/portfolio' },
  },
]

/** second page appended by the "Load more" button */
export const portfolioItemsPage2: PortfolioItem[] = [
  {
    id: 7,
    slug: 'projectManagement',
    categories: ['art'],
    termCategories: ['art'],
    thumbnail: work3,
    icon: 'magnifier-add',
    media: { type: 'image', src: work1 },
  },
  {
    id: 8,
    slug: 'guestApp',
    categories: ['creative', 'design'],
    termCategories: ['creative'],
    thumbnail: work1,
    icon: 'options',
    media: walkthroughDialog,
  },
  {
    id: 9,
    slug: 'deliveryApp',
    categories: ['branding'],
    termCategories: ['branding'],
    thumbnail: work4,
    icon: 'camrecorder',
    media: {
      type: 'video',
      url: 'https://www.youtube.com/embed/qf9z4ulfmYw?autoplay=1',
    },
  },
]
