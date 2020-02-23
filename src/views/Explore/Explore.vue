<template>
  <div class="explore">
    <div class="content"></div>
    <BaseMap class="map" ref="map" @load="addMarkers" :max-zoom="17"/>
  </div>
</template>

<script>
import ListingService from '@/services/Api/services/ListingService/ListingService'
import BaseMap from '@/components/BaseMap/BaseMap'
import { point } from '@turf/helpers'
export default {
  name: 'explore',
  components: {
    BaseMap
  },
  data: () => ({
    polygon: null
  }),
  methods: {
    async addMarkers () {
      const size = 200
      const map = this.$refs['map'].map
      const pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),
        onAdd: function () {
          const canvas = document.createElement('canvas')
          canvas.width = this.width
          canvas.height = this.height
          this.context = canvas.getContext('2d')
        },
        render: function () {
          const duration = 2000
          const t = (performance.now() % duration) / duration
          const radius = (size / 2) * 0.3
          const outerRadius = (size / 2) * 0.7 * t + radius
          const context = this.context
          context.clearRect(0, 0, this.width, this.height)
          context.beginPath()
          context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2)
          context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')'
          context.fill()
          context.beginPath()
          context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2)
          context.fillStyle = 'rgba(255, 100, 100, 1)'
          context.strokeStyle = '#be5643'
          context.lineWidth = 2
          context.fill()
          context.stroke()
          this.data = context.getImageData(0, 0, this.width, this.height).data
          map.triggerRepaint()
          return true
        }
      }
      this.$refs['map'].map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 })
      const locations = (await ListingService.findAllDispersedLngLats()).map(listing => point(listing.dispersedLngLat))
      this.$refs['map'].map.addSource('locations', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: locations },
        cluster: true,
        clusterRadius: 40,
        clusterMaxZoom: 8
      })
      this.$refs['map'].map.addLayer({
        id: 'point',
        type: 'circle',
        source: 'locations',
        paint: {
          'circle-stroke-width': 1,
          'circle-color': '#fe6464',
          'circle-stroke-color': '#be5643',
          'circle-stroke-opacity': [ 'interpolate', ['exponential', 0.5], ['zoom'], 12, 1, 17, 0.5 ],
          'circle-opacity': [ 'interpolate', ['exponential', 0.5], ['zoom'], 12, 1, 17, 0.2 ],
          'circle-radius': [ 'interpolate', ['exponential', 2], ['zoom'], 12, 6, 17, 150 ]
        }
      })
      this.$refs['map'].map.addLayer({
        id: 'cluster',
        type: 'symbol',
        source: 'locations',
        filter: ['has', 'point_count'],
        layout: {
          'icon-image': 'pulsing-dot',
          'icon-allow-overlap': true
        }
      })
      this.$refs['map'].map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'locations',
        filter: ['has', 'point_count'],
        paint: { 'text-color': '#ffffff' },
        layout: {
          'icon-allow-overlap': true,
          'text-field': '{point_count_abbreviated}',
          'text-font': ['SF Pro Text Semibold'],
          'text-size': 12
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.explore {
  width: 100%;
  height: 100%;
  display: flex;
  background: var(--color-gray-2);
}
.content {
  height: auto;
  width: calc(100% / 3);
}
.map {
  height: auto;
  width: calc(100% / 3 * 2);
  border-left: solid 1px var(--color-gray-1);
}
</style>
