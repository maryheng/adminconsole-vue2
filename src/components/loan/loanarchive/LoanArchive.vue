<template>
  <div id="container">
    <br>
    <!--Vue Table-->
    <my-vuetable
    ref="vuetable"
    :api-url="apiUrl"
    :fields="fields"
    ></my-vuetable>
    
    <br>
    <br>

    <router-view></router-view>
  </div>
</template>

<script>
import MyVuetable from '../../../components/vuetable4/MyVuetable.vue'
import { loanArchiveUrl } from '../../../config.js'

export default {
  name: 'app',
  components: {
    MyVuetable
  },
  data () {
    return {
      apiUrl: loanArchiveUrl,
      fields:
      [
        {
          name: '__sequence', // index number for rows in vuetable
          title: '#',
          titleClass: 'center aligned',
          dataClass: 'right aligned'
        },
        {
          name: 'itemName',
          title: 'Item Name'
        },
        {
          name: 'itemChildLabel',
          title: 'Item Label'
        },
        {
          name: 'startDateTime',
          title: 'Start Date',
          callback: 'formatDate'
        },
        {
          name: 'dueDateTime',
          title: 'Due Date',
          callback: 'formatDate'
        },
        {
          name: 'returnDateTime',
          title: 'Returned Date',
          callback: 'formatDate'
        },
        {
          name: 'loanedBy',
          title: 'Loaned By'
        },
        {
          name: 'remarks',
          title: 'Remarks'
        }
      ]
    }
  },
  computed: {
    href () {
      return '' + this.name.toLowerCase().replace(/\s+/g, '')
    }
  }
}

</script>

<style>
.button {
  margin-left: 2px;
}
</style>
