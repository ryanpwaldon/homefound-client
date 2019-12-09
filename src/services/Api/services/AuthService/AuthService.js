import Api from '@/services/Api/Api'

export default {

  async checkAuthStatus () {
    return (await Api().get('/auth/status')).data
  },

  async login (body) {
    return (await Api().post('/auth/login', body)).data
  }

}
