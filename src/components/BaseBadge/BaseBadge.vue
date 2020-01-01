<template>
  <div class="base-badge" :class=[design]>
    <BaseText6 :text="text"/>
  </div>
</template>

<script>
import BaseText6 from '@/components/BaseText6/BaseText6'
export default {
  components: {
    BaseText6
  },
  props: {
    text: {
      type: String,
      required: true
    },
    design: {
      type: String,
      default: 'black'
    }
  }
}
</script>

<style lang="scss" scoped>
.base-badge {
  border-radius: 100px;
  display: inline-block;
  padding: var(--spacing-1) var(--spacing-2);
  font-weight: var(--font-weight-medium);
}
.black {
  color: var(--color-white-1);
  background: var(--color-black-2);
}
.green {
  color: var(--color-white-1);
  background: var(--color-green-2);
}
.yellow {
  color: var(--color-black-2);
  background: var(--color-yellow-1);
}
.red {
  color: var(--color-white-1);
  background: var(--color-red-1);
}
</style>
