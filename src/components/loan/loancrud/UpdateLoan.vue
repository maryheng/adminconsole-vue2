<template>
  <div id="updateLoanDiv">
    <div class="innerContainer">
      <p class="title is-4">Manage Loans</p>
      <div class="box">

      <div class="backForLoan">
        <router-link to="/loan/dueloans">
          <button type="button" class="button is-light">Back</button>
        </router-link>
      </div>

      <div class="header">
        <p class="title is-4">Loan Details</p>
      </div>
      <hr>

      <!-- Form Validation -->
      <form @submit.prevent="validateBeforeUpdate">
      <!--Input field for End Date-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Due Date:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('due date') }"
              name="due date" class="input" type="datetime-local" v-model="data.dueDateTime">
              <span v-show="errors.has('due date')" class="help is-danger">{{ errors.first('due date') }}</span>        
            </p>
          </div>
        </div>
      </div>      
  
      <div class="noUpdateOfDT" v-show="this.checked === true">
      <span class="tag is-warning is-medium">
        This loan is made from the Pixel Mirror. Hence,
        updating of datetime is not allowed!</span>
    </div>

      <!-- Save Button -->
      <div class="updateLoanBtn">
        <div class="field is-horizontal">
          <div class="field-label">
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <button class="button is-primary" :disabled="isDisabled">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  
      <!-- Simplert Notification -->
      <simplert :useRadius="true" :useIcon="true" ref="simplert">
      </simplert>
  
      </div>
    </div>
  </div>
</template>

<script>
import router from '../../../router'
import axios from 'axios'
import Simplert from 'vue2-simplert/src/components/simplert'
import { loanUrl, updateDueDateTimeUrl } from '../../../config'
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
      },
      getLoanId: '',
      isDisabled: false,
      checked: false
    }
  },
  methods: {
    validateBeforeUpdate () {
      let self = this
      self.$validator.validateAll().then(result => {
        if (result) {
          self.isDisabled = true
          // Convert datetime to UTC
          self.data.dueDateTime = moment(self.data.dueDateTime).utc().format()
          // Update loan's duedatetime data to API
          axios.put(loanUrl + self.getLoanId + updateDueDateTimeUrl, {
            dueDateTime: self.data.dueDateTime
          })
            .then((response) => {
              let closeFn = () => {
                router.push({ path: '/loan/ongoingloans' })
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
              self.isDisabled = false
              let errorAlert = {
                title: 'Error',
                message: error.response.data.message,
                type: 'error'
              }
              self.$refs.simplert.openSimplert(errorAlert)
            })
          return
        }
        self.isDisabled = false
        let errorAlert = {
          title: 'Error',
          message: 'Some fields are incorrect!',
          type: 'error'
        }
        self.$refs.simplert.openSimplert(errorAlert)
      })
    }
  },
  created () {
    let self = this

    // Grab path from URL
    const path = window.location.pathname

    // Break the path into segments
    const segments = path.split('/')

    // Assigned loanId
    self.getLoanId = segments[2]

    // Based on the loanId in the URL, get data for the user
    axios.get(loanUrl + self.getLoanId)
      .then((response) => {
        if (response.data.returnDateTime) {
          self.isDisabled = true
          self.checked = true
        }
        self.data.dueDateTime = moment.utc(response.data.dueDateTime).toDate()
        self.data.dueDateTime = moment(self.data.dueDateTime).format('YYYY-MM-DDTHH:mm')
      })
      .catch((error) => {
        console.log(error)
      })
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

.updateLoanBtn {
  margin-left: 7.6%;
  margin-top: 1%;
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

.backForLoan {
  float: left;
}

#updateLoanDiv .box {
  padding-bottom: 10%;
}

.noUpdateOfDT {
  margin-left: 10%;
}
</style>
