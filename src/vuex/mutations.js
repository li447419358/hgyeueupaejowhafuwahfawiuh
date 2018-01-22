import {getStore2JSON, setStore} from '../config/util'

export default {
  //获取用户信息存入vuex
  SET_USER_INFO(state, info) {
    state.userInfo = info;
    setStore("userInfo", info)
  },
  SET_CID(state, info) {
    state.cid = info;
  },
  updateLoadingStatus(state, payload) {
    state.isLoading = payload
  },
  setDepot(state, depot) {
    state.depot = depot
    setStore("wms_depot", depot)
  },
  addCargoToCart(state, item) {
    if (state.cargos.length > 0) {
      var cargo = state.cargos.filter(cargo => {
        return cargo.id == item.id
      });
      if (cargo.length == 0) {
        state.cargos.push(item);
      }
    } else {
      state.cargos.push(item);
    }


  },
  delCargoFromCart(state, item) {
    var cargo = state.cargos.filter(cargo => {
      return cargo.id == item.id
    });
    if (cargo.length > 0) {
      var index = '';
      var i = state.cargos.length;
      while (i -= 1) {
        if (state.cargos[i] == cargo) {
          index = i;
        }
      }
      state.cargos.splice(index, 1);
    }

  },
  clearCargoFromCart(state) {
    state.cargos = [];

  }
}
