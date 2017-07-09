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
                <button class="button is-primary">
                  Save
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
// import router from '../../router'

export default {
  name: 'app',
  components: {
    imageUploader
  },
  data () {
    return {
      data: {
        name: '',
        username: '',
        password: ''
      },
      // url: 'http://101.198.151.190/api/upload.php'
      url: 'https://fypadminconsoletest.azurewebsites.net/api/staffs'
    }
  }
  // methods: {
  //   onAction (action, data, index) {
  //     console.log('slot action: ' + action, data.name, index)
  //     router.push({ path: '/user/UpdateStaff' })
  //   }
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

.header {
  margin-left: 200px;
  margin-top: 1%;
}

.saveBtn {
  margin-left: 5.2%;
}
</style>
