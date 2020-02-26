<template>
  <BaseLayoutHome>
    <Header/>
    <div class="divider"/>
    <Features/>
    <div class="divider"/>
    <Explore/>
    <div class="divider"/>
    <Demo/>
  </BaseLayoutHome>
</template>

<script>
import BaseLayoutHome from '@/components/BaseLayoutHome/BaseLayoutHome'
import Header from './partials/Header/Header'
import Features from './partials/Features/Features'
import Explore from './partials/Explore/Explore'
import Demo from './partials/Demo/Demo'
export default {
  name: 'home',
  components: {
    BaseLayoutHome,
    Header,
    Features,
    Explore,
    Demo
  }
}
</script>

<style lang="scss" scoped>
.divider {
  width: 100%;
  height: 1px;
  background: var(--color-gray-1);
}
</style>
