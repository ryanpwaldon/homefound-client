import Vue from 'vue'
import AuthService from '@/services/Api/services/AuthService/AuthService'

export default {
  namespaced: true,
  state: {
    user: null,
    accessToken: localStorage.getItem('accessToken') || null
  },
  getters: {
    roles (state) {
      return (state.user && state.user.roles) || [Vue.prototype.$getRole('GUEST')]
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
    },
    logout ({ commit }) {
      commit('setUser', null)
      commit('setAccessToken', null)
      localStorage.removeItem('accessToken')
      Vue.prototype.$segment.reset()
    }
  }
}
