<template>
    <div class="custom-actions">
      <button class="button is-info" @click="itemAction('edit-item', rowData, rowIndex)">Edit</button>
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
    },
    rowIndex: {
      type: Number
    }
  },
  methods: {
    itemAction (action, data, index) {
      console.log('custom-actions: ' + action, data.name, index)
      console.log(data.userId)
      router.push({ path: '/user/UpdateStaff' })
      axios.get(staffUrl + '/' + data.userId)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {

  }
}
  </script>
