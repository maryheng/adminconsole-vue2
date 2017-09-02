<template>
  <div id="container">
    <router-link to="/AddResident">
      <button type="submit" class="button is-primary">Add Resident Developer</button>
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
</template>



<script>
import MyVuetable from '../../../components/vuetable/MyVuetable.vue'
import CustomActions from '../../../components/vuetable/CustomActions.vue'
import router from '../../../router'
import { rdUrl } from '../../../config.js'

export default {
  name: 'app',
  components: {
    MyVuetable,
    CustomActions
  },
  data () {
    return {
      apiUrl: rdUrl,
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
          name: 'nricPassportNo',
          title: 'NRIC/Passport No',
          sortField: 'nricPassportNo'
        },
        {
          name: 'company',
          title: 'Company'
        },
        {
          name: 'email',
          title: 'Email'
        },
        {
          name: 'mobileNo',
          title: 'Mobile No'
        },
        {
          name: 'keyCardRefNo',
          title: 'Key Card No'
        },
        {
          name: 'issuanceDate',
          title: 'Issuance Date',
          callback: 'formatDate'
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
      router.push({ name: 'UpdateResident', params: { residentDeveloperId: action.data.residentDeveloperId } })
    }
  }
}
</script>

<style>
.button {
  margin-left: 2px;
}
</style>

