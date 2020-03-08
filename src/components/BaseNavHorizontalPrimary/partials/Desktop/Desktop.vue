<template>
  <div class="container">
    <div class="content">
      <router-link class="logo" to="/">
        <img src="@/assets/img/logo-9.svg">
        <BaseText2 text="Homefound"/>
      </router-link>
      <div class="menu">
        <BaseNavItemText
          v-for="(navItem, i) in navItems"
          :path="navItem.path"
          :text="navItem.text"
          :active-mode="navItem.activeMode"
          :design="navItem.design"
          :key="i"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseText2 from '@/components/BaseText2/BaseText2'
import BaseNavItemText from '@/components/BaseNavItemText/BaseNavItemText'
export default {
  components: {
    BaseText2,
    BaseNavItemText
  },
  props: {
    navItems: {
      type: Array,
      default: () => [
        { text: 'Buyers', path: '/', activeMode: 'exact' },
        { text: 'Agents', path: '/agents' },
        { text: 'Pricing', path: '/pricing' },
        { text: 'FAQs', path: '/faqs' },
        { text: 'Login', path: '/login' },
        { text: 'Sign up', path: '/signup' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  background: var(--color-gray-2);
  border-bottom: var(--color-gray-1) solid 1px;
  padding: var(--spacing-4) var(--spacing-5);
  font-weight: var(--font-weight-medium);
  position: sticky;
  top: 0;
  z-index: 10;
}
.content {
  display: flex;
  justify-content: space-between;
  max-width: 90rem;
  width: 100%;
}
.menu {
  display: flex;
  align-items: center;
  > *:not(:last-child) {
    margin-right: var(--spacing-5);
  }
}
.logo {
  display: flex;
  align-items: center;
  img {
    height: 25px;
    margin-right: var(--spacing-2);
  }
}
</style>
