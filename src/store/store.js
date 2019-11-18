import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from '@/services/Api/services/AuthService/AuthService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    accessToken: localStorage.getItem('accessToken') || null
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
      try { const { user, accessToken } = await AuthService.checkAuthStatus(); dispatch('loginSuccess', { user, accessToken }) }
      catch (error) { dispatch('logout'); console.log(error) }
    },
    loginSuccess ({ commit }, { user, accessToken }) {
      commit('setUser', user)
      commit('setAccessToken', accessToken)
      localStorage.setItem('accessToken', accessToken)
    },
    logout ({ commit }) {
      commit('setUser', null)
      commit('setAccessToken', null)
      localStorage.removeItem('accessToken')
    }
  },
  modules: {
  }
})
