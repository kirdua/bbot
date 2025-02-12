<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useWeatherStore } from '@/stores/weather'
import moment from 'moment' // For formatting sunrise/sunset times

const weatherStore = useWeatherStore()
const zipCode = ref('')
const loading = ref(false)

const weather = computed(() => weatherStore.currentWeather)

const formatTemp = (temp) => (temp ? (((temp - 273.15) * 9) / 5 + 32).toFixed(1) : '--')

// Converts Unix timestamp to readable time
const formatTime = (timestamp) => (timestamp ? moment.unix(timestamp).format('hh:mm A') : '--')

const fetchWeather = async () => {
  if (!zipCode.value) return

  loading.value = true
  await weatherStore.getWeatherByZipCode(zipCode.value)
  loading.value = false
}

onUnmounted(() => {
  weatherStore.currentWeather = null
  weatherStore.errorMessage = ''
})
</script>

<template>
  <v-container fluid>
    <!-- Heading -->
    <v-row>
      <v-col cols="12" md="4">
        <h1 class="text-orange">Weather</h1>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="zipCode"
          label="Zip Code"
          outlined
          dense
          @keyup.enter="fetchWeather"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-btn @click="fetchWeather" :loading="loading" color="orange">Get Weather</v-btn>
      </v-col>
    </v-row>

    <v-divider class="my-4" />

    <!-- Loading Indicator -->
    <div v-if="loading">
      <v-progress-linear color="yellow-darken-2" indeterminate></v-progress-linear>
    </div>

    <!-- Weather Info -->
    <v-row v-else-if="weather">
      <v-col cols="12" md="6" class="text-center">
        <v-card class="pa-4" outlined>
          <h2>{{ weather.name }}, {{ weather.sys?.country }}</h2>
          <v-img
            v-if="weather.weather?.length"
            :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
            alt="Weather Icon"
            contain
            height="100"
          ></v-img>
          <p class="text-h5 font-weight-bold">{{ formatTemp(weather.main?.temp) }}°F</p>
          <p class="text-subtitle-1">{{ weather.weather[0]?.description }}</p>
        </v-card>
      </v-col>

      <!-- Weather Details -->
      <v-col cols="12" md="6">
        <v-card class="pa-4" outlined>
          <v-list dense>
            <v-list-item>
              <v-list-item-icon><v-icon color="blue">mdi-water-percent</v-icon></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Humidity: {{ weather.main?.humidity }}%</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon><v-icon color="green">mdi-weather-windy</v-icon></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Wind: {{ weather.wind?.speed }} m/s</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon><v-icon color="grey">mdi-weather-cloudy</v-icon></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Cloud Cover: {{ weather.clouds?.all }}%</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon
                ><v-icon color="orange">mdi-weather-sunset-up</v-icon></v-list-item-icon
              >
              <v-list-item-content>
                <v-list-item-title
                  >Sunrise: {{ formatTime(weather.sys?.sunrise) }}</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon
                ><v-icon color="orange-darken-2">mdi-weather-sunset-down</v-icon></v-list-item-icon
              >
              <v-list-item-content>
                <v-list-item-title>Sunset: {{ formatTime(weather.sys?.sunset) }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- Error Message -->
    <v-row v-if="weatherStore.errorMessage">
      <v-col cols="12">
        <v-alert type="error">
          {{ weatherStore.errorMessage }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>
