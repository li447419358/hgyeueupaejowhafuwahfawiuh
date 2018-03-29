/**
 * Created by Arker on 2017-04-13.
 */
import axios from 'axios';
import {checkUpdate} from './update'
import store from '../../vuex/store'
import router from '../../router'
import {setStore} from '../../config/util'
import {baseUrl} from '../../config/env'

let backCount = 0;
let currentPage = '';

//APP按键
function appkey() {
  window.plus.key.addEventListener("backbutton", function () {
    var path = store.state.route.path;

    if (!/(^\/usercenter$|^\/)/.test(path)) {
      router.go(-1)
    } else {
      if (backCount++ >= 1 && path == currentPage) {
        window.plus.runtime.quit();
      } else {
        currentPage = path;
        window.plus.nativeUI.toast("再按一次返回键关闭APP");
      }

    }

  });
}


function plusReady() {
  appkey();
  checkUpdate();

}

export const appListener = () => {
  document.addEventListener('plusready', plusReady, false);
}
