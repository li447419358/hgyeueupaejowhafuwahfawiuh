<template>
  <span>
    <span>{{label}}</span>
  </span>
</template>

<script>
  export default {
    props: {
      value: '',
      array: {type: Array}
    },
    data() {
      return {
        name: this.value,
      };
    },
    computed: {
      label() {
        var data = this.array.filter(item => {
          return item.value === this.value;
        });
        var label = ''
        data.length > 0 ? label = data[0].label : label = '';
        return label;
      }
    },
    methods: {},
  };
</script>

<style>

</style>
