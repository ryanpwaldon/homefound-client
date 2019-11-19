<template>
  <div class="buyer">
    <BaseNavVertical :nav-items="navItems"/>
    <div class="content">
      <div class="router-view-container">
        <router-view/>
      </div>
    </div>
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
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--color-gray-2);
  overflow: auto;
}
.router-view-container {
  width: 100%;
  max-width: 600px;
  margin: var(--spacing-6) 0;
}
</style>
