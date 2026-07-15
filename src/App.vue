<script setup lang="ts">
import { useRoute } from 'vue-router'

import AppPreloader from '@/components/layout/AppPreloader.vue'
import BackToTopButton from '@/components/layout/BackToTopButton.vue'
import FooterSection from '@/components/layout/FooterSection.vue'
import SiteNavbar from '@/components/layout/SiteNavbar.vue'

const route = useRoute()
</script>

<template>
  <AppPreloader />
  <SiteNavbar />
  <RouterView />
  <FooterSection v-if="!route.meta.hideFooter" />
  <BackToTopButton />
</template>
