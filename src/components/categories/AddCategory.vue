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
                  <input type="checkbox" value="Yes" v-model="checked"> Yes
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
                <!-- <multiselect v-model="data.selected" placeholder="Add one or more sub-category!" label="subCategoryName" 
                :options="options" :hide-selected="true" :multiple="true" :taggable="true" @tag="addTag" 
                @update="updateSelected">
                </multiselect> -->
                <multiselect :multiple="true" v-model="data.subCategoryNames" :hide-selected="true" :selected="data.subCategoryNames" :options="options" :taggable="true" @tag="addTag">
                </multiselect>
                <pre>{{$data | json}}</pre>
              </p>
            </div>
            </div>
          </div>
        </div>
  
        <div class="field is-horizontal">
          <div class="field-label">
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <button class="button is-primary" @click="submitBtn">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

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
      allCatTypes: []
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
      allCatTypes.forEach((item) => {
        if (self.checked === true && item.categoryTypeBool === true) {
          self.data.categoryTypeId = item.categoryTypeId
        }
        if (self.checked === false && item.categoryTypeBool === false) { // checkbox is unticked
          alert('checkbox is not ticked')
          alert(item.categoryTypeBool)
          self.data.categoryTypeId = item.categoryTypeId
          alert(self.data.categoryTypeId)
        }
      }, this)
    },
    submitBtn () {
      let self = this
      self.filterCatType()
      let confirmFn = () => {
        axios.post(categoryUrl, {
          categoryName: self.data.categoryName,
          categoryTypeId: self.data.categoryTypeId,
          subCategoryNames: self.data.subCategoryNames
        })
        .then((response) => {
          console.log(response)
          // After POST is success, show Success Alert
          let closeFn = () => {
            router.push({ path: 'category' })
          }
          let successAlert = {
            title: 'Success',
            message: 'Category is created!',
            type: 'success',
            onClose: closeFn
          }
          self.$refs.simplert.openSimplert(successAlert)
        })
        .catch((error) => {
          console.log(error)
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
</style>
