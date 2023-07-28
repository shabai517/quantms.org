import { createStore } from 'vuex'

export default createStore({
  state: {
    proteinTable: []
  },
  getters: {
  },
  mutations: {
    GETPROTEINS(state, val) {
      state.proteinTable.push(...val)
    }
  },
  actions: {
    getProteins(context, val) {
      this.commit('GETPROTEINS',val)
    }
  },
  modules: {
  
  }
})
