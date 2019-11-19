<template>
  <div class="seller">
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
  name: 'seller',
  components: {
    BaseNavVertical
  },
  data: () => ({
    navItems: [
      { title: 'Listings', path: '/seller/listings', icon: require('@/assets/img/listings.svg') },
      { title: 'Buyer', path: '/buyer', icon: require('@/assets/img/switch.svg') }
    ]
  })
}
</script>

<style lang="scss" scoped>
.seller {
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
