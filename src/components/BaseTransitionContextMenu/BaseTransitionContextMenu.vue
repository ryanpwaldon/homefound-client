<template>
  <transition @enter="enter" @leave="leave" @after-leave="$emit('after-leave')" :css="false">
    <slot/>
  </transition>
</template>

<script>
import anime from 'animejs'
export default {
  props: {
    transformOrigin: {
      type: String,
      default: 'center center'
    }
  },
  methods: {
    enter (el, done) {
      el.style.willChange = 'transform'
      const tl = anime.timeline({ targets: el, complete: done })
      tl.add({ opacity: [0, 1], easing: 'easeInOutQuad', duration: 100 }, 0)
      tl.add({ scale: [0, 1], easing: 'spring(0.1, 100, 10, 50)', transformOrigin: [`${this.transformOrigin} 0px`, `${this.transformOrigin} 0px`] }, 0)
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
