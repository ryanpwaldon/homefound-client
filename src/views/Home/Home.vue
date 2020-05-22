<template>
  <BaseLayoutHome>
    <div class="spacer"/>
    <Header @secondary-button-clicked="scrollToExplore"/>
    <div class="spacer divider"/>
    <Features/>
    <div class="spacer divider"/>
    <Explore ref="explore"/>
    <div class="spacer divider"/>
    <Platform/>
    <div class="spacer divider"/>
    <CTA/>
    <div class="spacer"/>
  </BaseLayoutHome>
</template>

<script>
import BaseLayoutHome from '@/components/BaseLayoutHome/BaseLayoutHome'
import Header from './partials/Header/Header'
import Features from './partials/Features/Features'
import Explore from './partials/Explore/Explore'
import Platform from './partials/Platform/Platform'
import CTA from './partials/CTA/CTA'
import SweetScroll from 'sweet-scroll'
export default {
  name: 'home',
  metaInfo: {
    title: 'Exclusive off-market property subscription',
    meta: [
      { vmid: 'description', name: 'description', content: 'Subscribe and gain access to an exclusive feed of pre-market and off-market properties.' }
    ]
  },
  components: {
    BaseLayoutHome,
    Header,
    Features,
    Explore,
    Platform,
    CTA
  },
  methods: {
    scrollToExplore () {
      const scroller = new SweetScroll()
      scroller.toElement(this.$refs['explore'].$el, { easing: 'easeInOutQuad', duration: 500, offset: -96 })
    }
  }
}
</script>

<style lang="scss" scoped>
.spacer {
  width: 100%;
  height: 15rem;
  position: relative;
  @include media(sm-only) {
    height: 6rem;
  }
}
.divider {
  @include media(sm-only) {
    height: 12rem;
  }
}
.divider::after {
  content: '';
  display: none;
  position: absolute;
  width: 100vw;
  height: 1px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--color-gray-1);
  @include media(sm-only) {
    display: block;
  }
}
</style>
