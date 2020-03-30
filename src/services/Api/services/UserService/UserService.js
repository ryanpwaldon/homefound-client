import Api from '@/services/Api/Api'

export default {

  async createBuyer (body) {
    return (await Api().post('/user/buyer', body)).data
  },

  async createSeller (body) {
    return (await Api().post('/user/seller', body)).data
  },

  async findPendingSellerRegistrations () {
    return (await Api().get('/user/seller/registration/pending')).data
  },

  async updateSellerRegistrationStatus ({ userId, status }) {
    return (await Api().put('/user/seller/registration/status', { userId, status })).data
  },

  async findSavedListings () {
    return (await Api().get(`/user/listings/saved`)).data
  },

  async addToSavedListings (listingId) {
    return (await Api().put(`/user/listings/saved/add`, { listingId })).data
  },

  async removeFromSavedListings (listingId) {
    return (await Api().put(`/user/listings/saved/remove`, { listingId })).data
  },

  async createSubscription (pricingPlan) {
    return (await Api().put(`/user/subscription`, { pricingPlan })).data
  },

  async cancelSubscription () {
    return (await Api().put(`/user/subscription/cancel`)).data
  },

  async reactivateSubscription () {
    return (await Api().put(`/user/subscription/reactivate`)).data
  },

  async updateDefaultPaymentMethod (paymentMethodId) {
    return (await Api().put('/user/default-payment-method', { paymentMethodId })).data
  },

  async verify (code) {
    return (await Api().get(`/user/verification/verify`, { params: { code } })).data
  },

  async sendVerificationInstructions () {
    return (await Api().get(`/user/verification/instructions`)).data
  },

  async sendPasswordResetInstructions (email) {
    return (await Api().get(`/user/password/instructions`, { params: { email } })).data
  },

  async passwordReset (token, password) {
    return (await Api().post(`/user/password/reset`, { token, password })).data
  }

}
