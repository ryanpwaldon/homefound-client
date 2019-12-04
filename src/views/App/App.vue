<template>
  <div class="app">
    <BaseNavVertical :nav-items="navItems"/>
    <router-view/>
  </div>
</template>

<script>
import BaseNavVertical from '@/components/BaseNavVertical/BaseNavVertical'
export default {
  name: 'app',
  components: {
    BaseNavVertical
  },
  data: () => ({
    navItems: [
      [
        { text: 'Home', path: '/', icon: require('@/assets/img/logo-2-2.svg') },
        { text: 'Search', path: '/app/listings', icon: require('@/assets/img/search.svg') },
        { text: 'Likes', path: '/app/likes', icon: require('@/assets/img/likes.svg') },
        { text: 'Alerts', path: '/app/alerts', icon: require('@/assets/img/alerts.svg') },
        { text: 'MyListings', path: '/app/my-listings', icon: require('@/assets/img/listings.svg') }
      ],
      [
        { text: 'Account', path: '/app/account', icon: require('@/assets/img/gear.svg') }
      ]
    ]
  })
}
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
