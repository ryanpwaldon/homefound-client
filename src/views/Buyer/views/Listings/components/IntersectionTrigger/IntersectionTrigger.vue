<template>
  <div class="intersection-trigger" ref="intersection-trigger"/>
</template>

<script>
export default {
  mounted () {
    this.initIo()
  },
  beforeDestroy () {
    this.io.disconnect()
  },
  data: () => ({
    io: null
  }),
  methods: {
    initIo () {
      this.io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          this.io.unobserve(this.$el)
          this.$emit('intersected')
        }
      })
    },
    observe () {
      this.io.observe(this.$el)
    }
  }
}
</script>

<style lang="scss" scoped>
.intersection-trigger {
  width: 100%;
  height: 0;
}
</style>
