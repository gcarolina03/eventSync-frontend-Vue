import { defineStore } from 'pinia'
import { api, getAddressFromLatLng } from '@/services/api'
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
      if (selectedFile) {
        formData.append('avatar', selectedFile)
      }

      const { data } = await api.post('/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

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

	const updateProfile = async (profile) => {
		try {
			if (!token.value) return
			console.log({ profile })
			const { data } = await api.put('/profile', profile, {
        headers: {
          token: token.value,
          'Content-Type': 'multipart/form-data'
        },
      })

      return data
		} catch (error) {
			console.error('Error updating user data:', error)
      throw error.response.data
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
      return data
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
  const myServices = ref([])
  const selectedService = ref(null)

  const fetchMyServices = async () => {
    try {
      if (!token.value) return
      const { data } = await api.get('/profile/services', {
        headers: {
          token: token.value,
        },
      })
      if (data.success) myServices.value = data.services
    } catch (error) {
      console.error('Error fetching user services:', error)
    }
  }

  const fetchMyService = async (serviceId) => {
    try {
      if (!token.value) return
      const { data } = await api.get(`/profile/services/${serviceId}`, {
        headers: {
          token: token.value,
        },
      })

      if (data.success) selectedService.value = data.service
      return data.service
    } catch (error) {
      console.error('Error fetching user service:', error)
    }
  }

  const createService = async (service) => {
    try {
      if (!token.value) return
      const { data } = await api.post('/profile/services', service, {
        headers: {
          token: token.value,
          'Content-Type': 'multipart/form-data'
        },
      })
      return data
    } catch (error) {
      console.error('Error creating user service:', error)
      throw error.response.data
    }
  }

  const updateService = async (serviceId, service) => {
    try {
      if (!token.value) return
      const { data } = await api.put(`/profile/services/${serviceId}`, service, { 
          headers: {
            token: token.value,
            'Content-Type': 'multipart/form-data'
          },
        }
      )

      return data
    } catch (error) {
      console.error('Error updating user service:', error)
      throw error.response.data
    }
  }

  /* CATEGORIES ------------------------------------ */
  const categories = ref([])
  const activeCategory = ref('-1')
  const locationCategoryId = ref(null)

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories', {
        headers: {
          token: token.value,
        },
      })

      if (data.success) {
        categories.value = data.categories

        const locationCategory = data.categories.find(
          (category) => category.title == 'location'
        )
        if (locationCategory) {
          locationCategoryId.value = locationCategory._id
        }
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

  /* REQUESTS  ----------------------------------- */
  const requests = ref([])

  const fetchRequests = async () => {
    try {
      const { data } = await api.get('/requests', {
        headers: {
          token: token.value,
        },
      })
      console.log({data})
      if (data.success) requests.value = data.request
    } catch (error) {
      console.error('Cannot get requests', error)
    }
  }

  const createRequest = async (eventId, serviceId) => {
    try {
      const { data } = await api.post('/requests', { eventId, serviceId }, {
        headers: {
          token: token.value,
        },
      })
      return data
    } catch (error) {
      console.error('Cannot create request', error)
      throw error.response.data
    }
  }

  const updateRequest = async (id, state) => {
    try {
      const { data } = await api.put(`/requests/${id}`, { state }, {
        headers: {
          token: token.value,
        },
      })
      return data
    } catch (error) {
      console.error('Cannot update request', error)
      throw error.response.data
    }
  }

  /* GOGGLE MAPS API ----------------------------- */
  const getAddress = async (latitude, longitude) => {
    try {
      const res = await getAddressFromLatLng(latitude, longitude)
      if (res.length > 0) {
        return res
      } else {
        throw new Error('Unable to retrieve address.')
      }
    } catch (error) {
      console.error('Cannot get address from lat lng', error)
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
		updateProfile,
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
    /* USER SERVICES */
    myServices,
    selectedService,
    fetchMyServices,
    fetchMyService,
    createService,
    updateService,
    /* CATEGORIES */
    categories,
    activeCategory,
    locationCategoryId,
    fetchCategories,
    setActiveCategory,
    /* SERVICES */
    services,
    fetchServices,
    giveReview,
    updateReview,
    /* REQUESTS */
    requests,
    fetchRequests,
    createRequest,
    updateRequest,
    /* GOOGLE MAPS API */
    getAddress,
  }
})
