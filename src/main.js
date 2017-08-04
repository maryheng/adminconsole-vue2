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
Vue.use(VeeValidate)

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
          // Click on notification, leads user to Update Training page
          notification.onclick = () => {
            axios.put(notificationUrl + val.notificationId + notificationLookedAt)
            window.open(val.notificationUrl, '_blank')
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
                window.open(val.notificationUrl, '_blank')
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
    this.initNotification()
    Dispatcher.$on('triggerNotification', (data) => {
      this.loadNotifications(data)
    })
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
