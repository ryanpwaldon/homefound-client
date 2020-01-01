<template>
  <div class="app">
    <BaseNavVertical :nav-items="filteredNavItems"/>
    <router-view/>
  </div>
</template>

<script>
import BaseNavVertical from '@/components/BaseNavVertical/BaseNavVertical'
import { SELLER, ADMIN } from '@/roles/roles'
export default {
  name: 'app',
  components: {
    BaseNavVertical
  },
  data: () => ({
    navItems: [
      { text: 'Home', path: '/', icon: require('@/assets/img/logo-4.svg'), position: 1 },
      { text: 'Search', path: '/app/listings', icon: require('@/assets/img/search.svg'), position: 1 },
      { text: 'Likes', path: '/app/likes', icon: require('@/assets/img/likes.svg'), position: 1 },
      { text: 'MyListings', path: '/app/my-listings', icon: require('@/assets/img/listings.svg'), position: 1, roles: [SELLER, ADMIN] },
      { text: 'Admin', path: '/app/admin', icon: require('@/assets/img/controls.svg'), position: 1, roles: [ADMIN] },
      { text: 'Account', path: '/app/account', icon: require('@/assets/img/gear.svg'), position: 2 }
    ]
  }),
  computed: {
    filteredNavItems () {
      return this.navItems.filter(item => !item.roles || this.$store.state.user.user.roles.some(role => item.roles.includes(role)))
    }
  }
}
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
