<template>
  <div id="container">
    <router-link to="/user/AddResident">
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
import moment from 'moment'
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
        'userId', 'name',
        {
          name: 'nricPassportNo',
          title: 'NRIC/Passport No',
          sortField: 'nricPassportNo'
        },
        'company', 'email',
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
          callback: 'formatDate|DD-MM-YYYY'
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
    formatDate (value, fmt = 'D MMM YYYY') {
      return (value == null)
        ? ''
        : moment(value, 'YYYY-MM-DD').format(fmt)
    },
    // Click "Edit" Button -> routes user to update page
    onActions (action, data) {
      // ~/user/UpdateResident/{userId}
      router.push({ name: 'UpdateResident', params: { userId: action.data.userId } })
    }
  },
  computed: {
    href () {
      return '' + this.name.toLowerCase().replace(/\s+/g, '')
    }
  }
}
</script>

<style>
.button {
  margin-left: 2px;
}
</style>

