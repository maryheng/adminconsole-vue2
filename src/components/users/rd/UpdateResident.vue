<template>
  <div id="test2">
    <div class="innerContainer">
  
      <div class="header">
        <p class="title is-4">User Details</p>
      </div>
      <hr>
  
      <!-- Upload Image -->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Upload Image:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <div id="chooseFileDiv">
              <p class="control">
                <input type="file" class="input" ref="image" name="image" id="image">
              </p>
            </div>
          </div>
        </div>
      </div>
  
      <!--Input field for Full Name-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Full Name:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input class="input" type="text" v-model="data.name">
            </p>
          </div>
        </div>
      </div>
  
      <!--Input field for Email-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Email:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input class="input" type="email" v-model="data.email">
            </p>
          </div>
        </div>
      </div>
  
      <!--Input field for NRIC-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">NRIC/Passport Number:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input class="input" type="text" v-model="data.nric">
            </p>
          </div>
        </div>
      </div>
  
      <!--Input field for Mobile Number-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Mobile Number:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input class="input" type="number" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="8" v-model="data.mobileNumber">
            </p>
          </div>
        </div>
      </div>
  
      <br>
      <br>
      <div class="header">
        <p class="title is-4">Access Card</p>
      </div>
      <hr>
  
      <!--Input field for Key Card Reference Number-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Key Card Reference Number:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input class="input" type="text" v-model="data.keyCardReferenceNo">
            </p>
          </div>
        </div>
      </div>
  
      <!--Input field for Issurance Date-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Issurance Date:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input class="input" type="date" v-model="data.issuranceData">
            </p>
          </div>
        </div>
      </div>
  
      <!-- Update Button -->
      <div class="updateBtn">
        <div class="field is-horizontal">
          <div class="field-label">
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <button class="button is-primary" @click="updateRdBtn">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="deleteBtn">
        <div class="field is-horizontal">
          <div class="field-label">
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <button class="button" @click="deleteBtn">
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
</template>

<script>
import router from '../../../router'
import axios from 'axios'
import { rdUrl } from '../../../config'
import Simplert from 'vue2-simplert/src/components/simplert'
import moment from 'moment'

export default {
  name: 'app',
  components: {
    Simplert
  },
  data () {
    return {
      data: {
        name: '',
        email: '',
        nric: '',
        mobileNumber: '',
        keyCardReferenceNo: ''
      },
      image: ''
    }
  },
  methods: {
    updateRdBtn () {
    //   axios.post('/testing', {
    //     issuranceDate: moment(this.data.issuranceData).format('DD-MM-YYYY')
    //   })
    //     .then(function (response) {
    //       console.log(response)
    //     })
    //     .catch(function (error) {
    //       console.log(error)
    //     })
      let self = this
      if (self.$refs.image.files[0]) {
        let formData = new FormData()

        formData.append('userImage', self.$refs.image.files[0])
        formData.append('name', this.data.name)
        formData.append('email', this.data.email)
        formData.append('nric', this.data.nric)
        formData.append('mobileNumber', this.data.mobileNumber)
        formData.append('keyCardReferenceNo', this.data.keyCardReferenceNo)
        formData.append('issuranceData', moment(this.data.issuranceData).format('DD-MM-YYYY'))

        // Post Staff FormData to server
        axios.post('/testing', formData)
          .then(function (response) {
            let closeFn = function () {
              router.push({ path: '/user/residentdeveloper' })
            }
            let successAlert = {
              title: 'Success',
              message: 'Resident Developer record successfully created!',
              type: 'success',
              onClose: closeFn
            }
            self.$refs.simplert.openSimplert(successAlert)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    // Delete RD Record
    deleteBtn () {
      let self = this
      let confirmFn = function () {
        axios.delete(rdUrl + '/159e4b54-bc64-4fd3-9c6c-187c81d87cb6')
        .then(function (response) {
          console.log(response)
        })
          .catch(function (error) {
            console.log(error)
          })
        let successAlert = {
          title: 'Success',
          message: 'Resident Developer record successfully deleted!',
          type: 'success'
        }
        self.$refs.simplert.openSimplert(successAlert)
      }
      let deleteAlert = {
        title: 'Warning',
        message: 'Are you sure you want to delete resident developer record?',
        type: 'warning',
        useConfirmBtn: true,
        onConfirm: confirmFn
      }
      self.$refs.simplert.openSimplert(deleteAlert)
    }
  }, // end of Methods ()
  // Created Hook
  created () {
    // ~~~~~~~~~~~~ HARDCODED ~~~~~~~~~~~~~~
    let self = this
    axios.get(rdUrl + '/159e4b54-bc64-4fd3-9c6c-187c81d87cb6')
      .then(function (response) {
        // need to ask about the PHOTO
        self.data.username = response.data.username
        self.data.name = response.data.name
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

</script>


<style>
.box {
  padding-bottom: 10%;
}

.header {
  margin-left: 200px;
  margin-top: 1%;
}

.innerContainer {
  margin: 0 auto;
  position: relative;
  margin-right: -150%;
}

input {
  margin-top: 10px;
}

label {
  margin-top: 8px;
}

hr {
  margin-left: 2%;
  width: 35%;
}

button {
  margin-top: 1%;
}

.input {
  width: 300px;
}

.updateBtn {
  margin-left: 7.8%;
}

.deleteBtn {
  float: left;
  margin-top: 2%;
}
</style>
