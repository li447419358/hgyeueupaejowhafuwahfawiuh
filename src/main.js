// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {
  LoadingPlugin, ToastPlugin, AlertPlugin, ConfirmPlugin
} from 'vux'
import FastClick from 'fastclick'
import {sync} from 'vuex-router-sync'
import App from './App'
import router from './router'
import store from './vuex/store'
import {getUserInfo} from './config/apis'
import vueFinger from "vue-finger"
import {appListener} from './assets/js/common'
import MyComponents from './components/'
Vue.use(MyComponents);

Vue.use(vueFinger)
FastClick.attach(document.body);
Vue.config.productionTip = false ;
sync(store, router);
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin);
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
appListener();
Vue.prototype.getIndex = function (arr, val) {
  let i = arr.length;
  while (i -= 1) {
    if (arr[i] === val) {
      return i;
    }
  }
  return false;
};


/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');


// 输入框在虚拟键盘弹出时，自动滚动到可见位置
document.body.addEventListener('click', function (event) {
  let element = event.target;
  let tags = {
    'INPUT': 1,
    'TEXTAREA': 1,
  }
  if ((element.tagName in tags)) {
    setTimeout(function () {
      element.scrollIntoViewIfNeeded();

    }, 400);
  }
}, false);
