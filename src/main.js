import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/router'
import vueNumeral from 'vue-numeral-filter'
import vueNotification from 'vue-notification'
import vueContainScroll from '@/directives/vue-contain-scroll'
import vueMoment from 'vue-moment'
import store from '@/store/store'
import '@/assets/css/main.scss'
import '@/config/config'
import loadJS from 'load-js'

void (async () => {
  await loadJS('https://js.stripe.com/v3/')
  window.stripe = window.Stripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY)
})()

void (async () => {
  window.UPLOADCARE_MANUAL_START = true
  Vue.config.productionTip = false
  Vue.use(vueContainScroll)
  Vue.use(vueNumeral, { locale: 'en-au' })
  Vue.use(vueNotification, { componentName: 'Notify' })
  Vue.use(vueMoment)
  if (store.state.user.accessToken) await store.dispatch('user/checkAuthStatus')
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})()
