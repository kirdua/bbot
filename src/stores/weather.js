import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getWeatherByZip } from '@/apis/weather'

export const useWeatherStore = defineStore('weather', () => {
  const currentWeather = ref(null)
  const errorMessage = ref('')

  const getWeatherByZipCode = async (zipCode) => {
    try {
      const res = await getWeatherByZip({ zip: zipCode })

      if (!res.data || Object.keys(res.data).length === 0) {
        throw new Error('Invalid response from API')
      }

      currentWeather.value = res.data
      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = 'Invalid zip code or API error'
      console.error('Store Error:', error)
    }
  }

  return { currentWeather, getWeatherByZipCode, errorMessage }
})

export default useWeatherStore
