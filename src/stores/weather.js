import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getWeatherByZip } from '@/apis/weather'

export const useWeatherStore = defineStore('weather', () => {
  const currentWeather = ref(null)
  const errorMessage = ref('')

  const getWeatherByZipCode = async (zipCode) => {
    try {
      console.log('Fetching weather for zip:', zipCode) // ✅ Debug log
      const res = await getWeatherByZip({ zip: zipCode })

      console.log('Weather API Response:', res.data) // ✅ Debug response

      if (!res.data || Object.keys(res.data).length === 0) {
        throw new Error('Invalid response from API')
      }

      currentWeather.value = res.data // ✅ Correctly updating reactive state
      errorMessage.value = '' // ✅ Reset error message if successful
    } catch (error) {
      errorMessage.value = 'Invalid zip code or API error'
      console.error('Store Error:', error)
    }
  }

  return { currentWeather, getWeatherByZipCode, errorMessage }
})

export default useWeatherStore
