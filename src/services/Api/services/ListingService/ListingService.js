import Api from '@/services/Api/Api'

export default {

  async create (listingData) {
    return (await Api().post('/listing', listingData)).data
  },

  async update (id, listingData) {
    return (await Api().put(`/listing/${id}`, listingData)).data
  },

  async findOne (id) {
    return (await Api().get(`/listing/${id}`)).data
  },

  async findMany (params) {
    return (await Api().get(`/listing`, { params })).data.docs
  },

  async findCreated () {
    return (await Api().get(`/listing/created`)).data
  },

  async findLiked () {
    return (await Api().get(`/listing/liked`)).data
  },

  async delete (id) {
    return (await Api().delete(`/listing/${id}`)).data
  }

}
