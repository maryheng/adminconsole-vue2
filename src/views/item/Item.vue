<template>
  <div id="container">
    <p class="title is-4">Manage Items</p>
    <div class="box">
      <router-link to="/AddItem">
        <button type="submit" class="button is-primary">Add Item</button>
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
import { itemUrl } from '../../config.js'

export default {
  name: 'app',
  components: {
    MyVuetable,
    CustomActions
  },
  data () {
    return {
      apiUrl: itemUrl,
      fields:
      [
        {
          name: 'ItemParent.itemParentId',
          title: 'Item Parent ID'
        },
        {
          name: 'ItemParent.itemName',
          title: 'Item Parent'
        },
        {
          name: 'itemChildId',
          title: 'Item Child ID'
        },
        {
          name: 'itemChildLabel',
          title: 'Item Child Name'
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
