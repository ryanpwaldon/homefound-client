<template>
  <div class="base-endless-scroll">
    <div ref="trigger" v-if="!done">{{ textTrigger }}</div>
    <div v-else>{{ textDone }}</div>
  </div>
</template>

<script>
export default {
  props: {
    done: {
      type: Boolean,
      required: true
    },
    textTrigger: {
      type: String,
      required: true
    },
    textDone: {
      type: String,
      required: true
    }
  },
  mounted () {
    if (!this.io) this.io = new IntersectionObserver(([entry]) => entry.isIntersecting && this.$emit('intersected'))
    this.io.observe(this.$refs['trigger'])
  },
  beforeDestroy () {
    this.io.disconnect()
  },
  data: () => ({
    io: null
  }),
  watch: {
    done (val) {
      val ? this.io.disconnect() : this.io.observe(this.$refs['trigger'])
    }
  }
}
</script>

<style lang="scss" scoped>
.base-endless-scroll {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
