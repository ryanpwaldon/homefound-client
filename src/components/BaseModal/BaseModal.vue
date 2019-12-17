<template>
  <transition @enter="animateEnter" @leave="animateLeave" :css="false">
    <div class="base-modal" @click="$emit('close')">
      <div class="backdrop"/>
      <BaseCard class="card" ref="card" @click.native.stop>
        <slot/>
      </BaseCard>
    </div>
  </transition>
</template>

<script>
import anime from 'animejs'
import BaseCard from '@/components/BaseCard/BaseCard'
export default {
  components: {
    BaseCard
  },
  created () {
    document.querySelector('body').style.overflow = 'hidden'
  },
  beforeDestroy () {
    document.querySelector('body').style.overflow = 'auto'
  },
  methods: {
    animateEnter (el, done) {
      const tl = anime.timeline({ easing: 'easeInOutQuad', duration: 200, complete: done })
      tl.add({ targets: el, opacity: [0, 1] }, 0)
      tl.add({ targets: this.$refs['card'].$el, opacity: [0, 1], translateY: [20, 0] }, 150)
    },
    animateLeave (el, done) {
      anime({ targets: el, opacity: [1, 0], easing: 'easeInOutQuad', duration: 200, complete: done })
    }
  }
}
</script>

<style lang="scss" scoped>
.base-modal {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: auto;
  z-index: 1;
  will-change: opacity;
}
.backdrop {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: var(--color-gray-2);
  opacity: 1;
  z-index: -1;
}
.card {
  width: 400px;
  will-change: transform, opacity;
}
</style>
