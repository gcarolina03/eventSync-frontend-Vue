import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      children: [
        { path: '/', name: 'homee', component: HomeView },
        { path: '/login', name: 'login', component: Login },
        { path: '/signup', name: 'signup', component: Signup },
      ],
    },
  ],
})

export default router
