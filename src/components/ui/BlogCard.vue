<script setup lang="ts">
import type { BlogPost } from '@/data/blog'

defineProps<{
  post: BlogPost
  /** stagger position used for the reveal delay */
  index: number
  visible: boolean
}>()
</script>

<template>
  <article
    class="blog-item rounded bg-white shadow-dark reveal reveal--fade"
    :class="{ 'is-visible': visible }"
    :style="{ animationDelay: `${200 + index * 200}ms` }"
  >
    <div class="thumb">
      <a :href="post.url">
        <span class="category">{{ post.category }}</span>
      </a>
      <a :href="post.url">
        <img :src="post.image" :alt="post.title" />
      </a>
    </div>
    <div class="details">
      <h4 class="title">
        <a :href="post.url">{{ post.title }}</a>
      </h4>
      <ul class="list-inline meta">
        <li class="list-inline-item">{{ post.date }}</li>
        <li class="list-inline-item">{{ post.author }}</li>
      </ul>
    </div>
  </article>
</template>

<style scoped lang="scss">
.blog-item {
  overflow: hidden;
  transform: translateY(0);
  transition: var(--transition-base);

  &:hover {
    transform: translateY(-10px);
  }
}

.thumb {
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    transform: scale(1);
    transition: var(--transition-base);
  }

  &:hover img {
    transform: scale(1.1);
  }
}

.category {
  background: var(--color-primary);
  border-radius: 0 0 15px 15px;
  color: #fff;
  font-size: 14px;
  padding: 2px 8px;
  position: absolute;
  left: 20px;
  top: 0;
  z-index: 1;
}

.details {
  padding: 20px;

  .title {
    font-size: 20px;
    margin: 0;

    a {
      color: var(--color-dark);

      &:hover {
        color: var(--color-primary);
      }
    }
  }
}

.meta {
  font-size: 14px;
  color: var(--color-muted);
  margin-top: 0.5rem;

  li:not(:last-child) {
    margin-right: 0.6rem;

    &::after {
      content: '';
      background: var(--color-muted);
      border-radius: 50%;
      display: inline-block;
      height: 3px;
      width: 3px;
      margin-left: 0.6rem;
      vertical-align: middle;
    }
  }
}
</style>
