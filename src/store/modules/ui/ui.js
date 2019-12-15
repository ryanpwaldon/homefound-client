export default {
  namespaced: true,
  state: {
    activeModalType: null
  },
  mutations: {
    setActiveModalType (state, value) {
      state.activeModalType = value
    }
  }
}
