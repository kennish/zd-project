import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '@/views/Home'
import Login from '@/views/Login'
import Income from '@/views/income'
import Repayment from '@/views/Repayment'
import BillingDetails from '@/views/BillingDetails'
import Personal from '@/views/Personal'
import Message from '@/views/message'
import MsgDetail from '@/views/MsgDetail'
import Author from '@/views/Author'

const router = new Router({
  linkActiveClass: 'active',
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Author',
      component: Author
    },
    {
      path: '/home',
      component: Home,
      meta: { login: true },
      children: [
        { path: '', name: 'Home', component: Income },
        { path: '/repayment', name: 'Repayment', component: Repayment }
      ]
    },
    {
      path: '/billingDetails',
      name: 'BillingDetails',
      component: BillingDetails,
      meta: { login: true }
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal,
      meta: { login: true }
    },
    {
      path: '/message',
      name: 'Message',
      component: Message,
      meta: { login: true }
    },
    {
      path: '/message/:id',
      name: 'MsgDetail',
      component: MsgDetail,
      meta: { login: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})

export default router

// router.beforeEach(function (to, from, next) {
//   if (to.matched.some((item) => item.meta.login)) {  // 匹配到需要登录才能进入
//     let user = router.app.$local.fetch('user')
//     if (user) { // 如果有表示已登录
//       next()
//     } else {
//       router.push({
//         path: '/author',
//         query: {
//           //redirect: to.path.slice(1)
//         }
//       })
//     }
//   } else {
//     next()
//   }
// })

/* router.afterEach((to, from) => {
  if (to.meta.title) {
    window.document.title = to.meta.title
  } else {
    window.document.title = '账单管理'
  }
}) */
