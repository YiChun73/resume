<script setup lang="ts">
import AppPreloader from '@/components/layout/AppPreloader.vue'
import BackToTopButton from '@/components/layout/BackToTopButton.vue'
import FooterSection from '@/components/layout/FooterSection.vue'
import SiteNavbar from '@/components/layout/SiteNavbar.vue'
</script>

<template>
  <AppPreloader />
  <SiteNavbar />
  <RouterView />
  <FooterSection />
  <BackToTopButton />
</template>
