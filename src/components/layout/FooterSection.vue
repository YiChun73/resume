<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <footer class="footer">
    <div class="container">
      <span class="copyright">{{ t('footer.copyright') }}</span>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: var(--color-dark);
  padding: 40px 0;
  text-align: center;
}

.copyright {
  color: var(--color-soft);
  font-size: 14px;
}
</style>
