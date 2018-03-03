<template>
  <div style="height: 100%;" id="main_page">
    <keep-alive>
      <router-view class="router-view"></router-view>
    </keep-alive>
    <tabbar ref="footer" slot="bottom" v-show="!showFooter">
      <tabbar-item :link="{path:'/'}" :selected="route.path === '/'">
        <i slot="icon" class="iconfont  icon-xiangmu"></i>
        <span slot="label">项目列表</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/usercenter'}" :selected="route.path === '/usercenter'">
        <i slot="icon" class="iconfont icon-iconfontzhizuobiaozhun023104"></i>
        <span slot="label">我的账户</span>
      </tabbar-item>
    </tabbar>
    <loading :show="isLoading"></loading>
  </div>
</template>

<script>
  import {
    mapState
  } from "vuex"
  import {
    XHeader,
    Tabbar,
    TabbarItem,
    ViewBox,
    Loading
  } from 'vux'

  export default {
    components: {
      XHeader,
      Tabbar,
      TabbarItem,
      ViewBox,
      Loading
    },
    data() {
      return {
        bottomNav: 'index'
      }
    },
    computed: {
      ...mapState({userInfo: state => state.userInfo,
        depotId: state => state.depot ? state.depot.id : '',
        cargoType: state => state.depot ? state.depot.cargoType : "",
        isLoading: state => state.isLoading,
        route: state => state.route
      }),
      showFooter() {
        var login = /login/.test(this.route.path); //登录页
        var register = /register/.test(this.route.path); //盘点
        return login || register
      }


    },
    methods: {}
  }
</script>
<style lang="less">
  @import '~vux/src/styles/close';
</style>

<style lang="scss">
  @import './assets/css/style.scss';
</style>
