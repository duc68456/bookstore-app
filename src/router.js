// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import SignIn from './components/SignIn.vue'
import ForgotPass from './components/ForgotPass.vue'

const routes = [
  { path: '/', component: SignIn },
  { path: '/forgot-password', component: ForgotPass }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
