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
  
      <!-- Save Button -->
      <div class="updateBtn">
        <div class="field is-horizontal">
          <div class="field-label">
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <button class="button is-primary" @click="updateVisitorDetailsBtn">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Delete Visitor Details Button -->
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
import Simplert from 'vue2-simplert/src/components/simplert'
import { visitors, visitPurposesForOptions } from '../../../config'
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
        organizationName: '',
        visitorCount: '',
        visitDateTime: '',
        visitPurposeText: ''
      },
      visitorDetailsId: '',
      purposeText: '',
      uneditedPurposeText: '',
      addedDT: '',
      editedDateTime: '',
      selectedVisitPurpose: [],
      options: [],
      allVisitPurpose: []
    }
  },
  methods: {
    updateVisitorDetailsBtn () {
      let self = this
      // Assign multiselect's selected value to purposeText
      self.purposeText = self.selectedVisitPurpose.visitPurposeText

      // Make visitDateTime a ISOstring format
      self.addedDT = ':00.000Z'
      self.editedDateTime = self.data.visitDateTime.concat(self.addedDT)

      // POST visitorDetails data to server
      axios.put(visitors + self.visitorDetailsId, {
        organizationName: self.data.organizationName,
        visitorCount: self.data.visitorCount,
        visitDateTime: self.editedDateTime,
        visitPurposeText: self.purposeText
      })
        .then((response) => {
          let closeFn = () => {
            router.push({ path: '/visitor/VisitorDetails' })
          }
          let successAlert = {
            title: 'Success',
            message: 'Visitor Details successfully updated!',
            type: 'success',
            onClose: closeFn
          }
          self.$refs.simplert.openSimplert(successAlert)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // Delete Purpose of Visit Data
    deleteBtn () {
      let self = this

      let confirmFn = () => {
        axios.delete(visitors + self.visitorDetailsId)
        .then((response) => {
          // Success Alert
          let closeFn = () => {
            // After deletion, go to Purpose of Visitor Details Page
            router.push({ path: '/visitor/VisitorDetails' })
          }
          let successAlert = {
            title: 'Success',
            message: 'Visitor details record has been deleted!',
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
        message: 'Are you sure you want to delete Visitor Details record?',
        type: 'warning',
        useConfirmBtn: true,
        onConfirm: confirmFn
      }
      self.$refs.simplert.openSimplert(deleteAlert)
    },
    getVisitPurpose () {
      let self = this
      const allPurposes = self.options
      return allPurposes.filter((item) => {
        return item.visitPurposeText === self.uneditedPurposeText
      })
    }
  },
  created () {
    let self = this

    // Grab path from URL
    const path = window.location.pathname

    // Break the path into segments
    // ""/"visitor"/"UpdatePurposeOfVisit"/"visitPurposeOptionId"
    const segments = path.split('/')

    // Asign visitPurposeOptionId
    self.visitorDetailsId = segments[3]

    axios.get(visitors + self.visitorDetailsId)
      .then((response) => {
        self.data.organizationName = response.data.organizationName
        self.data.visitorCount = response.data.visitorCount
        self.data.visitDateTime = response.data.visitDateTime.slice(0, 16) // in ISOstring datetime format
        self.uneditedPurposeText = response.data.visitPurposeText
      })
      .catch((error) => {
        console.log(error)
      })

    // Get visit purposes data
    axios.get(visitPurposesForOptions)
      .then((response) => {
        self.allVisitPurpose = response.data

        self.allVisitPurpose.map((item) => {
          const oldTag = {
            visitPurposeText: item.visitPurposeText
          }
          self.options.push(oldTag)
        })
        // If methods returns a empty array, add it to options and selectedPurpose
        if (self.getVisitPurpose()) {
          const newTag = {
            visitPurposeText: self.uneditedPurposeText
          }
          self.options.push(newTag)
          self.selectedVisitPurpose = newTag
        } else { // If method returns a filled array, add it the selectedPurpose
          const newTag = {
            visitPurposeText: self.uneditedPurposeText
          }
          self.selectedVisitPurpose = newTag
        }
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

.updateBtn {
  margin-left: 7.7%;
}

.multiselect {
  width: 300px;
  margin-top: 4%;
}

.deleteBtn {
  float: left;
  margin-top: 2.4%;
}
</style>
