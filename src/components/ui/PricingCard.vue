<script setup lang="ts">
import { computed } from 'vue'

import type { PricingPlan } from '@/data/pricing'

const props = defineProps<{
  plan: PricingPlan
}>()

const isBest = computed(() => Boolean(props.plan.badge))
</script>

<template>
  <div class="price-item bg-white rounded shadow-dark text-center" :class="{ best: isBest }">
    <span v-if="plan.badge" class="badge">{{ plan.badge }}</span>
    <img :src="plan.image" :alt="plan.name" width="70" height="81" />
    <h2 class="plan">{{ plan.name }}</h2>
    <p>{{ plan.description }}</p>
    <p>{{ plan.support }}</p>
    <h3 class="price"><em>$</em>{{ plan.price }}<span>Month</span></h3>
    <a href="#" class="btn btn-default">Get Started</a>
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
}

.price {
  font-size: 36px;
  font-weight: 700;
  margin: 0;

  em {
    font-style: normal;
    font-size: 14px;
    vertical-align: super;
    margin-right: 5px;
  }

  span {
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
