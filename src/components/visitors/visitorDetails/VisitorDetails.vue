<template>
  <div id="container">
    <router-link to="/AddVisitorDetails">
      <button type="submit" class="button is-primary">Add Visitor Details</button>
    </router-link>
    <br>
    <br>
    <!--Vue Table-->
    <my-vuetable
    ref="vuetable"
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
import { visitors } from '../../../config.js'
import moment from 'moment'

export default {
  name: 'app',
  components: {
    MyVuetable,
    CustomActions
  },
  data () {
    return {
      apiUrl: visitors,
      fields:
      [
        {
          name: '__sequence', // index number for rows in vuetable
          title: '#',
          titleClass: 'center aligned',
          dataClass: 'right aligned'
        },
        {
          name: 'organizationName',
          title: 'Organization Name'
        },
        {
          name: 'visitorCount',
          title: 'Visitor Count'
        },
        {
          name: 'visitPurposeText',
          title: 'Purpose of Visit'
        },
        {
          name: 'visitDateTime',
          title: 'Date of Visit',
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
    // Click "Edit" Button -> routes user to update page
    onActions (action, data) {
      // ~/user/UpdateStaff/{userId}
      router.push({ name: 'UpdateVisitorDetails', params: { visitRecordId: action.data.visitRecordId } })
    },
    formatDate (value, fmt = 'D MMM YYYY, h:mm:ss a') {
      return (value == null)
        ? ''
        : moment(value, 'YYYY-MM-DD').format(fmt)
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
