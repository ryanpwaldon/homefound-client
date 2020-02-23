<template>
  <div class="layout-focus-minimal">
    <router-link class="logo" to="/">
      <img src="@/assets/img/logo-1.svg">
      <div class="label">Homefound</div>
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
  margin: var(--spacing-4);
  display: flex;
  align-items: center;
  height: 2.5rem;
  left: 0;
  top: 0;
  img {
    display: block;
    height: 100%;
    margin-right: var(--spacing-2);
  }
  .label {
    font-size: 1.4rem;
    font-weight: var(--font-weight-medium);
  }
}
</style>
