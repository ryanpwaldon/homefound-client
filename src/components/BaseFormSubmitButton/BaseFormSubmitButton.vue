<template>
  <button class="base-form-submit-button" :class="[design]" :type="type">
    <BaseText2 :text="text" :style="{visibility: loading ? 'hidden' : 'visible'}"/>
    <div class="spinner" v-if="loading"><BaseSpinner/></div>
  </button>
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
    type: {
      type: String,
      default: 'button'
    },
    loading: {
      type: Boolean,
      default: false
    },
    design: {
      type: String,
      default: 'disabled'
    }
  }
}
</script>

<style lang="scss" scoped>
.base-form-submit-button {
  width: 100%;
  text-align: center;
  padding: var(--spacing-2);
  border-radius: var(--border-radius-1);
  cursor: pointer;
  position: relative;
  transition:
    color var(--transition-settings-1),
    background-color var(--transition-settings-1);
}
.black {
  color: var(--color-white-1);
  background: var(--color-black-2);
}
.gray {
  color: var(--color-black-2);
  background: var(--color-gray-1);
}
.red {
  color: var(--color-red-8);
  background: var(--color-white-1);
  border: solid 1px var(--color-red-9);
  &:hover {
    background: var(--color-red-10);
  }
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
</style>
