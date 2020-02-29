<template>
  <component
    class="base-nav-item-text"
    :class="[ design, activeMode === 'none' && 'active-state-disabled' ]"
    :is="path ? 'router-link' : 'div'"
    :exact="activeMode === 'exact'"
    :to="path">
    <BaseText2 class="text" :text="text"/>
  </component>
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
      required: false
    },
    text: {
      type: String,
      required: true
    },
    design: {
      type: String,
      default: 'transparent'
    },
    activeMode: {
      type: String,
      default: 'regular',
      validator: val => ['regular', 'exact', 'none'].includes(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.base-nav-item-text {
  display: block;
  position: relative;
  color: var(--color-gray-4);
  transition: color 0.2s ease-in-out;
  cursor: pointer;
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
    z-index: 0;
  }
}
.text {
  z-index: 1;
  position: relative;
}
.base-nav-item-text:hover,
.router-link-active:not(.active-state-disabled) {
  color: var(--color-black-2);
  &.transparent::before {
    opacity: 0.2;
  }
}
.base-nav-item-text:not(.transparent) {
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
