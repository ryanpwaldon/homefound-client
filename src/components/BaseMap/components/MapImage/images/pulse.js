import * as convert from 'color-convert'
export default (diameter, fillColor, strokeColor, pulseColor) => {
  pulseColor = convert.hex.rgb(pulseColor)
  return map => ({
    width: diameter,
    height: diameter,
    data: new Uint8Array(diameter * diameter * 4),
    onAdd () {
      const canvas = document.createElement('canvas')
      canvas.width = this.width
      canvas.height = this.height
      this.context = canvas.getContext('2d')
    },
    render () {
      const duration = 2000
      const radius = (diameter / 2) * 0.3
      this.context.clearRect(0, 0, this.width, this.height)
      this.context.beginPath()
      const t = (performance.now() % duration) / duration
      const outerRadius = (diameter / 2) * 0.7 * t + radius
      this.context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2)
      this.context.fillStyle = `rgba(${pulseColor[0]}, ${pulseColor[1]}, ${pulseColor[2]}, ${1 - t})`
      this.context.fill()
      this.context.beginPath()
      this.context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2)
      this.context.fillStyle = fillColor
      this.context.strokeStyle = strokeColor
      this.context.lineWidth = 2
      this.context.fill()
      this.context.stroke()
      this.data = this.context.getImageData(0, 0, this.width, this.height).data
      map.triggerRepaint()
      return true
    }
  })
}
