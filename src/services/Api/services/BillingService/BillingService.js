import Vue from 'vue'
import Api from '@/services/Api/Api'
import store from '@/store/store'

const stripe = window.Stripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY)

export default {

  async updateCustomerPaymentMethod (paymentMethodId) {
    return Api().put('/billing/update-customer-payment-method', { customerId: store.state.user.user.customerId, paymentMethodId })
  },

  async createSubscription () {
    return Api().post('/billing/subscription', { customerId: store.state.user.user.customerId })
  },

  async redirectToCheckout () {
    const sessionId = await (await Api().post('/billing/checkout/create-session-id', { customerId: store.state.user.user.customerId })).data.id
    const result = await stripe.redirectToCheckout({ sessionId })
    if (result.error.message) Vue.notify({ text: `${result.error.message}`, type: 'error' })
  }

}
