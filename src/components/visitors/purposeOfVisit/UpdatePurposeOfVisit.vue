<template>
  <div id="containerForPurpose">
    <div class="innerContainer">
      <div class="box">

      <div class="backForVisitor">
        <router-link to="/visitor/PurposeOfVisit">
          <button type="button" class="button is-light">Back</button>
        </router-link>
      </div>

      <div class="header">
        <p class="title is-4">Purpose of Visit</p>
      </div>
      <hr>
  
      <!-- Form Validation -->
      <form @submit.prevent="validateBeforeSubmit">
      <!--Input field for Organization Name-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Purpose of Visit:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input v-validate="'required|max:30'" :class="{'input': true, 'is-danger': errors.has('purpose of visit') }"
              name="purpose of visit" class="input" type="text" placeholder="Purpose of Visit" v-model="data.visitPurpose">
              <span v-show="errors.has('purpose of visit')" class="help is-danger">{{ errors.first('purpose of visit') }}</span>                               
            </p>
          </div>
        </div>
      </div>
  
      <!-- Save Button -->
      <div class="saveBtn">
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
  
      <!-- Delete Purpose of Visit Button -->
      <div class="deletePurposeBtn">
        <div class="field is-horizontal">
          <div class="field-label">
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <button class="button" @click="deleteBtn" :disabled="isDisabled">
                  Delete
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
  </div>
</template>

<script>
import router from '../../../router'
import axios from 'axios'
import Simplert from 'vue2-simplert/src/components/simplert'
import { visitPurpose } from '../../../config'

export default {
  name: 'app',
  components: {
    Simplert
  },
  data () {
    return {
      data: {
        visitPurpose: ''
      },
      visitPurposeOptionId: '',
      isDisabled: false
    }
  },
  methods: {
    // PUT Purpose of Visit Data to server
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then(result => {
        if (result) {
          self.isDisabled = true
          axios.put(visitPurpose + self.visitPurposeOptionId, {
            visitPurpose: self.data.visitPurpose
          })
            .then((response) => {
              let closeFn = () => {
                router.push({ path: '/visitor/PurposeOfVisit' })
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
    },
    // Delete Purpose of Visit Data
    deleteBtn () {
      let self = this

      let confirmFn = () => {
        self.isDisabled = true
        axios.delete(visitPurpose + self.visitPurposeOptionId)
        .then((response) => {
          // Success Alert
          let closeFn = () => {
            // After deletion, go to Purpose of Visit Page
            router.push({ path: '/visitor/PurposeOfVisit' })
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
      }
      let deleteAlert = {
        title: 'Warning',
        message: 'Are you sure you want to delete Purpose of Visit record?',
        type: 'warning',
        useConfirmBtn: true,
        onConfirm: confirmFn
      }
      self.$refs.simplert.openSimplert(deleteAlert)
    }
  },
  created () {
    let self = this

    // Grab path from URL
    const path = window.location.pathname

    // Break the path into segments
    // ""/"visitor"/"UpdatePurposeOfVisit"/"visitPurposeOptionId"
    const segments = path.split('/')

    // Asign visitPurposeOptionId
    self.visitPurposeOptionId = segments[2]

    axios.get(visitPurpose + self.visitPurposeOptionId)
      .then((response) => {
        self.data.visitPurpose = response.data.visitPurposeText
      })
  }
}

</script>

<style>
#containerForPurpose .box {
  padding-bottom: 13%;
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

.saveBtn {
  margin-left: 7.6%;
}

.multiselect {
  width: 300px;
  margin-top: 4%;
}

.deletePurposeBtn {
  float: left;
  margin-top: 10%;
}

.backForVisitor {
  float: left;
}
</style>
