<template>
  <div id="container">
    <div class="innerContainer">
  
      <div class="header">
        <p class="title is-4">Purpose of Visit</p>
      </div>
      <hr>
  
      <!--Input field for Organization Name-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Purpose of Visit:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input class="input" type="text" placeholder="Purpose of Visit" v-model="data.visitPurpose">
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
                <button class="button is-primary" @click="savePurposeOfVisitBtn">
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
import { visitPurpose } from '../../../config'

export default {
  name: 'app',
  components: {
    Simplert
  },
  data () {
    return {
      data: {
        visitPurpose: ''
      }
    }
  },
  methods: {
    // Post Purpose of Visit Data to server
    savePurposeOfVisitBtn () {
      let self = this
      axios.post(visitPurpose, {
        visitPurpose: self.data.visitPurpose
      })
        .then((response) => {
          let closeFn = () => {
            router.push({ path: 'purposeofvisit' })
          }
          let successAlert = {
            title: 'Success',
            message: 'Purpose of visit successfully created!',
            type: 'success',
            onClose: closeFn
          }
          self.$refs.simplert.openSimplert(successAlert)
        })
        .catch((error) => {
          console.log(error)
        })
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

.multiselect {
  width: 300px;
  margin-top: 4%;
}
</style>
