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

    if (!/(^\/$|^\/login$|^\/usercenter$|^\/search$)/.test(path)) {
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

function getMessage() {
  // ios-当前应用不在线，服务器推送的消息会进入系统消息中心。当用户点击消息，则会启动HTML5+应用，并且在监听了“click”事件的页面中触发事件的回调
  // 安卓-监听点击消息事件，app在运行
  plus.push.addEventListener("click", function (msg) {
    var payload = (plus.os.name == 'iOS') ? msg.payload : JSON.parse(msg.payload);
    pushGetRun(payload);
  }, false);
  // 安卓-不符指定合格式的透传消息不会进入系统的消息中心，会在监听“receive”事件的页面触发事件回调
  //IOS 应用在线时服务器推送的消息不会进入消息中心。如果页面中监听了“receive”事件则会触发事件的回调
  plus.push.addEventListener("receive", function (msg) {
    var msg = (plus.os.name == 'iOS') ? msg : JSON.parse(msg);
    if (msg.payload) {
      plus.push.createMessage(msg.content, msg.payload);
    }
  }, false);
}

function pushGetRun(payload) {
  var id = payload.id;
  var url = '/entry_containerlist/?id=' + id
  router.push(url);

}

function plusReady() {
  appkey();
  checkUpdate();
  // getMessage();

}

export const appListener = () => {
  document.addEventListener('plusready', plusReady, false);
}
