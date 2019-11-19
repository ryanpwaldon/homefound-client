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
    path: '/buyer',
    name: 'buyer',
    component: () => import('@/views/Buyer/Buyer'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'search',
        name: 'search',
        component: () => import('@/views/Seller/Seller')
      },
      {
        path: 'likes',
        name: 'likes',
        component: () => import('@/views/Seller/Seller')
      },
      {
        path: 'alerts',
        name: 'alerts',
        component: () => import('@/views/Seller/Seller')
      }
    ]
  },
  {
    path: '/seller',
    name: 'seller',
    component: () => import('@/views/Seller/Seller'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'listings',
        name: 'listings',
        component: () => import('@/views/Seller/views/Listings/Listings')
      },
      {
        path: 'listings/:id',
        name: 'listing',
        component: () => import('@/views/Seller/views/Listings/views/Listing/Listing'),
        children: [
          {
            path: '',
            redirect: 'create'
          },
          {
            path: 'create',
            name: 'create',
            props: true,
            component: () => import('@/views/Seller/views/Listings/views/Listing/views/Create/Create')
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/seller'
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
