<template>
  <div id="container">
    <div class="innerContainer">
  
      <div class="header">
        <p class="title is-4">Staff Details</p>
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
                  <input type="file" accept="image/jpeg"
                  v-validate="'required|mimes:image/jpeg'" :class="{'input': true, 'is-danger': errors.has('image') }" @change="onFileChange" class="input" ref="image" name="image" id="image">
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
                <input class="input" v-validate="'required|alpha_spaces|max:100'" :class="{'input': true, 'is-danger': errors.has('name') }"
                name="name" type="text" placeholder="Name" v-model="data.name">
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
  
        <!--Input field for Password-->
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Password:</label>
          </div>
          <div class="field-body">
            <div class="field is-grouped">
              <p class="control">
                <input class="input" v-validate="'required|min:8'" :class="{'input': true, 'is-danger': errors.has('password') }" name="password" type="password" placeholder="Password" v-model="data.password">
                <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
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
                  <button class="button is-primary">
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
</template>

<script>
import router from '../../../router'
import axios from 'axios'
import Simplert from 'vue2-simplert/src/components/simplert'
import { staffUrl } from '../../../config'

export default {
  name: 'app',
  components: {
    Simplert
  },
  data () {
    return {
      data: {
        name: '',
        username: '',
        password: ''
      },
      image: '',
      checked: false
    }
  },
  methods: {
    // Validation with submit button
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then(result => {
        console.log(result)
        if (result) { // no errors from fields
          if (self.$refs.image.files[0]) {
            let formData = new FormData()

            formData.append('userImage', self.$refs.image.files[0])
            formData.append('name', this.data.name)
            formData.append('username', this.data.username)
            formData.append('password', this.data.password)

            // Post Staff FormData to server
            axios.post(staffUrl, formData)
              .then((response) => {
                let closeFn = () => {
                  router.push({ path: '/user/staff' })
                }
                let successAlert = {
                  title: 'Success',
                  message: 'Staff record successfully created!',
                  type: 'success',
                  onClose: closeFn
                }
                self.$refs.simplert.openSimplert(successAlert)
              })
              .catch((error) => {
                console.log(error)
                let errorAlert = {
                  title: 'Error',
                  message: 'Something went wrong!',
                  type: 'error'
                }
                self.$refs.simplert.openSimplert(errorAlert)
              })
          }
          return
        } // If fields still have errors
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

.saveBtn {
  margin-left: 8.4%;
}

#imageShowDiv {
  border-radius: 50%;
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
