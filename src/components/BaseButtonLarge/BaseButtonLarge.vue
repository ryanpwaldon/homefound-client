<template>
  <div class="base-button" :class=[design]>
    <span :style="{visibility: loading ? 'hidden' : 'visible'}">{{ text }}</span>
    <div class="spinner" v-if="loading"><BaseSpinner/></div>
  </div>
</template>

<script>
import BaseSpinner from '@/components/BaseSpinner/BaseSpinner'
export default {
  components: {
    BaseSpinner
  },
  props: {
    text: {
      type: String,
      required: true
    },
    design: {
      type: String,
      default: 'gray'
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.base-button {
  text-align: center;
  padding: 1rem 1.2rem;
  border-radius: var(--border-radius-1);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
  display: inline-block;
  position: relative;
  font-size: 1.6rem;
  cursor: pointer;
}
.white {
  color: var(--color-black-2);
  background: var(--color-white-1);
  border: solid 1px var(--color-gray-1);
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
  background: var(--color-red-2);
  border: solid var(--color-red-3) 1px;
}
.pink {
  color: var(--color-red-8);
  background: var(--color-red-6);
  border: solid var(--color-red-7) 1px;
}
.blue {
  color: var(--color-white-1);
  background: var(--color-blue-3);
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
