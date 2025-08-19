import { createRouter, createWebHistory } from 'vue-router';

import { APP_BASE_PATH } from '@/config/env';
const router = createRouter({
  history: createWebHistory(APP_BASE_PATH),
  routes: [
    {
      path: '/',
      name: 'Fe Asignment App',
      component: () => import('../views/Home.vue')
    }
  ]
});

export default router;
