import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/', // when the url is http://localhost:8080/#/
    name: 'Home',
    component: loadPage('HomePage') // vue loads this component into the RouterView
  },
  {
    path: '/about', // when the url is http://localhost:8080/#/about
    name: 'About',
    component: loadPage('AboutPage') // vue loads this component into the RouterView
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
