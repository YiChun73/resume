import blog1 from '@/assets/images/blog/1.svg'
import blog2 from '@/assets/images/blog/2.svg'
import blog3 from '@/assets/images/blog/3.svg'

// Titles, categories and display dates come from the `blog.posts` messages.
export type BlogPostId = 'tools' | 'payment' | 'startup'

export interface BlogPost {
  id: BlogPostId
  image: string
  /** machine-readable date for the <time> element */
  dateISO: string
  url: string
}

export const blogPosts: BlogPost[] = [
  { id: 'tools', image: blog1, dateISO: '2020-02-09', url: '#' },
  { id: 'payment', image: blog2, dateISO: '2020-02-07', url: '#' },
  { id: 'startup', image: blog3, dateISO: '2020-02-06', url: '#' },
]
