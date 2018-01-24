export default {
  setUserInfo({commit}, info) {
    commit('SET_USER_INFO', info)
  },
  setLoading({commit}, state) {
    commit('updateLoadingStatus', state)
  }
}
