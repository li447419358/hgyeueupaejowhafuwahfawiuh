import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getter'
import {getStore2JSON, getStore} from '../config/util'

Vue.use(Vuex);
const state = {
  userInfo: getStore2JSON("userInfo") ? getStore2JSON("userInfo") : {
    email: "",
    id: '',
    password: '',
    phoneNumber: "",
    roleId: '',
    userName: "",
  }, //用户信息
  isLoading: true,
  cid: '',
  cargos: [],
  depot: getStore2JSON("wms_depot") ? getStore2JSON("wms_depot") : "",
}

export default new Vuex.Store({
  getters,
  state,
  actions,
  mutations
});
