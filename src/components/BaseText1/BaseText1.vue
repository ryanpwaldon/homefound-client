<template>
  <div class="base-text-1">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.base-text-1 {
  font-size: 2rem;
  font-weight: var(--font-weight-medium);
}
</style>
