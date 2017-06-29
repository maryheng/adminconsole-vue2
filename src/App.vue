<template>
  <div id="app">
    <navbar :show="true"></navbar>
    <sidebar :show="true"></sidebar>
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
  }
}
</script>

<style>
@import '~bulma';
</style>
