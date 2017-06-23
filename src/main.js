// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.axios = axios

// Vue.use(axios)
// Vue.use(VueResource)

// Enable devtools
Vue.config.productionTip = true

// vue-resource interceptor to pass in token to request headers
// Vue.http.interceptors.push((request, next) => {
//   var accessToken = window.localStorage.getItem('access_token')
//   request.headers.set('x-access-token', accessToken)
//   next()
// })

// axios.interceptors.request.use(config => {
//   var accessToken = window.localStorage.getItem('access_token')
//   config.headers = { 'x-access-token': accessToken }
//   return config
// })

// Global axios default (config default that will be applied to every request)
var accessToken = window.localStorage.getItem('access_token')
axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.headers.common['x-access-token'] = accessToken

// /* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

// const app = new Vue({
//   router,
//   ...App
// })

export { app, router, axios }
