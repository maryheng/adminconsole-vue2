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
      ></my-vuetable>
    <br>
    <br>

    <router-view></router-view>
  </div>
</template>



<script>
import MyVuetable from '../../../components/vuetable/MyVuetable.vue'
import moment from 'moment'

export default {
  name: 'app',
  components: {
    MyVuetable
  },
  data () {
    return {
      apiUrl: 'https://fypadminconsoletest.azurewebsites.net/api/residentdevelopers',
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
    }
  }
}
</script>

<style>
.button {
  margin-left: 2px;
}
</style>

