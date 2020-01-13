<template>
  <div class="base-form-toggle" @click="toggle(!value)" :style="{opacity: loading ? 0.5 : 1}">
    <div class="knob-container">
      <div class="knob" ref="knob"/>
    </div>
  </div>
</template>

<script>
import anime from 'animejs'
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    asyncFunc: {
      type: Function,
      required: false
    }
  },
  mounted () {
    this.initTogglePosition(this.value)
  },
  data: () => ({
    loading: false
  }),
  methods: {
    async toggle (state) {
      if (this.loading) return
      if (this.asyncFunc) {
        this.loading = true
        try {
          await this.asyncFunc(state)
          this.animate(state)
        } catch (err) { console.log(err) }
        this.loading = false
      } else {
        this.animate(state)
        this.$emit('input', state)
      }
    },
    animate (state) {
      const documentStyle = getComputedStyle(document.documentElement)
      const color1 = documentStyle.getPropertyValue('--color-green-7').trim()
      const color2 = documentStyle.getPropertyValue('--color-gray-4').trim()
      const tl = anime.timeline({ easing: 'easeInOutQuad', duration: 200 })
      tl.add({ targets: this.$refs['knob'], translateX: state ? this.$refs['knob'].parentElement.offsetWidth - this.$refs['knob'].offsetWidth : 0 }, 0)
      tl.add({ targets: this.$el, background: state ? color1 : color2 }, 0)
      return tl
    },
    initTogglePosition (state) {
      const animation = this.animate(state)
      animation.seek(animation.duration)
    }
  }
}
</script>

<style lang="scss" scoped>
.base-form-toggle {
  width: 32px;
  height: 16px;
  padding: 2px;
  border-radius: 100px;
  background: var(--color-gray-4);
  position: relative;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
}
.knob-container {
  width: 100%;
  height: 100%;
  border-radius: 100px;
}
.knob {
  width: 12px;
  height: 12px;
  border-radius: 100%;
  background: var(--color-white-1);
}
</style>
