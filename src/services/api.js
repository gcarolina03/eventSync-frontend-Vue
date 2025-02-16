import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 3000,
})

export const getAddressFromLatLng = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_KEY_MAP}`
    )

    if (response.data.results.length > 0) {
      const { address_components } = response.data.results[0]
      return address_components
    } else {
      throw new Error('Unable to retrieve address.')
    }
  } catch (error) {
    console.error(error)
  }
}
