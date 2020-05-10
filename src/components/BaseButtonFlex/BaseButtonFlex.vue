<template>
  <div class="base-button-flex">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
.base-button-flex {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-1);
  transition: var(--transition-settings-1) background-color;
  background: var(--color-gray-2);
  border: 1px var(--color-gray-1) solid;
  padding: 0 var(--spacing-1);
  cursor: pointer;
  &:hover {
    background: var(--color-gray-9);
  }
}
</style>
