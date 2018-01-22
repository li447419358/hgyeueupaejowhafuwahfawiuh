export default {
  setUserInfo({commit}, info) {
    commit('SET_USER_INFO', info)
  },
  setLoading({commit}, state) {
    commit('updateLoadingStatus', state)
  },
  setDepot({commit}, depot) {
    commit('setDepot', depot)
  },
  addCargo({commit}, item) {
    commit('addCargoToCart', item)
  },
  delCargo({commit}, item) {
    commit('delCargoFromCart', item)
  },
  clearCargo({commit}) {
    commit('clearCargoFromCart')
  }
}
