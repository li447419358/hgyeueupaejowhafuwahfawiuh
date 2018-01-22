<template>
  <!-- 库位推荐 -->
  <x-dialog v-model="visible" class="dialog-demo">
    <div class="dialog-title">{{curCargo.pkgNo}}库位编辑
      <span class="vux-close" @click="$emit('update:show',false)"></span>
    </div>
    <div>
      <group :gutter="0">
        <cell title="推荐" v-if="recommended.flag">
          {{recommended.area}}-{{recommended.row}}-{{recommended.horizontal}}-{{recommended.layar}}
        </cell>
        <cell v-else>无推荐库位</cell>
        <x-input title="区" v-model="curCargo.area"></x-input>
        <x-input title="排" v-model="curCargo.row"></x-input>
        <x-input title="栋" v-model="curCargo.horizontal"></x-input>
        <x-input title="层" v-model="curCargo.layar"></x-input>
      </group>
    </div>
    <div class="dialog_btn" @click="doYiKu()">保存
    </div>
  </x-dialog>
</template>

<script>
  import api from 'src/config/'
  import XDialog from 'vux/src/components/x-dialog'
  import XButton from 'vux/src/components/x-button'
  import XInput from 'vux/src/components/x-input'
  import Group from 'vux/src/components/group'
  import Cell from 'vux/src/components/cell'

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
          this.getbesPosition();
        }


      },

    },
    props: ['show', 'data'],
    data() {
      return {
        curCargo: {},
        visible: this.show,
        recommended: {
          flag: false,
          area: '',
          row: '',
          horizontal: '',
          layar: ''
        }
      }
    },
    computed: {},
    methods: {
      doYiKu() {
        var _this = this;
        var param = {
          area: _this.curCargo.area,
          row: _this.curCargo.row,
          horizontal: _this.curCargo.horizontal,
          layar: _this.curCargo.layar,
        }
        api.putCargos({
          cargoId: _this.curCargo.id,
          ...param
        }).then(data => {
          if (data.code == 300) {
            _this.toast('warn', data.msg);
          } else if (data.code == 200) {
            _this.toast('success', data.msg);
            _this.$emit('callback', data);
          }
        })
      },
      getbesPosition() {
        var _this = this;
        api.getbesPosition(this.data.id).then(function (data) {
          if (data.code == 200) {
            _this.recommended = data.result;
            _this.recommended.flag = true;
            _this.curCargo.area = data.result.area;
            _this.curCargo.row = data.result.row;
            _this.curCargo.horizontal = data.result.horizontal;
            _this.curCargo.layar = data.result.layar;
          } else {
            _this.recommended.flag = false;
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
