<template>
  <div class="base-button">
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
    }
  }
}
</script>

<style lang="scss" scoped>
.base-button {
  text-align: center;
  padding: var(--spacing-1) var(--spacing-2);
  color: var(--color-black-2);
  background: var(--color-gray-1);
  border-radius: var(--border-radius-1);
  display: inline-block;
  cursor: pointer;
}
</style>
