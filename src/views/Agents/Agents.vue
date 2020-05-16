<template>
  <BaseLayoutHome>
    <div class="spacer"/>
    <Header/>
    <div class="spacer"/>
    <Features/>
    <div class="spacer"/>
    <CVP/>
    <div class="spacer"/>
    <Platform/>
    <div class="spacer"/>
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
}
</style>
