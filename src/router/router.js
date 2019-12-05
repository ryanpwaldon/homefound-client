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
    path: '/how-it-works',
    name: 'how-it-works',
    component: () => import('@/views/HowItWorks/HowItWorks')
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
    path: '/app',
    name: 'app',
    component: () => import('@/views/App/App'),
    meta: { requiredRole: [ 'buyer', 'seller', 'admin' ] },
    children: [
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
        meta: { requiredRole: [ 'seller', 'admin' ] }
      },
      {
        path: 'my-listings/:id',
        name: 'my-listing',
        component: () => import('@/views/App/views/MyListing/MyListing'),
        meta: { requiredRole: [ 'seller', 'admin' ] },
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
        name: 'account',
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
        meta: { requiredRole: [ 'admin' ] }
      }
    ]
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: () => import('@/views/Unauthorized/Unauthorized')
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

router.beforeEach(async (to, _, next) => {
  if (router.options.firstLoad && store.state.accessToken) {
    await store.dispatch('checkAuthStatus')
    router.options.firstLoad = false
  }
  const authedRoute = to.matched.slice().reverse().find(item => item.meta.requiredRole)
  if (authedRoute) return authedRoute.meta.requiredRole.includes(store.state.user.role) ? next() : next('/unauthorized')
  else return next()
})

export default router
