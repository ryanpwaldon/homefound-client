<template>
  <div class="base-button" :class=[design]>
    <BaseText2 :text="text" :style="{visibility: loading ? 'hidden' : 'visible'}"/>
    <div class="spinner" v-if="loading"><BaseSpinner/></div>
  </div>
</template>

<script>
import BaseSpinner from '@/components/BaseSpinner/BaseSpinner'
import BaseText2 from '@/components/BaseText2/BaseText2'
export default {
  components: {
    BaseSpinner,
    BaseText2
  },
  props: {
    text: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    design: {
      type: String,
      default: 'gray'
    }
  }
}
</script>

<style lang="scss" scoped>
.base-button {
  text-align: center;
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--border-radius-1);
  display: inline-block;
  cursor: pointer;
  position: relative;
}
.gray {
  color: var(--color-black-2);
  background: var(--color-gray-1);
}
.black {
  color: var(--color-white-1);
  background: var(--color-black-2);
}
.red {
  color: var(--color-white-1);
  background: var(--color-red-1);
}
.blue {
  color: var(--color-white-1);
  background: var(--color-blue-3);
}
.disabled {
  color: var(--color-gray-4);
  background: var(--color-gray-8);
  pointer-events: none;
}
.spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
::v-deep .spinner > * {
  width: var(--spacing-3);
  height: var(--spacing-3);
}
</style>
