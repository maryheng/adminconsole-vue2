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
                  <multiselect
                  v-model="selectedCat"
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
  
        <!-- Input field for Type of Category -->
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
                  deselect-label="Can't remove this value"
                  label="subCategoryName"
                  track-by="subCategoryName"              
                  >
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
              <multiselect
                v-model="staffArr"
                :id="item"
                :options="staffOptions"
                :searchable="false"
                :allow-empty="false"
                :show-labels="false"
                label="name"
                track-by="name"
                @input="updateStaffData"
                @open="openStaffOptions"
                >
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
  
        <!-- Update Button -->
        <div class="updateBtn">
          <div class="field is-horizontal">
            <div class="field-label">
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <button class="button is-primary" @click="updateItemBtn">
                    Update
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
      itemParentId: '',
      getCatId: '',
      getSubCatId: '',
      getStaffIds: '',
      getCatJson: [],
      getSubCatJson: [],
      getStaffArray: [],
      getStaffJson: [],
      staffArr: [],
      idArr: [],
      computedStaff: '',
      deletedItemIdArray: [],
      updatedItemArray: [],
      newItemArray: []
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
      console.log(item.itemChildId)
      this.deletedItemIdArray.push(item.itemChildId)
      const index = this.itemArray.indexOf(item)
      this.itemArray.splice(index, 1)
    },
    updateItemBtn () {
      let self = this
      self.data.categoryId = self.selectedCat.categoryId
      self.data.subCategoryId = self.selectedSubCat.subCategoryId

      // Assign loanOptionId value to checkbox value
      self.itemArray.map((item) => {
        if (item.loanOptionId === true || item.loanOptionId === self.loanableId) {
          item.loanOptionId = self.loanableId
        } else {
          item.loanOptionId = self.unloanableId
        }
      })

      // Move items to updatedItemArray
      self.itemArray.map((item) => {
        console.log(item)
        if (item.itemChildId) {
          const oldTag = {
            itemChildId: item.itemChildId,
            serialNo: item.serialNo,
            idaAssetNo: item.idaAssetNo,
            imdaAssetNo: item.imdaAssetNo,
            itemChildLabel: item.itemChildLabel,
            loanOptionId: item.loanOptionId,
            staffId: item.staffId
          }
          self.updatedItemArray.push(oldTag)
        } else {
          const oldTag = {
            serialNo: item.serialNo,
            idaAssetNo: item.idaAssetNo,
            imdaAssetNo: item.imdaAssetNo,
            itemChildLabel: item.itemChildLabel,
            loanOptionId: item.loanOptionId,
            staffId: item.staffId
          }
          self.newItemArray.push(oldTag)
        }
      })

      // Update Item details to API
      axios.put(itemUrl + self.itemParentId, {
        itemName: self.data.itemName,
        categoryId: self.data.categoryId,
        subCategoryId: self.data.subCategoryId,
        deletedItemIdArray: self.deletedItemIdArray,
        newItemArray: self.newItemArray,
        updatedItemArray: self.updatedItemArray
      })
        .then((response) => {
          // Clear contents in updatedItemArray and newItemArray
          self.updatedItemArray.length = 0
          self.newItemArray.length = 0

          // Simplert
          let closeFn = () => {
            router.push({ path: '/item' })
          }
          let successAlert = {
            title: 'Success',
            message: 'Item record successfully updated!',
            type: 'success',
            onClose: closeFn
          }
          self.$refs.simplert.openSimplert(successAlert)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getCatData () {
      let self = this
      const allCats = self.allCategories
      return allCats.filter((item) => {
        return item.categoryId === self.getCatId
      })
    },
    getSubCatData () {
      let self = this
      const allSubCats = self.allSubCategories
      return allSubCats.filter((item) => {
        return item.subCategoryId === self.getSubCatId
      })
    },
    getStaffData () {
      let self = this

      self.getStaffArray.forEach((element) => {
        self.allStaffs.forEach((item) => {
          if (item.staffId === element.staffId) {
            console.log(item.name)
            const staffIdArr = self.allStaffs.indexOf(item)
            self.staffArr.push(item.name)
            self.idArr.push(staffIdArr)
            return item.name
          }
        })
      }, this)
    }
  },
  computed: {
    // Filter for Sub-Category options dropdown
    computedsubCatOptions () {
      let self = this
      const subCats = self.allSubCategories
      return subCats.filter((item) => {
        return item.fk_categoryId === this.selectedCat.categoryId
      })
    }
  },
  created () {
    let self = this

    // Grab path from URL
    const path = window.location.pathname

    // Break the path into segments
    // ""/"UpdateItem"/{itemParentId}"
    const segments = path.split('/')

    // Assigned itemParentId
    self.itemParentId = segments[2]

   // Get Loan Options from API
    axios.get(loanOptions)
      .then((response) => {
        const allLoanOptions = response.data

        // Check through if loanOptionId is true/false
        allLoanOptions.forEach((item) => {
          if (item.loanOptionBool === true) {
            self.loanableId = item.loanOptionId
          }
          if (item.loanOptionBool === false) {  // loanOptionBool is false
            self.unloanableId = item.loanOptionId
          }
        }, this)
      })

    // Get ID itemParent data
    axios.get(itemUrl + self.itemParentId)
      .then((response) => {
        self.data.itemName = response.data.itemName
        self.getCatId = response.data.fk_categoryId
        self.getSubCatId = response.data.fk_subCategoryId

        // Get Category JSON and assign to multiselect
        self.getCatJson = self.getCatData()
        self.selectedCat = self.getCatJson[0]

        let getItemArray = response.data.ItemChildren
        getItemArray.map((item, index) => {
          const oldTag = {
            itemChildId: item.itemChildId,
            serialNo: item.serialNo,
            idaAssetNo: item.idaAssetNo,
            imdaAssetNo: item.imdaAssetNo,
            itemChildLabel: item.itemChildLabel,
            loanOptionId: item.fk_loanOptionId,
            staffId: item.fk_staffId
          }
          self.itemArray.push(oldTag)
        })

        // Remove redundent first row
        self.itemArray.splice(0, 1)

        // Get Staff ID from nested json of itemChildren
        self.itemArray.map((item) => {
          const oldTag = {
            staffId: item.fk_staffId
          }
          self.getStaffArray.push(oldTag)
        })

        // If there is sub-categories, go through getSubCatData()
        if (!(self.getSubCatId === null)) {
          // Get Sub-Category JSON and assign to multiselect
          self.getSubCatJson = self.getSubCatData()
          self.selectedSubCat = self.getSubCatJson[0]
        }

        // Get Staff JSON and assign to multiselect
        self.getStaffData()

        // Checkbox is either true or false according to loanOptionId
        self.itemArray.map((item) => {
          if (item.loanOptionId === self.loanableId) {
            item.loanOptionId = true
          }
          if (item.loanOptionId === self.unloanableId) {
            item.loanOptionId = false
          }
        })
      })
      .catch((error) => {
        console.log(error)
      })

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

.updateBtn {
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

