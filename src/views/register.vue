<template>
  <view-box class="viewbox" body-padding-top="46px" body-padding-bottom="0">
    <x-header class="positionHeader" :left-options="{showBack: true}" title="用户注册"></x-header>
    <group label-width="4.5em">
      <x-input title="用户名" v-model="params.username" ref="username" :min="6" required placeholder="用户名最少6位"></x-input>
      <x-input title="邀请码" v-model="params.code" ref="code" :max="6" :min="6" required
               placeholder="请输入推荐人的邀请码"></x-input>
      <x-input title="电子邮箱" v-model="params.email" ref="email" is-type="email" required placeholder="请输入联系邮箱"></x-input>
      <x-input title="密码" v-model="params.password" ref="password" type="password" required :min="6"
               placeholder="密码最少6位"
               @input.native="checkStrong">
        <span slot="right">
          <span v-if="modes==1">弱</span>
          <span v-if="modes==2">强</span>
          <span v-if="modes==3">极强</span>
        </span>
      </x-input>
      <x-input title="确认密码" v-model="params.password2" ref="password2" required type="password"
               :equal-with="params.password"
               placeholder="再次确认密码"></x-input>
      <cell>
        <span slot="icon"><input type="checkbox" v-model="params.agreement"/>我同意《<span
          class="text-gray" @click="$router.push('/reg_agreement')">注册协议</span>》及《<span class="text-gray"
                                                                                        @click="$router.push('/inv_agreement')">投资服务协议</span>》</span>
      </cell>
    </group>

    <div style="margin:10px;">
      <x-button class="login_btn" @click.native="doRegister" :show-loading="loginState" :disabled="loginState">注册
      </x-button>
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
        modes: 0,
        loginState: false,
        remember: false
      }
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

        if (!this.checkValid()) {

          this.loginState = false;
          return;
        }
        _this.loginState = true;
        api.doRegister(this.params).then(function (data) {
          _this.loginState = false;
          if (data.code == 200) {
            _this.toast("success", "注册成功！")
            _this.$router.replace("/login");
          } else {
            _this.toast("warn", "注册失败！")
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
      },
      //判断输入密码的类型
      CharMode(iN) {
        if (iN >= 48 && iN <= 57) //数字
          return 1;
        if (iN >= 65 && iN <= 90) //大写
          return 2;
        if (iN >= 97 && iN <= 122) //小写
          return 4;
        else
          return 8;
      },
      //bitTotal函数
      //计算密码模式
      bitTotal(Modes) {
        this.modes = 0;
        for (var i = 0; i < 4; i++) {
          if (Modes & 1) this.modes++;
          Modes >>>= 1;
        }

      },
      //返回强度级别
      checkStrong() {
        if (this.params.password.length <= 4) {
          this.modes = 0;
          return;
        }
        var Modes = 0;

        for (var i = 0; i < this.params.password.length; i++) {
//密码模式
          Modes |= this.CharMode(this.params.password.charCodeAt(i));
        }
        this.bitTotal(Modes);
      },
      checkValid() {
        if (this.params.username && this.params.code && this.params.email && this.params.password && this.params.password2 && this.params.agreement) {
          if (this.$refs.username.valid && this.$refs.code.valid && this.$refs.email.valid && this.$refs.password.valid && this.$refs.password2.valid && this.params.agreement) {
            return true
          } else {
            this.toast('text', "请按规则填写注册信息！", "15em");
            return false;
          }
        } else {
          this.toast('text', "所有项目必填！", "9em");
          return false
        }


      }
    }
  }
</script>
