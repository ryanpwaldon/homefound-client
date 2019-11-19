import Api from '@/services/Api/Api'

export default {

  async create (body) {
    return (await Api().post('/listing', body)).data
  },

  async findOne (id) {
    return (await Api().get(`/listing/${id}`)).data
  },

  async findCreated () {
    return (await Api().get(`/listing/created`)).data
  },

  async findLiked () {
    return (await Api().get(`/listing/liked`)).data
  }

}
