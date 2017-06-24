// MyVuetable.vue

<template>
  <vuetable
    ref="vuetable"
    api-url="https://fypadminconsoletest.azurewebsites.net/api/staffs"
    :http-options = "{ headers: $http.defaults.headers }"
    :load-on-start = "loadOnStart"
    :fields="['userId', 'name', 'username']"
  ></vuetable>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import { staffUrl } from '../../config'
import axios from 'axios'

export default {
  components: {
    Vuetable
  },
  props: {
    httpOptions: {
      type: Object,
      default () {
        return {}
      }
    },
    loadOnStart: {
      type: Boolean,
      default: function () {
        return true
      }
    }
  },
  methods: {
    loadData () {
      axios.get(staffUrl)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    created: function () {
      if (this.loadOnStart) {
        this.loadData()
      }
    }
    // test () {
    //   axios.interceptors.request.use(config => {
    //     var accessToken = window.localStorage.getItem('access_token')
    //     config.headers = { 'x-access-token': accessToken }
    //     console.log(config.headers)
    //     return config
    //   })
    //   axios.get(staffUrl)
    //     .then(function (response) {
    //       console.log(response)
    //     })
    //     .catch(function (error) {
    //       console.log(error)
    //     })
    // }
  }
}
</script>
