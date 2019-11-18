<template>
  <div class="base-nav-vertical">
    <img class="logo" src="@/assets/img/logo.svg">
    <router-link
      class="nav-item"
      v-for="(navItem, i) in navItems"
      :to="navItem.path"
      :key="i"
    >
      <img class="icon" :src="navItem.icon">
    </router-link>
  </div>
</template>

<script>
export default {
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
  align-items: center;
  padding: var(--spacing-4) 0;
  > *:not(:last-child) {
    margin-bottom: var(--spacing-6);
  }
}
.logo {
  width: 30px;
}
.icon {
  width: 20px;
}
</style>
