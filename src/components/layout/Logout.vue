<template>
  <div class="nav-right">
    <button type="signOut" class="button is-outlined" v-on:click="logout()">Sign Out</button>
  </div>
</template>

<script>
import { logoutUrl } from '../../config'
import axios from 'axios'
import router from '../../router'

export default {
  name: 'app',
  components: 'logout',
  data () {
    return {
      check: false
    }
  },
  methods: {
    logout () {
      axios.get(logoutUrl)
    .then((response) => {
      console.log('Logged out, token disposed')
      window.localStorage.removeItem('access_token')
      router.push({ path: '/login' })
    })
    .catch((err) => {
      console.log(err)
    })
    }
  }
}
</script>

<style>
.nav button {
  margin-top: 1%;
}
</style>

