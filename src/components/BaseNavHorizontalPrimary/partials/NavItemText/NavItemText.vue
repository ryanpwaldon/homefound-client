<template>
  <router-link class="nav-item-text" :class="design" :to="path">
    <BaseText2 class="text" :text="text"/>
  </router-link>
</template>

<script>
import BaseText2 from '@/components/BaseText2/BaseText2'
export default {
  components: {
    BaseText2
  },
  props: {
    path: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    design: {
      type: String,
      default: 'transparent'
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-item-text {
  display: block;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + var(--spacing-4));
    height: calc(100% + var(--spacing-2));
    border-radius: var(--border-radius-1);
    background: var(--color-gray-4);
    transition: opacity 0.2s ease-in-out;
    opacity: 0;
  }
}
.nav-item-text.transparent:hover::before {
  opacity: 0.2;
}
.nav-item-text:not(.transparent) {
  margin-right: var(--spacing-2);
}
.blue {
  .text {
    position: relative;
    color: var(--color-white-1);
    z-index: 1;
  }
  &::before {
    background: var(--color-blue-1);
    opacity: 1;
  }
}
</style>
