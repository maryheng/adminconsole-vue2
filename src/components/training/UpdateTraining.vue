<template>
  <div id="container">
    <div class="innerContainer">
      <div class="box">
        <div class="header">
          <p class="title is-4">Training Of Cognitive Service</p>
        </div>
        <hr>
  
        <!-- Upload Image -->
        <div class="field is-horizontal">
          <div class="imageDiv">
            <div class="field is-grouped">
              <div id="chooseFileDiv">
                <p class="control">
                  <img :src="image" />
                </p>
              </div>
            </div>
          </div>
        </div>
  
        <p id="nameDiv" class="title is-5">Is this
          <strong>{{ data.name }}</strong> in the image?</p>
  
        <!-- Yes Button -->
        <div class="buttonGroup">
          <div class="field is-grouped">
            <div class="field is-horizontal">
              <div class="saveBtn">
                <div class="control">
                  <button class="button is-primary is-medium" @click="yesBtn">
                    Yes
                  </button>
                </div>
              </div>
            </div>
  
            <!-- No Button -->
            <div class="field is-horizontal">
              <div class="saveBtn">
                <div class="control">
                  <button class="button is-light is-medium" @click="sendToDeleteApiBtn">
                    No
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
import router from '../../router'
import axios from 'axios'
import Simplert from 'vue2-simplert/src/components/simplert'
import { trainingUrl } from '../../config'

export default {
  name: 'app',
  components: {
    Simplert
  },
  data () {
    return {
      data: {
        name: '',
        trainingId: '',
        userImageUrl: ''
      },
      image: '',
      getTrainingId: ''
    }
  },
  methods: {
    yesBtn () {
      let self = this
      axios.put(trainingUrl + self.getTrainingId, {
        imageName: self.data.userImageUrl
      })
        .then((response) => {
          let closeFn = () => {
            router.push({ path: '/training' })
          }
          let successAlert = {
            title: 'Success',
            message: 'Training record successfully updated!',
            type: 'success',
            onClose: closeFn
          }
          self.$refs.simplert.openSimplert(successAlert)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    sendToDeleteApiBtn () {
      let self = this
      axios.delete(trainingUrl + self.getTrainingId)
        .then((response) => {
          let closeFn = () => {
            router.push({ path: '/training' })
          }
          let successAlert = {
            title: 'Success',
            message: 'Training record successfully updated!',
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
        self.data.userImageUrl = response.data.userImageUrl
        self.image = response.data.userImageUrl
        self.data.trainingId = response.data.trainingId
      })
  }
}

</script>

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
  margin-left: 16.3%;
}

.buttonGroup button {
  margin-left: 50px;
}

.header {
  margin-left: 6%;
  margin-top: 1.5%;
}

.imageDiv {
  margin-left: 14.5%;
}

img {
  border-radius: 50%;
  width: 300px;
  height: 300px;
  margin: auto;
  display: block;
  margin-top: 10%;
  margin-left: 15%;
}

#nameDiv {
  margin-top: 2%;
  margin-left: 16%;
}

</style>
