// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueSocketio from 'vue-socket.io'
import { baseUrl, notificationUrl, notificationLookedAt } from './config.js'
import VueCookie from 'vue-cookie'
import VeeValidate, { Validator } from 'vee-validate'
import { Dispatcher } from './Dispatcher.js'
import moment from 'moment'

Validator.installDateTimeValidators(moment)

Vue.prototype.$http = axios
Vue.axios = axios
Vue.use(VueSocketio, baseUrl, { forceNew: true })
// Vue.use(VueSocketio, '/', { forceNew: true })
Vue.use(VueCookie)
Vue.use(VeeValidate, {fieldsBagName: 'formFields'})

// Enable devtools
Vue.config.productionTip = true

// Return headers function
window.getToken = () => {
  console.log('Getting headers in main')
  var accessToken = window.localStorage.getItem('access_token')
  if (accessToken) {
    return `Bearer ${accessToken}`
  } else {
    return null
  }
}

// Global axios default (config default that will be applied to every request)
axios.defaults.baseURL = `${baseUrl}/`
// Accounts for refresh or reload page
if (window.getToken() !== null) {
  axios.defaults.headers.common['authorization'] = window.getToken()
}

if (VueCookie.get('_xsrf') !== null) {
  axios.defaults.headers.common['x-xsrf-token'] = VueCookie.get('_xsrf')
}

// Global axios default (config default that will be applied to every request)
var accessToken = window.localStorage.getItem('access_token')
axios.defaults.baseURL = baseUrl
axios.defaults.headers.common['authorization'] = 'Bearer ' + accessToken

Vue.axios.interceptors.response.use((response) => { // intercept the global error
  return response
}, function (error) {
  let originalRequest = error.config
  if (error.response.status === 401 && !originalRequest._retry) { // if the error is 401 and hasent already been retried
    originalRequest._retry = true // now it can be retried
    router.push({ path: '/login' })
  }
  if (error.response.status === 404 && !originalRequest._retry) {
    originalRequest._retry = true
    router.push({ path: '/' })
    return
  }
  // Do something with response error
  return Promise.reject(error)
})

const app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  },
  sockets: {
    connect: () => {
      console.log('Socket connected!')
    },
    notification: (data) => {
      Dispatcher.$emit('triggerNotification', data)
    },
    disconnect: () => {
      alert('disconnected')
      console.log('Disconnected from socket')
    }
  },
  methods: {
    emitToServer: function (val) {
      console.log('Invoked emit to server:', val)
      this.$socket.emit('vueClient', val)
    },
    // Permission for notifications
    initNotification: () => {
      if (!('Notification' in window)) {
        alert('This browser does not support desktop notification')
      } else if (Notification.permission === 'granted') {
        console.log('You are already subscribed to notifications!')
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission((permission) => {
          if (!('permission' in Notification)) {
            Notification.permission = permission
          }
          if (permission === 'granted') {
            console.log('You just granted permissions for notifications!')
          }
        })
      }
    },
    loadNotifications: (val) => {
      console.log(val)
      var title = val.notificationTitle
      var body = val.notificationBody
      var options = {}
      options.body = body
      if (!('Notification' in window)) {
        alert('This browser does not support desktop notification')
      } else if (Notification.permission === 'granted') {
        var notification = new Notification(title, options)
        notification.title

        // If user clicks on a notification that belongs to missed notifications
        if (notification.title === 'Missed notifications') {
          notification.onclick = () => {
            router.push({ path: '/' })
          }
        } else { // If user clicks on a loan/training notification
          // DUE LOAN NOTIFICATION
          if (val.notificationTitle === 'Due Loan') {
            notification.onclick = () => {
              axios.put(notificationUrl + val.notificationId + notificationLookedAt)
              .then((response) => {
                router.push({ path: '/loan/dueloans' })
              })
            }
            // Grab path from URL
            // If user is at Dashboard, reload the page
            const path = window.location.pathname
            if (path === '/') {
              window.location.reload()
            }
          } else { // TRAINING NOTIFICATION
            // Click on notification, leads user to Update Training page
            notification.onclick = () => {
              axios.put(notificationUrl + val.notificationId + notificationLookedAt)
                .then((response) => {
                  // window.open(val.notificationUrl, '_self')
                  window.location.replace(val.notificationUrl)
                })
            }
            // Grab path from URL
            // If user is at Dashboard, reload the page
            const path = window.location.pathname
            if (path === '/') {
              window.location.reload()
            }
          }
        }
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission((permission) => {
          if (!('permission' in Notification)) {
            Notification.permission = permission
          }
          if (permission === 'granted') {
            var notification = new Notification(title, options)
            notification.body

            // If user clicks on a notification that belongs to missed notifications
            if (notification.title === 'Missed notifications') {
              notification.onclick = () => {
                router.push({ path: '/' })
              }
            } else { // If user clicks on a loan/training notification
              // Click on notification, leads user to Update Training page
              notification.onclick = () => {
                axios.put(notificationUrl + val.notificationId + notificationLookedAt)
                // window.open(val.notificationUrl, '_self')
                window.location.replace(val.notificationUrl)
              }
            }
          }
        })
      }
    }
  },
  beforeCreate () {
    // Redirect back to login if user access resource directly via url or refresh and no token is already available
    if (window.getToken()) {
      if (window.location.pathname.toLowerCase() === '/login') {
        router.push('/')
      }
    } else {
      console.log('No token from direct url, redirect to login')
      router.push('/login')
    }
  },
  created () {
    var path = window.location.pathname
    if (!(path === '/login')) {
      this.initNotification()
      Dispatcher.$on('triggerNotification', (data) => {
        this.loadNotifications(data)
      })
    }
  },
  mounted () {
    setTimeout(() => {
      this.emitToServer('Vue client is connected')
    }, 1000)
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth !== false) { // check the meta field
    if (window.getToken() !== null) {
      console.log('User is authorised.') // check if the user is authenticated
      next() // the next method allow the user to continue to the router
    } else {
      console.log('User is not authorised.')
      axios.defaults.headers.common['authorization'] = null
      axios.defaults.headers.common['x-xsrf-token'] = null
      next('/login') // Redirect the user to the main page
    }
  } else {
    next()
  }
})

export {
  app,
  router,
  axios,
  VeeValidate
}
