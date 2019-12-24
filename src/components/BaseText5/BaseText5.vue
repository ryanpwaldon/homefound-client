<template>
  <div class="base-text-5">
    <slot/>
    {{ text }}
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
.base-text-5 {
  font-size: 1.6rem;
  font-weight: var(--font-weight-regular);
  line-height: 1.5;
}
</style>
