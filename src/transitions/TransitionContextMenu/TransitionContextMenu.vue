<template>
  <transition @enter="enter" @leave="leave" :css="false">
    <slot/>
  </transition>
</template>

<script>
import anime from 'animejs'
export default {
  props: {
    transformOrigin: {
      type: String,
      required: true
    }
  },
  methods: {
    enter (el, done) {
      const tl = anime.timeline({ targets: el, complete: done })
      tl.add({ opacity: [0, 1], easing: 'easeInOutQuad', duration: 100 }, 0)
      tl.add({ scale: [0, 1], easing: 'spring(0.1, 100, 10, 50)', transformOrigin: ['left top 0px', 'left top 0px'] }, 0)
    },
    leave (el, done) {
      anime({
        targets: el,
        opacity: [1, 0],
        easing: 'easeInOutQuad',
        duration: 100,
        complete: done
      })
    }
  }
}
</script>
