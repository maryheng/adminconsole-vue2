<template>
  <div id="container">
      <router-link to="/user/AddStaff">
        <button type="submit" class="button is-primary">Add Staff</button>
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
import MyVuetable from '../../components/vuetable/MyVuetable.vue'

export default {
  name: 'app',
  components: {
    MyVuetable
  },
  data () {
    return {
      apiUrl: 'https://fypadminconsoletest.azurewebsites.net/api/staffs',
      fields:
      [
        {
          name: 'userId',
          title: 'User ID',
          sortField: 'userId'
        },
        {
          name: 'name',
          title: 'Name'
        },
        {
          name: 'username',
          title: 'Username'
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
