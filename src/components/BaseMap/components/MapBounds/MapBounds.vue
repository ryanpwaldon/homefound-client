<script>
export default {
  props: {
    value: {
      type: Array,
      required: false
    }
  },
  created () {
    this.getBounds()
    this.$parent.map.on('moveend', this.getBounds)
  },
  methods: {
    getBounds () {
      const bounds = this.$parent.map.getBounds()
      const nw = bounds.getNorthWest().toArray()
      const ne = bounds.getNorthEast().toArray()
      const se = bounds.getSouthEast().toArray()
      const sw = bounds.getSouthWest().toArray()
      this.$emit('input', [[ nw, ne, se, sw, nw ]])
    }
  },
  render: () => null
}
</script>
