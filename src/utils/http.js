import axios from 'axios'

const key = '63cb16e04b779db3673645d899c906b2'

export function baseURL() {
  return `https://api.openweathermap.org/data`
}

export function endpoint(baseURL, path) {
  return path ? `${baseURL}/${path}?appid=${key}` : baseURL
}

export function get(uri, params = {}, opts = {}) {
  return axios.get(uri, {
    ...opts,
    params,
  })
}

export default {
  baseURL,
  endpoint,
  get,
}
