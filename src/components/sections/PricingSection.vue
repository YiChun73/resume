<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import PricingCard from '@/components/ui/PricingCard.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { pricingPlans } from '@/data/pricing'

const { t } = useI18n()
</script>

<template>
  <section id="prices">
    <div class="container">
      <SectionTitle :title="t('pricing.title')" />

      <div class="row">
        <div
          v-for="(plan, index) in pricingPlans"
          :key="plan.id"
          class="col-md-4 price-col"
          :class="plan.recommended ? 'price-col--best' : 'price-col--side'"
          :data-position="index"
        >
          <PricingCard :plan="plan" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
// The three cards touch (no gutters) on desktop; the recommended plan is
// taller and overlaps its neighbours' shadows.
@include media-up(md) {
  .price-col--side {
    margin-top: 1.5rem;
  }

  .price-col[data-position='0'] {
    padding-right: 0;
  }

  .price-col[data-position='1'] {
    padding-left: 0;
    padding-right: 0;
  }

  .price-col[data-position='2'] {
    padding-left: 0;
  }
}

@include media-down(md) {
  .price-col--best {
    margin: 1.5rem 0;
  }
}
</style>
