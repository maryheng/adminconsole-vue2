<template>
  <div id="categoryContainer">
  <div id="container">
    <div class="innerContainer">
      <p class="title is-4">Manage Category</p>
      <div class="box">

      <div class="backForCat">
        <router-link to="/category">
          <button type="button" class="button is-light">Back</button>
        </router-link>
      </div>

        <div class="header">
          <p class="title is-4">Category Details</p>
        </div>
        <hr>
  
        <!-- Form Validation -->
        <form @submit.prevent="validateBeforeUpdate">  
        <!--Input field for Category Name-->
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Category Name:</label>
          </div>
          <div class="field-body">
            <div class="field is-grouped">
              <p class="control">
                <input v-validate="'required|max:50'" :class="{'input': true, 'is-danger': errors.has('category name') }"
                name="category name" class="input" type="text" v-model="data.categoryName">
                <span v-show="errors.has('category name')" class="help is-danger">{{ errors.first('category name') }}</span>        
              </p>
            </div>
          </div>
        </div>
  
        <!--Checkbox (Checked -> Have Sub-Category || Not Checked -> No Sub-Cat) -->
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Does this category have a sub-category?</label>
            <p>*One category can have many sub-categories.</p>
            <p>*Once a category with or without sub-categories is SAVED,
              <br>you cannot change it anymore.</p>
          </div>
          <div class="field-body">
            <div class="field is-grouped">
              <p class="control">
                <label class="checkbox">
                  <input type="checkbox" value="Yes" v-model="checked" disabled> Yes
                </label>
              </p>
            </div>
          </div>
        </div>
  
        <!--Only shown if CHECKBOX is TICKED -->
        <!--Input field for Sub-Category Name-->
        <div class="field is-horizontal" v-if="checked">
          <div class="field-label is-normal">
            <label class="label">Sub-Category Name(s):</label>
          </div>
          <div class="field-body">
            <div class="field is-grouped">
              <div class="multiselectDiv">
                <p class="control">
                  <multiselect :multiple="true"
                  v-model="data.subCategories"
                  :hide-selected="true"
                  :selected="data.subCategories"
                  :taggable="true"
                  @tag="addTag"    
                  :options="options" 
                  label="subCategoryName"    
                  track-by="subCategoryName"
                  @remove="removedOptions"
                  >
                  </multiselect>                   
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Update Category Button -->
        <div class="updateCatBtn">
          <div class="field is-horizontal">
            <div class="field-label">
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <button class="button is-primary" :disabled="isDisabled">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </form>
        
  
        <!-- Delete Category Button -->
        <div class="deleteCatBtn">
          <div class="field is-horizontal">
            <div class="field-label">
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <button class="button" @click="deleteBtn" :disabled="isDisabled">
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
  </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { categoryUrl, categoryTypesUrl } from '../../config'
import axios from 'axios'
import router from '../../router'
import Simplert from 'vue2-simplert/src/components/simplert'

