import Api from '@/services/Api/Api'

export default {

  async register (body) {
    return (await Api().post('/user', body)).data
  },

  async getMe () {
    return (await Api().get(`/user/me`)).data
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
