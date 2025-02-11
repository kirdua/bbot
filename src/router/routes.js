const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/weather',
    name: 'weather',
    component: () => import('@/views/Weather.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'dogsearch' },
  },
]

export default routes
