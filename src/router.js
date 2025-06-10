import { createRouter, createWebHistory } from 'vue-router'
import MainFormAdmin from './components/admin/MainFormAdmin.vue'
import Books from './components/admin/Books.vue'
import Users from './components/admin/Users.vue'
import Branches from './components/admin/Branches.vue'
import Manage from './components/admin/Manage.vue'
import Report from './components/admin/Report.vue'
import ImportBook from './components/admin/manageforms/ImportBook.vue'
import ExportBook from './components/admin/manageforms/ExportBook.vue'
import Login from './components/account/Login.vue'

const routes = [
  { path: '/', component: Login },
  {
    path: '/',
    component: MainFormAdmin,
    children: [
      { path: 'books', component: Books },
      { path: 'users', component: Users },
      { path: 'branches', component: Branches },
      { path: 'manage', component: Manage },
      { path: 'report', component: Report },
      { path: 'manage/import-book', component: () => import('./components/admin/manageforms/ImportBook.vue') },
      { path: 'manage/export-book', component: () => import('./components/admin/manageforms/ExportBook.vue') },
      { path: 'manage/payment-receipt', component: () => import('./components/admin/manageforms/PaymentReceipt.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
