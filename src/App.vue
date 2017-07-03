<template>
  <div id="app">
    <navbar :show="true"></navbar>
    <sidebar v-if="noAuthNeeded.indexOf($route.name) <= -1"></sidebar>
    <app-main></app-main>
  </div>
</template>

<script>
import Navbar from './components/layout/Navbar.vue'
import Sidebar from './components/layout/Sidebar.vue'
import AppMain from './components/layout/AppMain.vue'

export default {
  components: {
    Navbar,
    Sidebar,
    AppMain
  },

  data () {
    return {
      noAuthNeeded: ['Login']
    }
  }
}
</script>

<style>
@import '~bulma/css/bulma.css';
</style>
