import Vue from 'vue'
import Router from 'vue-router'
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
import AddItem from '../components/items/AddItem.vue'
import UpdateItem from '../components/items/UpdateItem.vue'

import Category from '../views/category/Category.vue'
import AddCategory from '../components/categories/AddCategory.vue'
import UpdateCategory from '../components/categories/UpdateCategory.vue'

import Loan from '../views/loan/Loan.vue'
import OngoingLoans from '../components/loan/ongoingloans/OngoingLoans.vue'
import DueLoans from '../components/loan/dueloans/DueLoans.vue'
import LoanArchive from '../components/loan/loanarchive/LoanArchive.vue'

import Visitor from '../views/visitor/Visitor.vue'
import PurposeOfVisit from '../components/visitors/purposeOfVisit/PurposeOfVisit.vue'
import VisitorDetails from '../components/visitors/visitorDetails/VisitorDetails.vue'
import AddVisitorDetails from '../components/visitors/visitorDetails/AddVisitorDetails.vue'
import UpdateVisitorDetails from '../components/visitors/visitorDetails/UpdateVisitorDetails.vue'
import AddPurposeOfVisit from '../components/visitors/purposeOfVisit/AddPurposeOfVisit.vue'
import UpdatePurposeOfVisit from '../components/visitors/purposeOfVisit/UpdatePurposeOfVisit.vue'

import Training from '../views/training/Training.vue'

Vue.use(Router)

export default new Router({
  saveScrollPosition: true,
  mode: 'history',
  routes: [
    {
      path: '/',
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
        name: 'Staff',
        component: Staff
      },
      {
        path: 'ResidentDeveloper',
        name: 'ResidentDeveloper',
        component: ResidentDeveloper
      },
      {
        path: 'AddStaff',
        name: 'AddStaff',
        component: AddStaff
      },
      {
        path: 'UpdateStaff/:userId',
        name: 'UpdateStaff',
        component: UpdateStaff
      },
      {
        path: 'AddResident',
        name: 'AddResident',
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
      path: '/AddItem',
      name: 'AddItem',
      component: AddItem
    },
    {
      path: '/UpdateItem/:itemParentId',
      name: 'UpdateItem',
      component: UpdateItem
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/AddCategory',
      name: 'AddCategory',
      component: AddCategory
    },
    {
      path: '/UpdateCategory/:userId',
      name: 'UpdateCategory',
      component: UpdateCategory
    },
    {
      path: '/loan',
      name: 'Loan',
      component: Loan,
      children: [{
        path: 'OngoingLoans',
        name: 'OngoingLoans',
        component: OngoingLoans
      },
      {
        path: 'DueLoans',
        name: 'DueLoans',
        component: DueLoans
      },
      {
        path: 'LoanArchive',
        name: 'LoanArchive',
        component: LoanArchive
      }
      ]
    },
    {
      path: '/visitor',
      name: 'Visitor',
      component: Visitor,
      children: [{
        path: 'VisitorDetails',
        name: 'VisitorDetails',
        component: VisitorDetails
      },
      {
        path: 'PurposeOfVisit',
        name: 'PurposeOfVisit',
        component: PurposeOfVisit
      },
      {
        path: 'AddVisitorDetails',
        name: 'AddVisitorDetails',
        component: AddVisitorDetails
      },
      {
        path: 'UpdateVisitorDetails',
        name: 'UpdateVisitorDetails',
        component: UpdateVisitorDetails
      },
      {
        path: 'AddPurposeOfVisit',
        name: 'AddPurposeOfVisit',
        component: AddPurposeOfVisit
      },
      {
        path: 'UpdatePurposeOfVisit',
        name: 'UpdatePurposeOfVisit',
        component: UpdatePurposeOfVisit
      }
      ]
    },
    {
      path: '/training',
      name: 'Training',
      component: Training
    }
  ]
})
