import Api from '@/services/Api/Api'

export default {

  async trackContactDetailView (listingId) {
    return (await Api().put(`/listing-performance/${listingId}/track-contact-detail-view`)).data
  },

  async findTimeseriesByListingId ({ listingId, properties, range, period, endDate }) {
    return (await Api().get(`/listing-performance/${listingId}/timeseries`, { params: { properties, range, period, endDate } })).data
  }

}
