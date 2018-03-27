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
  // var first = null;
  window.plus.key.addEventListener("backbutton", function () {

    //首次按键，提示‘再按一次退出应用’
    /*    if (!first) {
          first = new Date().getTime();
          window.plus.nativeUI.toast("再按一次返回键关闭APP");
          setTimeout(function () {
            first = null;
          }, 1000);
        } else {
          if (new Date().getTime() - first < 1000) {
            window.plus.runtime.quit();
          }
        }*/

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
