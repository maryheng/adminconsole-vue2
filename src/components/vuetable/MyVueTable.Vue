<template>
  <div>
    <vuetable
      ref="vuetable"
      :api-url="apiUrl"
      :http-options="httpOptions"
      :fields="fields"
      pagination-path=""
      @vuetable:pagination-data="onPaginationData"
    ></vuetable>
    
    <vuetable-pagination-info ref="paginationInfo"
    ></vuetable-pagination-info>

    <vuetable-pagination ref="pagination"
      @vuetable-pagination:change-page="onChangePage"
    ></vuetable-pagination>    
  
  </div>
</template>

<script>
import Vue from 'vue'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import CustomActions from './CustomActions'
import moment from 'moment'
import BulmaPagination from './BulmaPagination'

Vue.component('custom-actions', CustomActions)

export default {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo,
    BulmaPagination
  },
  data () {
    return {
      css: {
        tableClass: 'table is-bordered is-striped',
        ascendingIcon: 'fa fa-chevron-up',
        descendingIcon: 'fa fa-chevron-down',
        sortHandleIcon: 'fa fa-bars'
      }
    }
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
        return {
          headers: this.$http.defaults.headers
        }
      }
    }
  },
  methods: {
    combineSubCat (value) {
      return (value.length === 0)
        ? 'NIL'
        : value.map((item) => item.subCategoryName).join(', ')
    },
    formatDate (value) {
      if (window.location.pathname === '/user/residentdeveloper') {
        return (value == null)
          ? ''
          : moment(value).format('DD-MM-YYYY')
      } else {
        return (value == null)
          ? ''
          : moment(value).format('DD-MM-YYYY HH:mm')
      }
    },
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    }
  }
}
</script>
