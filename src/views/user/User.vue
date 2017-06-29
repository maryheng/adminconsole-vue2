<template>
  <div id="container">
    <p class="title is-4">Manage Users</p>
    <div class="box">
      <tabs>
        <!--Staff Tab-->
        <tab name="Staff" :selected="true" href="/user/">       
          <router-view></router-view>
        </tab>

        <!--Resident Developer Tab-->
        <tab name="Resident Developer">
          <router-view></router-view>          
        </tab>     

      </tabs>
    </div>
  </div>
  <!--Staff Tab-->
</template>



<script>
// import router from '../../router'
import MyVuetable from '../../components/MyVuetable.vue'
import tabs from '../../components/layout/Tabs.vue'
import tab from '../../components/layout/Tab.vue'
import { staffUrl } from '../../config'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    MyVuetable,
    tabs,
    tab
  },
  data: {
    function () {

    }
  },
  methods: {
    btnAddStaff () {

    }
  },
  mounted () {
    axios.get(staffUrl)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

</script>


<style>
.button {
  margin-left: 2px;
}
</style>
