<template>
  <div id="container">
    <p class="title is-4">Manage Users</p>
    <div class="box">
      <tabs>
        <!--Staff Tab-->
        <tab name="Staff" :selected="true">       
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
import tabs from '../../components/layout/Tabs.vue'
import tab from '../../components/layout/Tab.vue'

export default {
  name: 'app',
  components: {
    tabs,
    tab
  },
  computed: {
    href () {
      return '/user/staff' + this.name.toLowerCase().replace(/\s+/g, '')
    }
  }
}

</script>


<style>
.button {
  margin-left: 2px;
}
</style>
