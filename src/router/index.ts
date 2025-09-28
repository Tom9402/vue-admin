import { createRouter, createWebHistory } from 'vue-router'

const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
  },
]

const routes = []

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: publicRoutes,
})

export default router
