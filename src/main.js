import './assets/main.css'

import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from '@/i18n.config.js'
import { useStore } from '@/store'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(i18n)

const store = useStore()

// Sincroniza el idioma en i18n cuando cambia en el store
watch(
  () => store.language,
  (newLanguage) => {
    i18n.global.locale.value = newLanguage
  }
)

app.mount('#app')
