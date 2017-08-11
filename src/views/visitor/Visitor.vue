<template>
  <div id="container">
    <p class="title is-4">Manage Visitors</p>
    <div class="box">
      <tabs>
        <!--Visitor Details Tab-->
        <tab name="Visitor Details" :selected="true">       
          <router-view></router-view>
        </tab>

        <!--Purpose of Visit Tab-->
        <tab name="Purpose Of Visit">
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
      return '/visitor/visitordetails' + this.name.toLowerCase().replace(/\s+/g, '')
    }
  }
}

</script>


<style>
.button {
  margin-left: 2px;
}
</style>
