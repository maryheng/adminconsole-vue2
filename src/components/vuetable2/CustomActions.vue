<template>
    <div class="custom-actions">
      <button class="button is-info" @click="itemAction('action-item', rowData)">Update</button>      
      <button class="button is-danger" @click="returnedAction('action-item', rowData)">Returned</button>
    </div>
  </template>

<script>
// import router from '../../router'
// import { staffUrl } from '../../config'
// import axios from 'axios'

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
    },
    returnedAction (action, data) {
      this.$parent.$parent.$emit('onReturnBtnClick', {action: action, data: data})
    }
  }
}
</script>
