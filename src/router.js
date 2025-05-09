import { createRouter, createWebHistory } from 'vue-router'
import SignIn from './components/account/SignIn.vue'
import ForgotPass from './components/account/ForgotPass.vue'
import OTPForm from './components/account/OTPForm.vue'
import ResetPassword from './components/account/ResetPassword.vue'
import SignUp from './components/account/SignUp.vue'

import MainFormAdmin from './components/admin/MainFormAdmin.vue'
import Dashboard from './components/admin/Dashboard.vue'
import Catalog from './components/admin/Catalog.vue'
import Books from './components/admin/Books.vue'
import Users from './components/admin/Users.vue'
import Branches from './components/admin/Branches.vue'
import Manage from './components/admin/Manage.vue'
import ImportBook from './components/admin/manageforms/ImportBook.vue'

const routes = [
  { path: '/', component: SignIn },
  { path: '/forgot-password', component: ForgotPass },
  { path: '/forgot-password/otp-form', component: OTPForm },
  { path: '/forgot-password/reset-password', component: ResetPassword },
  { path: '/sign-up', component: SignUp },

  {
    path: '/',
    component: MainFormAdmin,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'catalog', component: Catalog },
      { path: 'books', component: Books },
      { path: 'users', component: Users },
      { path: 'branches', component: Branches },
      { path: 'manage', component: Manage },
      { path: 'manage/import-book', component: () => import('./components/admin/manageforms/ImportBook.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
