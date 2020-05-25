<template>
  <div
    class="base-form-toggle"
    :class="design"
    @click="toggle(!value)"
    :style="{opacity: loading ? 0.5 : 1}">
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
    },
    design: {
      type: String,
      default: 'regular'
    },
    bgActiveColor: {
      type: String,
      default: '--color-green-7'
    },
    bgInactiveColor: {
      type: String,
      default: '--color-gray-4'
    },
    knobActiveColor: {
      type: String,
      default: '--color-white-1'
    },
    knobInactiveColor: {
      type: String,
      default: '--color-white-1'
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
      const bgActiveColor = documentStyle.getPropertyValue(this.bgActiveColor).trim()
      const bgInactiveColor = documentStyle.getPropertyValue(this.bgInactiveColor).trim()
      const knobActiveColor = documentStyle.getPropertyValue(this.knobActiveColor).trim()
      const knobInactiveColor = documentStyle.getPropertyValue(this.knobInactiveColor).trim()
      const tl = anime.timeline({ easing: 'easeInOutQuad', duration: 200 })
      tl.add({
        targets: this.$refs['knob'],
        translateX: state ? this.$refs['knob'].parentElement.offsetWidth - this.$refs['knob'].offsetWidth : 0,
        background: state ? knobActiveColor : knobInactiveColor
      }, 0)
      tl.add({
        targets: this.$el,
        background: state ? bgActiveColor : bgInactiveColor
      }, 0)
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
  border: solid 1px var(--color-gray-1);
}
.knob-container {
  width: 100%;
  height: 100%;
  border-radius: 100px;
}
.knob {
  width: 10px;
  height: 10px;
  border-radius: 100%;
}
.large {
  width: 64px;
  height: 28px;
  padding: 8px 10px;
  .knob {
    width: 12px;
    height: 12px;
  }
}
</style>
