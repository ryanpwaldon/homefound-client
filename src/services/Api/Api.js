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
  client.interceptors.request.use(async config => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return config
  })
  return client
}
