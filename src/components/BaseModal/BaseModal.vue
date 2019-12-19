<template>
  <transition @enter="animateEnter" @leave="animateLeave" :css="false">
    <div class="base-modal">
      <div class="backdrop"/>
      <img class="logo" src="@/assets/img/logo-4.svg">
      <BaseCard class="card" ref="card" @click.native.stop>
        <ButtonIcon class="close" :icon="require('@/assets/img/close.svg')" @click.native="$emit('close')"/>
        <slot/>
      </BaseCard>
    </div>
  </transition>
</template>

<script>
import anime from 'animejs'
import BaseCard from '@/components/BaseCard/BaseCard'
import ButtonIcon from '@/components/ButtonIcon/ButtonIcon'
export default {
  components: {
    BaseCard,
    ButtonIcon
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
      tl.add({ targets: this.$refs['card'].$el, opacity: [0, 1], translateY: [20, 0], easing: 'easeOutBack' }, 200)
    },
    animateLeave (el, done) {
      const tl = anime.timeline({ easing: 'easeInOutQuad', duration: 200, complete: done })
      tl.add({ targets: this.$refs['card'].$el, opacity: [1, 0], translateY: [0, -20] }, 0)
      tl.add({ targets: el, opacity: [1, 0] }, 200)
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
.logo {
  position: absolute;
  margin: var(--spacing-4);
  height: 2.5rem;
  left: 0;
  top: 0;
}
.close {
  position: absolute;
  right: 0;
  bottom: 100%;
  margin: var(--spacing-4) var(--spacing-2);
  cursor: pointer;
  width: 1.2rem;
  height: 1.2rem;
}
.card {
  width: 400px;
  will-change: transform, opacity;
}
</style>
