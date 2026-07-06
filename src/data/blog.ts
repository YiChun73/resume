import blog1 from '@/assets/images/blog/1.svg'
import blog2 from '@/assets/images/blog/2.svg'
import blog3 from '@/assets/images/blog/3.svg'

export interface BlogPost {
  title: string
  category: string
  image: string
  date: string
  author: string
  url: string
}

export const blogPosts: BlogPost[] = [
  {
    title: '5 Best App Development Tool for Your Project',
    category: 'Reviews',
    image: blog1,
    date: '09 February, 2020',
    author: 'Bolby',
    url: '#',
  },
  {
    title: 'Common Misconceptions About Payment',
    category: 'Tutorial',
    image: blog2,
    date: '07 February, 2020',
    author: 'Bolby',
    url: '#',
  },
  {
    title: '3 Things To Know About Startup Business',
    category: 'Business',
    image: blog3,
    date: '06 February, 2020',
    author: 'Bolby',
    url: '#',
  },
]
