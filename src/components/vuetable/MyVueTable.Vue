// MyVuetable.vue

<template>
  <div>
    <filter-bar></filter-bar> 
    <vuetable
      ref="vuetable"
      :api-url="apiUrl"
      :http-options="{ headers: $http.defaults.headers }"
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
import FilterBar from './FilterBar'
import moment from 'moment'

Vue.component('custom-actions', CustomActions)
Vue.component('filter-bar', FilterBar)

export default {
  components: {
    Vuetable,
    VuetablePagination
  },
  props: {
    apiUrl: {
      type: String,
      default () {
        return ''
      }
    },
    fields: {
      type: Array,
      default () {
        return []
      }
    },
    httpOptions: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    formatDate (value, fmt = 'D MMM YYYY') {
      return (value == null)
        ? ''
        : moment(value, 'YYYY-MM-DD').format(fmt)
    }
  }
}
</script>
