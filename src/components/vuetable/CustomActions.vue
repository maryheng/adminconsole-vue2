<template>
    <div class="custom-actions">
      <button class="button is-info" @click="itemAction('action-item', rowData)">Edit</button>
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
    }
  }
}
</script>
