<template>
<div class="main">
  <div class="content has-text-centered">
    <div class="columns is-vcentered">
      <div class="column is-4 is-offset-3">
        <div id="boxForLogin">
        <div class="box">
          <p class="title is-3">Login</p>
          <p class="subtitle is-6">Only admins can login!</p><br><br>
          <div v-show="error" style="color:red; word-wrap:break-word;">{{ error }}</div>
          <form v-on:submit.prevent="loginFormSubmit()">
            <label class="label">Username</label>
            <p class="control">
              <input v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('username') }"
              name="username" class="input" v-model="req.body.username" type="text" placeholder="username">
              <span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>                   
            </p>
            <label class="label">Password</label>
            <p class="control">
              <input v-validate="'required|min:8'" :class="{'input': true, 'is-danger': errors.has('password') }"
              name="password" class="input"v-model="req.body.password" type="password" placeholder="password">
              <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>                     
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
          <!-- Simplert Notification -->
        <simplert :useRadius="true" :useIcon="true" ref="simplert">
        </simplert>
</div>
</template>

<script>
import { loginUrl } from '../../config'
import axios from 'axios'
import router from '../../router'
import Simplert from 'vue2-simplert/src/components/simplert'

export default {
  components: {
    Simplert
  },
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
      let self = this
      self.$validator.validateAll().then(result => {
        if (result) {
          axios.post(loginUrl, {
            username: self.req.body.username,
            password: self.req.body.password
          })
          .then((response) => {
            // set token and cookie expiry to local storage
            window.localStorage.setItem('access_token', response.data.token)
            window.localStorage.setItem('cookie_expiry', new Date(Date.now() + 28800000).toString())

            // Include token in all request headers
            if (window.localStorage.getItem('access_token') !== null) {
              // axios.defaults.headers.common['authorization'] = 'Bearer ' + window.localStorage.getItem('access_token')
              axios.defaults.headers.common['authorization'] = window.getToken()
            }
            router.push({ path: '/' })
          })
            .catch((error) => {
              let errorAlert = {
                title: 'Error',
                message: error.response.data.message.message,
                type: 'error'
              }
              self.$refs.simplert.openSimplert(errorAlert)
            })
          return
        }
        let errorAlert = {
          title: 'Error',
          message: 'Some fields are incorrect!',
          type: 'error'
        }
        self.$refs.simplert.openSimplert(errorAlert)
      })
    }
  },
  created () {
    console.log(`csrf token is: ${this.$cookie.get('_xsrf')}`)
    axios.defaults.headers.common['x-xsrf-token'] = this.$cookie.get('_xsrf')
  }
}
</script>

<style>
#boxForLogin .input {
  width: 500px;
}

#boxForLogin button {
  margin-bottom: 5%;
}

#boxForLogin .box {
  padding: 50px;
  margin-top: 9%;
}
</style>
