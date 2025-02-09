import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import EventsView from '@/views/EventsView.vue'
import ServicesView from '@/views/ServicesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      children: [
        { path: '/', name: 'homee', component: HomeView },
        {
          path: '/auth',
          children: [
            { path: '/auth/login', name: 'login', component: Login },
            { path: '/auth/signup', name: 'signup', component: Signup },
          ],
        },
        {
          path: '/events',
          name: 'events',
          component: EventsView,
          children: [
            { path: '/events/:id', name: 'event', component: EventsView },
          ],
        },
        {
          path: '/services',
          name: 'services',
          component: ServicesView,
          children: [
            { path: '/services/:id', name: 'service', component: ServicesView },
          ],
        },
      ],
    },
  ],
})

export default router
