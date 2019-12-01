<script>
export default {
  props: {
    value: {
      type: Array,
      required: false
    }
  },
  mounted () {
    this.$parent.map.on('moveend', () => {
      const bounds = this.$parent.map.getBounds()
      const nw = bounds.getNorthWest().toArray()
      const ne = bounds.getNorthEast().toArray()
      const se = bounds.getSouthEast().toArray()
      const sw = bounds.getSouthWest().toArray()
      this.$emit('input', [[ nw, ne, se, sw, nw ]])
    })
  },
  render () {
    return null
  }
}
</script>
