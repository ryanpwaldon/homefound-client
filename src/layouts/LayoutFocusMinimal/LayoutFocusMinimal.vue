<template>
  <div class="layout-focus-minimal">
    <router-link class="logo" to="/">
      <img src="@/assets/img/logo-1.svg">
    </router-link>
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
.layout-focus-minimal {
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: var(--color-gray-2);
  padding: var(--spacing-5);
}
.logo {
  position: absolute;
  display: block;
  margin: var(--spacing-4);
  height: 2.5rem;
  left: 0;
  top: 0;
  img {
    display: block;
    height: 100%;
  }
}
</style>
