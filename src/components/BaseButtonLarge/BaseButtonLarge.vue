<template>
  <div class="base-button" :class=[design]>
    <BaseText2 :text="text"/>
  </div>
</template>

<script>
import BaseText2 from '@/components/BaseText2/BaseText2'
export default {
  components: {
    BaseText2
  },
  props: {
    text: {
      type: String,
      required: true
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
  padding: 1rem 1.2rem;
  border-radius: var(--border-radius-1);
  font-weight: var(--font-weight-medium);
  display: inline-block;
  position: relative;
  cursor: pointer;
}
.white {
  color: var(--color-black-2);
  background: var(--color-white-1);
  box-shadow: var(--box-shadow-1);
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
</style>
