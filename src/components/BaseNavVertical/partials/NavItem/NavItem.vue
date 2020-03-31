<template>
  <router-link class="nav-item" :class="{ home: to === '/' }" :to="to" :style="{ '--spacing': spacing, '--size': size }">
    <div class="wrapper">
      <img class="icon" :src="icon">
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: '2rem'
    },
    spacing: {
      type: String,
      default: 'var(--spacing-4)'
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-item {
  width: var(--size);
  height: var(--size);
  display: block;
  position: relative;
}
.nav-item:hover,
.router-link-active:not(.home) {
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
    width: calc(100% + var(--spacing));
    height: calc(100% + var(--spacing));
    border-radius: var(--border-radius-1);
    background: var(--color-gray-4);
    opacity: 0;
  }
}
.icon {
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  z-index: 1;
}
.wrapper::before,
.icon {
  transition: opacity 0.2s ease-in-out;
}
</style>
