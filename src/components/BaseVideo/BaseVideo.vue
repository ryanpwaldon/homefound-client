<template>
  <div class="base-video">
    <video
      ref="video"
      :playsinline="playsInline"
      :autoplay="autoplay"
      :muted="muted"
    />
  </div>
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
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    muted: {
      type: Boolean,
      default: false
    },
    playsInline: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.initPlyr()
    this.setData()
  },
  methods: {
    initPlyr () {
      this.plyr = new Plyr(this.$refs['video'], {
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

<style lang="scss" scoped>
video {
  display: block;
}
</style>
