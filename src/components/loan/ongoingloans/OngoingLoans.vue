<template>
  <div id="container">
    <router-link to="/loan/AddLoan">
      <button type="submit" class="button is-primary">Add Loan</button>
    </router-link>
    <br>
    <br>
    <!--Vue Table-->
    <my-vuetable
    ref="vuetable"
    :api-url="apiUrl"
    :fields="fields"
    @onBtnClick="onActions"
    @returnedAction="onReturnActions"
    ></my-vuetable>
    
    <br>
    <br>

    <router-view></router-view>
  </div>
</template>

<script>
import MyVuetable from '../../../components/vuetable2/MyVuetable.vue'
import CustomActionsSecond from '../../../components/vuetable2/CustomActions.vue'
import router from '../../../router'
import { staffUrl } from '../../../config.js'

export default {
  name: 'app',
  components: {
    MyVuetable,
    CustomActionsSecond
  },
  data () {
    return {
      apiUrl: staffUrl,
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
          name: '__component:custom-actions-second',
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
      // ~/user/UpdateStaff/{userId}
      router.push({ name: 'UpdateStaff', params: { userId: action.data.userId } })
    },
    onReturnActions (action, data) {
      // RETURN LOAN LOGIC
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
