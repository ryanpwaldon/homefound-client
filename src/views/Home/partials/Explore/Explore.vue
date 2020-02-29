<template>
  <div class="explore">
    <div class="header">
      <div class="title">Explore our listings</div>
      <div class="subtitle">There are currently <span class="count">{{ locations.length }}</span> off-market properties listed on Homefound</div>
    </div>
    <div class="map-container">
     <BaseMap
      class="map"
      ref="map"
      @load="addMarkers"
      :max-zoom="17"
      :zoom="3"
      :scroll-zoom="false"
    />
    </div>
    <div class="content">
      <BaseCard>
        <div class="copy-1">Sign up to unlock</div>
        <div class="copy-2">Start discovering off-market properties today</div>
        <router-link to="/signup/buyer">
          <BaseButtonLarge class="button" text="Get started" design="red"/>
        </router-link>
      </BaseCard>
      <BaseCard>
        <div class="copy-1">No properties in your area?</div>
        <div class="copy-2">Be the first to know when we list in new areas</div>
        <div class="form">
          <BaseFormInput placeholder="Enter your email..."/>
          <BaseButtonLarge class="button" text="Submit" design="gray"/>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script>
import ListingService from '@/services/Api/services/ListingService/ListingService'
import BaseMap from '@/components/BaseMap/BaseMap'
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseButtonLarge from '@/components/BaseButtonLarge/BaseButtonLarge'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import { point } from '@turf/helpers'
export default {
  components: {
    BaseMap,
    BaseCard,
    BaseButtonLarge,
    BaseFormInput
  },
  data: () => ({
    locations: []
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
      this.locations = (await ListingService.findAllDispersedLngLats()).map(listing => point(listing.dispersedLngLat))
      this.$refs['map'].map.addSource('locations', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: this.locations },
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
  padding: var(--spacing-10) 0;
  @include media(sm-only) {
    padding: var(--spacing-8) 0;
  }
}
.title {
  font-size: 3.5rem;
  margin-bottom: var(--spacing-4);
  font-weight: var(--font-weight-bold);
  text-align: center;
}
.subtitle {
  font-size: 1.6rem;
  margin-bottom: var(--spacing-7);
  color: var(--color-gray-4);
  text-align: center;
  line-height: 1.5;
}
.count {
  position: relative;
  display: inline-block;
  color: var(--color-black-2);
  font-weight: var(--font-weight-medium);
  &::after {
    width: 100%;
    position: absolute;
    height: 2px;
    top: 100%;
    left: 0;
    background: var(--color-black-2);
    content: '';
    @include media(sm-only) {
      display: none;
    }
  }
}
.map-container {
  height: 0;
  width: 100%;
  position: relative;
  padding-top: calc(100% / 16 * 10);
  margin-bottom: var(--spacing-5);
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow-1);
  overflow: hidden;
}
.map {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.content {
  width: 100%;
  display: grid;
  grid-gap: var(--spacing-5);
  grid-template-columns: 1fr 1fr;
  @include media(sm-only) {
    grid-template-columns: 1fr;
  }
}
.copy-1 {
  font-size: 1.8rem;
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-2);
}
.copy-2 {
  font-size: 1.6rem;
  color: var(--color-gray-4);
  margin-bottom: var(--spacing-4);
}
.button {
  font-size: 1.4rem;
}
.form {
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-gap: var(--spacing-2);
}
</style>
