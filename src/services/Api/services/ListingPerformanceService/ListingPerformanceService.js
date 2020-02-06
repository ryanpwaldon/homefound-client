import Api from '@/services/Api/Api'

export default {

  async findOneByListingId (listingId) {
    return (await Api().get(`/listing-performance/${listingId}`)).data
  },

  async trackContactDetailView (listingId) {
    return (await Api().put(`/listing-performance/${listingId}/track-contact-detail-view`)).data
  },

  async findTimeseriesByListingId ({ listingId, property, range, period }) {
    return (await Api().get(`/listing-performance/${listingId}/timeseries`, { params: { property, range, period } })).data
  }

}
