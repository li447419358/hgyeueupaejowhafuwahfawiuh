import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getter'
import {getSessionStorage2JSON} from '../config/util'

Vue.use(Vuex);
const state = {
  userInfo: getSessionStorage2JSON("userInfo") ? getSessionStorage2JSON("userInfo") : {}, //用户信息
  isLoading: true,
}

export default new Vuex.Store({
  getters,
  state,
  actions,
  mutations
});
