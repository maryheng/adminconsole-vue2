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
                  <multiselect
                  v-model="selectedCat"
                  @input="checkSubCat"
                  :options="options"
                  :searchable="false"
                  :allow-empty="true"
                  label="categoryName"
                  track-by="categoryName"
                  >
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
                  <multiselect
                  v-model="selectedSubCat" 
                  :options="computedsubCatOptions"
                  :hide-selected="true"
                  :selected="selectedSubCat"
                  :searchable="false"
                  :allow-empty="true"
                  label="subCategoryName"
                  track-by="subCategoryName"
                  @input="subCatGetItems"
                  >
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
              <td><strong>Item Name</strong></td>
              <td><strong>Item Id</strong></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row">
              <td>{{ row.itemParent }}</td>
              <!-- {{ row.itemChild }} -->
              <td>
                <div id="multiselectDivItemChild">
                  <p class="control">
                    <multiselect
                    :multiple="true"
                    v-model="itemChildNames"
                    :hide-selected="true"
                    :selected="selectedItemChildNames"
                    :options="optionsForItemChild"
                    :id="row"
                    @open="getIdOfMultiselect"
                    open-direction="bottom"
                    label="itemChildName"
                    track-by="itemChildName"
                    >
                    </multiselect>
                  </p>
                </div>
              </td>
            </tr>
          </tbody>  
        </table>   
        </div> 
      </div>
      
      
       <div class="secondTable">
        <div class="pclass">
          <p>List of selected items to loan: </p>
        </div>
        <br>
        <div class="scrollingtable">
        <table class="table is-narrow is-bordered">
          <thead>
            <tr>
              <td><strong>Item label</strong></td>
              <td><strong>Remarks</strong></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in itemChildNames" :key="row">
              <td>
                <div id="multiselectDivItemChild">
                  <p class="control">
                    {{ row.itemChildName }}
                  </p>                 
                </div>
              </td>
              <td>
                <div id="remarks">
                  <input class="input" type="text" v-model="row.remarks">   
                </div>          
              </td>
            </tr>
          </tbody>  
        </table>   
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
import router from '../../../router'
import axios from 'axios'
import Simplert from 'vue2-simplert/src/components/simplert'
import Multiselect from 'vue-multiselect'
import { loanUrl, categoriesForOptions, subcategoriesForOptions, userOptions, catItemOptionsForLoan, subCatItemOptionsForLoan } from '../../../config'
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
      loanDetails: [],
      itemChildNames: [],
      rows: [],
      selectedItemChildNames: [],
      optionsForItemChild: [],
      itemParentArray: [],
      itemChildArray: [],
      currentDateTime: '',
      selectedUser: [],
      selectedCat: [],
      selectedSubCat: [],
      options: [],
      allUsers: [],
      allCategories: [],
      allSubCategories: []
    }
  },
  methods: {
    saveLoanBtn () {
      let self = this

      // Rearrange arrays to put into desired arrays to send to API
      self.itemChildNames.map((item) => {
        const oldTag = {
          startDateTime: self.data.startDateTime,
          dueDateTime: self.data.dueDateTime,
          itemChildId: item.itemChildId,
          remarks: item.remarks
        }
        self.loanDetails.push(oldTag)
      })

      // Post Loan data to API
      axios.post(loanUrl, {
        userId: self.selectedUser.userId,
        loanDetails: self.loanDetails
      })
        .then((response) => {
          let closeFn = () => {
            router.push({ path: '/loan/OngoingLoans' })
          }
          let successAlert = {
            title: 'Success',
            message: 'Loan record successfully created!',
            type: 'success',
            onClose: closeFn
          }
          self.$refs.simplert.openSimplert(successAlert)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // Check if Category has sub-categories
    // If category does not have sub-categories, retrieve all items
    checkSubCat () {
      let self = this
      // Clear contents in selected sub-category array
      self.selectedSubCat = []
      self.rows = []
      // If categoryType = false, means category do not have sub-categories
      // Hence, do a GET api to fetch items related to Category w/o sub-cats
      if (self.selectedCat.categoryType === false) {
        axios.get(catItemOptionsForLoan + self.selectedCat.categoryId)
          .then((response) => {
            self.itemParentArray = response.data

            // Get all itemParent names in an array
            self.itemParentArray.map((item) => {
              const oldTag = {
                itemParent: item.itemName,
                itemChild: item.ItemChildren
              }
              self.rows.push(oldTag)
            })
          })
      }
    },
    // If category has sub-categories, retrieve items from sub-category
    subCatGetItems () {
      let self = this
      self.rows = []
      // If categoryType = true, means category have sub-categories
      // Hence, do a GET api to fetch items related to the chosen sub-category
      if (self.selectedCat.categoryType === true) {
        axios.get(subCatItemOptionsForLoan + self.selectedSubCat.subCategoryId)
          .then((response) => {
            self.itemParentArray = response.data

            // Get all itemParent names in an array
            self.itemParentArray.map((item) => {
              const oldTag = {
                itemParent: item.itemName,
                itemChild: item.ItemChildren
              }
              self.rows.push(oldTag)
            })
          })
      }
    },
    getIdOfMultiselect (id) {
      let self = this

      // Clear contents in json array
      self.optionsForItemChild = []

      // Get idealized json array with itemChildName, itemChildId, remarks
      id.itemChild.map((item) => {
        const oldTag = {
          itemChildName: item.itemChildLabel,
          itemChildId: item.itemChildId,
          remarks: ''
        }
        self.optionsForItemChild.push(oldTag)
      })
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
    self.data.dueDateTime = moment(self.currentDateTime, 'YYYY-MM-DD').format('YYYY-MM-DD')

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
            categoryName: item.categoryName,
            categoryType: item.categoryType
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
  margin-left: 18.8%;
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
    margin-top: 1%;
}

.secondTable {
  margin-top: 1%;
}

.pclass {
  margin-left: 5%;
  font-size: 1.1em;
}

#multiselectDivItemChild {
  padding: 1%;
}

#multiselectDivItemChild .multiselect {
  width: 400px;
  margin-top: 0%;
}

#remarks {
  margin-top: -4%;
  padding: 1%;
}

#remarks input {
  width: 300px;
}
</style>
