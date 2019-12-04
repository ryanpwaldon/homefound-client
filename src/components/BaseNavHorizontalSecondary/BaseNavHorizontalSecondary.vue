<template>
  <div class="base-nav-horizontal-secondary">
    <router-link
      class="nav-item"
      v-for="(navItem, i) in navItems"
      :to="navItem.path"
      :key="i">
      <BaseText3 class="text" :text="navItem.text"/>
    </router-link>
  </div>
</template>

<script>
import BaseText3 from '@/components/BaseText3/BaseText3'
export default {
  components: {
    BaseText3
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
.base-nav-horizontal-secondary {
  width: 100%;
  border-bottom: 1px solid var(--color-gray-1);
  padding-bottom: var(--spacing-2);
  display: flex;
  > *:not(:last-child) {
    margin-right: var(--spacing-4);
  }
}
.text {
  display: block;
  position: relative;
  color: var(--color-gray-4);
}
.router-link-exact-active .text {
  color: var(--color-black-2);
  &::after {
    content: '';
    width: 100%;
    position: absolute;
    left: 0;
    top: calc(100% + var(--spacing-2) - 1px);
    background: var(--color-black-2);
    height: 2px;
  }
}
</style>
