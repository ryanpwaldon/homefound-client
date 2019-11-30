<template>
  <div class="listings">
    <div class="content-container">
      <div class="content">
        <BaseText1 class="title" text="Search" />
        <Filters class="filters" @updated="updateSelectionFilters" />
        <div class="items">
          <BaseListingCardBuyer
            class="listing"
            v-for="listing in listings"
            :price="listing.price"
            :bedrooms="listing.bedrooms"
            :bathrooms="listing.bathrooms"
            :car-spaces="listing.carSpaces"
            :created-at="listing.createdAt"
            :image="listing.images[0]"
            :key="listing._id"
          />
        </div>
        <IntersectionTrigger ref="intersection-trigger" @intersected="getListings" />
      </div>
    </div>
    <div class="map-container">
      <BaseMap>
        <Pin v-for="listing of listings" :key="listing._id" :lng-lat="listing.lngLat"/>
        <GetBounds @updated="updateGeoFilter"/>
      </BaseMap>
    </div>
  </div>
</template>

<script>
import BaseMap from '@/components/BaseMap/BaseMap'
import BaseText1 from '@/components/BaseText1/BaseText1'
import Filters from './components/Filters/Filters'
import BaseListingCardBuyer from '@/components/BaseListingCardBuyer/BaseListingCardBuyer'
import IntersectionTrigger from './components/IntersectionTrigger/IntersectionTrigger'
import ListingService from '@/services/Api/services/ListingService/ListingService'
import Pin from '@/components/BaseMap/components/Pin/Pin'
import GetBounds from '@/components/BaseMap/components/GetBounds/GetBounds'
export default {
  components: {
    BaseText1,
    Filters,
    BaseListingCardBuyer,
    IntersectionTrigger,
    BaseMap,
    GetBounds,
    Pin
  },
  created () {
    // this.getListings()
  },
  data: () => ({
    listings: [],
    filters: {},
    nextPage: 1,
    limit: 9,
    lastPage: null,
    loading: false
  }),
  methods: {
    async getListings () {
      if (this.lastPage && this.nextPage > this.lastPage) return
      this.loading = true
      const { docs: listings, pages } = await ListingService.findMany({
        filters: this.filters,
        options: {
          page: this.nextPage,
          limit: this.limit
        }
      })
      this.listings.push(...listings)
      this.lastPage = pages
      this.nextPage++
      this.loading = false
      this.$refs['intersection-trigger'].observe()
    },
    onFiltersUpdated () {
      this.listings = []
      this.nextPage = 1
      this.lastPage = null
      this.getListings()
    },
    updateSelectionFilters (filters) {
      this.filters = filters
      this.onFiltersUpdated()
    },
    updateGeoFilter (polygon) {
      this.filters.lngLat = {
        $geoWithin: {
          $geometry: {
            type: 'Polygon',
            coordinates: [polygon]
          }
        }
      }
      this.onFiltersUpdated()
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
