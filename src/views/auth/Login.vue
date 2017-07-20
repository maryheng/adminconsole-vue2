<template>
<div class="main">
  <div class="content has-text-centered">
    <div class="columns is-vcentered">
      <div class="column is-4 is-offset-3">
        <div class="box">
          <p class="title is-3">Login</p>
          <p class="subtitle is-6">Only admins can login!</p><br><br>
          <div v-show="error" style="color:red; word-wrap:break-word;">{{ error }}</div>
          <form v-on:submit.prevent="loginFormSubmit()">
            <label class="label">Username</label>
            <p class="control">
              <input class="input" v-model="req.body.username" type="text" placeholder="username">
            </p>
            <label class="label">Password</label>
            <p class="control">
              <input class="input" v-model="req.body.password" type="password" placeholder="password">
            </p>
  
            <br><br>
            <p class="">
              <button type="submit" class="button is-primary">Login</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { loginUrl } from '../../config'
import axios from 'axios'
import router from '../../router'

export default {
  data () {
    return {
      req: {
        body: {
          username: '',
          password: ''
        },
        header: {
          access_token: null,
          cookie_expiry: null
        }
      },
      error: ''
    }
  },
  // mounted: () => {
  //   // check if user is logged on
  //   var raw = window.localStorage.getItem('session')
  //   if (raw) {
  //     var session = JSON.parse(raw)
  //     if (Date.now() > Date.parse(session['cookie_expiry'])) {
  //       window.localStorage.removeItem('session')
  //     } else {
  //       this.sessionData = session
  //     }
  //   }
  // },
  methods: {
    loginFormSubmit () {
      axios.post(loginUrl, {
        username: this.req.body.username,
        password: this.req.body.password
      })
      .then((response) => {
        console.log(response)
        console.log(response.data.token)

        // set token and cookie expiry to local storage
        window.localStorage.setItem('access_token', response.data.token)
        window.localStorage.setItem('cookie_expiry', new Date(Date.now() + 28800000).toString())

        router.push({ path: '/dashboard' })
      })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
/*@import '../../../node_modules/bulma/sass/utilities/initial-variables.sass';*/

.box {
  padding: 50px;
}
</style>
