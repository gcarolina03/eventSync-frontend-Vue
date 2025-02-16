import { defineStore } from 'pinia'
import api from '@/services/api'
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'

export const useStore = defineStore('store', () => {
  const language = useStorage('language', 'es', localStorage)
  const token = useStorage('token', null, localStorage)
  const user = useStorage('user.profile', null, localStorage, {
    serializer: { read: JSON.parse, write: JSON.stringify },
  })

  /* LANGUAGE -------------------------------------- */
  const updateLanguage = (newLanguage) => {
    language.value = newLanguage
  }

  /* AUTH ------------------------------------------ */
  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password })
      if (data.token) {
        user.value = data.user
        token.value = data.token
      }

      return data
    } catch (error) {
      console.error('Error logging in:', error)
      throw error.response.data
    }
  }

  const signup = async (firstName, lastName, email, password, selectedFile) => {
    try {
      const formData = new FormData()
      formData.append('first_name', firstName)
      formData.append('last_name', lastName)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('avatar', selectedFile)

      const { data } = await api.post('/auth/signup', formData)

      if (data.token) {
        token.value = data.token
        user.value = data.user
      }

      return data
    } catch (error) {
      console.error('Cannot Sign up:', error)
      throw error.response.data
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
  }

  /* USERS ----------------------------------------- */
  const fetchProfile = async () => {
    try {
      if (!token.value) return
      const { data } = await api.get('/profile', {
        headers: {
          token: token.value,
        },
      })
      user.value = data.user
    } catch (error) {
      console.error('Error fetching user data:', error)
      logout()
    }
  }

  /* USER EVENTS ----------------------------------- */
  const events = ref([])
  const selectedEvent = ref(null)

  const fetchEvents = async () => {
    try {
      if (!token.value) return
      const { data } = await api.get('/events', {
        headers: {
          token: token.value,
        },
      })
      events.value = data.events
    } catch (error) {
      console.error('Error fetching user events:', error)
    }
  }

  const fetchEvent = async (eventId) => {
    try {
      if (!token.value) return
      const { data } = await api.get(`/events/${eventId}`, {
        headers: {
          token: token.value,
        },
      })

      selectedEvent.value = data.event
      return data.event
    } catch (error) {
      console.error('Error fetching user event:', error)
    }
  }

  const createEvent = async (event) => {
    try {
      if (!token.value) return
      const { data } = await api.post('/events', event, {
        headers: {
          token: token.value,
        },
      })
      return data.event
    } catch (error) {
      console.error('Error creating user event:', error)
      throw error.response.data
    }
  }

  const deleteEvent = async (eventId) => {
    try {
      if (!token.value) return
      const { data } = await api.delete(`/events/${eventId}`, {
        headers: {
          token: token.value,
        },
      })

      return data
    } catch (error) {
      console.error('Error deleting user event:', error)
      throw error.response.data
    }
  }

  /* GUESTS LIST ----------------------------------- */
  const addGuest = async (eventId, name, phone, number) => {
    try {
      if (!token.value) return
      console.log({ token: token.value })
      console.log({ eventId })
      const { data } = await api.put(
        `/events/${eventId}/guest`,
        { name, phone, number },
        {
          headers: {
            token: token.value,
          },
        }
      )

      return data
    } catch (error) {
      console.error('Error adding guest to event:', error)
      throw error.response.data
    }
  }
  const removeGuest = async (eventId, guestId) => {
    try {
      if (!token.value) return
      const { data } = await api.delete(`/events/${eventId}/guest/${guestId}`, {
        headers: {
          token: token.value,
        },
      })

      return data
    } catch (error) {
      console.error('Error deleting guest from event:', error)
      throw error.response.data
    }
  }

  /* USER SERVICES --------------------------------- */

  /* CATEGORIES ------------------------------------ */
  const categories = ref([])
  const activeCategory = ref('-1')

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories', {
        headers: {
          token: token.value,
        },
      })

      if (data.success) {
        categories.value = data.categories
      } else {
        console.error('Cannot get categories', data)
      }
    } catch (error) {
      console.error('Cannot get categories', error)
    }
  }

  const setActiveCategory = (id) => {
    activeCategory.value = id
  }

  /* SERVICES  ------------------------------------- */
  const services = ref([])

  const fetchServices = async () => {
    try {
      const { data } = await api.get('/services')

      if (data.success) {
        services.value = data.services
      } else {
        console.error('Cannot get services', data)
      }
    } catch (error) {
      console.error('Cannot get services', error)
    }
  }

  /* SERVICE REVIEWS ------------------------------- */
  const giveReview = async (serviceId, thumb) => {
    try {
      const { data } = await api.post(
        '/reviews',
        { serviceId, thumb },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )
      return data
    } catch (error) {
      console.error('Cannot create reviews', error)
    }
  }

  const updateReview = async (id, thumb) => {
    try {
      const { data } = await api.put(
        `/reviews/${id}`,
        { thumb },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )
      return data
    } catch (error) {
      console.error('Cannot update reviews', error)
    }
  }

  return {
    /* LANGUAGE */
    language,
    updateLanguage,
    /* AUTH */
    user,
    token,
    login,
    signup,
    logout,
    /* USER */
    fetchProfile,
    /* USER EVENTS */
    events,
    selectedEvent,
    fetchEvents,
    fetchEvent,
    createEvent,
    deleteEvent,
    /* GUESTS LIST */
    addGuest,
    removeGuest,
    /* CATEGORIES */
    categories,
    activeCategory,
    fetchCategories,
    setActiveCategory,
    /* SERVICES */
    services,
    fetchServices,
    giveReview,
    updateReview,
  }
})
