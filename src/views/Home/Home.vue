<template>
  <div class="home">
    <BaseNavHorizontalPrimary/>
    <div class="container">
      <Header class="section"/>
      <div class="divider"/>
      <Features class="section"/>
      <div class="divider"/>
      <Explore class="section"/>
      <div class="divider"/>
      <Demo class="section"/>
    </div>
    <BaseFooter/>
  </div>
</template>

<script>
import BaseNavHorizontalPrimary from '@/components/BaseNavHorizontalPrimary/BaseNavHorizontalPrimary'
import BaseFooter from '@/components/BaseFooter/BaseFooter'
import Header from './partials/Header/Header'
import Features from './partials/Features/Features'
import Explore from './partials/Explore/Explore'
import Demo from './partials/Demo/Demo'
export default {
  name: 'home',
  components: {
    BaseNavHorizontalPrimary,
    BaseFooter,
    Header,
    Features,
    Explore,
    Demo
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.container {
  display: flex;
  flex-direction: column;
  padding: 0 var(--spacing-5);
  align-items: center;
  background: var(--color-gray-2);
}
.section {
  width: 100%;
  max-width: 90rem;
}
.divider {
  width: 100%;
  height: 1px;
  background: var(--color-gray-1);
}
</style>
