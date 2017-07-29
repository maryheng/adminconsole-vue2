<template>
  <div id="container">
    <div class="innerContainer">
  
      <div class="header">
        <p class="title is-4">Visitor Details</p>
      </div>
      <hr>
  
      <!--Input field for Organization Name-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Organization Name:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input class="input" type="text" placeholder="Organization Name" v-model="data.organizationName">
            </p>
          </div>
        </div>
      </div>
  
      <!--Input field for Purpose of Visit-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Purpose Of Visit:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
                <multiselect
                v-model="selectedVisitPurpose"
                :options="options"
                :searchable="false"
                :allow-empty="true"
                label="visitPurposeText"
                track-by="visitPurposeText"
                >
                </multiselect>
            </p>
          </div>
        </div>
      </div>
  
      <!--Input field for Visitor Count-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Visitor Count:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input class="input" type="number" placeholder="Visitor Count" v-model="data.visitorCount">
            </p>
          </div>
        </div>
      </div>

      <!--Input field for Visit DateTime-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Visit Date & Time:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input class="input" type="datetime-local" placeholder="Date Time" v-model="data.visitDateTime">
            </p>
          </div>
        </div>
      </div>      
  
        <pre>
        {{ $data | json }}
      </pre>
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
      <!-- <simplert :useRadius="true" :useIcon="true" ref="simplert">
      </simplert> -->
  
    </div>
  </div>
</template>

<script>
// import router from '../../../router'
import axios from 'axios'
// import Simplert from 'vue2-simplert/src/components/simplert'
import { visitPurpose } from '../../../config'
import Multiselect from 'vue-multiselect'

export default {
  name: 'app',
  components: {
   // Simplert,
    Multiselect
  },
  data () {
    return {
      data: {
        organizationName: '',
        visitorCount: '',
        visitDateTime: '',
        visitPurposeText: ''
      },
      selectedVisitPurpose: [],
      options: [],
      allVisitPurpose: []
    }
  },
  methods: {
    saveStaffBtn () {
    }
  },
  created () {
    let self = this
    // Get visit purpose data
    axios.get(visitPurpose)
      .then((response) => {
        self.allVisitPurpose = response.data

        self.allVisitPurpose.map((item) => {
          console.log(item)
          const oldTag = {
            visitPurposeText: item.visitPurposeText,
            visitPurposeOptionId: item.visitPurposeOptionId
          }
          self.options.push(oldTag)
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
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
