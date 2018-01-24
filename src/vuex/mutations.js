import {setSessionStorage} from '../config/util'

export default {
  //获取用户信息存入vuex
  SET_USER_INFO(state, info) {
    state.userInfo = info;
    setSessionStorage("userInfo", info)
  },
  updateLoadingStatus(state, payload) {
    state.isLoading = payload
  },
}
