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
    <!-- Simplert Notification -->
    <simplert :useRadius="true" :useIcon="true" ref="simplert">
    </simplert> 
  </div>
</template>

<script>
import MyVuetable from '../../../components/vuetable2/MyVuetable.vue'
import CustomActionsSecond from '../../../components/vuetable2/CustomActions.vue'
import router from '../../../router'
import { loanUrl, loanReturned, ongoingLoansUrl } from '../../../config.js'
import moment from 'moment'
import axios from 'axios'
import Simplert from 'vue2-simplert/src/components/simplert'

export default {
  name: 'app',
  components: {
    MyVuetable,
    CustomActionsSecond,
    Simplert
  },
  data () {
    return {
      loanId: '',
      apiUrl: ongoingLoansUrl,
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
          name: 'remarks',
          title: 'Remarks'
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
      router.push({ name: 'UpdateLoan', params: { loanId: action.data.loanId } })
    },
    onReturnActions (action, data) {
      let self = this

      // Get loanId
      self.loanId = action.data.loanId

      // Update return loan
      axios.put(loanUrl + self.loanId + loanReturned)
        .then((response) => {
          let closeFn = () => {
            window.location.reload()
          }
          let successAlert = {
            title: 'Success',
            message: response.data.message,
            type: 'success',
            onClose: closeFn
          }
          self.$refs.simplert.openSimplert(successAlert)
        })
        .catch((error) => {
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
