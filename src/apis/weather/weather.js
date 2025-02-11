import http from '@/utils/http'
import { endpoint, endpointV3, baseURL } from './_utils'

export function getWeatherByZip({ zip }) {
  return http.get(endpoint('weather'), { zip })
}
