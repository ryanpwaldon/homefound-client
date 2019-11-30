<template>
  <div class="listings">
    <div class="content-container">
      <div class="content">
        <BaseText1 class="title" text="Search"/>
        <BaseFilters class="filters" @updated="onUpdateFilters"/>
        <div class="items">
          <router-link
            v-for="listing in listings"
            :to="`/buyer/listings/${listing._id}`"
            :key="listing._id">
            <BaseListingCardBuyer
              class="listing"
              :price="listing.price"
              :bedrooms="listing.bedrooms"
              :bathrooms="listing.bathrooms"
              :car-spaces="listing.carSpaces"
              :created-at="listing.createdAt"
              :image="listing.images[0]"
            />
          </router-link>
        </div>
        <BaseEndlessScroll
          text-trigger="Loading..."
          text-done="You've reached the end"
          :done="total <= page * limit"
          @intersected="getNextPage"
          v-if="listings.length"
        />
      </div>
    </div>
    <div class="map-container">
      <BaseMap>
        <Pin v-for="listing of listings" :key="listing._id" :lng-lat="listing.lngLat"/>
      </BaseMap>
    </div>
  </div>
</template>

<script>
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseFilters from './components/BaseFilters/BaseFilters'
import BaseListingCardBuyer from '@/components/BaseListingCardBuyer/BaseListingCardBuyer'
import ListingService from '@/services/Api/services/ListingService/ListingService'
import BaseEndlessScroll from '@/components/BaseEndlessScroll/BaseEndlessScroll'
import Pin from '@/components/BaseMap/components/Pin/Pin'
import BaseMap from '@/components/BaseMap/BaseMap'
export default {
  name: 'listings',
  components: {
    BaseText1,
    BaseFilters,
    BaseListingCardBuyer,
    BaseEndlessScroll,
    BaseMap,
    Pin
  },
  data: () => ({
    listings: [],
    filters: null,
    total: 0,
    limit: 12,
    page: 1
  }),
  methods: {
    async getNewResults () {
      this.page = 1
      const response = await this.fetchListings()
      this.total = response.total
      this.listings = response.docs
    },
    async getNextPage () {
      this.page++
      const response = await this.fetchListings()
      this.listings = [...this.listings, ...response.docs]
    },
    onUpdateFilters (filters) {
      this.filters = filters
      this.getNewResults()
    },
    fetchListings () {
      return ListingService.findMany({
        filters: this.filters,
        options: { page: this.page, limit: this.limit }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.listings {
  width: 100%;
  height: 100%;
  display: flex;
  > * {
    width: 50%;
    flex-shrink: 0;
  }
}
.content-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  background: var(--color-gray-2);
  overflow: auto;
}
.content {
  width: 100%;
  max-width: 600px;
  margin: var(--spacing-5);
}
.title {
  margin-bottom: var(--spacing-5);
}
.filters {
  margin-bottom: var(--spacing-5);
}
.items {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: var(--spacing-5);
  margin-bottom: var(--spacing-5);
}
.listing {
  height: 200px;
  min-width: 0;
}
.map-container {
  border-left: var(--color-gray-1) solid 1px;
}
</style>
