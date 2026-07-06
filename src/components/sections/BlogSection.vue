<script setup lang="ts">
import { useTemplateRef } from 'vue'

import BlogCard from '@/components/ui/BlogCard.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { useInView } from '@/composables/useInView'
import { blogPosts } from '@/data/blog'

const grid = useTemplateRef<HTMLDivElement>('grid')
const isInView = useInView(grid)
</script>

<template>
  <section id="blog">
    <div class="container">
      <SectionTitle title="Latest Posts" />

      <div ref="grid" class="row">
        <div v-for="(post, index) in blogPosts" :key="post.title" class="col-md-4 blog-col">
          <BlogCard :post="post" :index="index" :visible="isInView" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@include media-down(md) {
  .blog-col {
    max-width: calc(360px + 2 * #{$gutter});
    margin-left: auto;
    margin-right: auto;

    &:not(:last-child) {
      margin-bottom: 30px;
    }
  }
}
</style>
