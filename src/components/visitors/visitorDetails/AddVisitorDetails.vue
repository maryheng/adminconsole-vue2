<template>
  <div id="visitorDetailsContainer">
    <div class="innerContainer">
      <p class="title is-4">Manage Visitors</p>
      <div class="box">

      <div class="backForVisitor">
        <router-link to="/visitor/visitordetails">
          <button type="button" class="button is-light">Back</button>
        </router-link>
      </div>
    
      <div class="header">
        <p class="title is-4">Visitor Details</p>
      </div>
      <hr>
  
      <!-- Form Validation -->
      <form @submit.prevent="validateBeforeSubmit">
      <!--Input field for Organization Name-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Organization Name:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input v-validate="'required|max:100'" :class="{'input': true, 'is-danger': errors.has('organization name') }"
              name="organization name" class="input" type="text" placeholder="Organization Name" v-model="data.organizationName">
              <span v-show="errors.has('organization name')" class="help is-danger">{{ errors.first('organization name') }}</span>                   
            </p>
          </div>
        </div>
      </div>
  
      <!--Input field for Purpose of Visit-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Purpose Of Visit:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <div id="multiselectForVisitors">
            <p class="control">
                <multiselect
                v-model="selectedVisitPurpose"
                v-validate data-vv-rules="required"
                data-vv-name="visit purpose"  
                :options="options"
                :searchable="false"
                :allow-empty="true"
                label="visitPurposeText"
                track-by="visitPurposeText"
                open-direction="bottom"
                >
                </multiselect>
                <span v-show="errors.has('visit purpose')" class="help is-danger">{{ errors.first('visit purpose') }}</span>                
            </p>
            </div>
          </div>
        </div>
      </div>
  
      <!--Input field for Visitor Count-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Visitor Count:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('visitor count') }"
              name="visitor count" class="input" type="number" placeholder="Visitor Count" v-model="data.visitorCount">
              <span v-show="errors.has('visitor count')" class="help is-danger">{{ errors.first('visitor count') }}</span>                      
            </p>
          </div>
        </div>
      </div>

      <!--Input field for Visit DateTime-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Visit Date & Time:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('visit date') }"
              name="visit date" class="input" type="datetime-local" placeholder="Date Time" v-model="data.visitDateTime">
              <span v-show="errors.has('visit date')" class="help is-danger">{{ errors.first('visit date') }}</span>        
            </p>
          </div>
        </div>
      </div>      
  
      <!-- Save Button -->
      <div class="saveVisitorBtn">
        <div class="field is-horizontal">
          <div class="field-label">
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <button class="button is-primary" :disabled="isDisabled">
                  Save
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
import { visitors, visitPurposesForOptions } from '../../../config'
import Multiselect from 'vue-multiselect'
import moment from 'moment'

export default {
  name: 'app',
  components: {
    Simplert,
    Multiselect
  },
  data () {
    return {
      data: {
        organizationName: '',
        visitorCount: '',
        visitDateTime: '',
        visitPurposeText: ''
      },
      purposeText: '',
      selectedVisitPurpose: [],
      options: [],
      allVisitPurpose: [],
      isDisabled: false
    }
  },
  methods: {
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then(result => {
        if (result) {
          self.isDisabled = true
          // Assign multiselect's selected value to purposeText
          self.purposeText = self.selectedVisitPurpose.visitPurposeText

          // Convert datetime to UTC
          self.data.visitDateTime = moment(self.data.visitDateTime).utc().format()

          // POST visitorDetails data to server
          axios.post(visitors, {
            organizationName: self.data.organizationName,
            visitorCount: self.data.visitorCount,
            visitDateTime: self.data.visitDateTime,
            visitPurposeText: self.purposeText
          })
            .then((response) => {
              let closeFn = () => {
                router.push({ path: '/visitor/visitordetails' })
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
    // Get visit purpose data
    axios.get(visitPurposesForOptions)
      .then((response) => {
        self.allVisitPurpose = response.data

        self.allVisitPurpose.map((item) => {
          const oldTag = {
            visitPurposeText: item.visitPurposeText
          }
          self.options.push(oldTag)
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
#visitorDetailsContainer .box {
  padding-bottom: 8%;
}

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

.saveVisitorBtn {
  margin-left: 8.4%;
}

#multiselectForVisitors .multiselect {
  width: 300px;
  margin-top: 4%;
}

.backForVisitor {
  float: left;
}
</style>
