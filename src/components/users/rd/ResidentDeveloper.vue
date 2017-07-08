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
          name: 'issuranceDate',
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
  }
}

</script>

<style>
.button {
  margin-left: 2px;
}
</style>

