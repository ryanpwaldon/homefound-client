<template>
  <div class="base-text-2">
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
.base-text-2 {
  font-size: 1.4rem;
}
</style>
