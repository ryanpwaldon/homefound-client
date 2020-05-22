<template>
  <BaseLayoutHome>
    <div class="spacer"/>
    <Header/>
    <div class="spacer divider"/>
    <Features/>
    <div class="spacer divider"/>
    <CVP/>
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
import CVP from './partials/CVP/CVP'
import Platform from './partials/Platform/Platform'
import CTA from './partials/CTA/CTA'
export default {
  name: 'agents',
  components: {
    BaseLayoutHome,
    Header,
    Features,
    CVP,
    Platform,
    CTA
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
