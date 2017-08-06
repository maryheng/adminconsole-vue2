<template>
  <div id="app">
    <navbar :show="true">
      <logout v-if="check()"></logout>
    </navbar>
    <vue-progress-bar></vue-progress-bar>
    <sidebar v-if="noAuthNeeded.indexOf($route.name) <= -1"></sidebar>
    <app-main></app-main>
  </div>
</template>

<script>
import Navbar from './components/layout/Navbar.vue'
import Sidebar from './components/layout/Sidebar.vue'
import AppMain from './components/layout/AppMain.vue'
import Logout from './components/layout/Logout.vue'
import VueProgressBar from 'vue-progressbar'

export default {
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Logout,
    VueProgressBar
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
  },
  mounted () {
    this.$Progress.finish()
  },
  created () {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start()
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        // parse meta tags
        this.$Progress.parseMeta(meta)
      }
      //  start the progress bar
      this.$Progress.start()
      //  continue to next page
      next()
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish()
    })
  }
}
</script>

<style>
@import '~bulma/css/bulma.css';
</style>
