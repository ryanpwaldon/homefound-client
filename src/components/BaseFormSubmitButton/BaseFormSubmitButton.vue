<template>
  <div class="base-form-submit-button" :class="[design]">
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
      default: 'black'
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
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  position: relative;
}
.black {
  color: var(--color-white-1);
  background: var(--color-black-2);
}
.gray {
  color: var(--color-black-2);
  background: var(--color-gray-1);
}
.spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
