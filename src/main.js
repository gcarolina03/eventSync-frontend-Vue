import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'

import en from './i18n/en.json'
import es from './i18n/es.json'

const messages = { en, es }
const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'en',
  messages,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(i18n)
app.mount('#app')
