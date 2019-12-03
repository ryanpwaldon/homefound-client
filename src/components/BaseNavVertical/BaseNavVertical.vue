<template>
  <div class="base-nav-vertical">
    <div class="section">
      <img class="logo" src="@/assets/img/logo.svg">
      <router-link
        class="nav-item"
        v-for="(navItem, i) in navItems[0]"
        :to="navItem.path"
        :key="i"
      >
        <img class="icon" :src="navItem.icon">
      </router-link>
    </div>
    <div class="section">
      <router-link
        class="nav-item"
        v-for="(navItem, i) in navItems[1]"
        :to="navItem.path"
        :key="i"
      >
        <img class="icon" :src="navItem.icon">
      </router-link>
    </div>
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
.nav-item {
  display: flex;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  position: relative;
  display: block;
}
.logo {
  width: 30px;
}
.icon {
  width: 20px;
  max-width: 100%;
  max-height: 100%;
}
</style>
