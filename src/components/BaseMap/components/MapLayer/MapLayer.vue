<script>
import shortId from 'shortid'
export default {
  props: {
    sourceId: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    filter: {
      type: Array,
      required: false
    },
    layout: {
      type: Object,
      default: () => ({})
    },
    paint: {
      type: Object,
      required: false
    }
  },
  created () {
    this.map = this.$parent.map
    this.layerId = shortId.generate()
    this.addLayer()
  },
  methods: {
    addLayer () {
      this.map.addLayer({
        id: this.layerId,
        source: this.sourceId,
        type: this.type
      })
      this.filter && this.$watch('filter', { immediate: true, handler: this.setFilter })
      this.layout && this.$watch('layout', { immediate: true, handler: properties => this.setProperties(properties, 'setLayoutProperty') })
      this.paint && this.$watch('paint', { immediate: true, handler: properties => this.setProperties(properties, 'setPaintProperty') })
    },
    setFilter (filter) {
      this.map.setFilter(this.layerId, filter)
    },
    setProperties (properties, method) {
      for (const [name, value] of Object.entries(properties)) {
        this.map[method](this.layerId, name, value)
      }
    }
  },
  render: () => null
}
</script>
