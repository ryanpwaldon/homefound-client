<template>
  <div class="base-nav-vertical">
    <div class="section">
      <NavItem
        v-for="(navItem, i) in navItems[0]"
        :to="navItem.path"
        :icon="navItem.icon"
        :key="i"
      />
    </div>
    <div class="section">
      <NavItem
        v-for="(navItem, i) in navItems[1]"
        :to="navItem.path"
        :icon="navItem.icon"
        :key="i"
      />
    </div>
  </div>
</template>

<script>
import NavItem from './partials/NavItem/NavItem'
export default {
  components: {
    NavItem
  },
  props: {
    navItems: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.base-nav-vertical {
  width: 65px;
  height: 100%;
  border-right: 1px solid var(--color-gray-1);
  background: var(--color-white-1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--spacing-4) 0;
  flex-shrink: 0;
}
.section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  > *:not(:last-child) {
    margin-bottom: var(--spacing-6);
  }
}
.logo {
  width: 25px;
}
</style>
