import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import Login from '../views/auth/Login.vue'
import Users from '../views/user/Users.vue'
import AddStaff from '../views/user/AddStaff.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/AddStaff',
      name: 'Staff',
      component: AddStaff
    }
  ]
})
