import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/store'
import {
  ALL,
  GUEST,
  ADMIN,
  SELLER,
  BUYER,
  BUYER_INACTIVE,
  BUYER_PENDING_ACTIVATION,
  VERIFICATION_PENDING
} from '@/roles/roles'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/Home')
  },
  {
    path: '/agents',
    name: 'agents',
    component: () => import('@/views/Agents/Agents')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About/About')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/Login'),
    meta: {
      permissions: [
        { roles: [GUEST], access: true },
        { roles: [ALL], redirect: '/app' }
      ]
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register/Register'),
    meta: {
      permissions: [
        { roles: [GUEST], access: true },
        { roles: [ALL], redirect: '/app' }
      ]
    }
  },
  {
    path: '/verify',
    name: 'verify',
    component: () => import('@/views/Verify/Verify'),
    meta: {
      permissions: [
        { roles: [VERIFICATION_PENDING], access: true },
        { roles: [ALL], redirect: '/app' }
      ]
    }
  },
  {
    path: '/activate',
    name: 'activate',
    component: () => import('@/views/Activate/Activate'),
    meta: {
      permissions: [
        { roles: [BUYER_PENDING_ACTIVATION], access: true },
        { roles: [ALL], redirect: '/app' }
      ]
    }
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
    meta: {
      permissions: [
        { roles: [BUYER, BUYER_INACTIVE, SELLER, ADMIN], access: true },
        { roles: [VERIFICATION_PENDING], redirect: '/verify' },
        { roles: [BUYER_PENDING_ACTIVATION], redirect: '/activate' },
        { roles: [ALL], redirect: '/login' }
      ]
    },
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
        meta: {
          permissions: [
            { roles: [SELLER], access: true },
            { roles: [ALL], redirect: '/app' }
          ]
        }
      },
      {
        path: 'my-listings/:id',
        component: () => import('@/views/App/views/MyListing/MyListing'),
        meta: {
          permissions: [
            { roles: [SELLER], access: true },
            { roles: [ALL], redirect: '/app' }
          ]
        },
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
        meta: {
          permissions: [
            { roles: [ADMIN], access: true },
            { roles: [ALL], redirect: '/app' }
          ]
        }
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
  routes
})

router.beforeEach(async (to, _, next) => {
  const routePermissions = (to.matched.slice().reverse().find(item => item.meta.permissions) || { meta: { permissions: [] } }).meta.permissions
  if (!routePermissions.length) return next()
  const userRoles = store.getters['user/roles']
  for (const permission of routePermissions) {
    const match = permission.roles.includes(ALL) || userRoles.some(role => permission.roles.includes(role))
    if (match) return permission.access ? next() : next(permission.redirect)
  }
})

export default router
