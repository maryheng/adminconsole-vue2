<template>
  <div id="container">
    <p class="title is-4">Manage Category</p>
    <div class="box">
      <router-link to="/AddCategory">
        <button type="submit" class="button is-primary">Add Category</button>
      </router-link>
      <br>
      <br>
      <!--Vue Table-->
      <my-vuetable
        :api-url="apiUrl"
        :fields="fields"   
        pagination-path=""   
        pagination-component="vuetable-pagination"     
        ></my-vuetable>
      <br>
      <br>

      <router-view></router-view>
    </div>
  </div>
</template>



<script>
import MyVuetable from '../../components/vuetable/MyVuetable.vue'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    MyVuetable
  },
  data () {
    return {
      apiUrl: 'https://fypadminconsoletest.azurewebsites.net/api/categories',
      fields:
      [
        {
          name: 'categoryId',
          title: 'category ID',
          sortField: 'nricPassportNo'
        },
        {
          name: 'categoryName',
          title: 'Category Name'
        },
        {
          name: '__component:custom-actions',
          title: 'Actions',
          titleClass: 'center aligned',
          dataClass: 'center aligned'
        }
      ]
    }
  },
  created () {
    axios.get('https://fypadminconsoletest.azurewebsites.net/api/categories')
      .then((response) => {
        console.log(response)
      })
  }
}

</script>


<style>

</style>
