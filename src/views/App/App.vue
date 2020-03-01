<template>
  <div class="app">
    <BaseNavVertical :nav-items="filteredNavItems"/>
    <keep-alive include="listings">
      <router-view/>
    </keep-alive>
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
  mounted () {
    this.addAppStyles()
  },
  beforeDestroy () {
    this.removeAppStyles()
  },
  data: () => ({
    navItems: [
      { text: 'Home', path: '/', icon: require('@/assets/img/logo-7.svg'), position: 1, size: '2.5rem', spacing: 'var(--spacing-3)' },
      { text: 'Search', path: '/app/listings', icon: require('@/assets/img/search.svg'), position: 1 },
      { text: 'Saved', path: '/app/saved', icon: require('@/assets/img/bookmark.svg'), position: 1 },
      { text: 'MyListings', path: '/app/my-listings', icon: require('@/assets/img/listings.svg'), position: 1, roles: [SELLER, ADMIN] },
      { text: 'Admin', path: '/app/admin', icon: require('@/assets/img/controls.svg'), position: 1, roles: [ADMIN] },
      { text: 'Account', path: '/app/account', icon: require('@/assets/img/gear.svg'), position: 2 }
    ]
  }),
  computed: {
    filteredNavItems () {
      return this.navItems.filter(item => !item.roles || this.$store.state.user.user.roles.some(role => item.roles.includes(role)))
    }
  },
  methods: {
    addAppStyles () {
      document.documentElement.classList.add('app-mode')
    },
    removeAppStyles () {
      document.documentElement.classList.remove('app-mode')
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

<style lang="scss">
.app-mode {
  &html,
  body,
  #app {
    overflow: hidden;
  }
}
</style>
