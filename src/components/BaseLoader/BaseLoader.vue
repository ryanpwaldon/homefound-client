<template>
  <div class="base-loader">
    <BaseSpinner/>
    <BaseText2 :text="text" v-if="text"/>
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
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.base-loader {
  display: flex;
  justify-content: center;
  align-items: center;
}
.base-loader > *:not(:last-child) {
  margin-right: var(--spacing-4)
}
</style>
