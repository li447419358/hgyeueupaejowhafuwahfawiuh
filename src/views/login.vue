<template>
  <view-box class="viewbox" body-padding-top="0" body-padding-bottom="0">
    <x-header slot="header" :left-options="{showBack: true}" title="用户登录"></x-header>
    <div class="loginBox">
      <div class="logo">
        <!--<img src="../../static/img/logo.jpg" alt=""/>-->
        <p>董基金 更懂你</p>
      </div>

      <x-input title="用户名" class="login_input" type="text" placeholder="用户名" v-model="params.username">
        <i class="iconfont icon-xingmingyonghumingnicheng" slot="label" style="padding-right:10px;display:block;"></i>
      </x-input>
      <x-input title="密码" class="login_input" :type="type" placeholder="密码" v-model="params.password"
               :show-clear="false"
               @keyup.enter.native="doLogin">
        <i class="iconfont icon-yanjing" slot="right" @click="toggleType" style="color: #B2B2B2;"
           v-show="params.password"></i>
        <i class="iconfont icon-icon--" slot="label" style="padding-right:10px;display:block;"></i>
      </x-input>
      <x-button class="login_btn" @click.native="doLogin" :show-loading="loginState" :disabled="loginState">登录
      </x-button>
      <div class="signup">
        <!--<span>忘记密码</span>-->
        <span class="fr" @click="$router.push('/register')">注册</span>
      </div>
    </div>
  </view-box>
</template>

<script>
  import {
    XHeader,
    XInput,
    Group,
    XButton,
    Cell,
    ViewBox
  } from 'vux'
  import api from '../config/'
  import CryptoJS from 'crypto-js';

  import {
    getStore2JSON,
    getSessionStorage2JSON
  } from '../config/util'

  export default {
    components: {
      XHeader,
      XInput,
      Group,
      XButton,
      Cell,
      ViewBox
    },
    data() {
      return {
        type: 'password',
        userInfo: '',
        params: {
          username: '',
          password: ''
        },
        loginState: false,
        remember: false
      }
    },
    created() {
      this.init();
    },
    activated() {
      this.setLoading(false);

      this.init();
    },
    methods: {
      toggleType() {
        this.type == 'text' ? this.type = 'password' : this.type = 'text';
      },
      init() {
        this.params = getStore2JSON('loginInfo') ? getStore2JSON('loginInfo') : {
          username: '',
          password: ''
        };
        this.remember = this.params.password != '';
      },
      doLogin() {
        //触发记住密码事件
        // this.rememberPassword();
        var _this = this;
        let router = this.$router;
        let toast = this.$vux.toast;
        if (_this.params.username == "" || _this.params.password == "") {
          _this.toast('text', "用户名和密码不能为空", "12em");
          _this.loginState = false;
          return;
        }
        _this.loginState = true;
        var param = {
          username: _this.params.username,
          password: _this.params.password,
        };
        api.doLogin(param).then(function (data) {
          _this.loginState = false;
          if (data.code == 200) {
            _this.toast("success", "登录成功！");
            if (data.result[0].hasOwnProperty('jine')) {
              _this.$store.dispatch("setUserInfo", data.result[0]);
            } else {
              var defaultData = {
                theName: _this.params.username,
                mobile: "",
                jine: 0,
              }
              _this.$store.dispatch("setUserInfo", defaultData);
            }

            _this.$router.replace("/usercenter");
          } else {
            _this.toast("warn", "用户名不存在或者密码错误！")
          }

        })
      },
      toast: function (type, text, width) {
        var _this = this;
        _this.$vux.toast.show({
          text: text,
          width: width ? width : '8em',
          type: type,
          time: '1000'
        });
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
