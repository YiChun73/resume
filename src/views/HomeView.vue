<script setup lang="ts">
import AboutSection from '@/components/sections/AboutSection.vue'
import BlogSection from '@/components/sections/BlogSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import PortfolioSection from '@/components/sections/PortfolioSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
</script>

<template>
  <main>
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <ExperienceSection />
    <PortfolioSection />
    <BlogSection />
    <ContactSection />
  </main>
</template>

<style scoped lang="scss">
main {
  padding-bottom: 96px;
}
</style>
