<template>
  <div class="base-form-toggle-text">
    <div class="content">
      <div class="options-container">
        <div class="option-container" @click="$emit('input', true)">
          <slot name="option-1" :active="value"/>
        </div>
        <div class="option-container" @click="$emit('input', false)">
          <slot name="option-2" :active="!value"/>
        </div>
      </div>
      <div class="panel" ref="panel"/>
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
    }
  },
  mounted () {
    this.initTogglePosition(this.value)
  },
  watch: {
    value (val) {
      this.animate(val)
    }
  },
  methods: {
    animate (state) {
      return anime.timeline().add({
        targets: this.$refs['panel'],
        marginLeft: state ? '0%' : '50%',
        easing: 'easeOutQuad',
        duration: 200
      })
    },
    initTogglePosition (state) {
      const animation = this.animate(state)
      animation.seek(animation.duration)
    }
  }
}
</script>

<style lang="scss" scoped>
.base-form-toggle-text {
  position: relative;
  padding: var(--spacing-2);
  background: var(--color-gray-2);
  border: solid 1px var(--color-gray-1);
  border-radius: var(--border-radius-1);
  transition: opacity var(--transition-settings);
  cursor: pointer;
}
.content {
  width: 100%;
  height: 100%;
  position: relative;
}
.options-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 1;
}
.option-container {
  width: 50%;
  padding: var(--spacing-2);
  display: flex;
  justify-content: center;
  align-items: center;
}
.panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow-1);
  background: var(--color-white-1);
  pointer-events: none;
  z-index: 0;
  will-change: transform;
}
</style>
