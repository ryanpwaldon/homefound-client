import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/store'
import { getRole } from '@/constants/roles/roles'

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
    path: '/explore',
    name: 'explore',
    component: () => import('@/views/Explore/Explore')
  },
  {
    path: '/pricing',
    component: () => import('@/views/Pricing/Pricing'),
    children: [
      {
        path: '',
        redirect: 'buyer'
      },
      {
        path: 'buyer',
        name: 'pricing-buyer',
        component: () => import('@/views/Pricing/views/Buyer/Buyer')
      },
      {
        path: 'agent',
        name: 'pricing-agent',
        component: () => import('@/views/Pricing/views/Agent/Agent')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/Login'),
    meta: {
      permissions: [
        { roles: [getRole('GUEST')], access: true },
        { roles: [getRole('ALL')], redirect: '/app' }
      ]
    }
  },
  {
    path: '/signup',
    component: () => import('@/views/Signup/Signup'),
    meta: {
      permissions: [
        { roles: [getRole('GUEST'), getRole('BUYER_INITIAL_PAYMENT_FAILED')], access: true },
        { roles: [getRole('ALL')], redirect: '/app' }
      ]
    },
    children: [
      {
        path: '',
        redirect: 'buyer'
      },
      {
        path: 'buyer',
        name: 'signup-buyer',
        component: () => import('@/views/Signup/views/Buyer/Buyer')
      },
      {
        path: 'agent',
        name: 'signup-agent',
        component: () => import('@/views/Signup/views/Agent/Agent')
      }
    ]
  },
  {
    path: '/verify/email',
    name: 'verify-email',
    component: () => import('@/views/Verify/views/Email/Email'),
    meta: {
      permissions: [
        { roles: [getRole('EMAIL_VERIFICATION_PENDING')], access: true },
        { roles: [getRole('ALL')], redirect: '/app' }
      ]
    }
  },
  {
    path: '/verify/agent',
    name: 'verify-agent',
    component: () => import('@/views/Verify/views/Agent/Agent'),
    meta: {
      permissions: [
        { roles: [getRole('SELLER_REGISTRATION_PENDING')], access: true },
        { roles: [getRole('ALL')], redirect: '/app' }
      ]
    }
  },
  {
    path: '/unavailable',
    name: 'unavailable',
    component: () => import('@/views/Unavailable/Unavailable'),
    meta: {
      permissions: [
        { roles: [getRole('SELLER_LOCATION_UNAVAILABLE')], access: true },
        { roles: [getRole('ALL')], redirect: '/app' }
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
        { roles: [getRole('SELLER_LOCATION_UNAVAILABLE')], redirect: '/unavailable' },
        { roles: [getRole('BUYER_INITIAL_PAYMENT_FAILED')], redirect: '/signup/buyer' },
        { roles: [getRole('EMAIL_VERIFICATION_PENDING')], redirect: '/verify/email' },
        { roles: [getRole('SELLER_REGISTRATION_PENDING')], redirect: '/verify/agent' },
        { roles: [getRole('BUYER'), getRole('BUYER_SUBSCRIPTION_DELETED'), getRole('SELLER'), getRole('ADMIN')], access: true },
        { roles: [getRole('ALL')], redirect: '/login' }
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
        path: 'saved',
        name: 'saved',
        component: () => import('@/views/App/views/Saved/Saved')
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
            { roles: [getRole('SELLER')], access: true },
            { roles: [getRole('ALL')], redirect: '/app' }
          ]
        }
      },
      {
        path: 'my-listings/:id',
        component: () => import('@/views/App/views/MyListing/MyListing'),
        meta: {
          permissions: [
            { roles: [getRole('SELLER')], access: true },
            { roles: [getRole('ALL')], redirect: '/app' }
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
          },
          {
            path: 'notifications',
            name: 'notifications',
            component: () => import('@/views/App/views/Account/views/Notifications/Notifications')
          }
        ]
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/App/views/Admin/Admin'),
        meta: {
          permissions: [
            { roles: [getRole('ADMIN')], access: true },
            { roles: [getRole('ALL')], redirect: '/app' }
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
    path: '/privacy',
    name: 'privacy',
    component: () => import('@/views/Privacy/Privacy')
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('@/views/Terms/Terms')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ x: 0, y: 0 })
})

router.beforeEach(async (to, _, next) => {
  const routePermissions = (to.matched.slice().reverse().find(item => item.meta.permissions) || { meta: { permissions: [] } }).meta.permissions
  if (!routePermissions.length) return next()
  const userRoles = store.getters['user/roles']
  for (const permission of routePermissions) {
    const match = permission.roles.includes(getRole('ALL')) || userRoles.some(role => permission.roles.includes(role))
    if (match) return permission.access ? next() : next(permission.redirect)
  }
})

router.afterEach(() => {
  setTimeout(Vue.prototype.$segment.page, 5)
})

export default router
