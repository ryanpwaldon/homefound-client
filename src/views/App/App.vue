<template>
  <div class="app">
    <BaseLayoutFullWindow/>
    <BaseNavVertical :nav-items="filteredNavItems"/>
    <keep-alive include="listings">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import BaseLayoutFullWindow from '@/components/BaseLayoutFullWindow/BaseLayoutFullWindow'
import BaseNavVertical from '@/components/BaseNavVertical/BaseNavVertical'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {
    BaseLayoutFullWindow,
    BaseNavVertical
  },
  created () {
    this.navItems = [
      { text: 'Home', path: '/', icon: require('@/assets/img/logo-9.svg'), position: 1, size: '2.5rem', spacing: 'var(--spacing-3)' },
      { text: 'Search', path: '/app/listings', icon: require('@/assets/img/search.svg'), position: 1 },
      { text: 'Saved', path: '/app/saved', icon: require('@/assets/img/bookmark.svg'), position: 1 },
      { text: 'MyListings', path: '/app/my-listings', icon: require('@/assets/img/listings.svg'), position: 1, roles: [this.$getRole('SELLER')] },
      { text: 'Admin', path: '/app/admin', icon: require('@/assets/img/controls.svg'), position: 1, roles: [this.$getRole('ADMIN')] },
      { text: 'Account', path: '/app/account', icon: require('@/assets/img/gear.svg'), position: 2 }
    ]
  },
  computed: {
    ...mapGetters('user', [
      'roles'
    ]),
    filteredNavItems () {
      return this.navItems.filter(item => !item.roles || this.roles.some(role => item.roles.includes(role)))
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
