<template>
  <view-box class="viewbox" body-padding-top="46px" body-padding-bottom="50px">
    <x-header :left-options="{showBack: false}" class="positionHeader" title="董基金"></x-header>
    <div class="banner">
      <swiper :list="bannerList" v-model="banner"></swiper>
    </div>
    <div style="height:35px;">
      <sticky scroll-box="vux_view_box_body" :offset="46" :check-sticky-support="false" style="background:#f2f2f2;">
        <p class="sp-title"><i class="iconfont icon-62 "></i>A股港股打新项目</p>
      </sticky>
    </div>
    <ul class="fundList">
      <li v-for="item in overList">
        <div class="content">
          <flexbox :gutter="0" align="flex-end">
            <flexbox-item class="ratio" style="text-align: center">
              <span>{{item.currentvalue}}</span>
              <p class="label">当前净值</p>
            </flexbox-item>
            <flexbox-item style="text-align: center">
              <span>{{item.Basevalue}}</span>
              <p class="label">初始净值</p>
            </flexbox-item>
            <flexbox-item style="text-align: center">
              {{item.productscale}}万
              <p class="label">募集规模</p>
            </flexbox-item>
            <flexbox-item style="text-align: center">
              {{item.productcycle}}天
              <p class="label">产品周期</p>
            </flexbox-item>
            <flexbox-item :span="2" style="text-align: center">
              <x-circle :percent="80" :stroke-width="6" :trail-width="6" stroke-color="#FF0000" trail-color="#ececec">
                <span style="color:#FF0000;font-size: 12px;">{{item.status}}</span>
              </x-circle>
            </flexbox-item>
          </flexbox>
        </div>
        <div class="footer">
          <p class="fl">董基金</p>
          <p class="fr"><span class="tip tip-info">零风险</span><span class="tip tip-info">高收益</span><span
            class="tip tip-info">高回报</span></p>
        </div>
      </li>
    </ul>
  </view-box>
</template>
<script type="text/ecmascript-6">
  import {mapState} from "vuex"
  import XHeader from 'vux/src/components/x-header'
  import Cell from 'vux/src/components/cell'
  import CellBox from 'vux/src/components/cell-box'
  import XCircle from 'vux/src/components/x-circle'
  import Group from 'vux/src/components/group'
  import XButton from 'vux/src/components/x-button'
  import XInput from 'vux/src/components/x-input'
  import Badge from 'vux/src/components/badge'
  import Sticky from 'vux/src/components/sticky'
  import Flexbox from 'vux/src/components/flexbox/flexbox'
  import FlexboxItem from 'vux/src/components/flexbox/flexbox-item'
  import Card from 'vux/src/components/card'
  import Scroller from 'vux/src/components/scroller'
  // import Swiper  from 'vux/src/components/swiper/swiper'
  import {Swiper} from 'vux'
  import Divider from 'vux/src/components/divider'
  import Datetime from 'vux/src/components/datetime/'
  import dateFormat from 'vux/src/components/datetime/format'

  import XDialog from 'vux/src/components/x-dialog'

  import Swipeout from 'vux/src/components/swipeout/swipeout'
  import SwipeoutItem from 'vux/src/components/swipeout/swipeout-item'
  import SwipeoutButton from 'vux/src/components/swipeout/swipeout-button'

  import Grid from 'vux/src/components/grid/grid'
  import GridItem from 'vux/src/components/grid/grid-item'
  import Checker from 'vux/src/components/checker/checker'
  import CheckerItem from 'vux/src/components/checker/checker-item'
  import Checklist from 'vux/src/components/checklist'
  import ViewBox from 'vux/src/components/view-box'
  import Tab from 'vux/src/components/tab/tab'
  import TabItem from 'vux/src/components/tab/tab-item'
  import PopupPicker from 'vux/src/components/popup-picker'
  import Countup from 'vux/src/components/countup'
  import TransferDom from 'vux/src/directives/transfer-dom'
  import api from '../config/'
  import {
    getStore2JSON
  } from '../config/util'

  export default {
    components: {
      Sticky,
      Swiper,
      ViewBox,
      XHeader,
      XInput,
      Group,
      XButton,
      Checker,
      CheckerItem,
      Flexbox,
      FlexboxItem,
      Grid, GridItem,
      Countup,
      PopupPicker,
      Divider,
      XCircle

    },
    data() {
      return {
        isshow: 0,
        overList: [],
        showPopupPicker: false,
        params: {
          size: 10,
          current: 1
        },
        banner: 0,
        bannerList: [{
          url: 'javascript:',
          img: 'http://120.78.65.165/uploadfiles/ad/2014052910192644554.jpg',
          title: '董基金,更懂你'
        }, {
          url: 'javascript:',
          img: 'http://120.78.65.165/uploadfiles/ad/2014052810481376539.jpg',
          title: '企业百年财富 智子一生诚信'
        }]

      }
    },
    activated() {
      this.getOverview();
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo;
      }
    },
    filters: {
      toNumber(value) {
        if (!value) return 0;
        return Number(value).toFixed(2);
      }
    },

    methods: {
      getOverview() {
        var _this = this;
        var pointer = {
          sql_class: " fundinfo ",
          sql_top: "",
          sql_colums: " Basevalue, currentvalue, productscale,productcycle, status",
          sql_whereBy: "and id=5",
          sql_orderBy: ""
        }
        api.getData(pointer).then(function (data) {
          _this.setLoading(false);
          if (data.total > 0) {
            _this.overList = data.rows;
            _this.$store.dispatch("setDfund", data.rows);
          } else {

          }
        }).catch(function () {
          _this.setLoading(false);
        })
      },
    }
  }
</script>
<style>

</style>
