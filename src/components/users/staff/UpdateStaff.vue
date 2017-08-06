<template>
  <div id="container">
    <div class="innerContainer">
  
      <div class="header">
        <p class="title is-4">Staff Details</p>
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
  
        <!--Input field for Name-->
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Full Name:</label>
          </div>
          <div class="field-body">
            <div class="field is-grouped">
              <p class="control">
                <input class="input" v-validate="'required|alpha_spaces|max:100'" :class="{'input': true, 'is-danger': errors.has('name') }" name="name" type="text" placeholder="Name" v-model="data.name">
                <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
              </p>
            </div>
          </div>
        </div>
  
        <!--Input field for Username-->
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Username:</label>
          </div>
          <div class="field-body">
            <div class="field is-grouped">
              <p class="control">
                <input class="input" v-validate="'required|alpha_dash'" :class="{'input': true, 'is-danger': errors.has('username') }" name="username" type="text" placeholder="Username" v-model="data.username">
                <span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
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
                  <button class="button is-primary">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form> 
      <!-- End of validateBeforeUpdate -->
  
      <!-- ~~~~~~~~~~CHANGE OF PASSWORD SECTION~~~~~~~~~~~~~~~~ -->
      <div class="header">
        <p class="title is-4">Manage Password</p>
      </div>
      <hr>
  
      <!-- Model - Change Password:-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Change your password here:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <div class="managePasswordBtn">
              <p class="control">
                <button class="button is-light" @click="showChangePasswordModal = true">
                  Manage Password
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
  
      <!--Modal for Change Password-->
      <modal v-if="showChangePasswordModal" @close="showChangePasswordModal = false">
        <div class="passwordHeader">
          <div class="header">
            <p class="title is-4">Change Password</p>
          </div>
        </div>
        <br>
  
        <!-- Form Validation -->
        <form @submit.prevent="validateNewPasswordsBeforeUpdate">

        <!--Input field for Change New Password-->
        <div class="passwordField">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">New Password:</label>
            </div>
            <div class="field-body">
              <div class="field is-grouped">
                <p class="control">
                  <input class="input" v-validate="'required|min:8|confirmed:new re-password'" :class="{'input': true, 'is-danger': errors.has('new password') }"
                  name="new password" type="password" placeholder="New Password" v-model="data.newPassword">
                 <span v-show="errors.has('new password')" class="help is-danger">{{ errors.first('new password') }}</span>                
                </p>
              </div>
            </div>
          </div>
        </div>
  
        <!--Input field for Change Re-enter New Password-->
        <div class="passwordField">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Re-enter New Password:</label>
            </div>
            <div class="field-body">
              <div class="field is-grouped">
                <p class="control">
                  <input class="input" type="password" v-validate="'required|min:8|confirmed:new password'" :class="{'input': true, 'is-danger': errors.has('new re-password') }"
                  name="new re-password" placeholder="New Re-Password" v-model="data.newRePassword">
                <span v-show="errors.has('new re-password')" class="help is-danger">{{ errors.first('new re-password') }}</span>                
                </p>
              </div>
            </div>
          </div>
        </div>
  
        <!--Update button for Change Password-->
        <div class="updatePwdBtn">
          <div class="field is-horizontal">
            <div class="field-label">
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <button class="button is-info">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </form>
      </modal>
  
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
import modal from '../../modal/Modal.vue'
import { staffUrl } from '../../../config'
import axios from 'axios'
import Simplert from 'vue2-simplert/src/components/simplert'

export default {
  name: 'app',
  components: {
    modal,
    Simplert
  },
  data () {
    return {
      data: {
        name: '',
        username: '',
        newPassword: '',
        newRePassword: ''
      },
      showChangePasswordModal: false,
      image: '',
      staffUserId: '',
      checked: true
    }
  },
  methods: {
    // Update Staff Record; image, name, username
    validateBeforeUpdate () {
      let self = this
      self.$validator.validateAll().then(result => {
        if (result) {
          let formData = new FormData()
          // Post Staff data to server
          formData.append('userImage', self.$refs.image.files[0])
          formData.append('name', this.data.name)
          formData.append('username', this.data.username)

          axios.put(staffUrl + self.staffUserId, formData)
            .then((response) => {
              let closeFn = () => {
                router.push({ path: '/user/staff' })
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
    validateNewPasswordsBeforeUpdate () {
      let self = this
      self.$validator.validateAll().then(result => {
        if (result) {
          // Update Staff's Password
          axios.put(staffUrl + self.staffUserId + '/changePasswords', {
            newPassword: this.data.newPassword,
            newRePassword: this.data.newRePassword
          })
            .then((response) => {
              let closeFn = () => {
                // router.push({ name: 'UpdateStaff', params: { userId: self.staffUserId } })
                window.open('/user/UpdateStaff/' + self.staffUserId, '_self')
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
    // Delete Staff Record
    deleteBtn () {
      let self = this
      let confirmFn = () => {
        axios.delete(staffUrl + self.staffUserId)
        .then((response) => {
          // Success Alert
          let closeFn = () => {
            // After deletion, go to Staff Page
            router.push({ path: '/user/staff' })
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
        message: 'Are you sure you want to delete staff record?',
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
      console.log('file is below')
      console.log(file)
      reader.readAsDataURL(file)
    }
  },
  created () {
    let self = this
    // Grab path from URL
    const path = window.location.pathname

    // Break the path into segments
    // ""/"user"/"UpdateStaff"/"{userId}"
    const segments = path.split('/')

    // Assigned userId
    self.staffUserId = segments[3]

    // Based on the userId in the URL, get data for the user
    axios.get(staffUrl + self.staffUserId)
      .then((response) => {
        console.log(response)
        self.data.username = response.data.username
        self.data.name = response.data.name
        self.image = response.data.userImageUrl
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>


<style>
.field {
  margin-right: -700px;
  margin: 0 auto;
}

.input {
  margin: 8px;
}

.innerContainer {
  margin: 0 auto;
  position: relative;
  margin-right: -150%;
  padding-bottom: 12%;
}

hr {
  margin-left: 2%;
  width: 35%;
}

.input {
  margin-top: 10px;
  width: 300px;
}

label {
  margin-top: 8px;
}

button {
  margin-top: 1%;
}

.managePasswordBtn {
  margin: 0.3% 0 0 0;
}

.header {
  margin-left: 200px;
  margin-top: 1%;
}

.passwordHeader {
  margin-left: -30%;
}

.passwordField {
  margin-right: -120%;
  margin-top: 2%;
}

.updatePwdBtn {
  margin-top: 5%;
  margin-left: 69.2%;
}

.updateBtn {
  margin-left: 7.8%;
}

.deleteBtn {
  float: left;
  margin-top: 3%;
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
</style>
