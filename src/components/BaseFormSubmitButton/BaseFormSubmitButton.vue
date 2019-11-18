<template>
  <div class="base-form-submit-button">
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
.base-form-submit-button {
  width: 100%;
  text-align: center;
  padding: var(--spacing-2);
  color: var(--color-white-1);
  background: var(--color-black-2);
  border-radius: var(--border-radius-1);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
}
</style>
