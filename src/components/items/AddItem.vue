<template>
  <div id="container">
    <div class="innerContainer">
      <div class="box">
        <div class="header">
          <p class="title is-4">Item Information</p>
        </div>
        <hr>
  
        <!--Input field for Item Name-->
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Item Name:</label>
          </div>
          <div class="field-body">
            <div class="field is-grouped">
              <p class="control">
                <input class="input" type="text" placeholder="Item Name" v-model="data.itemName">
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
  
        <!-- ~~~~~~~~~~~~~~~~ Item Details (2nd Section) ~~~~~~~~~~~~~~~~~~ -->
        <br>
        <br>
        <br>
        <div class="header">
          <p class="title is-4">Item Details</p>
          <p class="subtitle is-5">Add multiple item details if you have the same item with different details</p>
        </div>
        <hr>
        <div id="addRowBtn">
          <button class="button is-info is-focused" @click="addRow">Add</button>
        </div>
        <div id="space"></div>
        <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Adding new rows ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
        <div class="itemDetailsDiv">
  
          <div class="field is-grouped" v-for="item in itemArray" :key="item">
  
            <p class="control">
              <label class="label">Item Label</label>
              <input class="input" type="text" placeholder="Item Label" v-model="item.itemChildLabel">
            </p>
            <p class="control">
              <label class="label">Serial No</label>
              <input class="input" type="text" placeholder="Serial No" v-model="item.serialNo">
            </p>
            <p class="control">
              <label class="label">IDA Asset No</label>
              <input class="input" type="text" placeholder="IDA Asset No" v-model="item.idaAssetNo">
            </p>
            <p class="control">
              <label class="label">IMDA Asset No</label>
              <input class="input" type="text" placeholder="IMDA Asset No" v-model="item.imdaAssetNo">
            </p>
            <p class="control">
              <label class="label">Managed By</label>
              <multiselect :id="item" :options="staffOptions" :searchable="false" :allow-empty="false" :show-labels="false" label="name" track-by="name" @input="updateStaffData" @open="openStaffOptions">
              </multiselect>
            </p>
            <p class="control">
              <label class="label">Loanable (Tick if yes)</label>
              <input type="checkbox" value="true" v-model="item.loanOptionId">
            </p>
            <div id="delBtn">
              <button class="button is-danger" @click="delRow(item)">-</button>
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
                  <button class="button is-primary" @click="saveItemBtn">
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
  </div>
</template>

<script>
import router from '../../router'
import { itemUrl, categoriesForOptions, subcategoriesForOptions, loanOptions, staffsForOptions } from '../../config'
import axios from 'axios'
import Simplert from 'vue2-simplert/src/components/simplert'
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
        itemName: '',
        categoryId: '',
        subCategoryId: ''
      },
      selectedCat: [],
      selectedSubCat: [],
      itemArray: [{
        itemChildLabel: '',
        serialNo: '',
        idaAssetNo: '',
        imdaAssetNo: '',
        staffId: '',
        loanOptionId: false
      }],
      options: [],
      staffOptions: [],
      unloanableId: '',
      loanableId: '',
      allStaffs: [],
      allCategories: [],
      allSubCategories: [],
      subStaffId: '',
      indexOfItemArray: '',
      allLoanOptions: [],
      emptyJson: []
    }
  },
  methods: {
    // Multiselect @open - when you open the dropdown
    openStaffOptions (id) {
      // Get ID of staffOption Multiselect Dropdown
      const itemArray = this.itemArray
      // Get the index of the array the multiselect is positioned in
      this.indexOfItemArray = itemArray.indexOf(id)
    },
    // Multiselect @input - when the value changes
    updateStaffData (value) {
      this.subStaffId = value.staffId
      this.itemArray[this.indexOfItemArray].staffId = this.subStaffId
    },
    // Add itemChild row
    addRow () {
      this.itemArray.push({
        itemChildLabel: '',
        serialNo: '',
        idaAssetNo: '',
        imdaAssetNo: '',
        staffId: '',
        loanOptionId: false
      })
    },
    // Delete itemChild row
    delRow (item) {
      const index = this.itemArray.indexOf(item)
      this.itemArray.splice(index, 1)
    },
    saveItemBtn () {
      let self = this
      self.data.categoryId = self.selectedCat.categoryId
      self.data.subCategoryId = self.selectedSubCat.subCategoryId

      // Assign loanOptionId value to checkbox value
      self.itemArray.map((item) => {
        if (item.loanOptionId === true) {
          item.loanOptionId = self.loanableId
        }
        if (item.loanOptionId === false) {
          item.loanOptionId = self.unloanableId
        }
      })

      axios.post(itemUrl, {
        itemName: self.data.itemName,
        categoryId: self.data.categoryId,
        subCategoryId: self.data.subCategoryId,
        itemArray: self.itemArray
      })
        .then((response) => {
          let closeFn = () => {
            router.push({ path: '/item' })
          }
          let successAlert = {
            title: 'Success',
            message: 'Item record successfully created!',
            type: 'success',
            onClose: closeFn
          }
          self.$refs.simplert.openSimplert(successAlert)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    clearSubCat () {
      let self = this
      self.selectedSubCat = self.emptyJson
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

   // Get Loan Options from API
    axios.get(loanOptions)
      .then((response) => {
        const allLoanOptions = response.data

        // Check through if loanOptionId is true/false
        allLoanOptions.forEach((item) => {
          if (item.loanOptionBool === true) {
            self.loanableId = item.loanOptionId
          } else { // loanOptionBool is false
            self.unloanableId = item.loanOptionId
          }
        }, this)
      })

    // Get Staffs from API
    axios.get(staffsForOptions)
      .then((response) => {
        self.allStaffs = response.data
        // Checks json objects in nested json, and take it out and call it "item"
        self.allStaffs.map((item) => {
          const oldTag = {
            staffId: item.staffId,
            name: item.name
          }
          self.staffOptions.push(oldTag)
        })
      })
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.box{
  padding-bottom: 1%;
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
  margin-top: 1%;
}

.saveBtn {
  margin-left: 21.5%;
}

.multiselect {
  width: 300px;
  margin-top: 3%;
}

.itemDetailsDiv {
  margin-left: 1.5%;
}

.itemDetailsDiv input {
  width: 200px;
}

.itemDetailsDiv .multiselect {
  width: 200px;
  margin-top: 7%;
}

#space {
  padding-bottom: 0.35%;
}

#delBtn {
  margin-top: 1.3%;
}

#addRowBtn {
  margin-left: 35%;
  margin-top: -1%;
}
</style>

