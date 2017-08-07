<template>
  <div id="container">
    <div class="innerContainer">
      <div class="box">

      <div class="backForLoan">

          <button type="button" class="button is-light" @click="backLoanBtn">Back</button>

      </div>

      <div class="header">
        <p class="title is-4">Loan Details</p>
      </div>
      <hr>
  
      <!-- Form Validation -->
      <form @submit.prevent="validateBeforeSubmit">
      <!--Input field for Start Date-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Start Date:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input class="input" type="datetime-local" v-model="data.startDateTime" disabled>
            </p>
          </div>
        </div>
      </div>

      <!--Input field for End Date-->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Due Date:</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('due date') }"
              name="due date" class="input" type="datetime-local" v-model="data.dueDateTime">
              <span v-show="errors.has('due date')" class="help is-danger">{{ errors.first('due date') }}</span>        
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
                  v-validate data-vv-rules="required"
                  data-vv-name="category name"                        
                  @input="checkSubCat"
                  :options="options"
                  :searchable="false"
                  :allow-empty="true"
                  label="categoryName"
                  track-by="categoryName"
                  open-direction="bottom"
                  :block-keys="['Tab', 'Enter']"
                  deselect-label="Can't remove this value"
                  >
                  </multiselect>
                  <span v-show="errors.has('category name')" class="help is-danger">{{ errors.first('category name') }}</span>                                  
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
                  open-direction="bottom"
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
                  v-validate data-vv-rules="required"
                  data-vv-name="user"
                  :options="allUsers"
                  :searchable="false"
                  :allow-empty="true"
                  label="name"
                  track-by="name">
                  </multiselect>
                  <span v-show="errors.has('user')" class="help is-danger">{{ errors.first('user') }}</span>                
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

          <div class="noItemsToShow" v-show="this.checked === true">
            <span class="tag is-warning is-medium">There are no items to show in this view.</span>
          </div>

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
                    :options="optionsForItemChild"
                    :id="row"
                    @open="getIdOfMultiselect"
                    open-direction="bottom"
                    label="itemChildLabel"
                    track-by="itemChildLabel"
                    @select="selectedItemChildNamesMethod"
                    @remove="removeOption"
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
              <td><strong>Action</strong></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in selectedItemChildNames" :key="row">
              <td>
                <div id="multiselectDivItemChild">
                  <p class="control">
                    {{ row.itemChildLabel }}
                  </p>                 
                </div>
              </td>
              <td>
                <div id="remarks">
                  <input class="input" type="text" v-model="row.remarks">   
                </div>          
              </td>
              <td>
                <div id="removeBtn">
                <button class="button is-danger" @click="delRow(row)">
                  X
                </button> 
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
                <button class="button is-primary" :disabled="isDisabled">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>

      <!-- Simplert Notification -->
      <simplert :useRadius="true" :useIcon="true" ref="simplert">
      </simplert>
  
      </div>
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
      allSubCategories: [],
      checked: false,
      isDisabled: false
    }
  },
  methods: {
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then(result => {
        if (result) {
          self.isDisabled = true
          // Convert datetime to UTC
          self.data.startDateTime = moment(self.data.startDateTime).utc().format()
          self.data.dueDateTime = moment(self.data.dueDateTime).utc().format()

          // Rearrange arrays to put into desired arrays to send to API
          self.selectedItemChildNames.map((item) => {
            const oldTag = {
              startDateTime: self.data.startDateTime,
              dueDateTime: self.data.dueDateTime,
              itemChildId: item.itemChildId,
              remarks: item.remarks
            }
            self.loanDetails.push(oldTag)
          })

          if (self.loanDetails.length === 0) {
            self.isDisabled = false
            let errorAlert = {
              title: 'Error',
              message: 'You did not select any items to loan!',
              type: 'error'
            }
            self.$refs.simplert.openSimplert(errorAlert)
          } else {
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
          }
          return
        }
        self.isDisabled = false
        let errorAlert = {
          title: 'Error',
          message: 'Some fields are incorrect!',
          type: 'error'
        }
        self.$refs.simplert.openSimplert(errorAlert)
      })
    },
    // Check if Category has sub-categories
    // If category does not have sub-categories, retrieve all items
    checkSubCat () {
      let self = this
      // Clear contents in selected sub-category array
      self.selectedSubCat = []
      self.rows = []
      self.itemChildNames = []
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
            self.getSelectedItems()
          })
      }
    },
    // If category has sub-categories, retrieve items from sub-category
    subCatGetItems () {
      let self = this
      self.rows = []
      self.itemChildNames = []
      // If categoryType = true, means category have sub-categories
      // Hence, do a GET api to fetch items related to the chosen sub-category
      if (self.selectedCat.categoryType === true) {
        axios.get(subCatItemOptionsForLoan + self.selectedSubCat.subCategoryId)
          .then((response) => {
            self.checked = false
            self.itemParentArray = response.data
            // Get all itemParent names in an array
            self.itemParentArray.map((item) => {
              const oldTag = {
                itemParent: item.itemName,
                itemChild: item.ItemChildren
              }
              self.rows.push(oldTag)
            })
            self.getSelectedItems()
          })
          .catch((error) => {
            console.log(error)
            self.checked = true
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
          itemChildLabel: item.itemChildLabel,
          itemChildId: item.itemChildId,
          remarks: ''
        }
        self.optionsForItemChild.push(oldTag)
      })
    },
    getSelectedItems () {
      // Only display selected items in selected categories w / w/o subcats
      let self = this
      self.rows.forEach((element) => {
        element.itemChild.forEach((item) => {
          self.selectedItemChildNames.forEach((instance) => {
            if (item.itemChildLabel === instance.itemChildLabel) {
              self.itemChildNames.push(instance)
            }
          }, this)
        }, this)
      }, this)
    },
    selectedItemChildNamesMethod (selectedOption, id) {
      let self = this
      self.selectedItemChildNames.push(selectedOption)
    },
    delRow (row) {
      // itemChildNames > SELECTED ITEMS IN DROPDOWN
      // selectedItemChildNames > SELECTED ITEMS IN TABLE
      let self = this
      const indexOfSelectedArr = this.selectedItemChildNames.indexOf(row)
      self.itemChildNames.forEach((item, index) => {
        if (row.itemChildLabel === item.itemChildLabel) {
          self.itemChildNames.splice(index, 1)
        }
      }, this)
      self.selectedItemChildNames.splice(indexOfSelectedArr, 1)
    },
    removeOption (removedOption) {
      // Remove option in Multiselect dropdown event
      this.selectedItemChildNames.forEach((item, index) => {
        if (item.itemChildLabel === removedOption.itemChildLabel) {
          this.selectedItemChildNames.splice(index, 1)
        }
      }, this)
    },
    backLoanBtn () {
      router.go(-1)
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
    // Convert current datetime to UTC format
    self.currentDateTime = new Date()
    self.data.startDateTime = moment(self.currentDateTime).format('YYYY-MM-DDTHH:mm')

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

.scrollingtable .table {
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

#removeBtn button {
  margin-top: 7%;
}

.noItemsToShow  {
  margin-left: 40%;
  margin-top: 5%;
}

.backForLoan {
  float: left;
}
</style>
