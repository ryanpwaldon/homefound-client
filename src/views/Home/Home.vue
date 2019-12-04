<template>
  <div class="home">
    <div class="content">
      <BaseNavHorizontalPrimary :nav-items="navItems"/>
      <div class="main">
        <div class="title">Discover properties for sale <span class="bold">before</span> they hit the open market</div>
        <div class="subtitle">Get early access to <span class="bold">783</span> properties – and counting – before they list on Domain or REA</div>
      </div>
    </div>
    <BaseMap class="map"/>
  </div>
</template>

<script>
import BaseNavHorizontalPrimary from '@/components/BaseNavHorizontalPrimary/BaseNavHorizontalPrimary'
import BaseMap from '@/components/BaseMap/BaseMap'
export default {
  name: 'home',
  components: {
    BaseNavHorizontalPrimary,
    BaseMap
  },
  data: () => ({
    navItems: [
      { text: 'How it works?', path: '/how-it-works' },
      { text: 'Pricing', path: '/pricing' },
      { text: 'Login', path: '/login' },
      { text: 'Sign up', path: '/register', design: 'blue' }
    ]
  })
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  > * {
    width: 50%;
  }
}
.content {
  height: 100%;
  padding: var(--spacing-5);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  max-width: 600px;
}
.title {
  font-size: 4rem;
  line-height: 1.2;
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-5);
  color: var(--color-gray-4);
  .bold {
    font-weight: var(--font-weight-bold);
    color: var(--color-black-2);
  }
}
.subtitle .bold {
  font-weight: var(--font-weight-bold);
}
.map {
  border-left: var(--color-gray-1) solid 1px;
}
</style>
