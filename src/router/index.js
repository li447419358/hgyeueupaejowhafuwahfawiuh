import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'

import login from '../views/login'
import index from '../views/index'
import usercenter from '../views/usercenter'
import register from '../views/register'


Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    component: index
  },

    {
      path: '/login',
      component: login
    },{
      path: '/register',
      component: register
    },
    {
      path: '/usercenter',
      component: usercenter
    }
  ]
});
router.beforeEach(function (to, from, next) {
  store.dispatch('setLoading', true);
  next();
});
export default router;
