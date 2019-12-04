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
        { title: 'Search', path: '/app/listings', icon: require('@/assets/img/search.svg') },
        { title: 'Likes', path: '/app/likes', icon: require('@/assets/img/likes.svg') },
        { title: 'Alerts', path: '/app/alerts', icon: require('@/assets/img/alerts.svg') },
        { title: 'MyListings', path: '/app/my-listings', icon: require('@/assets/img/listings.svg') }
      ],
      [
        { title: 'Account', path: '/app/account', icon: require('@/assets/img/gear.svg') }
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
