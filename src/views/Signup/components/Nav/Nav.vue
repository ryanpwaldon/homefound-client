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
  &:not(:last-child) {
    margin-right: var(--spacing-4);
  }
  &.router-link-exact-active {
    color: var(--color-black-2);
    ::after {
      position: absolute;
      left: 0;
      top: calc(100% + var(--spacing-2));
      content: '';
      height: 1px;
      width: 100%;
      background: var(--color-black-2);
    }
  }
}
</style>
