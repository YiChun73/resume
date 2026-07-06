import priceBasic from '@/assets/images/price-1.svg'
import pricePremium from '@/assets/images/price-2.svg'
import priceUltimate from '@/assets/images/price-3.svg'

export interface PricingPlan {
  name: string
  description: string
  support: string
  /** dollars per month */
  price: number
  image: string
  /** highlighted plan with ribbon label */
  badge?: string
}

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Basic',
    description: 'A Simple option but powerful to manage your business',
    support: 'Email support',
    price: 9,
    image: priceBasic,
  },
  {
    name: 'Premium',
    description: 'Unlimited product including apps integrations and more features',
    support: 'Mon-Fri support',
    price: 49,
    image: pricePremium,
    badge: 'Recommended',
  },
  {
    name: 'Ultimate',
    description: 'A wise option for large companies and individuals',
    support: '24/7 support',
    price: 99,
    image: priceUltimate,
  },
]
