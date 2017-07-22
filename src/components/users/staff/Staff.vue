<template>
  <div id="container">
    <router-link to="/user/AddStaff">
      <button type="submit" class="button is-primary">Add Staff</button>
    </router-link>
    <br>
    <br>
    <!--Vue Table-->
    <my-vuetable
    ref="vuetable"
    :api-url="apiUrl"
    :fields="fields"
    @onBtnClick="onActions"
    pagination-path=""
    pagination-component="vuetable-pagination"
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
import { EventBus } from './event-bus.js'

export default {
  name: 'app',
  components: {
    MyVuetable,
    CustomActions
  },
  data () {
    return {
      apiUrl: 'https://fypadminconsoletest.azurewebsites.net/api/staffs',
      fields:
      [
        {
          name: '__sequence', // index number for rows in vuetable
          title: '#',
          titleClass: 'center aligned',
          dataClass: 'right aligned'
        },
        {
          name: 'userId',
          title: 'User ID'
        },
        {
          name: 'staffId',
          title: 'Staff ID'
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
  methods: {
    onActions (action, data) {
      // Non Parent-Child Communication (Staff -> UpdateStaff)
      // /user/UpdateStaff/{userId}
      router.push({ name: 'UpdateStaff', params: { userId: action.data.userId } })
      this.$nextTick(() => {
        EventBus.$emit('getUserId', action.data.userId)
      })
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
