<template>
  <div class="listings">
    <LayoutCenter>
      <BaseText1 class="title" text="Search" />
      <div class="filters-card">
        <BaseText4 class="filters-title" text="Filters"/>
        <div class="filters-container">
          <BaseFormSelect
            placeholder="Bedrooms"
            v-model="filters.bedrooms"
            :options="[
              {title: '0', value: '0'},
              {title: '1', value: '1'},
              {title: '2', value: '2'},
              {title: '3', value: '3'},
              {title: '4', value: '4'},
              {title: '5+', value: '5+'}
            ]"
          />
          <BaseFormSelect
            placeholder="Bathrooms"
            v-model="filters.bathrooms"
            :options="[
              {title: '0', value: '0'},
              {title: '1', value: '1'},
              {title: '2', value: '2'},
              {title: '3', value: '3'},
              {title: '4', value: '4'},
              {title: '5+', value: '5+'}
            ]"
          />
          <BaseFormSelect
            placeholder="Car spaces"
            v-model="filters.carSpaces"
            :options="[
              {title: '0', value: '0'},
              {title: '1', value: '1'},
              {title: '2', value: '2'},
              {title: '3', value: '3'},
              {title: '4', value: '4'},
              {title: '5+', value: '5+'}
            ]"
          />
          <BaseFormSelect
            placeholder="Property type"
            v-model="filters.propertyType"
            :options="[
              {title: 'House', value: 'house'},
              {title: 'Unit', value: 'unit'}
            ]"
          />
        </div>
      </div>
      <div class="listings-container">
        <router-link v-for="listing in listings" :key="listing._id" :to="`/app/listings/${listing._id}`">
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
        <BaseLoader class="loader" v-if="loading"/>
      </div>
      <BaseIntersectionTrigger ref="intersection-trigger" @intersected="getListings" />
    </LayoutCenter>
    <div class="map-container">
      <div class="map-button">
        <transition name="fall">
          <BaseButtonRounded
            text="Update search area"
            @click.native="updatePolygonFilter"
             v-if="listings.length && polygon !== filters.lngLat.$geoWithin.$geometry.coordinates"
          />
        </transition>
      </div>
      <BaseMap>
        <Pin v-for="listing of listings" :key="listing._id" :lng-lat="listing.lngLat"/>
        <GetBounds ref="get-bounds" v-model="polygon"/>
      </BaseMap>
    </div>
  </div>
</template>

<script>
import LayoutCenter from '@/layouts/LayoutCenter/LayoutCenter'
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseFormSelect from '@/components/BaseFormSelect/BaseFormSelect'
import ListingService from '@/services/Api/services/ListingService/ListingService'
import BaseListingCardBuyer from '@/components/BaseListingCardBuyer/BaseListingCardBuyer'
import BaseIntersectionTrigger from '@/components/BaseIntersectionTrigger/BaseIntersectionTrigger'
import BaseButtonRounded from '@/components/BaseButtonRounded/BaseButtonRounded'
import GetBounds from '@/components/BaseMap/components/GetBounds/GetBounds'
import BaseLoader from '@/components/BaseLoader/BaseLoader'
import Pin from '@/components/BaseMap/components/Pin/Pin'
import BaseMap from '@/components/BaseMap/BaseMap'
export default {
  components: {
    LayoutCenter,
    BaseText1,
    BaseText4,
    BaseFormSelect,
    BaseListingCardBuyer,
    BaseIntersectionTrigger,
    BaseButtonRounded,
    BaseLoader,
    GetBounds,
    BaseMap,
    Pin
  },
  async mounted () {
    const destroy = this.$watch('polygon', () => {
      this.updatePolygonFilter()
      destroy()
    })
  },
  data: () => ({
    listings: [],
    nextPage: 1,
    limit: 9,
    lastPage: null,
    loading: false,
    polygon: null,
    filters: {
      lngLat: {
        $geoWithin: {
          $geometry: {
            type: 'Polygon',
            coordinates: null
          }
        }
      }
    }
  }),
  watch: {
    filters: {
      deep: true,
      handler () {
        this.listings = []
        this.nextPage = 1
        this.lastPage = null
        this.getListings()
      }
    }
  },
  methods: {
    async getListings () {
      const reachedLastPage = this.lastPage && this.nextPage > this.lastPage
      if (this.loading || reachedLastPage) return
      this.loading = true
      const { docs: listings, pages } = await ListingService.findMany({
        filters: this.filters,
        options: {
          page: this.nextPage,
          limit: this.limit,
          sort: { createdAt: -1 }
        }
      })
      this.listings.push(...listings)
      this.lastPage = pages
      this.nextPage++
      this.loading = false
      this.$refs['intersection-trigger'] && this.$refs['intersection-trigger'].observe()
    },
    updatePolygonFilter () {
      this.filters.lngLat.$geoWithin.$geometry.coordinates = this.polygon
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
.filters-card {
  width: 100%;
  padding: var(--spacing-5);
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow-1);
  background: var(--color-white-1);
  margin-bottom: var(--spacing-5);
}
.filters-title {
  margin-bottom: var(--spacing-4);
}
.filters-container {
  display: flex;
  flex-wrap: wrap;
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
.listing,
.loader {
  height: 200px;
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
</style>
