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
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--border-radius-1);
  display: inline-block;
  cursor: pointer;
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
</style>
