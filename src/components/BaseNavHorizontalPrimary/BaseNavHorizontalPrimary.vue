<template>
  <div class="base-nav-horizontal-primary">
    <Desktop class="desktop" :nav-items="navItems"/>
    <Mobile class="mobile" :nav-items="navItems"/>
  </div>
</template>

<script>
import Desktop from './partials/Desktop/Desktop'
import Mobile from './partials/Mobile/Mobile'
export default {
  components: {
    Desktop,
    Mobile
  },
  props: {
    navItems: {
      type: Array,
      default: () => [
        { text: 'Buyers', path: '/', activeMode: 'exact' },
        { text: 'Agents', path: '/agents' },
        { text: 'Pricing', path: '/pricing' },
        { text: 'Login', path: '/login' },
        { text: 'Sign up', path: '/signup' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.base-nav-horizontal-primary {
  position: sticky;
  z-index: 10;
  top: 0;
}
.desktop {
  @include media(sm-only) {
    display: none;
  }
}
.mobile {
  @include media(md-up) {
    display: none;
  }
}
</style>
