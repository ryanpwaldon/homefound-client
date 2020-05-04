<script>
export default {
  props: {
    imageId: {
      type: String,
      required: true
    },
    circleRadius: {
      type: Number,
      required: true
    },
    circleStrokeWidth: {
      type: Number,
      required: true
    },
    fillColor: {
      type: String,
      required: true
    },
    strokeColor: {
      type: String,
      required: true
    },
    pixelRatio: {
      type: Number,
      default: 2
    }
  },
  created () {
    this.map = this.$parent.map
  },
  mounted () {
    this.addImage()
  },
  computed: {
    adjustedCircleRadius () {
      return this.circleRadius * this.pixelRatio
    },
    adjustedCircleStrokeWidth () {
      return this.circleStrokeWidth * this.pixelRatio
    },
    diameter () {
      return this.adjustedCircleRadius * 2 + this.adjustedCircleStrokeWidth
    }
  },
  methods: {
    addImage () {
      this.map.addImage(this.imageId, this.createImage(), { pixelRatio: this.pixelRatio })
    },
    createImage () {
      const vm = this
      let initialRender = true
      return {
        width: vm.diameter,
        height: vm.diameter,
        data: new Uint8Array(vm.diameter * vm.diameter * 4),
        onAdd () {
          const canvas = document.createElement('canvas')
          canvas.width = this.width
          canvas.height = this.height
          this.context = canvas.getContext('2d')
        },
        render () {
          if (initialRender) {
            initialRender = false
            this.context.clearRect(0, 0, this.width, this.height)
            this.context.beginPath()
            this.context.arc(this.width / 2, this.height / 2, vm.adjustedCircleRadius, 0, Math.PI * 2)
            this.context.fillStyle = vm.fillColor
            this.context.strokeStyle = vm.strokeColor
            this.context.lineWidth = vm.adjustedCircleStrokeWidth
            this.context.fill()
            this.context.stroke()
            this.data = this.context.getImageData(0, 0, this.width, this.height).data
            vm.map.triggerRepaint()
            return true
          }
          return false
        }
      }
    }
  },
  render: () => null
}
</script>
