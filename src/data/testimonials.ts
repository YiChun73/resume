import avatar1 from '@/assets/images/avatar-1.svg'
import avatar3 from '@/assets/images/avatar-3.svg'

export interface Testimonial {
  name: string
  role: string
  avatar: string
  quote: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'John Doe',
    role: 'Product designer at Dribbble',
    avatar: avatar3,
    quote:
      'I enjoy working with the theme and learn so much. You guys make the process fun and interesting. Good luck! 👍',
  },
  {
    name: 'John Doe',
    role: 'Product designer at Dribbble',
    avatar: avatar1,
    quote:
      'I enjoy working with the theme and learn so much. You guys make the process fun and interesting. Good luck! 🔥',
  },
]
