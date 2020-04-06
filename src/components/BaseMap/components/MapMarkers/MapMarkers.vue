<script>
import shortId from 'shortid'
import { point } from '@turf/helpers'
export default {
  props: {
    lngLats: {
      type: Array,
      required: true
    },
    approximate: {
      type: Boolean,
      default: false
    },
    pulse: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.map = this.$parent.map
    const id = shortId.generate()
    this.imageId = `image-${id}`
    this.sourceId = `source-${id}`
    this.layerPointId = `point-${id}`
    this.layerClusterId = `cluster-${id}`
    this.layerCountId = `count-${id}`
  },
  async mounted () {
    this.map.loaded() || await new Promise(resolve => this.map.on('load', resolve))
    this.addImage()
    this.addSource()
    this.addLayers()
    this.$watch('lngLats', {
      immediate: true,
      handler: this.updateSource
    })
    this.$watch('hide', {
      immediate: true,
      handler: this.updateHidden
    })
  },
  beforeDestroy () {
    this.map.removeLayer(this.layerPointId)
    this.map.removeLayer(this.layerClusterId)
    this.map.removeLayer(this.layerCountId)
    this.map.removeImage(this.imageId)
    this.map.removeSource(this.sourceId)
  },
  methods: {
    updateSource () {
      const points = this.lngLats.map(lngLat => point(lngLat))
      this.map.getSource(this.sourceId).setData({ features: points })
    },
    updateHidden (hide) {
      this.map.setPaintProperty(this.layerPointId, 'circle-stroke-opacity', hide ? 0 : 1)
      this.map.setPaintProperty(this.layerPointId, 'circle-opacity', hide ? 0 : 1)
      this.map.setPaintProperty(this.layerClusterId, 'icon-opacity', hide ? 0 : 1)
      this.map.setPaintProperty(this.layerCountId, 'text-opacity', hide ? 0 : 1)
    },
    addImage () {
      const map = this.map
      const diameter = 200
      const imageData = {
        width: diameter,
        height: diameter,
        data: new Uint8Array(diameter * diameter * 4),
        onAdd () {
          const canvas = document.createElement('canvas')
          canvas.width = this.width
          canvas.height = this.height
          this.context = canvas.getContext('2d')
        },
        render () {
          const duration = 2000
          const radius = (diameter / 2) * 0.3
          this.context.clearRect(0, 0, this.width, this.height)
          this.context.beginPath()
          const t = (performance.now() % duration) / duration
          const outerRadius = (diameter / 2) * 0.7 * t + radius
          this.context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2)
          this.context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')'
          this.context.fill()
          this.context.beginPath()
          this.context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2)
          this.context.fillStyle = 'rgba(255, 100, 100, 1)'
          this.context.strokeStyle = '#be5643'
          this.context.lineWidth = 2
          this.context.fill()
          this.context.stroke()
          this.data = this.context.getImageData(0, 0, this.width, this.height).data
          map.triggerRepaint()
          return true
        }
      }
      map.addImage(this.imageId, imageData, { pixelRatio: 2 })
    },
    addSource () {
      this.map.addSource(this.sourceId, {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
        cluster: true,
        clusterRadius: 40,
        clusterMaxZoom: 8
      })
    },
    addLayers () {
      this.map.addLayer({
        id: this.layerPointId,
        source: this.sourceId,
        type: 'circle',
        transition: { duration: 200 },
        paint: {
          'circle-color': '#fe6464',
          'circle-stroke-width': 1,
          'circle-stroke-color': '#be5643',
          ...(this.approximate ? {
            'circle-stroke-opacity': [ 'interpolate', ['exponential', 0.5], ['zoom'], 12, 1, 17, 0.5 ],
            'circle-opacity': [ 'interpolate', ['exponential', 0.5], ['zoom'], 12, 1, 17, 0.2 ],
            'circle-radius': [ 'interpolate', ['exponential', 2], ['zoom'], 12, 6, 17, 150 ]
          } : {})
        }
      })
      this.map.addLayer({
        id: this.layerClusterId,
        source: this.sourceId,
        type: 'symbol',
        filter: ['has', 'point_count'],
        transition: { duration: 200 },
        layout: {
          'icon-image': this.imageId,
          'icon-allow-overlap': true
        }
      })
      this.map.addLayer({
        id: this.layerCountId,
        type: 'symbol',
        source: this.sourceId,
        filter: ['has', 'point_count'],
        transition: { duration: 200 },
        paint: { 'text-color': '#ffffff' },
        layout: {
          'icon-allow-overlap': true,
          'text-field': '{point_count_abbreviated}',
          'text-font': ['SF Pro Text Semibold'],
          'text-size': 12
        }
      })
    }
  },
  render: () => null
}
</script>
