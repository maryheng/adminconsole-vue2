<template>
  <div id="test2">
    <div class="innerContainer">
      <div class="box">
      <div class="backForResident">
      <router-link to="/user/ResidentDeveloper">
        <button type="button" class="button is-light">Back</button>
      </router-link>
    </div>
      <div class="header">
        <p class="title is-4">User Details</p>
      </div>
      <hr>
      <!-- Form Validation -->
      <form @submit.prevent="validateBeforeUpdate">
        <!-- Upload Image -->
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Upload Image:</label>
          </div>
          <div class="field-body">
            <div class="field is-grouped">
              <div id="chooseFileDiv">
                <p class="control">
                  <div id="imageShowDiv" v-show="this.checked === true" v-bind:style="{ 'backgroundImage': 'url(' + this.image + ')' }"></div>
                  <input type="file" accept="image/*"
                  v-validate="'mimes:image/*|size:4000'" :class="{'input': true, 'is-danger': errors.has('image') }"
                  @change="onFileChange" class="input" ref="image" name="image" id="image" value="value">
                  <span v-show="errors.has('image')" class="help is-danger">{{ errors.first('image') }}</span>
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
                <input class="input" name="name" v-validate="'required|alpha_spaces|max:100'" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" v-model="data.name">
                <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
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
                <input class="input" type="text" name="NRIC/Passport Number" v-validate="'required|alpha_num|max:50'" :class="{'input': true, 'is-danger': errors.has('NRIC/Passport Number') }" v-model="data.nricPassportNo">
                <span v-show="errors.has('NRIC/Passport Number')" class="help is-danger">{{ errors.first('NRIC/Passport Number') }}</span>
              </p>
            </div>
          </div>
        </div>
  
        <!--Input field for Company Name-->
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Company Name:</label>
          </div>
          <div class="field-body">
            <div class="field is-grouped">
              <p class="control">
                <input class="input" type="text" name="company name" v-validate="'required|max:100'" :class="{'input': true, 'is-danger': errors.has('company name') }" v-model="data.company">
                <span v-show="errors.has('company name')" class="help is-danger">{{ errors.first('company name') }}</span>
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
                <input name="email" v-validate="'required|email|max:100'" :class="{'input': true, 'is-danger': errors.has('email') }" type="email" v-model="data.email">
                <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
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
                <input class="input" type="number" name="mobile number" v-validate="'required|max:30'" :class="{'input': true, 'is-danger': errors.has('mobile number') }" v-model="data.mobileNo">
                <span v-show="errors.has('mobile number')" class="help is-danger">{{ errors.first('mobile number') }}</span>
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
                <input class="input" type="text" name="key card reference number" v-validate="'max:50'" :class="{'input': true, 'is-danger': errors.has('key card reference number') }" v-model="data.keyCardRefNo">
                <span v-show="errors.has('key card reference number')" class="help is-danger">{{ errors.first('key card reference number') }}</span>
              </p>
            </div>
          </div>
        </div>
  
        <!--Input field for Issuance Date-->
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Issurance Date:</label>
          </div>
          <div class="field-body">
            <div class="field is-grouped">
              <p class="control">
                <input class="input" type="date" name="issuance date" v-model="data.issuanceDate">
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
      </form>
  
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
        nricPassportNo: '',
        company: '',
        email: '',
        mobileNo: '',
        keyCardRefNo: '',
        issuanceDate: ''
      },
      image: '',
      rdUserId: '',
      checked: true
    }
  },
  methods: {
    validateBeforeUpdate () {
      let self = this
      this.$validator.validateAll().then(result => {
        if (result) {
          let formData = new FormData()

          formData.append('userImage', self.$refs.image.files[0])
          formData.append('name', this.data.name)
          formData.append('nricPassportNo', this.data.nricPassportNo)
          formData.append('company', this.data.company)
          formData.append('email', this.data.email)
          formData.append('mobileNo', this.data.mobileNo)

          // If issuance date is filled up, send formdata
          if (!(self.data.issuanceDate === '')) {
            formData.append('issuanceDate', self.data.issuanceDate)
          }

          // If key card reference number is filled up, send formdata
          if (!(self.data.keyCardRefNo === '')) {
            formData.append('keyCardRefNo', self.data.keyCardRefNo)
          }

          // Post Staff FormData to server
          axios.put(rdUrl + self.rdUserId, formData)
            .then((response) => {
              let closeFn = () => {
                router.push({ path: '/user/residentdeveloper' })
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
              let errorAlert = {
                title: 'Error',
                message: error.response.data.message,
                type: 'error'
              }
              self.$refs.simplert.openSimplert(errorAlert)
            })
          return
        }
        let errorAlert = {
          title: 'Error',
          message: 'Some fields are incorrect!',
          type: 'error'
        }
        self.$refs.simplert.openSimplert(errorAlert)
      })
    },
    // Delete RD Record
    deleteBtn () {
      let self = this
      let confirmFn = () => {
        axios.delete(rdUrl + self.rdUserId)
        .then((response) => {
          console.log(response)
          let closeFn = () => {
            // After deletion, route to Resident Developer Page
            router.push({ path: '/user/residentdeveloper' })
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
        message: 'Are you sure you want to delete resident developer record?',
        type: 'warning',
        useConfirmBtn: true,
        onConfirm: confirmFn
      }
      self.$refs.simplert.openSimplert(deleteAlert)
    },
    onFileChange (e) {
      this.checked = true
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        this.image = null
        this.checked = false
        return
      }
      this.createImage(files[0])
    },
    createImage (file) {
      var reader = new FileReader()
      var vm = this

      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }, // end of Methods ()
  created () {
    let self = this
    // Grab path from URL
    const path = window.location.pathname

    // Break the path into segments
    // ""/"UpdateResident"/"{userId}"
    const segments = path.split('/')

    // Assigned userId
    self.rdUserId = segments[2]

    // Based on the userId in the URL, get data for the user
    axios.get(rdUrl + self.rdUserId)
      .then((response) => {
        console.log(response)
        self.data.name = response.data.name
        self.data.nricPassportNo = response.data.nricPassportNo
        self.data.company = response.data.company
        self.data.email = response.data.email
        self.data.mobileNo = response.data.mobileNo
        self.data.keyCardRefNo = response.data.keyCardRefNo
        self.data.issuanceDate = moment(response.data.issuanceDate).format('YYYY-MM-DD')
        self.image = response.data.userImageUrl
      })
      .catch((error) => {
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
  margin-top: 5%;
}

label {
  margin-top: 2.5%;
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

#imageShowDiv {
  border-radius: 100%;
  width: 200px;
  height: 200px;
  display: block;
  margin: auto;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  margin-bottom: 10%;
}

.backForResident {
  float: left;
}
</style>
