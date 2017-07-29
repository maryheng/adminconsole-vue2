<template>
  <div id="container">
    <div class="innerContainer">
  
      <div class="header">
        <p class="title is-4">Staff Details</p>
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
  
      <!--Input field for Password-->
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
  
      <!-- Save Button -->
      <div class="saveBtn">
        <div class="field is-horizontal">
          <div class="field-label">
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <button class="button is-primary" @click="saveStaffBtn">
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
      image: ''
    }
  },
  methods: {
    saveStaffBtn () {
      let self = this
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
