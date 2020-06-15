<template>
  <div class="base-card">
    <slot/>
    <div class="locked-overlay-container" v-if="locked">
      <div class="locked-overlay"/>
      <img class="locked-image" src="@/assets/img/lock.svg">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    locked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.base-card {
  position: relative;
  background: var(--color-white-1);
  border-radius: var(--border-radius-1);
  border: solid 1px var(--color-gray-1);
  padding: var(--spacing-5);
}
.locked-overlay-container,
.locked-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
}
.locked-overlay {
  background: var(--color-gray-2);
  border-radius: var(--border-radius-1);
  opacity: 0.6;
}
.locked-image {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 2rem;
  z-index: 101;
}
</style>
