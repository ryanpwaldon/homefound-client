<template>
  <div class="button-icon">
    <div class="wrapper">
      <img class="icon" :src="icon">
    </div>
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
.button-icon {
  width: 20px;
  height: 20px;
  display: block;
  position: relative;
}
.button-icon:hover {
  .wrapper::before { opacity: 0.2 }
  .icon { opacity: 1 }
}
.wrapper {
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  &::before {
    content: '';
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + var(--spacing-4));
    height: calc(100% + var(--spacing-4));
    border-radius: var(--border-radius-1);
    background: var(--color-gray-4);
    opacity: 0;
  }
}
.icon {
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  opacity: 0.2;
  z-index: 1;
}
.wrapper::before,
.icon {
  transition: opacity 0.2s ease-in-out;
}
</style>
