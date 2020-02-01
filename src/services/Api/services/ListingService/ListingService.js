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

  async findMany ({ filters, options }) {
    return (await Api().get(`/listing`, { params: { filters, options } })).data
  },

  async findCreated ({ filters, options }) {
    return (await Api().get(`/listing/created`, { params: { filters, options } })).data
  },

  async findLiked () {
    return (await Api().get(`/listing/liked`)).data
  },

  async findTimeseries (id, eventName, range, period) {
    return (await Api().get(`/listing/${id}/timeseries`, { params: { eventName, range, period } })).data
  },

  async delete (id) {
    return (await Api().delete(`/listing/${id}`)).data
  }

}
