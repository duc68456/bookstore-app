// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import SignIn from './components/SignIn.vue'
import ForgotPass from './components/ForgotPass.vue'
import OTPForm from './components/OTPForm.vue'
import ResetPassword from './components/ResetPassword.vue'

const routes = [
  { path: '/', component: SignIn },
  { path: '/forgot-password', component: ForgotPass },
  { path: '/forgot-password/otp-form', component: OTPForm },
  { path: '/forgot-password/reset-password', component: ResetPassword }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
