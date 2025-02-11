import http from '@/utils/http'

export const baseURL = () => http.baseURL()
export const endpoint = (path, version = '2.5') => http.endpoint(baseURL(), `${version}/${path}`)
export const endpointV3 = (path) => endpoint(path, '3.5')

export default {
  baseURL,
  endpoint,
  endpointV3,
}
