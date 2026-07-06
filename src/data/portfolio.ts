import singleWork from '@/assets/images/single-work.svg'
import work1 from '@/assets/images/works/1.svg'
import work2 from '@/assets/images/works/2.svg'
import work3 from '@/assets/images/works/3.svg'
import work4 from '@/assets/images/works/4.svg'
import work5 from '@/assets/images/works/5.svg'
import work6 from '@/assets/images/works/6.svg'
import type { IconName } from '@/types/icons'

export type PortfolioCategory = 'creative' | 'art' | 'design' | 'branding'

export interface PortfolioFilter {
  label: string
  /** category value, or null for "everything" */
  value: PortfolioCategory | null
}

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

interface MediaInline {
  type: 'inline'
  image: string
  heading: string
  paragraphs: string[]
  cta: { label: string; url: string }
}

export type PortfolioMedia = MediaImage | MediaGallery | MediaEmbed | MediaExternal | MediaInline

export interface PortfolioItem {
  id: number
  title: string
  /** category badge label shown on hover */
  term: string
  categories: PortfolioCategory[]
  thumbnail: string
  icon: IconName
  media: PortfolioMedia
}

export const portfolioFilters: PortfolioFilter[] = [
  { label: 'Everything', value: null },
  { label: 'Creative', value: 'creative' },
  { label: 'Art', value: 'art' },
  { label: 'Design', value: 'design' },
  { label: 'Branding', value: 'branding' },
]

const walkthroughDialog: MediaInline = {
  type: 'inline',
  image: singleWork,
  heading: 'Guest App Walkthrough Screens',
  paragraphs: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam hendrerit nibh in massa semper rutrum. In rhoncus eleifend mi id tempus.',
    'Donec consectetur, libero at pretium euismod, nisl felis lobortis urna, id tristique nisl lectus eget ligula.',
  ],
  cta: { label: 'View on Dribbble', url: 'https://dribbble.com' },
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Project Managment Illustration',
    term: 'Art',
    categories: ['art'],
    thumbnail: work1,
    icon: 'magnifier-add',
    media: { type: 'image', src: work1 },
  },
  {
    id: 2,
    title: 'Guest App Walkthrough Screens',
    term: 'Creative',
    categories: ['creative', 'design'],
    thumbnail: work2,
    icon: 'options',
    media: walkthroughDialog,
  },
  {
    id: 3,
    title: 'Delivery App Wireframe',
    term: 'Branding',
    categories: ['branding'],
    thumbnail: work3,
    icon: 'camrecorder',
    media: {
      type: 'video',
      url: 'https://www.youtube.com/embed/qf9z4ulfmYw?autoplay=1',
    },
  },
  {
    id: 4,
    title: 'Onboarding Motivation',
    term: 'Creative',
    categories: ['creative'],
    thumbnail: work4,
    icon: 'music-tone-alt',
    media: {
      type: 'audio',
      url: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/240233494&color=%23ff5500&auto_play=true&visual=true',
    },
  },
  {
    id: 5,
    title: 'iMac Mockup Design',
    term: 'Art, Branding',
    categories: ['art', 'branding'],
    thumbnail: work5,
    icon: 'picture',
    media: { type: 'gallery', images: [work5, work4] },
  },
  {
    id: 6,
    title: 'Game Store App Concept',
    term: 'Creative, Design',
    categories: ['creative', 'design'],
    thumbnail: work6,
    icon: 'link',
    media: { type: 'external', url: 'https://themeforest.net/user/pxlsolutions/portfolio' },
  },
]

/** second page appended by the "Load more" button */
export const portfolioItemsPage2: PortfolioItem[] = [
  {
    id: 7,
    title: 'Project Managment Illustration',
    term: 'Art',
    categories: ['art'],
    thumbnail: work3,
    icon: 'magnifier-add',
    media: { type: 'image', src: work1 },
  },
  {
    id: 8,
    title: 'Guest App Walkthrough Screens',
    term: 'Creative',
    categories: ['creative', 'design'],
    thumbnail: work1,
    icon: 'options',
    media: walkthroughDialog,
  },
  {
    id: 9,
    title: 'Delivery App Wireframe',
    term: 'Branding',
    categories: ['branding'],
    thumbnail: work4,
    icon: 'camrecorder',
    media: {
      type: 'video',
      url: 'https://www.youtube.com/embed/qf9z4ulfmYw?autoplay=1',
    },
  },
]
