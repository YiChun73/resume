<script setup lang="ts">
import { profile } from '@/data/profile'
</script>

<template>
  <footer class="footer">
    <div class="container">
      <span class="copyright">{{ profile.copyright }}</span>
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
