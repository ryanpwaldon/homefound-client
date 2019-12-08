import Vue from 'vue'
import store from '@/store/store'
import axios from 'axios'
import qs from 'qs'

export default () => {
  const client = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: { Authorization: `Bearer ${store.state.accessToken}` }
  })
  client.interceptors.request.use(config => {
    config.paramsSerializer = params => {
      return qs.stringify(params, {
        encode: false
      })
    }
    return config
  })
  client.interceptors.request.use(config => config.url.includes('auth') ? config : new Promise(resolve => setTimeout(() => resolve(config), 500)))
  client.interceptors.response.use(
    response => response,
    error => {
      const { statusCode: code, error: message } = error.response.data
      Vue.notify({ text: `${code} ${message}`, type: 'error' })
      return Promise.reject(error)
    }
  )
  return client
}
