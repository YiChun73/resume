<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { PricingPlan } from '@/data/pricing'

const props = defineProps<{
  plan: PricingPlan
}>()

const { t } = useI18n()

const name = computed(() => t(`pricing.plans.${props.plan.id}.name`))
</script>

<template>
  <div
    class="price-item bg-white rounded shadow-dark text-center"
    :class="{ best: plan.recommended }"
  >
    <span v-if="plan.recommended" class="badge">{{ t('pricing.recommended') }}</span>
    <img :src="plan.image" :alt="name" width="70" height="81" loading="lazy" decoding="async" />
    <h3 class="plan">{{ name }}</h3>
    <p>{{ t(`pricing.plans.${plan.id}.description`) }}</p>
    <p>{{ t(`pricing.plans.${plan.id}.support`) }}</p>
    <p class="price">
      <span class="currency">{{ t('pricing.currency') }}</span
      >{{ plan.price }}<span class="period">{{ t('pricing.perMonth') }}</span>
    </p>
    <a href="#" class="btn btn-default">{{ t('pricing.getStarted') }}</a>
  </div>
</template>

<style scoped lang="scss">
.price-item {
  padding: 30px 40px;

  &.best {
    padding: 55px 40px;
    position: relative;
    z-index: 1;
  }
}

.plan {
  font-size: 24px;
  margin: 20px 0;
}

.price {
  color: var(--color-heading);
  font-size: 36px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;

  .currency {
    font-size: 14px;
    vertical-align: super;
    margin-right: 5px;
  }

  .period {
    font-size: 16px;
    font-weight: 400;
    margin-left: 10px;
  }
}

.btn {
  margin-top: 20px;
}

.badge {
  color: #fff;
  background: var(--color-secondary);
  transform: rotate(-90deg);
  position: absolute;
  left: 0;
  top: 46px;
  padding: 7px 12px;
  font-size: 14px;
  font-weight: 400;
  border-radius: 15px 0 0 15px;
}
</style>
