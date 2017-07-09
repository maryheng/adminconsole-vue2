<template>
  <div id="container">
    <div class="innerContainer">
  
      <div class="header">
        <p class="title is-4">Staff Details</p>
      </div>
      <hr>

      <image-uploader :url="url" :data="data"></image-uploader>
  
      <!--Input field for Name-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Full Name:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input class="input" type="text" placeholder="Name" v-model="data.name">
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
              <input class="input" type="text" placeholder="Username" v-model="data.username">
            </p>
          </div>
        </div>
      </div>
  
      <div class="saveBtn">
        <div class="field is-horizontal">
          <div class="field-label">
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <button class="button is-primary">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- ~~~~~~~~~~CHANGE OF PASSWORD SECTION~~~~~~~~~~~~~~~~ -->
      <div class="header">
        <p class="title is-4">Manage Password</p>
      </div>
      <hr>
  
      <!--Change Password:-->
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
  
        <!--Input field for Change Password-->
        <div class="passwordField">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Password:</label>
            </div>
            <div class="field-body">
              <div class="field is-grouped">
                <p class="control">
                  <input class="input" type="password" placeholder="Password" v-model="data.password">
                </p>
              </div>
            </div>
          </div>
        </div>
  
        <!--Update button for Change Password-->
        <div class="updateBtn">
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
      </modal>

      <div class="deleteBtn">
        <div class="field is-horizontal">
          <div class="field-label">
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <button class="button" @click="deleteBtn" >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import imageUploader from '../../imageuploader/ImageUploader.vue'
import modal from '../../modal/Modal.vue'
import Simplert from '../../simplert/Simplert.vue'
// import { staffUrl } from '../../../config'
// import axios from 'axios'

export default {
  name: 'app',
  components: {
    imageUploader,
    modal,
    Simplert
  },
  data () {
    return {
      data: {
        name: '',
        username: '',
        password: ''
      },
      // url: 'http://101.198.151.190/api/upload.php'
      url: 'https://fypadminconsoletest.azurewebsites.net/api/staffs',
      showChangePasswordModal: false,
      ref: ''
    }
  },
  methods: {
    deleteBtn () {
      let confirmFn = function () {
        alert('I am Confirmed')
      }
      let obj = {
        title: 'Alert Title',
        message: 'Alert Message',
        type: 'info',
        useConfirmBtn: true,
        onConfirm: confirmFn
      }
      this.$refs.simplert.openSimplert(obj)
    }
  }
  // mounted () {
  //   axios.get(staffUrl)
  //     .then(function (response) {
  //       console.log(response)
  //       response.data.
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }
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
  margin-right: -2000px;
  padding-bottom: 10%;
}

hr {
  margin-left: 2%;
  width: 35%;
}

input {
  margin-top: 10px;
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
  padding : 5% 0 5% 0;
  margin-right: -120%;
}

.updateBtn {
  margin-left: 50%;
}

.saveBtn {
  margin-left: 5.2%;
}

.deleteBtn {
  float: left;
  margin-top: 2%;
}
</style>
