<script>
import axios from 'axios'
export default {
  props: {
    query: {
      type: String,
      required: false
    }
  },
  watch: {
    query: {
      immediate: true,
      async handler (val) {
        try {
          if (!val) return
          const { data: { features } } = await axios.get(`${process.env.VUE_APP_MAPBOX_GEOCODING_URL}/${val}.json`, {
            params: {
              access_token: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN,
              autocomplete: true,
              types: 'address',
              country: 'au'
            }
          })
          this.$emit('updated', features[0].geometry.coordinates)
        } catch (err) {
          console.error(err)
        }
      }
    }
  },
  render () {
    return null
  }
}
</script>
