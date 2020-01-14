<template>
  <div class="base-badge" :class=[design]>
    <BaseText6>
      <span>{{ text }}</span>
      <span class="spacer" v-if="text && icon"/>
      <img v-if="icon" :src="icon">
    </BaseText6>
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
      required: false
    },
    design: {
      type: String,
      default: 'black'
    },
    icon: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.base-badge {
  border-radius: 100px;
  display: inline-flex;
  padding: var(--spacing-1) var(--spacing-2);
  font-weight: var(--font-weight-medium);
  justify-content: center;
  align-items: center;
}
.spacer {
  display: inline-block;
  width: var(--spacing-1);
}
img {
  height: 0.7em;
}
.black {
  color: var(--color-white-1);
  background: var(--color-black-2);
}
.gray {
  color: var(--color-black-2);
  background: var(--color-gray-1);
}
.green {
  color: var(--color-green-3);
  background: var(--color-green-4);
}
.yellow {
  color: var(--color-yellow-3);
  background: var(--color-yellow-1);
}
.red {
  color: var(--color-white-1);
  background: var(--color-red-1);
}
</style>
