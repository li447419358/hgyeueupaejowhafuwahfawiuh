<template>
  <div class="x-picker">
    <cell :title="title" @click.native="pickeData">
      <show-label :value.sync="value" :array="array" ></show-label>
    </cell>
    <popup-picker :show.sync="show" :popup-title="'请选择'+title" :data="[dealArray]" v-model="model"
                  :show-name="showName"
                  :popup-style="{zIndex:9000}"
                  @on-change="handleSelect">
    </popup-picker>

  </div>
</template>

<script>
  import apis from 'src/config/'
  import PopupPicker from 'vux/src/components/popup-picker'
  import XInput from 'vux/src/components/x-input'
  import Group from 'vux/src/components/group'
  import TransferDom from 'vux/src/directives/transfer-dom'
  import Cell from 'vux/src/components/cell'
  export default {
    directives: {
      TransferDom
    },
    components: {PopupPicker, XInput, Group,Cell},
    created() {

    },
    props: {
      value: {type: String},
      title: {},
      showName: {default: true},
      array: {type: Array},
      params: {type: [Object, String, Number]},
    },
    data() {
      return {
        show: false,
        model: []
      };
    },
    computed: {
      dealArray() {
        return this.array.map(item => {
          return {
            name: item.label,
            value: item.value
          }
        })
      },
    },
    methods: {
      handleSelect(val) {
        let data = this.dealArray.filter(item => {
          return item.value == val;
        });
        if (data.length > 0) {
          this.$emit('update:value', val.join(''));
          this.$emit('callback', data[0]);
        } else {
          this.$emit('update:value', '');
          this.$emit('callback', {});
        }
      },
      pickeData() {
        this.show = true;
      },


    },
  };
</script>

<style lang="css" scoped>
  .x-picker {
    position: relative;
  }

  .x-picker:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
  }

  .vux-cell-box {
    display: none;
  }
</style>
