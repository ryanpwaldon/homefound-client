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
        component: () => import('@/views/App/views/MyListings/MyListings')
      },
      {
        path: 'my-listings/:id',
        name: 'my-listing',
        component: () => import('@/views/App/views/MyListing/MyListing'),
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
        component: () => import('@/views/App/views/Account/Account')
      }
    ]
  },
  {
    path: '*',
    redirect: '/app/listings'
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
  const requiresAuth = !!to.matched.find(item => item.meta.requiresAuth)
  if (requiresAuth) return store.state.accessToken ? next() : next('/')
  else return next()
})

export default router
