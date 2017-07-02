// MyVuetable.vue

<template>
  <div>
    <vuetable
      ref="vuetable"
      api-url="https://fypadminconsoletest.azurewebsites.net/api/residentdevelopers"
      :http-options = "{ headers: $http.defaults.headers }"
      :load-on-start = "loadOnStart"
      :fields="fields"
      pagination-path=""
    ></vuetable>
    <vuetable-pagination ref="pagination"></vuetable-pagination>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import CustomActions from './CustomActions'
import { staffUrl } from '../../config'
import axios from 'axios'
import moment from 'moment'

Vue.component('custom-actions', CustomActions)

export default {
  components: {
    Vuetable,
    VuetablePagination
  },
  data () {
    return {
      fields:
      [
        'userId', 'name',
        {
          name: 'nricPassportNo',
          title: 'NRIC/Passport No',
          sortField: 'nricPassportNo'
        },
        'company', 'email',
        {
          name: 'mobileNo',
          title: 'Mobile No'
        },
        {
          name: 'keyCardRefNo',
          title: 'Key Card No'
        },
        {
          name: 'issuranceDate',
          title: 'Issuance Date',
          callback: 'formatDate|DD-MM-YYYY'
        },
        {
          name: '__component:custom-actions',
          title: 'Actions',
          titleClass: 'center aligned',
          dataClass: 'center aligned'
        }
      ]
    }
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
    },
    formatDate (value, fmt = 'D MMM YYYY') {
      return (value == null)
        ? ''
        : moment(value, 'YYYY-MM-DD').format(fmt)
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
