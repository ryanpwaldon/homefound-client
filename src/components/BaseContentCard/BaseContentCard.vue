<template>
  <div class="base-content-card">
    <div class="header">
      <div class="header-title">{{ title }}</div>
    </div>
    <div class="content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.base-content-card {
  background: var(--color-white-1);
  border-radius: var(--border-radius-1);
  border: solid 1px var(--color-gray-1);
}
.header {
  padding: var(--spacing-3) var(--spacing-5);
  border-bottom: solid 1px var(--color-gray-1);
  background: var(--color-gray-9);
  border-radius: 2px 2px 0 0;
}
.header-title {
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.1em;
}
.content {
  padding: var(--spacing-5);
}
</style>
