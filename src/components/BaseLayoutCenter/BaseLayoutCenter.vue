<template>
  <div class="base-layout-center">
    <div class="container">
      <div class="content" :style="{ maxWidth }">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    maxWidth: {
      type: String,
      default: '60rem'
    }
  }
}
</script>

<style lang="scss" scoped>
.base-layout-center {
  width: 100%;
  height: 100%;
  display: flex;
  min-width: 0;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--color-gray-2);
  padding: 0 var(--spacing-5);
  overflow: auto;
}
.content {
  flex: 1;
  width: 100%;
  padding: var(--spacing-6) 0;
  display: flex;
  flex-direction: column;
}
</style>
