<template>
  <div class="sellers">
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
  components: {
    BaseNavVertical
  },
  data: () => ({
    navItems: [
      { title: 'Listings', path: '/sellers/listings', icon: require('@/assets/img/listings.svg') }
    ]
  })
}
</script>

<style lang="scss" scoped>
.sellers {
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
