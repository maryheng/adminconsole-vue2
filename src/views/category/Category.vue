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
        @onBtnClick="onActions"
        ></my-vuetable>   
      <br>
      <br>

      <router-view></router-view>
    </div>
  </div>
</template>



<script>
import MyVuetable from '../../components/vuetable/MyVuetable.vue'
// import axios from 'axios'
import CustomActions from '../../components/vuetable/CustomActions.vue'
import router from '../../router'
import { categoryUrl } from '../../config.js'

export default {
  name: 'app',
  components: {
    MyVuetable,
    CustomActions
  },
  data () {
    return {
      apiUrl: categoryUrl,
      fields:
      [
        {
          name: '__sequence', // index number for rows in vuetable
          title: '#',
          titleClass: 'center aligned',
          dataClass: 'right aligned'
        },
        {
          name: 'categoryName',
          title: 'Category Name'
        },
        // {
        //   name: 'SubCategories',
        //   title: 'SubCategories',
        //   callback: 'combineSubCat'
        // },
        {
          name: '__component:custom-actions',
          title: 'Actions',
          titleClass: 'center aligned',
          dataClass: 'center aligned'
        }
      ]
    }
  },
  methods: {
    combineSubCat (value) {
      return value.map(d => {
        return {
          subCategories: d.SubCategories.reduce((acc, c) => {
            return acc ? acc + ', ' + c.subCategoryName : c.subCategoryName
          }, '')
        }
      })
    },
    // Click "Edit" Button -> routes user to update page
    onActions (action, data) {
      // ~/UpdateCategory/{userId}
      router.push({ name: 'UpdateCategory', params: { userId: action.data.categoryId } })
    }
  }
}

</script>


<style>

</style>
