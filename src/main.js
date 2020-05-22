import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/router'
import vueNumeral from 'vue-numeral-filter'
import vueNotification from 'vue-notification'
import vueAsyncComputed from 'vue-async-computed'
import vueHoneybadger from '@honeybadger-io/vue'
import vueContainScroll from '@/directives/vue-contain-scroll'
import vueSegmentAnalytics from 'vue-segment-analytics'
import vueMoment from 'vue-moment'
import vueMeta from 'vue-meta'
import store from '@/store/store'
import loadJS from 'load-js'
import { getRole } from '@/constants/roles/roles'
import '@/assets/css/main.scss'
import '@/config/config'

void (async () => {
  await loadJS('https://js.stripe.com/v3/')
  window.stripe = window.Stripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY)
  window.UPLOADCARE_MANUAL_START = true
  Vue.prototype.$getRole = getRole
  Vue.config.productionTip = false
  Vue.use(vueMeta)
  Vue.use(vueMoment)
  Vue.use(vueContainScroll)
  Vue.use(vueAsyncComputed)
  Vue.use(vueNumeral, { locale: 'en-au' })
  Vue.use(vueNotification, { componentName: 'Notify' })
  Vue.use(vueHoneybadger, { apiKey: process.env.VUE_APP_HONEYBADGER_API_KEY, environment: process.env.VUE_APP_ENV, developmentEnvironments: ['development'] })
  Vue.use(vueSegmentAnalytics, { id: process.env.VUE_APP_SEGMENT_WRITE_KEY })
  if (store.state.user.accessToken) await store.dispatch('user/checkAuthStatus')
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})()
