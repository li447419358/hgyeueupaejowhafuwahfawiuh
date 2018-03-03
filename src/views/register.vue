<template>
  <view-box class="viewbox" body-padding-top="0" body-padding-bottom="0">
    <x-header :left-options="{showBack: true}" title="用户注册"></x-header>
    <group>
      <x-input title="用户名" v-model="params.username" required></x-input>
      <x-input title="邀请码" v-model="params.code" placeholder="请输入推荐人的邀请码"></x-input>
      <x-input title="电子邮箱" v-model="params.email" is-type="email" placeholder="请输入联系邮箱"></x-input>
      <x-input title="密码" v-model="params.password" type="password" :min="6" placeholder="密码最少6位"></x-input>
      <x-input title="确认密码" v-model="params.password2" type="password" :equal-with="params.password"
               placeholder="再次确认密码"></x-input>
      <cell>
        <span slot="icon"><input type="checkbox" v-model="params.agreement"/>我同意《<span
          class="text-gray">注册协议</span>》及《<span class="text-gray">投资服务协议</span>》</span>
      </cell>
    </group>

    <div style="margin:10px;">
      <x-button class="tip-success" @click.native="doRegister" :show-loading="loginState" :disabled="loginState">注册</x-button>
    </div>

  </view-box>
</template>

<script>
  import {
    XHeader,
    XInput,
    Group,
    XButton,
    Cell, ViewBox
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
      Cell, ViewBox
    },
    data() {
      return {
        type: 'password',
        userInfo: '',
        params: {
          username: '',
          code: "",
          email: '',
          password: '',
          password2: '',
          agreement: true
        },
        loginState: false,
        remember: false
      }
    },
    created() {
    },
    activated() {
      this.setLoading(false);
    },
    methods: {
      toggleType() {
        this.type == 'text' ? this.type = 'password' : this.type = 'text';
      },
      doRegister() {
        var _this = this;
        let router = this.$router;
        let toast = this.$vux.toast;
        if (_this.params.username == "" || _this.params.password == "") {
          _this.toast('text', "用户名和密码不能为空", "12em");
          _this.loginState = false;
          return;
        }
        _this.loginState = true;
        api.doRegister(this.params).then(function (data) {
          _this.loginState = false;
          if (data.code == 200) {
            _this.toast("success", "登录成功！")
            _this.$store.dispatch("setUserInfo", data.result[0]);
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
