<template>
  <div class="base-map">
    <slot v-if="loaded" :map="map"/>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import ResizeObserver from 'resize-observer-polyfill'
export default {
  props: {
    center: {
      type: Array,
      required: false
    },
    zoom: {
      type: Number,
      required: false
    },
    maxZoom: {
      type: Number,
      default: 24
    },
    scrollZoom: {
      type: Boolean,
      default: true
    },
    bounds: {
      type: Array,
      default: () => ([
        [113.1730191243102, -39.1957601713381],
        [153.87999642015694, -10.78370249890736]
      ])
    },
    fitBoundsOptions: {
      type: Object,
      default: () => ({
        padding: 25
      })
    }
  },
  mounted () {
    this.initMap()
    this.addParentResizeListener()
  },
  beforeDestroy () {
    this.removeParentResizeListener()
    this.map.remove()
  },
  data () {
    return {
      map: null,
      loaded: false
    }
  },
  methods: {
    async initMap () {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN
      this.map = new mapboxgl.Map({
        attributionControl: false,
        style: process.env.VUE_APP_MAPBOX_STYLE_URL,
        container: this.$el,
        maxZoom: this.maxZoom,
        scrollZoom: this.scrollZoom,
        fadeDuration: 0,
        ...(
          this.center && this.zoom
            ? { center: this.center, zoom: this.zoom }
            : { bounds: this.bounds, fitBoundsOptions: await this.fitBoundsOptions }
        )
      })
      this.map.on('load', () => (this.loaded = true))
    },
    flyTo (lngLat) {
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
