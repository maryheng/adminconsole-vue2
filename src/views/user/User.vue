<template>
  <div id="container">
    <p class="title is-4">Manage Users</p>
    <div class="box">
      <tabs>
        <!--Staff Tab-->
        <tab name="Staff" :selected="true" href="/user/staff">       
          <router-view></router-view>
        </tab>

        <!--Resident Developer Tab-->
        <tab name="Resident Developer" href="/user/residentdeveloper">
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
      return '#' + this.name.toLowerCase().replace(/\s+/g, '')
    }
  }
}

</script>


<style>
.button {
  margin-left: 2px;
}
</style>
