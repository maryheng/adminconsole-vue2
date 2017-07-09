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
              <p class="control">
                <multiselect v-model="value" placeholder="Add one or more sub-category!" label="name" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                <!--<pre class="language-json"><code>{{ value  }}</code></pre>-->
              </p>
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
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { categoryUrl } from '../../config'
import axios from 'axios'
// import router from '../../router'

export default {
  name: 'app',
  components: {
    Multiselect
  },
  data () {
    return {
      checked: false,
      value: [],
      options: [],
      data: {
        categoryName: ''
      }
    }
  },
  methods: {
    addTag (newTag) {
      const tag = {
        name: newTag
      }
      this.options.push(tag)
      this.value.push(tag)
      console.log(this.value)
    },
    submitBtn () {
      axios.post(categoryUrl, {
        categoryName: this.data.categoryName
      })
      .then(function (response) {
        console.log(response)
        console.log(response.data.token)
      })
        .catch(function (error) {
          console.log(error)
        })
    }
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
