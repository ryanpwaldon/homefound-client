<template>
  <div class="base-button-inline-icon">
    <img :src="icon">
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.base-button-inline-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-1);
  transition: var(--transition-settings-1) background-color;
  background: var(--color-white-1);
  border: 1px var(--color-gray-1) solid;
  padding: 0 var(--spacing-1);
  cursor: pointer;
  &:hover {
    background-color: var(--color-gray-1);
  }
  img {
    width: 100%;
    display: block;
  }
}
</style>
