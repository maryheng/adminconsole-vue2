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
    @onBtnClick="onActions"
    @onReturnBtnClick="onReturnActions"    
    ></my-vuetable>
    
    <br>
    <br>

    <router-view></router-view>
  </div>
</template>

<script>
import MyVuetable from '../../../components/vuetable/MyVuetable.vue'
import CustomActions from '../../../components/vuetable/CustomActions.vue'
import router from '../../../router'
import { loanUrl, loanReturned, dueLoansUrl } from '../../../config.js'
import moment from 'moment'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    MyVuetable,
    CustomActions
  },
  data () {
    return {
      apiUrl: dueLoansUrl,
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
          name: 'loanedBy',
          title: 'Loaned By'
        },
        {
          name: '__component:custom-actions-second',
          title: 'Actions',
          titleClass: 'center aligned',
          dataClass: 'center aligned'
        }
      ]
    }
  },
  methods: {
    formatDate (value, fmt = 'D MMM YYYY') {
      return (value == null)
        ? ''
        : moment(value, 'YYYY-MM-DD').format(fmt)
    },
    // Click "Edit" Button -> routes user to update page
    onActions (action, data) {
      // ~/user/UpdateStaff/{userId}
      router.push({ name: 'UpdateStaff', params: { userId: action.data.userId } })
    },
    onReturnActions (action, data) {
      // RETURN LOAN LOGIC
      console.log(action)
      let self = this
      self.loanId = action.data.loanId
      axios.put(loanUrl + self.loanId + loanReturned)
        .then((response) => {
          console.log('Loan is returned!')
          router.push({ name: 'DueLoans' })
        })
        .error((error) => {
          console.log(error)
        })
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
