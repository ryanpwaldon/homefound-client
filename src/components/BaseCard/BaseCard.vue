<template>
  <div class="base-card">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
.base-card {
  background: var(--color-white-1);
  border-radius: var(--border-radius-1);
  border: solid 1px var(--color-gray-1);
  padding: var(--spacing-5);
}
</style>
