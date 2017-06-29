import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import Login from '../views/auth/Login.vue'
import User from '../views/user/User.vue'
import Staff from '../components/users/Staff.vue'
import ResidentDeveloper from '../components/users/ResidentDeveloper.vue'
import AddStaff from '../components/users/AddStaff.vue'
import AddResident from '../components/users/AddResident.vue'
import Item from '../views/item/Item.vue'
import Category from '../views/category/Category.vue'
import Loan from '../views/loan/Loan.vue'
import Visitor from '../views/visitor/Visitor.vue'
import Training from '../views/training/Training.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'App',
      component: App
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      children: [{
        path: 'Staff',
        component: Staff
      },
      {
        path: 'ResidentDeveloper',
        component: ResidentDeveloper
      },
      {
        path: 'AddStaff',
        component: AddStaff
      },
      {
        path: 'AddResident',
        component: AddResident
      }
      ]
    },
    {
      path: '/AddStaff',
      name: 'Staff',
      component: AddStaff
    },
    {
      path: '/AddResident',
      name: 'Resident',
      component: AddResident
    },
    {
      path: '/item',
      name: 'Item',
      component: Item
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/loan',
      name: 'Loan',
      component: Loan
    },
    {
      path: '/visitor',
      name: 'Visitor',
      component: Visitor
    },
    {
      path: '/training',
      name: 'Training',
      component: Training
    }
  ]
})
