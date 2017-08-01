<template>
  <div id="container">
    <div class="innerContainer">
  
      <div class="header">
        <p class="title is-4">Loan Details</p>
      </div>
      <hr>

      <!--Input field for End Date-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">End Date:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input class="input" type="date" v-model="data.dueDateTime">
            </p>
          </div>
        </div>
      </div>      

        <pre>
        {{ $data | json }}
      </pre>
  
      <!-- Save Button -->
      <div class="saveBtn">
        <div class="field is-horizontal">
          <div class="field-label">
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <button class="button is-primary" @click="saveLoanBtn">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Simplert Notification -->
      <simplert :useRadius="true" :useIcon="true" ref="simplert">
      </simplert>
  
    </div>
  </div>
</template>

<script>
// import router from '../../../router'
// import axios from 'axios'
import Simplert from 'vue2-simplert/src/components/simplert'
// import Multiselect from 'vue-multiselect'
// import { loanUrl, categoriesForOptions, subcategoriesForOptions, userOptions, catItemOptionsForLoan, subCatItemOptionsForLoan } from '../../../config'
import moment from 'moment'

export default {
  name: 'app',
  components: {
    Simplert
  },
  data () {
    return {
      data: {
        dueDateTime: ''
      }
    }
  },
  methods: {
    saveLoanBtn () {
      // let self = this

      // // Post Loan data to API
      // axios.post(loanUrl, {
      //   userId: self.selectedUser.userId,
      //   loanDetails: self.loanDetails
      // })
      //   .then((response) => {
      //     let closeFn = () => {
      //       router.push({ path: '/loan/OngoingLoans' })
      //     }
      //     let successAlert = {
      //       title: 'Success',
      //       message: 'Loan record successfully created!',
      //       type: 'success',
      //       onClose: closeFn
      //     }
      //     self.$refs.simplert.openSimplert(successAlert)
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
    }
  },
  created () {
    let self = this

    // Set current Date to calendar
    self.data.dueDateTime = moment(self.currentDateTime, 'YYYY-MM-DD').format('YYYY-MM-DD')
  }
}

</script>

<style>
.field {
  margin: 0 auto;
}

.input {
  width: 300px;
}

.innerContainer {
  margin: 0 auto;
  position: relative;
  margin-right: -150%;
  padding-bottom: 10%;
}

hr {
  margin-left: 2%;
  width: 35%;
}

input {
  margin-top: 5%;
}

label {
  margin-top: 2.4%;
}

button {
  margin-top: 1%;
}

.header {
  margin-left: 6%;
  margin-top: 1.5%;
}

.saveBtn {
  margin-left: 18.8%;
}

.multiselect {
  width: 300px;
  margin-top: 5%;
}


.secondTable {
  margin-top: 1%;
}

.pclass {
  margin-left: 5%;
  font-size: 1.1em;
}

</style>
