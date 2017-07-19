<template>
    <div class="custom-actions">
      <button class="button is-info" @click="itemAction('action-item', rowData)">Edit</button>
    </div>
  </template>

<script>
import router from '../../router'
import { staffUrl } from '../../config'
import axios from 'axios'

export default {
  props: {
    rowData: {
      type: Object,
      required: true
    }
  },
  methods: {
    itemAction (action, data) {
      // console.log(data.name)
      // console.log(data.userId)
      // this.$parent.$emit('onBtnClick', {action: action, data: data})
      router.push({ path: '/user/UpdateStaff' })
      axios.get(staffUrl + '/' + data.userId)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
