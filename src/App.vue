<template>
  <div id="app">
    <navbar :show="true">
      <logout v-if="check()"></logout>
    </navbar>
    <sidebar v-if="noAuthNeeded.indexOf($route.name) <= -1"></sidebar>
    <app-main></app-main>
  </div>
</template>

<script>
import Navbar from './components/layout/Navbar.vue'
import Sidebar from './components/layout/Sidebar.vue'
import AppMain from './components/layout/AppMain.vue'
import Logout from './components/layout/Logout.vue'

export default {
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Logout
  },

  data () {
    return {
      noAuthNeeded: ['Login'],
      // check: false
      checkHelp: false
    }
  },

  methods: {
    check () {
      if (window.localStorage.getItem('access_token')) {
        console.log('Logout button shown')
        this.checkHelp = true
        console.log(this.checkHelp)
        return true
      } else {
        console.log('Logout button hidden')
        // return false
        this.checkHelp = false
        console.log(this.checkHelp)
        return false
      }
    }
  }
}
</script>

<style>
@import '~bulma/css/bulma.css';
</style>
