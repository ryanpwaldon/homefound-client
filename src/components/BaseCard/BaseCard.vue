<template>
  <div class="base-card" :style="{ padding }">
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    padding: {
      type: String,
      default: 'var(--spacing-5)'
    }
  }
}
</script>

<style lang="scss" scoped>
.base-card {
  background: var(--color-white-1);
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow-1);
}
</style>
