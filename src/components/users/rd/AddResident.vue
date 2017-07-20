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
  
      <!--Input field for issuance Date-->
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
  
      <!-- Save Button -->
      <div class="saveBtn">
        <div class="field is-horizontal">
          <div class="field-label">
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <button class="button is-primary" @click="saveRdBtn">
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
      image: ''
    }
  },
  methods: {
    saveRdBtn () {
      // axios.post('/testing', {
      //   // issuanceDate: (new Date(this.data.issuanceDate)).toISOString()
      //   // issuanceDate: moment(this.data.issuanceDate).format('DD-MM-YYYY')
      //   issuanceDate: this.data.issuanceDate
      // })
      //   .then((response) => {
      //     console.log(response)
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
      let self = this
      if (self.$refs.image.files[0]) {
        let formData = new FormData()

        formData.append('userImage', self.$refs.image.files[0])
        formData.append('name', this.data.name)
        formData.append('email', this.data.email)
        formData.append('company', this.data.company)
        formData.append('nricPassportNo', this.data.nricPassportNo)
        formData.append('mobileNo', this.data.mobileNo)
        formData.append('keyCardRefNo', this.data.keyCardRefNo)
        // formData.append('issuanceDate', (new Date(this.data.issuanceDate)).toISOString())
        formData.append('issuanceDate', this.data.issuanceDate)
        console.log(formData)
        // Post Staff FormData to server
        axios.post(rdUrl, formData)
          .then((response) => {
            console.log(response)
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
      }
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

.saveBtn {
  margin-left: 8.4%;
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
