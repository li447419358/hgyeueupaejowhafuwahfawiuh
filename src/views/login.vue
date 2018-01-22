<template>
  <div>
    <x-header :left-options="{showBack: true}" title="用户登录"></x-header>
    <div class="loginBox">
      <div class="logo">
      <!--<img src="../../static/img/logo.jpg" alt=""/>-->
      <p>董基金   更懂你</p>
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
        <span>忘记密码</span>
        <span class="fr">注册</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    XHeader,
    XInput,
    Group,
    XButton,
    Cell
  } from 'vux'
  import api from '../config/'
  import CryptoJS from 'crypto-js';

  import {
    setStore,
    getStore2JSON
  } from '../config/util'

  export default {
    components: {
      XHeader,
      XInput,
      Group,
      XButton,
      Cell
    },
    data() {
      return {
        type: 'password',
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
      this.$store.dispatch('setLoading', false);
      this.init();
    },
    methods: {
      toggleType() {
        this.type == 'text' ? this.type = 'password' : this.type = 'text';
      },
      rememberPassword() {
        if (this.remember) {
          setStore('loginInfo', this.params)
        } else {
          var loginInfo = JSON.parse(JSON.stringify(this.params));
          loginInfo.password = '';
          setStore('loginInfo', loginInfo)
        }
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
        this.rememberPassword();
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
          password: CryptoJS.SHA1(_this.params.password),
          cId: _this.getStore('app_cid'),
          lang: 'zh'
        };
        api.requestLogin(param).then(function (data) {
          _this.loginState = false;
          if (data.code == 200) {
            _this.toast('success', data.msg);
            _this.$store.dispatch('setUserInfo', data.result);
            router.push("/");
          } else if (data.code == 300) {
            _this.toast('warn', data.msg);
          } else {
            _this.toast('warn', '登录失败');

          }
          ;
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
