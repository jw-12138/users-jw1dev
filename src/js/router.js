import * as VueRouter from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/App.vue')
  },
  {
    path: '/sign-in',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/sign-up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/confirm-sign-up',
    component: () => import('../views/ConfirmSignUp.vue')
  },
  {
    path: '/change-password',
    component: () => import('../views/ChangePassword.vue')
  },
  {
    path: '/new-password',
    component: () => import('../views/NewPassword.vue')
  },
  {
    path: '/verify-email',
    component: () => import('../views/VerifyEmail.vue')
  }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
})

export {
  router
}