<template>
  <div id="addCategoryContainer">
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
        <form @submit.prevent="validateBeforeSubmit">  
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
              <div id="checkboxForCat">
              <p class="control">
                <label class="checkbox">
                  <input type="checkbox" value="Yes" v-model="checked"> Yes
                </label>
              </p>
              </div>
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
                <!-- <multiselect v-model="data.selected" placeholder="Add one or more sub-category!" label="subCategoryName" 
                :options="options" :hide-selected="true" :multiple="true" :taggable="true" @tag="addTag" 
                @update="updateSelected">
                </multiselect> -->
                <multiselect :multiple="true" v-model="data.subCategoryNames" :hide-selected="true" :selected="data.subCategoryNames" :options="options" :taggable="true" @tag="addTag">
                </multiselect>
              </p>
            </div>
            </div>
          </div>
        </div>
  
        <div class="saveCatBtn">
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
      <simplert 
        :useRadius="true"
        :useIcon="true"
        ref="simplert">
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
        subCategoryNames: []
      },
      options: [],
      checked: false,
      allCatTypes: [],
      isDisabled: false
    }
  },
  methods: {
    addTag (newTag) {
      this.options.push(newTag)
      this.data.subCategoryNames.push(newTag)
    },
    filterCatType () {
      let self = this
      const allCatTypes = self.allCatTypes

      // Check through if categoryTypeBool is true/false
      allCatTypes.forEach((item) => {
        if (self.checked === true && item.categoryTypeBool === true) {
          self.data.categoryTypeId = item.categoryTypeId
        }
        if (self.checked === false && item.categoryTypeBool === false) { // checkbox is unticked
          self.data.categoryTypeId = item.categoryTypeId
        }
      }, this)
    },
    validateBeforeSubmit () {
      let self = this
      self.$validator.validateAll().then(result => {
        if (result) {
          self.isDisabled = true
          self.filterCatType()
          let confirmFn = () => {
            axios.post(categoryUrl, {
              categoryName: self.data.categoryName,
              categoryTypeId: self.data.categoryTypeId,
              subCategoryNames: self.data.subCategoryNames
            })
            .then((response) => {
              // After POST is success, show Success Alert
              let closeFn = () => {
                router.push({ path: 'category' })
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
          } // End of confirmFn()
          let warningAlert = {
            title: 'Warning',
            message: 'Once you have saved a category type to have sub-categories or without, you cannot change the type anymore!',
            type: 'warning',
            useConfirmBtn: true,
            onConfirm: confirmFn
          } // End of warningAlert
          self.$refs.simplert.openSimplert(warningAlert)
          return
        }
        let errorAlert = {
          title: 'Error',
          message: 'Some fields are incorrect!',
          type: 'error'
        }
        self.$refs.simplert.openSimplert(errorAlert)
      })
    }
  },
  created () {
    let self = this

    axios.get(categoryTypesUrl)
      .then((response) => {
        self.allCatTypes = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>

#addCategoryContainer .box {
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

#checkboxForCat {
  margin-top: 0.6%;
}

.backForCat {
  float: left;
}

.saveCatBtn {
  margin-left: 8.5%;
}
</style>
