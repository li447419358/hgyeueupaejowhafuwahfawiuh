export default {
  setUserInfo({commit}, info) {
    commit('SET_USER_INFO', info)
  },
  setDfund({commit}, info) {
    commit('SET_DFUND', info)
  },
  setLoading({commit}, state) {
    commit('updateLoadingStatus', state)
  }
}
