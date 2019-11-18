<template>
  <div class="base-nav-horizontal">
    <router-link
      class="nav-item"
      v-for="(navItem, i) in navItems"
      :to="navItem.path"
      :key="i"
    >
      <BaseText3 :text="navItem.title"/>
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
.base-nav-horizontal {
  width: 100%;
  border-bottom: 1px solid var(--color-gray-1);
  padding-bottom: var(--spacing-2);
  display: flex;
  > *:not(:last-child) {
    margin-right: var(--spacing-4);
  }
}
</style>
