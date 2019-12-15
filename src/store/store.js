import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user/user'
import ui from './modules/ui/ui'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    ui
  }
})
