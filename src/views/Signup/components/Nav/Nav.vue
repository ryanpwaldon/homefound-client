<template>
  <div class="nav">
    <BaseNavItemText class="nav-item" text="Buyer" path="/signup/buyer"/>
    <BaseNavItemText class="nav-item" text="Agent" path="/signup/agent"/>
  </div>
</template>

<script>
import BaseNavItemText from '@/components/BaseNavItemText/BaseNavItemText'
export default {
  components: {
    BaseNavItemText
  }
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: flex-end;
}
.nav-item {
  position: relative;
  color: var(--color-gray-4);
  font-weight: var(--font-weight-medium);
  &:not(:last-child) {
    margin-right: var(--spacing-5);
  }
  &.router-link-exact-active {
    color: var(--color-black-2);
  }
}
</style>
