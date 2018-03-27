<template>
  <view-box class="viewbox" body-padding-top="46px" body-padding-bottom="0">
    <x-header class="positionHeader" :left-options="{showBack: true}" title="投资服务协议"></x-header>
    <div class="agreement">
      投资服务协议 内容等待补充中
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

  export default {
    name: "agreement",
    components: {
      XHeader,
      XInput,
      Group,
      XButton,
      Cell, ViewBox
    }, activated() {
      this.setLoading(false);
    },
  }
</script>

<style scoped>

</style>
