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

  async findSaved () {
    return (await Api().get(`/listing/saved`)).data
  },

  async findTimeseries (id, eventName, range, period) {
    return (await Api().get(`/listing/${id}/timeseries`, { params: { eventName, range, period } })).data
  },

  async findAllDispersedLngLats () {
    return (await Api().get(`/listing/lng-lat/dispersed`)).data
  },

  async findAllLngLats ({ filters }) {
    return (await Api().get(`/listing/lng-lat`, { params: { filters } })).data
  },

  async delete (id) {
    return (await Api().delete(`/listing/${id}`)).data
  }

}
