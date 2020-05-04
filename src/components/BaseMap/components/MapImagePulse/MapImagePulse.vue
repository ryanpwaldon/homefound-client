<script>
import * as convert from 'color-convert'
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
    pulseRadius: {
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
    pulseColor: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 1000
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
    this.map.addImage(this.imageId, this.createImage(), { pixelRatio: this.pixelRatio })
  },
  computed: {
    adjustedCircleRadius () {
      return this.circleRadius * this.pixelRatio
    },
    adjustedCircleStrokeWidth () {
      return this.circleStrokeWidth * this.pixelRatio
    },
    adjustedPulseRadius () {
      return this.pulseRadius * this.pixelRatio
    },
    formattedPulseColor () {
      return convert.hex.rgb(this.pulseColor)
    },
    diameter () {
      return this.adjustedCircleRadius * 2 + this.adjustedPulseRadius * 2 + this.adjustedCircleStrokeWidth
    }
  },
  methods: {
    createImage () {
      const vm = this
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
          this.context.clearRect(0, 0, this.width, this.height)
          this.context.beginPath()
          const t = performance.now() % vm.duration / vm.duration
          const currentPulseRadius = vm.adjustedCircleRadius + vm.adjustedPulseRadius * t
          this.context.arc(this.width / 2, this.height / 2, currentPulseRadius, 0, Math.PI * 2)
          this.context.fillStyle = `rgba(${vm.formattedPulseColor[0]}, ${vm.formattedPulseColor[1]}, ${vm.formattedPulseColor[2]}, ${1 - t})`
          this.context.fill()
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
      }
    }
  },
  render: () => null
}
</script>
