<template>
  <div class="buyer">
    <BaseNavVertical :nav-items="navItems"/>
    <router-view/>
  </div>
</template>

<script>
import BaseNavVertical from '@/components/BaseNavVertical/BaseNavVertical'
export default {
  name: 'buyer',
  components: {
    BaseNavVertical
  },
  data: () => ({
    navItems: [
      { title: 'Search', path: '/buyer/listings', icon: require('@/assets/img/search.svg') },
      { title: 'Likes', path: '/buyer/likes', icon: require('@/assets/img/likes.svg') },
      { title: 'Alerts', path: '/buyer/alerts', icon: require('@/assets/img/alerts.svg') },
      { title: 'Seller', path: '/seller', icon: require('@/assets/img/switch.svg') }
    ]
  })
}
</script>

<style lang="scss" scoped>
.buyer {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
