<script>
export default {
  props: {
    points: {
      type: Array,
      required: true
    }
  },
  async mounted () {
    this.map = this.$parent.map
    await new Promise(resolve => this.map.on('load', resolve))
    this.addImage()
    this.addSource()
    this.addLayers()
  },
  methods: {
    addImage () {
      const map = this.map
      const diameter = 200
      const duration = 2000
      map.addImage('marker', {
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
          const t = (performance.now() % duration) / duration
          const radius = (diameter / 2) * 0.3
          const outerRadius = (diameter / 2) * 0.7 * t + radius
          this.context.clearRect(0, 0, this.width, this.height)
          this.context.beginPath()
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
      }, { pixelRatio: 2 })
    },
    addSource () {
      this.map.addSource('locations', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: this.points },
        cluster: true,
        clusterRadius: 40,
        clusterMaxZoom: 8
      })
    },
    addLayers () {
      this.map.addLayer({
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
      this.map.addLayer({
        id: 'cluster',
        type: 'symbol',
        source: 'locations',
        filter: ['has', 'point_count'],
        layout: {
          'icon-image': 'marker',
          'icon-allow-overlap': true
        }
      })
      this.map.addLayer({
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
  },
  render: () => null
}
</script>
