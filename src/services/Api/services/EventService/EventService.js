import Api from '@/services/Api/Api'

export default {

  async create (event) {
    return (await Api().post('/event', event)).data
  }

}
