<template>
  <div id="container">
    <div class="innerContainer">
      <p class="title is-4">Manage Category</p>
      <div class="box">
        <div class="header">
          <p class="title is-4">Category Details</p>
        </div>
        <hr>
  
        <!--Input field for Category Name-->
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Category Name:</label>
          </div>
          <div class="field-body">
            <div class="field is-grouped">
              <p class="control">
                <input class="input" type="text" v-model="data.categoryName">
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
                  >
                  </multiselect>                   
                </p>
              </div>
            </div>
          </div>
        </div>
  
        <pre>
      {{ $data | json }}
    </pre>

        <!-- Update Category Button -->
        <div class="updateCatBtn">
          <div class="field is-horizontal">
            <div class="field-label">
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <button class="button is-primary" @click="updateCatBtn">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Delete Category Button -->
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
      options: [],
      checked: '',
      getCategoryId: '',
      allSubCategoryNames: []
    }
  },
  methods: {
    addTag (newTag) {
      const tag = {
        subCategoryId: 0,
        subCategoryName: newTag
      }
      this.data.subCategories.push(tag)
    },
    updateCatBtn () {
      let self = this
      axios.put(categoryUrl + self.getCategoryId, {
        categoryName: this.data.categoryName,
        categoryTypeId: this.data.categoryTypeId,
        subCategories: this.data.subCategories
      })
      .then((response) => {
        console.log(response)
        let closeFn = () => {
          router.push({ path: '/category' })
        }
        // After POST is success, show Success Alert
        let successAlert = {
          title: 'Success',
          message: 'Category is updated!',
          type: 'success',
          onClose: closeFn
        }
        self.$refs.simplert.openSimplert(successAlert)
      })
      .catch((error) => {
        console.log(error)
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
        axios.delete(categoryUrl + self.getCategoryId)
        .then((response) => {
          console.log(response)
          // Success Alert
          let closeFn = () => {
            // After deletion, go to Category Page
            router.push({ path: '/category' })
          }
          let successAlert = {
            title: 'Success',
            message: 'Category record has been deleted!',
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

        // Assign variable to categoryTypeId
        const noSubCat = perms.data[0].categoryTypeId

        // check against categoryTypeId in getCategoryDat() response
        self.data.categoryTypeId = acct.data.fk_categoryTypeId
        if (self.data.categoryTypeId === noSubCat) {
          this.checked = false
        } else {
          this.checked = true
        }

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

.box {
  padding-bottom: 10%;
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

button {
  margin-top: 1%;
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

.deleteBtn {
  float: left;
  margin-top:7.5%;
}

.updateCatBtn {
  margin-left: 7.9%;
}
</style>
