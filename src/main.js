// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.axios = axios

// Enable devtools
Vue.config.productionTip = true

// Global axios default (config default that will be applied to every request)
var accessToken = window.localStorage.getItem('access_token')
axios.defaults.baseURL = 'https://fypadminconsoletest.azurewebsites.net/'
axios.defaults.headers.common['authorization'] = 'Bearer ' + accessToken

const app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})

// const app = new Vue({
//   router,
//   ...App
// })

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth !== false) { // check the meta field
    if (window.localStorage.getItem('access_token') !== null) {
      console.log('User is authorised.') // check if the user is authenticated
      next() // the next method allow the user to continue to the router
    } else {
      console.log('User is not authorised.')
      next('/login') // Redirect the user to the main page
    }
  } else {
    next()
  }
})

export {
  app,
  router,
  axios
}
