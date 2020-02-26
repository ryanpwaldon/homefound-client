<template>
  <div class="base-map">
    <slot v-if="map"/>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import ResizeObserver from 'resize-observer-polyfill'
export default {
  props: {
    center: {
      type: Array,
      default: () => [133.7751, -25.2744]
    },
    zoom: {
      type: Number,
      default: 3.5
    },
    maxZoom: {
      type: Number,
      default: 24
    },
    scrollZoom: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    this.initMap()
    this.addParentResizeListener()
  },
  beforeDestroy () {
    this.removeParentResizeListener()
    this.destroyed = true
    this.map.remove()
  },
  data () {
    return {
      map: null,
      destroyed: false
    }
  },
  methods: {
    initMap () {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN
      this.map = new mapboxgl.Map({
        attributionControl: false,
        style: process.env.VUE_APP_MAPBOX_STYLE_URL,
        container: this.$el,
        center: this.center,
        zoom: this.zoom,
        maxZoom: this.maxZoom,
        scrollZoom: this.scrollZoom,
        fadeDuration: 0
      })
      this.map.on('load', () => this.$emit('load'))
    },
    updateView (lngLat) {
      // add bBox for pologon features
      this.map.flyTo({
        center: lngLat,
        zoom: 16
      })
    },
    addParentResizeListener () {
      this.ro = new ResizeObserver(([entry]) => this.map.resize())
      this.ro.observe(this.$el)
    },
    removeParentResizeListener () {
      this.ro.disconnect()
    }
  }
}
</script>

<style lang="scss" scoped>
.base-map {
  width: 100%;
  height: 100%;
  background: var(--color-white-1);
}
::v-deep .mapboxgl-canvas:focus {
  outline: 0;
}
</style>
