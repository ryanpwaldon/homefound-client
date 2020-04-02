<template>
  <div class="base-alert">
    <slot/>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.base-alert {
  padding: var(--spacing-3) var(--spacing-5);
  border-radius: var(--border-radius-1);
  background: var(--color-gray-9);
  border: 1px solid var(--color-gray-1);
  font-size: 1.4rem;
}
</style>
