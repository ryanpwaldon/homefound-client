<script>
export default {
  mounted () {
    this.$parent.map.on('moveend', () => {
      const bounds = this.$parent.map.getBounds()
      const nw = bounds.getNorthWest().toArray()
      const ne = bounds.getNorthEast().toArray()
      const se = bounds.getSouthEast().toArray()
      const sw = bounds.getSouthWest().toArray()
      this.$emit('updated', [ nw, ne, se, sw, nw ])
    })
  },
  render () {
    return null
  }
}
</script>
