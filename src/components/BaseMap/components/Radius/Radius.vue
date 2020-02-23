<script>
import mapboxgl from 'mapbox-gl'
export default {
  props: {
    lngLat: {
      type: Array,
      required: true
    }
  },
  mounted () {
    const el = document.createElement('div')
    el.style.width = '30px'
    el.style.height = '30px'
    el.style.border = 'solid 1px var(--color-black-1)'
    el.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'
    el.style.borderRadius = '100%'
    el.style.cursor = 'pointer'
    this.pin = new mapboxgl.Marker({ element: el, anchor: 'center' })
    this.pin.setLngLat(this.lngLat)
    this.pin.addTo(this.$parent.map)
  },
  beforeDestroy () {
    this.pin.remove()
  },
  data: () => ({
    pin: null
  }),
  render: () => null
}
</script>
