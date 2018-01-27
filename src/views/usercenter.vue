<template>
  <div style="height: 100%;">
    <div class="userHeader">
      <x-header :left-options="{showBack: false,backText: ''}" class="header">个人中心</x-header>
      <div class="userAvatar">
        <img src="../../static/img/avatar.jpg">
      </div>
      <div class="userInfo">
        <div class="item fl text-right">{{userMsg.userName}}</div>
        <div class="item fr text-right">
          {{userInfo.name}}
          <p>{{userInfo.tel}}</p>
        </div>
      </div>
      <img class="userHeaderImg" src="../../static/img/bg.png" alt="">
    </div>
    <div class="userZone">
      <flexbox>
        <flexbox-item class="userZone-item">
          <p class="value text-danger">{{userInfo.value}}</p>
          <p class="label">份额（元）</p>
        </flexbox-item>
        <flexbox-item class="userZone-item">
          <p class="value">20000</p>
          <p class="label">资产总额（元）</p>
        </flexbox-item>
      </flexbox>
    </div>

    <group class="usercenter_bd" :gutter="5">
      <cell @click.native="docheckUpdate" class="update" :value="version">
                <span slot="icon">
                    <i class="iconfont icon-icon103"></i>
                </span>
        <span slot="title">
                    检查新版本
                    <badge v-if="update" slot="after-title"></badge>
                </span>

      </cell>
    </group>
    <group :gutter="5">
      <cell title="退出登录" @click.native="doLogout" class="logout">
                <span slot="icon">
                    <i class="iconfont icon-tuichu"></i>
                </span>
      </cell>
    </group>
  </div>
</template>
<style></style>
<script>
  import {
    Flexbox,
    FlexboxItem,
    XHeader,
    Cell,
    Popup,
    Group,
    XButton,
    Badge
  } from 'vux'
  import api from '../config/'
  import {
    checkUpdate
  } from '../assets/js/update'
  import {
    setSessionStorage2JSON,
    getSessionStorage2JSON
  } from '../config/util'

  export default {
    name: "usercenter",
    data() {
      return {
        userMsg: ""
      }
    },
    components: {
      Flexbox,
      FlexboxItem,
      XHeader,
      Cell,
      Popup,
      Group,
      XButton,
      Badge
    },
    computed: {
      version() {
        var v = '';
        let item = this.getStore('wms_wgtVer');
        if (item == '') {
          return v;
        } else {
          return v = "(V" + item + ")";
        }
      },
      update() {
        let wgtVer = this.getStore('wms_wgtVer');
        let newVer = this.getStore('wms_newVer');
        if (wgtVer && newVer && (wgtVer != newVer)) {
          return true;
        } else {
          return false
        }
      },
      userInfo() {
        return this.$store.state.userInfo
      }
    },

    created() {
    },
    activated() {
      if (getSessionStorage2JSON('userInfo')) {
        this.getUserInfo();
      } else {
        this.$router.replace("/login");
      }
    },
    methods: {
      getUserInfo(username) {
        var _this = this;
        api.getData(pointer).then(function (data) {
          if (data.total > 0) {
            _this.$store.dispatch("setUserInfo", data.rows[0]);
            _this.$router.replace("/usercenter")
          } else {
            _this.toast("warn", "用户名不存在或者密码错误！")
          }
        })
      },
      doLogout() {
        var _this = this;
        let router = this.$router;
        this.$store.dispatch("setUserInfo", '');
        router.replace("/login");
      },
      docheckUpdate() {
        if (this.checkSupport()) {
          checkUpdate();
        }
      },
      toast(type, text, width) {
        var _this = this;
        _this.$vux.toast.show({
          text: text,
          type: type,
          width: width ? width : '8em',
          time: '1000'
        })
      },
      checkSupport() {
        var checkSystem = function () {
          var uaMap = {
            'android': /Android/i,
            'ios': /(?:iPhone|iPad)/i
          };
          var ua = window.navigator.userAgent;
          for (var i in uaMap) {
            if (uaMap[i].test(ua)) {
              return i;
            }
          }
          return null;
        };
        if (checkSystem() != 'ios' && checkSystem() != 'android') {
          var data = {
            code: 400,
            msg: "没有可打开的相机！"
          }
          return false;
        } else {
          return true;
        }
      },
      getStore(name) {
        if (!name) return;
        let item = window.localStorage.getItem(name);
        if (!item || item == "undefined") {
          return '';
        } else {
          return item;
        }
      }
    }
  }
</script>
