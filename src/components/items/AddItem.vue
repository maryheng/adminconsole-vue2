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
                  <multiselect :multiple="true" v-model="categoryNames" :hide-selected="true" :options="options" :searchable="false" :allow-empty="true" track-by="categoryName">
                  </multiselect>
                  <!-- <multiselect 
                        :multiple="true"
                        v-model="data.subCategoryNames"
                        :hide-selected="true"
                        :selected="data.subCategoryNames"
                        :options="options"
                        :taggable="true" 
                        @tag="addTag">
                        </multiselect>                  -->
                  <!-- <pre>{{$data | json}}</pre>    -->
                </p>
              </div>
            </div>
          </div>
        </div>
  
        <!--nput field for Type of Sub-Category-->
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Type of Sub-Category:</label>
          </div>
          <div class="field-body">
            <div class="field is-grouped">
              <p class="control">
  
              </p>
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
              <label class="label">Item ID</label>
              <input class="input" type="text" placeholder="Item ID" v-model="item.itemId">
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
              <input class="input" type="text" placeholder="Managed By" v-model="item.staffId">
            </p>
            <p class="control">
              <label class="label">Loanable (Tick if yes)</label>
              <input type="checkbox" value="Yes" v-model="item.checked">
            </p>
            <!-- <p class="control">
                    <button class="button is-info is-focused" @click="addRow">Add</button>
                  </p>                 -->
            <div id="delBtn">
              <button class="button is-danger" @click="delRow(item)">-</button>
            </div>
          </div>
  
        </div>
        <!-- <p class="control">
          <button class="button is-info is-focused" @click="addRow">Add</button>
        </p> -->
  
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
                  <button class="button is-primary">
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
// import router from '../../../router'
// import { categoryUrl } from '../../config'
// import axios from 'axios'
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
      itemArray: [{
        itemId: '',
        serialNo: '',
        idaAssetNo: '',
        imdaAssetNo: '',
        staffId: '',
        checked: ''
      }],
      options: [],
      categoryNames: ''
    }
  },
  methods: {
    addRow () {
      this.itemArray.push({
        itemId: '',
        serialNo: '',
        idaAssetNo: '',
        imdaAssetNo: '',
        staffId: '',
        checked: ''
      })
    },
    delRow (item) {
      const index = this.itemArray.indexOf(item)
      this.itemArray.splice(index, 1)
    }
  },
  created () {
    // let self = this
    // axios.get('https://fypadminconsoletest.azurewebsites.net/api/categories?sort=&page=1&per_page=10')
    //   .then((response) => {
    //     console.log(response.data.data)
    //     self.options = response.data.data
    //   })
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

