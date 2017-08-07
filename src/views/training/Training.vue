<template>
  <div id="container">
    <p class="title is-4">Manage Training</p>
    <div class="box">
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
import MyVuetable from '../../components/vuetable3/MyVuetable.vue'
import CustomActionsThird from '../../components/vuetable3/CustomActions.vue'
import router from '../../router'
import { trainingUrl } from '../../config.js'

export default {
  name: 'app',
  components: {
    MyVuetable,
    CustomActionsThird
  },
  data () {
    return {
      apiUrl: trainingUrl,
      fields:
      [
        {
          name: '__sequence', // index number for rows in vuetable
          title: '#',
          titleClass: 'center aligned',
          dataClass: 'right aligned'
        },
        {
          name: 'name',
          title: 'Name'
        },
        {
          name: '__component:custom-actions-third',
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
      router.push({ name: 'UpdateTraining', params: { trainingId: action.data.trainingId } })
    }
  }
}

</script>


<style>

</style>
