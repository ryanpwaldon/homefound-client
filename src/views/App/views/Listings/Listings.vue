<template>
  <div class="listings">
    <BaseLayoutCenter>
      <BaseText1 class="title" text="Search" />
      <BaseCard class="filters-card">
        <div class="filters-header">
          <BaseText4 class="filters-title" text="Filters"/>
          <BaseText4 class="total" :text="`${total} Result${total > 1 ? 's' : ''}`" v-if="total"/>
        </div>
        <div class="filters-container">
          <BaseFormSelect
            placeholder="Market status"
            v-model="query.filters.marketStatus"
            :options="[
              {title: 'Off-market', value: 'OFF'},
              {title: 'On-market', value: 'ON'}
            ]"
          />
          <BaseFormSelect
            placeholder="Sort by"
            v-model="query.sort"
            :options="[
              { title: 'Recently added', value: 'recentlyAdded' },
              { title: 'Oldest added', value: 'oldestAdded' },
              { title: 'Lowest price', value: 'lowestPrice' },
              { title: 'Highest price', value: 'highestPrice' },
            ]"
          />
        </div>
      </BaseCard>
      <div class="listings-container">
        <router-link v-for="listing in listings" :key="listing._id" :to="`/app/listings/${listing._id}`">
          <BaseListingCardBuyer
            class="listing"
            :listing-id="listing._id"
            :address="listing.fullAddress"
            :price="listing.price"
            :bedrooms="listing.bedrooms"
            :bathrooms="listing.bathrooms"
            :car-spaces="listing.carSpaces"
            :first-published-at="listing.firstPublishedAt"
            :image="listing.images[0]"
          />
        </router-link>
      </div>
      <BaseLoader class="loader" v-if="loading"/>
      <BaseIntersectionTrigger ref="intersection-trigger" @intersected="updateListings" />
    </BaseLayoutCenter>
    <div class="map-container">
      <div class="map-button">
        <transition name="fall">
          <BaseButtonRounded
            text="Update search area"
            @click.native="updatePolygonFilter"
             v-if="!loading && !isEqual(polygon, query.filters.lngLat.$geoWithin.$geometry.coordinates)"
          />
        </transition>
      </div>
      <BaseMap>
        <Markers :lng-lats="lngLats"/>
        <GetBounds ref="get-bounds" v-model="polygon"/>
      </BaseMap>
    </div>
  </div>
</template>

<script>
import BaseLayoutCenter from '@/components/BaseLayoutCenter/BaseLayoutCenter'
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseFormSelect from '@/components/BaseFormSelect/BaseFormSelect'
import ListingService from '@/services/Api/services/ListingService/ListingService'
import BaseListingCardBuyer from '@/components/BaseListingCardBuyer/BaseListingCardBuyer'
import BaseIntersectionTrigger from '@/components/BaseIntersectionTrigger/BaseIntersectionTrigger'
import BaseButtonRounded from '@/components/BaseButtonRounded/BaseButtonRounded'
import BaseCard from '@/components/BaseCard/BaseCard'
import GetBounds from '@/components/BaseMap/components/GetBounds/GetBounds'
import BaseLoader from '@/components/BaseLoader/BaseLoader'
import Markers from '@/components/BaseMap/components/Markers/Markers'
import BaseMap from '@/components/BaseMap/BaseMap'
import isEqual from 'lodash/isEqual'
const sortOptions = {
  recentlyAdded: { firstPublishedAt: -1 },
  oldestAdded: { firstPublishedAt: 1 },
  lowestPrice: { price: 1 },
  highestPrice: { price: -1 }
}
export default {
  name: 'listings',
  components: {
    BaseLayoutCenter,
    BaseText1,
    BaseText4,
    BaseFormSelect,
    BaseListingCardBuyer,
    BaseIntersectionTrigger,
    BaseButtonRounded,
    BaseLoader,
    GetBounds,
    BaseCard,
    BaseMap,
    Markers
  },
  created () {
    this.updatePoints()
    const destroy = this.$watch('polygon', () => {
      this.updatePolygonFilter()
      destroy()
    })
  },
  data: () => ({
    lngLats: [],
    listings: [],
    nextPage: 1,
    limit: 9,
    lastPage: null,
    loading: false,
    polygon: null,
    total: null,
    query: {
      sort: 'recentlyAdded',
      filters: {
        marketStatus: 'OFF',
        lngLat: {
          $geoWithin: {
            $geometry: {
              type: 'Polygon',
              coordinates: null
            }
          }
        }
      }
    }
  }),
  watch: {
    query: {
      deep: true,
      handler () {
        this.listings = []
        this.nextPage = 1
        this.lastPage = null
        this.updateListings()
      }
    }
  },
  methods: {
    isEqual,
    async updatePoints () {
      this.lngLats = (await ListingService.findAllLngLats()).map(listing => listing.lngLat)
    },
    async updateListings () {
      const reachedLastPage = this.lastPage && this.nextPage > this.lastPage
      if (this.loading || reachedLastPage) return
      this.loading = true
      const { docs: listings, pages, total } = await ListingService.findMany({
        filters: this.query.filters,
        options: {
          page: this.nextPage,
          limit: this.limit,
          sort: sortOptions[this.query.sort]
        }
      })
      this.listings.push(...listings)
      this.lastPage = pages
      this.total = total
      this.nextPage++
      this.loading = false
      this.$refs['intersection-trigger'] && this.$refs['intersection-trigger'].observe()
    },
    updatePolygonFilter () {
      this.query.filters.lngLat.$geoWithin.$geometry.coordinates = this.polygon
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
.title {
  margin-bottom: var(--spacing-5);
}
.filters-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: var(--spacing-3) var(--spacing-5);
  border-bottom: solid 1px var(--color-gray-1);
  background: var(--color-gray-9);
  border-radius: 2px 2px 0 0;
}
.total {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -2px;
    left: 0;
    background: var(--color-black-2);
  }
}
.filters-card {
  padding: 0;
  margin-bottom: var(--spacing-5);
  flex-shrink: 0;
}
.filters-container {
  display: flex;
  flex-wrap: wrap;
  padding: var(--spacing-5);
  margin-bottom: calc(-1 * var(--spacing-2));
  > * {
    margin-right: var(--spacing-2);
    margin-bottom: var(--spacing-2);
  }
}
.listings-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-gap: var(--spacing-5);
  margin-bottom: var(--spacing-5);
}
.listing {
  min-width: 0;
}
.map-container {
  position: relative;
  border-left: var(--color-gray-1) solid 1px;
}
.map-button {
  position: absolute;
  transform: translateX(-50%);
  top: var(--spacing-4);
  left: 50%;
  z-index: 1;
}
.loader {
  width: 100%;
  height: 100%;
}
</style>
