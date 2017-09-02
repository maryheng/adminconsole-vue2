<template>
  <div id="container">
    <div class="innerContainer">
      <p class="title is-4">Manage Training</p>
      <div class="box">

      <div class="backForTraining">
        <router-link to="/training">
          <button type="button" class="button is-light">Back</button>
        </router-link>
      </div>

        <div class="header">
          <p class="title is-4">Training Of Cognitive Service</p>
        </div>
        <hr>
  
        <!-- Upload Image -->
        <div class="field is-horizontal">
          <div class="imageDiv">
            <div class="field is-grouped">
              <div id="chooseFileDiv">
                <!-- <div id="imageShowDivForTraining" v-bind:style="{ 'backgroundImage': 'url(' + this.image + ')' }">
                </div> -->

                <!-- Drawing of the rectangle -->
                <div id="canvasDiv">
                <img id="image" hidden="true"/>
                <canvas id="canvas" ref="canvas" width="2000" height="2000" v-insert-box="box" style="width: 700px">
                </canvas>
                </div>

              </div>
            </div>
          </div>
        </div>
  
        <div id="nameGroup">
        <p id="nameDiv" class="title is-5">Is this
          <strong>{{ data.name }}</strong> in the image?</p>
  
        <!-- Yes Button -->
        <div class="buttonGroup">
          <div class="field is-grouped">
                <div class="control">
                  <button class="button is-primary is-medium" @click="yesBtn" :disabled="isDisabled">
                    Yes
                  </button>
                </div>
  
            <!-- No Button -->
              <div class="control">
                <button class="button is-medium" @click="someoneElseBtn" :disabled="isDisabled">
                  It's someone else
                </button>
              </div>
  
            <!-- No Button -->
              <div class="control">
                <button class="button is-medium" @click="sendToDeleteApiBtn" :disabled="isDisabled">
                  No
                </button>
              </div>
          </div>
        </div>

    <div class="chooseMultiselect" v-show="this.checked === true">
      <p>If it's someone else, who might this be?</p>
      <br>
        <!-- Input field for USERS -->
            <div class="field is-grouped">
              <div class="multiselectDiv">
                <p class="control">
                  <multiselect
                  v-model="selectedUser"
                  :options="allUsers"
                  :searchable="false"
                  :allow-empty="true"
                  label="name"
                  track-by="name"
                  open-direction="bottom"
                  >
                  </multiselect>
                </p>
              </div>
            </div>  
                        <!-- No Button -->
            <div class="saveBtn">
              <div class="control">
                <button class="button is-light" @click="saveBtn">
                  Save
                </button>
              </div>
            </div>   
            </div> 
        </div>
      </div>
    </div>
    <!-- Simplert Notification -->
    <simplert :useRadius="true" :useIcon="true" ref="simplert">
    </simplert>
  
  </div>
</template>

<script>
import router from '../../router'
import axios from 'axios'
import Simplert from 'vue2-simplert/src/components/simplert'
import { trainingUrl, userOptions } from '../../config'
import Multiselect from 'vue-multiselect'

export default {
  name: 'app',
  components: {
    Simplert,
    Multiselect
  },
  data () {
    return {
      data: {
        name: '',
        trainingId: '',
        imageUrl: '',
        userId: ''
      },
      box: {
        top: '',
        left: '',
        height: '',
        width: '',
        userImageUrl: ''
      },
      selectedUser: [],
      allUsers: [],
      image: '',
      getTrainingId: '',
      checked: false,
      isDisabled: false
    }
  },
  methods: {
    saveBtn () {
      let self = this
      self.isDisabled = true
      axios.put(trainingUrl + self.getTrainingId, {
        imageUrl: self.image,
        userId: self.selectedUser.userId
      })
        .then((response) => {
          let closeFn = () => {
            router.push({ path: '/training' })
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
    },
    yesBtn () {
      let self = this
      self.isDisabled = true
      axios.put(trainingUrl + self.getTrainingId, {
        imageUrl: self.image,
        userId: self.data.userId
      })
        .then((response) => {
          let closeFn = () => {
            router.push({ path: '/training' })
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
    },
    sendToDeleteApiBtn () {
      let self = this
      self.isDisabled = true
      axios.delete(trainingUrl + self.getTrainingId)
        .then((response) => {
          let closeFn = () => {
            router.push({ path: '/training' })
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
    },
    someoneElseBtn () {
      this.checked = true
    }
  },
  directives: {
    insertBox (canvasElement, binding) {
      // Asign values to height, width, top, left for canvas rectangle
      var height = binding.oldValue.height
      var width = binding.oldValue.width
      var top = binding.oldValue.top
      var left = binding.oldValue.left
      var imageUrl = binding.oldValue.userImageUrl

      // Get context of canvas element
      var ctx = canvasElement.getContext('2d')

      // Get the image element
      var image = new Image()
      image.src = imageUrl

      // Start drawing
      image.onload = () => {
        ctx.drawImage(image, 0, 0)
        ctx.beginPath()
        // ctx.rect(this.box.left, this.box.top, this.box.width, this.box.height)
        ctx.rect(left, top, width, height)
        ctx.lineWidth = 6
        ctx.strokeStyle = 'yellow'
        ctx.stroke()
      }
    }
  },
  created () {
    let self = this

    // Grab path from URL
    const path = window.location.pathname

    // Break the path into segments
    // ""/"UpdateTraining"/"TrainingId"
    const segments = path.split('/')

    // Asign visitPurposeOptionId
    self.getTrainingId = segments[2]

    axios.get(trainingUrl + self.getTrainingId)
      .then((response) => {
        self.data.name = response.data.name
        self.data.userId = response.data.userId
        self.image = response.data.userImageUrl
        self.box.userImageUrl = response.data.userImageUrl
        self.data.trainingId = response.data.trainingId

        // Get coordinates to draw the box on the image
        self.box.top = response.data.top
        self.box.left = response.data.left
        self.box.width = response.data.width
        self.box.height = response.data.height
      })
    // Get Users from API
    axios.get(userOptions)
      .then((response) => {
        self.allUsers = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.box {
  padding-bottom: 3%;
}

.innerContainer {
  margin: 0 auto;
  position: relative;
  margin-right: -150%;
}

hr {
  margin-left: 2%;
  width: 35%;
}

 .buttonGroup {
  margin-top: 1%;
  margin-left: 13%;
}

.buttonGroup button {
  margin-left: 46px;
} 

.header {
  margin-left: 6%;
  margin-top: 1.5%;
}

.imageDiv {
  margin-left: 11%;
}

/* #imageShowDivForTraining {
  width: 500px;
  height: 280px;
  margin-top: 10%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
} */


#nameDiv {
  margin-top: 2%;
  margin-left: 16%;
}

.multiselectDiv {
  width: 300px;
  margin-top: 0%;
}

.chooseMultiselect {
  margin-top: 2%;
  margin-left: 15.7%;
}

.chooseMultiselect  button{
  margin-left: 8.2%;
}

#nameGroup {
  margin-top: -10%;
}

.backForTraining {
  float: left
}
</style>
