import avatar1 from '@/assets/images/avatar-1.svg'
import avatar3 from '@/assets/images/avatar-3.svg'

// Names, roles and quotes come from the `testimonials.items` messages.
export type TestimonialId = 'thumbsUp' | 'fire'

export interface Testimonial {
  id: TestimonialId
  avatar: string
}

export const testimonials: Testimonial[] = [
  { id: 'thumbsUp', avatar: avatar3 },
  { id: 'fire', avatar: avatar1 },
]
