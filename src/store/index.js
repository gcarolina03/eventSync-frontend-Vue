import { defineStore } from 'pinia'
import api from '@/services/api'
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'

export const useStore = defineStore('store', () => {
  const token = useStorage('token', null, localStorage)
  const user = useStorage('user.profile', null, localStorage, {
    serializer: { read: JSON.parse, write: JSON.stringify },
  })

  /* AUTH-------------------------------------- */
  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password })
      user.value = data.user
      token.value = data.token
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

      const { data } = await api.post('/api/auth/signup', formData)

      if (data.token) {
        token.value = data.token
        user.value = data.user
      }

      return data
    } catch (error) {
      console.error('Cannot Sign up:', error)
      throw error
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
  }

  /* USERS -------------------------------------- */
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

  /* CATEGORIES -------------------------------------- */
  const categories = ref([])
  const activeCategory = ref('all')

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories', {
        headers: {
          token: token.value,
        },
      })
      categories.value = data.categories
    } catch (error) {
      console.error('Cannot get categories', error)
    }
  }

  const setActiveCategory = (id) => {
    activeCategory.value = id
  }

  /* SERVICES  -------------------------------------- */
  const services = ref([])

  const fetchServices = async () => {
    try {
      const { data } = await api.get('/services')
      services.value = data.services
    } catch (error) {
      console.error('Cannot get services', error)
    }
  }

  /* SERVICE REVIEWS ----- */
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
    /* AUTH */
    user,
    token,
    login,
    signup,
    logout,
    /* USER */
    fetchProfile,
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
