<script>
export default {
  mounted () {
    this.$parent.map.on('moveend', () => this.$emit('updated', this.$parent.map.getCenter().toArray()))
  },
  render () {
    return null
  }
}
</script>
