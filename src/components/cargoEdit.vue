<template>
  <!-- 库位推荐 -->
  <x-dialog v-model="visible" v-if="visible" class="dialog-demo">
    <div class="dialog-title">修改商品信息
      <span class="vux-close" @click="$emit('update:show',false)"></span>
    </div>
    <group :gutter="0">
      <x-input title="包号" type="number" v-model="curCargo.pkgNo"></x-input>
      <!--<x-input title="品牌" v-model="curCargo.brand"></x-input>-->
      <data-select title="品牌" :value.sync="curCargo.brand" valueKey="name" prop="name" api="getbaseData"
                   :params="{type:'cargoBrand'}"></data-select>
      <!--<x-input title="品名" v-model="curCargo.name"></x-input>-->
      <data-select title="品名" :value.sync="curCargo.name" valueKey="name" prop="name" api="getbaseData"
                   :params="{type:'cargoName'}"></data-select>
      <!--<x-input title="等级" v-model="curCargo.level"></x-input>-->
      <data-select title="等级" :value.sync="curCargo.level" valueKey="name" prop="name" api="getbaseData"
                   :params="{type:'cargoLevel'}"></data-select>
      <x-input title="厚度" type="number" v-model="curCargo.thickness" v-if="cargoType=='WOOD'"></x-input>
      <x-input title="宽度" type="number" v-model="curCargo.width" v-if="cargoType=='WOOD'"></x-input>
      <x-input title="短径" type="number" v-model="curCargo.diameter" v-if="cargoType=='LOG'"></x-input>
      <x-input title="长径" type="number" v-model="curCargo.diameterMax" v-if="cargoType=='LOG'"></x-input>
      <x-input title="长度" type="number" v-model="curCargo.length"></x-input>
      <x-input title="根数" type="number" v-model="curCargo.count"></x-input>
      <x-input title="体积" type="number" v-model="curCargo.volume"></x-input>
      <x-input title="备注" v-model="curCargo.mark"></x-input>
    </group>
    <div class="dialog_btn" @click="doSave('cargo')">保存</div>
  </x-dialog>
</template>

<script>
  import api from 'src/config/'
  import XDialog from 'vux/src/components/x-dialog'
  import XButton from 'vux/src/components/x-button'
  import XInput from 'vux/src/components/x-input'
  import Group from 'vux/src/components/group'
  import Cell from 'vux/src/components/cell'
  import {
    mapState
  } from "vuex"

  export default {
    components: {Group, XDialog, XButton, XInput, Cell},
    activated() {
      this.curCargo = JSON.parse(JSON.stringify(this.data));
    },
    watch: {
      show(val, oldVal) {
        this.visible = this.show;
        if (val) {
          this.curCargo = JSON.parse(JSON.stringify(this.data));
        } else {
          this.curCargo = {};
        }
      },

    },
    props: ['show', 'data'],
    data() {
      return {
        curCargo: {},
        visible: this.show,
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.userInfo,
        depotId: state => state.depot ? state.depot.id : '',
        cargoType: state => state.depot ? state.depot.cargoType : "",
        depot: state => state.depot,
      }),
    },
    methods: {
      doSave() {
        var _this = this;
        var param = {
          cargoId: this.curCargo.id,
          pkgNo: this.curCargo.pkgNo,
          brand: this.curCargo.brand,
          name: this.curCargo.name,
          level: this.curCargo.level,
          thickness: this.curCargo.thickness,
          width: this.curCargo.width,
          length: this.curCargo.length,
          count: this.curCargo.count,
          volume: this.curCargo.volume,
          mark: this.curCargo.mark,
        }
        api.putCargos(param).then(data => {
          if (data.code == 300) {
            _this.toast('warn', data.msg);
          } else if (data.code == 200) {
            _this.toast('success', data.msg);
            _this.$emit('callback', data);
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
        })
      },
    },
  };
</script>

<style>

</style>
