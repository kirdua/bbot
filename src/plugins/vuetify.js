// Styles
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/util/colors'
import 'vuetify/styles'

const myCustomTheme = {
  dark: true,
  colors: {
    black: '#0d0d0d',
    orange: '#ec6013',
    'dark-grey': '#323131',
    brown: '#5e4f49',
    tan: '#c4c3c2',
    'light-green': '#848c89',
    green: '#434c47',
    'light-grey': '#84848c',
    grey: '#44444c',
    'dark-green': '#232c28',
    'neon-green': '#28FF00',
    red: '#BD2000',
    'text-orange': '#ec6013',
  },
}

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme,
    },
    options: {
      customProperties: true,
    },
  },
})
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