export default {
  name: 'app',
  components: {
    Multiselect,
    Simplert
  },
  data () {
    return {
      data: {
        categoryName: '',
        categoryTypeId: '',
        subCategories: []
      },
      newSubCategories: [],
      subCategoriesToDeleteIds: [],
      subCategoriesToUpdate: [],
      options: [],
      checked: '',
      getCategoryId: '',
      allSubCategoryNames: [],
      isDisabled: false
    }
  },
  methods: {
    filterForUpdatedSubCategories () {
      return this.data.subCategories.filter((item) => {
        return item.subCategoryId
      })
    },
    filterForNewSubCategories () {
      return this.data.subCategories.filter((item) => {
        return (!item.subCategoryId)
      })
    },
    filterForDeletedIds () {
      return this.subCategoriesToDeleteIds.filter((item, index, inputArray) => {
        // if there is a duplicate, remove the duplicate and return only 1
        return inputArray.indexOf(item) === index
      })
    },
    addTag (newTag) {
      const tag = {
        subCategoryName: newTag
      }
      this.data.subCategories.push(tag)
    },
    removedOptions (removedOption, id) {
      // Remove option and push to subCategoriesToDeleteIds []
      this.subCategoriesToDeleteIds.push(removedOption.subCategoryId)
    },
    validateBeforeUpdate () {
      let self = this
      self.$validator.validateAll().then(result => {
        // If validation goes smoothly,
        if (result) {
          self.isDisabled = true

          // Filter according to subCategoriesToUpdate & newSubCategories arrays
          self.subCategoriesToUpdate = self.filterForUpdatedSubCategories()
          self.newSubCategories = self.filterForNewSubCategories()

          // Remove duplicates
          self.subCategoriesToDeleteIds = self.filterForDeletedIds()

          // To sort subCategoriesToDeleteIds array items
          if (self.subCategoriesToDeleteIds.length > 0) {
            self.subCategoriesToUpdate.forEach((item) => {
              self.subCategoriesToDeleteIds.forEach((element) => {
                if (element === item.subCategoryId) {
                  var index = self.subCategoriesToDeleteIds.indexOf(element)
                  self.subCategoriesToDeleteIds.splice(index, 1)
                }
              }, this)
            }, this)
          }

          axios.put(categoryUrl + self.getCategoryId, {
            categoryName: self.data.categoryName,
            subCategoriesToUpdate: self.subCategoriesToUpdate,
            newSubCategories: self.newSubCategories,
            subCategoriesToDeleteIds: self.subCategoriesToDeleteIds
          })
          .then((response) => {
            let closeFn = () => {
              router.push({ path: '/category' })
            }
            // After POST is success, show Success Alert
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
          return
        }
        let errorAlert = {
          title: 'Error',
          message: 'Some fields are incorrect!',
          type: 'error'
        }
        self.$refs.simplert.openSimplert(errorAlert)
      })
    },
    getCategoryData () {
      return axios.get(categoryUrl + this.getCategoryId)
    },
    getCategoryTyoe () {
      return axios.get(categoryTypesUrl)
    },
    // Delete Staff Record
    deleteBtn () {
      let self = this
      let confirmFn = () => {
        self.isDisabled = true
        axios.delete(categoryUrl + self.getCategoryId)
        .then((response) => {
          // Success Alert
          let closeFn = () => {
            // After deletion, go to Category Page
            router.push({ path: '/category' })
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
      let deleteAlert = {
        title: 'Warning',
        message: 'Are you sure you want to delete category record?',
        type: 'warning',
        useConfirmBtn: true,
        onConfirm: confirmFn
      }
      self.$refs.simplert.openSimplert(deleteAlert)
    }
  },
  computed: {
    computedSubCategoryNames () {
      // https://stackoverflow.com/questions/45273964/get-data-from-nested-json-and-display-using-vue-multiselect
      // Gets objects from nested json, array. Take out each item from the array and GET the item's subCategoryName
      return this.allSubCategoryNames.map((item) => {
        const oldTag = {
          subCategory: item.subCategoryId,
          subCategoryName: item.subCategoryName
        }
        this.options.push(oldTag)
        this.data.subCategories.push(oldTag)
        return item.subCategoryName
      })
    }
  },
  created () {
    let self = this
    // Grab path from URL
    const path = window.location.pathname

    // Break the path into segments
    // ""/"UpdateCategory"/"{categoryId}"
    const segments = path.split('/')

    // Assigned categoryId
    self.getCategoryId = segments[2]

    // Based on the categoryId in the URL, get data for the user
    axios.all([this.getCategoryData(), this.getCategoryTyoe()])
      .then(axios.spread((acct, perms) => {
        self.data.categoryName = acct.data.categoryName
        self.allSubCategoryNames = acct.data.SubCategories

        // Check if categoryTypeBool is true/false
        // Depending on true/false, checkbox will be ticked.
        const catTypeId = acct.data.fk_categoryTypeId
        perms.data.forEach((item) => {
          // Without sub-category
          if (item.categoryTypeId === catTypeId) {
            if (item.categoryTypeBool === true) { // Got sub-cat
              this.checked = true
            } else { // No sub-cat
              this.checked = false
            }
          }
        }, this)

        // Checks json objects in nested json, and take it out and call it "item"
        self.allSubCategoryNames.map((item) => {
          const oldTag = {
            subCategoryId: item.subCategoryId,
            subCategoryName: item.subCategoryName
          }
          self.options.push(oldTag)
          self.data.subCategories.push(oldTag)
        })
      }))
  }
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>

#categoryContainer .box {
  padding-bottom: 8%;
}

.header {
  margin-left: 200px;
  margin-top: 1%;
}

.innerContainer {
  margin: 0 auto;
  position: relative;
  margin-right: -2000px;
}

input {
  margin-top: 10px;
}

label {
  margin-top: 8px;
}

hr {
  margin-left: 2%;
  width: 35%;
}

.input {
  width: 300px;
}

.multiselect {
  width: 300px;
  margin-top: 0.3%;
}

p {
  font-size: 13px;
}

.deleteCatBtn {
  margin-top: 6%;
  float: left;
}

.updateCatBtn {
  margin-top: 1.3%;
  margin-left: 7.8%;
}

.backForCat {
  float: left;
}
</style>
