<template>
  <div id="container">
    <router-link to="/loan/AddLoan">
      <button type="submit" class="button is-primary">Add Loan</button>
    </router-link>
    <br>
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
import moment from 'moment'

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
          callback: 'formatDate|DD-MM-YYYY'
        },
        {
          name: 'dueDateTime',
          title: 'Due Date',
          callback: 'formatDate|DD-MM-YYYY'
        },
        {
          name: 'returnDateTime',
          title: 'Returned Date',
          callback: 'formatDate|DD-MM-YYYY'
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
  methods: {
    formatDate (value, fmt = 'D MMM YYYY') {
      return (value == null)
        ? ''
        : moment(value, 'YYYY-MM-DD').format(fmt)
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
