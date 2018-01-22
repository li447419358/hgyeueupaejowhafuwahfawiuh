//配置全局组件
import dataSelect from './dataSelect'
import staticSelect from './staticSelect'
import showLabel from './showLabel'
import {mapActions} from 'vuex'

const MyComponents = {
  install: function (Vue, options) {
    Vue.component('static-select', staticSelect);
    Vue.component('data-select', dataSelect);
    Vue.component('show-label', showLabel);
    Vue.mixin({
      methods: {
        ...mapActions(['setLoading']),

      }
    })
  }
}
// 导出组件库
export default MyComponents
