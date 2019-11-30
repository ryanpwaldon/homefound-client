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
    el.style.backgroundImage = `url(${require('@/assets/img/pin.svg')})`
    el.style.backgroundSize = 'cover'
    el.style.width = '16px'
    el.style.height = '32px'
    el.style.cursor = 'pointer'
    this.pin = new mapboxgl.Marker({ element: el, anchor: 'bottom' })
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
