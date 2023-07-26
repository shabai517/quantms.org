import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../layout'),
    children: [
      {
        path: 'information',
        name: 'information',
        component: () => import('@/views/information')
      },
      {
        path: 'view',
        name: 'overview',
        component: () => import('@/views/overview')
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
