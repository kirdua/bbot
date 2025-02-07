const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'dogsearch' },
  },
]

export default routes
