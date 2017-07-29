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
                <img :src="image" />
                <input type="file" @change="onFileChange" class="input" ref="image" name="image" id="image">           
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
  
      <!--Input field for NRIC-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">NRIC/Passport Number:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input class="input" type="text" v-model="data.nricPassportNo">
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
              <input class="input" type="text" v-model="data.company">
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

      <!--Input field for Mobile Number-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Mobile Number:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input class="input" type="number" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" 
              maxlength="8" v-model="data.mobileNo">
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
              <input class="input" type="text" v-model="data.keyCardRefNo">
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
              <input class="input" type="date" v-model="data.issuanceDate">
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
        nricPassportNo: '',
        company: '',
        email: '',
        mobileNo: '',
        keyCardRefNo: '',
        issuanceDate: ''
      },
      image: '',
      rdUserId: ''
    }
  },
  methods: {
    updateRdBtn () {
      let self = this
      let formData = new FormData()

      formData.append('userImage', self.$refs.image.files[0])
      formData.append('name', this.data.name)
      formData.append('nricPassportNo', this.data.nricPassportNo)
      formData.append('company', this.data.company)
      formData.append('email', this.data.email)
      formData.append('mobileNo', this.data.mobileNo)
      formData.append('keyCardRefNo', this.data.keyCardRefNo)
      formData.append('issuanceDate', this.data.issuanceDate)

      // Post Staff FormData to server
      axios.put(rdUrl + self.rdUserId, formData)
        .then((response) => {
          let closeFn = () => {
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
        .catch((error) => {
          console.log(error)
        })
      // Post Staff FormData to server
      // axios.put(rdUrl + self.rdUserId, {
      //   name: this.data.name,
      //   nricPassportNo: this.data.nricPassportNo,
      //   company: this.data.company,
      //   email: this.data.email,
      //   mobileNo: this.data.mobileNo,
      //   keyCardRefNo: this.data.keyCardRefNo,
      //   issuanceDate: this.data.issuanceDate
      // })
      //   .then((response) => {
      //     let closeFn = () => {
      //       router.push({ path: '/user/residentdeveloper' })
      //     }
      //     let successAlert = {
      //       title: 'Success',
      //       message: 'Resident Developer record successfully created!',
      //       type: 'success',
      //       onClose: closeFn
      //     }
      //     self.$refs.simplert.openSimplert(successAlert)
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
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
            message: 'Resident Developer record successfully deleted!',
            type: 'success',
            onClose: closeFn
          }
          self.$refs.simplert.openSimplert(successAlert)
        })
          .catch((error) => {
            console.log(error)
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
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
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
    // ""/"user"/"UpdateResident"/"{userId}"
    const segments = path.split('/')

    // Assigned userId
    self.rdUserId = segments[3]

    // Based on the userId in the URL, get data for the user
    axios.get(rdUrl + self.rdUserId)
      .then((response) => {
        // ****** IMAGE ********
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

img {
  border-radius: 50%;
  width: 200px;
  height: 200px;
  margin: auto;
  display: block;
  margin-bottom: 30px;
  margin-left: 15%;
}
</style>
