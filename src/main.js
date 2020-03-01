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

// (async () => {
//   Vue.config.productionTip = false
//   Vue.use(vueContainScroll)
//   Vue.use(vueNumeral, { locale: 'en-au' })
//   Vue.use(vueNotification, { componentName: 'Notify' })
//   Vue.use(vueMoment)
//   if (store.state.user.accessToken) await store.dispatch('user/checkAuthStatus')
//   new Vue({
//     router,
//     store,
//     render: h => h(App)
//   }).$mount('#app')
// })()

Vue.config.productionTip = false
Vue.use(vueContainScroll)
Vue.use(vueNumeral, { locale: 'en-au' })
Vue.use(vueNotification, { componentName: 'Notify' })
Vue.use(vueMoment)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
