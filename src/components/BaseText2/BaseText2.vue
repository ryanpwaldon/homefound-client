<template>
  <div class="base-text-2">
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
.base-text-2 {
  font-size: 1.4rem;
}
</style>
