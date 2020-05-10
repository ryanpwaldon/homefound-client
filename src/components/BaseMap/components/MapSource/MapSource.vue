<script>
import { featureCollection } from '@turf/helpers'
export default {
  props: {
    sourceId: {
      type: String,
      required: true
    },
    geojson: {
      type: Object,
      default: featureCollection
    },
    cluster: {
      type: Boolean,
      default: false
    },
    clusterRadius: {
      type: Number,
      default: 45
    },
    clusterMaxZoom: {
      type: Number,
      default: 12
    }
  },
  created () {
    this.map = this.$parent.map
    this.addSource()
  },
  methods: {
    addSource () {
      this.map.addSource(this.sourceId, {
        type: 'geojson',
        data: this.geojson,
        cluster: this.cluster,
        clusterRadius: this.clusterRadius,
        clusterMaxZoom: this.clusterMaxZoom
      })
      this.$watch('geojson', this.setData)
    },
    setData () {
      this.map.getSource(this.sourceId).setData(this.geojson)
    }
  },
  render: () => null
}
</script>
