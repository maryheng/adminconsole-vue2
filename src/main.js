// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueSocketio from 'vue-socket.io'
import { baseUrl } from './config.js'
import VueCookie from 'vue-cookie'

Vue.prototype.$http = axios
Vue.axios = axios
Vue.use(VueSocketio, baseUrl, { forceNew: true })
// Vue.use(VueSocketio, '/', { forceNew: true })
Vue.use(VueCookie)

// Enable devtools
Vue.config.productionTip = true

// Vue custom event dispatcher
class Dispatcher {
  constructor () {
    this.vue = new Vue()
  }
  fire (event, data = null) {
    this.vue.$emit(event, data)
  }
  listen (event, callback) {
    this.vue.$on(event, callback)
  }
}

window.Event = new Dispatcher()
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
axios.defaults.baseURL = 'https://fypadminconsoletest.azurewebsites.net/'
// axios.defaults.baseURL = 'http://192.168.0.55:3000/'
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
      Event.fire('triggerNotification', data)
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
      var title = val.notificationTitle
      if (!('Notification' in window)) {
        alert('This browser does not support desktop notification')
      } else if (Notification.permission === 'granted') {
        var notification = new Notification(title)
        notification.title
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission((permission) => {
          if (!('permission' in Notification)) {
            Notification.permission = permission
          }
          if (permission === 'granted') {
            var notification = new Notification(title)
            notification.body
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
    Event.listen('triggerNotification', (data) => {
      this.loadNotifications(data)
    })
  },
  mounted () {
    setTimeout(() => {
      this.emitToServer('Vue client is connected')
    }, 1000)
  }
})

// const app = new Vue({
//   router,
//   ...App
// })

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
  axios
}
