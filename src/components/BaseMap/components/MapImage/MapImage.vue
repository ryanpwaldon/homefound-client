<script>
export default {
  props: {
    imageId: {
      type: String,
      required: true
    },
    imageData: {
      type: Function,
      required: true
    }
  },
  created () {
    this.map = this.$parent.map
    this.addImage()
  },
  methods: {
    addImage () {
      this.map.addImage(this.imageId, this.imageData(this.map), { pixelRatio: 2 })
    }
  },
  render: () => null
}
</script>
