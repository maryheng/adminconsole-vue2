<template>
  <div id="addResidentContainer">
    <div class="innerContainer">
      <p class="title is-4">Manage Users</p>
      <div class="box">
      <div class="backForResident">
        <router-link to="/user/residentdeveloper">
          <button type="button" class="button is-light">Back</button>
        </router-link>
      </div>

      <div class="header">
        <p class="title is-4">User Details</p>
      </div>
      <hr>
      <!-- Form Validation -->
      <form @submit.prevent="validateBeforeSubmit">
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
                  v-validate="'required|mimes:image/*|size:4000'" :class="{'input': true, 'is-danger': errors.has('image') }" @change="onFileChange" class="input" ref="image" name="image" id="image">
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
                <input class="input" name="name" v-validate="'required|max:100'" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" v-model="data.name">
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
                <input class="input" type="text" name="mobile number" v-validate="'required|max:30'" :class="{'input': true, 'is-danger': errors.has('mobile number') }" v-model="data.mobileNo">
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
            <label class="label">Issuance Date:</label>
          </div>
          <div class="field-body">
            <div class="field is-grouped">
              <p class="control">
                <input class="input" type="date" name="issuance date" v-model="data.issuanceDate">
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
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Simplert Notification -->
        <simplert :useRadius="true" :useIcon="true" ref="simplert">
        </simplert>
      </form>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../../../router'
import axios from 'axios'
import Simplert from 'vue2-simplert/src/components/simplert'
import { rdUrl } from '../../../config'

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
      checked: false,
      isDisabled: false
    }
  },
  methods: {
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then(result => {
        if (result) {
          self.isDisabled = true
          if (self.$refs.image.files[0]) {
            let formData = new FormData()

            formData.append('userImage', self.$refs.image.files[0])
            formData.append('name', self.data.name)
            formData.append('email', self.data.email)
            formData.append('company', self.data.company)
            formData.append('nricPassportNo', self.data.nricPassportNo)
            formData.append('mobileNo', self.data.mobileNo)

            // If issuance date is filled up, send formdata
            if (!(self.data.issuanceDate === '')) {
              formData.append('issuanceDate', self.data.issuanceDate)
            }

            // If key card reference number is filled up, send formdata
            if (!(self.data.keyCardRefNo === '')) {
              formData.append('keyCardRefNo', self.data.keyCardRefNo)
            }

                        // issuancedate is empty but keycardrefno is filled
            if (self.data.issuanceDate === '' && self.data.keyCardRefNo) {
              let errorAlert = {
                title: 'Error',
                message: 'You need to have a key card reference number!',
                type: 'error'
              }
              self.$refs.simplert.openSimplert(errorAlert)
            }

            if (self.data.keyCardRefNo === '' && self.data.issuanceDate) {
              let errorAlert = {
                title: 'Error',
                message: 'You need to have a issuance date!',
                type: 'error'
              }
              self.$refs.simplert.openSimplert(errorAlert)
            }

            // Post Staff FormData to server
            axios.post(rdUrl, formData)
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
                self.isDisabled = false
                let errorAlert = {
                  title: 'Error',
                  message: error.response.data.message,
                  type: 'error'
                }
                self.$refs.simplert.openSimplert(errorAlert)
              })
          }
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
  }
}

</script>


<style>
#addResidentContainer .box {
  padding-bottom: 5%;
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

.saveBtn {
  margin-left: 8.4%;
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
