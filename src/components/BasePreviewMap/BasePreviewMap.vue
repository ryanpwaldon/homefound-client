<template>
  <BaseMap
    :max-zoom="17"
    :scroll-zoom="true"
    :center="[151.2093, -33.8688]"
    :zoom="10"
  >
    <MapSource source-id="clusters" :geojson="geojson" :cluster="true"/>
    <MapImagePulse
      image-id="pulse"
      :circle-radius="15"
      :circle-stroke-width="1"
      :pulse-radius="20"
      fill-color="#ff6464"
      stroke-color="#be5643"
      pulse-color="#ffc8c8"
      :duration="2000"
    />
    <MapLayer
      type="circle"
      source-id="clusters"
      :filter="['!', ['has', 'point_count']]"
      :paint="{
        'circle-color': '#fe6464',
        'circle-stroke-color': '#be5643',
        'circle-stroke-width': 1,
        'circle-stroke-opacity': [ 'interpolate', ['exponential', 0.5], ['zoom'], 12, 1, 17, 0.5 ],
        'circle-opacity': [ 'interpolate', ['exponential', 0.5], ['zoom'], 12, 1, 17, 0.2 ],
        'circle-radius': [ 'interpolate', ['exponential', 2], ['zoom'], 12, 6, 17, 150 ]
      }"
    />
    <MapLayer
      type="symbol"
      source-id="clusters"
      :filter="['has', 'point_count']"
      :paint="{ 'text-color': '#ffffff' }"
      :layout="{
        'text-size': 12,
        'icon-image': 'pulse',
        'text-field': '{point_count_abbreviated}',
        'text-font': ['SF Pro Text Semibold'],
        'icon-allow-overlap': true,
        'icon-ignore-placement': true
      }"
    />
  </BaseMap>
</template>

<script>
import BaseMap from '@/components/BaseMap/BaseMap'
import MapSource from '@/components/BaseMap/components/MapSource/MapSource'
import MapLayer from '@/components/BaseMap/components/MapLayer/MapLayer'
import ListingService from '@/services/Api/services/ListingService/ListingService'
import MapImagePulse from '@/components/BaseMap/components/MapImagePulse/MapImagePulse'
import { featureCollection, point } from '@turf/helpers'
export default {
  components: {
    BaseMap,
    MapSource,
    MapLayer,
    MapImagePulse
  },
  async created () {
    await this.updateGeojson()
  },
  data: () => ({
    geojson: null,
    loading: false
  }),
  methods: {
    async updateGeojson () {
      const listings = await ListingService.findAllDispersedLngLats()
      this.geojson = featureCollection(listings.map(listing => point(listing.dispersedLngLat)))
      this.$emit('loaded', { totalListingsCount: this.geojson.features.length })
    }
  }
}
</script>
