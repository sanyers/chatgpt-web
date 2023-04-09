import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { title } from '../config'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '聊天',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about/index.vue'),
    meta: {
      title: '关于',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

document.title = title
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta?.title + ' - ' + title
  }
  next()
})

export default router
