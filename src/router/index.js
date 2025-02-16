import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import EventsView from '@/views/events/EventsView.vue'
import ServicesView from '@/views/ServicesView.vue'
import { useStore } from '@/store'
import EventView from '@/views/events/EventView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      children: [
        { path: '/', name: 'home', component: HomeView },
        {
          path: '/auth',
          children: [
            { path: '/auth/login', name: 'login', component: Login },
            { path: '/auth/signup', name: 'signup', component: Signup },
          ],
        },
        {
          path: '/events',
          meta: { requiresAuth: true },
          children: [
            { path: '/events', name: 'events', component: EventsView },
            { path: '/events/:id', name: 'event', component: EventView },
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

router.beforeEach((to, from, next) => {
  const store = useStore()
  const isAuthenticated = store.token !== null

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' }) 
  } else {
    next()
  }
})

export default router
