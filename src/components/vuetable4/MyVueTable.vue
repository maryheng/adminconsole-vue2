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
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import moment from 'moment'

export default {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo
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
    formatDate (value) {
      return (value == null)
        ? ''
        : moment(value).format('DD-MM-YYYY HH:mm')
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
