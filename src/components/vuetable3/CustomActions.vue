<template>
    <div class="custom-actions">
      <button class="button is-info" @click="itemAction('action-item', rowData)">Train</button>      
    </div>
  </template>

<script>
export default {
  props: {
    rowData: {
      type: Object,
      required: true
    }
  },
  methods: {
    itemAction (action, data) {
      this.$parent.$parent.$emit('onBtnClick', {action: action, data: data})
    }
  }
}
</script>
