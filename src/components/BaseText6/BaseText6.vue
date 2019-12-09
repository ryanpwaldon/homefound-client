<template>
  <div class="base-text-6">
    <span v-if="text" v-html="text"/>
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.base-text-6 {
  font-size: 1.2rem;
  font-weight: var(--font-weight-regular);
}
</style>
