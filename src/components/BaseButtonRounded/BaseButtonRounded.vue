<template>
  <div class="base-button-rounded">
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
.base-button-rounded {
  text-align: center;
  padding: var(--spacing-2) var(--spacing-6);
  color: var(--color-black-2);
  background: var(--color-white-1);
  box-shadow: var(--box-shadow-1);
  border-radius: 100px;
  display: inline-block;
  cursor: pointer;
}
</style>
