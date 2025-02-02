import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
			children: [
				{ path: '/', name: 'homee', component: HomeView}
			]
    },
  ],
})

export default router
