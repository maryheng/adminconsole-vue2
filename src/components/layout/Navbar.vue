<template>
<div id="app">
<nav class="nav has-shadow">
  <div class="container">
    <div class="nav-left">
      <p>Pixel Labs</p>
    </div>
    <button type="signOut" class="button is-outlined" v-on:click="logout()">Sign Out</button>
    <!--<div class="nav-right nav-menu">
      <a class="nav-item is-tab">Sign out</a>
    </div>-->
  </div>
</nav>
</div>
</template>

<script>
import { logoutUrl } from '../../config'
import axios from 'axios'
import router from '../../router'

export default {
  name: 'app',
  components: 'navbar',
  data () {
    return {
      token: window.localStorage.getItem('access_token'),
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
  height: 60px;
}

p {
  font-size: 21px;
  margin: 15px 0px 0 50px;
  font-weight: bold;
}
.button {
  margin-top: 12px;
}

</style>
