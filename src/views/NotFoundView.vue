<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="not-found">
    <div class="container">
      <p class="code" aria-hidden="true">404</p>
      <h1>{{ t('notFound.title') }}</h1>
      <p class="message">{{ t('notFound.message') }}</p>
      <RouterLink class="btn btn-default" :to="{ name: 'home' }">
        {{ t('notFound.backHome') }}
      </RouterLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
.not-found {
  background: var(--color-dark);
  // full-screen like the hero: reset the global section padding and let the
  // fixed navbar overlay; dvh tracks the collapsing mobile URL bar
  padding: 0;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  text-align: center;

  // auto margins center without clipping the top on very short viewports,
  // unlike align-items: center
  .container {
    margin: auto;
    padding-top: $navbar-height;
    padding-bottom: $navbar-height;
  }
}

.code {
  color: var(--color-primary);
  font-size: 96px;
  font-weight: 700;
  line-height: 1;
  margin: 0;
}

h1 {
  color: #fff;
  font-size: 28px;
  margin: 1rem 0 0.5rem;
}

.message {
  color: var(--color-muted);
  margin: 0 0 2rem;
}
</style>
