// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import SignIn from './components/account/SignIn.vue'
import ForgotPass from './components/account/ForgotPass.vue'
import OTPForm from './components/account/OTPForm.vue'
import ResetPassword from './components/account/ResetPassword.vue'
import SignUp from './components/account/SignUp.vue'
import Dashboard from './components/admin/Dashboard.vue'

const routes = [
  { path: '/', component: SignIn },
  { path: '/forgot-password', component: ForgotPass },
  { path: '/forgot-password/otp-form', component: OTPForm },
  { path: '/forgot-password/reset-password', component: ResetPassword },
  { path: '/sign-up', component: SignUp },
  { path: '/dash-board', component: Dashboard },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
