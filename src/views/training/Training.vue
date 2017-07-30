<template>
  <div id="container">
    <p class="title is-4">Manage Training</p>
    <div class="box">
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
          name: 'categoryId',
          title: 'category ID',
          sortField: 'nricPassportNo'
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
  methods: {
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
