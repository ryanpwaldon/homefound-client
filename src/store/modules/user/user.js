import Vue from 'vue'
import AuthService from '@/services/Api/services/AuthService/AuthService'

export default {
  namespaced: true,
  state: {
    user: {},
    accessToken: localStorage.getItem('accessToken') || null
  },
  getters: {
    roles (state) {
      return (state.user && state.user.roles) || [Vue.prototype.$getRole('GUEST')]
    },
    notifications (state) {
      return (state.user && state.user.notifications) || []
    }
  },
  mutations: {
    setUser (state, value) {
      state.user = value
    },
    setAccessToken (state, value) {
      state.accessToken = value
    }
  },
  actions: {
    async checkAuthStatus ({ dispatch }) {
      try {
        const { user, accessToken } = await AuthService.checkAuthStatus()
        dispatch('loginSuccess', { user, accessToken })
      } catch (error) {
        dispatch('logout')
        console.log(error)
      }
    },
    loginSuccess ({ commit }, { user, accessToken }) {
      commit('setUser', user)
      commit('setAccessToken', accessToken)
      localStorage.setItem('accessToken', accessToken)
      Vue.prototype.$segment.identify(user.id)
      Vue.prototype.$honeybadger.setContext({ userId: user.id, email: user.email })
    },
    logout ({ commit }) {
      commit('setUser', {})
      commit('setAccessToken', null)
      localStorage.removeItem('accessToken')
      Vue.prototype.$segment.reset()
      Vue.prototype.$honeybadger.resetContext()
    }
  }
}
