import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    /** view owns the full viewport; App.vue drops the site footer */
    hideFooter?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // GitHub Pages serves index.html as a real file, so this URL reaches the
    // app; without the redirect it would fall through to the 404 view.
    {
      path: '/index.html',
      redirect: { name: 'home' },
    },
    // Unreachable on the static host (404.html answers before the app loads)
    // but real under the dev server's SPA fallback.
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { hideFooter: true },
    },
  ],
})

export default router
