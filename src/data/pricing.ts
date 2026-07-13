import priceBasic from '@/assets/images/price-1.svg'
import pricePremium from '@/assets/images/price-2.svg'
import priceUltimate from '@/assets/images/price-3.svg'

// Names, descriptions and support lines come from the `pricing.plans` messages.
export type PricingPlanId = 'basic' | 'premium' | 'ultimate'

export interface PricingPlan {
  id: PricingPlanId
  /** dollars per month */
  price: number
  image: string
  /** highlighted plan with the ribbon badge */
  recommended?: boolean
}

export const pricingPlans: PricingPlan[] = [
  { id: 'basic', price: 9, image: priceBasic },
  { id: 'premium', price: 49, image: pricePremium, recommended: true },
  { id: 'ultimate', price: 99, image: priceUltimate },
]
