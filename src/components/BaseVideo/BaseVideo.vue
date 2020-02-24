<template>
  <video class="base-video"/>
</template>

<script>
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    poster: {
      type: String,
      required: false
    }
  },
  mounted () {
    this.initPlyr()
    this.setData()
  },
  methods: {
    initPlyr () {
      this.plyr = new Plyr(this.$el, {
        ratio: '16:9',
        hideControls: false,
        poster: this.poster
      })
    },
    setData () {
      this.plyr.source = {
        type: 'video',
        sources: [ { src: this.src, type: 'video/mp4' } ],
        poster: this.poster
      }
      this.plyr.toggleControls(false)
      this.plyr.on('play', () => this.plyr.toggleControls(true))
    }
  }
}
</script>
