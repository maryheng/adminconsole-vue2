import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import Login from '../views/auth/Login.vue'

import User from '../views/user/User.vue'
import Staff from '../components/users/staff/Staff.vue'
import ResidentDeveloper from '../components/users/rd/ResidentDeveloper.vue'
import AddStaff from '../components/users/staff/AddStaff.vue'
import AddResident from '../components/users/rd/AddResident.vue'
import UpdateStaff from '../components/users/staff/UpdateStaff.vue'
import UpdateResident from '../components/users/rd/UpdateResident.vue'

import Item from '../views/item/Item.vue'

import Category from '../views/category/Category.vue'
import AddCategory from '../components/categories/AddCategory.vue'
import UpdateCategory from '../components/categories/UpdateCategory.vue'

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
      component: Login,
      meta: { requiresAuth: false }
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
        path: 'UpdateStaff/:userId',
        name: 'UpdateStaff',
        component: UpdateStaff
      },
      {
        path: 'AddResident',
        component: AddResident
      },
      {
        path: 'UpdateResident/:userId',
        name: 'UpdateResident',
        component: UpdateResident
      }
      ]
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
      path: '/AddCategory',
      component: AddCategory
    },
    {
      path: '/UpdateCategory',
      component: UpdateCategory
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
