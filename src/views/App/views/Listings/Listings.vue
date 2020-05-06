<template>
  <div class="listings">
    <BaseLayoutCenter>
      <BaseText1 class="title" text="Search" />
      <BaseCard class="filters-card">
        <div class="filters-header">
          <BaseText4 class="filters-title" text="Filters"/>
          <BaseText4 class="total" :text="`${total} ${total === 1 ? 'Result' : 'Results'}`" v-if="typeof total === 'number'"/>
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
          <BaseFormSelect
            placeholder="Bedrooms"
            v-model="query.filters.bedrooms"
            :options="[
              { title: '1', value: '1' },
              { title: '2', value: '2' },
              { title: '3', value: '3' },
              { title: '4', value: '4' },
              { title: '5', value: '5' },
              { title: '5+', value: '5+' }
            ]"
          />
        </div>
      </BaseCard>
      <BaseAlert class="agent-alert" v-if="!roles.includes($getRole('BUYER'))">
        <img class="info" src="@/assets/img/info.svg">
        <div>Agents can only view their own listings</div>
      </BaseAlert>
      <div class="listings-container">
        <router-link v-for="listing in listings" :key="listing.id" :to="`/app/listings/${listing.id}`">
          <BaseListingCardBuyer
            class="listing"
            :class="{ hovered: activePointId === listing.id }"
            :listing-id="listing.id"
            :address="listing.fullAddress"
            :price="listing.price"
            :bedrooms="listing.bedrooms"
            :bathrooms="listing.bathrooms"
            :car-spaces="listing.carSpaces"
            :first-published-at="listing.firstPublishedAt"
            :image="listing.images[0]"
            @fly-to="flyTo(listing.lngLat)"
            @mouseenter.native="activePointId = listing.id"
            @mouseleave.native="activePointId = null"
          />
        </router-link>
      </div>
      <BaseLoader class="loader" v-if="loading"/>
      <BaseIntersectionTrigger ref="intersection-trigger" @intersected="updateData"/>
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
      <BaseMap ref="map" :fit-bounds-options="{ padding: 100 }">
        <MapBounds v-model="polygon"/>
        <MapSource source-id="points" :geojson="geojson"/>
        <MapSource source-id="clusters" :geojson="geojson" :cluster="true"/>
        <MapImagePulse
          image-id="pulse-point"
          :circle-radius="5"
          :circle-stroke-width="1"
          :pulse-radius="20"
          fill-color="#ff6464"
          stroke-color="#be5643"
          pulse-color="#ffc8c8"
        />
        <MapLayer
          type="symbol"
          source-id="clusters"
          :filter="['all', ['!', ['has', 'point_count']], ['==', ['get', 'id'], activePointId]]"
          :layout="{ 'icon-image': 'pulse-point', 'icon-allow-overlap': true, 'icon-ignore-placement': true }"
        />
        <MapImagePulse
          image-id="pulse-cluster"
          :circle-radius="15"
          :circle-stroke-width="1"
          :pulse-radius="20"
          fill-color="#ff6464"
          stroke-color="#be5643"
          pulse-color="#ff7979"
        />
        <MapLayer
          type="symbol"
          source-id="clusters"
          :filter="['all', ['has', 'point_count'], ['==', ['get', 'cluster_id'], activeClusterId]]"
          :layout="{ 'icon-image': 'pulse-cluster', 'icon-allow-overlap': true, 'icon-ignore-placement': true }"
        />
        <MapImageCircle
          image-id="circle-point"
          :circle-radius="5"
          :circle-stroke-width="1"
          fill-color="#ff6464"
          stroke-color="#be5643"
        />
        <MapLayer
          type="symbol"
          source-id="clusters"
          :filter="['!', ['has', 'point_count']]"
          :layout="{ 'icon-image': 'circle-point', 'icon-allow-overlap': true }"
        />
        <MapImageCircle
          image-id="circle-cluster"
          :circle-radius="15"
          :circle-stroke-width="1"
          fill-color="#ff6464"
          stroke-color="#be5643"
        />
        <MapLayer
          type="symbol"
          source-id="clusters"
          :filter="['has', 'point_count']"
          :paint="{ 'text-color': '#ffffff' }"
          :layout="{
            'icon-image': 'circle-cluster',
            'icon-allow-overlap': true,
            'text-size': 12,
            'text-field': '{point_count_abbreviated}',
            'text-font': ['SF Pro Text Semibold'],
            'icon-allow-overlap': true
          }"
        />
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
import MapBounds from '@/components/BaseMap/components/MapBounds/MapBounds'
import BaseLoader from '@/components/BaseLoader/BaseLoader'
import MapSource from '@/components/BaseMap/components/MapSource/MapSource'
import MapLayer from '@/components/BaseMap/components/MapLayer/MapLayer'
import MapImagePulse from '@/components/BaseMap/components/MapImagePulse/MapImagePulse'
import MapImageCircle from '@/components/BaseMap/components/MapImageCircle/MapImageCircle'
import BaseMap from '@/components/BaseMap/BaseMap'
import BaseAlert from '@/components/BaseAlert/BaseAlert'
import isEqual from 'lodash/isEqual'
import { mapGetters } from 'vuex'
import { featureCollection, point } from '@turf/helpers'
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
    MapBounds,
    BaseCard,
    BaseMap,
    MapSource,
    MapLayer,
    MapImagePulse,
    MapImageCircle,
    BaseAlert
  },
  created () {
    this.isEqual = isEqual
    const destroy = this.$watch('polygon', () => {
      this.updatePolygonFilter()
      destroy()
    })
  },
  data: () => ({
    activePointId: null,
    geojson: null,
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
        bedrooms: null,
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
        this.total = null
        this.geojson = null
        this.listings = []
        this.nextPage = 1
        this.lastPage = null
        this.updateData()
      }
    }
  },
  computed: mapGetters('user', [ 'roles' ]),
  asyncComputed: {
    async activeClusterId () {
      let activeClusterId = null
      const activePointId = this.activePointId
      if (!(this.$refs['map'] && this.$refs['map'].map)) return null
      const source = this.$refs['map'].map.getSource('clusters')
      const clusters = this.$refs['map'].map.querySourceFeatures('clusters').filter(feature => !!feature.properties.cluster_id)
      await Promise.all(clusters.map(cluster => {
        return new Promise(resolve => {
          source.getClusterLeaves(cluster.properties.cluster_id, cluster.properties.point_count, 0, (error, points) => {
            if (error) console.log(error)
            const match = points && points.find(point => point.properties.id === activePointId)
            if (match) activeClusterId = cluster.properties.cluster_id
            resolve()
          })
        })
      }))
      return activeClusterId
    }
  },
  methods: {
    flyTo (lngLat) {
      this.$refs['map'].flyTo(lngLat)
    },
    async updateGeojson () {
      const { docs: listings } = await ListingService.findAllLngLats({ filters: this.query.filters })
      this.geojson = featureCollection(listings.map(listing => point(listing.lngLat, { id: listing.id })))
    },
    async updateListings () {
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
    },
    async updateData () {
      const reachedLastPage = this.lastPage && this.nextPage > this.lastPage
      if (this.loading || reachedLastPage) return
      this.loading = true
      await this.updateGeojson()
      await this.updateListings()
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
    width: 50% !important;
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
.agent-alert {
  display: flex;
  color: var(--color-gray-4);
  align-items: center;
  margin-bottom: var(--spacing-5);
}
.info {
  height: 1em;
  margin-right: var(--spacing-2);
}
.listings-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-gap: var(--spacing-5);
  margin-bottom: var(--spacing-5);
}
.listing {
  min-width: 0;
  transition: box-shadow var(--transition-settings-1);
}
.listing.hovered {
  box-shadow: var(--box-shadow-5);
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
