<template>
  <div id="container">
    <div class="innerContainer">
  
      <div class="header">
        <p class="title is-4">Loan Details</p>
      </div>
      <hr>
  
      <!--Input field for Start Date-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Start Date:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input class="input" type="date" v-model="data.startDateTime" disabled>
            </p>
          </div>
        </div>
      </div>

      <!--Input field for End Date-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">End Date:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input class="input" type="date" v-model="data.dueDateTime">
            </p>
          </div>
        </div>
      </div>      

        <!-- Input field for Type of Category -->
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Type of Category:</label>
          </div>
          <div class="field-body">
            <div class="field is-grouped">
              <div class="multiselectDiv">
                <p class="control">
                  <multiselect v-model="selectedCat" @input="clearSubCat" :options="options" :searchable="false" :allow-empty="true" deselect-label="Can't remove this value" label="categoryName" track-by="categoryName">
                  </multiselect>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Input field for Type of Sub-Category -->
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Type of Sub-Category:</label>
          </div>
          <div class="field-body">
            <div class="field is-grouped">
              <div class="multiselectDiv">
                <p class="control">
                  <multiselect v-model="selectedSubCat" :options="computedsubCatOptions" :hide-selected="true" :selected="selectedSubCat" :searchable="false" :allow-empty="true" deselect-label="Can't remove this value" label="subCategoryName" track-by="subCategoryName">
                  </multiselect>
                </p>
              </div>
            </div>
          </div>
        </div>   

        <!-- Input field for USERS -->
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Loaned By:</label>
          </div>
          <div class="field-body">
            <div class="field is-grouped">
              <div class="multiselectDiv">
                <p class="control">
                  <multiselect
                  v-model="selectedUser"
                  :options="allUsers"
                  :searchable="false"
                  :allow-empty="true"
                  label="name"
                  track-by="name">
                  </multiselect>
                </p>
              </div>
            </div>
          </div>
        </div>                 

      <div class="header">
        <p class="title is-4">Items in Categories and/or Sub-Categories</p>
      </div>
      <hr>
      <div class="firstTable">
        <div class="pclass">  
          <p>All items shown below will be based on chosen Category and/or Sub-category</p>    
        </div>
        <br>
        <div class="scrollingtable">
        <table class="table is-narrow is-bordered">
          <thead>
            <tr>
              <td><strong>No.</strong></td>
              <td><strong>Item Name</strong></td>
              <td><strong>Item Id</strong></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row">
              <td><input type="text" v-model="row.name"></td>
              <td><input type="text" v-model="row.job"></td>
              <td><input type="text" v-model="row.job"></td>
            </tr>
          </tbody>  
        </table>   
        </div> 
      </div>
      
      
      <div class="secondTable">
        <div class="pclass">
          <p>List of selected items: </p>
        </div>
        <br>
        <div class="scrollingtable">
        <table class="table is-narrow is-bordered">
          <thead>
            <tr>
              <td><strong>No.</strong></td>
              <td><strong>Item Name</strong></td>
              <td><strong>Item Id</strong></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row">
              <td><input type="text" v-model="row.name"></td>
              <td><input type="text" v-model="row.job"></td>
              <td><input type="text" v-model="row.job"></td>
            </tr>
          </tbody>  
        </table>   
        </div> 
      </div>
        <!-- <pre>
          {{ $data | json }}
        </pre>   -->
  
      <!-- Save Button -->
      <div class="saveBtn">
        <div class="field is-horizontal">
          <div class="field-label">
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <button class="button is-primary" @click="saveLoanBtn">
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
// import router from '../../../router'
import axios from 'axios'
import Simplert from 'vue2-simplert/src/components/simplert'
import Multiselect from 'vue-multiselect'
// import { itemUrl, categoriesForOptions, subcategoriesForOptions, loanOptions, staffsForOptions } from '../../config'
import { categoriesForOptions, subcategoriesForOptions, userOptions } from '../../../config'
import moment from 'moment'

export default {
  name: 'app',
  components: {
    Simplert,
    Multiselect
  },
  data () {
    return {
      data: {
        startDateTime: '',
        dueDateTime: ''
      },
      rows: [
        {name: 'James Bond', job: 'spy'},
        {name: 'Goldfinger', job: 'villain'},
        {name: 'Goldfinger', job: 'villain'},
        {name: 'Goldfinger', job: 'villain'},
        {name: 'Goldfinger', job: 'villain'},
        {name: 'Goldfinger', job: 'villain'}
      ],
      currentDateTime: '',
      selectedUser: [],
      selectedCat: [],
      selectedSubCat: [],
      options: [],
      allUsers: [],
      allCategories: [],
      allSubCategories: [],
      emptyJson: []
    }
  },
  methods: {
    saveLoanBtn () {
      // let self = this

      // Post Staff FormData to server
      // axios.post(staffUrl, formData)
      //   .then((response) => {
      //     let closeFn = () => {
      //       router.push({ path: '/user/staff' })
      //     }
      //     let successAlert = {
      //       title: 'Success',
      //       message: 'Staff record successfully created!',
      //       type: 'success',
      //       onClose: closeFn
      //     }
      //     self.$refs.simplert.openSimplert(successAlert)
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
    },
    clearSubCat () {
      let self = this
      // Clear contents in selected sub-category array
      self.selectedSubCat = self.emptyJson
      console.log(self.selectedSubCat)
    }
  },
  computed: {
    // Filter for Sub-Category options dropdown
    computedsubCatOptions () {
      let self = this
      const subCats = self.allSubCategories
      return subCats.filter((item) => {
        return item.fk_categoryId === self.selectedCat.categoryId
      })
    }
  },
  created () {
    let self = this

    // Set current Date to calendar
    self.currentDateTime = new Date()
    self.data.startDateTime = moment(self.currentDateTime, 'YYYY-MM-DD').format('YYYY-MM-DD')

    // Get Sub-Categories from API
    axios.get(subcategoriesForOptions)
      .then((response) => {
        self.allSubCategories = response.data
      })
      .catch((error) => {
        console.log(error)
      })

    // Get Categories from API
    axios.get(categoriesForOptions)
      .then((response) => {
        self.allCategories = response.data

        // Checks json objects in nested json, and take it out and call it "item"
        self.allCategories.map((item) => {
          const oldTag = {
            categoryId: item.categoryId,
            categoryName: item.categoryName
          }
          self.options.push(oldTag)
        })
      })

    // Get Users from API
    axios.get(userOptions)
      .then((response) => {
        self.allUsers = response.data
      })
      .catch((error) => {
        console.log(error)
      })

    // Get Item Parent from API
    axios.get()
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
  margin-left: 17.5%;
}

.multiselect {
  width: 300px;
  margin-top: 5%;
}

.table {
  width: 30%;
  margin-left: 4.8%;
}

.scrollingtable {
  overflow:auto;
  display:block;
  overflow-y:scroll;
  height: 250px;
}

.firstTable {
    margin-top: 2%;
}

.secondTable {
  margin-top: 3%;
}

.pclass {
  margin-left: 5%;
}
</style>
