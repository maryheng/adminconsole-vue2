// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueSocketio from 'vue-socket.io'
import { baseUrl } from './config.js'

Vue.prototype.$http = axios
Vue.axios = axios
Vue.use(VueSocketio, baseUrl, { forceNew: true })

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
  created () {
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
