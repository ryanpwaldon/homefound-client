<template>
  <div class="base-nav-horizontal-primary">
    <div class="section">
      <router-link class="logo-container" to="/">
        <img class="logo" src="@/assets/img/logo-2-2.svg">
        <BaseText2 text="Homeshade"/>
      </router-link>
    </div>
    <div class="section">
      <NavItemText
        v-for="(navItem, i) in navItems"
        :path="navItem.path"
        :text="navItem.text"
        :design="navItem.design"
        :key="i"
      />
    </div>
  </div>
</template>

<script>
import BaseText2 from '@/components/BaseText2/BaseText2'
import NavItemText from './partials/NavItemText/NavItemText'
export default {
  components: {
    BaseText2,
    NavItemText
  },
  props: {
    navItems: {
      type: Array,
      default: () => [
        { text: 'How it works?', path: '/how-it-works' },
        { text: 'Pricing', path: '/pricing' },
        { text: 'Login', path: '/login' },
        { text: 'Sign up', path: '/register', design: 'blue' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.base-nav-horizontal-primary {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.section {
  display: flex;
  align-items: center;
  > *:not(:last-child) {
    margin-right: var(--spacing-5);
  }
}
.logo-container {
  display: flex;
  align-items: center;
}
.logo {
  height: 25px;
  margin-right: var(--spacing-2);
}
</style>
