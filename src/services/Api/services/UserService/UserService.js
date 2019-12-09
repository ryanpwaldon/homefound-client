import Api from '@/services/Api/Api'

export default {

  async register (body) {
    return (await Api().post('/user', body)).data
  },

  async getMe () {
    return (await Api().get(`/user/me`)).data
  },

  async verify (code) {
    return (await Api().get(`/user/verification`, { params: { code } })).data
  },

  async sendVerificationEmail () {
    return (await Api().get(`/user/verification/send`)).data
  }

}
