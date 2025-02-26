import { createI18n } from 'vue-i18n'

/* ENGLISH */
import navbarEn from '@/locales/en/navbar.json'
import authEn from '@/locales/en/auth.json'
import dashboardEn from '@/locales/en/dashboard.json'
import categoriesEn from '@/locales/en/categories.json'
import FooterEn from '@/locales/en/footer.json'
import ErrorsEn from '@/locales/en/errors.json'
import FormsEn from '@/locales/en/forms.json'
import ServicesEn from '@/locales/en/services.json'
import EventsEn from '@/locales/en/events.json'
import TestimonialsEn from '@/locales/en/testimonials.json'
import RequestsEn from '@/locales/en/requests.json'
import NotificationsEn from '@/locales/en/notifications.json'

/* SPANISH */
import navbarEs from '@/locales/es/navbar.json'
import authEs from '@/locales/es/auth.json'
import dashboardEs from '@/locales/es/dashboard.json'
import categoriesEs from '@/locales/es/categories.json'
import FooterEs from '@/locales/es/footer.json'
import ErrorsEs from '@/locales/es/errors.json'
import FormsEs from '@/locales/es/forms.json'
import ServicesEs from '@/locales/es/services.json'
import EventsEs from '@/locales/es/events.json'
import TestimonialsEs from '@/locales/es/testimonials.json'
import RequestsEs from '@/locales/es/requests.json'
import NotificationsEs from '@/locales/es/notifications.json'

const defaultLocale = localStorage.getItem('language') || 'es'

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages: {
    en: {
      ...navbarEn,
      ...authEn,
      ...dashboardEn,
      ...categoriesEn,
      ...FooterEn,
      ...ErrorsEn,
      ...FormsEn,
      ...ServicesEn,
      ...EventsEn,
			...TestimonialsEn,
      ...RequestsEn,
      ...NotificationsEn
    },
    es: {
      ...navbarEs,
      ...authEs,
      ...dashboardEs,
      ...categoriesEs,
      ...FooterEs,
      ...ErrorsEs,
      ...FormsEs,
      ...ServicesEs,
      ...EventsEs,
			...TestimonialsEs,
      ...RequestsEs,
      ...NotificationsEs
    },
  },
})

export default i18n
