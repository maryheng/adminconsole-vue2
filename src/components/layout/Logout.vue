<template>
  <button type="signOut" class="button is-outlined" v-on:click="logout()">Sign Out</button>
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
      console.log('Logout button clicked')
      axios.get(logoutUrl)
    .then((response) => {
      // console.log(response)
      console.log('Logged out, token disposed')
      window.localStorage.removeItem('access_token')
      // window.location.href = '/login'
      router.push({ path: '/login' })
    })
    .catch((err) => {
      console.log(err)
    })
    }
  }
}
</script>
