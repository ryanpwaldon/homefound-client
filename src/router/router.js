import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/Home')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About/About')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register/Register')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/Login')
  },
  {
    path: '/verify',
    name: 'verify',
    component: () => import('@/views/Verify/Verify')
  },
  {
    path: '/password/instructions',
    name: 'password-instructions',
    component: () => import('@/views/Password/views/Instructions/Instructions')
  },
  {
    path: '/password/reset',
    name: 'password-reset',
    component: () => import('@/views/Password/views/Reset/Reset'),
    props: route => ({ token: route.query.token })
  },
  {
    path: '/app',
    component: () => import('@/views/App/App'),
    meta: { auth: true },
    children: [
      {
        path: '',
        redirect: 'listings'
      },
      {
        path: 'listings',
        name: 'listings',
        component: () => import('@/views/App/views/Listings/Listings')
      },
      {
        path: 'listings/:id',
        name: 'listing',
        component: () => import('@/views/App/views/Listing/Listing'),
        props: true
      },
      {
        path: 'likes',
        name: 'likes',
        component: () => import('@/views/App/views/Likes/Likes')
      },
      {
        path: 'alerts',
        name: 'alerts',
        component: () => import('@/views/App/views/Alerts/Alerts')
      },
      {
        path: 'my-listings',
        name: 'my-listings',
        component: () => import('@/views/App/views/MyListings/MyListings'),
        meta: { roles: [ 'seller', 'admin' ] }
      },
      {
        path: 'my-listings/:id',
        component: () => import('@/views/App/views/MyListing/MyListing'),
        meta: { roles: [ 'seller', 'admin' ] },
        children: [
          {
            path: '',
            redirect: 'create'
          },
          {
            path: 'create',
            name: 'create',
            props: true,
            component: () => import('@/views/App/views/MyListing/views/Create/Create')
          },
          {
            path: 'performance',
            name: 'performance',
            props: true,
            component: () => import('@/views/App/views/MyListing/views/Performance/Performance')
          },
          {
            path: 'settings',
            name: 'settings',
            props: true,
            component: () => import('@/views/App/views/MyListing/views/Settings/Settings')
          }
        ]
      },
      {
        path: 'account',
        component: () => import('@/views/App/views/Account/Account'),
        children: [
          {
            path: '',
            redirect: 'overview'
          },
          {
            path: 'overview',
            name: 'overview',
            component: () => import('@/views/App/views/Account/views/Overview/Overview')
          },
          {
            path: 'billing',
            name: 'billing',
            component: () => import('@/views/App/views/Account/views/Billing/Billing')
          }
        ]
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/App/views/Admin/Admin'),
        meta: { roles: [ 'admin' ] }
      }
    ]
  },
  {
    path: '/unauthorised',
    name: 'unauthorised',
    component: () => import('@/views/Unauthorised/Unauthorised')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  firstLoad: true,
  routes
})

const userHasToken = () => store.state.user.accessToken
const userIsActive = () => store.state.user.user && store.state.user.user.active
const userHasRole = roles => !roles.length || store.state.user.user.roles.some(role => roles.includes(role))

router.beforeEach(async (to, _, next) => {
  if (router.options.firstLoad && userHasToken()) {
    await store.dispatch('user/checkAuthStatus')
    router.options.firstLoad = false
  }
  const routeThatRequiresRoles = to.matched.slice().reverse().find(item => item.meta.roles)
  const requiredRoles = (routeThatRequiresRoles && routeThatRequiresRoles.meta.roles) || []
  const requiresAuth = !!to.matched.slice().reverse().find(item => item.meta.auth) || !!requiredRoles.length
  if (requiresAuth) {
    if (!userHasToken()) return next('/unauthorised')
    if (userHasToken() && !userIsActive()) return next('/verify')
    if (userHasToken() && userIsActive() && userHasRole(requiredRoles)) return next()
  } else return next()
})

export default router
