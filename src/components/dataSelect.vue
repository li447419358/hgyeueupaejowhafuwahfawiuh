<template>
  <!--适合无-->
  <div class="x-picker">
    <x-input :title="title" v-model="value" readonly @click.native="pickeData" placeholder="请选择"></x-input>
    <popup-picker :show.sync="show" :popup-title="'请选择'+title" :data="data" v-model="model"
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

  export default {
    directives: {
      TransferDom
    },
    components: {PopupPicker, XInput, Group},
    created() {

    },
    props: {
      value: {type: String},
      label: {default: ''},
      prop: {type: String, default: 'name'},
      title: {},
      showName: {default: true},
      valueKey: {type: String, default: 'id'},
      api: {required: true, type: String},
      params: {type: [Object, String, Number]},
    },
    data() {
      return {
        show: false,
        model: [],
        data: []
      };
    },
    computed: {},
    methods: {
      handleSelect(val) {
        let data = this.data[0].filter(item => {
          return item.value == val;
        });
        if (data.length > 0) {
          this.$emit('update:value', val.join(''));
          this.$emit('update:label', data[0].name);
          this.$emit('callback', data[0]);
        } else {
          this.$emit('update:value', '');
          this.$emit('callback', {
            value: '', name: ''
          });
        }
      },
      pickeData() {
        this.show = true;
        this.getData();
      },
      getData() {
        apis[this.api](this.params).then((res) => {
          if (res.code == 200) {
            if (res.result.records.length === 0) {
              this.$emit('no-data')
            }
            var data = res.result.records.map(item => {
              return {name: item[this.prop], value: item[this.valueKey]};
            });
            this.data = [data];
          }
        })
      },

    },
  };
</script>

<style lang="css" scoped>
  .x-picker{
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
