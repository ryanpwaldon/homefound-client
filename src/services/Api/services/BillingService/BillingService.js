import Api from '@/services/Api/Api'

export default {

  async updateCustomerPaymentMethod (customerId, paymentMethodId) {
    return (await Api().put('/billing/update-customer-payment-method', { customerId, paymentMethodId })).data
  },

  async createSubscription (customerId) {
    return (await Api().post('/billing/subscription', { customerId })).data
  },

  async cancelSubscription (subscriptionId) {
    return (await Api().post('/billing/cancel-subscription', { subscriptionId })).data
  },

  async reactivateSubscription (subscriptionId) {
    return (await Api().post('/billing/reactivate-subscription', { subscriptionId })).data
  }

}
